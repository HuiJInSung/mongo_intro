import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { getPost, posts } from "@/lib/posts";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "找不到文章 | 日光芒果園" };
  return {
    title: `${post.title} | 日光芒果園`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#f4efe4] font-sans text-[#2b241d]">
      <SiteHeader />

      <article className="relative z-10 mx-auto max-w-3xl px-6 py-16 sm:px-10 sm:py-20">
        <Link
          href="/blog"
          className="text-sm tracking-wide text-[#2b241d]/60 transition-colors hover:text-[#c1502e]"
        >
          ← 回到芒果誌
        </Link>

        <p className="mt-8 flex items-center gap-3 text-xs tracking-[0.35em] text-[#c1502e] uppercase">
          <span className="h-px w-8 bg-[#c1502e]" />
          {post.tag}
        </p>
        <h1 className="mt-6 font-serif text-3xl leading-snug font-bold sm:text-4xl">
          {post.title}
        </h1>
        <time className="mt-4 block text-xs tracking-wide text-[#2b241d]/45">
          {post.date}
        </time>

        <div className="relative mt-8 aspect-[16/9] overflow-hidden border border-[#2b241d]/15">
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
        </div>

        <div className="mt-10 space-y-6">
          {post.content.map((paragraph, i) => (
            <p
              key={i}
              className="text-sm leading-loose text-[#2b241d]/75 sm:text-base"
            >
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-14 border-t border-[#2b241d]/15 pt-8 text-center">
          <p className="font-serif text-lg font-bold">
            想嚐嚐日光芒果園的愛文芒果嗎？
          </p>
          <Link
            href="/#order"
            className="mt-5 inline-block border border-[#2b241d] bg-[#2b241d] px-7 py-3 text-sm tracking-wide text-[#f4efe4] transition-colors hover:bg-[#c1502e] hover:border-[#c1502e]"
          >
            立即訂購
          </Link>
        </div>
      </article>

      {related.length > 0 && (
        <section className="relative z-10 mx-auto max-w-6xl border-t border-[#2b241d]/15 px-6 py-14 sm:px-10">
          <h2 className="font-serif text-xl font-bold">延伸閱讀</h2>
          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {related.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group flex gap-5"
              >
                <div className="relative h-24 w-32 shrink-0 overflow-hidden border border-[#2b241d]/15">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="128px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div>
                  <p className="text-xs tracking-wide text-[#2b241d]/45">
                    {p.tag}
                  </p>
                  <h3 className="mt-1 font-serif text-base leading-snug font-bold transition-colors group-hover:text-[#c1502e]">
                    {p.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <SiteFooter />
    </div>
  );
}
