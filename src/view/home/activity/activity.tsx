import type { Activity } from "@/components/contribution-graph";
import { Section } from "@/components/custom/section";
import { getCachedContributions } from "@/lib/get-cached-contributions";
import settings from "@/lib/settings";

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
 * Aktivite.
 *
 * Sayfadaki tek grafik ve çerçevesi yok: dar kolonda kutuya alınınca hem
 * kendi kenarlığı hem sayfanın boşluğu aynı işi iki kere yapıyordu. Sayı,
 * künye ve çubuklar alt alta duruyor — okunacak sıra da bu.
 */
export default async function Activity() {
  const contributions = await getCachedContributions(GITHUB_USERNAME);

  const total = contributions.reduce((sum, day) => sum + day.count, 0);
  const sparkline = toSparkline(contributions);
  const year = contributions.at(-1)?.date.slice(0, 4) ?? "";

  return (
    <Section title="activity" link={{ href: GITHUB_PROFILE_URL, external: true }}>
      <div className="flex flex-col gap-1">
        <p className="tnum text-5xl leading-none font-medium tracking-tight text-foreground">
          {total.toLocaleString("en-US")}
        </p>
        <p className="font-mono text-2xs text-muted-foreground">
          contributions · {year} · github
        </p>

        {/*
          Sparkline gerçek veriden: her çubuk bir haftanın toplamı, yükseklik
          yılın en yoğun haftasına göre normalize. Blok karakteri yerine
          gerçek elemanlar kullanılıyor — yazı tipinden bağımsız, her
          genişlikte net.
        */}
        {sparkline.length ? (
          <div aria-hidden className="mt-6 flex h-18 items-end gap-0.5">
            {sparkline.map((value, index) => (
              <span
                key={index}
                className="flex-1 rounded-t-[2px] bg-foreground"
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
    </Section>
  );
}
