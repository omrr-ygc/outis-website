"use client";

import { useRef, useEffect, useState } from "react";
import { TrendingDown, TrendingUp, Clock, DollarSign, Eye, Layers } from "lucide-react";
import ScrollReveal, { StaggerContainer, StaggerItem } from "./ScrollReveal";
import { useI18n } from "@/lib/i18n";

function AnimatedNumber({ target, prefix = "", suffix = "", decimals = 0 }: { target: number; prefix?: string; suffix?: string; decimals?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  const rafId = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const duration = 2000;
          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(eased * target);
            if (progress < 1) {
              rafId.current = requestAnimationFrame(step);
            }
          };
          rafId.current = requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafId.current);
    };
  }, [target]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{decimals > 0 ? count.toFixed(decimals) : Math.floor(count).toLocaleString()}{suffix}
    </span>
  );
}

const rowIcons = [DollarSign, Eye, Clock, Layers];

export default function Comparison() {
  const { locale, t } = useI18n();
  const rows = t.comparison.rows[locale];
  const stats = t.comparison.stats[locale];

  return (
    <section className="py-24 md:py-32 bg-burgundy-deep relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,149,107,0.03)_0%,_transparent_70%)]" />

      <div className="mx-auto max-w-6xl px-6 relative z-10">
        <ScrollReveal>
          <div className="mb-16 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-gold/15 rounded-full text-xs text-gold/70 font-mono tracking-wider mb-4">
              {t.comparison.badge[locale]}
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-gold-light">
              {t.comparison.title[locale]}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-dark to-gold-light">{t.comparison.titleHighlight[locale]}</span>
              {t.comparison.titleEnd[locale]}
            </h2>
            <p className="mt-4 text-gold-light/50 text-lg max-w-2xl mx-auto">
              {t.comparison.subtitle[locale]}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="overflow-hidden rounded-xl border border-gold/15">
            <div className="grid grid-cols-3 bg-surface-light/50">
              <div className="p-4 md:p-5 border-b border-r border-gold/10" />
              <div className="p-4 md:p-5 border-b border-r border-gold/10 text-center">
                <div className="flex items-center justify-center gap-2">
                  <TrendingDown size={14} className="text-gold-light/30" />
                  <span className="text-xs font-mono text-gold-light/35 tracking-wider">{t.comparison.headers.paidAds[locale]}</span>
                </div>
              </div>
              <div className="p-4 md:p-5 border-b border-gold/10 text-center">
                <div className="flex items-center justify-center gap-2">
                  <TrendingUp size={14} className="text-gold" />
                  <span className="text-xs font-mono text-gold tracking-wider">{t.comparison.headers.clipping[locale]}</span>
                </div>
              </div>
            </div>

            {rows.map((row, i) => {
              const Icon = rowIcons[i];
              return (
                <div key={row.label} className={`grid grid-cols-3 ${i < rows.length - 1 ? "border-b border-gold/8" : ""}`}>
                  <div className="p-4 md:p-5 border-r border-gold/8 flex items-center gap-3">
                    <Icon size={16} className="text-gold/50 shrink-0 hidden sm:block" />
                    <span className="text-sm text-gold-light/60">{row.label}</span>
                  </div>
                  <div className="p-4 md:p-5 border-r border-gold/8 text-center flex items-center justify-center">
                    <span className="text-sm text-gold-light/30">{row.paid}</span>
                  </div>
                  <div className="p-4 md:p-5 text-center flex flex-col items-center justify-center gap-1">
                    <span className="text-sm text-gold font-medium">{row.clipping}</span>
                    <span className="text-[10px] text-gold/50 font-mono hidden md:block">{row.highlight}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {stats.map((stat, i) => (
            <StaggerItem key={stat.label} index={i}>
              <div className="p-6 bg-surface border border-gold/10 rounded-lg text-center hover:border-gold/25 transition-all duration-150">
                <div className="font-mono text-3xl md:text-4xl font-bold text-gold tabular-nums">
                  <AnimatedNumber target={stat.value} suffix={stat.suffix} prefix={stat.prefix || ""} decimals={stat.decimals || 0} />
                </div>
                <div className="text-sm text-gold-light/40 mt-2">{stat.label}</div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <ScrollReveal>
          <p className="mt-10 text-center text-sm text-gold-light/30 max-w-xl mx-auto">
            {t.comparison.sources[locale]}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
