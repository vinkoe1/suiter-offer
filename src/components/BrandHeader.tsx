import type { ReactNode } from "react";
import { publicUrl } from "../lib/assets";

interface BrandHeaderProps {
  eyebrow: string;
  title: string;
  compact?: boolean;
  children?: ReactNode;
}

export default function BrandHeader({ eyebrow, title, compact = false, children }: BrandHeaderProps) {
  const logoSrc = publicUrl("brand/logo.png");
  const bannerSrc = publicUrl("brand/banner.png");

  return (
    <header>
      <div
        className={`relative overflow-hidden ${
          compact ? "h-24 sm:h-28" : "h-36 sm:h-44 lg:h-52"
        }`}
      >
        <img
          src={bannerSrc}
          alt=""
          width={1280}
          height={720}
          className="h-full w-full object-cover object-[center_58%]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-parchment" />
      </div>

      <div className="relative z-10 mx-auto -mt-10 flex max-w-6xl flex-col items-center px-4 text-center sm:-mt-12">
        <img
          src={logoSrc}
          alt=""
          width={80}
          height={80}
          className={`rounded-full bg-paper shadow-[0_8px_24px_rgba(36,30,24,0.12)] ring-1 ring-gold-soft/80 ${
            compact ? "h-16 w-16 sm:h-[4.5rem] sm:w-[4.5rem]" : "h-[4.5rem] w-[4.5rem] sm:h-20 sm:w-20"
          }`}
        />
        <p className="mt-4 font-display text-xl italic leading-snug text-gold sm:text-2xl">{eyebrow}</p>
        <h1
          className={`mt-2 font-display leading-[1.1] text-ink ${
            compact ? "text-4xl sm:text-5xl" : "text-[2.35rem] sm:text-5xl"
          }`}
        >
          {title}
        </h1>
        {children}
      </div>
    </header>
  );
}
