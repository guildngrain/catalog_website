import type { Metadata } from "next";
import { BookmarksList } from "@/components/bookmarks";
import { Container, Section } from "@/components/ui";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Bookmarks",
  description: `Saved pieces from ${siteConfig.name}. Stored on this device.`,
};

export default function BookmarksPage() {
  return (
    <Section>
      <Container>
        <h1 className="text-heading-h2 text-foreground">Bookmarks</h1>
        <p className="mt-3 max-w-xl text-body text-muted">
          Pieces you save stay on this browser — no account required.
        </p>
        <div className="mt-10">
          <BookmarksList />
        </div>
      </Container>
    </Section>
  );
}
