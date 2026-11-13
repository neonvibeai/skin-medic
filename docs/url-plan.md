# Product URLs and redirects

Done. Product pages use keyword URLs without numeric IDs, for example
`/shop/obagi-professional-c-serum-15` instead of `/shop/serum-15-6197`.

- `slug` in `src/data/products.json` is the live URL; `legacySlug` keeps the old ID-based one.
- All redirects are generated in `redirects.config.ts` and loaded by `next.config.ts`:
  1. old ID-based product URLs → new keyword URLs,
  2. old WordPress product URLs (`/product/<name>/`) → the matching new product,
  3. old WordPress categories (`/product-category/...`) → the shop filtered to that concern,
  4. old WordPress pages (`/4-steps/`, `/cookie-policy/`, `/anti-wrinkle-injections/`, ...) → their new page,
  5. any other old `/product/...`, `/product-category/...` or `/brand/...` URL → `/shop`.
- The old WordPress URL list came from saved copies of the old site's pages. Before the domain
  switch, compare it with Google Search Console (Pages report) for skinmedicskincare.com and add
  any high-traffic URL that is missing.

Assumptions to confirm:
- `/product/gentle-cleanser/` was the Obagi Nu-Derm Gentle Cleanser and `/product/gentle-cleanser-2/`
  the ZO Gentle Cleanser (WooCommerce adds `-2` to the newer product).
- `/product/clarifying-serum/` was the Obagi-C Fx C-Clarifying Serum.
