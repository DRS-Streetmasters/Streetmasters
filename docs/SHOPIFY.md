# Shopify op Streetmasters

De storefront is een eigen Vue-interface op streetmasters.be. Shopify beheert producten, collecties, voorraad, prijzen, kortingen, verzending, bestellingen en betalingen. De broncode bevat alleen publieke Storefront-credentials. Het gedeelde privé/Admin-token is niet gebruikt of opgeslagen en moet worden ingetrokken.

## Ingebouwd

- `/shop`: echte catalogus, collecties, zoeken op productnaam, sorteren, voorraadfilter en paginering. Een zoekopdracht doorzoekt alle producten en wist de collectiekeuze.
- `/shop/:handle`: afbeeldingen, geschoonde rich-text beschrijving, uitvoeringen, voorraadstatus, prijzen en aanbevelingen.
- `/winkelmand`: bewaarde Shopify-winkelmand, aantallen, verwijderen, kortingscode en bestelnotitie. De checkout-URL wordt vlak voor afrekenen opnieuw opgehaald. Shopify berekent de definitieve totalen en controleert voorraad.
- Shoplink en winkelmandteller in de gedeelde navigatie. Er is geen klantlogin op de website.
- Nederlandse en Engelse teksten in `src/i18n/shop.js`.

## Hosting

De build gebruikt standaard `/` voor streetmasters.be. De webserver moet niet-bestaande bestandspaden intern naar `/index.html` sturen, zodat `/shop/product`, `/winkelmand` en alle overige Vue-routes ook rechtstreeks werken. Gebruik voor een GitHub-projectpreview `VITE_BASE_PATH=/Streetmasters/ npm run build`; de bestaande `deploy`-opdracht publiceert nog steeds via gh-pages. Deze wijziging heeft niets gepubliceerd en wijzigt geen DNS.

Voor Netlify staat de SPA-fallback in `public/_redirects`. Op andere hosting moet dezelfde fallback ingesteld worden. Zonder fallback kunnen rechtstreekse links op een server-404 uitkomen.

## Aanpassen

- API-aanroepen: `src/lib/shopify.js` (Storefront API 2026-07).
- Vormgeving: `src/views/ShopView.vue`, `ProductView.vue`, `CartView.vue` en `src/components/shop/`.
- Kleuren en lettertypes: `src/style.css`.
- Gedeelde hero: `src/components/layout/PageHero.vue`; scrollhint: `src/components/ui/ScrollCue.vue`.
- Dropdowns: `src/components/ui/AppSelect.vue`.
- Publieke configuratie: optionele `VITE_SHOPIFY_DOMAIN`, `VITE_SHOPIFY_STOREFRONT_TOKEN` in `.env.local`. VITE-variabelen komen in de browser terecht: hier nooit privé-tokens of secrets plaatsen.

Betaling, verzendkeuzes en definitieve belastingberekening blijven in Shopify-checkout. De aanpasbaarheid van die checkout en klantaccountomgeving hangt af van Shopify-configuratie en abonnement. Retouren, refunds, voorraadbeheer en overige beheertaken blijven in Shopify Admin; ze worden niet via een privé-token in de browser aangeboden.

## Verificatie

`npm run build` bouwt de productieversie. `npm test` voert Playwright-tests uit tegen de publieke catalogus en tijdelijke winkelmanden, zonder bestellingen of betalingen. De tests controleren zoeken, collecties, sortering, winkelmandpersistentie, aantallen, ongeldige korting, notities, checkout-overdracht, lege winkelmand, mobiel, scrollhints, toetsenbordbediening en foutafhandeling.

Documentatie: https://shopify.dev/docs/api/usage/authentication.
