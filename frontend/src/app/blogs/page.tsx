import type { Metadata } from "next";
import { BlogCard } from "@/components/blog";
import { Container, Section } from "@/components/ui";
import { blogPosts } from "@/config/blog";
import { siteConfig } from "@/config/site";
import "./blogs.css";

export const metadata: Metadata = {
  title: "Journal",
  description: `Stories on leather craft, heritage, and materials from ${siteConfig.name}.`,
};

export default function BlogsPage() {
  return (
    <Section>
      <Container>
        <p className="blogs-eyebrow">Journal</p>
        <h1 className="mt-3 text-heading-h2 text-foreground">Blogs</h1>
        <p className="mt-3 max-w-2xl text-body text-muted">
          Heritage, hide, and the craft behind every Guild & Grain jacket.
        </p>

        <ul className="mt-10 flex flex-col gap-6">
          {blogPosts.map((post) => (
            <li key={post.slug}>
              <BlogCard post={post} />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
