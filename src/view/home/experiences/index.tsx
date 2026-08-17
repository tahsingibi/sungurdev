import { ExperienceTimeline } from "@/components/custom/experience-timeline";
import { Panel } from "@/components/custom/panel";
import settings from "@/lib/settings";

/**
 * Deneyim bandı — tek panel.
 *
 * Yanında bir rol listesi de vardı ve aynı üç kaydı iki kere yazıyordu.
 * Liste kalktı, taşıdığı bilgi çubukların künye satırına girdi: tek kutu
 * hem okunacak kaydı hem kariyerin şeklini gösteriyor.
 */
export default function Experiences() {
  const { experience, pages } = settings;
  const { path, heading, description } = pages.works;

  const shipped = experience.reduce(
    (sum, item) => sum + item.projects.length,
    0,
  );

  return (
    <section className="flex flex-col">
      <div className="px-6 pb-8">
        <Panel
          label="timeline"
          action={
            <span className="tnum text-2xs text-muted-foreground">
              {String(shipped).padStart(2, "0")} shipped
            </span>
          }
        >
          <ExperienceTimeline items={experience} />
        </Panel>
      </div>
    </section>
  );
}
