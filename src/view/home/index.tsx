import Experiences from "./experiences";
import HomeGitHubContributions from "./github-contributions";
import Hero from "./hero";
import Projects from "./projects";
import Stack from "./stack";
import Write from "./write";

export default function HomepageView() {
  return (
    <main className="flex flex-col">
      <Hero />
      <HomeGitHubContributions />
      <div className="border-t border-border/60">
        <Stack />
      </div>
      <div className="border-t border-border/60">
        <Experiences />
      </div>
      <div className="border-t border-border/60">
        <Write />
      </div>
      <div className="border-t border-border/60">
        <Projects />
      </div>
    </main>
  );
}
