import settings from "@/lib/settings";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

/**
 * OpenGraph kartı — sayfanın kendi dilinde.
 *
 * Sitenin kabuğunu birebir taşıyor: is siyahı zemin, üstünde yumuşak köşeli
 * tek bir yüzey, sans başlık, mono künye satırları ve tek renkli bir durum
 * göstergesi. Paylaşılan bağlantı sitenin neye benzediğini söylemeli —
 * jenerik bir profil fotoğrafı bunu yapmıyor.
 *
 * Yazı tipi elle veriliyor: satori sistem fontlarını görmüyor, verilmezse
 * sans-serif bir varsayılana düşüyor ve kartın bütün tipografisi kayboluyor.
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

/*
 * Renkler koyu temanın token'larıyla aynı, yalnızca opak: satori `oklch()`
 * ve CSS değişkeni okumuyor, her değer düz bir hex olmak zorunda.
 */
const BG = "#09090b"; /* zinc-950 — sayfanın zemini */
const CARD = "#121214"; /* künyenin zemini, sayfadaki gibi bir tık açık */
const LINE = "#202024";
const FG = "#fafafa";
const BODY = "#d4d4d8"; /* zinc-300 */
const DIM = "#71717a"; /* zinc-500 */
const GREEN = "#34d399";

export default async function OpenGraphImage() {
  const fontDir = path.join(process.cwd(), "public", "fonts");
  const [sans, sansMedium, mono] = await Promise.all([
    readFile(path.join(fontDir, "Geist-Regular.ttf")),
    readFile(path.join(fontDir, "Geist-Medium.ttf")),
    readFile(path.join(fontDir, "GeistMono-Regular.ttf")),
  ]);

  const host = settings.url.replace(/^https?:\/\/|\/$/g, "");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: BG,
          padding: 48,
          fontFamily: "Geist",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            background: CARD,
            border: `1px solid ${LINE}`,
            borderRadius: 32,
            padding: 64,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontFamily: "GeistMono",
              fontSize: 26,
              color: DIM,
            }}
          >
            <span>{host}</span>
            {settings.hiring ? (
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  color: GREEN,
                }}
              >
                {/* Noktanın kendisi bir öğe: sitede de renk tek başına
                    durumu anlatmıyor, yanında yazısı duruyor. */}
                <span
                  style={{
                    width: 14,
                    height: 14,
                    borderRadius: 999,
                    background: GREEN,
                    display: "flex",
                  }}
                />
                open to work
              </span>
            ) : null}
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
                fontSize: 92,
                fontWeight: 500,
                letterSpacing: -2,
                lineHeight: 1.05,
                color: FG,
              }}
            >
              {settings.name}
            </div>

            {/*
              Tek metin düğümü: satori, birden fazla çocuğu olan her `div` için
              açık `display` istiyor. Metni burada birleştirmek, sırf bu kural
              için sarmalayıcı eklemekten temiz.
            */}
            <div
              style={{
                marginTop: 18,
                fontFamily: "GeistMono",
                fontSize: 30,
                color: DIM,
              }}
            >
              {[
                `@${settings.slug}`,
                settings.title.toLowerCase(),
                settings.location,
              ].join("  ·  ")}
            </div>
          </div>

          <div
            style={{
              marginTop: 44,
              height: 1,
              background: LINE,
              display: "flex",
            }}
          />

          <div
            style={{
              marginTop: 28,
              fontSize: 30,
              lineHeight: 1.4,
              color: BODY,
            }}
          >
            {settings.tagline}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Geist", data: sans, weight: 400, style: "normal" },
        { name: "Geist", data: sansMedium, weight: 500, style: "normal" },
        { name: "GeistMono", data: mono, weight: 400, style: "normal" },
      ],
    },
  );
}
