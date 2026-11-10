import test from "node:test";
import assert from "node:assert/strict";
import {
  analyticsAllowed,
  pageProperties,
  sanitizeEvent,
  outboundEvent,
} from "../lib/analytics.ts";

test("collection is limited to the production domain and honors privacy signals", () => {
  assert.equal(
    analyticsAllowed("cadence.bmerce.net", null, false, false),
    true,
  );
  for (const [host, dnt, gpc, out] of [
    ["localhost", null, false, false],
    ["preview.example", null, false, false],
    ["cadence.bmerce.net", "1", false, false],
    ["cadence.bmerce.net", null, true, false],
    ["cadence.bmerce.net", null, false, true],
  ])
    assert.equal(analyticsAllowed(host, dnt, gpc, out), false);
});

test("URLs and referrers do not leak tokens, fragments or arbitrary paths", () => {
  const props = pageProperties(
    "https://cadence.bmerce.net/?token=private&utm_source=reddit#private",
    "https://www.reddit.com/user/private?token=private",
  );
  assert.equal(props.$current_url, "https://cadence.bmerce.net/");
  assert.equal(props.$referrer, "https://www.reddit.com");
  assert.equal(props.traffic_source, "reddit");
  assert.equal(
    pageProperties("https://cadence.bmerce.net/private-id?secret=yes", "")
      .$pathname,
    "/404",
  );
  assert.equal(
    pageProperties(
      "https://cadence.bmerce.net/?utm_source=person%40example.com",
      "",
    ).traffic_source,
    "direct",
  );
});

test("SDK-enriched events retain routing keys and drop unapproved properties", () => {
  const result = sanitizeEvent({
    event: "$pageview",
    properties: {
      token: "public-ingestion",
      distinct_id: "cookieless",
      $cookieless_mode: true,
      $current_url: "https://cadence.bmerce.net/?secret=private#private",
      $referrer: "https://example.com/private?email=private",
      $initial_current_url: "private",
      email: "private",
      $set: { email: "private" },
    },
  });
  assert.equal(result.properties.token, "public-ingestion");
  assert.equal(result.properties.$cookieless_mode, true);
  assert.equal(result.properties.$current_url, "https://cadence.bmerce.net/");
  assert.equal(result.properties.$referrer, "https://example.com");
  assert.equal(JSON.stringify(result).includes("private"), false);
  for (const event of ["$autocapture", "$snapshot", "$identify", "$exception"])
    assert.equal(sanitizeEvent({ event, properties: {} }), null);
});

test("only intended download, source and documentation links produce events", () => {
  assert.equal(
    outboundEvent(
      "https://github.com/bahachammakhi/cadence-music/releases/download/v0.7.2/Cadence.zip",
    ).event,
    "cadence_download_click",
  );
  assert.equal(
    outboundEvent("https://github.com/bahachammakhi/cadence-music").event,
    "cadence_source_click",
  );
  assert.equal(
    outboundEvent(
      "https://github.com/bahachammakhi/cadence-music/blob/main/docs/BUILDING.md",
    ).event,
    "cadence_docs_click",
  );
  for (const href of [
    "#setup",
    "https://github.com/other/repo",
    "https://example.com/",
    "/privacy/",
  ])
    assert.equal(outboundEvent(href), null);
});
