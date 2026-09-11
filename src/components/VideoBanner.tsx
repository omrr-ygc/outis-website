"use client";

import { useRef, useEffect } from "react";
import ScrollReveal from "./ScrollReveal";
import { useI18n } from "@/lib/i18n";

export default function VideoBanner() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { locale, t } = useI18n();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (video.duration - video.currentTime < 0.3) {
        video.currentTime = 0;
        video.play();
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => video.removeEventListener("timeupdate", handleTimeUpdate);
  }, []);

  return (
    <section className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden bg-burgundy-deep">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden="true"
      >
        <source src="/vertical_video.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-burgundy-deep/50 z-[1]" />

      <div className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-tl from-burgundy-deep via-burgundy-deep/90 to-transparent z-[2]" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-burgundy-deep via-burgundy-deep/90 to-transparent z-[2]" />

      <div className="relative z-10 h-full flex items-center justify-center px-6">
        <ScrollReveal>
          <h2 className="text-5xl md:text-7xl lg:text-9xl font-bold text-gold-light text-center tracking-tight leading-[0.95]">
            BREAK THE
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-dark to-gold-light">
              FEED
            </span>
          </h2>
        </ScrollReveal>
      </div>

      <div className="absolute bottom-6 inset-x-0 z-10">
        <div className="flex justify-center gap-4 md:gap-8 px-6">
          {t.videoBanner.categories[locale].map((cat) => (
            <span key={cat} className="text-xs md:text-sm text-gold-light/50 font-medium tracking-wider">
              {cat}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
