"use client";

import { useMemo, useState } from "react";

type Q = {
  q: string;
  choices: string[];
  correct: number;
  explain: string;
};

const QUESTIONS: Q[] = [
  {
    q: "Förenkla uttrycket: 3(2x − 4) + 5x",
    choices: ["6x − 12 + 5x", "6x − 12", "11x − 12", "11x + 12"],
    correct: 2,
    explain:
      "Distribuera 3: 3·2x=6x och 3·(−4)=−12. Sen 6x+5x=11x → 11x−12.",
  },
  {
    q: "Lös ekvationen: 2x + 7 = 19",
    choices: ["x = 6", "x = 7", "x = 8", "x = 9"],
    correct: 2,
    explain: "2x = 19−7 = 12 → x = 12/2 = 6.",
  },
  {
    q: "Vad är 15% av 240?",
    choices: ["24", "36", "48", "60"],
    correct: 1,
    explain: "10% av 240 är 24 och 5% är 12. 24+12 = 36.",
  },
  {
    q: "En vara kostar 500 kr och sänks med 20%. Vad blir nya priset?",
    choices: ["400 kr", "420 kr", "450 kr", "480 kr"],
    correct: 0,
    explain: "20% av 500 är 100. 500−100 = 400.",
  },
  {
    q: "Omkretsen av en cirkel är ungefär 31,4 cm. Vilken radie har cirkeln? (π≈3,14)",
    choices: ["r ≈ 2 cm", "r ≈ 3 cm", "r ≈ 5 cm", "r ≈ 10 cm"],
    correct: 2,
    explain: "Omkrets C=2πr → r = C/(2π) = 31,4/(6,28) ≈ 5.",
  },
  {
    q: "En rätvinklig triangel har kateter 6 cm och 8 cm. Hur lång är hypotenusan?",
    choices: ["10 cm", "12 cm", "14 cm", "16 cm"],
    correct: 0,
    explain: "Pythagoras: √(6²+8²)=√(36+64)=√100=10.",
  },
  {
    q: "Funktionen f(x)=2x+3. Vad är f(−2)?",
    choices: ["−1", "−2", "1", "7"],
    correct: 0,
    explain: "f(−2)=2·(−2)+3=−4+3=−1.",
  },
  {
    q: "Vilken är lutningen (k) i linjen y = −3x + 4?",
    choices: ["−3", "3", "4", "−4"],
    correct: 0,
    explain: "I formen y=kx+m är k koefficienten framför x → k=−3.",
  },
  {
    q: "Beräkna: (3/4) ÷ (3/8)",
    choices: ["1/2", "2", "3/2", "8/12"],
    correct: 1,
    explain:
      "Dividera med ett bråk = multiplicera med inversen: (3/4)·(8/3)=8/4=2.",
  },
  {
    q: "En låda har volym 360 cm³. Basytan är 60 cm². Hur hög är lådan?",
    choices: ["3 cm", "4 cm", "5 cm", "6 cm"],
    correct: 3,
    explain: "Volym = basyta · höjd → höjd = 360/60 = 6.",
  },
];

export default function MatteAk9Quiz() {
  const [answers, setAnswers] = useState<(number | null)[]>(
    () => Array(QUESTIONS.length).fill(null)
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
      if (a === QUESTIONS[i].correct) total++;
    }
    return total;
  }, [answers]);

  const pct = useMemo(() => {
    if (!submitted) return 0;
    return Math.round((score / QUESTIONS.length) * 100);
  }, [submitted, score]);

  const levelText = useMemo(() => {
    if (!submitted) return "";
    if (pct >= 80) return "Stark nivå ✅";
    if (pct >= 50) return "Bra grund 👍";
    return "Kör en runda till 💪";
  }, [submitted, pct]);

  function choose(qIndex: number, choiceIndex: number) {
    if (submitted) return;
    setAnswers((prev) => {
      const next = [...prev];
      next[qIndex] = choiceIndex;
      return next;
    });
  }

  function reset() {
    setAnswers(Array(QUESTIONS.length).fill(null));
    setSubmitted(false);
  }

  return (
    <div className="space-y-4">
      {/* Questions */}
      <div className="space-y-4">
        {QUESTIONS.map((q, i) => {
          const userAnswer = answers[i];
          const isCorrect = submitted && userAnswer === q.correct;
          const isWrong =
            submitted && userAnswer !== null && userAnswer !== q.correct;

          return (
            <div
              key={i}
              className="rounded-2xl border border-white/10 bg-white/5 p-4"
            >
              <p className="text-sm font-semibold text-white">
                {i + 1}. {q.q}
              </p>

              <div className="mt-3 grid gap-2">
                {q.choices.map((c, ci) => {
                  const selected = userAnswer === ci;
                  const correctChoice = submitted && ci === q.correct;
                  const wrongChoice = submitted && selected && ci !== q.correct;

                  return (
                    <button
                      key={ci}
                      type="button"
                      onClick={() => choose(i, ci)}
                      disabled={submitted}
                      className={
                        "text-left rounded-xl px-3 py-2 text-sm border transition " +
                        (selected
                          ? "border-white/30 bg-white/10"
                          : "border-white/10 bg-white/5 hover:bg-white/10") +
                        (correctChoice ? " ring-1 ring-emerald-400/50" : "") +
                        (wrongChoice ? " ring-1 ring-rose-400/50" : "")
                      }
                    >
                      <span className="text-white/90">{c}</span>
                      {submitted && correctChoice && (
                        <span className="ml-2 text-xs text-emerald-300">
                          (rätt)
                        </span>
                      )}
                      {submitted && wrongChoice && (
                        <span className="ml-2 text-xs text-rose-300">(fel)</span>
                      )}
                    </button>
                  );
                })}
              </div>

              {submitted && (
                <div className="mt-3 rounded-xl border border-white/10 bg-black/20 p-3">
                  <p className="text-xs text-white/70">
                    {isCorrect && "✅ "}
                    {isWrong && "❌ "}
                    <span className="text-white/80">Förklaring:</span>{" "}
                    {q.explain}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Actions – längst ner */}
      <div className="mt-2 rounded-2xl border border-white/10 bg-white/5 p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="text-sm text-white/70">
              Besvarade: <span className="text-white">{answeredCount}</span> /{" "}
              {QUESTIONS.length}
            </p>

            {submitted && (
              <p className="mt-1 text-sm text-white/70">
                Resultat: <span className="text-white">{score}</span> /{" "}
                {QUESTIONS.length} ({pct}%) ·{" "}
                <span className="text-white">{levelText}</span>
              </p>
            )}
          </div>

          <div className="flex gap-2">
            {!submitted ? (
              <button
                type="button"
                className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-white/90 disabled:opacity-50"
                disabled={answeredCount !== QUESTIONS.length}
                onClick={() => setSubmitted(true)}
              >
                Rätta
              </button>
            ) : (
              <button
                type="button"
                className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
                onClick={reset}
              >
                Gör om
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}