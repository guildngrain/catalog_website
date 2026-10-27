import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container, Section } from "@/components/ui";
import { siteConfig } from "@/config/site";
import "./contact.css";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Get in touch with ${siteConfig.name} about bespoke leatherwork, orders, and care.`,
};

export default function ContactPage() {
  const socials = Object.values(siteConfig.social);

  return (
    <Section>
      <Container>
        <div className="contact-page">
          <h1 className="text-heading-h2 text-foreground">Contact Us</h1>
          <p className="mt-3 max-w-xl text-body text-muted">
            Questions about a piece, a custom build, or an order? Reach us on
            the channel that suits you — we&apos;ll get back as soon as we can.
          </p>

          <ul className="contact-channels mt-10">
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-channel"
                >
                  <Image
                    src={social.icon}
                    alt=""
                    width={40}
                    height={40}
                    className="size-10"
                  />
                  <span>
                    <span className="contact-channel-label">{social.label}</span>
                    <span className="contact-channel-hint">Message us</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <p className="mt-10 text-body-small text-muted">
            Prefer browsing first?{" "}
            <Link href="/catalog" className="contact-inline-link">
              Browse the catalog
            </Link>
            .
          </p>
        </div>
      </Container>
    </Section>
  );
}
