import settings from "@/lib/settings";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

/**
 * OpenGraph kartı — sayfanın kendi dilinde.
 *
 * Aynı NFO grameri: is siyahı zemin, fosfor amber, köşesiz çerçeve,
 * `[ ETİKET ]` biçimi ve hizalı bir künye bloğu. Paylaşılan bağlantı sitenin
 * neye benzediğini söylemeli; jenerik bir profil fotoğrafı bunu yapmıyordu.
 *
 * Yazı tipi elle veriliyor: satori sistem fontlarını görmüyor, verilmezse
 * sans-serif bir varsayılana düşüyor ve mono grid tamamen kayboluyor —
 * yani kartın karakterini taşıyan tek şey kaybolurdu.
 */
/*
 * Kart derleme anında bir kez üretilip statik varlık olarak yayınlanıyor.
 *
 * Bu, yazı tipi sorununu da çözüyor: prerender Node üzerinde çalıştığı için
 * font diskten okunabiliyor. Çalışma anında üretilseydi Cloudflare Workers'ta
 * dosya sistemi olmadığı için fontu ağdan çekmek gerekirdi — ve `next build`
 * sırasında ortada ayakta bir sunucu olmadığı için o yol prerender'ı
 * kırıyordu.
 */
export const dynamic = "force-static";

export const alt = `${settings.name} — ${settings.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BG = "#0d0b07";
const FG = "#efe6d4";
const AMBER = "#ffb020";
const DIM = "#8b8172";
const LINE = "#2a241a";

export default async function OpenGraphImage() {
  const fontDir = path.join(process.cwd(), "public", "fonts");
  const [regular, bold] = await Promise.all([
    readFile(path.join(fontDir, "GeistMono-Regular.ttf")),
    readFile(path.join(fontDir, "GeistMono-Bold.ttf")),
  ]);

  const stack = settings.stack
    .slice(0, 2)
    .flatMap((category) => category.items)
    .slice(0, 6)
    .join("  ·  ");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: BG,
          color: FG,
          fontFamily: "GeistMono",
          padding: 64,
          // Köşesiz, kalın amber çerçeve — kartın NFO kimliği.
          border: `2px solid ${AMBER}`,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 20,
            letterSpacing: 6,
            color: DIM,
          }}
        >
          <span>[ {settings.url.replace(/^https?:\/\/|\/$/g, "").toUpperCase()} ]</span>
          <span style={{ color: AMBER }}>● {settings.hiring ? "AVAILABLE" : "BUSY"}</span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "auto",
          }}
        >
          <div
            style={{
              fontSize: 96,
              fontWeight: 700,
              letterSpacing: 4,
              color: AMBER,
              lineHeight: 1,
            }}
          >
            {settings.name.toUpperCase()}
          </div>

          {/*
            Tek metin düğümü: satori, birden fazla çocuğu olan her `div` için
            açık `display` istiyor. Metni burada birleştirmek, sırf bu kural
            için sarmalayıcı eklemekten temiz.
          */}
          <div
            style={{
              marginTop: 20,
              fontSize: 28,
              letterSpacing: 6,
              color: FG,
            }}
          >
            {[
              settings.title.toUpperCase(),
              settings.currentCompany
                ? `@ ${settings.currentCompany.toUpperCase()}`
                : null,
            ]
              .filter(Boolean)
              .join(" ")}
          </div>
        </div>

        <div
          style={{
            marginTop: 40,
            height: 1,
            background: LINE,
            display: "flex",
          }}
        />

        <div
          style={{
            marginTop: 24,
            display: "flex",
            flexDirection: "column",
            gap: 10,
            fontSize: 20,
            color: DIM,
          }}
        >
          <div style={{ display: "flex", gap: 24 }}>
            <span style={{ width: 120, letterSpacing: 4 }}>LOC</span>
            <span style={{ color: FG }}>{settings.location.toUpperCase()}</span>
          </div>
          <div style={{ display: "flex", gap: 24 }}>
            <span style={{ width: 120, letterSpacing: 4 }}>STACK</span>
            <span style={{ color: FG }}>{stack}</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "GeistMono", data: regular, weight: 400, style: "normal" },
        { name: "GeistMono", data: bold, weight: 700, style: "normal" },
      ],
    },
  );
}
