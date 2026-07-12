import type { Metadata } from "next";
import { Suspense } from "react";
import { Playfair_Display, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import GlobalCanvases from "@/components/GlobalCanvases";

// Display serif for large headings — Playfair Display (high-contrast editorial serif)
const playfair = Playfair_Display({
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

// Body sans — pairs with Instrument Serif (matches evintkoo.github.io reference)
const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

// Monospace for technical / numeric accents
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  weight: ["400", "500"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Callixta's Portfolio",
    template: "%s | Callixta Fidelia C",
  },
  description:
    "A collection of my projects in data science, research, photography, and writing.",
  keywords: ["data science", "statistics", "machine learning", "UBC", "portfolio", "Callixta Fidelia"],
  openGraph: {
    title: "Callixta's Portfolio",
    description:
      "A collection of my projects in data science, research, photography, and writing.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${plusJakarta.variable} ${jetbrainsMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <Suspense fallback={null}>
          <GlobalCanvases />
        </Suspense>
        {children}
      </body>
    </html>
  );
}