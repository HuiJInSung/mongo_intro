"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import LuckyDrawModal from "@/components/LuckyDrawModal";
import WelcomeGate from "@/components/WelcomeGate";

function useParallax<T extends HTMLElement>(speed: number) {
  const ref = useRef<T>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      ticking = false;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2 - window.innerHeight / 2;
      setOffset(center * speed);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [speed]);

  return { ref, offset };
}

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

const values = [
  {
    index: "01",
    title: "當日現採",
    desc: "清晨採收、當日分級出貨，鎖住最新鮮的香氣與甜度。",
  },
  {
    index: "02",
    title: "甜度嚴選",
    desc: "每顆芒果均以甜度計把關，未達 15 度不出貨。",
  },
  {
    index: "03",
    title: "低溫配送",
    desc: "全程冷藏物流配送，果肉不受長途碰撞與悶熟影響。",
  },
  {
    index: "04",
    title: "產銷履歷",
    desc: "台南在地果園直營，生產紀錄透明可追溯。",
  },
];

const products = [
  {
    image: "/images/mango-1.jpg",
    name: "自食嚐鮮 3公斤",
    tag: "熱銷首選",
    price: "NT$ 590",
    desc: "約 8 – 10 顆，自己吃最划算的入門選擇。",
  },
  {
    image: "/images/mango.jpg",
    name: "分享裝 6公斤",
    tag: "送禮推薦",
    price: "NT$ 1,080",
    desc: "約 16 – 20 顆，精美包裝，送禮體面又大方。",
  },
  {
    image: "/images/mango-5.jpg",
    name: "家庭號 10公斤",
    tag: "最划算",
    price: "NT$ 1,680",
    desc: "約 26 – 32 顆，全家共享一整個夏天的甜蜜。",
  },
];

