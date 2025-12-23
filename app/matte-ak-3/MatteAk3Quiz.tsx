"use client";

import { useMemo, useState } from "react";

type Q = {
  id: string;
  q: string;
  choices: string[];
  correct: number;
  explain: string;
  skillTag: string;
};

const QUESTIONS: Q[] = [
  {
    id: "ak3-1",
    q: "Vad är 300 + 40 + 6?",
    choices: ["346", "436", "406", "360"],
    correct: 0,
    explain: "Hundratal + tiotal + ental: 300 + 40 + 6 = 346.",
    skillTag: "Taluppfattning",
  },
  {
    id: "ak3-2",
    q: "Vad är 72 − 28?",
    choices: ["44", "54", "40", "48"],
    correct: 0,
    explain: "72 − 20 = 52, 52 − 8 = 44.",
    skillTag: "Subtraktion",
  },
  {
    id: "ak3-3",
    q: "Vilket tal är störst?",
    choices: ["508", "580", "558", "585"],
    correct: 3,
    explain: "Jämför hundratal (5), sedan tiotal och ental: 585 är störst.",
    skillTag: "Jämföra tal",
  },
  {
    id: "ak3-4",
    q: "Vad är 6 · 4?",
    choices: ["10", "18", "24", "26"],
    correct: 2,
    explain: "6 fyror: 4+4+4+4+4+4 = 24.",
    skillTag: "Multiplikation",
  },
  {
    id: "ak3-5",
    q: "Vilken tid visar klockan? (Halv tre)",
    choices: ["03:30", "02:30", "02:15", "03:00"],
    correct: 1,
    explain: "Halv tre betyder 2:30 (halvvägs till tre).",
    skillTag: "Klockan",
  },
  {
    id: "ak3-6",
    q: "Hur många centimeter är 1 meter?",
    choices: ["10", "100", "1000", "60"],
    correct: 1,
    explain: "1 meter = 100 centimeter.",
    skillTag: "Måttenheter",
  },
  {
    id: "ak3-7",
    q: "Vad är 5/10 förenklat?",
    choices: ["1/2", "2/5", "5/2", "1/5"],
    correct: 0,
    explain: "Dela täljare och nämnare med 5: 5/10 = 1/2.",
    skillTag: "Bråk (grund)",
  },
  {
    id: "ak3-8",
    q: "Vilken figur har 4 hörn?",
    choices: ["Triangel", "Rektangel", "Cirkel", "Pentagon (5 hörn)"],
    correct: 1,
    explain: "En rektangel har 4 hörn.",
    skillTag: "Geometri",
  },
  {
    id: "ak3-9",
    q: "Vad är 90 + 10?",
    choices: ["100", "90", "110", "10"],
    correct: 0,
    explain: "90 + 10 = 100 (ett helt hundratal).",
    skillTag: "Addition",
  },
  {
    id: "ak3-10",
    q: "Vilket är rätt: 3 hundratal + 2 tiotal + 9 ental?",
    choices: ["329", "239", "392", "923"],
    correct: 0,
    explain: "3 hundratal (300) + 2 tiotal (20) + 9 ental (9) = 329.",
    skillTag: "Positionssystem",
  },
];

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function MatteAk3Quiz() {
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(QUESTIONS.length).fill(null)
  );
  const [submitted, setSubmitted] = useState(false);

  const answeredCount = useMemo(
    () => answers.filter((a) => a !== null).length,
    [answers]
  );

  const score = useMemo(() => {
    let total = 0;
  
    for (let i = 0; i < answers.length; i++) {
      const a = answers[i];
      if (a === null) continue;
      if (a === QUESTIONS[i].correct) {
        total++;
      }
    }
  
    return total;
  }, [answers]);

  const pct = useMemo(() => {
    if (!submitted) return 0;
    return Math.round((score / QUESTIONS.length) * 100);
  }, [score, submitted]);

  const level = useMemo(() => {
    if (!submitted) return "";
    if (pct >= 80) return "Stark nivå ✅";
    if (pct >= 50) return "Bra grund 👍";
    return "Behöver träning 💪";
  }, [pct, submitted]);

  const missesBySkill = useMemo(() => {
    if (!submitted) return [] as { skill: string; count: number }[];

    const map = new Map<string, number>();
    QUESTIONS.forEach((q, i) => {
      const a = answers[i];
      if (a === null) return;
      if (a !== q.correct) {
        map.set(q.skillTag, (map.get(q.skillTag) ?? 0) + 1);
      }
    });

    return Array.from(map.entries())
      .map(([skill, count]) => ({ skill, count }))
      .sort((a, b) => b.count - a.count);
  }, [answers, submitted]);

  const progress = useMemo(() => {
    const raw = Math.round((answeredCount / QUESTIONS.length) * 100);
    return clamp(raw, 0, 100);
  }, [answeredCount]);

  const canSubmit = answeredCount > 0;

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.25)]">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-white/90">Quiz: Matte åk 3</h2>
          <p className="mt-1 text-sm text-white/60">
            Svara på frågorna och få resultat + facit direkt.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-2 text-sm text-white/70">
          {answeredCount}/{QUESTIONS.length} svarade
        </div>
      </div>

      <div className="mt-4">
        <div className="h-2 w-full overflow-hidden rounded-full border border-white/10 bg-white/[0.03]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-indigo-400/60 via-white/60 to-emerald-300/60"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-2 text-xs text-white/50">Framsteg: {progress}%</p>
      </div>

      <div className="mt-6 space-y-5">
        {QUESTIONS.map((q, i) => {
          const selected = answers[i];
          const isAnswered = selected !== null;

          return (
            <div key={q.id} className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-medium text-white/90">
                  {i + 1}. {q.q}
                </p>

                <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                  {q.skillTag}
                </span>
              </div>

              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {q.choices.map((c, idx) => {
                  const isSelected = selected === idx;
                  const isCorrect = idx === q.correct;

                  const base = "rounded-2xl border px-4 py-3 text-left text-sm transition";
                  const normal = "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]";
                  const selectedCls = "border-white/25 bg-white/[0.08]";
                  const wrongCls = "border-rose-400/40";
                  const correctCls = "border-emerald-400/40";

                  const stateCls = submitted
                    ? isCorrect
                      ? correctCls
                      : isSelected
                      ? wrongCls
                      : ""
                    : isSelected
                    ? selectedCls
                    : "";

                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        const copy = [...answers];
                        copy[i] = idx;
                        setAnswers(copy);
                      }}
                      className={[base, normal, stateCls].join(" ")}
                    >
                      {c}
                    </button>
                  );
                })}
              </div>

              {submitted && isAnswered && (
                <div className="mt-3 rounded-2xl border border-white/10 bg-black/20 p-3">
                  <p className="text-sm text-white/70">
                    <span className="font-semibold text-white/85">Facit:</span>{" "}
                    {q.choices[q.correct]}
                  </p>
                  <p className="mt-1 text-sm text-white/60">
                    <span className="font-semibold text-white/75">Förklaring:</span>{" "}
                    {q.explain}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <button
          type="button"
          disabled={!canSubmit}
          onClick={() => setSubmitted(true)}
          className={[
            "rounded-2xl px-4 py-2 text-sm font-semibold",
            canSubmit
              ? "bg-white text-black hover:opacity-90"
              : "cursor-not-allowed bg-white/20 text-white/50",
          ].join(" ")}
        >
          Visa resultat
        </button>

        <button
          type="button"
          onClick={() => {
            setAnswers(Array(QUESTIONS.length).fill(null));
            setSubmitted(false);
          }}
          className="rounded-2xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/85 hover:bg-white/10"
        >
          Nollställ
        </button>

        {submitted && (
          <div className="ml-auto rounded-2xl border border-white/10 bg-black/20 px-4 py-2 text-sm text-white/80">
            Poäng: <span className="font-semibold text-white">{score}</span> /{" "}
            {QUESTIONS.length} • {pct}% •{" "}
            <span className="text-white/70">{level}</span>
          </div>
        )}
      </div>

      {submitted && (
        <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="font-semibold text-white/90">Tips för nästa steg</p>

          <div className="mt-2 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
              <p className="text-sm font-semibold text-white/85">Träna detta</p>
              {missesBySkill.length === 0 ? (
                <p className="mt-1 text-sm text-white/60">
                  Snyggt! Du hade inga fel (eller inga svar). Testa igen och håll nivån.
                </p>
              ) : (
                <ul className="mt-2 space-y-1 text-sm text-white/65">
                  {missesBySkill.slice(0, 4).map((m) => (
                    <li key={m.skill}>• {m.skill} ({m.count} st)</li>
                  ))}
                </ul>
              )}
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
              <p className="text-sm font-semibold text-white/85">Snabb plan (5 min/dag)</p>
              <ul className="mt-2 space-y-1 text-sm text-white/65">
                <li>• 2 min: 10 additions-tal</li>
                <li>• 2 min: 10 subtraktioner</li>
                <li>• 1 min: gångertabell (2/5/10)</li>
              </ul>
            </div>
          </div>

          <p className="mt-3 text-xs text-white/50">
            Tips: Låt eleven svara högt och förklara hur den tänker – det ger snabbast utveckling.
          </p>
        </div>
      )}
    </div>
  );
}