import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/config/blog";
import "./BlogCard.css";

type BlogCardProps = {
  post: BlogPost;
  index: number;
};

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function BlogCard({ post, index }: BlogCardProps) {
  const href = `/blogs/${post.slug}`;
  const number = String(index + 1).padStart(2, "0");

  return (
    <article className="blog-entry">
      <Link href={href} className="blog-entry-media" aria-hidden tabIndex={-1}>
        <Image
          src={post.coverImage}
          alt=""
          width={960}
          height={720}
          className="blog-entry-image"
        />
      </Link>

      <div className="blog-entry-content">
        <div className="blog-entry-top">
          <span className="blog-entry-number">{number}</span>
          <p className="blog-entry-meta">
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            <span className="blog-entry-dot" aria-hidden />
            <span>{post.readTime}</span>
          </p>
        </div>

        <h2 className="blog-entry-title">
          <Link href={href}>{post.title}</Link>
        </h2>

        <p className="blog-entry-excerpt">{post.excerpt}</p>

        <Link href={href} className="blog-entry-cta">
          Read article
          <span aria-hidden>→</span>
        </Link>
      </div>
    </article>
  );
}
