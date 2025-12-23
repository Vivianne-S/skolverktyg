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
    q: "Which word means “katt”?",
    choices: ["cat", "cap", "car", "cake"],
    correct: 0,
    explain: "“Cat” betyder katt.",
  },
  {
    q: "Which word means “hund”?",
    choices: ["hat", "hand", "dog", "door"],
    correct: 2,
    explain: "“Dog” betyder hund.",
  },
  {
    q: "Choose the correct color: “röd”",
    choices: ["blue", "green", "red", "yellow"],
    correct: 2,
    explain: "“Red” = röd.",
  },
  {
    q: "Which word means “bok”?",
    choices: ["book", "back", "bike", "box"],
    correct: 0,
    explain: "“Book” betyder bok.",
  },
  {
    q: "Which word means “skola”?",
    choices: ["school", "shop", "shoe", "sky"],
    correct: 0,
    explain: "“School” betyder skola.",
  },
  {
    q: "Your teacher says: “Open your book.” What do you do?",
    choices: [
      "You close your book.",
      "You open your book.",
      "You run.",
      "You sleep.",
    ],
    correct: 1,
    explain: "“Open your book” = öppna boken.",
  },
  {
    q: "What does “Listen” mean?",
    choices: ["Lyssna", "Läsa", "Skriva", "Springa"],
    correct: 0,
    explain: "“Listen” betyder lyssna.",
  },
  {
    q: "What does “Can you help me?” mean?",
    choices: [
      "Kan du hjälpa mig?",
      "Kan jag gå ut?",
      "Var är du?",
      "Jag är hungrig.",
    ],
    correct: 0,
    explain: "“Can you help me?” = Kan du hjälpa mig?",
  },
  {
    q: "What number is “twelve”?",
    choices: ["10", "11", "12", "20"],
    correct: 2,
    explain: "Twelve = 12.",
  },
  {
    q: "What comes after 14?",
    choices: ["13", "15", "16", "24"],
    correct: 1,
    explain: "Efter 14 kommer 15.",
  },
  {
    q: "Which day comes after Monday?",
    choices: ["Sunday", "Tuesday", "Friday", "Saturday"],
    correct: 1,
    explain: "Efter Monday kommer Tuesday.",
  },
  {
    q: "Choose the correct sentence:",
    choices: ["I am happy.", "I is happy.", "I are happy.", "I be happy."],
    correct: 0,
    explain: "Man säger “I am …”.",
  },
  {
    q: "Choose the correct: “___ is my friend.”",
    choices: ["He", "Him", "Her", "Me"],
    correct: 0,
    explain: "“He is my friend.” (subjektform).",
  },
  {
    q: "Choose the correct: “She ___ a cat.”",
    choices: ["have", "has", "haves", "having"],
    correct: 1,
    explain: "She has …",
  },
  {
    q: "Choose the correct: “We ___ in school.”",
    choices: ["am", "is", "are", "be"],
    correct: 2,
    explain: "We are …",
  },
  {
    q: "READ: “Tom has a red bike. He rides it to school.” What color is Tom’s bike?",
    choices: ["Blue", "Green", "Red", "Yellow"],
    correct: 2,
    explain: "Texten säger “a red bike”.",
  },
  {
    q: "READ: “Sara likes apples. She eats one every day.” What does Sara like?",
    choices: ["Apples", "Bananas", "Candy", "Milk"],
    correct: 0,
    explain: "Texten säger “Sara likes apples”.",
  },
  {
    q: "READ: “It is rainy today. I have an umbrella.” What is the weather?",
    choices: ["Sunny", "Rainy", "Snowy", "Windy"],
    correct: 1,
    explain: "“Rainy today” = regnigt.",
  },
  {
    q: "DIALOG: A: “Hello!” B: ____",
    choices: ["Goodbye!", "Hello!", "No, thanks.", "I don’t know."],
    correct: 1,
    explain: "Vanligt svar på “Hello!” är “Hello!”.",
  },
  {
    q: "DIALOG: A: “How are you?” B: ____",
    choices: [
      "I am fine, thank you.",
      "I am a pencil.",
      "Blue.",
      "On the table.",
    ],
    correct: 0,
    explain: "“How are you?” → “I am fine, thank you.”",
  },
  {
    q: "DIALOG: A: “Thank you!” B: ____",
    choices: ["Please.", "You’re welcome.", "Sorry.", "Hello."],
    correct: 1,
    explain: "“You’re welcome” betyder varsågod.",
  },
  {
    q: "Where is the cat? “The cat is ___ the box.” (in the box)",
    choices: ["in", "on", "under", "behind"],
    correct: 0,
    explain: "“In” = i.",
  },
  {
    q: "Where is the ball? “The ball is ___ the table.” (under the table)",
    choices: ["in", "on", "under", "next"],
    correct: 2,
    explain: "“Under” = under.",
  },
  {
    q: "Choose the correct spelling:",
    choices: ["frend", "friend", "freind", "friand"],
    correct: 1,
    explain: "Rätt stavning: friend.",
  },
  {
    q: "Choose the correct spelling:",
    choices: ["becose", "because", "becaus", "becoz"],
    correct: 1,
    explain: "Rätt stavning: because.",
  },
  {
    q: "Choose the correct word: “I ___ a book.”",
    choices: ["have", "has", "am", "is"],
    correct: 0,
    explain: "I have …",
  },
  {
    q: "Choose the correct: “He ___ happy.”",
    choices: ["am", "is", "are", "be"],
    correct: 1,
    explain: "He is …",
  },
  {
    q: "Choose the correct question:",
    choices: ["Where you are?", "Where are you?", "Where is you?", "Where you is?"],
    correct: 1,
    explain: "Rätt ordföljd: Where are you?",
  },
];

export default function EnglishAk3Quiz() {
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
    if (pct >= 85) return "Strong level ✅";
    if (pct >= 60) return "Good basics 👍";
    return "More practice 💪";
  }, [pct, submitted]);

  function reset() {
    setAnswers(Array(QUESTIONS.length).fill(null));
    setSubmitted(false);
  }

  return (
    <div className="space-y-4">
      {/* TOP BOX = INFO ONLY (inga knappar här) */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <div className="text-white font-semibold">
              NP practice – English grade 3 (mock quiz)
            </div>
            <div className="text-white/60 text-sm">
              {answeredCount}/{QUESTIONS.length} answered
            </div>
          </div>

          <div className="text-xs text-white/50">
            Answer first • Correct at the bottom
          </div>
        </div>

        {submitted && (
          <div className="mt-4 rounded-2xl border border-white/10 bg-black/30 p-4">
            <div className="text-white font-semibold">
              Result: {score}/{QUESTIONS.length} ({pct}%)
            </div>
            <div className="text-white/70 text-sm mt-1">{level}</div>
            <div className="text-white/60 text-sm mt-3">
              Tip: Read the explanations for the ones you missed and try again.
            </div>
          </div>
        )}
      </div>

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
                <div className="text-white font-medium">{idx + 1}. {q.q}</div>

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
                        if (submitted) return;
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

      {/* ✅ ACTIONS – LÄNGST NER */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="text-sm text-white/70">
              Answered: <span className="text-white">{answeredCount}</span> /{" "}
              {QUESTIONS.length}
            </p>

            {submitted && (
              <p className="mt-1 text-sm text-white/70">
                Result: <span className="text-white">{score}</span> /{" "}
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
      </div>
    </div>
  );
}