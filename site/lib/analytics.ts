import type { CaptureResult } from "posthog-js";

export const ANALYTICS_OPT_OUT_KEY = "cadence_analytics_opt_out";
export const ANALYTICS_HOSTNAME = "cadence.bmerce.net";
const events = new Set([
  "$pageview",
  "cadence_download_click",
  "cadence_source_click",
  "cadence_docs_click",
]);
const allowedProperties = new Set([
  "token",
  "distinct_id",
  "$device_id",
  "$session_id",
  "$window_id",
  "$cookieless_mode",
  "$is_identified",
  "$process_person_profile",
  "$lib",
  "$lib_version",
  "$insert_id",
  "$current_url",
  "$pathname",
  "$host",
  "$referrer",
  "$referring_domain",
  "$browser",
  "$browser_version",
  "$os",
  "$os_version",
  "$device_type",
  "$screen_width",
  "$screen_height",
  "$viewport_width",
  "$viewport_height",
  "site",
  "destination",
  "placement",
  "traffic_source",
]);

export function analyticsAllowed(
  hostname: string,
  dnt: string | null,
  gpc: boolean,
  optedOut: boolean,
) {
  return (
    hostname === ANALYTICS_HOSTNAME &&
    dnt !== "1" &&
    dnt !== "yes" &&
    !gpc &&
    !optedOut
  );
}

export function pageProperties(href: string, referrer: string) {
  const url = new URL(href);
  const pathname = ["/", "/privacy/"].includes(url.pathname)
    ? url.pathname
    : "/404";
  let referringDomain = "";
  try {
    referringDomain = new URL(referrer).hostname;
  } catch {
    /* No referrer is normal. */
  }
  const source = url.searchParams.get("utm_source") || "";
  return {
    site: "cadence",
    $current_url: `${url.origin}${pathname}`,
    $pathname: pathname,
    $host: url.hostname,
    $referrer: referringDomain ? `https://${referringDomain}` : "",
    $referring_domain: referringDomain,
    traffic_source: [
      "reddit",
      "x",
      "twitter",
      "github",
      "verification",
    ].includes(source)
      ? source
      : referringDomain || "direct",
  };
}

export function sanitizeEvent(
  event: CaptureResult | null,
): CaptureResult | null {
  if (!event || !events.has(event.event)) return null;
  const properties = Object.fromEntries(
    Object.entries(event.properties || {}).filter(([key]) =>
      allowedProperties.has(key),
    ),
  );
  // Even events enriched by the SDK cannot forward raw URLs or referrer paths.
  for (const key of ["$current_url", "$referrer"]) {
    if (typeof properties[key] === "string" && properties[key]) {
      try {
        const url = new URL(properties[key] as string);
        properties[key] =
          key === "$referrer"
            ? url.origin
            : `${url.origin}${["/", "/privacy/"].includes(url.pathname) ? url.pathname : "/404"}`;
      } catch {
        delete properties[key];
      }
    }
  }
  if (
    "$pathname" in properties &&
    !["/", "/privacy/"].includes(String(properties.$pathname))
  )
    properties.$pathname = "/404";
  return { ...event, properties };
}

export function outboundEvent(href: string) {
  const url = new URL(href, `https://${ANALYTICS_HOSTNAME}`);
  if (url.hostname !== "github.com") return null;
  const path = "/bahachammakhi/cadence-music";
  if (url.pathname.startsWith(`${path}/releases/download/`))
    return { event: "cadence_download_click", destination: "mac_download" };
  if (url.pathname.startsWith(`${path}/blob/main/docs/`))
    return { event: "cadence_docs_click", destination: "documentation" };
  if (url.pathname === path || url.pathname === `${path}/`)
    return { event: "cadence_source_click", destination: "github_source" };
  return null;
}
