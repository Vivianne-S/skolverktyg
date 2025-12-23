"use client";

import { useMemo, useState } from "react";

type Q = {
  q: string;
  choices: string[];
  correct: number;
  explain: string;
};

const QUESTIONS: Q[] = [
  // ======================
  // READING (3 texter)
  // ======================

  // --- Reading A ---
  {
    q: `READ:
"Last month, our school started a new project called 'Phone-Free Fridays'. Students leave their phones in lockers before the first lesson. Many teachers say classrooms feel calmer, but some students feel stressed because they can’t check messages during breaks."
Question: What is the main idea of the text?`,
    choices: [
      "Students want more phone time in lessons",
      "The school is trying a phone-free day and people react differently",
      "Teachers want students to use phones for learning",
      "Students are not allowed to bring phones to school at all",
    ],
    correct: 1,
    explain:
      "Texten handlar om en ny regel (Phone-Free Fridays) och hur både lärare och elever reagerar.",
  },
  {
    q: `READ (same text):
Why do some students feel stressed?`,
    choices: [
      "Because they have too much homework",
      "Because lockers are expensive",
      "Because they can’t check messages during breaks",
      "Because teachers take their phones home",
    ],
    correct: 2,
    explain:
      "Texten säger att vissa känner sig stressade för att de inte kan kolla meddelanden på rasterna.",
  },
  {
    q: `READ (same text):
Which statement is TRUE according to the text?`,
    choices: [
      "All students love the new project",
      "Teachers say classrooms feel calmer",
      "Students can use phones during lessons",
      "Phones are collected once a month",
    ],
    correct: 1,
    explain: "Texten säger att många lärare tycker klassrummen känns lugnare.",
  },

  // --- Reading B ---
  {
    q: `READ:
"Jamal applied for a weekend job at a café. The manager asked him to work two evenings each week. Jamal said he could, but only if he finished his football practice first. The manager agreed and offered him a trial shift on Friday."
Question: What does “trial shift” most likely mean?`,
    choices: [
      "A shift where Jamal only watches and doesn’t learn anything",
      "A first test shift to see how Jamal works",
      "A shift that happens every day",
      "A shift where Jamal is paid double",
    ],
    correct: 1,
    explain: "Trial shift = provpass/testpass för att se hur det funkar.",
  },
  {
    q: `READ (same text):
Why did Jamal need a special schedule?`,
    choices: [
      "Because he had football practice",
      "Because he didn’t like the café",
      "Because he was moving to another city",
      "Because the manager refused to hire him",
    ],
    correct: 0,
    explain: "Han ville jobba efter att han var klar med fotbollsträningen.",
  },
  {
    q: `READ (same text):
What happens on Friday?`,
    choices: [
      "Jamal starts working full-time",
      "Jamal has a trial shift at the café",
      "The café closes for a holiday",
      "Jamal quits football practice",
    ],
    correct: 1,
    explain: "Texten säger att han får ett trial shift på fredag.",
  },

  // --- Reading C (inference / tone) ---
  {
    q: `READ:
"After posting a short video online, Lina woke up to hundreds of comments. Some were supportive, but others were rude. She decided to report the worst ones and talk to a trusted adult. Later, she posted again—this time with comments limited."
Question: What can we infer about Lina?`,
    choices: [
      "She ignores all online problems",
      "She handles the situation in a responsible way",
      "She never uses social media anymore",
      "She enjoys reading rude comments",
    ],
    correct: 1,
    explain: "Hon rapporterar, pratar med vuxen och ändrar inställningar → ansvarsfullt.",
  },
  {
    q: `READ (same text):
Why did Lina limit comments?`,
    choices: [
      "To make the video longer",
      "To stop or reduce rude comments",
      "Because her phone was broken",
      "Because supportive comments are not allowed",
    ],
    correct: 1,
    explain: "Att begränsa kommentarer minskar risken för elaka kommentarer.",
  },

  // ======================
  // VOCABULARY (åk 9)
  // ======================
  {
    q: "Choose the best synonym for “improve”.",
    choices: ["make better", "make smaller", "make slower", "make louder"],
    correct: 0,
    explain: "Improve = make better.",
  },
  {
    q: "Choose the best synonym for “reliable”.",
    choices: ["trustworthy", "expensive", "dangerous", "boring"],
    correct: 0,
    explain: "Reliable = trustworthy.",
  },
  {
    q: "Choose the best antonym for “increase”.",
    choices: ["raise", "grow", "reduce", "add"],
    correct: 2,
    explain: "Motsats: increase ↔ reduce/decrease.",
  },
  {
    q: "What does “to avoid” mean?",
    choices: ["to look for", "to stay away from", "to pay for", "to laugh at"],
    correct: 1,
    explain: "Avoid = undvika / hålla sig borta från.",
  },
  {
    q: "What does “I can’t afford it” mean?",
    choices: [
      "I don’t have enough money for it",
      "I don’t like it",
      "I forgot it",
      "I already bought it",
    ],
    correct: 0,
    explain: "Afford = ha råd.",
  },

  // ======================
  // GRAMMAR (åk 9 nivå)
  // ======================
  {
    q: "Choose the correct sentence (past simple):",
    choices: [
      "Yesterday I go to the gym.",
      "Yesterday I went to the gym.",
      "Yesterday I goed to the gym.",
      "Yesterday I going to the gym.",
    ],
    correct: 1,
    explain: "Past of go = went.",
  },
  {
    q: "Choose the correct sentence (present perfect):",
    choices: [
      "I have seen that movie already.",
      "I saw that movie already yesterday.",
      "I have see that movie already.",
      "I has seen that movie already.",
    ],
    correct: 0,
    explain: "Present perfect: have + past participle (seen).",
  },
  {
    q: "Choose the correct: “If it rains, we ___ inside.”",
    choices: ["stay", "stayed", "will stay", "staying"],
    correct: 2,
    explain: "First conditional: If + present, will + verb.",
  },
  {
    q: "Choose the correct comparative:",
    choices: ["more fast", "faster", "fastest", "most fast"],
    correct: 1,
    explain: "Comparative of fast = faster.",
  },
  {
    q: "Choose the correct superlative:",
    choices: [
      "the most interesting",
      "the more interesting",
      "the interestinger",
      "the most interest",
    ],
    correct: 0,
    explain: "Superlative: the most interesting.",
  },
  {
    q: "Choose the correct: “She ___ to school by bus every day.”",
    choices: ["go", "goes", "going", "gone"],
    correct: 1,
    explain: "She/He/It + goes.",
  },
  {
    q: "Choose the correct: “I don’t know ___ he is.”",
    choices: ["where", "were", "wear", "which"],
    correct: 0,
    explain: "Where = var.",
  },

  // ======================
  // FUNCTIONAL LANGUAGE / PRAGMATICS
  // ======================
  {
    q: `EMAIL STYLE: Which opening is most appropriate for a formal email to a teacher?`,
    choices: ["Yo! What’s up?", "Hi teacher,", "Dear Ms Andersson,", "Hey bestie,"],
    correct: 2,
    explain: "Formellt: Dear + namn/titel.",
  },
  {
    q: `Which sentence sounds most polite?`,
    choices: [
      "Give me the homework.",
      "Can you give me the homework?",
      "Could you please give me the homework?",
      "You must give me the homework.",
    ],
    correct: 2,
    explain: "Could you please… är mest artigt.",
  },
  {
    q: `DIALOG:
A: “I’m not sure how to solve this.” 
B: ____`,
    choices: ["That’s your problem.", "Maybe we can look at it together.", "Stop talking.", "I don’t care."],
    correct: 1,
    explain: "Stödjande och naturligt svar.",
  },
  {
    q: `Which response fits best?
A: “Thanks for your help!” 
B: ____`,
    choices: ["No problem!", "What?", "Because.", "At 5 o’clock."],
    correct: 0,
    explain: "No problem! / You’re welcome passar.",
  },
  {
    q: `INSTRUCTIONS: What does “underline the key words” mean?`,
    choices: [
      "Write the words bigger",
      "Draw a line under the important words",
      "Erase the words",
      "Translate every word",
    ],
    correct: 1,
    explain: "Underline = stryk under.",
  },
  {
    q: `INSTRUCTIONS: What should you do if the task says “tick the correct answer”?`,
    choices: [
      "Write a paragraph",
      "Put a ✓ next to the right answer",
      "Draw a circle",
      "Skip the question",
    ],
    correct: 1,
    explain: "Tick = sätt ett kryss/✓.",
  },

  // ======================
  // WRITING AWARENESS / COHESION
  // ======================
  {
    q: "Which linking word best shows contrast?",
    choices: ["because", "however", "so", "therefore"],
    correct: 1,
    explain: "However = däremot/men (kontrast).",
  },
  {
    q: "Choose the best option: “I studied a lot, ___ I passed the test.”",
    choices: ["so", "because", "but", "although"],
    correct: 0,
    explain: "I studied a lot, so I passed … (orsak → resultat).",
  },
];

export default function EnglishAk9Quiz() {
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

  return (
    <div className="space-y-4">
      {/* TOP BOX = INFO ONLY  */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <div className="text-white font-semibold">
              NP practice – English grade 9 (mock quiz)
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
              Tip: Read explanations for the ones you missed, then try again.
            </div>
          </div>
        )}
      </div>

      {/* QUESTIONS */}
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

      {/* ✅ ACTIONS – LÄNGST NER (RÄTTA HÄR) */}
      <div className="mt-2 rounded-2xl border border-white/10 bg-white/5 p-4">
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
                onClick={() => {
                  setAnswers(Array(QUESTIONS.length).fill(null));
                  setSubmitted(false);
                }}
                type="button"
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