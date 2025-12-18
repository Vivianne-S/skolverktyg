"use client";

import { useMemo, useState } from "react";

type Q = { q: string; choices: string[]; correct: number; explain: string };

const QUESTIONS: Q[] = [
  { q: "25% av 200 = ?", choices: ["25", "40", "50", "80"], correct: 2, explain: "25% är en fjärdedel. 200/4 = 50." },
  { q: "3/4 + 1/4 = ?", choices: ["1/2", "1", "3/8", "4/8"], correct: 1, explain: "Samma nämnare: (3+1)/4 = 4/4 = 1." },
  { q: "7 · 8 = ?", choices: ["54", "56", "58", "64"], correct: 1, explain: "7 gånger 8 är 56." },
  { q: "12 ÷ 0,5 = ?", choices: ["6", "12", "24", "120"], correct: 2, explain: "Dela med 0,5 är samma som att dubbla: 12*2=24." },
  { q: "Omkretsen av en kvadrat med sidan 6 cm?", choices: ["12", "18", "24", "36"], correct: 2, explain: "Omkrets = 4*6 = 24." },
  { q: "x + 9 = 17. Vad är x?", choices: ["6", "7", "8", "9"], correct: 2, explain: "x = 17 − 9 = 8." },
  { q: "0,2 som bråk i enklaste form?", choices: ["1/2", "1/4", "1/5", "2/5"], correct: 2, explain: "0,2 = 2/10 = 1/5." },
  { q: "Vilket är störst?", choices: ["0,8", "0,75", "3/4", "0,7"], correct: 0, explain: "0,8 är störst (0,75 = 3/4)." },
  { q: "En triangel har bas 10 cm och höjd 6 cm. Area?", choices: ["20", "30", "40", "60"], correct: 1, explain: "Area = (bas*h)/2 = (10*6)/2 = 30." },
  { q: "15% av 1000 = ?", choices: ["15", "150", "105", "115"], correct: 1, explain: "10% = 100, 5% = 50 ⇒ 15% = 150." },
];

export default function MatteAk6Quiz() {
  const [answers, setAnswers] = useState<(number | null)[]>(Array(QUESTIONS.length).fill(null));
  const [show, setShow] = useState(false);

  const score = useMemo(() => answers.reduce((acc, a, i) => acc + (a === QUESTIONS[i].correct ? 1 : 0), 0), [answers]);

  const level = useMemo(() => {
    if (!show) return null;
    const pct = (score / QUESTIONS.length) * 100;
    if (pct >= 80) return "Stark nivå ✅";
    if (pct >= 50) return "Bra grund 👍";
    return "Behöver träning 💪";
  }, [score, show]);

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
      <div className="space-y-5">
        {QUESTIONS.map((q, i) => (
          <div key={i} className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <p className="font-medium text-white/90">
              {i + 1}. {q.q}
            </p>

            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {q.choices.map((c, idx) => {
                const selected = answers[i] === idx;
                const isCorrect = idx === q.correct;

                return (
                  <button
                    key={idx}
                    onClick={() => {
                      const copy = [...answers];
                      copy[i] = idx;
                      setAnswers(copy);
                    }}
                    className={[
                      "text-left rounded-2xl border px-4 py-3 text-sm transition",
                      "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]",
                      selected ? "border-white/25 bg-white/[0.08]" : "",
                      show && selected && !isCorrect ? "border-rose-400/40" : "",
                      show && isCorrect ? "border-emerald-400/40" : "",
                    ].join(" ")}
                  >
                    {c}
                  </button>
                );
              })}
            </div>

            {show && (
              <p className="mt-3 text-sm text-white/65">
                <span className="text-white/85 font-semibold">Förklaring:</span> {q.explain}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <button
          onClick={() => setShow(true)}
          className="rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-black hover:opacity-90"
        >
          Visa resultat
        </button>
        <button
          onClick={() => {
            setAnswers(Array(QUESTIONS.length).fill(null));
            setShow(false);
          }}
          className="rounded-2xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/85 hover:bg-white/10"
        >
          Nollställ
        </button>

        {show && (
          <div className="ml-auto rounded-2xl border border-white/10 bg-black/20 px-4 py-2 text-sm text-white/80">
            Poäng: <span className="font-semibold text-white">{score}</span> / {QUESTIONS.length}
            {level ? <span className="ml-2 text-white/70">• {level}</span> : null}
          </div>
        )}
      </div>

      {show && (
        <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/70">
          <p className="font-semibold text-white/90">Tips för att förbättra</p>
          <ul className="mt-2 list-disc pl-5 space-y-1">
            <li>Träna procent: 10%/5%/1% som byggklossar.</li>
            <li>Bråk: gemensam nämnare + förenkla.</li>
            <li>Geometri: area/omkrets-formler.</li>
            <li>Ekvationer: flytta termer stegvis.</li>
          </ul>
        </div>
      )}
    </div>
  );
}