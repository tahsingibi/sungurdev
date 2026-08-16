import createMDX from "@next/mdx";
import type { NextConfig } from "next";

/**
 * Geliştirme sırasında telefondan/başka cihazdan test edebilmek için.
 *
 * Next, dev sunucusunun `/_next/*` kaynaklarını tanımadığı origin'lere
 * güvenlik gereği 403 ile reddediyor. İzin verilmeyen bir adresten
 * (`sungurdev.local`, LAN IP'si) girildiğinde sayfa açılıyor ama istemci JS'i
 * inmiyor: React hidrate olmadığı için düğmelerin hiçbiri çalışmıyor, yalnızca
 * düz bağlantılar iş görüyor. Üretimde böyle bir kısıt yok.
 *
 * Ek adresleri ALLOWED_DEV_ORIGINS ile virgülle ayırarak tanımlayabilirsin.
 */
const extraDevOrigins = (process.env.ALLOWED_DEV_ORIGINS ?? "")
  .split(",")
  .map((value) => value.trim())
  .filter(Boolean);

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "*.local",
    "*.localhost",
    // Yerel ağ adresleri. CIDR değil glob: Next bu alanı ana bilgisayar adı
    // kalıbı olarak eşliyor, "192.168.0.0/16" hiçbir şeyle eşleşmiyordu.
    "192.168.*.*",
    "10.*.*.*",
    ...extraDevOrigins,
  ],
  poweredByHeader: false,
  compress: true,
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  webpack(config) {
    config.module.rules.push({
      test: /\.mdx$/,
      resourceQuery: /raw/,
      type: "asset/source",
    });
    return config;
  },
  async rewrites() {
    return [{ source: "/write/:slug.md", destination: "/markdown/:slug" }];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
  env: {
    STAGE:
      process.env.NODE_ENV === "production"
        ? "production"
        : process.env.NODE_ENV === "test"
          ? "test"
          : "development",
  },
};

const withMDX = createMDX();

export default withMDX(nextConfig);

import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());
