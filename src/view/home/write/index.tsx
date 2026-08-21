import { Row, Rows, Section } from "@/components/custom/section";
import { getPosts } from "@/lib/posts";
import settings from "@/lib/settings";

/** `2026-08-16` → `16 Aug 2026`. Tarih okunacak bir şey, kod değil. */
function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

/**
 * Son yazılar.
 *
 * Kart ızgarası yerine liste: dar kolonda üç kart alt alta dizilince her biri
 * kendi çerçevesiyle bir bölüm gibi görünüyordu. Satırda okunacak tek şey
 * başlık; kategori ve tarih onun altında, ikinci sırada duruyor.
 */
export default async function Write() {
  const { pages } = settings;
  const posts = (await getPosts()).slice(0, 3);

  if (!posts.length) {
    return (
      <Section title="latest notes">
        <p className="text-sm text-muted-foreground">{pages.write.error}</p>
      </Section>
    );
  }

  return (
    <Section
      title="latest notes"
      link={{ href: pages.write.path }}
    >
      <Rows>
        {posts.map((post) => (
          <Row
            key={post.slug}
            href={`/write/${post.slug}`}
            title={post.title}
            subtitle={
              <span className="inline-flex items-center gap-2">
                <span className="rounded-sm border border-border px-1.5 py-px font-mono text-2xs lowercase">
                  {post.category}
                </span>
                <time dateTime={post.publishDate}>
                  {formatDate(post.publishDate)}
                </time>
              </span>
            }
          />
        ))}
      </Rows>
    </Section>
  );
}
