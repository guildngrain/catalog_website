import Image from "next/image";
import Link from "next/link";
import type { BlogBlock, BlogPost } from "@/config/blog";
import { siteConfig } from "@/config/site";
import "./BlogArticle.css";

function Block({ block }: { block: BlogBlock }) {
  if (block.type === "heading") {
    return <h2 className="blog-section-heading">{block.text}</h2>;
  }

  if (block.type === "list") {
    return (
      <ul className="blog-list">
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }

  return <p className="blog-paragraph">{block.text}</p>;
}

type BlogArticleProps = {
  post: BlogPost;
};

export function BlogArticle({ post }: BlogArticleProps) {
  const dateLabel = new Date(post.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="blog-article">
      <header className="blog-hero">
        <div className="blog-hero-media">
          <Image
            src={post.coverImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className="blog-hero-image"
          />
          <div className="blog-hero-overlay" />
        </div>

        <div className="blog-hero-copy">
          <p className="blog-eyebrow">Journal</p>
          <h1 className="blog-title">{post.title}</h1>
          <div className="blog-meta">
            <span>{dateLabel}</span>
            <span aria-hidden>·</span>
            <span>{post.readTime}</span>
            <span aria-hidden>·</span>
            <span>{siteConfig.name}</span>
          </div>
        </div>
      </header>

      <div className="blog-body">
        {post.sections.map((section, index) => (
          <section
            key={section.id}
            className={
              index % 2 === 1
                ? "blog-section blog-section--reverse"
                : "blog-section"
            }
          >
            <div className="blog-section-media">
              <Image
                src={section.image}
                alt={section.imageAlt}
                width={1200}
                height={675}
                className="blog-section-image"
              />
            </div>
            <div className="blog-section-copy">
              {section.blocks.map((block, blockIndex) => (
                <Block
                  key={`${section.id}-${block.type}-${blockIndex}`}
                  block={block}
                />
              ))}
            </div>
          </section>
        ))}

        <footer className="blog-closing">
          <p className="blog-closing-kicker">Continue exploring</p>
          <div className="blog-closing-actions">
            <Link href="/catalog" className="blog-closing-primary">
              Browse the catalog
            </Link>
            <Link href="/contact" className="blog-closing-secondary">
              Ask about our leather
            </Link>
          </div>
        </footer>
      </div>
    </article>
  );
}
