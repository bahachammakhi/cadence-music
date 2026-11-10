import posthog from "posthog-js";
import {
  ANALYTICS_OPT_OUT_KEY,
  analyticsAllowed,
  outboundEvent,
  pageProperties,
  sanitizeEvent,
} from "./lib/analytics";

const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;
let optedOut = true;
try {
  optedOut = localStorage.getItem(ANALYTICS_OPT_OUT_KEY) === "1";
} catch {
  /* Respect unavailable browser storage. */
}
const gpc =
  (navigator as Navigator & { globalPrivacyControl?: boolean })
    .globalPrivacyControl === true;

if (
  token &&
  host &&
  analyticsAllowed(location.hostname, navigator.doNotTrack, gpc, optedOut)
) {
  try {
    posthog.init(token, {
      api_host: host,
      defaults: "2026-08-30",
      cookieless_mode: "always",
      person_profiles: "never",
      autocapture: false,
      capture_pageview: false,
      capture_pageleave: false,
      capture_performance: false,
      capture_exceptions: false,
      disable_session_recording: true,
      disable_surveys: true,
      disable_external_dependency_loading: true,
      advanced_disable_feature_flags: true,
      respect_dnt: true,
      before_send: sanitizeEvent,
      loaded(client) {
        client.capture(
          "$pageview",
          pageProperties(location.href, document.referrer),
        );
      },
    });
    document.addEventListener("click", (event) => {
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest<HTMLAnchorElement>("a[href]");
      if (!link) return;
      const action = outboundEvent(link.href);
      if (!action) return;
      const placement = link.closest(".hero-action")
        ? "hero"
        : link.closest(".final-cta")
          ? "final_cta"
          : link.closest("header")
            ? "header"
            : link.closest("footer")
              ? "footer"
              : "content";
      posthog.capture(
        action.event,
        {
          ...pageProperties(location.href, document.referrer),
          destination: action.destination,
          placement,
        },
        { transport: "sendBeacon" },
      );
    });
  } catch {
    /* Analytics failure must not interrupt browsing or downloads. */
  }
}
