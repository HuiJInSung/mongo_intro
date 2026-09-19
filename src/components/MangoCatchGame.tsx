"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const GAME_DURATION = 15;
const BASKET_WIDTH_PCT = 16;
const CATCH_LINE_PCT = 88;
const MANGO_FALL_ZONE_HEIGHT = 460;

type Mango = {
  id: number;
  xPct: number;
  y: number;
  speed: number;
};

type GameState = "idle" | "playing" | "ended";

export default function MangoCatchGame() {
  const [gameState, setGameState] = useState<GameState>("idle");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [mangoes, setMangoes] = useState<Mango[]>([]);
  const [basketPct, setBasketPct] = useState(50);

  const containerRef = useRef<HTMLDivElement>(null);
  const basketPctRef = useRef(50);
  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);
  const startTsRef = useRef<number | null>(null);
  const spawnAccRef = useRef(0);
  const nextIdRef = useRef(0);
  const elapsedRef = useRef(0);

  useEffect(() => {
    basketPctRef.current = basketPct;
  }, [basketPct]);

  const updateBasketFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setBasketPct(Math.min(100 - BASKET_WIDTH_PCT / 2, Math.max(BASKET_WIDTH_PCT / 2, pct)));
  }, []);

  const startGame = () => {
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setMangoes([]);
    setBasketPct(50);
    elapsedRef.current = 0;
    spawnAccRef.current = 0;
    lastTsRef.current = null;
    startTsRef.current = null;
    nextIdRef.current = 0;
    setGameState("playing");
  };

  useEffect(() => {
    if (gameState !== "playing") {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }

    const tick = (ts: number) => {
      if (startTsRef.current === null) startTsRef.current = ts;
      if (lastTsRef.current === null) lastTsRef.current = ts;
      const dt = Math.min(250, ts - lastTsRef.current);
      lastTsRef.current = ts;
      elapsedRef.current = ts - startTsRef.current;

      const remaining = Math.max(0, GAME_DURATION - elapsedRef.current / 1000);
      setTimeLeft(remaining);

      if (remaining <= 0) {
        setGameState("ended");
        setMangoes([]);
        return;
      }

      spawnAccRef.current += dt;
      const spawnInterval = Math.max(420, 850 - elapsedRef.current / 25);
      const newMangoes: Mango[] = [];
      if (spawnAccRef.current >= spawnInterval) {
        spawnAccRef.current = 0;
        newMangoes.push({
          id: nextIdRef.current++,
          xPct: 8 + Math.random() * 84,
          y: -8,
          speed: 130 + Math.random() * 110 + elapsedRef.current / 60,
        });
      }

      setMangoes((prev) => {
        const moved = [...prev, ...newMangoes]
          .map((m) => ({ ...m, y: m.y + (m.speed * dt) / 1000 }))
          .filter((m) => {
            const reachedLine =
              (m.y / MANGO_FALL_ZONE_HEIGHT) * 100 >= CATCH_LINE_PCT;
            if (reachedLine) {
              const caught =
                Math.abs(m.xPct - basketPctRef.current) <
                BASKET_WIDTH_PCT / 2 + 4;
              if (caught) {
                setScore((s) => s + 1);
              }
              return false;
            }
            return true;
          });
        return moved;
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [gameState]);

  useEffect(() => {
    if (gameState !== "playing") return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setBasketPct((p) => Math.max(BASKET_WIDTH_PCT / 2, p - 6));
      } else if (e.key === "ArrowRight") {
        setBasketPct((p) => Math.min(100 - BASKET_WIDTH_PCT / 2, p + 6));
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [gameState]);

  return (
    <div className="mx-auto max-w-xl">
      <div
        ref={containerRef}
        onPointerMove={(e) => {
          if (gameState === "playing") updateBasketFromClientX(e.clientX);
        }}
        onTouchMove={(e) => {
          if (gameState === "playing" && e.touches[0]) {
            updateBasketFromClientX(e.touches[0].clientX);
          }
        }}
        className="relative h-[460px] w-full touch-none overflow-hidden border border-[#2b241d]/15 bg-gradient-to-b from-[#fdf8ec] to-[#f4efe4] select-none"
      >
        {/* score / timer HUD */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-center justify-between px-4 py-3 text-sm">
          <span className="border border-[#2b241d]/20 bg-[#f4efe4]/90 px-3 py-1 font-serif font-bold text-[#2b241d]">
            分數 {score}
          </span>
          {gameState === "playing" && (
            <span className="border border-[#c1502e]/40 bg-[#f4efe4]/90 px-3 py-1 font-serif font-bold text-[#c1502e]">
              {timeLeft.toFixed(1)}s
            </span>
          )}
        </div>

        {/* falling mangoes */}
        {mangoes.map((m) => (
          <div
            key={m.id}
            className="pointer-events-none absolute text-3xl"
            style={{
              left: `${m.xPct}%`,
              top: `${(m.y / MANGO_FALL_ZONE_HEIGHT) * 100}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            🥭
          </div>
        ))}

        {/* basket */}
        {gameState === "playing" && (
          <div
            className="pointer-events-none absolute bottom-4 text-4xl"
            style={{
              left: `${basketPct}%`,
              transform: "translateX(-50%)",
            }}
          >
            🧺
          </div>
        )}

        {/* idle overlay */}
        {gameState === "idle" && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-[#2b241d]/5 px-6 text-center">
            <p className="text-xs tracking-[0.35em] text-[#c1502e] uppercase">
              Mini Game
            </p>
            <h3 className="font-serif text-2xl font-bold">接芒果小遊戲</h3>
            <p className="max-w-xs text-sm leading-relaxed text-[#2b241d]/65">
              左右移動滑鼠（或用鍵盤 ← →）操控籃子，
              <br />
              15 秒內接住越多芒果分數越高！
            </p>
            <button
              type="button"
              onClick={startGame}
              className="mt-2 border border-[#2b241d] bg-[#2b241d] px-8 py-3 text-sm tracking-wide text-[#f4efe4] transition-colors hover:bg-[#c1502e] hover:border-[#c1502e]"
            >
              開始遊戲
            </button>
          </div>
        )}

        {/* ended overlay */}
        {gameState === "ended" && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-[#2b241d]/10 px-6 text-center backdrop-blur-[1px]">
            <p className="text-xs tracking-[0.35em] text-[#c1502e] uppercase">
              Time&apos;s Up
            </p>
            <h3 className="font-serif text-2xl font-bold">遊戲結束！</h3>
            <p className="font-serif text-4xl font-bold text-[#c1502e]">
              {score} <span className="text-lg text-[#2b241d]/60">顆芒果</span>
            </p>
            <button
              type="button"
              onClick={startGame}
              className="mt-2 border border-[#2b241d] bg-[#2b241d] px-8 py-3 text-sm tracking-wide text-[#f4efe4] transition-colors hover:bg-[#c1502e] hover:border-[#c1502e]"
            >
              再玩一次
            </button>
          </div>
        )}
      </div>
      <p className="mt-3 text-center text-xs text-[#2b241d]/45">
        純娛樂小遊戲，不影響訂單與優惠券。
      </p>
    </div>
  );
}
