"use client";

import { useMemo, useState } from "react";

type Q = { text: string; answer: number; hint?: string };

function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateAk6Question(): Q {
  const type = randInt(1, 4);

  if (type === 1) {
    // division with remainder (answer as integer quotient)
    const b = randInt(2, 12);
    const q = randInt(2, 12);
    const r = randInt(0, b - 1);
    const a = b * q + r;
    return {
      text: `${a} ÷ ${b} = ? (skriv heltalskvoten)`,
      answer: q,
      hint: "Heltalskvot = hur många hela gånger b ryms i a.",
    };
  }

  if (type === 2) {
    // percent of number (whole answer)
    const base = randInt(20, 300);
    const perc = [10, 20, 25, 50, 75][randInt(0, 4)];
    return {
      text: `${perc}% av ${base} = ?`,
      answer: (base * perc) / 100,
      hint: "10% = dela med 10. 25% = en fjärdedel. 50% = hälften.",
    };
  }

  if (type === 3) {
    // fraction of number
    const denom = [2, 3, 4, 5, 6, 8, 10][randInt(0, 6)];
    const numer = randInt(1, denom - 1);
    const mult = randInt(2, 12);
    const base = denom * mult;
    return {
      text: `${numer}/${denom} av ${base} = ?`,
      answer: (base * numer) / denom,
      hint: "Dela med nämnaren, multiplicera med täljaren.",
    };
  }

  // mixed operations
  const a = randInt(10, 80);
  const b = randInt(2, 12);
  const c = randInt(10, 80);
  return {
    text: `${a} + ${b} × ${c} = ?`,
    answer: a + b * c,
    hint: "Prioritet: multiplikation före addition.",
  };
}

function buildQuiz(count = 10): Q[] {
  return Array.from({ length: count }, () => generateAk6Question());
}

export default function MathQuizAk6() {
  const [quiz, setQuiz] = useState<Q[]>(() => buildQuiz(10));
  const [index, setIndex] = useState(0);
  const [value, setValue] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [answers, setAnswers] = useState<{ given: string; correct: boolean }[]>(
    []
  );

  const q = quiz[index];
  const finished = index >= quiz.length;

  const score = useMemo(() => answers.filter((a) => a.correct).length, [answers]);

  function submit() {
    if (!q) return;
    const num = Number(value.replace(",", "."));
    const correct = Number.isFinite(num) && num === q.answer;

    setAnswers((prev) => [...prev, { given: value, correct }]);
    setValue("");
    setShowHint(false);
    setIndex((i) => i + 1);
  }

  function restart() {
    setQuiz(buildQuiz(10));
    setIndex(0);
    setValue("");
    setShowHint(false);
    setAnswers([]);
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.25)]">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-semibold text-white/90">Matte-test (åk 6)</h2>
        <div className="text-sm text-white/60">
          {finished ? "Klart" : `Fråga ${index + 1} / ${quiz.length}`}
        </div>
      </div>

      {!finished ? (
        <>
          <div className="mt-6 rounded-2xl border border-white/10 bg-black/25 p-5">
            <p className="text-sm text-white/60">Uppgift</p>
            <p className="mt-1 text-3xl font-bold text-white">{q.text}</p>

            <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto]">
              <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && submit()}
                inputMode="numeric"
                placeholder="Skriv ditt svar…"
                className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white placeholder:text-white/30 outline-none focus:border-white/20 focus:bg-white/[0.06]"
              />
              <button
                onClick={submit}
                className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black hover:opacity-90"
              >
                Svara
              </button>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <button
                onClick={() => setShowHint((v) => !v)}
                className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/80 hover:bg-white/[0.06]"
              >
                {showHint ? "Dölj hint" : "Visa hint"}
              </button>

              <button
                onClick={restart}
                className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/80 hover:bg-white/[0.06]"
              >
                Starta om
              </button>
            </div>

            {showHint && (
              <p className="mt-3 text-sm text-white/65">💡 {q.hint}</p>
            )}
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-xs text-white/50">Rätt</p>
              <p className="mt-1 text-2xl font-bold text-white">{score}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-xs text-white/50">Fel</p>
              <p className="mt-1 text-2xl font-bold text-white">
                {answers.length - score}
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-xs text-white/50">Tränar</p>
              <p className="mt-1 text-sm text-white/70">
                procent • bråk • division • prioritet
              </p>
            </div>
          </div>
        </>
      ) : (
        <div className="mt-6 rounded-2xl border border-white/10 bg-black/25 p-6">
          <p className="text-sm text-white/60">Resultat</p>
          <p className="mt-1 text-3xl font-bold text-white">
            {score} / {quiz.length} rätt
          </p>
          <p className="mt-3 text-white/65">
            Kör igen för nya frågor och träna lite varje dag.
          </p>

          <button
            onClick={restart}
            className="mt-5 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black hover:opacity-90"
          >
            Nytt test
          </button>
        </div>
      )}
    </div>
  );
}