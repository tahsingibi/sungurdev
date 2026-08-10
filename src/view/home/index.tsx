import Experiences from "./experiences";
import HomeGitHubContributions from "./github-contributions";
import Hero from "./hero";
import Projects from "./projects";
import Write from "./write";

export default function HomepageView() {
  return (
    <main>
      <Hero />
      <div className="divider-screen" />
      <HomeGitHubContributions />
      <div className="divider-screen divider-hatch" />
      <Experiences />
      <div className="divider-screen divider-block" />
      <Write />
      <div className="divider-screen divider-block" />
      <Projects />
    </main>
  );
}
