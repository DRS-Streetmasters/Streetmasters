import { createRemoteJWKSet, jwtVerify } from 'jose'
import { shopifyConfig } from './shopify'

const sessionKey = 'streetmasters-customer-session'
const flowKey = 'streetmasters-customer-login'
let discoveryPromise
let refreshing
const baseUrl = () => new URL(import.meta.env.BASE_URL, window.location.origin)
export const callbackUrl = () => new URL('account/callback', baseUrl()).href
export const accountUrl = () => new URL('account', baseUrl()).href
export const hostedAccountUrl = `https://${shopifyConfig.domain}/account`
const encode = bytes => btoa(String.fromCharCode(...bytes)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
const random = () => encode(crypto.getRandomValues(new Uint8Array(32)))

export async function discovery() {
  if (!discoveryPromise) discoveryPromise = Promise.all(['openid-configuration', 'customer-account-api'].map(async path => {
    const response = await fetch(`https://${shopifyConfig.domain}/.well-known/${path}`, { signal: AbortSignal.timeout(15000) })
    if (!response.ok) throw new Error('shop.loginUnavailable')
    return response.json()
  })).then(([auth, api]) => ({ auth, api })).catch(error => { discoveryPromise = null; throw error })
  return discoveryPromise
}

export function readSession() {
  try { return JSON.parse(sessionStorage.getItem(sessionKey) || 'null') } catch { return null }
}
export function clearSession() { sessionStorage.removeItem(sessionKey) }

export async function login(locale = 'nl') {
  const { auth } = await discovery()
  const verifier = random()
  const state = random()
  const nonce = random()
  const redirectUri = callbackUrl()
  const challenge = encode(new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(verifier))))
  sessionStorage.setItem(flowKey, JSON.stringify({ verifier, state, nonce, redirectUri, createdAt: Date.now() }))
  const url = new URL(auth.authorization_endpoint)
  url.search = new URLSearchParams({ client_id: shopifyConfig.customerClientId, response_type: 'code', scope: 'openid email customer-account-api:full', redirect_uri: redirectUri, state, nonce, code_challenge: challenge, code_challenge_method: 'S256', locale }).toString()
  window.location.assign(url.href)
}

async function exchange(body) {
  const { auth } = await discovery()
  const response = await fetch(auth.token_endpoint, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams({ ...body, client_id: shopifyConfig.customerClientId }), signal: AbortSignal.timeout(20000) })
  const tokens = await response.json()
  if (!response.ok || !tokens.access_token || !tokens.expires_in) throw new Error('shop.loginRequired')
  return tokens
}

export async function finishLogin(params) {
  let flow
  try { flow = JSON.parse(sessionStorage.getItem(flowKey) || 'null') } catch { /* Invalid state is rejected below. */ }
  sessionStorage.removeItem(flowKey)
  if (!flow || !params.get('state') || params.get('state') !== flow.state || Date.now() - flow.createdAt > 10 * 60 * 1000 || params.has('error') || !params.get('code')) throw new Error('shop.errors.login')
  const tokens = await exchange({ grant_type: 'authorization_code', code: params.get('code'), redirect_uri: flow.redirectUri, code_verifier: flow.verifier })
  const { auth } = await discovery()
  const { payload } = await jwtVerify(tokens.id_token, createRemoteJWKSet(new URL(auth.jwks_uri)), { issuer: auth.issuer, audience: shopifyConfig.customerClientId, algorithms: ['RS256'], requiredClaims: ['exp', 'iat', 'sub', 'nonce'] })
  if (payload.nonce !== flow.nonce) throw new Error('shop.errors.login')
  sessionStorage.setItem(sessionKey, JSON.stringify({ ...tokens, expiresAt: Date.now() + tokens.expires_in * 1000 }))
}

async function accessToken() {
  let session = readSession()
  if (!session) throw new Error('shop.loginRequired')
  if (session.expiresAt < Date.now() + 60000) {
    if (!session.refresh_token) { clearSession(); throw new Error('shop.loginRequired') }
    if (!refreshing) refreshing = exchange({ grant_type: 'refresh_token', refresh_token: session.refresh_token }).then(tokens => {
      const updated = { ...session, ...tokens, expiresAt: Date.now() + tokens.expires_in * 1000 }
      sessionStorage.setItem(sessionKey, JSON.stringify(updated))
      return updated
    }).catch(error => { clearSession(); throw error }).finally(() => { refreshing = null })
    session = await refreshing
  }
  return session.access_token
}

export async function customerQuery(query, variables = {}) {
  const token = await accessToken()
  const { api } = await discovery()
  const response = await fetch(api.graphql_api.replace(/\/api\/\d{4}-\d{2}\//, '/api/2026-07/'), { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: token }, body: JSON.stringify({ query, variables }), signal: AbortSignal.timeout(20000) })
  if (response.status === 401) { clearSession(); throw new Error('shop.loginRequired') }
  const result = await response.json()
  if (!response.ok || result.errors?.length || !result.data) throw new Error('shop.errors.account')
  return result.data
}

export async function logout() {
  const session = readSession()
  clearSession()
  if (!session?.id_token) return
  const { auth } = await discovery()
  const url = new URL(auth.end_session_endpoint)
  url.search = new URLSearchParams({ id_token_hint: session.id_token, post_logout_redirect_uri: accountUrl() }).toString()
  window.location.assign(url.href)
}

export async function getCustomer(after = null) {
  const data = await customerQuery(`query Account($after: String) {
    customer {
      id firstName lastName emailAddress { emailAddress }
      orders(first: 10, after: $after, reverse: true, sortKey: PROCESSED_AT) {
        nodes { id name processedAt financialStatus fulfillmentStatus statusPageUrl totalPrice { amount currencyCode } }
        pageInfo { hasNextPage endCursor }
      }
    }
  }`, { after })
  return data.customer
}

export async function updateCustomer(input) {
  const data = await customerQuery(`mutation Profile($input: CustomerUpdateInput!) {
    customerUpdate(input: $input) { customer { firstName lastName } userErrors { field message } }
  }`, { input })
  if (data.customerUpdate.userErrors.length) {
    const error = new Error('shop.errors.profile')
    error.details = data.customerUpdate.userErrors.map(item => item.message).join(' ')
    throw error
  }
  return data.customerUpdate.customer
}
