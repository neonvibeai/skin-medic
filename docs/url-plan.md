# Plan docelowej struktury adresów URL produktów (`docs/url-plan.md`)

Obecne adresy produktów w sklepie zawierają numeryczne identyfikatory pochodzące z eksportu WooCommerce (np. `/shop/exfoliating-cleanser-6449`). Poniższy plan przedstawia propozycję docelowych adresów opartych wyłącznie na słowach kluczowych (bez ID), do wdrożenia w osobnym kroku wraz z przekierowaniami `301` w `next.config.ts`.

## Zasady konstrukcji adresów
- Format: `/shop/{marka}-{nazwa-produktu}` (małe litery, łączniki `-`, bez znaków `®`/`™`, bez pojemności i bez numerów ID).
- Dla produktów różniących się wyłącznie wariantem lub stężeniem (np. `0.25%`, `0.5%`, `1%`, `15%`, `20%`) wariant pozostaje w slugu dla zachowania jednoznaczności.
- Wszystkie stare adresy (`/shop/*-<id>`) powinny otrzymać stałe przekierowanie `301` (`permanent: true`) na nowe adresy kanoniczne, a `sitemap.xml` oraz linki wewnętrzne powinny zostać zaktualizowane równocześnie.

## Przykładowe mapowanie (obecny URL → docelowy URL)

| ID | Marka | Obecny adres URL | Proponowany adres URL (bez ID) |
|---|---|---|---|
| 6449 | ZO Skin Health | `/shop/exfoliating-cleanser-6449` | `/shop/zo-exfoliating-cleanser` |
| 6452 | ZO Skin Health | `/shop/hydrating-cleanser-6452` | `/shop/zo-hydrating-cleanser` |
| 6471 | ZO Skin Health | `/shop/complexion-renewal-pads-6471` | `/shop/zo-complexion-renewal-pads` |
| 6491 | ZO Skin Health | `/shop/daily-power-defense-6491` | `/shop/zo-daily-power-defense` |
| 6519 | ZO Skin Health | `/shop/wrinkle-texture-repair-6519` | `/shop/zo-wrinkle-texture-repair` |
| 6544 | ZO Skin Health | `/shop/retinol-skin-brightener-1-6544` | `/shop/zo-retinol-skin-brightener-1` |
| 6548 | ZO Skin Health | `/shop/retinol-skin-brightener-05-6548` | `/shop/zo-retinol-skin-brightener-05` |
| 6550 | ZO Skin Health | `/shop/retinol-skin-brightener-025-6550` | `/shop/zo-retinol-skin-brightener-025` |
| 6564 | ZO Skin Health | `/shop/smart-tone-broad-spectrum-spf-50-6564` | `/shop/zo-smart-tone-spf-50` |
| 6092 | Obagi Medical | `/shop/nu-derm-gentle-cleanser-6092` | `/shop/obagi-nu-derm-gentle-cleanser` |
| 6197 | Obagi Medical | `/shop/professional-c-serum-15-6197` | `/shop/obagi-professional-c-serum-15` |
| 6201 | Obagi Medical | `/shop/professional-c-serum-20-6201` | `/shop/obagi-professional-c-serum-20` |
| 6219 | Obagi Medical | `/shop/clenziderm-md-daily-care-foaming-cleanser-6219` | `/shop/obagi-clenziderm-daily-foaming-cleanser` |
| 6224 | Obagi Medical | `/shop/clenziderm-md-pore-therapy-6224` | `/shop/obagi-clenziderm-pore-therapy` |
| 6241 | Obagi Medical | `/shop/elastiderm-eye-serum-6241` | `/shop/obagi-elastiderm-eye-serum` |
| 6259 | Obagi Medical | `/shop/elastiderm-lift-up-sculpt-facial-moisturizer-6259` | `/shop/obagi-elastiderm-lift-up-sculpt-moisturizer` |
| 6292 | Obagi Medical | `/shop/sun-shield-tint-broad-spectrum-spf-50-warm-6292` | `/shop/obagi-sun-shield-tint-spf-50-warm` |
| 6303 | Obagi Medical | `/shop/nu-cil-eyelash-enhancing-serum-6303` | `/shop/obagi-nu-cil-eyelash-enhancing-serum` |

## Wdrożenie (kolejny krok po akceptacji)
1. Dodanie pola `legacySlug` w `src/data/products.json` i aktualizacja `slug` na wersję bez ID.
2. Wygenerowanie reguł `redirects()` w `next.config.ts` (`source: '/shop/:legacySlug'`, `destination: '/shop/:newSlug'`, `permanent: true`).
3. Weryfikacja wszystkich linków w `sitemap.xml`, `ProductCard`, wyszukiwarce w `Navbar` oraz danych strukturalnych `BreadcrumbList` / `Product`.
