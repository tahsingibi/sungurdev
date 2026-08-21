import Activity from "./activity/activity";
import Experiences from "./experiences";
import Hero from "./hero";
import Projects from "./projects";
import Write from "./write";

/**
 * Ana sayfa.
 *
 * Tek bir kolon, aralarında eşit boşlukla dizilmiş beş bölüm. Bölümleri
 * ayıran çizgi yok: v1'in kurduğu ritim buydu ve dar kolonda çizgi her
 * bölümü bir forma çeviriyor. Sıra da bilgi: kim → ne kadar üretiyor →
 * nerede çalıştı → ne yazdı → ne yaptı.
 */
export default function HomepageView() {
  return (
    <>
      <Hero />
      <Activity />
      <Experiences />
      <Write />
      <Projects />
    </>
  );
}
