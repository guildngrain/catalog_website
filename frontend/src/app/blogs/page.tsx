import type { Metadata } from "next";
import Link from "next/link";
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
    <div className="blogs-page">
      <header className="blogs-header">
        <Container>
          <div className="blogs-header-grid">
            <div>
              <p className="blogs-eyebrow">Journal</p>
              <h1 className="blogs-title">Blogs</h1>
            </div>
            <p className="blogs-summary">
              Practical guides and craft stories from {siteConfig.name}—leather
              quality, fit, longevity, and how to choose a jacket that lasts.
            </p>
          </div>
          <div className="blogs-header-meta">
            <span>{blogPosts.length} articles</span>
            <span className="blogs-header-rule" aria-hidden />
            <span>Updated regularly</span>
          </div>
        </Container>
      </header>

      <Section className="blogs-list-section">
        <Container>
          <ul className="blogs-list">
            {blogPosts.map((post, index) => (
              <li key={post.slug}>
                <BlogCard post={post} index={index} />
              </li>
            ))}
          </ul>

          <aside className="blogs-aside">
            <div>
              <h2 className="blogs-aside-title">Need a recommendation?</h2>
              <p className="blogs-aside-copy">
                Tell us how you dress and what you need from a jacket. We will
                point you to the right silhouette and hide.
              </p>
            </div>
            <div className="blogs-aside-actions">
              <Link href="/contact" className="blogs-aside-primary">
                Contact us
              </Link>
              <Link href="/catalog" className="blogs-aside-secondary">
                View catalog
              </Link>
            </div>
          </aside>
        </Container>
      </Section>
    </div>
  );
}
