import type { Metadata, Viewport } from "next";
import "./globals.css";
import { profile } from "@/data/profile";
import { ThemeProvider } from "@/context/ThemeContext";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { RainRippleEffect } from "@/components/ui/RainRippleEffect";
import { SproutMascot } from "@/components/mascot/SproutMascot";
import { SproutAICompanion } from "@/components/ai/SproutAICompanion";
import { ResumeModal } from "@/components/ui/ResumeModal";
import { TactileToast } from "@/components/ui/TactileToast";
import { DevToolsProtection } from "@/components/security/DevToolsProtection";
import { SpatialCursor } from "@/components/ui/SpatialCursor";

const SITE_URL = "https://www.yashvardhanborude.tech";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#08090C",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Yashvardhan Borude — Software Engineer & Builder",
    template: "%s | Yashvardhan Borude",
  },
  description:
    "Official portfolio of Yashvardhan Borude (PCCOE Pune). Building AI cardiac models, financial crime engines, full-stack production apps, and tactile interactive web experiences.",
  keywords: [
    "Yashvardhan Borude",
    "Yashvardhan Shashikant Borude",
    "Yashvardhan Borude Portfolio",
    "Best Developer Portfolio",
    "Best Software Engineer Portfolio 2026",
    "Creative Developer Portfolio",
    "Full Stack Software Engineer Pune",
    "PCCOE Pune Computer Engineering",
    "CardioMamba-EM Cardiac AI",
    "TRACE-X Financial Crime Engine",
    "Shivkush Nursery ERP PWA",
    "TurboIDM Download Accelerator",
    "Inkless Local-First Journal",
    "NPTEL Top 5% IoT",
    "Competitive Programmer 600+",
    "Software & AI Engineering Internships",
    "Next.js WebGL Portfolio",
    "Three.js Developer",
    "PostgreSQL Supabase Architect",
    "yashvardhan_4",
  ],
  authors: [{ name: "Yashvardhan Borude", url: SITE_URL }],
  creator: "Yashvardhan Borude",
  publisher: "Yashvardhan Borude",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "Yashvardhan Borude — Software Engineer & Builder",
    description:
      "Official portfolio of Yashvardhan Borude (PCCOE Pune). AI cardiac models, financial intelligence, production full-stack software, and interactive 3D web.",
    url: SITE_URL,
    siteName: "Yashvardhan Borude",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Yashvardhan Borude — Software Engineer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yashvardhan Borude — Software Engineer & Builder",
    description:
      "Computer Engineering student at PCCOE Pune building AI models, financial crime software, production web apps, and interactive 3D experiences.",
    creator: "@yashvardhan_4",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-48.png", type: "image/png", sizes: "48x48" },
      { url: "/icon-96.png", type: "image/png", sizes: "96x96" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: ["/favicon.ico"],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  verification: {
    google: "2BmXnEPE83Qr9MD-Z16K9a6GNhrOmL9nsHUZSjjaaqw",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: profile.name,
    legalName: profile.legalName,
    alternateName: ["Yashvardhan Shashikant Borude", "yashvardhan_4", "Yashvardhan"],
    url: SITE_URL,
    image: `${SITE_URL}/images/yashvardhan-cutout.png`,
    description: profile.subheadline,
    jobTitle: "Full Stack Software Engineer & Competitive Programmer",
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: profile.education.institution,
      url: "https://www.pccoepune.com",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Pune",
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
    email: `mailto:${profile.email}`,
    sameAs: [
      profile.github,
      profile.linkedin,
      profile.leetcode,
      profile.codeforces,
      profile.codechef,
      profile.hackerrank,
    ],
    knowsAbout: [
      "Software Engineering",
      "Deep Learning (PyTorch, Mamba SSM)",
      "Full Stack Development",
      "FastAPI & NetworkX",
      "Next.js & React 19",
      "PostgreSQL & Row-Level Security",
      "Three.js & WebGL Shaders",
      "C++ & Algorithms",
      "Desktop Systems (Electron)",
    ],
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "Yashvardhan Borude",
    alternateName: [
      "Yashvardhan",
      "Yashvardhan Borude Portfolio",
      "yashvardhanborude.tech",
      "Yashvardhan Shashikant Borude",
    ],
    description:
      "Official portfolio of Yashvardhan Borude, Computer Engineering undergraduate at PCCOE Pune (Batch of 2028) — AI-ML, Financial Intelligence, Production Systems & Creative Web.",
    publisher: {
      "@id": `${SITE_URL}/#person`,
    },
    inLanguage: "en-US",
  };

  const profilePageJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${SITE_URL}/#profilepage`,
    url: SITE_URL,
    name: "Yashvardhan Borude — Software Engineer Portfolio",
    mainEntity: {
      "@id": `${SITE_URL}/#person`,
    },
  };

  const projectsItemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Featured Projects by Yashvardhan Borude",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "CardioMamba-EM — Deep Learning Cardiac Screening",
        description:
          "Bidirectional BiMamba SSM over synchronized 500 Hz ECG & heart-sound signals reaching 98.49% benchmark accuracy and 99.56% sensitivity.",
        url: `${SITE_URL}/projects/cardiomamba-em`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "TRACE-X — Financial Crime & Insider Risk Engine",
        description:
          "7-engine AML and insider-risk studio built with FastAPI, NetworkX, Next.js 14, React Flow, and Docker.",
        url: `${SITE_URL}/projects/trace-x`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Shivkush Nursery — Enterprise ERP & Bilingual 3D PWA",
        description:
          "Paid client contract combining Next.js 16 + PostgreSQL ACID ERP with an offline-first English/Marathi 3D plant PWA.",
        url: `${SITE_URL}/projects/shivkush-nursery-pwa`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "TurboIDM — Multi-Stream Download Accelerator",
        description:
          "Up to 8x faster cross-platform Electron download manager with 32 parallel HTTP Range streams and 0.00s merge.",
        url: `${SITE_URL}/projects/turboidm`,
      },
      {
        "@type": "ListItem",
        position: 5,
        name: "Inkless — Local-First Journal & Cloud Sync",
        description:
          "Sub-5ms atomic local IndexedDB journal synced via block-level Last-Write-Wins Postgres reconciliation and GLSL shaders.",
        url: `${SITE_URL}/projects/inkless`,
      },
    ],
  };

  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500;600&family=Geist:wght@300;400;500;600;700&family=Instrument+Serif:ital@0;1&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <meta
          name="google-site-verification"
          content="2BmXnEPE83Qr9MD-Z16K9a6GNhrOmL9nsHUZSjjaaqw"
        />

        {/* Explicit Google Search Favicon Crawler Targets */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="48x48" href="/icon-48.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/icon-96.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

        {/* Explicit Application & Brand Identity Meta */}
        <meta name="application-name" content="Yashvardhan Borude" />
        <meta name="apple-mobile-web-app-title" content="Yashvardhan Borude" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsItemListJsonLd) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var t = localStorage.getItem('yashvardhan-theme');
                  if (t === 'light') {
                    document.documentElement.setAttribute('data-theme', 'light');
                    document.documentElement.classList.remove('dark');
                    document.documentElement.classList.add('light');
                  } else {
                    document.documentElement.setAttribute('data-theme', 'dark');
                    document.documentElement.classList.remove('light');
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-[var(--bg)] text-[var(--fg)] antialiased transition-colors duration-300">
        <ThemeProvider>
          <SmoothScrollProvider>
            <DevToolsProtection />
            <SpatialCursor />
            <RainRippleEffect />
            <SproutMascot />
            <SproutAICompanion />
            <ResumeModal />
            <TactileToast />
            {children}
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
