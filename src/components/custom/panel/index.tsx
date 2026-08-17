import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Panel — sayfanın her yerinde kullanılan çerçeveli kayıt kutusu.
 *
 * Arsenal/Activity ikilisinde ortaya çıktı ve dilin en karakteristik parçası
 * oldu: köşesiz çerçeve, üstte küçük harf aralıklı bir etiket, sağda isteğe
 * bağlı bir eylem. Tek yerden yönetiliyor ki her kullanımda yeniden
 * uydurulmasın.
 *
 * `href` verilince kutunun tamamı tek bir hedefe gidiyor: yazı kartlarında
 * tıklama alanı başlıkla sınırlı kalmasın diye. Çerçevenin kendisi hover
 * göstergesi — ayrıca bir "devamı" düğmesi eklemeye gerek kalmıyor.
 */
export function Panel({
  label,
  action,
  children,
  className,
  bodyClassName,
  href,
  external = false,
}: {
  label: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
  href?: string;
  /** Dış bağlantı — yeni sekmede açılır (proje kartları). */
  external?: boolean;
}) {
  const content = (
    <>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="text-2xs uppercase tracking-[0.3em] text-muted-foreground">
          {label}
        </h3>
        {action}
      </div>
      {/* `flex-1`: içeriği dikeyde yayılabilen paneller (ör. sparkline)
          kutunun altını boş bırakmasın. */}
      <div className={cn("min-w-0 flex-1", bodyClassName)}>{children}</div>
    </>
  );

  const base = "flex flex-col border border-border p-4";

  if (href) {
    return (
      <Link
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={cn(
          base,
          "group transition-colors hover:border-primary/60 hover:bg-primary/[0.04]",
          className,
        )}
      >
        {content}
      </Link>
    );
  }

  return <div className={cn(base, className)}>{content}</div>;
}

/**
 * Panel içi alan/değer satırı.
 *
 * Etiket sütunu sabit genişlikte: birden çok satır alt alta gelince göz tek
 * bir kolonu tarayabiliyor. Dar ekranda sütun bozulup alt alta düşüyor.
 */
export function PanelField({
  label,
  children,
  labelWidth = "w-20",
}: {
  label: string;
  children: ReactNode;
  labelWidth?: string;
}) {
  return (
    <div className="flex gap-3 max-sm:flex-col max-sm:gap-0.5 sm:items-baseline">
      <dt
        className={cn(
          "shrink-0 text-2xs uppercase tracking-[0.16em] text-muted-foreground",
          labelWidth,
        )}
      >
        {label}
      </dt>
      <dd className="min-w-0 text-2xs leading-relaxed">{children}</dd>
    </div>
  );
}

/** Nokta ile ayrılmış değer listesi — stack, etiketler, teknolojiler. */
export function DotList({ items }: { items: readonly string[] }) {
  return (
    <>
      {items.map((item, index) => (
        <span key={item}>
          {index > 0 ? (
            <span aria-hidden className="text-border">
              {" · "}
            </span>
          ) : null}
          {item}
        </span>
      ))}
    </>
  );
}
