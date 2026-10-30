import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0D0E10",
};

export const metadata: Metadata = {
  title: "Yashvardhan Borude — Computer Engineering & Software Development",
  description:
    "Personal portfolio of Yashvardhan Borude. Computer engineering student at PCCOE Pune building resilient web systems and computational software with algorithmic precision.",
  openGraph: {
    title: "Yashvardhan Borude — Portfolio",
    description: "Computer engineering & software development.",
    url: "https://yashvardhan.dev",
    siteName: "Yashvardhan Borude",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500;600&family=Geist:wght@300;400;500;600;700&family=Instrument+Serif:ital@0;1&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#0D0E10] text-[#EDE8DE] antialiased selection:bg-[#C5A880] selection:text-[#0D0E10]">
        {children}
      </body>
    </html>
  );
}
