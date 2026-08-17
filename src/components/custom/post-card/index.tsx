import { Panel } from "@/components/custom/panel";
import type { Post } from "@/lib/posts";

/**
 * Yazı kartı — panelin kendisi kayıt kutusu.
 *
 * Etiket kayıt numarası (`log_05`), sağda tarih, gövdede kategori + başlık.
 * Kutunun tamamı bağlantı: çerçeve hover'da ambere dönüyor, ayrıca bir
 * "devamını oku" düğmesi gerekmiyor.
 *
 * Açıklama yalnızca arşivde (`showDescription`): orada ızgara iki sütun ve
 * okur hangi yazıya gireceğine karar veriyor. Ana sayfadaki üç dar sütunda
 * ise başlıklar zaten iki satıra sarıyor, altına bir de özet girince kart
 * okunacak bir şey olmaktan çıkıp duvara dönüyordu.
 */
export function PostCard({
  post,
  record,
  showDescription = false,
}: {
  post: Post;
  /** Kayıt numarası — dizideki gerçek sırası, kırpılmış listeye göre değil. */
  record: string;
  showDescription?: boolean;
}) {
  return (
    <Panel
      label={record}
      href={`/write/${post.slug}`}
      action={
        <time
          dateTime={post.publishDate}
          className="tnum shrink-0 text-2xs text-muted-foreground transition-colors group-hover:text-primary"
        >
          {post.publishDate}
        </time>
      }
    >
      <div className="flex h-full flex-col">
        <span className="text-2xs lowercase text-muted-foreground">
          {post.category}
        </span>

        <h3 className="mt-1.5 text-xs leading-snug transition-colors group-hover:text-primary">
          {post.title}
        </h3>

        {showDescription && post.description ? (
          <p className="mt-2 line-clamp-3 text-2xs leading-relaxed text-muted-foreground">
            {post.description}
          </p>
        ) : null}

        <span
          aria-hidden
          className="mt-auto pt-6 text-2xs text-muted-foreground transition-colors group-hover:text-primary"
        >
          read →
        </span>
      </div>
    </Panel>
  );
}
