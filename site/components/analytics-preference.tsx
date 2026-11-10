"use client";
import { useEffect, useState } from "react";
import { ANALYTICS_OPT_OUT_KEY } from "@/lib/analytics";
export function AnalyticsPreference() {
  const [optedOut, setOptedOut] = useState<boolean | null>(null);
  const [restricted, setRestricted] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    try {
      setOptedOut(localStorage.getItem(ANALYTICS_OPT_OUT_KEY) === "1");
    } catch {
      setError(
        "Your browser blocks preference storage. Analytics is disabled.",
      );
    }
    setRestricted(
      navigator.doNotTrack === "1" ||
        navigator.doNotTrack === "yes" ||
        (navigator as Navigator & { globalPrivacyControl?: boolean })
          .globalPrivacyControl === true,
    );
  }, []);
  return (
    <div className="privacy-preference">
      <p className="body-3" aria-live="polite">
        {restricted
          ? "Your browser privacy signal disables analytics."
          : optedOut === null
            ? "Checking your browser preference…"
            : optedOut
              ? "Analytics is disabled in this browser."
              : "Your preference allows cookieless analytics."}
      </p>
      <button
        className="button button-primary button-md"
        disabled={restricted || optedOut === null}
        onClick={() => {
          try {
            localStorage.setItem(ANALYTICS_OPT_OUT_KEY, optedOut ? "0" : "1");
            window.location.reload();
          } catch {
            setError(
              "The preference could not be saved. Enable Do Not Track in your browser to opt out.",
            );
          }
        }}
      >
        {optedOut ? "Enable analytics" : "Disable analytics"}
      </button>
      {error && (
        <p className="body-3" role="status">
          {error}
        </p>
      )}
    </div>
  );
}
