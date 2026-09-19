"use client";

import { useState } from "react";

const WIN_RATE = 0.1;
const COUPON_CODE = "MANGO90";

type DrawResult = "win" | "lose";

export default function LuckyDrawModal() {
  const [open, setOpen] = useState(false);
  const [drawing, setDrawing] = useState(false);
  const [result, setResult] = useState<DrawResult | null>(null);

  const openModal = () => {
    setResult(null);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setDrawing(false);
    setResult(null);
  };

  const draw = () => {
    if (drawing) return;
    setDrawing(true);
    setResult(null);
    window.setTimeout(() => {
      setResult(Math.random() < WIN_RATE ? "win" : "lose");
      setDrawing(false);
    }, 900);
  };

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="border border-[#c1502e] px-5 py-2.5 text-sm tracking-wide text-[#c1502e] transition-colors hover:bg-[#c1502e] hover:text-[#f4efe4]"
      >
        🎁 抽芒果優惠券
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#2b241d]/60 px-4"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-sm border border-[#2b241d]/15 bg-[#f4efe4] p-8 text-center shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeModal}
              aria-label="關閉"
              className="absolute top-3 right-3 text-lg text-[#2b241d]/50 hover:text-[#c1502e]"
            >
              ✕
            </button>

            <p className="text-xs tracking-[0.35em] text-[#c1502e] uppercase">
              Lucky Draw
            </p>
            <h3 className="mt-3 font-serif text-2xl font-bold">芒果優惠券抽獎</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#2b241d]/65">
              有 10% 機率抽中「芒果優惠券 9 折」，祝你好運！
            </p>

            <div className="mt-6 flex min-h-[110px] flex-col items-center justify-center border border-[#2b241d]/10 bg-white/40 p-5">
              {result === null && !drawing && (
                <span className="text-sm text-[#2b241d]/50">
                  按下方按鈕開始抽獎
                </span>
              )}
              {drawing && (
                <span className="animate-pulse text-sm text-[#2b241d]/60">
                  抽獎中...
                </span>
              )}
              {result === "win" && (
                <div>
                  <p className="font-serif text-lg font-bold text-[#c1502e]">
                    🎉 恭喜中獎！
                  </p>
                  <p className="mt-2 text-sm text-[#2b241d]/70">
                    芒果優惠券 9 折，結帳輸入代碼：
                  </p>
                  <p className="mt-2 border border-dashed border-[#c1502e] px-3 py-1 font-serif text-base tracking-widest text-[#c1502e]">
                    {COUPON_CODE}
                  </p>
                </div>
              )}
              {result === "lose" && (
                <div>
                  <p className="font-serif text-lg font-bold text-[#2b241d]">
                    謝謝參與
                  </p>
                  <p className="mt-2 text-sm text-[#2b241d]/60">
                    這次沒中獎，歡迎再試一次！
                  </p>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={draw}
              disabled={drawing}
              className="mt-6 w-full border border-[#2b241d] bg-[#2b241d] px-7 py-3 text-sm tracking-wide text-[#f4efe4] transition-colors hover:bg-[#c1502e] hover:border-[#c1502e] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {result === null ? "開始抽獎" : "再抽一次"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
