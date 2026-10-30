import { SitePreloader } from "@/components/ui/SitePreloader";
import { MonumentalHero } from "@/components/hero/MonumentalHero";
import { TechStackLoop } from "@/components/ui/TechStackLoop";
import { SelectedWork } from "@/components/work/SelectedWork";
import { AboutPhilosophy } from "@/components/about/AboutPhilosophy";
import { ContactColophon } from "@/components/contact/ContactColophon";
import { ClickSpark } from "@/components/ui/ClickSpark";
import { FloatingNav } from "@/components/navigation/FloatingNav";

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
        <main className="min-h-screen bg-[#08090C] text-[#EDEDEF] flex flex-col selection:bg-[#A855F7] selection:text-[#08090C]">
          <FloatingNav />
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
