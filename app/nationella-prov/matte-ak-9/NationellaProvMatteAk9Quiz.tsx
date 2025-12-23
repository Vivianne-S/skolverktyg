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
    q: "Förenkla uttrycket: 3(2x − 5) − 2(x + 1)",
    choices: ["4x − 17", "6x − 15", "4x − 13", "5x − 17"],
    correct: 0,
    explain:
      "3(2x−5)=6x−15. −2(x+1)=−2x−2. Tillsammans: (6x−2x)+(−15−2)=4x−17.",
  },
  {
    q: "Lös ekvationen: 5x − 7 = 3x + 9",
    choices: ["x = 1", "x = 8", "x = 16", "x = −8"],
    correct: 1,
    explain: "5x−3x = 9+7 ⇒ 2x = 16 ⇒ x = 8.",
  },
  {
    q: "En vara kostar 240 kr efter 20% rabatt. Vad var ordinarie pris?",
    choices: ["288 kr", "300 kr", "320 kr", "360 kr"],
    correct: 1,
    explain:
      "Efter 20% rabatt är priset 80% av ordinarie. 240 / 0,8 = 300.",
  },
  {
    q: "En triangel har basen 12 cm och höjden 7 cm. Vilken area har triangeln?",
    choices: ["42 cm²", "84 cm²", "19 cm²", "24 cm²"],
    correct: 0,
    explain: "Area = (bas × höjd)/2 = (12×7)/2 = 42 cm².",
  },
  {
    q: "En cylinder har radien 3 cm. Vilken är ungefärlig omkrets av basen? (π ≈ 3,14)",
    choices: ["9,42 cm", "18,84 cm", "28,26 cm", "56,52 cm"],
    correct: 1,
    explain: "Omkrets = 2πr = 2×3,14×3 ≈ 18,84 cm.",
  },
  {
    q: "Skala 1:25 000. Avståndet på kartan är 6 cm. Hur långt är det i verkligheten?",
    choices: ["150 m", "1,5 km", "15 km", "150 km"],
    correct: 1,
    explain:
      "1 cm = 25 000 cm = 250 m. 6 cm = 6×250 m = 1500 m = 1,5 km.",
  },
  {
    q: "En klass skriver ett prov. Medelvärdet är 12, medianen 13 och typvärdet 14. Vad betyder typvärde?",
    choices: [
      "Det mittersta värdet",
      "Det vanligaste värdet",
      "Summan delat med antal",
      "Skillnaden mellan max och min",
    ],
    correct: 1,
    explain: "Typvärde = det värde som förekommer flest gånger.",
  },
  {
    q: "Ett rätblock har måtten 5 cm, 4 cm och 3 cm. Vilken volym har rätblocket?",
    choices: ["12 cm³", "20 cm³", "60 cm³", "120 cm³"],
    correct: 2,
    explain: "Volym = 5×4×3 = 60 cm³.",
  },
  {
    q: "En linje har ekvationen y = 2x − 3. Vad är y när x = 4?",
    choices: ["5", "8", "11", "−5"],
    correct: 0,
    explain: "y = 2·4 − 3 = 8 − 3 = 5.",
  },
  {
    q: "Sannolikhet: En påse har 3 röda och 2 blå kulor. Du drar en kula. Vad är sannolikheten att den är blå?",
    choices: ["2/3", "2/5", "3/5", "1/2"],
    correct: 1,
    explain: "Totalt 5 kulor. Blå = 2. Sannolikhet = 2/5.",
  },
  {
    q: "Vilket påstående är sant?",
    choices: [
      "√50 = 5",
      "√49 = 6",
      "√81 = 9",
      "√36 = 5",
    ],
    correct: 2,
    explain: "√81 = 9. (De andra är fel: √49=7, √36=6, √50≈7,07.)",
  },
  {
    q: "En elev springer 2,4 km på 12 minuter. Vilken är hastigheten i km/h?",
    choices: ["8 km/h", "10 km/h", "12 km/h", "14,4 km/h"],
    correct: 2,
    explain:
      "12 min = 0,2 h. Hastighet = sträcka/tid = 2,4/0,2 = 12 km/h.",
  },
];

export default function NationellaProvMatteAk9Quiz() {
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
    if (pct >= 80) return "Stark nivå ✅";
    if (pct >= 55) return "Bra grund 👍";
    return "Behöver mer träning 💪";
  }, [pct, submitted]);

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <div className="text-white font-semibold">
              NP-träning – Matte åk 9 (övningsprov)
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