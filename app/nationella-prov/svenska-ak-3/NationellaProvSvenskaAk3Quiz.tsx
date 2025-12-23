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
    q: "Vilken mening är skriven rätt med stor bokstav och punkt?",
    choices: ["jag gillar glass", "Jag gillar glass", "jag gillar glass.", "Jag gillar glass."],
    correct: 3,
    explain: "En mening ska börja med stor bokstav och sluta med punkt.",
  },
  {
    q: "Vilket ord är ett verb (något man gör)?",
    choices: ["springer", "blå", "hund", "snäll"],
    correct: 0,
    explain: "Verb beskriver handlingar, t.ex. springer, äter, skriver.",
  },
  {
    q: "Vilket ord är ett substantiv (en sak eller ett namn)?",
    choices: ["glad", "stol", "springa", "snabbt"],
    correct: 1,
    explain: "Substantiv är saker/namn, t.ex. stol, boll, Sara.",
  },
  {
    q: "Vilket ord är ett adjektiv (beskriver hur något är)?",
    choices: ["hoppar", "cykel", "röd", "snabbt"],
    correct: 2,
    explain: "Adjektiv beskriver, t.ex. röd, stor, snäll.",
  },
  {
    q: "Vilken mening har frågetecken?",
    choices: ["Kom hit nu.", "Kom hit nu!", "Kom hit nu?", "Kom hit nu,"],
    correct: 2,
    explain: "Frågor slutar med frågetecken: ?",
  },
  {
    q: "Vilket ord är rätt stavat?",
    choices: ["skjorta", "skorta", "schjorta", "skjårta"],
    correct: 0,
    explain: "Rätt stavning är skjorta.",
  },
  {
    q: "Vilket ord är rätt stavat?",
    choices: ["känna", "kännå", "kenna", "kännae"],
    correct: 0,
    explain: "Rätt stavning är känna.",
  },
  {
    q: "Vilket ord betyder samma som 'glad'?",
    choices: ["arg", "lycklig", "trött", "hungrig"],
    correct: 1,
    explain: "Lycklig är en synonym till glad.",
  },
  {
    q: "Vilket ord betyder motsatsen till 'stor'?",
    choices: ["lång", "bred", "liten", "tung"],
    correct: 2,
    explain: "Motsats till stor är liten.",
  },
  {
    q: "Vilket av orden är ett sammansatt ord?",
    choices: ["glass", "fotboll", "sol", "bok"],
    correct: 1,
    explain: "Fotboll är sammansatt av fot + boll.",
  },
  {
    q: "Vilket ord ska stå först i meningen? '__ går till skolan.'",
    choices: ["jag", "gick", "skolan", "till"],
    correct: 0,
    explain: "En mening börjar ofta med subjekt: Jag går till skolan.",
  },
  {
    q: "Vilket ord passar bäst? 'Katten ___ mjölk.'",
    choices: ["äter", "dricker", "sover", "springer"],
    correct: 1,
    explain: "Man dricker mjölk.",
  },
  {
    q: "Vilket är rätt ordning för en berättelse?",
    choices: ["Slut – Mitten – Början", "Början – Mitten – Slut", "Mitten – Slut – Början", "Mitten – Början – Slut"],
    correct: 1,
    explain: "En berättelse har oftast början, mitten och slut.",
  },
  {
    q: "Vilket ord är rätt: 'De/Det'?",
    choices: ["Det är många barn i klassen.", "De är en stol.", "Det är två hundar.", "De är ett äpple."],
    correct: 0,
    explain: "'Det' används ofta om en sak eller som 'det är'. 'De' används om flera: 'De är snälla'.",
  },
  {
    q: "Vilken mening är mest tydlig (hel mening)?",
    choices: ["I parken.", "Springer fort.", "Jag springer fort.", "Fort springer."],
    correct: 2,
    explain: "En hel mening har vem + vad: Jag (vem) springer (vad).",
  },
  {
    q: "Vilket ord passar bäst? 'Jag ___ en bok.'",
    choices: ["läser", "dricker", "kör", "sover"],
    correct: 0,
    explain: "Man läser en bok.",
  },
  {
    q: "Vilken mening är skriven med komma på ett bra sätt?",
    choices: [
      "Jag köpte äpplen bananer och päron.",
      "Jag köpte äpplen, bananer och päron.",
      "Jag köpte, äpplen bananer och päron.",
      "Jag, köpte äpplen bananer och päron.",
    ],
    correct: 1,
    explain: "Komma kan användas i uppräkning: äpplen, bananer och päron.",
  },
  {
    q: "Vilken instruktion är tydligast?",
    choices: [
      "Gör den där saken.",
      "Skriv en mening om din helg och avsluta med punkt.",
      "Skriv något.",
      "Gör klart.",
    ],
    correct: 1,
    explain: "Tydliga instruktioner säger exakt vad man ska göra.",
  },
  {
    q: "Vilken mening passar bäst som rubrik till en text om hundar?",
    choices: ["Jag var glad igår.", "Hundar – våra bästa vänner", "Det regnar idag.", "Vi leker ute."],
    correct: 1,
    explain: "En rubrik berättar vad texten handlar om. 'Hundar – våra bästa vänner' passar.",
  },
  {
    q: "Vad är en synonym till 'snäll'?",
    choices: ["elak", "vänlig", "arg", "hög"],
    correct: 1,
    explain: "Vänlig betyder ungefär samma som snäll.",
  },
  {
    q: "Vilket ord är motsats till 'glad'?",
    choices: ["ledsen", "lycklig", "snäll", "rolig"],
    correct: 0,
    explain: "Motsatsord (antonym) till glad är ledsen.",
  },
  {
    q: "Vilket ord är rätt böjt? 'Två ___ leker.'",
    choices: ["katt", "katter", "katts", "katta"],
    correct: 1,
    explain: "Plural av katt är katter: en katt – två katter.",
  },
  {
    q: "Vilken mening är en uppmaning?",
    choices: ["Jag går hem.", "Gå hem!", "Han gick hem.", "Vi ska gå hem."],
    correct: 1,
    explain: "En uppmaning säger åt någon att göra något: 'Gå hem!'",
  },
  {
    q: "Vilket ord är ett namn (egennamn) och ska ha stor bokstav?",
    choices: ["skola", "sara", "hund", "glass"],
    correct: 1,
    explain: "Namn (egennamn) skrivs med stor bokstav: Sara.",
  },
  {
    q: "Vad ska en berättelse minst ha för att kännas som en berättelse?",
    choices: ["En instruktion", "En handling (något som händer)", "Bara fakta", "Bara en rubrik"],
    correct: 1,
    explain: "En berättelse behöver en handling: något som händer.",
  },
];