export default function Home() {
  const heroParallax = useParallax<HTMLDivElement>(0.08);
  const storyParallax = useParallax<HTMLDivElement>(0.08);
  const harvestParallax = useParallax<HTMLDivElement>(0.15);

  const [welcomeOpen, setWelcomeOpen] = useState(false);
  const [visitorName, setVisitorName] = useState<string | null>(null);

  useEffect(() => {
    const savedName = window.localStorage.getItem("visitorName");
    if (savedName) {
      setVisitorName(savedName);
    } else {
      setWelcomeOpen(true);
    }
  }, []);

  return (
    <div
      id="top"
      className="relative min-h-screen w-full overflow-x-hidden bg-[#f4efe4] font-sans text-[#2b241d]"
    >
      <WelcomeGate
        open={welcomeOpen}
        onSubmit={(name) => {
          setVisitorName(name);
          setWelcomeOpen(false);
          window.localStorage.setItem("visitorName", name);
        }}
      />

      {/* grain texture */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.05] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <SiteHeader />

      {/* Hero */}
      <section className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 py-14 sm:px-10 sm:py-20 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:py-24">
        <div>
          <p className="flex items-center gap-3 text-xs tracking-[0.35em] text-[#c1502e] uppercase">
            <span className="h-px w-8 bg-[#c1502e]" />
            台南 · 愛文芒果直送
          </p>
          {visitorName && (
            <p className="mt-4 text-sm text-[#2b241d]/70">
              哈囉，<span className="font-bold text-[#c1502e]">{visitorName}</span>，歡迎光臨日光芒果園 🥭
            </p>
          )}
          <h1 className="mt-6 font-serif text-4xl leading-[1.15] font-bold sm:text-5xl lg:text-6xl">
            一口咬下，
            <br />
            夏天最甜的
            <br />
            那顆芒果。
          </h1>
          <p className="mt-6 max-w-md text-sm leading-loose text-[#2b241d]/70 sm:text-base">
            自家果園直營，清晨現採、當日出貨。
            每一顆都經過甜度嚴選，只為讓你嚐到台南土地最誠實的甜蜜。
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#order"
              className="border border-[#2b241d] bg-[#2b241d] px-7 py-3 text-sm tracking-wide text-[#f4efe4] transition-colors hover:bg-[#c1502e] hover:border-[#c1502e]"
            >
              立即訂購
            </a>
            <a
              href="#products"
              className="border-b border-[#2b241d]/40 pb-0.5 text-sm tracking-wide text-[#2b241d]/80 transition-colors hover:border-[#c1502e] hover:text-[#c1502e]"
            >
              查看商品方案 →
            </a>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-[#2b241d]/10 pt-6 text-xs tracking-wide text-[#2b241d]/55">
            <span>甜度 15 度以上</span>
            <span>低溫配送到府</span>
            <span>不甜不熟包換</span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-sm">
          <div
            ref={heroParallax.ref}
            className="relative aspect-[4/5] overflow-hidden border border-[#2b241d]/15"
          >
            <div
              className="absolute inset-0 will-change-transform"
              style={{ transform: `translateY(${heroParallax.offset}px) scale(1.15)` }}
            >
              <Image
                src="/images/mango.jpg"
                alt="現切愛文芒果，果肉金黃多汁"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 420px"
                className="object-cover"
              />
            </div>
          </div>
          <div className="absolute -bottom-5 -left-5 flex items-center gap-2 border border-[#2b241d]/20 bg-[#f4efe4] px-4 py-2 text-[11px] tracking-wide text-[#2b241d]/70 shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#c1502e]" />
            NT$ 590 起 · 產地直送
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="relative z-10 mx-auto max-w-6xl border-t border-[#2b241d]/15 px-6 py-14 sm:px-10">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 md:grid-cols-4">
          {values.map((v, i) => (
            <Reveal key={v.index} delay={i * 80}>
              <span className="font-serif text-sm text-[#c1502e]">
                {v.index}
              </span>
              <h3 className="mt-3 font-serif text-lg font-bold">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#2b241d]/65">
                {v.desc}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Section label */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 sm:px-10">
        <div className="flex items-end justify-between border-b border-[#2b241d]/15 pb-4">
          <h2 className="font-serif text-2xl font-bold sm:text-3xl">
            <span className="mr-2 text-[#c1502e]">02</span>
            商品方案
          </h2>
          <span className="hidden text-xs tracking-[0.25em] text-[#2b241d]/40 uppercase sm:block">
            Choose Your Box
          </span>
        </div>
      </div>

      {/* Products */}
      <section
        id="products"
        className="relative z-10 mx-auto max-w-6xl px-6 py-14 sm:px-10"
      >
        <div className="grid grid-cols-1 gap-px bg-[#2b241d]/15 sm:grid-cols-3">
          {products.map((p, i) => (
            <Reveal key={p.name} delay={i * 100} className="group flex flex-col bg-[#f4efe4]">
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-4 left-4 border border-[#f4efe4]/70 bg-[#2b241d]/70 px-3 py-1 text-[11px] tracking-wide text-[#f4efe4] backdrop-blur-sm">
                  {p.tag}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-7">
                <h3 className="font-serif text-xl font-bold">{p.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[#2b241d]/65">
                  {p.desc}
                </p>
                <div className="mt-6 flex items-center justify-between border-t border-[#2b241d]/10 pt-4">
                  <span className="font-serif text-lg font-bold text-[#c1502e]">
                    {p.price}
                  </span>
                  <a
                    href="#order"
                    className="text-sm tracking-wide text-[#2b241d]/80 underline decoration-[#2b241d]/30 underline-offset-4 transition-colors hover:text-[#c1502e] hover:decoration-[#c1502e]"
                  >
                    訂購 →
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Story */}
      <section
        id="story"
        className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 py-20 sm:px-10 sm:py-28 lg:grid-cols-2 lg:items-center"
      >
        <div
          ref={storyParallax.ref}
          className="relative aspect-[4/5] overflow-hidden border border-[#2b241d]/15 lg:order-2"
        >
          <div
            className="absolute inset-0 will-change-transform"
            style={{ transform: `translateY(${storyParallax.offset}px) scale(1.15)` }}
          >
            <Image
              src="/images/mango-2.jpg"
              alt="果農親手摘採的新鮮芒果"
              fill
              sizes="(max-width: 1024px) 90vw, 500px"
              className="object-cover"
            />
          </div>
        </div>
        <div className="lg:order-1">
          <p className="flex items-center gap-3 text-xs tracking-[0.35em] text-[#c1502e] uppercase">
            <span className="h-px w-8 bg-[#c1502e]" />
            產地故事
          </p>
          <h2 className="mt-6 font-serif text-3xl leading-snug font-bold sm:text-4xl">
            三代人守著的
            <br />
            台南芒果園
          </h2>
          <p className="mt-6 max-w-md text-sm leading-loose text-[#2b241d]/70">
            日光芒果園座落於台南低海拔丘陵地，日照充足、排水良好，
            是愛文芒果最理想的生長環境。從阿公那一代開始種植，
            我們堅持不使用早採催熟，讓每顆果實都在欉紅、自然成熟後才採收，
            只為留住最完整的香氣與甜度。
          </p>
          <div className="mt-8 grid grid-cols-2 gap-6 border-t border-[#2b241d]/10 pt-6 sm:grid-cols-3">
            <div>
              <p className="font-serif text-2xl font-bold text-[#c1502e]">
                30<span className="text-base">年</span>
              </p>
              <p className="mt-1 text-xs tracking-wide text-[#2b241d]/55">
                栽種經驗
              </p>
            </div>
            <div>
              <p className="font-serif text-2xl font-bold text-[#c1502e]">
                15<span className="text-base">度+</span>
              </p>
              <p className="mt-1 text-xs tracking-wide text-[#2b241d]/55">
                平均甜度
              </p>
            </div>
            <div>
              <p className="font-serif text-2xl font-bold text-[#c1502e]">
                24<span className="text-base">hr</span>
              </p>
              <p className="mt-1 text-xs tracking-wide text-[#2b241d]/55">
                採收即出貨
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Harvest banner */}
      <section
        ref={harvestParallax.ref}
        className="relative z-10 h-[50vh] min-h-[320px] w-full overflow-hidden"
      >
        <div
          className="absolute inset-0 will-change-transform"
          style={{ transform: `translateY(${harvestParallax.offset}px) scale(1.3)` }}
        >
          <Image
            src="/images/mango-4.jpg"
            alt="豐收季節的愛文芒果"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#2b241d]/70 via-[#2b241d]/10 to-transparent" />
        <Reveal className="absolute bottom-8 left-6 sm:bottom-12 sm:left-10">
          <p className="text-xs tracking-[0.35em] text-[#f4efe4]/80 uppercase">
            Harvest Season
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-[#f4efe4] drop-shadow sm:text-4xl">
            五月到八月，正是產季。
          </h2>
        </Reveal>
      </section>

      {/* Order CTA */}
      <section
        id="order"
        className="relative z-10 mx-auto max-w-6xl px-6 py-20 text-center sm:px-10 sm:py-28"
      >
        <p className="flex items-center justify-center gap-3 text-xs tracking-[0.35em] text-[#c1502e] uppercase">
          <span className="h-px w-8 bg-[#c1502e]" />
          立即訂購
          <span className="h-px w-8 bg-[#c1502e]" />
        </p>
        <h2 className="mx-auto mt-6 max-w-xl font-serif text-3xl leading-snug font-bold sm:text-4xl">
          本週現貨供應中，
          <br />
          下單後 24 小時內採收出貨。
        </h2>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://line.me/"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-[#2b241d] bg-[#2b241d] px-8 py-3 text-sm tracking-wide text-[#f4efe4] transition-colors hover:bg-[#c1502e] hover:border-[#c1502e]"
          >
            加 LINE 官方帳號訂購
          </a>
          <a
            href="tel:+886912345678"
            className="border-b border-[#2b241d]/40 pb-0.5 text-sm tracking-wide text-[#2b241d]/80 transition-colors hover:border-[#c1502e] hover:text-[#c1502e]"
          >
            或致電 0912-345-678
          </a>
          <LuckyDrawModal />
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
