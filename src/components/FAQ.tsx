"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { useI18n } from "@/lib/i18n";

function FAQItem({ question, answer, clipperCtaText, clipperCtaLink }: { question: string; answer: string; clipperCtaText: string; clipperCtaLink: string }) {
  const [isOpen, setIsOpen] = useState(false);

  const isClipperCta = answer === "clipper-cta";

  return (
    <div className="border-b border-gold/10 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-5 md:py-6 text-left group"
        aria-expanded={isOpen}
      >
        <span className="text-sm md:text-base font-medium text-gold-light group-hover:text-gold transition-colors pr-4">
          {question}
        </span>
        <ChevronDown
          size={18}
          className={`text-gold/50 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-[500px] opacity-100 pb-5 md:pb-6" : "max-h-0 opacity-0"
        }`}
      >
        {isClipperCta ? (
          <p className="text-sm text-gold-light/50 leading-relaxed">
            {clipperCtaText}{" "}
            <a
              href="https://whop.com/outisclips"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:text-gold-light underline underline-offset-2 transition-colors"
            >
              {clipperCtaLink} &rarr;
            </a>
          </p>
        ) : (
          <p className="text-sm text-gold-light/50 leading-relaxed">{answer}</p>
        )}
      </div>
    </div>
  );
}

export default function FAQ() {
  const { locale, t } = useI18n();
  const faqs = t.faq.items[locale];

  return (
    <section id="faq" className="py-24 md:py-32 bg-surface border-t border-gold/10">
      <div className="mx-auto max-w-3xl px-6">
        <ScrollReveal>
          <div className="mb-12 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-gold/15 rounded-full text-xs text-gold/70 font-mono tracking-wider mb-4">
              {t.faq.badge[locale]}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gold-light">
              {t.faq.title[locale]}
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="border border-gold/15 rounded-xl bg-surface-light p-6 md:p-8">
            {faqs.map((faq) => (
              <FAQItem
                key={faq.question}
                question={faq.question}
                answer={faq.answer}
                clipperCtaText={t.faq.clipperCtaText[locale]}
                clipperCtaLink={t.faq.clipperCtaLink[locale]}
              />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
