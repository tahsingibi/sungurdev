import { DotList, Panel, PanelField } from "@/components/custom/panel";
import type { Activity } from "@/components/contribution-graph";
import { getCachedContributions } from "@/lib/get-cached-contributions";
import settings from "@/lib/settings";
import Link from "next/link";

const GITHUB_USERNAME = settings.github as string;
const GITHUB_PROFILE_URL = `https://github.com/${GITHUB_USERNAME}`;

/** Sparkline'daki çubuk sayısı — bir yıl, haftalık kovalar. */
const BUCKETS = 52;

/**
 * Günlük katkıları haftalık kovalara toplar ve her kovayı 0-1 aralığına
 * normalize eder.
 *
 * Neden haftalık: 365 çubuk bu genişlikte birbirine giriyor ve okunmuyor;
 * 52 çubuk hem sığıyor hem yılın ritmini (yoğun dönemler, boşluklar)
 * gerçekten gösteriyor.
 */
function toSparkline(activities: Activity[]): number[] {
  if (!activities.length) return [];

  const size = Math.ceil(activities.length / BUCKETS);
  const buckets: number[] = [];

  for (let i = 0; i < activities.length; i += size) {
    buckets.push(
      activities.slice(i, i + size).reduce((sum, day) => sum + day.count, 0),
    );
  }

  const peak = Math.max(...buckets, 1);
  return buckets.map((value) => value / peak);
}

/**
 * Arsenal + Activity.
 *
 * İki blok tek bir bantta yan yana duruyor. Ayrı ayrı, tam genişlikte
 * bölümler olarak sayfanın yarısını yiyorlardı — oysa ikisi de referans
 * bilgisi, ana anlatı değil. Yan yana konunca hem yer açılıyor hem sayfaya
 * ritim geliyor: her şeyin tam genişlikte akmadığı tek bant burası.
 */
export default async function Arsenal() {
  const { stack } = settings;
  const contributions = await getCachedContributions(GITHUB_USERNAME);

  const total = contributions.reduce((sum, day) => sum + day.count, 0);
  const sparkline = toSparkline(contributions);
  const year = contributions.at(-1)?.date.slice(0, 4) ?? "";

  return (
    <section className="grid gap-4 px-6 py-8 md:grid-cols-2">
      <Panel label="arsenal">
        <dl className="flex flex-col gap-2">
          {stack.map((category) => (
            <PanelField key={category.id} label={category.label}>
              <DotList items={category.items} />
            </PanelField>
          ))}
        </dl>
      </Panel>

      <Panel
        label="activity"
        action={
          <Link
            href={GITHUB_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xs text-muted-foreground transition-colors hover:text-primary"
          >
            github →
          </Link>
        }
      >
        <div className="flex h-full flex-col">
          <p className="nfo-glow tnum text-5xl leading-none text-primary">
            {total.toLocaleString("en-US")}
          </p>
          <p className="mt-2 text-2xs text-muted-foreground">
            contributions · {year} · github
          </p>

          {/*
            Sparkline gerçek veriden: her çubuk bir haftanın toplamı, yükseklik
            yılın en yoğun haftasına göre normalize. Blok karakteri yerine
            gerçek elemanlar kullanılıyor — yazı tipinden bağımsız, her
            genişlikte net.
          */}
          {sparkline.length ? (
            <div
              aria-hidden
              // Sabit yükseklik yerine kalan alanı doldurur: arsenal paneli
              // uzun olduğu için sparkline dipte ezik bir şerit gibi kalıyor
              // ve üstünde büyük bir boşluk oluşuyordu.
              className="mt-6 flex min-h-24 flex-1 items-end gap-[2px]"
            >
              {sparkline.map((value, index) => (
                <span
                  key={index}
                  className="flex-1 bg-primary"
                  style={{
                    // Sıfır katkılı haftalar da görünsün: taban çizgisi kalıyor.
                    height: `${Math.max(6, value * 100)}%`,
                    opacity: 0.35 + value * 0.65,
                  }}
                />
              ))}
            </div>
          ) : null}
        </div>
      </Panel>
    </section>
  );
}
