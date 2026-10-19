import { readdir, readFile } from 'node:fs/promises'
import { pathToFileURL } from 'node:url'

const endpoint = 'https://plausible.driesbielen.be/api/plugins/v1/goals'
const site = 'streetmasters.be'

export async function collectGoals(directory = new URL('../src/', import.meta.url)) {
  // The two fallback names are generated dynamically by analytics.js.
  const names = new Set(['Content: Link', 'Content: Button'])
  async function scan(folder) {
    for (const entry of await readdir(folder, { withFileTypes: true })) {
      const file = new URL(entry.name + (entry.isDirectory() ? '/' : ''), folder)
      if (entry.isDirectory()) await scan(file)
      else if (/\.(vue|js)$/.test(entry.name)) {
        const source = await readFile(file, 'utf8')
        for (const match of source.matchAll(/data-analytics-(?:click|submit|change|focus)="([^"]+)"|trackEvent\(\s*['"]([^'"]+)['"]/g)) {
          names.add(match[1] || match[2])
        }
      }
    }
  }
  await scan(directory)
  return [...names].sort()
}

export async function syncGoals(names, token, request = fetch) {
  if (!token?.trim()) throw new Error('Zet PLAUSIBLE_PLUGIN_TOKEN in .env.plausible (zie docs/analytics.md).')
  let confirmed = 0
  // The installation's OpenAPI schema allows at most eight goals per request.
  for (let offset = 0; offset < names.length; offset += 8) {
    const batch = names.slice(offset, offset + 8)
    const response = await request(endpoint, {
      method: 'PUT',
      redirect: 'error',
      headers: {
        Authorization: `Basic ${Buffer.from(`${site}:${token.trim()}`).toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ goals: batch.map(event_name => ({ goal_type: 'Goal.CustomEvent', goal: { event_name } })) }),
      signal: AbortSignal.timeout(20000),
    })
    if (!response.ok) throw new Error(`Plausible HTTP ${response.status} na ${confirmed} bevestigde goals. Controleer het Plugin Token en de sitetoegang. Je kunt het commando opnieuw uitvoeren.`)
    const result = await response.json()
    const received = new Set(result.goals?.map(entry => entry.goal?.event_name))
    if (batch.some(name => !received.has(name))) throw new Error(`Onvolledig API-antwoord na ${confirmed} bevestigde goals; voer de synchronisatie opnieuw uit.`)
    confirmed += batch.length
  }
  return confirmed
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    const names = await collectGoals()
    if (process.argv.includes('--dry-run')) {
      console.log(`${names.length} goals voor ${site}:\n${names.join('\n')}`)
    } else {
      const confirmed = await syncGoals(names, process.env.PLAUSIBLE_PLUGIN_TOKEN)
      console.log(`${confirmed} goals aangemaakt of al aanwezig op ${site}. Er is niets verwijderd.`)
    }
  } catch (error) {
    console.error(error.message)
    process.exitCode = 1
  }
}
