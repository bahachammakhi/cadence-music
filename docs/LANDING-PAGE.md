# Cadence landing page

The public site lives in `site/`, separately from the native apps. It uses Next.js App Router, TypeScript, Tailwind CSS and an adapted shadcn/ui Button. Production builds export static files: no server, credentials, cookies, analytics or forms are needed. Manrope is bundled locally rather than fetched from Google at runtime.

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

Open `http://127.0.0.1:3000`. Use `npm run build` for a static export in `site/out`, and `npm run typecheck` for TypeScript checks. To reproduce the GitHub project URL locally:

```sh
NEXT_PUBLIC_BASE_PATH=/cadence-music npm run build
```

Preview the exported site under that same subdirectory with a static HTTP server. Check narrow and wide layouts, navigation, FAQ controls, keyboard focus, reduced motion, image loading and download links before publishing. The Next.js 404 is also exported.

## Publish and maintain

The `Landing page` GitHub workflow builds and validates pull requests, and deploys `main` to GitHub Pages. Pages must use GitHub Actions as its source. The site URL is `https://bahachammakhi.github.io/cadence-music/`.

Release URLs, versions and FAQ copy live in `site/lib/site.ts` and `site/app/page.tsx`; update them when distribution changes. Screenshots in `site/public/images` are optimized copies of the reviewed originals under `docs/screenshots`. Refresh both the preview and its version caption together. Preserve notices for bundled fonts and the adapted shadcn component.

## Verification — 10 November 2026

The production export built successfully with the `/cadence-music` base path and passed TypeScript. npm audit reported no known vulnerabilities. The exported page was checked in the browser at 320, 375, 390, 768, 1024 and 1440 pixels with no horizontal overflow. Image loading and section anchors passed, and the primary action remained in the first 390 × 844 screen. Native FAQ disclosures responded to Enter; the modal navigation responded to Enter/Escape and returned focus to its toggle. An axe-core WCAG 2 A/AA and 2.1 AA scan of revealed content reported zero violations. These automated checks supplement visual review; they do not certify every assistive technology.

XcodeGen regeneration left the native project and app plists unchanged. No native playback or server behavior changes are part of this landing page.
