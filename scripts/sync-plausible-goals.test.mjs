import { test } from 'node:test'
import assert from 'node:assert/strict'
import { collectGoals, syncGoals } from './sync-plausible-goals.mjs'

test('extracts current goals once and sends verified batches of at most eight', async () => {
  const names = await collectGoals()
  assert.equal(names.length, 108)
  assert.equal(new Set(names).size, names.length)
  assert.ok(names.includes('Quote: Request Sent'))
  assert.ok(names.includes('Navigation: Change Language'))
  const existing = new Set()
  let requests = 0
  const request = async (url, options) => {
    requests++
    assert.equal(url, 'https://plausible.driesbielen.be/api/plugins/v1/goals')
    assert.equal(options.method, 'PUT')
    assert.equal(options.headers.Authorization, `Basic ${Buffer.from('streetmasters.be:test-token').toString('base64')}`)
    const { goals } = JSON.parse(options.body)
    assert.ok(goals.length > 0 && goals.length <= 8)
    for (const entry of goals) {
      assert.equal(entry.goal_type, 'Goal.CustomEvent')
      existing.add(entry.goal.event_name)
    }
    return { ok: true, json: async () => ({ goals }) }
  }
  assert.equal(await syncGoals(names, 'test-token', request), names.length)
  assert.equal(await syncGoals(names, 'test-token', request), names.length)
  assert.equal(existing.size, names.length)
  assert.equal(requests, 2 * Math.ceil(names.length / 8))
  await assert.rejects(syncGoals(names, '', request), /PLAUSIBLE_PLUGIN_TOKEN/)
  await assert.rejects(syncGoals(names, 'test-token', async () => ({ ok: false, status: 401 })), /HTTP 401/)
  await assert.rejects(syncGoals(names, 'test-token', async () => ({ ok: true, json: async () => ({ goals: [] }) })), /Onvolledig/)
})
