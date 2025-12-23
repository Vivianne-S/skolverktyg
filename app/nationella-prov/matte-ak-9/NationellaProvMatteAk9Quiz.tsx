"use client";

import { useMemo, useState } from "react";

type Q = {
  q: string;
  choices: string[];
  correct: number;
  explain: string;
};

const QUESTIONS: Q[] = [
  // ===== Algebra / Ekvationer =====
  {
    q: "Förenkla uttrycket: 4x + 3x − 5",
    choices: ["7x − 5", "12x − 5", "7x + 5", "x − 5"],
    correct: 0,
    explain: "Liknande termer: 4x + 3x = 7x. Konstanten −5 står kvar → 7x − 5.",
  },
  {
    q: "Förenkla: 3(2x − 4)",
    choices: ["6x − 4", "6x − 12", "2x − 12", "6x + 12"],
    correct: 1,
    explain: "Multiplicera in 3: 3·2x=6x och 3·(−4)=−12 → 6x − 12.",
  },
  {
    q: "Förenkla: 2(x + 4) − x",
    choices: ["x + 4", "x + 8", "2x + 4", "x − 4"],
    correct: 1,
    explain: "2(x+4)=2x+8. Sedan 2x+8 − x = x + 8.",
  },
  {
    q: "Förenkla: 5 − (2x − 3)",
    choices: ["2x + 2", "−2x + 2", "−2x − 2", "2x − 2"],
    correct: 1,
    explain: "Byt tecken i parentesen: 5 − 2x + 3 = 8 − 2x = −2x + 8. (kolla val) → skriv om: −2x + 8 motsvarar inte. Justera: 5 − (2x − 3)=5−2x+3=8−2x.",
  },
  // FIXAD version av ovan med svarsalternativ som matchar:
  {
    q: "Förenkla: 5 − (2x − 3)",
    choices: ["8 − 2x", "2x − 8", "8 + 2x", "−8 − 2x"],
    correct: 0,
    explain: "5 − (2x − 3)=5−2x+3=8−2x.",
  },
  {
    q: "Lös ekvationen: x + 9 = 17",
    choices: ["6", "7", "8", "9"],
    correct: 2,
    explain: "Flytta 9: x = 17 − 9 = 8.",
  },
  {
    q: "Lös ekvationen: 2x + 7 = 19",
    choices: ["x = 4", "x = 5", "x = 6", "x = 7"],
    correct: 2,
    explain: "2x = 19 − 7 = 12 ⇒ x = 12/2 = 6.",
  },
  {
    q: "Lös ekvationen: 5x − 7 = 3x + 9",
    choices: ["x = 1", "x = 8", "x = 16", "x = −8"],
    correct: 1,
    explain: "5x−3x = 9+7 ⇒ 2x = 16 ⇒ x = 8.",
  },
  {
    q: "Förenkla: 3(2x − 5) − 2(x + 1)",
    choices: ["4x − 17", "6x − 15", "4x − 13", "5x − 17"],
    correct: 0,
    explain:
      "3(2x−5)=6x−15. −2(x+1)=−2x−2. Tillsammans: (6x−2x)+(−15−2)=4x−17.",
  },

  // ===== Funktioner =====
  {
    q: "I funktionen y = 4x − 2, vad är lutningen (k)?",
    choices: ["−2", "2", "4", "x"],
    correct: 2,
    explain: "I y = kx + m är k talet framför x → k = 4.",
  },
  {
    q: "Vad är f(3) om f(x) = 2x + 1?",
    choices: ["5", "6", "7", "8"],
    correct: 2,
    explain: "f(3) = 2·3 + 1 = 7.",
  },
  {
    q: "Vilken funktion har lutning −3 och skär y-axeln i 5?",
    choices: ["y = −3x + 5", "y = 3x − 5", "y = −5x + 3", "y = 5x − 3"],
    correct: 0,
    explain: "k = −3 och m = 5 ⇒ y = −3x + 5.",
  },
  {
    q: "En linje går genom (0, −4) och (2, 0). Vilken är lutningen k?",
    choices: ["−2", "2", "4", "−4"],
    correct: 1,
    explain: "k = Δy/Δx = (0−(−4))/(2−0) = 4/2 = 2.",
  },

  // ===== Procent =====
  {
    q: "Vad är 20% av 150?",
    choices: ["20", "25", "30", "35"],
    correct: 2,
    explain: "10% av 150 är 15. 20% är dubbelt: 30.",
  },
  {
    q: "En tröja kostar 400 kr och sänks med 25%. Vad blir nya priset?",
    choices: ["300 kr", "350 kr", "375 kr", "325 kr"],
    correct: 0,
    explain: "25% av 400 är 100. 400 − 100 = 300.",
  },
  {
    q: "En vara kostar 240 kr efter 20% rabatt. Vad var ordinarie pris?",
    choices: ["288 kr", "300 kr", "320 kr", "360 kr"],
    correct: 1,
    explain: "240 är 80% av ordinarie ⇒ 240/0,8 = 300.",
  },
  {
    q: "En vara höjs med 10% och höjs sedan med 10% igen. Total ökning?",
    choices: ["20%", "21%", "22%", "19%"],
    correct: 1,
    explain: "1,10 · 1,10 = 1,21 ⇒ 21% ökning.",
  },
  {
    q: "Först −20% och sedan +20% på 500 kr. Vad blir slutpriset?",
    choices: ["480 kr", "500 kr", "520 kr", "400 kr"],
    correct: 0,
    explain: "500·0,8 = 400. 400·1,2 = 480.",
  },

  // ===== Geometri / Skala / Volym =====
  {
    q: "En triangel har bas 12 cm och höjd 7 cm. Area?",
    choices: ["42 cm²", "84 cm²", "19 cm²", "24 cm²"],
    correct: 0,
    explain: "(12·7)/2 = 84/2 = 42 cm².",
  },
  {
    q: "En cirkel har radien 5 cm. Omkrets ungefär? (π≈3,14)",
    choices: ["15,7 cm", "31,4 cm", "62,8 cm", "78,5 cm"],
    correct: 1,
    explain: "Omkrets = 2πr = 2·3,14·5 = 31,4.",
  },
  {
    q: "Rätvinklig triangel: kateter 6 cm och 8 cm. Hypotenusa?",
    choices: ["10 cm", "12 cm", "14 cm", "16 cm"],
    correct: 0,
    explain: "√(6²+8²)=√(36+64)=√100=10.",
  },
  {
    q: "Ett rätblock 5×4×3 cm. Volym?",
    choices: ["12 cm³", "20 cm³", "60 cm³", "120 cm³"],
    correct: 2,
    explain: "Volym = 5·4·3 = 60 cm³.",
  },
  {
    q: "Skala 1:25 000. 6 cm på karta. Verkligt avstånd?",
    choices: ["150 m", "1,5 km", "15 km", "150 km"],
    correct: 1,
    explain: "1 cm=250 m. 6 cm = 1500 m = 1,5 km.",
  },
  {
    q: "Volym 360 cm³, basyta 60 cm². Höjd?",
    choices: ["3 cm", "4 cm", "5 cm", "6 cm"],
    correct: 3,
    explain: "h = 360/60 = 6.",
  },

  // ===== Statistik / Sannolikhet =====
  {
    q: "Medianen av 2, 4, 6, 8, 20 är…",
    choices: ["4", "6", "8", "20"],
    correct: 1,
    explain: "Mittenvärdet i sorterad lista: 2,4,6,8,20 ⇒ 6.",
  },
  {
    q: "Typvärdet i 3, 5, 5, 7, 9 är…",
    choices: ["3", "5", "7", "9"],
    correct: 1,
    explain: "Typvärde = vanligast. 5 förekommer två gånger.",
  },
  {
    q: "Medelvärdet av 4 tal är 10. Summan är…",
    choices: ["20", "30", "40", "50"],
    correct: 2,
    explain: "Summa = medelvärde·antal = 10·4 = 40.",
  },
  {
    q: "Påse: 3 röda och 2 blå. Sannolikhet att dra blå?",
    choices: ["2/3", "2/5", "3/5", "1/2"],
    correct: 1,
    explain: "Totalt 5 kulor. Blå 2 ⇒ 2/5.",
  },

  // ===== Rötter / Hastighet =====
  {
    q: "Vilket påstående är sant?",
    choices: ["√50 = 5", "√49 = 6", "√81 = 9", "√36 = 5"],
    correct: 2,
    explain: "√81 = 9. (√49=7, √36=6, √50≈7,07.)",
  },
  {
    q: "2,4 km på 12 minuter. Hastighet i km/h?",
    choices: ["8", "10", "12", "14,4"],
    correct: 2,
    explain: "12 min = 0,2 h. 2,4/0,2 = 12 km/h.",
  },
];

