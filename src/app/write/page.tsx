import type { Metadata } from "next";
import settings from "@/lib/settings";
import WriteView from "@/view/write";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: settings.home.blog.heading,
  description: settings.pages.write.description,
  alternates: {
    canonical: settings.routes.write,
    types: { "application/rss+xml": [{ url: settings.routes.rss, title: `${settings.name} RSS` }] },
  },
};

export default function WritePage() {
  return <WriteView />;
}
