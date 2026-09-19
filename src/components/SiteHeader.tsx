"use client";

import Link from "next/link";
import { useState } from "react";
import { navLinks } from "@/lib/nav";

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-[#2b241d]/10 bg-[#f4efe4]/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-10">
        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          className="flex items-center gap-3"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-[#2b241d]/30 font-serif text-lg text-[#c1502e]">
            芒
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-serif text-base font-bold tracking-[0.15em]">
              日光芒果園
            </span>
            <span className="text-[10px] tracking-[0.25em] text-[#2b241d]/50 uppercase">
              Sunlight Mango Farm
            </span>
          </span>
        </Link>

        <nav className="hidden gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="group relative text-sm tracking-wide text-[#2b241d]/70 transition-colors hover:text-[#2b241d]"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#c1502e] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>
        <Link
          href="/#order"
          className="hidden border border-[#2b241d] px-5 py-2 text-sm tracking-wide transition-colors hover:bg-[#2b241d] hover:text-[#f4efe4] md:block"
        >
          立即訂購
        </Link>

        {/* Mobile menu toggle */}
        <button
          type="button"
          aria-label={menuOpen ? "關閉選單" : "開啟選單"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className="flex h-9 w-9 shrink-0 flex-col items-center justify-center gap-[5px] border border-[#2b241d]/30 md:hidden"
        >
          <span
            className={`block h-px w-4 bg-[#2b241d] transition-transform duration-300 ${
              menuOpen ? "translate-y-[3px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-px w-4 bg-[#2b241d] transition-transform duration-300 ${
              menuOpen ? "-translate-y-[3px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu panel */}
      <div
        className={`overflow-hidden border-t border-[#2b241d]/10 transition-[max-height] duration-300 ease-in-out md:hidden ${
          menuOpen ? "max-h-80" : "max-h-0 border-t-0"
        }`}
      >
        <nav className="flex flex-col gap-1 px-6 py-4">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="py-2.5 text-sm tracking-wide text-[#2b241d]/80 transition-colors hover:text-[#c1502e]"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#order"
            onClick={() => setMenuOpen(false)}
            className="mt-2 border border-[#2b241d] px-5 py-2.5 text-center text-sm tracking-wide transition-colors hover:bg-[#2b241d] hover:text-[#f4efe4]"
          >
            立即訂購
          </Link>
        </nav>
      </div>
    </header>
  );
}
