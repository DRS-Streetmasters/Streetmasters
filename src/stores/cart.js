import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { cartMutation, getCart } from '../lib/shopify'

const storageKey = 'streetmasters-shopify-cart'
const readId = () => { try { return localStorage.getItem(storageKey) } catch { return null } }

export const useCartStore = defineStore('cart', () => {
  const cart = ref(null)
  const busy = ref(false)
  const error = ref('')
  const details = ref('')
  const initialized = ref(false)
  const count = computed(() => cart.value?.totalQuantity || 0)
  const lines = computed(() => cart.value?.lines.nodes || [])
  let initialization

  function save(value) {
    cart.value = value
    try { value ? localStorage.setItem(storageKey, value.id) : localStorage.removeItem(storageKey) } catch { /* Cart still works without persistence. */ }
  }

  async function run(action) {
    if (busy.value) return false
    busy.value = true
    error.value = ''
    details.value = ''
    try { await action(); return true } catch (cause) {
      error.value = cause.message?.startsWith('shop.errors.') ? cause.message : 'shop.errors.connection'
      details.value = cause.details || ''
      return false
    } finally { busy.value = false }
  }

  async function initialize() {
    if (initialized.value) return
    if (!initialization) initialization = (async () => {
      const id = readId()
      if (id) await run(async () => save(await getCart(id)))
      initialized.value = true
    })()
    await initialization
  }

  async function refresh() {
    await initialize()
    return run(async () => { const id = cart.value?.id || readId(); if (id) save(await getCart(id)) })
  }

  async function add(merchandiseId, quantity) {
    await initialize()
    return run(async () => {
      const id = cart.value?.id || readId()
      if (id) save(await getCart(id))
      const lines = [{ merchandiseId, quantity }]
      save(cart.value
        ? await cartMutation('cartLinesAdd', '$cartId: ID!, $lines: [CartLineInput!]!', 'cartId: $cartId, lines: $lines', { cartId: cart.value.id, lines })
        : await cartMutation('cartCreate', '$input: CartInput!', 'input: $input', { input: { lines, buyerIdentity: { countryCode: 'BE' } } }))
    })
  }

  async function updateLine(id, quantity) {
    return run(async () => {
      save(quantity === 0
        ? await cartMutation('cartLinesRemove', '$cartId: ID!, $ids: [ID!]!', 'cartId: $cartId, lineIds: $ids', { cartId: cart.value.id, ids: [id] })
        : await cartMutation('cartLinesUpdate', '$cartId: ID!, $lines: [CartLineUpdateInput!]!', 'cartId: $cartId, lines: $lines', { cartId: cart.value.id, lines: [{ id, quantity }] }))
    })
  }

  async function setDiscount(code) {
    return run(async () => save(await cartMutation('cartDiscountCodesUpdate', '$cartId: ID!, $codes: [String!]!', 'cartId: $cartId, discountCodes: $codes', { cartId: cart.value.id, codes: code.trim() ? [code.trim()] : [] })))
  }

  async function setNote(note) {
    return run(async () => save(await cartMutation('cartNoteUpdate', '$cartId: ID!, $note: String!', 'cartId: $cartId, note: $note', { cartId: cart.value.id, note })))
  }

  return { cart, count, lines, busy, error, details, initialized, initialize, refresh, add, updateLine, setDiscount, setNote }
})
