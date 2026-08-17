import type { Post } from "@/lib/posts";

/**
 * Yazı dizini — bölümün üstünde yatay şerit.
 *
 * Activity panelinin blog karşılığı ama yatık: solda parlayan sayı ve
 * künye, sağda kategori dağılımı. Dar bir rayda dikey dururken sayı ile
 * çubuklar arasında kocaman bir boşluk kalıyordu; yan yana gelince şerit
 * kendi yüksekliği kadar yer kaplıyor ve altındaki kartlara tam genişlik
 * bırakıyor.
 */
export function PostIndex({ posts }: { posts: Post[] }) {
  const counts = new Map<string, number>();
  for (const post of posts) {
    counts.set(post.category, (counts.get(post.category) ?? 0) + 1);
  }

  const categories = [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((left, right) => right.count - left.count);

  const peak = Math.max(...categories.map((category) => category.count), 1);
  const latest = posts[0]?.publishDate;
  const first = posts.at(-1)?.publishDate;

  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between sm:gap-10">
      <div className="min-w-0">
        <p className="nfo-glow tnum text-5xl leading-none text-primary">
          {String(posts.length).padStart(2, "0")}
        </p>
        <p className="mt-2 text-2xs text-muted-foreground">
          posts · {categories.length} topics
        </p>
        {latest ? (
          <p className="mt-1 text-2xs text-muted-foreground">
            latest <span className="tnum">{latest}</span>
            {first && first !== latest ? (
              <>
                <span aria-hidden className="text-border">
                  {" · "}
                </span>
                first <span className="tnum">{first}</span>
              </>
            ) : null}
          </p>
        ) : null}
      </div>

      {/* `sm:items-end` ile çubuklar sayının taban çizgisiyle aynı yerde
          bitiyor — şeridin iki yarısı aynı hizada oturuyor. */}
      <dl className="flex w-full flex-col gap-2.5 sm:max-w-xs">
        {categories.map((category, index) => (
          <div key={category.name} className="flex items-center gap-3">
            <dt className="w-20 shrink-0 truncate text-2xs lowercase text-muted-foreground">
              {category.name}
            </dt>
            <dd className="flex min-w-0 flex-1 items-center gap-3">
              <span className="h-2.5 min-w-0 flex-1 bg-border/60">
                <span
                  aria-hidden
                  className="block h-full bg-primary"
                  style={{
                    width: `${(category.count / peak) * 100}%`,
                    opacity: 1 - index * 0.22,
                  }}
                />
              </span>
              <span className="tnum shrink-0 text-2xs text-muted-foreground">
                {String(category.count).padStart(2, "0")}
              </span>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
