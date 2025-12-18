"use client";

import { useMemo, useState } from "react";

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

type Rec = {
  headline: string;
  recommended: string;
  notes: string[];
  tips: string[];
};

function getRecommendation(age: number, hoursSchool?: number): Rec {
  // Generella riktlinjer (inte “medicinska råd”)
  if (age < 2) {
    return {
      headline: "0–1 år",
      recommended: "Undvik skärm i vardagen (förutom videosamtal).",
      notes: [
        "Små barn utvecklas bäst genom lek, närvaro och sömn.",
        "Om skärm används: korta stunder och tillsammans med vuxen.",
      ],
      tips: ["Prioritera sömn & rutiner", "Skapa skärmfria zoner (t.ex. sovrum)"],
    };
  }

  if (age < 6) {
    return {
      headline: "2–5 år",
      recommended: "Sikta på ca 1 timme/dag av “kvalitetsinnehåll”.",
      notes: [
        "Välj lugnt, pedagogiskt innehåll.",
        "Titta/lek gärna tillsammans och prata om vad ni ser.",
      ],
      tips: [
        "Skärm efter aktivitet (inte före)",
        "Tydliga tider: före/efter middag",
        "Ingen skärm sista timmen före läggdags",
      ],
    };
  }

  if (age < 13) {
    const school = clamp(hoursSchool ?? 0, 0, 8);
    const target = school >= 4 ? "1–2 timmar/dag" : "2 timmar/dag";
    return {
      headline: "6–12 år",
      recommended: `Sikta på ${target} fritidsskärm.`,
      notes: [
        "Fokusera på balans: skola, rörelse, sömn, kompisar och skärm.",
        "Hög skärm i skolan → håll fritidsskärmen lägre.",
      ],
      tips: [
        "Skärmfria tider: läxor + måltider",
        "Använd timer/paus var 30–40 min",
        "Byt kvällsskärm mot ljudbok eller läsning ibland",
      ],
    };
  }

  if (age < 18) {
    return {
      headline: "13–17 år",
      recommended: "Sikta på balans – ofta 2–3 timmar/dag fritidsskärm är rimligt.",
      notes: [
        "Sömn är nyckeln: om skärm påverkar sömn → dra ner eller flytta tidigare.",
        "Sociala medier blir lätt “oändligt” – använd tidsgränser.",
      ],
      tips: [
        "Skärmfria sista 60–90 min före sömn",
        "Stäng av notiser för fokus",
        "Planera ‘skärmkvällar’ istället för varje kväll",
      ],
    };
  }

  return {
    headline: "18+",
    recommended: "För vuxna handlar det mest om mål, fokus och sömn.",
    notes: ["Om skärm stör sömn/fokus – sätt gränser och rutiner."],
    tips: ["Skärmfria block", "Notiser av", "Sömn först"],
  };
}

export default function ScreenTimeTool() {
  const [age, setAge] = useState<number>(10);
  const [schoolScreenHours, setSchoolScreenHours] = useState<number>(3);

  const rec = useMemo(
    () => getRecommendation(age, schoolScreenHours),
    [age, schoolScreenHours]
  );

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.25)]">
      <h2 className="text-xl font-semibold text-white/90">Välj ålder</h2>
      <p className="mt-1 text-sm text-white/60">
        Detta är en snabb, generell guide för att hitta en rimlig nivå.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <label className="text-sm text-white/70">Ålder</label>
          <div className="mt-2 flex items-center gap-3">
            <input
              type="range"
              min={0}
              max={18}
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="w-full"
            />
            <span className="w-10 text-right font-semibold">{age}</span>
          </div>
          <p className="mt-2 text-xs text-white/45">
            Tips: håll dig till en rutin i 1–2 veckor och justera efter sömn & mående.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <label className="text-sm text-white/70">Skärmtid i skolan (timmar/dag)</label>
          <div className="mt-2 flex items-center gap-3">
            <input
              type="range"
              min={0}
              max={8}
              value={schoolScreenHours}
              onChange={(e) => setSchoolScreenHours(Number(e.target.value))}
              className="w-full"
            />
            <span className="w-10 text-right font-semibold">{schoolScreenHours}</span>
          </div>
          <p className="mt-2 text-xs text-white/45">
            Påverkar främst 6–12 år (balans mellan skola och fritid).
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <p className="text-sm text-white/60">Åldersgrupp</p>
        <p className="mt-1 text-2xl font-bold text-white">{rec.headline}</p>

        <div className="mt-4 rounded-2xl border border-white/10 bg-black/25 p-4">
          <p className="text-sm text-white/60">Rekommendation</p>
          <p className="mt-1 text-lg font-semibold text-white">{rec.recommended}</p>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <p className="font-semibold text-white/90">Att tänka på</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-white/65">
              {rec.notes.map((n, i) => (
                <li key={i}>{n}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <p className="font-semibold text-white/90">Snabba tips</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-white/65">
              {rec.tips.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-4 text-xs text-white/45">
          Obs: Om skärm påverkar sömn, skola eller humör tydligt – sänk mängden och skapa skärmfria tider.
        </p>
      </div>
    </div>
  );
}
