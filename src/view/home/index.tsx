import Activity from "./activity/activity";
import Experiences from "./experiences";
import Hero from "./hero";
import Projects from "./projects";
import Write from "./write";
export default function HomepageView() {
  return (
    <main className="flex flex-col">
      <Hero />
      {/* Panel bantları: her bölüm çerçeveli kutulardan kuruluyor ama düzenleri
          farklı (yan yana ikili, tam genişlik tek panel, şerit + üçlü ızgara)
          — hepsi aynı ızgarada olsaydı sayfa tek bir tablo gibi düzleşirdi. */}
      <Activity />
      <div className="border-t border-border pt-8">
        <Experiences />
      </div>
      <div className="border-t border-border pt-8">
        <Write />
      </div>
      <div className="border-t border-border pt-8">
        <Projects />
      </div>
    </main>
  );
}
