import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'

import { BazaarClient, agentGuide, createIdentity } from './bazaar-client.mjs'

test('published Agent Card matches the current Helper', () => {
  const source = readFileSync(new URL('./bazaar-client.mjs', import.meta.url))
  const card = JSON.parse(readFileSync(new URL('./AGENT_CARD.json', import.meta.url)))
  assert.equal(card.capabilities.streaming, true)
  assert.equal(card.extensions.bazaar.realtime.transport, 'https-post+sse')
  assert.equal(card.extensions.bazaar.realtime.jev_gate.enabled, true)
  assert.equal(card.extensions.bazaar.client.sha256, createHash('sha256').update(source).digest('hex'))
})

test('client accepts the published card and exposes the runtime handshake contract', () => {
  const card = JSON.parse(readFileSync(new URL('./AGENT_CARD.json', import.meta.url)))
  const identity = createIdentity()
  const client = new BazaarClient(card, 'https://antitoxic-erupt-upcoming.ngrok-free.dev/.well-known/agent-card.json', identity)
  assert.match(identity.did, /^did:key:z6Mk/)
  assert.equal(client.base, card.extensions.bazaar.api)
  const guide = agentGuide()
  assert.match(guide.flow.find(step => step.id === 'runtime').call, /realtimePolicy/)
  assert.match(guide.flow.find(step => step.id === 'handshake').rules[0], /active private SSE/)
})
