# Plausible analytics

Tracker: `https://plausible.driesbielen.be/js/pa-9vfdncuI4xvmXvTOW7q8_.js`

## Goals activeren

De site verstuurt de onderstaande custom events. Ze verschijnen pas als conversiegoal nadat je ze in Plausible hebt toegevoegd: **site-instellingen → Goals → Add goal → Custom event**. Gebruik exact de eventnaam hieronder. Nadat events zijn ontvangen kun je ook **alle ontvangen custom event goals toevoegen** gebruiken. Op 19 oktober 2026 zijn alle 108 goals via de Plugins API geregistreerd en vervolgens via beide pagina’s van de goallijst gecontroleerd.

Documentatie: https://plausible.io/docs/custom-event-goals

## Automatisch aanmaken via de Plugins API

Jouw installatie biedt `PUT /api/plugins/v1/goals` met HTTP Basic-authenticatie. De gewone Sites API geeft hier 404; gebruik dus een **Plugin Token voor streetmasters.be**, niet een Stats API key. De eigen API-specificatie staat op https://plausible.driesbielen.be/api/plugins/spec/swagger-ui.

1. Open [Plugin Token aanmaken](https://plausible.driesbielen.be/streetmasters.be/settings/integrations?new_token=Streetmasters) en klik op **Create Plugin Token**. De parameter `new_token` toont de tokensectie ook wanneer er nog geen tokens bestaan.
2. Maak lokaal in de projectmap `.env.plausible` met:

   ```dotenv
   PLAUSIBLE_PLUGIN_TOKEN=plausible-plugin-jouw-token
   ```

   Dit bestand valt onder `.gitignore`. Gebruik geen `VITE_`-prefix: de sleutel hoort niet in de browserbundle.
3. Bekijk vooraf de gevonden goals: `npm run analytics:goals -- --dry-run`.
4. Maak alle goals aan: `npm run analytics:goals`.

Het script leest de vaste eventnamen rechtstreeks uit `src`, dedupliceert ze en gebruikt de get-or-create-endpoint in batches van maximaal acht. Bestaande goals blijven behouden, er wordt niets verwijderd. De API-antwoorden worden per batch gecontroleerd. Bij fouten stopt het script met een foutcode; opnieuw uitvoeren is veilig.

Om dit bij iedere deployment automatisch te doen, zet `PLAUSIBLE_PLUGIN_TOKEN` als geheime variabele in je CI/deployomgeving en voer `npm run analytics:goals` uit vóór je build/deploy. Het commando leest ook de omgevingsvariabele wanneer `.env.plausible` ontbreekt. Lokale builds blijven zonder token werken; de synchronisatie is daarom geen verplichte buildstap.

De live synchronisatie is uitgevoerd en alle 108 goals zijn teruggevonden. Het gebruikte token is niet in de repository opgeslagen. De lokale extractie en API-afhandeling zijn ook met een mock gecontroleerd via `node --test scripts/sync-plausible-goals.test.mjs`.

## Betekenis en privacy

- Eventnamen zijn gelijk voor NL en EN. `language` onderscheidt de taal.
- `location` onderscheidt navigatie, mobiel menu, footer en secties. `item` bevat alleen expliciet gekozen publieke producthandles, categorieën, service-ID’s of taalcodes.
- `Select: Changed` bevat `field` en de vooraf gedefinieerde optie in `item`. `checked` geeft de toestand van een checkbox aan.
- Klikken, formulierpogingen en geslaagde acties zijn aparte events. Alleen `Quote: Request Sent`, `Product: Added To Cart` en `Account: Profile Saved` bevestigen succes. `Cart: Checkout Started` betekent dat de bezoeker naar checkout gaat, niet dat er is betaald. Aankopen op Shopify worden hiermee niet gemeten.
- Geen namen, e-mailadressen, zoektermen, kortingscodes, opmerkingen, ingevulde veldwaarden, orderlinks of checkouttokens. Querystrings en URL-fragmenten worden vóór verzending verwijderd, ook bij pageviews en referrers (dus ook UTM-parameters).
- Pageviews volgen automatisch de SPA-router. Standaard automatische outbound/form/download-events staan uit om dubbeltellingen en het uitlekken van private bestemmings-URL’s te vermijden.
- Klikmeting gebruikt capture, zodat ook knoppen met `stopPropagation` en mobiele menu’s die meteen sluiten meetellen. Geblokkeerde analytics verhindert de sitewerking niet.
- Localhost wordt door het Plausible-script standaard niet gemeten. Tests onderscheppen de tracker en versturen geen echte analytics.

## Nieuwe knoppen

Geef een interactief element een vaste `data-analytics-click="Context: Actie"`. Gebruik `data-analytics-submit` op formulieren, `data-analytics-change` voor selecties en `data-analytics-focus` voor veldfocus. Attributen worden door AppButton/AppLinkButton doorgegeven. Gebruik nooit invoer of persoonsgegevens als eventnaam of property. Nieuwe gewone links en knoppen zonder label vallen onder `Content: Link` / `Content: Button`.

## Eventlijst

108 verschillende eventnamen.

| Event / goal | Bron |
| --- | --- |
| `About: Request Quote` | `src/views/AboutView.vue` |
| `Account Callback: Retry` | `src/views/AccountCallbackView.vue` |
| `Account: Back Shop` | `src/views/AccountView.vue` |
| `Account: First Name Focused` | `src/views/AccountView.vue` |
| `Account: Last Name Focused` | `src/views/AccountView.vue` |
| `Account: Login` | `src/views/AccountView.vue` |
| `Account: Logout` | `src/views/AccountView.vue` |
| `Account: Manage Account` | `src/views/AccountView.vue` |
| `Account: More` | `src/views/AccountView.vue` |
| `Account: Order Details` | `src/views/AccountView.vue` |
| `Account: Profile Saved` | `src/views/AccountView.vue` |
| `Account: Retry` | `src/views/AccountView.vue` |
| `Account: Save` | `src/views/AccountView.vue` |
| `Account: Save Submitted` | `src/views/AccountView.vue` |
| `Before After: Position Changed` | `src/components/home/ShowcaseSection.vue` |
| `Booking: Car Model Focused` | `src/components/home/BookingSection.vue` |
| `Booking: Service Changed` | `src/components/home/BookingSection.vue` |
| `Booking: Submit` | `src/components/home/BookingSection.vue` |
| `Cart: Apply` | `src/views/CartView.vue` |
| `Cart: Back Shop` | `src/views/CartView.vue` |
| `Cart: Checkout` | `src/views/CartView.vue` |
| `Cart: Checkout Started` | `src/views/CartView.vue` |
| `Cart: Decrease Quantity` | `src/views/CartView.vue` |
| `Cart: Discount Code Focused` | `src/views/CartView.vue` |
| `Cart: Discount Submitted` | `src/views/CartView.vue` |
| `Cart: Increase Quantity` | `src/views/CartView.vue` |
| `Cart: Open Product` | `src/views/CartView.vue` |
| `Cart: Order Note Focused` | `src/views/CartView.vue` |
| `Cart: Remove` | `src/views/CartView.vue` |
| `Cart: Remove Discount` | `src/views/CartView.vue` |
| `Cart: Retry` | `src/views/CartView.vue` |
| `Cart: Save Note` | `src/views/CartView.vue` |
| `Cart: Save Note Submitted` | `src/views/CartView.vue` |
| `Categories: Open Category` | `src/components/home/PopularCategories.vue` |
| `Categories: Retry` | `src/components/home/PopularCategories.vue` |
| `Categories: View Shop` | `src/components/home/PopularCategories.vue` |
| `Content: Button` | `src/lib/analytics.js` |
| `Content: Link` | `src/lib/analytics.js` |
| `Custom Project: Request Quote` | `src/components/services/CustomProjectSection.vue` |
| `Exterior: Request Quote` | `src/components/services/ExteriorSection.vue` |
| `Filters: Available Only Changed` | `src/components/shop/ShopFilters.vue` |
| `Filters: Reset` | `src/components/shop/ShopFilters.vue` |
| `Footer: Developer Website` | `src/components/layout/MainFooter.vue` |
| `Footer: Logo Home` | `src/components/layout/MainFooter.vue` |
| `Hero: Quote` | `src/components/home/HeroSection.vue` |
| `Hero: Services` | `src/components/home/HeroSection.vue` |
| `Interior: Request Quote` | `src/components/services/InteriorSection.vue` |
| `Interior: View Packages` | `src/components/services/InteriorSection.vue` |
| `Launch: Developer Website` | `src/views/LaunchView.vue` |
| `Navigation: About` | `src/components/layout/MainHeader.vue` |
| `Navigation: Account` | `src/components/layout/MainHeader.vue` |
| `Navigation: Cart` | `src/components/layout/MainHeader.vue` |
| `Navigation: Change Language` | `src/components/layout/MainHeader.vue` |
| `Navigation: Close Mobile Menu` | `src/components/layout/MainHeader.vue` |
| `Navigation: Home` | `src/components/layout/MainHeader.vue` |
| `Navigation: Language Menu` | `src/components/layout/MainHeader.vue` |
| `Navigation: Logo Home` | `src/components/layout/MainHeader.vue` |
| `Navigation: Open Mobile Menu` | `src/components/layout/MainHeader.vue` |
| `Navigation: Portfolio` | `src/components/layout/MainHeader.vue` |
| `Navigation: Quote` | `src/components/layout/MainHeader.vue` |
| `Navigation: Quote Request` | `src/components/layout/MainHeader.vue` |
| `Navigation: Services` | `src/components/layout/MainHeader.vue` |
| `Not Found: Back Home` | `src/views/NotFoundView.vue` |
| `Offer Sidebar: Call` | `src/components/offer/OfferSidebar.vue` |
| `Portfolio: Contact Us` | `src/views/PortfolioView.vue` |
| `Product Card: Open Product` | `src/components/shop/ProductCard.vue` |
| `Product: Add To Cart` | `src/views/ProductView.vue` |
| `Product: Add To Cart Submitted` | `src/views/ProductView.vue` |
| `Product: Added To Cart` | `src/views/ProductView.vue` |
| `Product: Back Shop` | `src/views/ProductView.vue` |
| `Product: Product Quantity Focused` | `src/views/ProductView.vue` |
| `Product: Retry` | `src/views/ProductView.vue` |
| `Product: Select Image` | `src/views/ProductView.vue` |
| `Product: View Cart` | `src/views/ProductView.vue` |
| `Quote: Back Home` | `src/components/offer/OfferRequestForm.vue` |
| `Quote: Brand Model Focused` | `src/components/offer/OfferRequestForm.vue` |
| `Quote: Email Focused` | `src/components/offer/OfferRequestForm.vue` |
| `Quote: Form Submitted` | `src/components/offer/OfferRequestForm.vue` |
| `Quote: Message Focused` | `src/components/offer/OfferRequestForm.vue` |
| `Quote: Name Focused` | `src/components/offer/OfferRequestForm.vue` |
| `Quote: Request Sent` | `src/components/offer/OfferRequestForm.vue` |
| `Quote: Send Request` | `src/components/offer/OfferRequestForm.vue` |
| `Quote: Service Search Focused` | `src/components/offer/OfferRequestForm.vue` |
| `Quote: Services Changed` | `src/components/offer/OfferRequestForm.vue` |
| `Quote: Year Focused` | `src/components/offer/OfferRequestForm.vue` |
| `Scroll: Explore` | `src/components/ui/ScrollCue.vue` |
| `Select: Changed` | `src/components/ui/AppSelect.vue` |
| `Select: Toggle` | `src/components/ui/AppSelect.vue` |
| `Services Cta: Ask Advice` | `src/components/services/ServicesCtaSection.vue` |
| `Services Cta: View Portfolio` | `src/components/services/ServicesCtaSection.vue` |
| `Services Page Header: Exterior` | `src/components/services/ServicesPageHeader.vue` |
| `Services Page Header: Interior` | `src/components/services/ServicesPageHeader.vue` |
| `Services Page Header: Wrapping` | `src/components/services/ServicesPageHeader.vue` |
| `Services: Custom Link` | `src/components/home/ServicesSection.vue` |
| `Services: View All` | `src/components/home/ServicesSection.vue` |
| `Shop Menu: All` | `src/components/layout/ShopNavMenu.vue` |
| `Shop Menu: Open Category` | `src/components/layout/ShopNavMenu.vue` |
| `Shop Menu: Popular Categories` | `src/components/layout/ShopNavMenu.vue` |
| `Shop Menu: Shop` | `src/components/layout/ShopNavMenu.vue` |
| `Shop: Close Filters` | `src/views/ShopView.vue` |
| `Shop: Filters` | `src/views/ShopView.vue` |
| `Shop: More` | `src/views/ShopView.vue` |
| `Shop: Retry` | `src/views/ShopView.vue` |
| `Shop: Search Action` | `src/views/ShopView.vue` |
| `Shop: Search Products Submitted` | `src/views/ShopView.vue` |
| `Shop: Shop Search Focused` | `src/views/ShopView.vue` |
| `Shop: Show Products` | `src/views/ShopView.vue` |
| `Wrapping: Request Quote` | `src/components/services/WrappingSection.vue` |
