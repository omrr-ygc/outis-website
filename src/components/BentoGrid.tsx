"use client";

import {
  Flag,
  Eye,
  Globe2,
  Shield,
  BarChart3,
  DollarSign,
} from "lucide-react";
import ScrollReveal, { StaggerContainer, StaggerItem } from "./ScrollReveal";
import { useI18n } from "@/lib/i18n";

const featureIcons = [Flag, Eye, Globe2, DollarSign, Shield, BarChart3];
const featureSpans = ["md:col-span-2", "", "", "md:col-span-2", "", "md:col-span-2"];

export default function BentoGrid() {
  const { locale, t } = useI18n();
  const features = t.bentoGrid.features[locale];

  return (
    <section id="why-us" className="py-24 md:py-32 bg-burgundy-deep">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal>
          <div className="mb-16 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-gold/15 rounded-full text-xs text-gold/70 font-mono tracking-wider mb-4">
              {t.bentoGrid.badge[locale]}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gold-light">
              {t.bentoGrid.title[locale]}
            </h2>
            <p className="mt-4 text-gold-light/50 text-lg">
              {t.bentoGrid.subtitle[locale]}
            </p>
          </div>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((feature, i) => {
            const Icon = featureIcons[i];
            return (
              <StaggerItem key={feature.title} className={featureSpans[i]} index={i}>
                <div className="relative group p-6 md:p-8 bg-surface border border-gold/10 rounded-lg hover:border-gold/25 hover:shadow-md hover:shadow-gold/5 transition-all duration-150 h-full">
                  <Icon size={24} className="text-gold mb-4" strokeWidth={1.5} />
                  <h3 className="text-lg font-semibold mb-2 text-gold-light">{feature.title}</h3>
                  <p className="text-gold-light/40 text-sm leading-relaxed">{feature.description}</p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
