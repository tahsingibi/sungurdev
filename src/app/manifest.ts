import type { MetadataRoute } from "next";
import settings from "@/lib/settings";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${settings.name} — ${settings.title}`,
    short_name: settings.name,
    description: settings.seo.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: settings.seo.themeColor,
    icons: [{ src: "/favicon.ico", sizes: "any", type: "image/x-icon" }],
  };
}
