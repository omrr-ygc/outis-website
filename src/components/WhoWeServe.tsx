"use client";

import { Gamepad2, Music, Mic, Smartphone, User } from "lucide-react";
import ScrollReveal, { StaggerContainer, StaggerItem } from "./ScrollReveal";
import { useI18n } from "@/lib/i18n";

const segmentIcons = [Gamepad2, Music, Mic, Smartphone, User];

export default function WhoWeServe() {
  const { locale, t } = useI18n();
  const segments = t.whoWeServe.segments[locale];

  return (
    <section className="py-24 md:py-32 bg-surface relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(201,149,107,0.04)_0%,_transparent_60%)]" />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <ScrollReveal>
          <div className="mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-gold/15 rounded-full text-xs text-gold/70 font-mono tracking-wider mb-4">
              {t.whoWeServe.badge[locale]}
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-gold-light">
              {t.whoWeServe.title[locale]}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-dark to-gold-light">{t.whoWeServe.titleHighlight[locale]}</span>
            </h2>
            <p className="mt-4 text-gold-light/50 text-lg max-w-2xl">
              {t.whoWeServe.subtitle[locale]}
            </p>
          </div>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {segments.map((seg, i) => {
            const Icon = segmentIcons[i];
            return (
              <StaggerItem key={seg.title} index={i}>
                <div className="group relative p-6 bg-surface-light border border-gold/10 rounded-xl hover:border-gold/25 hover:shadow-md hover:shadow-gold/5 transition-all duration-200 h-full flex flex-col">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gold/10 border border-gold/15 mb-5">
                    <Icon size={22} className="text-gold" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-base font-bold text-gold-light mb-2 uppercase tracking-wide">
                    {seg.title}
                  </h3>
                  <p className="text-gold-light/40 text-xs leading-relaxed flex-1">
                    {seg.description}
                  </p>
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-gold/5 to-transparent rounded-tr-xl rounded-bl-[100%] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
