import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Outfit, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { I18nProvider } from "@/lib/i18n";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Outis Clips — Spread by Nobodies, Seen by Everybody",
  description:
    "Your content, cut into clips and spread by independent creators across TikTok, Instagram and YouTube — you only pay for the views that hold up.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrains.variable} ${outfit.variable} ${cormorant.variable} antialiased`}
    >
      <body className="min-h-screen bg-burgundy-deep text-foreground">
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
