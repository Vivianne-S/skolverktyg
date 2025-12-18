"use client";

import { useMemo, useState } from "react";

type RangeKey = "0-2" | "3-5" | "6-9" | "10-12" | "13-18";

const RECOMMENDATIONS: Record<
  RangeKey,
  { title: string; minutes: number; tips: string[] }
> = {
  "0-2": {
    title: "0–2 år",
    minutes: 0,
    tips: ["Undvik skärmar helt.", "Fokusera på lek, rörelse och närvaro."],
  },
  "3-5": {
    title: "3–5 år",
    minutes: 60,
    tips: ["Max 1 timme per dag.", "Titta tillsammans och prata om innehållet."],
  },
  "6-9": {
    title: "6–9 år",
    minutes: 90,
    tips: ["1–2 timmar per dag.", "Ta pauser och variera med fysisk aktivitet."],
  },
  "10-12": {
    title: "10–12 år",
    minutes: 120,
    tips: ["Ca 2 timmar per dag.", "Undvik skärm sista timmen innan läggdags."],
  },
  "13-18": {
    title: "13–18 år",
    minutes: 150,
    tips: [
      "2–3 timmar per dag (utöver skolarbete).",
      "Prioritera sömn, skola och socialt liv offline.",
    ],
  },
};

const toRangeKey = (age: number): RangeKey => {
  if (age <= 2) return "0-2";
  if (age <= 5) return "3-5";
  if (age <= 9) return "6-9";
  if (age <= 12) return "10-12";
  return "13-18";
};

export default function SkarmtidTool() {
  const [age, setAge] = useState<number>(10);

  const key = useMemo(() => toRangeKey(age), [age]);
  const rec = RECOMMENDATIONS[key];

  const hours = Math.floor(rec.minutes / 60);
  const mins = rec.minutes % 60;

  const pretty =
    rec.minutes === 0 ? "0 min" : `${hours ? `${hours} h ` : ""}${mins} min`;

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.25)]">
      <h2 className="text-xl font-semibold text-white">Ange ålder</h2>
      <p className="mt-1 text-sm text-white/60">
        Vi visar en enkel rekommendation per ålder och tips för bättre balans.
      </p>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-end">
        <label className="flex-1">
          <span className="text-sm text-white/70">Ålder (0–18)</span>
          <input
            type="number"
            min={0}
            max={18}
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none ring-0 placeholder:text-white/30 focus:border-white/20"
          />
        </label>

        <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white/80">
          <div className="text-xs text-white/60">Rekommendation</div>
          <div className="text-lg font-semibold">{pretty} / dag</div>
          <div className="text-sm text-white/60">{rec.title}</div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-4">
        <h3 className="text-sm font-semibold text-white/90">Tips</h3>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-white/70">
          {rec.tips.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}