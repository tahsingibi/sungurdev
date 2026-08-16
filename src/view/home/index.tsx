import Arsenal from "./arsenal";
import Experiences from "./experiences";
import Hero from "./hero";
import Projects from "./projects";
import Write from "./write";

export default function HomepageView() {
  return (
    <main className="flex flex-col">
      <Hero />
      {/* Arsenal + Activity tek bantta yan yana; sayfadaki tek iki sütunlu
          alan burası ve bu, akışa ritim veriyor. */}
      <div className="border-t border-border">
        <Arsenal />
      </div>
      <div className="border-t border-border">
        <Experiences />
      </div>
      <div className="border-t border-border">
        <Write />
      </div>
      <div className="border-t border-border">
        <Projects />
      </div>
    </main>
  );
}
