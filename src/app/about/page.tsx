import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import "./about.css";

export const metadata: Metadata = {
  title: "About Us",
  description: `About ${siteConfig.name}—heritage leather craft from Pakistan, cowhide and sheepskin jackets built for lasting quality.`,
};

const hides = [
  {
    name: "Cowhide",
    tagline: "Rugged durability",
    image: "/blog/about-our-leather/03-cowhide.jpg",
    imageAlt: "Close-up of durable cowhide leather grain",
    points: [
      "Bold, classic structure for bikers and everyday wear",
      "Thick and firm when new—built for decades",
      "Breaks in to a glove-like fit over time",
      "Ages with a deep, rich patina",
    ],
  },
  {
    name: "Sheepskin",
    tagline: "Soft luxury",
    image: "/blog/about-our-leather/04-sheepskin.jpg",
    imageAlt: "Soft sheepskin leather with a smooth drape",
    points: [
      "Sleek, lightweight feel for day-to-night style",
      "Butter-soft from the first wear—no break-in",
      "Naturally warm yet breathable",
      "Gets even softer the more you wear it",
    ],
  },
] as const;

export default function AboutPage() {
  return (
    <div className="about-page">
      <header className="about-hero">
        <div className="about-hero-media">
          <Image
            src="/about/about-hero.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="about-hero-image"
          />
          <div className="about-hero-shade" aria-hidden />
        </div>
        <div className="about-hero-copy">
          <p className="about-eyebrow">About our leather</p>
          <h1 className="about-title">Heritage behind every jacket</h1>
          <p className="about-lede">
            At Guild & Grain, a leather jacket is an investment and a lifelong
            companion—rooted in Pakistan&apos;s craft tradition, finished for
            modern wear.
          </p>
        </div>
      </header>

      <section className="about-section">
        <div className="about-section-inner about-split">
          <div className="about-prose">
            <h2 className="about-heading">Craftsmanship meets heritage</h2>
            <p>
              From raw hide to final stitch, we focus on quality, ethical
              sourcing, and timeless style. You&apos;re not just wearing
              leather—you&apos;re wearing work shaped by skilled artisans.
            </p>
            <p>
              Pakistan is known for its tanners and makers. We source locally
              from trusted tanneries and blend traditional methods with modern
              standards so every hide stays durable, supple, and full of
              character.
            </p>
            <p className="about-callout">
              Real leather is natural—no two jackets are identical. Grain,
              markings, and texture make yours one of a kind.
            </p>
          </div>
          <div className="about-figure">
            <Image
              src="/about/about-craft.jpg"
              alt="Artisan working leather in the workshop"
              width={900}
              height={675}
              className="about-figure-image"
            />
          </div>
        </div>
      </section>

      <section className="about-section about-section--muted">
        <div className="about-section-inner">
          <div className="about-hides-intro">
            <h2 className="about-heading">Choosing your hide</h2>
            <p>
              We work mainly with two premium leathers. Pick the feel that
              matches how you live.
            </p>
          </div>

          <div className="about-hides">
            {hides.map((hide) => (
              <article key={hide.name} className="about-hide-card">
                <div className="about-hide-media">
                  <Image
                    src={hide.image}
                    alt={hide.imageAlt}
                    width={800}
                    height={500}
                    className="about-hide-image"
                  />
                </div>
                <div className="about-hide-body">
                  <p className="about-hide-tag">{hide.tagline}</p>
                  <h3 className="about-hide-name">{hide.name}</h3>
                  <ul className="about-hide-points">
                    {hide.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-section">
        <div className="about-section-inner about-promise">
          <h2 className="about-heading">Our promise</h2>
          <p>
            We stand behind authenticity and durability. By working directly
            with local artisans—without unnecessary middlemen—we bring you
            luxury-grade leather without compromise.
          </p>
          <p className="about-signature">
            Wear authentic. Wear Guild & Grain.
          </p>
        </div>
      </section>

      <section className="about-cta-band">
        <div className="about-section-inner about-cta">
          <div>
            <h2 className="about-heading">Find your hide</h2>
            <p>
              Explore the catalog, or message us on WhatsApp if you want help
              choosing between cowhide and sheepskin.
            </p>
          </div>
          <div className="about-cta-actions">
            <Link href="/catalog" className="about-btn about-btn--primary">
              Browse catalog
            </Link>
            <Link href="/contact" className="about-btn about-btn--ghost">
              Contact us
            </Link>
            <Link
              href="/blogs/about-our-leather"
              className="about-btn about-btn--ghost"
            >
              Read full story
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
