# Shopify op Streetmasters

De storefront is een eigen Vue-interface op streetmasters.be. Shopify beheert producten, collecties, voorraad, prijzen, kortingen, verzending, bestellingen en betalingen. De broncode bevat alleen publieke Storefront-credentials en een publieke Customer Account client-ID. Het gedeelde privé/Admin-token is niet gebruikt of opgeslagen en moet worden ingetrokken.

## Ingebouwd

- `/shop`: echte catalogus, collecties, zoeken op productnaam, sorteren, voorraadfilter en paginering. Een zoekopdracht doorzoekt alle producten en wist de collectiekeuze.
- `/shop/:handle`: afbeeldingen, geschoonde rich-text beschrijving, uitvoeringen, voorraadstatus, prijzen en aanbevelingen.
- `/winkelmand`: bewaarde Shopify-winkelmand, aantallen, verwijderen, kortingscode en bestelnotitie. De checkout-URL wordt vlak voor afrekenen opnieuw opgehaald. Shopify berekent de definitieve totalen en controleert voorraad.
- `/account`: e-mailcode-login met OAuth/PKCE, profielnaam bewerken en gepagineerde bestellingen. Adressen, uitgebreide accountinstellingen en orderdetails openen de Shopify-accountomgeving.
- `/account/callback`: eenmalige callback met state-, nonce-, vervaltijd- en JWT-handtekeningcontrole. Klanttokens staan in sessionStorage, niet in repository of logbestanden. Een verlopen sessie wordt vernieuwd als Shopify een refresh-token levert; anders moet de klant opnieuw inloggen.
- Shoplink, accountlink en winkelmandteller in de gedeelde navigatie; mobiel is account bereikbaar in het menu.
- Nederlandse en Engelse teksten in `src/i18n/shop.js`.

## Vereiste Shopify-instellingen voor klantlogin

In het Headless-verkoopkanaal bij de Customer Account API-configuratie voor client-ID `fb377542-94bd-4f07-bf58-590b11075cbd`:

1. Gebruik een **public client** voor deze browserintegratie en schakel nieuwe klantaccounts in.
2. JavaScript origin: `https://streetmasters.be`.
3. Callback/redirect URI: `https://streetmasters.be/account/callback`.
4. Logout URI: `https://streetmasters.be/account`.
5. Geef toestemming voor het lezen van klantgegevens en bestellingen en het wijzigen van klantgegevens (`customer_read_customers`, `customer_read_orders`, `customer_write_customers`, voor zover selecteerbaar in de configuratie).
6. Publiceer producten en collecties in het bijbehorende Headless-verkoopkanaal.

Bij de controle gaf Shopify voor `https://streetmasters.be/account/callback` de fout **Verkeerde redirect_uri**. Deze URI is dus nog niet toegestaan.

Deze instellingen zijn niet via de verstrekte publieke credentials aanpasbaar. Klantlogin moet na configuratie op de echte HTTPS-website met een klant worden getest. Shopify vereist HTTPS voor deze redirect-URL’s; gebruik voor ontwikkeling een HTTPS-preview en registreer daarvan origin/callback/logout. Lokale HTTP-preview is wel geschikt voor catalogus en winkelmand. Als `www.streetmasters.be` gebruikt wordt, stuur bezoekers door naar de canonical host of registreer beide varianten.

## Hosting

De build gebruikt standaard `/` voor streetmasters.be. De webserver moet niet-bestaande bestandspaden intern naar `/index.html` sturen, zodat `/shop/product`, `/account/callback` en alle overige Vue-routes ook rechtstreeks werken. Gebruik voor een GitHub-projectpreview `VITE_BASE_PATH=/Streetmasters/ npm run build`; de bestaande `deploy`-opdracht publiceert nog steeds via gh-pages. Deze wijziging heeft niets gepubliceerd en wijzigt geen DNS.

Voor Netlify staat de SPA-fallback in `public/_redirects`. Op andere hosting moet dezelfde fallback ingesteld worden. Zonder fallback kan de Shopify-login na terugkeer op een server-404 uitkomen.

## Aanpassen

- API-aanroepen: `src/lib/shopify.js` (Storefront API 2026-07), `src/lib/customerAccount.js` (Customer Account API 2026-07 via discovery).
- Vormgeving: `src/views/ShopView.vue`, `ProductView.vue`, `CartView.vue`, `AccountView.vue` en `src/components/shop/`.
- Kleuren en lettertypes: `src/style.css`.
- Gedeelde hero: `src/components/layout/PageHero.vue`; scrollhint: `src/components/ui/ScrollCue.vue`.
- Dropdowns: `src/components/ui/AppSelect.vue`.
- Publieke configuratie: optionele `VITE_SHOPIFY_DOMAIN`, `VITE_SHOPIFY_STOREFRONT_TOKEN`, `VITE_SHOPIFY_CUSTOMER_CLIENT_ID` in `.env.local`. VITE-variabelen komen in de browser terecht: hier nooit privé-tokens of secrets plaatsen.

Betaling, verzendkeuzes en definitieve belastingberekening blijven in Shopify-checkout. De aanpasbaarheid van die checkout en klantaccountomgeving hangt af van Shopify-configuratie en abonnement. Retouren, refunds, voorraadbeheer en overige beheertaken blijven in Shopify Admin; ze worden niet via een privé-token in de browser aangeboden.

## Verificatie

`npm run build` bouwt de productieversie. `npm test` voert Playwright-tests uit tegen de publieke catalogus en tijdelijke winkelmanden, zonder bestellingen of betalingen. De tests controleren zoeken, collecties, sortering, winkelmandpersistentie, aantallen, ongeldige korting, notities, checkout-overdracht, lege winkelmand, mobiel, scrollhints, toetsenbordbediening en foutafhandeling. Een afzonderlijke test met gesimuleerde Shopify-antwoorden controleert de ondertekende login-callback, nonce-afwijzing en profielwijziging; dit vervangt geen live klantlogin-test.

Documentatie: https://shopify.dev/docs/api/usage/authentication en https://shopify.dev/docs/api/customer/latest.
