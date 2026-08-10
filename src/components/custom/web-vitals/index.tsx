"use client";

import { useReportWebVitals } from "next/web-vitals";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

interface WebVitalsProps {
  endpoint?: string;
  googleAnalyticsId?: string;
}

export function WebVitals({ endpoint, googleAnalyticsId }: WebVitalsProps) {
  useReportWebVitals((metric) => {
    if (googleAnalyticsId && window.gtag) {
      window.gtag("event", metric.name, {
        value: Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value),
        event_category: "Web Vitals",
        event_label: metric.id,
        non_interaction: true,
      });
    }

    if (!endpoint) return;
    const body = JSON.stringify(metric);
    if (navigator.sendBeacon) {
      navigator.sendBeacon(endpoint, body);
    } else {
      void fetch(endpoint, { method: "POST", body, keepalive: true });
    }
  });

  return null;
}
