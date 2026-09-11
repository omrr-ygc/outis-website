"use client";

import ScrollReveal, { StaggerContainer, StaggerItem } from "./ScrollReveal";
import { useI18n } from "@/lib/i18n";

const stepGrids = [
  { gridSize: 3, gridFilled: 4 },
  { gridSize: 4, gridFilled: 7 },
  { gridSize: 5, gridFilled: 15 },
];

function MiniGrid({ size, filled }: { size: number; filled: number }) {
  const total = size * 3;
  return (
    <div
      className="grid gap-1.5 mx-auto my-6"
      style={{ gridTemplateColumns: `repeat(${size}, 1fr)`, maxWidth: `${size * 36}px` }}
    >
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`aspect-square rounded-sm transition-all duration-500 ${
            i < filled
              ? "bg-gold/30 border border-gold/40"
              : "bg-surface-light/50 border border-gold/8"
          }`}
        />
      ))}
    </div>
  );
}

export default function HowItWorks() {
  const { locale, t } = useI18n();
  const steps = t.howItWorks.steps[locale];

  return (
    <section id="how-it-works" className="py-24 md:py-32 bg-surface relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(201,149,107,0.04)_0%,_transparent_60%)]" />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <ScrollReveal>
          <div className="mb-16 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-gold/15 rounded-full text-xs text-gold/70 font-mono tracking-wider mb-4">
              {t.howItWorks.badge[locale]}
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-gold-light">
              {t.howItWorks.title[locale]}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-dark to-gold-light">
                {t.howItWorks.titleHighlight[locale]}
              </span>
            </h2>
            <p className="mt-4 text-gold-light/50 text-lg max-w-2xl mx-auto">
              {t.howItWorks.subtitle[locale]}
            </p>
          </div>
        </ScrollReveal>

        <div className="relative">
          <div className="hidden md:block absolute top-[52px] left-[16.67%] right-[16.67%] h-px bg-gold/15 z-0" />

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 relative z-10">
            {steps.map((step, i) => (
              <StaggerItem key={step.number} index={i}>
                <div className="flex flex-col items-center text-center">
                  <div className="w-[72px] h-[72px] rounded-full border border-gold/25 bg-burgundy-deep flex items-center justify-center mb-6">
                    <span className="font-mono text-xl font-bold text-gold-light">{step.number}</span>
                  </div>

                  <MiniGrid size={stepGrids[i].gridSize} filled={stepGrids[i].gridFilled} />

                  <h3 className="text-xl md:text-2xl font-bold text-gold-light tracking-wide mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gold-light/40 text-sm leading-relaxed max-w-xs">
                    {step.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
