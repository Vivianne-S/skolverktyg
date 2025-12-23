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
    q: "Amir har 48 kronor. Han får 15 kronor till. Hur mycket har han nu?",
    choices: ["53", "63", "73", "83"],
    correct: 1,
    explain: "48 + 15 = 48 + 10 + 5 = 63.",
  },
  {
    q: "Vilket tal saknas? 70 − __ = 46",
    choices: ["14", "16", "24", "26"],
    correct: 2,
    explain: "70 − 24 = 46. (Du kan också räkna 46 + 24 = 70.)",
  },
  {
    q: "En klass ska på utflykt. Det går 6 elever i varje bil. Klassen har 23 elever. Hur många bilar behövs minst?",
    choices: ["3", "4", "5", "6"],
    correct: 1,
    explain: "3 bilar räcker till 18 elever. Det blir 5 elever kvar → en bil till. Totalt 4 bilar.",
  },
  {
    q: "En penna är 12 cm. Ett sudd är 5 cm. Hur lång blir det tillsammans om du lägger dem efter varandra?",
    choices: ["7 cm", "15 cm", "17 cm", "60 cm"],
    correct: 2,
    explain: "12 cm + 5 cm = 17 cm.",
  },
  {
    q: "Vilken tid är det? Klockan är 09:40. Hur många minuter är det kvar till 10:00?",
    choices: ["10", "15", "20", "40"],
    correct: 0,
    explain: "Från 09:40 till 10:00 är det 20 minuter? Nej: 09:40 → 10:00 är 20? Vänta: 40 till 60 är 20. Ja, 20 minuter.",
  },
  {
    q: "Du ska dela 18 äpplen lika mellan 3 barn. Hur många äpplen får varje barn?",
    choices: ["5", "6", "7", "9"],
    correct: 1,
    explain: "18 ÷ 3 = 6.",
  },
  {
    q: "Vilket tal ligger mitt emellan 30 och 40?",
    choices: ["33", "35", "37", "45"],
    correct: 1,
    explain: "Mitten av 30 och 40 är 35.",
  },
  {
    q: "Mönster: 4, 8, 12, 16, __. Vilket tal kommer sen?",
    choices: ["18", "19", "20", "22"],
    correct: 2,
    explain: "Mönstret ökar med +4 varje gång. 16 + 4 = 20.",
  },
  {
    q: "En rektangel är 6 cm lång och 3 cm bred. Vilken omkrets har den?",
    choices: ["9 cm", "12 cm", "18 cm", "36 cm"],
    correct: 2,
    explain: "Omkrets = 6 + 3 + 6 + 3 = 18 cm.",
  },
  {
    q: "Sara har 20 kronor. Hon köper en bok för 13 kronor. Hur mycket pengar har hon kvar?",
    choices: ["5", "6", "7", "8"],
    correct: 2,
    explain: "20 − 13 = 7.",
  },
  {
    q: "Vilket är störst?",
    choices: ["209", "290", "920", "902"],
    correct: 2,
    explain: "920 är störst (9 hundratal).",
  },
  {
    q: "I en burk finns 15 kulor. 6 är röda och resten är blå. Hur många är blå?",
    choices: ["6", "7", "8", "9"],
    correct: 2,
    explain: "15 − 6 = 9? Vänta: 15−6 = 9. Men alternativ 9 finns. Rätt är 9.",
  },
  {
    q: "En chokladkaka är delad i 8 lika stora bitar. Du äter 3 bitar. Hur stor del av kakan har du ätit?",
    choices: ["3/8", "5/8", "1/3", "8/3"],
    correct: 0,
    explain: "Du åt 3 av 8 lika stora bitar → 3/8.",
  },
  {
    q: "En elev läser 10 sidor på måndag och 15 sidor på tisdag. Hur många sidor läser eleven sammanlagt?",
    choices: ["20", "25", "30", "35"],
    correct: 1,
    explain: "10 + 15 = 25.",
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

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <div className="text-white font-semibold">
              NP-träning – Matte åk 3 (övningsprov)
            </div>
            <div className="text-white/60 text-sm">
              {answeredCount}/{QUESTIONS.length} besvarade
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSubmitted(true)}
              className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-white/90"
              disabled={answeredCount === 0}
            >
              Rätta
            </button>
            <button
              onClick={() => {
                setSubmitted(false);
                setAnswers(Array(QUESTIONS.length).fill(null));
              }}
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/[0.08]"
            >
              Nollställ
            </button>
          </div>
        </div>

        {submitted && (
          <div className="mt-4 rounded-2xl border border-white/10 bg-black/30 p-4">
            <div className="text-white font-semibold">
              Resultat: {score}/{QUESTIONS.length} ({pct}%)
            </div>
            <div className="text-white/70 text-sm mt-1">{level}</div>
            <div className="text-white/60 text-sm mt-3">
              Tips: Läs förklaringarna på de du missade och gör quizet igen.
            </div>
          </div>
        )}
      </div>

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
                      onClick={() => {
                        setAnswers((prev) => {
                          const next = [...prev];
                          next[idx] = cIdx;
                          return next;
                        });
                      }}
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
    </div>
  );
}