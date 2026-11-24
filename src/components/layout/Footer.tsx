import Image from "next/image";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { navigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui";
import "./Footer.css";

function FooterLinkColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="footer-heading">{title}</h3>
      <ul className="mt-4 flex flex-col gap-3">
        {links.map((item) => (
          <li key={item.href}>
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const { catalog, journal } = navigation.footer;
  const whatsappHref = siteConfig.whatsapp.href;

  return (
    <footer className="mt-auto border-t">
      <Container>
        <div className="footer-grid">
          <div className="flex flex-col gap-5">
            <Link href="/">
              <Image
                src={siteConfig.logo}
                alt={siteConfig.name}
                width={200}
                height={48}
                className="h-12 w-auto"
                style={{ width: "auto" }}
              />
            </Link>
            <p className="footer-desc max-w-xs">{siteConfig.description}</p>
            <a
              href={whatsappHref}
              className="footer-email"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="size-4" strokeWidth={1.5} aria-hidden />
              {siteConfig.whatsapp.display}
            </a>
          </div>

          <FooterLinkColumn title={catalog.title} links={catalog.links} />
          <FooterLinkColumn title={journal.title} links={journal.links} />

          <div>
            <h3 className="footer-heading">Contact</h3>
            <ul className="mt-4 flex flex-col gap-3">
              <li>
                <Link href="/contact">Contact Us</Link>
              </li>
              <li>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {siteConfig.whatsapp.display}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Container>

      <div className="footer-bar">
        <Container>
          <div className="flex flex-col items-center justify-between gap-4 py-4 lg:flex-row">
            <p className="footer-bar-copy">
              &copy; {new Date().getFullYear()} {siteConfig.name.toUpperCase()}.
              All rights reserved.
            </p>
            {navigation.legal.length > 0 ? (
              <ul className="flex flex-wrap items-center justify-center gap-6">
                {navigation.legal.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            ) : null}
            <a
              href={whatsappHref}
              className="footer-bar-email"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp us
            </a>
          </div>
        </Container>
      </div>
    </footer>
  );
}
