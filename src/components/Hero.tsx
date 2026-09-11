"use client";

import dynamic from "next/dynamic";
import { useI18n } from "@/lib/i18n";

const Globe = dynamic(() => import("./Globe"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-48 h-48 rounded-full border border-gold/30 animate-pulse" />
    </div>
  ),
});

export default function Hero() {
  const { locale, t } = useI18n();

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-burgundy-deep">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,149,107,0.06)_0%,_transparent_70%)]" />

      <div className="relative z-20 text-center pt-24 md:pt-28 px-6 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
          <span className="text-gold-light">Spread by </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-light">Nobodies</span>
          <span className="text-gold-light">,</span>
          <br />
          <span className="text-gold-light">seen by </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-dark to-gold">everybody</span>
          <span className="text-gold-light">.</span>
        </h1>

        <p className="mt-6 text-gold-light/50 text-base md:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
          {t.hero.subtitle[locale]}
        </p>
      </div>

      <div className="relative w-full max-w-4xl h-[480px] md:h-[560px] lg:h-[640px] mt-[-20px]">
        <Globe />
      </div>

      <div className="relative z-20 flex flex-col sm:flex-row items-center gap-4 pb-16 md:pb-24 px-6">
        <a
          href="#booking"
          className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-gold-dark to-gold text-burgundy-deep font-medium text-sm rounded-md hover:shadow-lg hover:shadow-gold/20 transition-all duration-150"
        >
          {t.hero.ctaPrimary[locale]}
        </a>
        <a
          href="#how-it-works"
          className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-gold/20 text-gold-light/70 text-sm rounded-md hover:border-gold/40 hover:text-gold-light transition-colors duration-150"
        >
          {t.hero.ctaSecondary[locale]}
        </a>
      </div>
    </section>
  );
}
