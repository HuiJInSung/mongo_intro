import Link from "next/link";
import { navLinks } from "@/lib/nav";

export default function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-[#2b241d]/15">
      <div className="mx-auto max-w-6xl px-6 py-14 sm:px-10">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <span className="font-serif text-3xl font-bold">日光芒果園</span>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-[#2b241d]/60">
              來自台南的三代果園，只做一件事：把最甜的愛文芒果送到你手上。
            </p>
          </div>
          <div>
            <h3 className="text-xs tracking-[0.25em] text-[#2b241d]/40 uppercase">
              快速連結
            </h3>
            <ul className="mt-4 space-y-2">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#2b241d]/70 transition-colors hover:text-[#c1502e]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs tracking-[0.25em] text-[#2b241d]/40 uppercase">
              聯絡資訊
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-[#2b241d]/70">
              <li>0912-345-678</li>
              <li>hello@sunlightmango.tw</li>
              <li>台南市玉井區芒果路 88 號</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-2 border-t border-[#2b241d]/10 pt-6 text-xs text-[#2b241d]/45 sm:flex-row sm:items-center">
          <span>
            &copy; {new Date().getFullYear()} 日光芒果園 Sunlight Mango Farm.
          </span>
          <span>Made with care in Tainan.</span>
        </div>
      </div>
    </footer>
  );
}
