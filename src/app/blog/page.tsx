import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { posts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "部落格 | 日光芒果園",
  description: "關於愛文芒果的產地故事、選購指南與料理食譜。",
};

export default function BlogPage() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#f4efe4] font-sans text-[#2b241d]">
      <SiteHeader />

      <section className="relative z-10 mx-auto max-w-6xl px-6 pt-16 pb-8 sm:px-10 sm:pt-20">
        <p className="flex items-center gap-3 text-xs tracking-[0.35em] text-[#c1502e] uppercase">
          <span className="h-px w-8 bg-[#c1502e]" />
          Mango Journal
        </p>
        <h1 className="mt-6 font-serif text-4xl leading-snug font-bold sm:text-5xl">
          芒果誌
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-loose text-[#2b241d]/70 sm:text-base">
          從產地故事、挑選訣竅到料理提案，關於愛文芒果的大小事都在這裡。
        </p>
      </section>

      <section className="relative z-10 mx-auto max-w-6xl px-6 py-10 sm:px-10">
        <div className="grid grid-cols-1 gap-px bg-[#2b241d]/15 sm:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col bg-[#f4efe4] transition-colors hover:bg-white"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-4 left-4 border border-[#f4efe4]/70 bg-[#2b241d]/70 px-3 py-1 text-[11px] tracking-wide text-[#f4efe4] backdrop-blur-sm">
                  {post.tag}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-7">
                <time className="text-xs tracking-wide text-[#2b241d]/45">
                  {post.date}
                </time>
                <h2 className="mt-3 font-serif text-xl leading-snug font-bold">
                  {post.title}
                </h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[#2b241d]/65">
                  {post.excerpt}
                </p>
                <span className="mt-6 text-sm tracking-wide text-[#2b241d]/80 underline decoration-[#2b241d]/30 underline-offset-4 transition-colors group-hover:text-[#c1502e] group-hover:decoration-[#c1502e]">
                  閱讀全文 →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