export default function NationellaProvSvenskaAk3Quiz() {
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(QUESTIONS.length).fill(null)
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
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.25)]">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-white/90">
            NP-träning: Svenska åk 3
          </h2>
          <p className="mt-1 text-sm text-white/60">
            Svara på frågorna och rätta för facit + förklaringar direkt.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-2 text-sm text-white/70">
          {answeredCount}/{QUESTIONS.length} svarade
        </div>
      </div>

      {/* Questions */}
      <div className="mt-6 space-y-5">
        {QUESTIONS.map((q, i) => {
          const picked = answers[i];
          const isAnswered = picked !== null;

          return (
            <div
              key={i}
              className="rounded-2xl border border-white/10 bg-black/20 p-4"
            >
              <p className="font-medium text-white/90">
                {i + 1}. {q.q}
              </p>

              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {q.choices.map((c, idx) => {
                  const selected = picked === idx;
                  const isCorrect = idx === q.correct;

                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        const copy = [...answers];
                        copy[i] = idx;
                        setAnswers(copy);
                      }}
                      className={[
                        "rounded-2xl border px-4 py-3 text-left text-sm transition",
                        "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]",
                        selected ? "border-white/25 bg-white/[0.08]" : "",
                        submitted && selected && !isCorrect
                          ? "border-rose-400/40"
                          : "",
                        submitted && isCorrect ? "border-emerald-400/40" : "",
                      ].join(" ")}
                    >
                      {c}
                    </button>
                  );
                })}
              </div>

              {submitted && isAnswered && (
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
          );
        })}
      </div>

      {/* Actions */}
      <div className="mt-6 flex flex-wrap items-center gap-2">
        <button
          type="button"
          disabled={answeredCount === 0}
          onClick={() => setSubmitted(true)}
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
            setSubmitted(false);
          }}
          className="rounded-2xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/85 hover:bg-white/10"
        >
          Nollställ
        </button>

        {submitted && (
          <div className="ml-auto rounded-2xl border border-white/10 bg-black/20 px-4 py-2 text-sm text-white/80">
            Resultat:{" "}
            <span className="font-semibold text-white">{score}</span> /{" "}
            {QUESTIONS.length} • {pct}% •{" "}
            <span className="text-white/70">{level}</span>
          </div>
        )}
      </div>
    </div>
  );
}