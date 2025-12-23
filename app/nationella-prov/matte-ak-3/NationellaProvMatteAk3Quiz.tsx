"use client";

import { useMemo, useState } from "react";

type Q = {
  q: string;
  choices: string[];
  correct: number;
  explain: string;
};

const QUESTIONS: Q[] = [
  // Taluppfattning / positionssystem
  {
    q: "Vilket tal är störst?",
    choices: ["408", "480", "804", "840"],
    correct: 3,
    explain: "Jämför hundratal först. 840 är störst.",
  },
  {
    q: "Vad är 300 + 50 + 7?",
    choices: ["357", "305", "507", "3507"],
    correct: 0,
    explain: "300 + 50 + 7 = 357.",
  },
  {
    q: "Vilket tal saknas? 6 _ 2 (så att talet blir 602)",
    choices: ["0", "6", "2", "9"],
    correct: 0,
    explain: "602 har 0 i tiotalet: 6 hundratal, 0 tiotal, 2 ental.",
  },

  // Addition / subtraktion
  {
    q: "Amir har 48 kronor. Han får 15 kronor till. Hur mycket har han nu?",
    choices: ["53", "63", "73", "83"],
    correct: 1,
    explain: "48 + 15 = 48 + 10 + 5 = 63.",
  },
  {
    q: "Sara har 70 kronor. Hon köper en bok för 26 kronor. Hur mycket har hon kvar?",
    choices: ["44", "46", "56", "96"],
    correct: 0,
    explain: "70 − 26 = (70 − 20) − 6 = 50 − 6 = 44.",
  },
  {
    q: "Vilket tal saknas? 90 − __ = 58",
    choices: ["22", "28", "32", "38"],
    correct: 2,
    explain: "Räkna baklänges: 58 + 32 = 90, alltså saknas 32.",
  },

  // Multiplikation / division (enkla)
  {
    q: "Du delar 18 äpplen lika mellan 3 barn. Hur många får varje barn?",
    choices: ["5", "6", "7", "9"],
    correct: 1,
    explain: "18 ÷ 3 = 6.",
  },
  {
    q: "Vad är 6 · 4?",
    choices: ["10", "18", "24", "26"],
    correct: 2,
    explain: "6 fyror: 4 + 4 + 4 + 4 + 4 + 4 = 24.",
  },
  {
    q: "En klass har 24 elever. De ska stå 4 i varje rad. Hur många rader blir det?",
    choices: ["4", "5", "6", "8"],
    correct: 2,
    explain: "24 ÷ 4 = 6 rader.",
  },

  // Tid
  {
    q: "Klockan är 09:40. Hur många minuter är det kvar till 10:00?",
    choices: ["10", "15", "20", "40"],
    correct: 2,
    explain: "Från :40 till :60 är det 20 minuter.",
  },
  {
    q: "Vad betyder “halv tre”?",
    choices: ["03:30", "02:30", "02:15", "03:00"],
    correct: 1,
    explain: "Halv tre betyder 2:30 (halvvägs till tre).",
  },

  // Mått / enheter
  {
    q: "Hur många centimeter är 1 meter?",
    choices: ["10", "100", "1000", "60"],
    correct: 1,
    explain: "1 m = 100 cm.",
  },
  {
    q: "En flaska rymmer 2 liter. Hur många deciliter är det?",
    choices: ["2 dl", "10 dl", "20 dl", "200 dl"],
    correct: 2,
    explain: "1 liter = 10 dl. 2 liter = 20 dl.",
  },

  // Geometri (omkrets/figurer)
  {
    q: "En rektangel är 6 cm lång och 3 cm bred. Vilken omkrets har den?",
    choices: ["9 cm", "12 cm", "18 cm", "36 cm"],
    correct: 2,
    explain: "Omkrets = 6 + 3 + 6 + 3 = 18 cm.",
  },
  {
    q: "Vilken figur har 4 hörn?",
    choices: ["Triangel", "Rektangel", "Cirkel", "Oval"],
    correct: 1,
    explain: "Rektangel har 4 hörn.",
  },

  // Mönster / logik
  {
    q: "Mönster: 4, 8, 12, 16, __. Vilket tal kommer sen?",
    choices: ["18", "19", "20", "22"],
    correct: 2,
    explain: "Mönstret ökar med +4. 16 + 4 = 20.",
  },
  {
    q: "Vilket tal ligger mitt emellan 30 och 40?",
    choices: ["33", "35", "37", "45"],
    correct: 1,
    explain: "Mitten är 35.",
  },

  // Statistik (enkelt)
  {
    q: "I en klass gillar 8 elever fotboll, 6 gillar dans och 4 gillar simning. Hur många elever är det totalt?",
    choices: ["12", "16", "18", "20"],
    correct: 2,
    explain: "8 + 6 + 4 = 18.",
  },

  // Bråk (grund)
  {
    q: "En chokladkaka är delad i 8 lika stora bitar. Du äter 3 bitar. Hur stor del har du ätit?",
    choices: ["3/8", "5/8", "1/3", "8/3"],
    correct: 0,
    explain: "Du åt 3 av 8 bitar → 3/8.",
  },
  {
    q: "Vilket är störst?",
    choices: ["1/2", "1/4", "1/8", "1/10"],
    correct: 0,
    explain: "1/2 är störst (större del av en hel).",
  },

  // Textuppgift “minst antal”
  {
    q: "Det går 6 elever i varje bil. Klassen har 23 elever. Hur många bilar behövs minst?",
    choices: ["3", "4", "5", "6"],
    correct: 1,
    explain: "3 bilar räcker till 18. 5 elever kvar → en bil till. Totalt 4.",
  },

  // Blå kulor
  {
    q: "I en burk finns 15 kulor. 6 är röda och resten är blå. Hur många är blå?",
    choices: ["6", "7", "8", "9"],
    correct: 3,
    explain: "15 − 6 = 9 blå.",
  },
];

