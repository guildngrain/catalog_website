import Image from "next/image";
import Link from "next/link";
import { heroConfig } from "@/config/hero";
import "./Hero.css";

export function Hero() {
  return (
    <section className="hero" aria-label="Hero">
      <h1 className="hero-tagline">
        <span className="hero-tagline-accent">{heroConfig.tagline.accent}</span>
        <span>{heroConfig.tagline.rest}</span>
      </h1>

      <div className="hero-stage">
        <div className="hero-media" aria-hidden>
          <Image
            src={heroConfig.background}
            alt=""
            fill
            priority
            sizes="100vw"
            className="hero-bg"
          />
          <div className="hero-overlay" />
          <Image
            src={heroConfig.woman}
            alt=""
            width={376}
            height={593}
            priority
            className="hero-figure hero-figure-woman"
          />
          <Image
            src={heroConfig.man}
            alt=""
            width={250}
            height={561}
            priority
            className="hero-figure hero-figure-man"
          />
        </div>

        <div className="hero-copy">
          <h2 className="hero-headline">
            <span className="hero-headline-line">Born in the guilds of</span>
            <span className="hero-headline-line">
              Europe, <span className="hero-accent">Crafted for</span>
            </span>
            <span className="hero-headline-line">
              <span className="hero-accent">Modern</span> Nomads.
            </span>
          </h2>
          <div className="hero-copy-lower">
            <p className="hero-body">{heroConfig.body}</p>
            <div className="hero-actions">
              <Link
                href={heroConfig.primaryCta.href}
                className="hero-btn-primary"
              >
                {heroConfig.primaryCta.label}
              </Link>
              <Link
                href={heroConfig.secondaryCta.href}
                className="hero-btn-secondary"
              >
                {heroConfig.secondaryCta.label}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
