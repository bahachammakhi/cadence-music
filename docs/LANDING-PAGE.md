# Cadence landing page

The public site lives in `site/`, separately from the native apps. It uses Next.js App Router, TypeScript, Tailwind CSS and an adapted shadcn/ui Button. Production builds export static files: no application server, account credentials or forms are needed. Website analytics uses PostHog cookieless mode. Manrope is bundled locally rather than fetched from Google at runtime.

## Design brief

The audience owns or is considering an Aurral music server. The main action is downloading the signed Mac app. The page uses a classic product showcase because real app views explain the offer. Its visual signature is a lime record behind the phone and Watch, drawn in CSS from Cadence's music identity. Cream, ink and lime come from the existing app brand. Motion is restrained and optional.

Page order: hero, device strip, product benefits, tagline, three setup steps, compatibility, open source, FAQ, final download and legal footer.

Hero: “Your music. Your own rhythm.” The subtitle describes native Mac, iPhone and Watch clients and the Aurral requirement. The CTA is “Download for Mac.” Signed/notarized distribution and MIT source are the proof signals.

Benefits: browse comfortably on Mac; prepare verified Watch playlists; find favorites and follow preparation progress. Setup: try the demo, connect your HTTPS Aurral account, then browse and play. Seven FAQ answers cover server requirements, other Subsonic servers, Spotify/Apple Music, offline Watch limits, iPhone/Watch availability, price and version differences.

The evergreen page is indexable. Its title is “Cadence — Your music. Your own rhythm.” Its description identifies the product as a native Aurral music client, with its own music/server requirement. App previews and release availability are labeled to avoid presenting simulator evidence as hardware acceptance.

## Design references

The user requested these four skills, read directly from their upstream sources:

- [UI/UX Pro Max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill): hierarchy, responsive composition, keyboard access and reduced motion. Its generic music palette recommendation was superseded by the existing Cadence brand.
- [Apple Design](https://github.com/dickwu/apple-design-skill): accessibility, layout, typography, color, buttons, branding and purposeful motion. Foundation principles apply to this web page; native app navigation conventions do not.
- [Landing Page Guide V2](https://github.com/bear2u/my-skills/blob/master/skills/landing-page-guide-v2/SKILL.md): product showcase, conversion hierarchy, real screenshots and FAQs. No testimonials, customer counts or endorsements are supplied, so evidence and open source replace those suggested sections.
- [Landing Page Design](https://github.com/elayadesign/ai-design-skills/blob/main/skills/landing-page-design/SKILL.md): one primary action, named text styles, Manrope, flat surfaces, real claims, disclosure FAQs and a separate tagline moment. Cadence's existing brand governs the palette.

## Develop and verify

```sh
cd site
npm ci
npm run dev
```

Open `http://127.0.0.1:3000`. Use `npm run build` for a static export in `site/out`, and `npm run typecheck` for TypeScript checks. Production is served at the custom domain root. Build and check it with:

```sh
npm run build
npm run check:export
```

Preview `site/out` as the root of a static HTTP server. `NEXT_PUBLIC_BASE_PATH` remains available for optional subdirectory deployments. Check narrow and wide layouts, navigation, FAQ controls, keyboard focus, reduced motion, image loading and download links before publishing. The Next.js 404 is also exported.

## Publish and maintain

The `Landing page` GitHub workflow builds and validates pull requests, and deploys `main` to GitHub Pages. Pages must use GitHub Actions as its source. The site URL is `https://cadence.bmerce.net/`.

Release URLs, versions and FAQ copy live in `site/lib/site.ts` and `site/app/page.tsx`; update them when distribution changes. Screenshots in `site/public/images` are optimized copies of the reviewed originals under `docs/screenshots`. Refresh both the preview and its version caption together. Preserve notices for bundled fonts and the adapted shadcn component.

## Verification — 10 November 2026

The production export built successfully with the `/cadence-music` base path and passed TypeScript. npm audit reported no known vulnerabilities. The exported page was checked in the browser at 320, 375, 390, 768, 1024 and 1440 pixels with no horizontal overflow. Image loading and section anchors passed, and the primary action remained in the first 390 × 844 screen. Native FAQ disclosures responded to Enter; the modal navigation responded to Enter/Escape and returned focus to its toggle. An axe-core WCAG 2 A/AA and 2.1 AA scan of revealed content reported zero violations. These automated checks supplement visual review; they do not certify every assistive technology.

XcodeGen regeneration left the native project and app plists unchanged. No native playback or server behavior changes are part of this landing page.

## Cloudflare custom domain

GitHub Pages must have `cadence.bmerce.net` set as its custom domain before adding DNS. In the Cloudflare `bmerce.net` zone, add a CNAME named `cadence` targeting `bahachammakhi.github.io`, with DNS only (gray cloud) and TTL Auto. The target is a hostname with no protocol or repository path. A custom GitHub Actions Pages workflow does not require a CNAME file in the artifact.

After DNS resolves, GitHub provisions the certificate. Enable Enforce HTTPS when available. DNS propagation and certificate provisioning can take up to 24 hours. Keep the record DNS only during this setup so GitHub can validate the hostname directly.

The production workflow builds at `/`, not `/cadence-music`. Canonical and social URLs use the custom domain, and the export check validates those URLs against the generated files.

## Website analytics

PostHog captures one `$pageview` per page load plus explicit `cadence_download_click`, `cadence_source_click` and `cadence_docs_click` events. Clicks record placement (hero, final CTA, header, footer or content), not page text. Referrers are reduced to domains. Query strings, fragments and unapproved event properties are removed, with a short allowlist for campaign source labels. Counts represent browser events and estimated visitors; blockers, privacy preferences and cookieless estimation affect coverage. A download click does not prove a completed download or app installation.

Copy `site/env.example` to `site/.env.local` and set the public project token and ingestion host from the chosen PostHog project. Both are public browser configuration, not a personal/administrative API key. Production builds read the same names from GitHub Actions repository variables: `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST`. Enable cookieless server hashing in that PostHog project before deployment; otherwise PostHog discards cookieless events. Set IP data capture to disabled in that dedicated project.

Collection is limited to the production hostname `cadence.bmerce.net`; localhost and preview hosts do not send analytics. There are no identify calls, session recordings, autocapture, surveys or feature flags. DNT, GPC and the privacy-page opt-out disable collection. Only the opt-out preference uses local storage. See [website privacy](https://cadence.bmerce.net/privacy/) and [PostHog configuration](https://posthog.com/docs/libraries/js/config).

The property allowlist preserves `$raw_user_agent`, `$host` and the SDK's cookieless routing keys. PostHog needs the browser user agent, network IP, host and calendar day to derive its rotating anonymous identifier; it strips the raw user agent and IP after hashing. Removing the user agent before sending silently prevents ingestion even when capture returns HTTP 200. See [PostHog's ingestion troubleshooting guide](https://github.com/PostHog/posthog/blob/master/products/ingestion/skills/resolving-ingestion-warnings/references/fixing-cookieless-warnings.md).

Run `npm run test:analytics` for privacy gates, payload sanitization and intended link classification. The Pages workflow runs those checks, builds and validates the static export, and checks TypeScript. Verify an actual production page view in the selected PostHog project's Web Analytics after deploying. Analytics starts at deployment; it cannot recover earlier visits.
