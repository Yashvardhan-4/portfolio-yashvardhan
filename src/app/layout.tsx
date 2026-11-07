import type { Metadata, Viewport } from "next";
import "./globals.css";
import { profile } from "@/data/profile";
import { ThemeProvider } from "@/context/ThemeContext";
import { RainRippleEffect } from "@/components/ui/RainRippleEffect";
import { SproutMascot } from "@/components/mascot/SproutMascot";
import { SproutAICompanion } from "@/components/ai/SproutAICompanion";
import { ResumeModal } from "@/components/ui/ResumeModal";
import { TactileToast } from "@/components/ui/TactileToast";

const SITE_URL = "https://www.yashvardhanborude.tech";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#08090C",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Yashvardhan Borude — Full Stack Software Engineer & Algorithmic Developer",
    template: "%s | Yashvardhan Borude",
  },
  description:
    "Official portfolio of Yashvardhan Borude. Computer Engineering undergraduate at PCCOE Pune building resilient full-stack systems, production PostgreSQL architectures, and high-performance WebGL platforms.",
  keywords: [
    "Yashvardhan Borude",
    "Yashvardhan Shashikant Borude",
    "Yashvardhan Borude Portfolio",
    "Yashvardhan Borude PCCOE",
    "Yashvardhan Borude Pune",
    "Yashvardhan Borude Software Engineer",
    "Full Stack Software Engineer Pune",
    "PCCOE Pune Computer Engineering",
    "Competitive Programmer LeetCode 500+",
    "Shivkush Nursery PWA",
    "PralayVeer Hackathon",
    "yashvardhan_4",
    "Next.js Developer India",
    "Three.js WebGL Developer",
    "PostgreSQL Supabase Architect",
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
    title: "Yashvardhan Borude — Full Stack Software Engineer & Algorithmic Developer",
    description:
      "Explore the engineering portfolio, production software contracts, and computational systems of Yashvardhan Borude (PCCOE Pune).",
    url: SITE_URL,
    siteName: "Yashvardhan Borude Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Yashvardhan Borude — Full Stack Software Engineer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yashvardhan Borude — Full Stack Software Engineer",
    description:
      "Computer Engineering student at PCCOE Pune building resilient web systems and computational software.",
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
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: ["/favicon.ico"],
    apple: [{ url: "/favicon.svg" }],
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
    name: "Yashvardhan Borude Portfolio",
    alternateName: ["Yashvardhan Borude Official Website", "Yashvardhan Borude Software Engineer"],
    description:
      "Personal portfolio and architectural systems ledger of Yashvardhan Borude, Computer Engineering undergraduate at PCCOE Pune.",
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

  return (
    <html lang="en" className="dark scroll-smooth">
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
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var t = localStorage.getItem('yashvardhan-theme');
                  if (t === 'light') {
                    document.documentElement.setAttribute('data-theme', 'light');
                  } else {
                    document.documentElement.setAttribute('data-theme', 'dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-[var(--bg)] text-[var(--fg)] antialiased transition-colors duration-300">
        <ThemeProvider>
          <RainRippleEffect />
          <SproutMascot />
          <SproutAICompanion />
          <ResumeModal />
          <TactileToast />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
