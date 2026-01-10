"use client";

import { useMemo, useState } from "react";
import AdSlot from "@/components/AdSlot";

export const metadata = {
  title: "Skärmtidsrekommendation – per ålder",
  description: "Interaktiv skärmtidsrekommendation per ålder + tips.",
};

type Row = {
  label: string;
  ageMin: number;
  ageMax: number;
  rec: string;
  tips: string[];
};

const rows: Row[] = [
  {
    label: "0–2 år",
    ageMin: 0,
    ageMax: 2,
    rec: "Helst ingen skärm i vardagen. Videosamtal OK.",
    tips: ["Välj analog lek", "Läs tillsammans", "Skapa rutin utan skärm"],
  },
  {
    label: "3–5 år",
    ageMin: 3,
    ageMax: 5,
    rec: "Kortare stunder, gärna tillsammans med vuxen.",
    tips: ["Förhandsgranska innehåll", "Paus varje 20–30 min", "Skärmfria måltider"],
  },
  {
    label: "6–9 år",
    ageMin: 6,
    ageMax: 9,
    rec: "Begränsa och planera. Prioritera sömn, skola och rörelse.",
    tips: ["Tydliga tider", "Skärmfria läggtider", "Belöna inte med skärm"],
  },
  {
    label: "10–12 år",
    ageMin: 10,
    ageMax: 12,
    rec: "Planera skärmtid + balans. Prata om innehåll och vanor.",
    tips: ["Checka in dagligen", "Notiser av på kvällen", "Skärmfria zoner hemma"],
  },
  {
    label: "13–15 år",
    ageMin: 13,
    ageMax: 15,
    rec: "Fokus på balans, sömn och psykiskt välmående.",
    tips: ["Tydliga regler för natt", "Skärmfria pluggpass", "Aktiviteter IRL"],
  },
  {
    label: "16–18 år",
    ageMin: 16,
    ageMax: 18,
    rec: "Självreglering + mål. Prioritera sömn och studier.",
    tips: ["Pomodoro vid plugg", "Minska doomscroll", "Sömn först"],
  },
];

export default function Page() {
  const [age, setAge] = useState<number>(10);

  const match = useMemo(() => {
    return rows.find((r) => age >= r.ageMin && age <= r.ageMax) ?? rows[0];
  }, [age]);

  return (
    <main className="mx-auto max-w-3xl">
      <h1 className="text-3xl font-bold tracking-tight text-white">Skärmtidsrekommendation</h1>
      <p className="mt-3 text-white/70">
        Välj ålder så får du en snabb rekommendation + praktiska tips.
      </p>

      <div className="mt-6">
      <AdSlot className="mb-6" adSlot="3622343285" />
      </div>

      <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.04] p-6">
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm text-white/70">
            Ålder: <span className="font-semibold text-white">{age} år</span>
          </p>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
            {match.label}
          </span>
        </div>

        <input
          className="mt-4 w-full"
          type="range"
          min={0}
          max={18}
          value={age}
          onChange={(e) => setAge(Number(e.target.value))}
        />

        <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs text-white/60">Rekommendation</p>
          <p className="mt-1 text-white/90">{match.rec}</p>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {match.tips.map((t) => (
            <div key={t} className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/80">
              {t}
            </div>
          ))}
        </div>

        <p className="mt-4 text-xs text-white/50">
          Obs: Detta är en generell guide för vardagsbalans – individuella behov kan variera.
        </p>
      </div>

      <div className="mt-6">
      <AdSlot className="mb-6" adSlot="3622343285" />
      </div>
    </main>
  );
}