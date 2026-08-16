import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/**
 * Panel — sayfanın her yerinde kullanılan çerçeveli kayıt kutusu.
 *
 * Arsenal/Activity ikilisinde ortaya çıktı ve dilin en karakteristik parçası
 * oldu: köşesiz çerçeve, üstte küçük harf aralıklı bir etiket, sağda isteğe
 * bağlı bir eylem. Tek yerden yönetiliyor ki her kullanımda yeniden
 * uydurulmasın.
 */
export function Panel({
  label,
  action,
  children,
  className,
  bodyClassName,
}: {
  label: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <div className={cn("flex flex-col border border-border p-4", className)}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="text-2xs uppercase tracking-[0.3em] text-muted-foreground">
          {label}
        </h3>
        {action}
      </div>
      {/* `flex-1`: içeriği dikeyde yayılabilen paneller (ör. sparkline)
          kutunun altını boş bırakmasın. */}
      <div className={cn("min-w-0 flex-1", bodyClassName)}>{children}</div>
    </div>
  );
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
