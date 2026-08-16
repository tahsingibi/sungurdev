import type { Post } from "@/lib/posts";
import Link from "next/link";

interface PostListProps {
  posts: Post[];
  showDescription?: boolean;
}

/**
 * Yazı dizini — numaralı kayıtlar.
 *
 * Diğer iki listeden bilerek farklı: burada asıl içerik *başlık* ve başlıklar
 * uzun. Tarih/kategori ile aynı satırda yarıştıklarında ya kırpılıyor ya
 * sarıp hizayı bozuyorlardı.
 *
 * Bu yüzden meta üstte ince bir künye satırında (numara — çizgi — tarih ·
 * kategori), başlık ise kendi satırında, büyük harf yapılmadan duruyor.
 * Uzunluk artık sorun değil ve göz doğrudan başlığa iniyor.
 */
export function PostList({ posts, showDescription = false }: PostListProps) {
  return (
    <ol className="flex flex-col">
      {posts.map((post, index) => (
        <li key={post.slug}>
          <Link
            href={`/write/${post.slug}`}
            className="group flex flex-col border-t border-border py-4 transition-colors hover:bg-primary/[0.04]"
          >
            <div className="flex items-center gap-3 text-2xs text-muted-foreground">
              <span
                aria-hidden
                className="tnum shrink-0 text-border transition-colors group-hover:text-primary"
              >
                {String(posts.length - index).padStart(2, "0")}
              </span>
              <span aria-hidden className="h-px w-6 shrink-0 bg-border" />
              <time dateTime={post.publishDate} className="tnum shrink-0">
                {post.publishDate}
              </time>
              <span aria-hidden className="text-border">
                ·
              </span>
              <span className="shrink-0 lowercase">{post.category}</span>
            </div>

            <h3 className="mt-2 text-sm leading-snug transition-colors group-hover:text-primary">
              {post.title}
            </h3>

            {showDescription && post.description ? (
              <p className="mt-1 text-2xs leading-relaxed text-muted-foreground">
                {post.description}
              </p>
            ) : null}
          </Link>
        </li>
      ))}
    </ol>
  );
}
