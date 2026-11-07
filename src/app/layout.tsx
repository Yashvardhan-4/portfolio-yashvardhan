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
    "Official portfolio of Yashvardhan Borude (PCCOE Pune). Architecting resilient full-stack web systems, C++20 graph engines, 3D WebGL, and commercial PWAs.",
  keywords: [
    "Yashvardhan Borude",
    "Yashvardhan Shashikant Borude",
    "Yashvardhan Borude Portfolio",
    "Best Developer Portfolio",
    "Best Software Engineer Portfolio 2026",
    "Creative Developer Portfolio",
    "Full Stack Software Engineer Pune",
    "PCCOE Pune Computer Engineering",
    "Competitive Programmer LeetCode 500+",
    "Shivkush Nursery PWA",
    "PralayVeer Hackathon",
    "Algorithmic Graph Theory Engine C++20",
    "SWE Internships Summer 2026",
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
      "Official engineering portfolio of Yashvardhan Borude (PCCOE Pune). Full-stack web systems, C++20 graph engines, 3D WebGL, and commercial PWAs.",
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
      "Computer Engineering student at PCCOE Pune building resilient web systems, C++20 graph engines, and 3D WebGL platforms.",
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
      "Full Stack Development",
      "Next.js",
      "React.js",
      "PostgreSQL",
      "Supabase",
      "Row-Level Security (RLS)",
      "Three.js",
      "WebGL",
      "C++",
      "Data Structures & Algorithms",
      "Competitive Programming",
      "Progressive Web Apps",
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
      "Official portfolio and architectural systems ledger of Yashvardhan Borude, Computer Engineering undergraduate at PCCOE Pune.",
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
    name: "Yashvardhan Borude — Full Stack Software Engineer Portfolio",
    mainEntity: {
      "@id": `${SITE_URL}/#person`,
    },
  };

  const projectsItemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Featured Engineering Projects by Yashvardhan Borude",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Shivkush Nursery Commercial PWA",
        description:
          "Solo commercial progressive web app with bilingual offline service worker caching, Supabase PostgreSQL RLS, and 3D WebGL plant visualization.",
        url: `${SITE_URL}/projects/shivkush-nursery-pwa`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "PralayVeer Disaster Management Platform",
        description:
          "Smart India Hackathon 2024 finalist platform for disaster preparedness and accessible shelter routing on low-bandwidth networks.",
        url: `${SITE_URL}/projects/pralayveer-disaster-response`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Algorithmic Graph Theory & Benchmark Engine",
        description:
          "High-performance C++20 graph theory and maximum flow engine benchmarking Dijkstra, Bellman-Ford, and Dinic's Algorithm.",
        url: `${SITE_URL}/projects/algorithmic-graph-engine`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Startup Valuation ML Pipeline",
        description:
          "Supervised machine learning regression model predicting early-stage valuations with Scikit-Learn and XGBoost.",
        url: `${SITE_URL}/projects/startup-valuation-predictor`,
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
