import type { Metadata } from "next";
import Link from "next/link";
import { Mail } from "lucide-react";
import { Container, Section } from "@/components/ui";
import { siteConfig } from "@/config/site";
import "./contact.css";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Contact ${siteConfig.name} at ${siteConfig.email} about bespoke leatherwork, catalog pieces, and care.`,
};

export default function ContactPage() {
  const mailto = `mailto:${siteConfig.email}`;

  return (
    <Section>
      <Container>
        <div className="contact-page">
          <p className="contact-eyebrow">Get in touch</p>
          <h1 className="mt-3 text-heading-h2 text-foreground">Contact Us</h1>
          <p className="mt-4 max-w-2xl text-body text-muted">
            For catalog inquiries, bespoke commissions, sizing guidance, or
            leather care — email us directly. We read every message and reply
            as soon as we can.
          </p>

          <div className="contact-panel mt-10">
            <div className="contact-panel-icon" aria-hidden>
              <Mail className="size-6" strokeWidth={1.5} />
            </div>
            <div className="contact-panel-copy">
              <h2 className="contact-panel-title">Email</h2>
              <p className="contact-panel-hint">
                Prefer a written note? Reach the studio here:
              </p>
              <a href={mailto} className="contact-email">
                {siteConfig.email}
              </a>
            </div>
            <a href={mailto} className="contact-cta">
              Send an email
            </a>
          </div>

          <div className="contact-notes mt-10">
            <div>
              <h3 className="contact-note-title">What to include</h3>
              <p className="contact-note-body">
                Piece name or link, preferred fit notes, and any custom details
                help us respond with clear next steps.
              </p>
            </div>
            <div>
              <h3 className="contact-note-title">Response time</h3>
              <p className="contact-note-body">
                Most inquiries receive a reply within one to two business days.
              </p>
            </div>
          </div>

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
