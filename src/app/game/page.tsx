import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import MangoCatchGame from "@/components/MangoCatchGame";

export const metadata: Metadata = {
  title: "接芒果小遊戲 | 日光芒果園",
  description: "15 秒限時接芒果小遊戲，純娛樂放鬆一下。",
};

export default function GamePage() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#f4efe4] font-sans text-[#2b241d]">
      <SiteHeader />

      <section className="relative z-10 mx-auto max-w-6xl px-6 pt-16 pb-10 text-center sm:px-10 sm:pt-20">
        <p className="flex items-center justify-center gap-3 text-xs tracking-[0.35em] text-[#c1502e] uppercase">
          <span className="h-px w-8 bg-[#c1502e]" />
          Mini Game
          <span className="h-px w-8 bg-[#c1502e]" />
        </p>
        <h1 className="mt-6 font-serif text-4xl leading-snug font-bold sm:text-5xl">
          接芒果小遊戲
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-loose text-[#2b241d]/70">
          限時 15 秒，接越多芒果分數越高，純娛樂放鬆一下！
        </p>
      </section>

      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-20 sm:px-10">
        <MangoCatchGame />
      </section>

      <SiteFooter />
    </div>
  );
}
