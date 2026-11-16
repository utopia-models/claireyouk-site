import type { Metadata, Viewport } from "next";
import { Inter, Newsreader } from "next/font/google";
import "./tokens.generated.css";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { SITE } from "@/lib/content";

const display = Newsreader({ subsets: ["latin"], style: ["normal", "italic"], variable: "--f-display", display: "swap", axes: ["opsz"] });
const sans = Inter({ subsets: ["latin"], variable: "--f-sans", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: SITE.title,
  description: SITE.description,
  alternates: { canonical: "/" },
  openGraph: { title: SITE.title, description: SITE.description, url: SITE.url, siteName: SITE.name, images: ["/claire-youk.jpg"], type: "profile" },
  twitter: { card: "summary", title: SITE.title, description: SITE.description, images: ["/claire-youk.jpg"] },
};

export const viewport: Viewport = { themeColor: "#0b1430", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
