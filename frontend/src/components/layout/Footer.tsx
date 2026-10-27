import Image from "next/image";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { navigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { Button, Container } from "@/components/ui";
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
  const { catalog, brand, help } = navigation.footer;
  const socials = Object.values(siteConfig.social);

  return (
    <footer className="mt-auto border-t">
      <Container>
        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
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
            <ul className="flex items-center gap-3">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                  >
                    <Image
                      src={social.icon}
                      alt=""
                      width={40}
                      height={40}
                      className="size-10"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <FooterLinkColumn title={catalog.title} links={catalog.links} />
          <FooterLinkColumn title={brand.title} links={brand.links} />

          <div>
            <h3 className="footer-heading">{help.title}</h3>
            <div className="mt-4 flex flex-col gap-3">
              <Button
                variant="outline"
                size="sm"
                className="track-order w-fit rounded-full px-5"
              >
                Track Your Order
              </Button>
              <ul className="flex flex-col gap-3">
                {help.links.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
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
            <Button
              variant="secondary"
              size="sm"
              className="gap-2 rounded-full bg-foreground text-background hover:bg-foreground/90"
            >
              <MessageCircle className="size-4" aria-hidden />
              Chat with us
            </Button>
          </div>
        </Container>
      </div>
    </footer>
  );
}
