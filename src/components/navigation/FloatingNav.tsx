"use client";

import React, { useState, useEffect } from "react";
import { PillNav } from "@/components/ui/PillNav";
import { Magnet } from "@/components/ui/Magnet";
import { ArrowUpRight } from "lucide-react";
import { StarBorder } from "@/components/ui/StarBorder";

export function FloatingNav() {
  const [activeSection, setActiveSection] = useState("#");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 120);

      const workEl = document.getElementById("work");
      const aboutEl = document.getElementById("about");
      const contactEl = document.getElementById("contact");

      const workTop = workEl ? workEl.offsetTop - 200 : Infinity;
      const aboutTop = aboutEl ? aboutEl.offsetTop - 200 : Infinity;
      const contactTop = contactEl ? contactEl.offsetTop - 200 : Infinity;

      if (scrollY >= contactTop) {
        setActiveSection("#contact");
      } else if (scrollY >= aboutTop) {
        setActiveSection("#about");
      } else if (scrollY >= workTop) {
        setActiveSection("#work");
      } else {
        setActiveSection("#");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", href: "#" },
    { label: "Projects", href: "#work" },
    { label: "Credentials", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav
      aria-label="Floating Primary Navigation"
      className={`fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 max-w-full px-4 ${
        scrolled ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
      }`}
    >
      <div className="flex items-center gap-3">
        <PillNav
          items={navItems}
          activeHref={activeSection}
          theme="dark"
          layout="joined"
          surface="glass"
          size="sm"
          itemStyle="pill"
          hoverEffect="glide"
          indicator="dot"
          highlightColor="#A855F7"
          className="shadow-[0_12px_40px_rgba(0,0,0,0.85)] border border-[#1E2430]/90 bg-[#0A0D14]/90 backdrop-blur-xl"
        />

        <div className="hidden md:block">
          <Magnet padding={30} magnetStrength={2}>
            <StarBorder
              as="a"
              href="mailto:yashvardhanborude7@gmail.com"
              color="#A855F7"
              trailColor="#C084FC"
              duration={3.5}
              thickness={1}
              radius={999}
              glow={0.5}
              sparkle={true}
              className="px-3.5 py-1.5 text-[11px] font-mono tracking-wider text-[#EDEDEF] bg-[#0E1015]/90 border border-[#1E2430] hover:text-[#C084FC] transition-colors"
            >
              <span>CONNECT</span>
              <ArrowUpRight className="h-3 w-3 text-[#C084FC]" />
            </StarBorder>
          </Magnet>
        </div>
      </div>
    </nav>
  );
}

export default FloatingNav;
