"use client";

import { useMemo, useState } from "react";

type Q = {
  q: string;
  choices: string[];
  correct: number;
  explain: string;
};

const QUESTIONS: Q[] = [
  // ===== Procent =====
  {
    q: "En jacka kostar 480 kr. Det är 25% rabatt. Vad blir priset efter rabatten?",
    choices: ["120 kr", "360 kr", "400 kr", "455 kr"],
    correct: 1,
    explain: "25% är en fjärdedel. 480/4 = 120. 480 − 120 = 360 kr.",
  },
  {
    q: "Du får 20% rabatt på en vara som kostar 250 kr. Hur mycket rabatt får du?",
    choices: ["25 kr", "40 kr", "50 kr", "60 kr"],
    correct: 2,
    explain: "10% av 250 är 25 kr. 20% är dubbelt: 50 kr.",
  },
  {
    q: "Ett pris höjs från 300 kr till 345 kr. Hur stor är ökningen i procent?",
    choices: ["10%", "12%", "15%", "20%"],
    correct: 2,
    explain: "Ökningen är 345−300 = 45. 45/300 = 0,15 = 15%.",
  },

  // ===== Bråk / Decimaltal =====
  {
    q: "Vilket är störst?",
    choices: ["0,75", "3/4", "0,8", "7/10"],
    correct: 2,
    explain: "0,8 = 8/10 = 0,80. 0,75 = 3/4. 7/10 = 0,70. Störst är 0,8.",
  },
  {
    q: "Förenkla bråket 12/18 till enklaste form.",
    choices: ["2/3", "3/2", "6/9", "4/9"],
    correct: 0,
    explain: "Dela täljare och nämnare med 6: 12/18 = 2/3.",
  },
  {
    q: "3/5 + 1/5 = ?",
    choices: ["4/10", "4/5", "3/25", "1/5"],
    correct: 1,
    explain: "Samma nämnare: (3+1)/5 = 4/5.",
  },
  {
    q: "0,4 som bråk i enklaste form?",
    choices: ["4/100", "2/5", "4/5", "1/4"],
    correct: 1,
    explain: "0,4 = 4/10. Förenkla (÷2) → 2/5.",
  },

  // ===== Tid / Enheter =====
  {
    q: "En bussresa tar 1 timme och 35 minuter. Hur många minuter är det totalt?",
    choices: ["95", "85", "75", "135"],
    correct: 0,
    explain: "1 timme = 60 min. 60 + 35 = 95 min.",
  },
  {
    q: "Ett paket väger 2,5 kg. Hur många gram är det?",
    choices: ["25 g", "250 g", "2500 g", "25000 g"],
    correct: 2,
    explain: "1 kg = 1000 g. 2,5 kg = 2,5 × 1000 = 2500 g.",
  },
  {
    q: "Hur många liter är 750 ml?",
    choices: ["0,075 l", "0,75 l", "7,5 l", "75 l"],
    correct: 1,
    explain: "1000 ml = 1 l. 750 ml = 750/1000 = 0,75 l.",
  },

  // ===== Geometri (area/omkrets/volym) =====
  {
    q: "En rektangel har längden 9 cm och bredden 4 cm. Vad är arean?",
    choices: ["13 cm²", "18 cm²", "36 cm²", "52 cm²"],
    correct: 2,
    explain: "Area = längd × bredd = 9 × 4 = 36 cm².",
  },
  {
    q: "En kvadrat har sidan 7 cm. Vad är omkretsen?",
    choices: ["14 cm", "21 cm", "28 cm", "49 cm"],
    correct: 2,
    explain: "Omkrets kvadrat = 4 · sidan = 4 · 7 = 28 cm.",
  },
  {
    q: "En triangel har basen 10 cm och höjden 6 cm. Vad är arean?",
    choices: ["16 cm²", "30 cm²", "60 cm²", "120 cm²"],
    correct: 1,
    explain: "Area triangel = (bas × höjd)/2 = (10 × 6)/2 = 30 cm².",
  },
  {
    q: "Ett rätblock är 5 cm långt, 4 cm brett och 3 cm högt. Volymen är?",
    choices: ["12 cm³", "20 cm³", "60 cm³", "120 cm³"],
    correct: 2,
    explain: "Volym = 5 × 4 × 3 = 60 cm³.",
  },

  // ===== Skala =====
  {
    q: "En karta har skalan 1:50 000. 2 cm på kartan motsvarar hur långt i verkligheten?",
    choices: ["100 m", "500 m", "1 km", "10 km"],
    correct: 2,
    explain: "1 cm = 50 000 cm = 500 m. 2 cm = 1000 m = 1 km.",
  },
  {
    q: "Skala 1:10 000. Avståndet på kartan är 3,5 cm. Hur långt är det i verkligheten?",
    choices: ["35 m", "350 m", "3,5 km", "35 km"],
    correct: 1,
    explain: "1 cm = 10 000 cm = 100 m. 3,5 cm = 3,5×100 m = 350 m.",
  },

  // ===== Enkel algebra / ekvation =====
  {
    q: "Lös: x + 17 = 43",
    choices: ["x = 26", "x = 24", "x = 60", "x = 17"],
    correct: 0,
    explain: "x = 43 − 17 = 26.",
  },
  {
    q: "Lös: 3x = 27",
    choices: ["x = 6", "x = 7", "x = 8", "x = 9"],
    correct: 3,
    explain: "Dela båda sidor med 3: x = 27/3 = 9.",
  },
  {
    q: "Vilket uttryck betyder '5 mer än dubbla talet x'?",
    choices: ["5x + 2", "2x + 5", "x + 10", "2(x + 5)"],
    correct: 1,
    explain: "Dubbla x är 2x, och 5 mer än det är 2x + 5.",
  },

  // ===== Problemlösning / proportionalitet =====
  {
    q: "Ett recept är för 4 personer och använder 3 dl mjölk. Hur mycket behövs för 6 personer?",
    choices: ["4,0 dl", "4,5 dl", "5,0 dl", "6,0 dl"],
    correct: 1,
    explain: "3 dl / 4 = 0,75 dl per person. 0,75 × 6 = 4,5 dl.",
  },
  {
    q: "En elev sparar 50 kr per vecka. Hur mycket sparar eleven på 9 veckor?",
    choices: ["350 kr", "400 kr", "450 kr", "500 kr"],
    correct: 2,
    explain: "50 × 9 = 450 kr.",
  },
  {
    q: "En biobiljett kostar 120 kr. 3 biljetter kostar?",
    choices: ["240 kr", "300 kr", "360 kr", "420 kr"],
    correct: 2,
    explain: "120 × 3 = 360 kr.",
  },

  // ===== Statistik =====
  {
    q: "Medianen av talen 3, 6, 7, 10, 14 är…",
    choices: ["6", "7", "10", "14"],
    correct: 1,
    explain: "Median = mittersta talet i sorterad lista: 3,6,7,10,14 → 7.",
  },
  {
    q: "Typvärdet i 2, 4, 4, 5, 7, 7, 7 är…",
    choices: ["2", "4", "5", "7"],
    correct: 3,
    explain: "Typvärde = vanligast. 7 förekommer flest gånger.",
  },

  // ===== Sannolikhet =====
  {
    q: "En påse har 5 röda och 3 blå kulor. Sannolikheten att dra en blå är…",
    choices: ["3/5", "3/8", "5/8", "1/3"],
    correct: 1,
    explain: "Totalt 8 kulor. Blå = 3 → 3/8.",
  },
];

export default function NationellaProvMatteAk6Quiz() {
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
    if (pct >= 85) return "Stark nivå ✅";
    if (pct >= 60) return "Bra grund 👍";
    return "Behöver mer träning 💪";
  }, [pct, show]);

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.25)]">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-white/90">
            NP-träning: Matte åk 6
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

      {/* Actions – längst ner */}
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
          <p className="font-semibold text-white/90">Tips för att förbättra</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Procent: träna 10% / 5% / 1% och räkna därifrån.</li>
            <li>Bråk: gör samma nämnare och förenkla.</li>
            <li>Geometri: börja alltid med rätt formel.</li>
            <li>Skala: skriv om 1 cm → verkligt avstånd, sen multiplicera.</li>
            <li>Statistik: kom ihåg median/typvärde/medel.</li>
          </ul>
        </div>
      )}
    </div>
  );
}