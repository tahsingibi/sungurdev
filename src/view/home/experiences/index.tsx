import { ExperienceList } from "@/components/custom/experience-list";
import { SectionHeader } from "@/components/custom/section-header";
import settings from "@/lib/settings";

export default function Experiences() {
  const { experience, pages } = settings;
  const { path, heading, description } = pages.works;

  return (
    <section className="flex flex-col">
      <SectionHeader
        heading={heading}
        description={description}
        href={path}
        meta={`${experience.length} roles`}
      />
      <div className="px-6 pb-8">
        <ExperienceList items={experience} />
      </div>
    </section>
  );
}
