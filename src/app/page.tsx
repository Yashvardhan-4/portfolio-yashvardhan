import { SitePreloader } from "@/components/ui/SitePreloader";
import { MonumentalHero } from "@/components/hero/MonumentalHero";
import { TechStackLoop } from "@/components/ui/TechStackLoop";
import { SelectedWork } from "@/components/work/SelectedWork";
import { AboutPhilosophy } from "@/components/about/AboutPhilosophy";
import { ContactColophon } from "@/components/contact/ContactColophon";
import { ClickSpark } from "@/components/ui/ClickSpark";
import { MinimalEditorialNav } from "@/components/navigation/MinimalEditorialNav";

export default function Home() {
  return (
    <>
      <SitePreloader />
      <ClickSpark
        sparkColor={["#A855F7", "#C084FC", "#38BDF8", "#F3F4F6"]}
        sparkCount={9}
        sparkSize={13}
        sparkRadius={32}
        glow={0.55}
      >
        <main className="min-h-screen bg-[var(--bg)] text-[var(--fg)] flex flex-col transition-colors duration-300">
          <MinimalEditorialNav />
          <MonumentalHero />
          <TechStackLoop />
          <SelectedWork />
          <AboutPhilosophy />
          <ContactColophon />
        </main>
      </ClickSpark>
    </>
  );
}
