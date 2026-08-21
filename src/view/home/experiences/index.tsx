import { Row, RowMedia, Rows, Section } from "@/components/custom/section";
import settings from "@/lib/settings";

/** "Hypeople Studio" → "HY". Logo dosyası olmayan kayıtlar için. */
function initials(name: string) {
  return name.slice(0, 2).toUpperCase();
}

/**
 * Deneyim.
 *
 * Zaman çizelgesi grafiği burada değil, `/works` sayfasında: ana sayfada
 * sorulan şey "nerede çalıştı", çubukların anlattığı "ne kadar sürdü" ise
 * detay. Üç satır o soruyu tam olarak cevaplıyor.
 */
export default function Experiences() {
  const { experience, pages } = settings;

  return (
    <Section
      id="experiences"
      title="experiences"
      link={{ href: pages.works.path }}
    >
      <Rows>
        {experience.map((item) => (
          <Row
            key={item.id}
            href={item.path}
            media={<RowMedia>{initials(item.name)}</RowMedia>}
            title={item.name}
            subtitle={item.title}
            meta={item.year}
          />
        ))}
      </Rows>
    </Section>
  );
}
