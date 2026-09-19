"use client";

import { useEffect, useRef, useState } from "react";

export default function WelcomeGate({
  open,
  onSubmit,
}: {
  open: boolean;
  onSubmit: (name: string) => void;
}) {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = value.trim();
    onSubmit(trimmed || "朋友");
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#2b241d]/60 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm border border-[#2b241d]/15 bg-[#f4efe4] p-8 text-center shadow-xl"
      >
        <p className="text-xs tracking-[0.35em] text-[#c1502e] uppercase">
          Welcome
        </p>
        <h3 className="mt-3 font-serif text-2xl font-bold">歡迎光臨日光芒果園</h3>
        <p className="mt-2 text-sm leading-relaxed text-[#2b241d]/65">
          想怎麼稱呼您呢？
        </p>

        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="請輸入您的稱呼"
          maxLength={20}
          className="mt-6 w-full border border-[#2b241d]/25 bg-white/60 px-4 py-2.5 text-center text-sm text-[#2b241d] outline-none focus:border-[#c1502e]"
        />

        <button
          type="submit"
          className="mt-5 w-full border border-[#2b241d] bg-[#2b241d] px-7 py-3 text-sm tracking-wide text-[#f4efe4] transition-colors hover:bg-[#c1502e] hover:border-[#c1502e]"
        >
          進入網站
        </button>
      </form>
    </div>
  );
}
