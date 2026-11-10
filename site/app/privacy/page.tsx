import type { Metadata } from "next";
import { AnalyticsPreference } from "@/components/analytics-preference";
import { basePath, docs, siteUrl } from "@/lib/site";
export const metadata: Metadata = {
  title: "Website privacy — Cadence",
  alternates: { canonical: new URL("privacy/", siteUrl).href },
};
export default function Privacy() {
  return (
    <main id="main" className="privacy-page section-wrap">
      <a className="text-link" href={`${basePath}/`}>
        ← Back to Cadence
      </a>
      <p className="eyebrow">Your visit, explained</p>
      <h1 className="heading-1">Website privacy.</h1>
      <p className="body-3">
        Updated 10 November 2026. This page describes cadence.bmerce.net. The{" "}
        <a href={`${docs}/PRIVACY.md`}>native app privacy guide</a> describes
        the Mac, iPhone and Watch apps separately.
      </p>
      <section>
        <h2 className="heading-5">What we measure</h2>
        <p className="body-3">
          We use PostHog to count website views and approximate visitors, see
          referring websites and browser/device categories, and count clicks on
          the Mac download, GitHub source and documentation links. Referrers are
          limited to domains. URL query strings, fragments and arbitrary page
          paths are removed before events are sent. Recognized campaign sources
          such as Reddit and X may be recorded.
        </p>
      </section>
      <section>
        <h2 className="heading-5">Cookies and identification</h2>
        <p className="body-3">
          Analytics uses PostHog’s cookieless mode, without analytics cookies or
          persistent browser identifiers. PostHog receives normal network
          information, including your IP address and browser user agent, to process the request and
          derive its cookieless visitor estimate. We do not identify visitors by
          name or email, create person profiles, record sessions or capture page
          text and form entries. These are aggregate usage measurements, not
          exact counts of individual people.
        </p>
      </section>
      <section>
        <h2 className="heading-5">Your choice</h2>
        <p className="body-3">
          Do Not Track and Global Privacy Control disable collection. You can
          also disable analytics below. Only this preference is saved in local
          storage; it is not used as a tracking identifier. Privacy extensions
          may independently block analytics.
        </p>
        <AnalyticsPreference />
      </section>
      <section>
        <h2 className="heading-5">Hosting and other websites</h2>
        <p className="body-3">
          GitHub Pages serves this site and can process request logs under its
          own policies. Download and source links open GitHub. PostHog’s{" "}
          <a href="https://posthog.com/privacy">privacy policy</a> describes its
          processing. These services have their own retention and privacy
          practices.
        </p>
      </section>
    </main>
  );
}