export default function NationellaProvMatteAk3Quiz() {
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
  }, [score, submitted]);

  const level = useMemo(() => {
    if (!submitted) return "";
    if (pct >= 85) return "Stark nivå ✅";
    if (pct >= 60) return "Bra grund 👍";
    return "Behöver mer träning 💪";
  }, [pct, submitted]);

  function choose(qIndex: number, choiceIndex: number) {
    if (submitted) return; // lås efter rättning (samma känsla som andra)
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
        {QUESTIONS.map((q, idx) => {
          const picked = answers[idx];
          const isCorrect = submitted && picked === q.correct;
          const isWrong = submitted && picked !== null && picked !== q.correct;

          return (
            <div
              key={idx}
              className="rounded-2xl border border-white/10 bg-white/5 p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="text-white font-medium">
                  {idx + 1}. {q.q}
                </div>

                {submitted && (
                  <div
                    className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                      isCorrect
                        ? "bg-emerald-500/20 text-emerald-200 border border-emerald-500/30"
                        : isWrong
                        ? "bg-rose-500/20 text-rose-200 border border-rose-500/30"
                        : "bg-white/10 text-white/70 border border-white/10"
                    }`}
                  >
                    {isCorrect ? "Rätt" : isWrong ? "Fel" : "Ej svar"}
                  </div>
                )}
              </div>

              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {q.choices.map((c, cIdx) => {
                  const selected = picked === cIdx;
                  const correctChoice = submitted && cIdx === q.correct;

                  return (
                    <button
                      key={cIdx}
                      type="button"
                      onClick={() => choose(idx, cIdx)}
                      className={[
                        "rounded-xl border px-4 py-3 text-left text-sm transition",
                        selected
                          ? "border-white/30 bg-white/10 text-white"
                          : "border-white/10 bg-black/20 text-white/80 hover:bg-white/[0.06]",
                        submitted && correctChoice
                          ? "border-emerald-500/40 bg-emerald-500/10"
                          : "",
                        submitted && selected && !correctChoice
                          ? "border-rose-500/40 bg-rose-500/10"
                          : "",
                      ].join(" ")}
                      disabled={submitted}
                    >
                      {c}
                    </button>
                  );
                })}
              </div>

              {submitted && (
                <div className="mt-4 rounded-xl border border-white/10 bg-black/30 p-4">
                  <div className="text-white/80 text-sm">
                    <span className="font-semibold text-white">Facit:</span>{" "}
                    {q.choices[q.correct]}
                  </div>
                  <div className="mt-2 text-white/60 text-sm">{q.explain}</div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Actions – LÄNGST NER ✅ */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
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
                <span className="text-white">{level}</span>
              </p>
            )}
          </div>

          <div className="flex gap-2">
            {!submitted ? (
              <button
                className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-white/90 disabled:opacity-50"
                disabled={answeredCount === 0}
                onClick={() => setSubmitted(true)}
                type="button"
              >
                Rätta
              </button>
            ) : (
              <button
                className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
                onClick={reset}
                type="button"
              >
                Gör om
              </button>
            )}

            <button
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/[0.08]"
              onClick={reset}
              type="button"
            >
              Nollställ
            </button>
          </div>
        </div>

        {submitted && (
          <div className="mt-4 text-sm text-white/60">
            Tips: Läs förklaringarna på de du missade och gör quizet igen.
          </div>
        )}
      </div>
    </div>
  );
}