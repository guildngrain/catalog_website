import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/config/blog";
import "./BlogCard.css";

type BlogCardProps = {
  post: BlogPost;
  variant?: "featured" | "grid";
};

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function BlogCard({ post, variant = "grid" }: BlogCardProps) {
  const dateLabel = formatDate(post.publishedAt);
  const href = `/blogs/${post.slug}`;

  if (variant === "featured") {
    return (
      <article className="blog-feature">
        <Link href={href} className="blog-feature-media">
          <Image
            src={post.coverImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className="blog-feature-image"
          />
          <span className="blog-feature-shade" aria-hidden />
        </Link>

        <div className="blog-feature-copy">
          <p className="blog-feature-kicker">Featured story</p>
          <p className="blog-feature-meta">
            {dateLabel}
            <span aria-hidden>·</span>
            {post.readTime}
          </p>
          <h2 className="blog-feature-title">
            <Link href={href}>{post.title}</Link>
          </h2>
          <p className="blog-feature-excerpt">{post.excerpt}</p>
          <Link href={href} className="blog-feature-cta">
            Read the story
          </Link>
        </div>
      </article>
    );
  }

  return (
    <article className="blog-tile">
      <Link href={href} className="blog-tile-media">
        <Image
          src={post.coverImage}
          alt=""
          width={900}
          height={600}
          className="blog-tile-image"
        />
      </Link>
      <div className="blog-tile-body">
        <p className="blog-tile-meta">
          {dateLabel}
          <span aria-hidden>·</span>
          {post.readTime}
        </p>
        <h2 className="blog-tile-title">
          <Link href={href}>{post.title}</Link>
        </h2>
        <p className="blog-tile-excerpt">{post.excerpt}</p>
        <Link href={href} className="blog-tile-link">
          Continue reading
        </Link>
      </div>
    </article>
  );
}
