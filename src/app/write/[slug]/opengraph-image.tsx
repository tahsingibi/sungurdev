import { getPost, getPosts } from "@/lib/posts";
import settings from "@/lib/settings";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

/**
 * Yazıya özel OpenGraph kartı.
 *
 * Ana karttaki kabuğun aynısı — is siyahı zemin, yumuşak köşeli tek yüzey,
 * mono künye satırları — ama merkezinde yazının başlığı var. Her yazı için
 * derleme anında bir kez üretiliyor ve statik varlık olarak yayınlanıyor.
 *
 * `generateStaticParams` olmadan bu route dinamik kalır ve Cloudflare
 * Workers'ta çalışma anında font okumaya çalışırdı — orada dosya sistemi yok.
 */
export const dynamic = "force-static";
export const dynamicParams = false;

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BG = "#09090b";
const CARD = "#121214";
const LINE = "#202024";
const FG = "#fafafa";
const BODY = "#d4d4d8";
const DIM = "#71717a";

/** `2026-08-16` → `16 Aug 2026`. Kartta da sitedeki biçim. */
function formatDate(value?: string) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

export async function generateStaticParams() {
  return (await getPosts()).map(({ slug }) => ({ slug }));
}

export default async function PostOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  const fontDir = path.join(process.cwd(), "public", "fonts");
  const [sans, sansMedium, mono] = await Promise.all([
    readFile(path.join(fontDir, "Geist-Regular.ttf")),
    readFile(path.join(fontDir, "Geist-Medium.ttf")),
    readFile(path.join(fontDir, "GeistMono-Regular.ttf")),
  ]);

  const title = post?.title ?? settings.name;
  /*
   * Punto başlık uzunluğuna göre iniyor: sabit bıraksak uzun başlıklar
   * kartı taşırıyor, kısa olanlar da kaybolmuş görünüyordu.
   */
  const titleSize = title.length > 60 ? 54 : title.length > 38 ? 66 : 78;

  /* Açıklama iki satırı geçmesin: altındaki künye satırı aşağı itiliyordu. */
  const description =
    post?.description && post.description.length > 130
      ? `${post.description.slice(0, 127).trimEnd()}…`
      : post?.description;

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
              fontFamily: "GeistMono",
              fontSize: 26,
              color: DIM,
            }}
          >
            <span>{(post?.category ?? "write").toLowerCase()}</span>
            <span>{formatDate(post?.publishDate)}</span>
          </div>

          <div
            style={{
              display: "flex",
              marginTop: "auto",
              fontSize: titleSize,
              fontWeight: 500,
              lineHeight: 1.15,
              letterSpacing: -1.5,
              color: FG,
            }}
          >
            {title}
          </div>

          {description ? (
            <div
              style={{
                marginTop: 24,
                fontSize: 30,
                lineHeight: 1.4,
                color: DIM,
              }}
            >
              {description}
            </div>
          ) : null}

          <div
            style={{ marginTop: 44, height: 1, background: LINE, display: "flex" }}
          />

          <div
            style={{
              marginTop: 28,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontFamily: "GeistMono",
              fontSize: 26,
            }}
          >
            <span style={{ color: BODY }}>{settings.name}</span>
            <span style={{ color: DIM }}>
              {settings.url.replace(/^https?:\/\/|\/$/g, "")}
            </span>
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
