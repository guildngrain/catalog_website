import Image from "next/image";
import Link from "next/link";
import { heroConfig } from "@/config/hero";
import { Container } from "@/components/ui";

export function Hero() {
  return (
    <section className="hero" aria-label="Hero">
      <p className="hero-tagline">
        <span className="hero-tagline-accent">{heroConfig.tagline.accent}</span>{" "}
        <span>{heroConfig.tagline.rest}</span>
      </p>

      <div className="hero-stage">
        <div className="hero-media" aria-hidden>
          <Image
            src={heroConfig.background}
            alt=""
            fill
            priority
            sizes="100vw"
            className="hero-bg object-cover object-center"
          />
          <div className="hero-figures">
            <Image
              src={heroConfig.woman}
              alt=""
              width={720}
              height={900}
              priority
              className="hero-figure hero-figure-woman"
            />
            <Image
              src={heroConfig.man}
              alt=""
              width={520}
              height={780}
              priority
              className="hero-figure hero-figure-man"
            />
          </div>
          <div className="hero-overlay" />
        </div>

        <Container className="hero-content">
          <div className="hero-copy">
            <h1 className="hero-headline">
              Born in the guilds of Europe,{" "}
              <span className="hero-accent">Crafted for</span>{" "}
              <span className="hero-accent">Modern</span> Nomads.
            </h1>
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
        </Container>
      </div>
    </section>
  );
}
