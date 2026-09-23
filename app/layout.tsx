import type { Metadata } from "next";
import { Geist_Mono, Figtree, Space_Grotesk, Inter, DM_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import "aos/dist/aos.css";
import { Analytics } from "@vercel/analytics/next";
import StructuredData from "./_components/structured-data";
const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const lightAiry = localFont({
  // Path relative to this file (app/layout.tsx)
  src: "../public/assets/fonts/Light-Airy.ttf",
  weight: "400",
  style: "normal",
  display: "swap",
  variable: "--font-light-airy",
});

export const metadata: Metadata = {
  title: "Prince Ladislas | Product Designer",
  description: "Product designer focused on creating intuitive and beautiful user experiences. Specializing in product design, UI/UX, and digital solutions.",
  keywords: [
    "product designer",
    "UI designer",
    "UX designer",
    "product design",
    "UI/UX",
    "design portfolio",
    "Prince Ladislas",
    "web designer",
    "mobile designer"
  ],
  authors: [
    {
      name: "Prince Ladislas",
      url: "https://princeladislas1.vercel.app"
    }
  ],
  creator: "Prince Ladislas",
  publisher: "Prince Ladislas",
  formatDetection: {
    email: true,
    telephone: true,
    address: false,
  },
  metadataBase: new URL("https://princeladislas1.vercel.app"),
  alternates: {
    canonical: "https://princeladislas1.vercel.app",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://princeladislas1.vercel.app",
    title: "Prince Ladislas | Product Designer",
    description: "Product designer focused on creating intuitive and beautiful user experiences. Specializing in product design, UI/UX, and digital solutions.",
    siteName: "Prince Ladislas Portfolio",
    images: [
      {
        url: "/assets/images/prince.png",
        width: 1200,
        height: 630,
        alt: "Prince Ladislas - Product Designer",
        type: "image/png",
      },
      {
        url: "/assets/images/prince-hero-image.webp",
        width: 1200,
        height: 630,
        alt: "Prince Ladislas",
        type: "image/webp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prince Ladislas | Product Designer",
    description: "Product designer focused on creating intuitive and beautiful user experiences. Specializing in product design, UI/UX, and digital solutions.",
    images: ["/assets/images/prince.png"],
    creator: "@prince_designs",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      {
        url: "/assets/images/favicon.ico",
        sizes: "any",
      },
      {
        url: "/assets/images/favicon.ico",
        sizes: "16x16",
        type: "image/x-icon",
      },
    ],
    shortcut: "/favicon.ico",
    apple: [
      {
        url: "/assets/images/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    other: [
      {
        rel: "icon",
        url: "/assets/images/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        rel: "icon",
        url: "/assets/images/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Prince Portfolio",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" style={{ scrollBehavior: 'auto' }} suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Prince Portfolio" />
        <StructuredData />
      </head>
      <body className={`${figtree.variable} ${lightAiry.variable} ${geistMono.variable} ${spaceGrotesk.variable} ${inter.variable} ${dmSans.variable} antialiased`}>
        {/* <LenisProvider /> */}
        <script dangerouslySetInnerHTML={{
          __html: `
            if (history.scrollRestoration) {
              history.scrollRestoration = 'manual';
            }
            window.scrollTo(0, 0);
            // Apply the stored theme before paint so there's no flash
            try {
              var t = localStorage.getItem('theme') || 'dark';
              document.documentElement.classList.toggle('dark', t === 'dark');
              document.documentElement.style.colorScheme = t;
            } catch (e) {}
          `
        }} />
        {children}
        {/* Page-view counts only — no cookies, and the visitor hash resets
            daily, so nobody is identified or followed between days. */}
        <Analytics />
      </body>
    </html>
  );
}
