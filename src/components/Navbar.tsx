"use client";

import { useState, useEffect, useCallback } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useI18n } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { locale, setLocale, t } = useI18n();

  const navLinks = [
    { label: t.nav.howItWorks[locale], href: "#how-it-works" },
    { label: t.nav.whyUs[locale], href: "#why-us" },
    { label: t.nav.faq[locale], href: "#faq" },
    { label: t.nav.contact[locale], href: "#booking" },
  ];

  const closeMenu = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open, closeMenu]);

  function LangSwitcher({ className = "" }: { className?: string }) {
    return (
      <div className={`flex items-center gap-0.5 ${className}`}>
        {(["en", "tr"] as Locale[]).map((lang) => (
          <button
            key={lang}
            onClick={() => setLocale(lang)}
            className={`px-2.5 py-1 text-xs font-mono tracking-wider rounded transition-all duration-150 ${
              locale === lang
                ? "bg-gold/20 text-gold border border-gold/30"
                : "text-gold-light/40 hover:text-gold-light/70 border border-transparent"
            }`}
          >
            {lang.toUpperCase()}
          </button>
        ))}
      </div>
    );
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gold/10 bg-burgundy-deep/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-2">
        <a href="#" className="flex items-center gap-2.5">
          <Image
            src="/logo-symbol.png"
            alt="Outis Clips"
            width={36}
            height={30}
            className="object-contain"
          />
          <span
            className="text-xl font-light tracking-[0.2em] uppercase"
            style={{ fontFamily: "var(--font-logo)" }}
          >
            <span className="text-gold">Outis</span>
            <span className="text-gold-light/80 ml-1">Clips</span>
          </span>
        </a>

        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-gold-light/50 hover:text-gold-light transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
          <LangSwitcher />
          <a
            href="https://whop.com/outisclips"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 border border-gold/25 text-gold-light/70 text-sm rounded-md hover:border-gold/40 hover:text-gold-light transition-colors duration-150"
          >
            {t.nav.becomeClipper[locale]}
          </a>
          <a
            href="#booking"
            className="px-5 py-2 bg-gold text-burgundy-deep text-sm font-medium rounded-md hover:bg-gold-light transition-colors duration-150"
          >
            {t.nav.bookCall[locale]}
          </a>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <LangSwitcher />
          <button
            onClick={() => setOpen(!open)}
            className="text-gold-light"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          role="navigation"
          aria-label="Mobile navigation"
          className="lg:hidden border-t border-gold/10 bg-burgundy-deep px-6 py-4 flex flex-col gap-4"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className="text-sm text-gold-light/50 hover:text-gold-light"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://whop.com/outisclips"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
            className="px-4 py-2 border border-gold/25 text-gold-light/70 text-sm text-center rounded-md"
          >
            {t.nav.becomeClipper[locale]}
          </a>
          <a
            href="#booking"
            onClick={closeMenu}
            className="px-5 py-2 bg-gold text-burgundy-deep text-sm font-medium text-center rounded-md"
          >
            {t.nav.bookCall[locale]}
          </a>
        </nav>
      )}
    </nav>
  );
}
