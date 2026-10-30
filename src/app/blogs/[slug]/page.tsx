import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogArticle } from "@/components/blog";
import { blogPosts, getBlogPost } from "@/config/blog";
import "./post.css";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Journal" };

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <div className="blog-post-crumb">
        <div className="blog-post-crumb-inner">
          <p>
            <Link href="/blogs">Journal</Link>
            <span aria-hidden> / </span>
            <span>{post.title}</span>
          </p>
        </div>
      </div>
      <BlogArticle post={post} />
    </>
  );
}
