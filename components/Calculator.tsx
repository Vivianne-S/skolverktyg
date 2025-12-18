"use client";

import { useMemo, useState } from "react";

const GRADE_POINTS: Record<string, number> = {
  A: 20,
  B: 17.5,
  C: 15,
  D: 12.5,
  E: 10,
  F: 0,
};

function normalize(v: string) {
  const x = v.trim().toUpperCase();
  if (!x) return "";
  if (!["A", "B", "C", "D", "E", "F"].includes(x)) return x; // låt UI visa att det är fel
  return x;
}

export default function Calculator() {
  const [grades, setGrades] = useState<string[]>([""]);

  const parsed = useMemo(() => {
    const pts = grades
      .map((g) => GRADE_POINTS[normalize(g)] ?? null)
      .filter((p): p is number => p !== null)
      .sort((a, b) => b - a)
      .slice(0, 16);

    const merit = pts.reduce((a, b) => a + b, 0);
    const snitt = pts.length ? (merit / pts.length).toFixed(2) : "–";
    return { pts, merit, snitt };
  }, [grades]);

  const invalidCount = useMemo(() => {
    const ok = new Set(["", "A", "B", "C", "D", "E", "F"]);
    return grades.map(normalize).filter((g) => !ok.has(g)).length;
  }, [grades]);

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_30px_120px_rgba(0,0,0,0.35)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-white/95">Ange dina betyg</h2>
          <p className="mt-1 text-sm text-white/65">
            Skriv ett betyg per rad (A–F). Endast de 16 bästa räknas in i meritvärdet.
          </p>
        </div>

        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
          Max 320p
        </span>
      </div>

      {invalidCount > 0 && (
        <div className="mt-4 rounded-2xl border border-amber-400/20 bg-amber-400/10 px-4 py-3 text-sm text-amber-100">
          Du har {invalidCount} rad(er) med ogiltigt betyg. Giltiga är A–F.
        </div>
      )}

      <div className="mt-5 space-y-2">
        {grades.map((grade, i) => {
          const v = normalize(grade);
          const isInvalid = v !== "" && !["A", "B", "C", "D", "E", "F"].includes(v);
          return (
            <input
              key={i}
              value={grade}
              maxLength={2}
              placeholder="A–F"
              onChange={(e) => {
                const copy = [...grades];
                copy[i] = e.target.value;
                setGrades(copy);
              }}
              className={[
                "w-full rounded-2xl border px-4 py-3 text-white outline-none",
                "bg-black/20 border-white/10 focus:border-white/25",
                isInvalid ? "border-amber-400/50" : "",
              ].join(" ")}
            />
          );
        })}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={() => setGrades([...grades, ""])}
          className="rounded-2xl bg-white text-black px-4 py-2 text-sm font-semibold hover:opacity-90"
        >
          Lägg till ämne
        </button>

        <button
          onClick={() => setGrades([""])}
          className="rounded-2xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/85 hover:bg-white/10"
        >
          Rensa
        </button>

        <button
          onClick={() => {
            if (grades.length > 1) setGrades(grades.slice(0, -1));
          }}
          className="rounded-2xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/85 hover:bg-white/10 disabled:opacity-40"
          disabled={grades.length <= 1}
        >
          Ta bort sista
        </button>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs text-white/60">Inmatade (giltiga)</p>
          <p className="mt-1 text-2xl font-semibold">{parsed.pts.length}</p>
          <p className="mt-1 text-xs text-white/55">(Vi räknar max 16)</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs text-white/60">Meritvärde</p>
          <p className="mt-1 text-2xl font-semibold">{parsed.merit}</p>
          <p className="mt-1 text-xs text-white/55">/ 320</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs text-white/60">Snittbetyg</p>
          <p className="mt-1 text-2xl font-semibold">{parsed.snitt}</p>
          <p className="mt-1 text-xs text-white/55">på valda betyg</p>
        </div>
      </div>
    </div>
  );
}