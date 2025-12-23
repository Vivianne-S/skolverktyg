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
    q: "En jacka kostar 480 kr. Det är 25% rabatt. Vad blir priset efter rabatten?",
    choices: ["120 kr", "360 kr", "380 kr", "455 kr"],
    correct: 1,
    explain: "25% är en fjärdedel. 480/4 = 120. 480 − 120 = 360 kr.",
  },
  {
    q: "Vilket är störst?",
    choices: ["0,75", "3/4", "0,8", "7/10"],
    correct: 2,
    explain: "0,8 = 8/10. 0,75 = 75/100. 7/10 = 0,7. Störst är 0,8.",
  },
  {
    q: "En bussresa tar 1 timme och 35 minuter. Hur många minuter är det totalt?",
    choices: ["95", "85", "75", "135"],
    correct: 0,
    explain: "1 timme = 60 min. 60 + 35 = 95 min.",
  },
  {
    q: "En rektangel har längden 9 cm och bredden 4 cm. Vad är arean?",
    choices: ["13 cm²", "18 cm²", "36 cm²", "52 cm²"],
    correct: 2,
    explain: "Area = längd × bredd = 9 × 4 = 36 cm².",
  },
  {
    q: "Ett recept är för 4 personer och använder 3 dl mjölk. Hur mycket mjölk behövs för 6 personer?",
    choices: ["4,0 dl", "4,5 dl", "5,0 dl", "6,0 dl"],
    correct: 1,
    explain: "3 dl / 4 pers = 0,75 dl per person. 0,75 × 6 = 4,5 dl.",
  },
  {
    q: "Förenkla bråket 12/18 till enklaste form.",
    choices: ["2/3", "3/2", "6/9", "4/9"],
    correct: 0,
    explain: "Dela täljare och nämnare med 6: 12/18 = 2/3.",
  },
  {
    q: "Ett paket väger 2,5 kg. Hur många gram är det?",
    choices: ["25 g", "250 g", "2500 g", "25000 g"],
    correct: 2,
    explain: "1 kg = 1000 g. 2,5 kg = 2,5 × 1000 = 2500 g.",
  },
  {
    q: "En elev sparar 50 kr per vecka. Hur mycket sparar eleven på 9 veckor?",
    choices: ["350 kr", "400 kr", "450 kr", "500 kr"],
    correct: 2,
    explain: "50 × 9 = 450 kr.",
  },
  {
    q: "En triangel har basen 10 cm och höjden 6 cm. Vad är arean?",
    choices: ["16 cm²", "30 cm²", "60 cm²", "120 cm²"],
    correct: 1,
    explain: "Area triangel = (bas × höjd)/2 = (10 × 6)/2 = 30 cm².",
  },
  {
    q: "Lös: x + 17 = 43",
    choices: ["x = 26", "x = 24", "x = 60", "x = 17"],
    correct: 0,
    explain: "x = 43 − 17 = 26.",
  },
  {
    q: "En vara kostar 200 kr. Momsen är 25%. Vad är priset inklusive moms?",
    choices: ["225 kr", "240 kr", "250 kr", "300 kr"],
    correct: 2,
    explain: "25% av 200 är 50. 200 + 50 = 250 kr.",
  },
  {
    q: "En karta har skalan 1:50 000. 2 cm på kartan motsvarar hur långt i verkligheten?",
    choices: ["100 m", "500 m", "1 km", "10 km"],
    correct: 2,
    explain: "1 cm = 50 000 cm = 500 m. 2 cm = 1000 m = 1 km.",
  },
];

export default function NationellaProvMatteAk6Quiz() {
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
              NP-träning – Matte åk 6 (övningsprov)
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