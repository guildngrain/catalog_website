import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/config/blog";
import "./BlogCard.css";

type BlogCardProps = {
  post: BlogPost;
};

export function BlogCard({ post }: BlogCardProps) {
  const dateLabel = new Date(post.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <article className="blog-card">
      <Link href={`/blogs/${post.slug}`} className="blog-card-media">
        <Image
          src={post.coverImage}
          alt=""
          width={1200}
          height={675}
          className="blog-card-image"
        />
      </Link>
      <div className="blog-card-body">
        <p className="blog-card-meta">
          {dateLabel} · {post.readTime}
        </p>
        <h2 className="blog-card-title">
          <Link href={`/blogs/${post.slug}`}>{post.title}</Link>
        </h2>
        <p className="blog-card-excerpt">{post.excerpt}</p>
        <Link href={`/blogs/${post.slug}`} className="blog-card-link">
          Read article
        </Link>
      </div>
    </article>
  );
}
