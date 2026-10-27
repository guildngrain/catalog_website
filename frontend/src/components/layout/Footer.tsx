import Image from "next/image";
import Link from "next/link";
import { Mail } from "lucide-react";
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
  const { catalog } = navigation.footer;
  const mailto = `mailto:${siteConfig.email}`;

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
            <a href={mailto} className="footer-email">
              <Mail className="size-4" strokeWidth={1.5} aria-hidden />
              {siteConfig.email}
            </a>
          </div>

          <FooterLinkColumn title={catalog.title} links={catalog.links} />

          <div>
            <h3 className="footer-heading">Contact</h3>
            <ul className="mt-4 flex flex-col gap-3">
              <li>
                <Link href="/contact">Contact Us</Link>
              </li>
              <li>
                <a href={mailto}>{siteConfig.email}</a>
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
            <ul className="flex flex-wrap items-center justify-center gap-6">
              {navigation.legal.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
            <a href={mailto} className="footer-bar-email">
              Email us
            </a>
          </div>
        </Container>
      </div>
    </footer>
  );
}