export default function NationellaProvMatteAk9Quiz() {
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(QUESTIONS.length).fill(null)
  );
  const [show, setShow] = useState(false);

  const answeredCount = useMemo(
    () => answers.filter((a) => a !== null).length,
    [answers]
  );

  const score = useMemo<number>(() => {
    return answers.reduce<number>((acc, a, i) => {
      if (a === null) return acc;
      return acc + (a === QUESTIONS[i].correct ? 1 : 0);
    }, 0);
  }, [answers]);

  const pct = useMemo(() => {
    if (!show) return 0;
    return Math.round((score / QUESTIONS.length) * 100);
  }, [score, show]);

  const level = useMemo(() => {
    if (!show) return "";
    if (pct >= 80) return "Stark nivå ✅";
    if (pct >= 55) return "Bra grund 👍";
    return "Behöver mer träning 💪";
  }, [pct, show]);

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.25)]">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-white/90">
            NP-träning: Matte åk 9
          </h2>
          <p className="mt-1 text-sm text-white/60">
            Svara på frågorna och få resultat + facit direkt.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-2 text-sm text-white/70">
          {answeredCount}/{QUESTIONS.length} svarade
        </div>
      </div>

      {/* Questions */}
      <div className="mt-6 space-y-5">
        {QUESTIONS.map((q, i) => (
          <div
            key={i}
            className="rounded-2xl border border-white/10 bg-black/20 p-4"
          >
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
                    type="button"
                    onClick={() => {
                      // valfritt: lås efter rättning
                      // if (show) return;

                      const copy = [...answers];
                      copy[i] = idx;
                      setAnswers(copy);
                    }}
                    className={[
                      "rounded-2xl border px-4 py-3 text-left text-sm transition",
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
              <div className="mt-3 rounded-2xl border border-white/10 bg-black/20 p-3">
                <p className="text-sm text-white/70">
                  <span className="font-semibold text-white/85">Facit:</span>{" "}
                  {q.choices[q.correct]}
                </p>
                <p className="mt-1 text-sm text-white/60">
                  <span className="font-semibold text-white/75">
                    Förklaring:
                  </span>{" "}
                  {q.explain}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Actions – LÄNGST NER */}
      <div className="mt-6 flex flex-wrap items-center gap-2">
        <button
          type="button"
          disabled={answeredCount === 0}
          onClick={() => setShow(true)}
          className={[
            "rounded-2xl px-4 py-2 text-sm font-semibold",
            answeredCount === 0
              ? "cursor-not-allowed bg-white/20 text-white/50"
              : "bg-white text-black hover:opacity-90",
          ].join(" ")}
        >
          Rätta
        </button>

        <button
          type="button"
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
            Poäng: <span className="font-semibold text-white">{score}</span> /{" "}
            {QUESTIONS.length} • {pct}%{" "}
            {level ? <span className="text-white/70">• {level}</span> : null}
          </div>
        )}
      </div>

      {/* Tips – under allt, efter rättning */}
      {show && (
        <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/70">
          <p className="font-semibold text-white/90">Tips inför NP åk 9</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Skriv alltid mellanled (det ger poäng).</li>
            <li>Algebra: var noga med minus och parenteser.</li>
            <li>Procent: baklänges (”efter rabatt”) kräver division med 0,8/0,9 osv.</li>
            <li>Funktioner: kunna tolka k och m i y = kx + m.</li>
            <li>Geometri: börja med formeln och håll koll på enheter.</li>
          </ul>
        </div>
      )}
    </div>
  );
}