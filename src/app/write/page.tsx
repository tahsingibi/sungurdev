import type { Metadata } from "next";
import settings from "@/lib/settings";
import WriteView from "@/view/write";

export const metadata: Metadata = {
  title: "Yazılar",
  description: settings.pages.write.description,
  alternates: {
    canonical: "/write",
    types: { "application/rss+xml": [{ url: "/rss.xml", title: "sungur.dev RSS" }] },
  },
};

export default function WritePage() {
  return <WriteView />;
}
