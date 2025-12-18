"use client";

import { useMemo, useState } from "react";

type Q = {
  text: string;
  answer: number;
  hint?: string;
};

function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateAk3Question(): Q {
  const type = randInt(1, 3);

  if (type === 1) {
    // addition 0–100
    const a = randInt(0, 60);
    const b = randInt(0, 60);
    return { text: `${a} + ${b} = ?`, answer: a + b, hint: "Räkna tior + ental." };
  }

  if (type === 2) {
    // subtraction with non-negative result
    const a = randInt(20, 100);
    const b = randInt(0, a);
    return { text: `${a} − ${b} = ?`, answer: a - b, hint: "Tänk: vad saknas från b till a?" };
  }

  // multiplication 0–10
  const a = randInt(0, 10);
  const b = randInt(0, 10);
  return { text: `${a} × ${b} = ?`, answer: a * b, hint: "Tänk tabeller." };
}

function buildQuiz(count = 10): Q[] {
  return Array.from({ length: count }, () => generateAk3Question());
}

export default function MathQuizAk3() {
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
        <h2 className="text-xl font-semibold text-white/90">Matte-test (åk 3)</h2>
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
                onKeyDown={(e) => {
                  if (e.key === "Enter") submit();
                }}
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
              <p className="mt-3 text-sm text-white/65">
                💡 {q.hint ?? "Ta det lugnt och räkna steg för steg."}
              </p>
            )}
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-xs text-white/50">Rätt hittills</p>
              <p className="mt-1 text-2xl font-bold text-white">{score}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-xs text-white/50">Fel hittills</p>
              <p className="mt-1 text-2xl font-bold text-white">
                {answers.length - score}
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-xs text-white/50">Tips</p>
              <p className="mt-1 text-sm text-white/70">
                Pausa 30 sek och andas om det känns stressigt.
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
            Bra! Kör testet igen för att se nya uppgifter och träna på fler områden.
          </p>

          <button
            onClick={restart}
            className="mt-5 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black hover:opacity-90"
          >
            Nytt test
          </button>

          <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <p className="text-sm font-semibold text-white/90">Snabb tolkning</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-white/65">
              <li>8–10 rätt: Mycket bra – fortsätt hålla igång!</li>
              <li>5–7 rätt: Bra – repetera tabeller och subtraktion.</li>
              <li>0–4 rätt: Ta det lugnt – kör 5 min/dag och bygg grunden.</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}