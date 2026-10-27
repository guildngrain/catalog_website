import type { Metadata } from "next";
import Link from "next/link";
import { BlogCard } from "@/components/blog";
import { blogPosts } from "@/config/blog";
import { siteConfig } from "@/config/site";
import "./blogs.css";

export const metadata: Metadata = {
  title: "Journal",
  description: `Stories on leather craft, heritage, and materials from ${siteConfig.name}.`,
};

export default function BlogsPage() {
  const [featured, ...rest] = blogPosts;

  return (
    <div className="blogs-page">
      <header className="blogs-intro">
        <div className="blogs-intro-inner">
          <p className="blogs-eyebrow">Guild & Grain Journal</p>
          <h1 className="blogs-heading">Stories in leather</h1>
          <p className="blogs-lede">
            Craft, quality, and the long life of a jacket—written for people who
            care what they wear for years, not weeks.
          </p>
        </div>
      </header>

      {featured ? <BlogCard post={featured} variant="featured" /> : null}

      {rest.length > 0 ? (
        <section className="blogs-index" aria-label="More stories">
          <div className="blogs-index-inner">
            <div className="blogs-index-header">
              <h2 className="blogs-index-title">More from the journal</h2>
              <p className="blogs-index-count">
                {rest.length} {rest.length === 1 ? "story" : "stories"}
              </p>
            </div>

            <ul className="blogs-grid">
              {rest.map((post) => (
                <li key={post.slug}>
                  <BlogCard post={post} variant="grid" />
                </li>
              ))}
            </ul>

            <div className="blogs-footer-cta">
              <p>Looking for a piece, not a story?</p>
              <div className="blogs-footer-actions">
                <Link href="/catalog" className="blogs-footer-primary">
                  Browse catalog
                </Link>
                <Link href="/contact" className="blogs-footer-secondary">
                  Ask us anything
                </Link>
              </div>
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}
