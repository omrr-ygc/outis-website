"use client";

import Image from "next/image";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";

export default function Footer() {
  const { locale, t } = useI18n();

  return (
    <footer className="border-t border-gold/10 py-10 bg-surface">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <Image src="/logo-symbol.png" alt="Outis Clips" width={32} height={26} className="object-contain" />
            <span
              className="text-lg font-light tracking-[0.2em] uppercase"
              style={{ fontFamily: "var(--font-logo)" }}
            >
              <span className="text-gold">Outis</span>
              <span className="text-gold-light/80 ml-1">Clips</span>
            </span>
          </div>

          <div className="flex items-center gap-6 text-xs text-gold-light/40">
            <a href="mailto:info@outisclips.com" className="hover:text-gold transition-colors">
              info@outisclips.com
            </a>
            <Link href="/privacy" className="hover:text-gold transition-colors">
              {t.footer.privacy[locale]}
            </Link>
            <Link href="/terms" className="hover:text-gold transition-colors">
              {t.footer.terms[locale]}
            </Link>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gold/5 text-center">
          <p className="text-xs text-gold-light/25">
            &copy; {new Date().getFullYear()} Outis Media LLC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
