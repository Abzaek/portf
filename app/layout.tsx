import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Manrope, Space_Grotesk } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

// Stellar Blueprint typography:
//   Manrope        → body / sans
//   Space Grotesk  → display / headings
//   JetBrains Mono → monospace / metadata labels
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://abzaek.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Abdulazez Zeinu · Full-Stack Engineer",
    template: "%s · Abdulazez Zeinu",
  },
  description:
    "Full-stack engineer building software that stays fast as it scales. Next.js front-ends, Go / TypeScript / Python services, and AWS architectures. Open for new roles.",
  generator: "me@abzaek.dev",
  applicationName: "Abdulazez Zeinu · Portfolio",
  authors: [{ name: "Abdulazez Zeinu" }],
  keywords: [
    "full-stack engineer",
    "Next.js",
    "TypeScript",
    "Go",
    "AWS",
    "performance",
    "scalability",
    "Abdulazez Zeinu",
    "portfolio",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "manifest", url: "/site.webmanifest" },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    title: "Abdulazez Zeinu · Full-Stack Engineer",
    description:
      "Full-stack engineer building software that stays fast as it scales.",
    siteName: "Abdulazez Zeinu",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "Abdulazez Zeinu logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Abdulazez Zeinu · Full-Stack Engineer",
    description:
      "Full-stack engineer building software that stays fast as it scales.",
    images: ["/logo.png"],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4fafe" },
    { media: "(prefers-color-scheme: dark)", color: "#131313" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${manrope.variable} ${grotesk.variable} ${jetbrains.variable}`}
    >
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          {/* Stellar Blueprint — viewport corner crop markers (decorative) */}
          <div aria-hidden className="pointer-events-none fixed inset-0 z-[60]">
            <span className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-noir-accent-bright/40" />
            <span className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-noir-accent-bright/40" />
            <span className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-noir-accent-bright/40" />
            <span className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-noir-accent-bright/40" />
          </div>
          <Toaster />
          <Analytics />
        </ThemeProvider>
      </body>
      <GoogleAnalytics gaId="G-PRMYJQGP5Z" />
    </html>
  );
}
