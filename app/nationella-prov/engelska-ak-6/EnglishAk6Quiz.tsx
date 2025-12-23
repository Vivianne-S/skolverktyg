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
    q: `READ:
"On Saturday, Emma and her dad went to the library. Emma wanted a book about animals. She chose a book about whales. After that, they bought hot chocolate and walked home."
Question: Where did Emma go on Saturday?`,
    choices: ["To the cinema", "To the library", "To the zoo", "To school"],
    correct: 1,
    explain: "Texten säger: “went to the library”.",
  },
  {
    q: `READ (same text):
What book did Emma choose?`,
    choices: [
      "A book about whales",
      "A book about cars",
      "A book about dogs",
      "A book about space",
    ],
    correct: 0,
    explain: "Texten säger: “a book about whales”.",
  },
  {
    q: `READ (same text):
What did they buy after the library?`,
    choices: ["Ice cream", "Pizza", "Hot chocolate", "Tea"],
    correct: 2,
    explain: "Texten säger: “they bought hot chocolate”.",
  },
  {
    q: "Choose the synonym for “happy”.",
    choices: ["sad", "angry", "glad", "tired"],
    correct: 2,
    explain: "“Glad” betyder ungefär samma sak som “happy”.",
  },
  {
    q: "Choose the antonym for “easy”.",
    choices: ["simple", "hard", "quick", "fun"],
    correct: 1,
    explain: "Motsatsord till “easy” är “hard”.",
  },
  {
    q: "What does “borrow” mean in a library?",
    choices: ["Buy something", "Take and return later", "Throw away", "Lose it"],
    correct: 1,
    explain: "Borrow = låna och lämna tillbaka senare.",
  },
  {
    q: "Choose the correct sentence:",
    choices: [
      "She are my friend.",
      "She is my friend.",
      "She am my friend.",
      "She be my friend.",
    ],
    correct: 1,
    explain: "She + is.",
  },
  {
    q: "Choose the correct: “They ___ two cats.”",
    choices: ["has", "have", "having", "haves"],
    correct: 1,
    explain: "They have …",
  },
  {
    q: "Choose the correct question:",
    choices: [
      "Do you like football?",
      "You like football?",
      "Likes you football?",
      "Do like you football?",
    ],
    correct: 0,
    explain: "Fråga med do: Do you like … ?",
  },
  {
    q: "Choose the correct: “He ___ play the piano.”",
    choices: ["can", "cans", "canning", "canned"],
    correct: 0,
    explain: "He can …",
  },
  {
    q: "Choose the correct plural:",
    choices: [
      "one child – two childs",
      "one child – two children",
      "one child – two child",
      "one child – two childes",
    ],
    correct: 1,
    explain: "Children är plural av child.",
  },
  {
    q: "Choose the correct possessive: “This is ___ bike.” (bike belongs to Alex)",
    choices: ["Alex bike", "Alex’s bike", "Alexs bike", "Alex’ bike"],
    correct: 1,
    explain: "Ägande med ’s: Alex’s bike.",
  },
  {
    q: `READ:
"Leo is planning a birthday party. He wants to invite six friends. They will play games, eat pizza and watch a movie. Leo’s sister will help him decorate the room."
Question: How many friends will Leo invite?`,
    choices: ["Five", "Six", "Seven", "Eight"],
    correct: 1,
    explain: "Texten säger: “invite six friends”.",
  },
  {
    q: `READ (same text):
Who will help Leo decorate?`,
    choices: ["His brother", "His sister", "His teacher", "His friend"],
    correct: 1,
    explain: "Texten säger: “Leo’s sister will help”.",
  },
  {
    q: `READ (same text):
What will they do at the party?`,
    choices: [
      "Play games, eat pizza and watch a movie",
      "Go to the beach",
      "Do homework",
      "Go shopping",
    ],
    correct: 0,
    explain: "Alla tre aktiviteterna står i texten.",
  },
  {
    q: "DIALOG: A: “Excuse me, where is the bathroom?” B: ____",
    choices: ["It’s next to the cafeteria.", "I’m twelve years old.", "Blue.", "I like pizza."],
    correct: 0,
    explain: "Det enda svaret som passar frågan om plats är “It’s next to …”.",
  },
  {
    q: "DIALOG: A: “Would you like some water?” B: ____",
    choices: ["Yes, please.", "No, I am.", "Where are you?", "He is my friend."],
    correct: 0,
    explain: "Artigt ja-svar: Yes, please.",
  },
  {
    q: "Choose the correct spelling:",
    choices: ["becouse", "because", "becaus", "becoze"],
    correct: 1,
    explain: "Rätt stavning: because.",
  },
  {
    q: "Choose the correct word: “I ___ to school every day.”",
    choices: ["go", "goes", "going", "gone"],
    correct: 0,
    explain: "I go … (present simple).",
  },
  {
    q: "Choose the correct preposition: “The keys are ___ the table.”",
    choices: ["on", "in", "under", "between"],
    correct: 0,
    explain: "On the table = på bordet.",
  },
  {
    q: "Choose the correct: “The cat is ___ the chair and the sofa.”",
    choices: ["between", "behind", "under", "over"],
    correct: 0,
    explain: "Between = mellan.",
  },
  {
    q: "Which sentence is written correctly with capital letter and punctuation?",
    choices: [
      "yesterday i went to the park",
      "Yesterday I went to the park.",
      "Yesterday i went to the park",
      "yesterday I went to the park.",
    ],
    correct: 1,
    explain: "Stor bokstav i början + punkt i slutet + I ska vara stor.",
  },
  {
    q: `READ:
"Lin wakes up late. She runs to the bus stop, but the bus has already left. Lin checks her phone and sighs."
Question: Why does Lin sigh?`,
    choices: [
      "Because she loves buses",
      "Because she missed the bus",
      "Because she is hungry",
      "Because her phone is new",
    ],
    correct: 1,
    explain: "Texten visar att bussen redan åkt. Då missade hon den.",
  },
  {
    q: "Choose the correct: “There ___ two apples on the plate.”",
    choices: ["is", "are", "am", "be"],
    correct: 1,
    explain: "Two apples → are.",
  },
  {
    q: "Choose the correct: “I don’t ___ coffee.”",
    choices: ["likes", "like", "liked", "liking"],
    correct: 1,
    explain: "Efter don’t använder man grundform: like.",
  },
  {
    q: "Choose the correct question word: “___ do you live?”",
    choices: ["What", "Where", "When", "Why"],
    correct: 1,
    explain: "Where = var.",
  },
  {
    q: "Choose the best answer: “I’m sorry.” – ____",
    choices: ["It’s OK.", "Good night.", "I’m twelve.", "At 5 o’clock."],
    correct: 0,
    explain: "Vanligt svar: It’s OK.",
  },
];

export default function EnglishAk6Quiz() {
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
      {/* TOP BOX = INFO ONLY */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <div className="text-white font-semibold">
              NP practice – English grade 6 (mock quiz)
            </div>
            <div className="text-white/60 text-sm">
              {answeredCount}/{QUESTIONS.length} answered
            </div>
          </div>

          <div className="text-xs text-white/50">Answer first • Correct at the bottom</div>
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
                <div className="text-white font-medium whitespace-pre-line">
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