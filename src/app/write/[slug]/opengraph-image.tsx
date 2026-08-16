import { getPost, getPosts } from "@/lib/posts";
import settings from "@/lib/settings";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

/**
 * Yazıya özel OpenGraph kartı.
 *
 * Ana karttaki dilin aynısı — amber çerçeve, `[ ETİKET ]`, hizalı künye —
 * ama merkezinde yazının başlığı var. Her yazı için derleme anında bir kez
 * üretiliyor ve statik varlık olarak yayınlanıyor.
 *
 * `generateStaticParams` olmadan bu route dinamik kalır ve Cloudflare
 * Workers'ta çalışma anında font okumaya çalışırdı — orada dosya sistemi yok.
 */
export const dynamic = "force-static";
export const dynamicParams = false;

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BG = "#0d0b07";
const FG = "#efe6d4";
const AMBER = "#ffb020";
const DIM = "#8b8172";
const LINE = "#2a241a";

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
  const [regular, bold] = await Promise.all([
    readFile(path.join(fontDir, "GeistMono-Regular.ttf")),
    readFile(path.join(fontDir, "GeistMono-Bold.ttf")),
  ]);

  const title = post?.title ?? settings.name;
  /*
   * Punto başlık uzunluğuna göre iniyor: sabit bıraksak uzun başlıklar
   * kartı taşırıyor, kısa olanlar da kaybolmuş görünüyordu.
   */
  const titleSize = title.length > 60 ? 48 : title.length > 38 ? 58 : 70;

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
          <span>[ {(post?.category ?? "WRITE").toUpperCase()} ]</span>
          <span>{post?.publishDate ?? ""}</span>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: "auto",
            fontSize: titleSize,
            fontWeight: 700,
            lineHeight: 1.14,
            letterSpacing: -1,
            color: FG,
          }}
        >
          {title}
        </div>

        <div
          style={{ marginTop: 32, height: 1, background: LINE, display: "flex" }}
        />

        <div
          style={{
            marginTop: 24,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
          }}
        >
          <span style={{ color: AMBER, letterSpacing: 4 }}>
            {settings.name.toUpperCase()}
          </span>
          <span style={{ color: DIM, letterSpacing: 4 }}>
            {settings.url.replace(/^https?:\/\/|\/$/g, "").toUpperCase()}
          </span>
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
