import type { Metadata } from "next";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { Container, Section } from "@/components/ui";
import { siteConfig } from "@/config/site";
import "./contact.css";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Contact ${siteConfig.name} on WhatsApp at ${siteConfig.whatsapp.display} about bespoke leatherwork, catalog pieces, and care.`,
};

export default function ContactPage() {
  const whatsappHref = siteConfig.whatsapp.href;

  return (
    <Section>
      <Container>
        <div className="contact-page">
          <p className="contact-eyebrow">Get in touch</p>
          <h1 className="mt-3 text-heading-h2 text-foreground">Contact Us</h1>
          <p className="mt-4 max-w-2xl text-body text-muted">
            For catalog inquiries, bespoke commissions, sizing guidance, or
            leather care — message us on WhatsApp. We read every note and reply
            as soon as we can.
          </p>

          <div className="contact-panel mt-10">
            <div className="contact-panel-icon" aria-hidden>
              <MessageCircle className="size-6" strokeWidth={1.5} />
            </div>
            <div className="contact-panel-copy">
              <h2 className="contact-panel-title">WhatsApp</h2>
              <p className="contact-panel-hint">
                Prefer a quick chat? Reach the studio here:
              </p>
              <a
                href={whatsappHref}
                className="contact-email"
                target="_blank"
                rel="noopener noreferrer"
              >
                {siteConfig.whatsapp.display}
              </a>
            </div>
            <a
              href={whatsappHref}
              className="contact-cta"
              target="_blank"
              rel="noopener noreferrer"
            >
              Chat on WhatsApp
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
