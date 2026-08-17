import Arsenal from "./arsenal";
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
      <div className="border-t border-border">
        <Arsenal />
      </div>
      <Experiences />
      <div className="border-t border-border pt-6">
        <Write />
      </div>
      <div className="border-t border-border pt-6">
        <Projects />
      </div>
    </main>
  );
}
