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
    q: "Vad beskriver bäst skillnaden mellan ett referat och ett citat?",
    choices: [
      "Referat är ordagrant, citat är omformulerat",
      "Referat är omformulerat, citat är ordagrant",
      "Båda är alltid ordagranna",
      "Båda är alltid omformulerade",
    ],
    correct: 1,
    explain:
      "Referat återger innehållet med egna ord. Citat återger exakt vad källan säger/skriver.",
  },
  {
    q: "Vilket är mest typiskt för en utredande text?",
    choices: [
      "Den berättar en fiktiv historia",
      "Den undersöker ett ämne ur flera perspektiv och drar slutsats",
      "Den instruerar steg för steg",
      "Den är alltid skriven som en dialog",
    ],
    correct: 1,
    explain:
      "Utredande texter väger perspektiv, förklarar och bygger resonemang som leder till en slutsats.",
  },
  {
    q: "Vilken är den tydligaste tesen?",
    choices: [
      "Jag gillar pizza.",
      "Skolan borde börja senare för att elever ska prestera bättre.",
      "Det är viktigt med hälsa.",
      "Många tycker olika om skola.",
    ],
    correct: 1,
    explain:
      "En tes är en tydlig ståndpunkt som går att argumentera för eller emot.",
  },
  {
    q: "Vilket är ett motargument?",
    choices: [
      "Ett argument som stödjer tesen",
      "Ett argument som går emot tesen",
      "En rubrik",
      "En källa",
    ],
    correct: 1,
    explain:
      "Motargument är invändningar. Bra texter bemöter motargument.",
  },
  {
    q: "Vilket är en rimlig slutsats om en text som är skriven med många fakta, källor och neutral ton?",
    choices: [
      "Texten är sann eftersom den är lång",
      "Texten försöker informera objektivt",
      "Texten är alltid reklam",
      "Texten måste vara en novell",
    ],
    correct: 1,
    explain:
      "Neutral ton + fakta + källor tyder ofta på informativ/utredande text (men man ska ändå vara källkritisk).",
  },
  {
    q: "Vilket alternativ är en fakta-uppgift?",
    choices: [
      "Den här filmen är bäst.",
      "Sverige har 25 landskap.",
      "Choklad är godast.",
      "Alla borde träna mer.",
    ],
    correct: 1,
    explain:
      "Fakta går att kontrollera. Åsikter är värderingar (”bäst”, ”godast”, ”borde”).",
  },
  {
    q: "Vilken fråga är mest källkritisk när du hittar ett påstående online?",
    choices: [
      "Har texten emojis?",
      "Vem står bakom informationen och vilket syfte har den?",
      "Är sidan snygg?",
      "Är texten kort?",
    ],
    correct: 1,
    explain:
      "Avsändare + syfte + stöd i källor är centralt för källkritik.",
  },
  {
    q: "Vilket är ett exempel på beroende källor?",
    choices: [
      "Två artiklar som använder varandra som källa",
      "En bok och en intervju",
      "En myndighetssida och en lärobok",
      "Två olika ögonvittnen",
    ],
    correct: 0,
    explain:
      "Beroende källor bygger på samma ursprung eller hänvisar till varandra, vilket minskar självständig kontroll.",
  },
  {
    q: "Vilket ord är ett sambandsord som ofta visar orsak?",
    choices: ["däremot", "eftersom", "till exempel", "sammanfattningsvis"],
    correct: 1,
    explain:
      "”Eftersom” markerar orsak. (Däremot=kontrast, till exempel=exempel, sammanfattningsvis=avrundning.)",
  },
  {
    q: "Vilket sambandsord passar bäst? 'Jag håller inte med, ___ förstår jag din poäng.'",
    choices: ["dessutom", "däremot", "även om", "därför"],
    correct: 2,
    explain:
      "”Även om” markerar medgivande/koncession: man kan förstå poängen trots att man inte håller med.",
  },
  {
    q: "Vilken formulering är mest formell och passar bäst i en utredande text?",
    choices: [
      "Det här är fett viktigt.",
      "Jag anser att frågan är betydelsefull.",
      "Asså jag tycker typ att...",
      "Det är väl typ så här.",
    ],
    correct: 1,
    explain:
      "Formellt språk är neutralt och tydligt och undviker slang och utfyllnadsord.",
  },
  {
    q: "Vad betyder 'underförstått budskap'?",
    choices: [
      "Det som står ordagrant i texten",
      "Det som antyds men inte sägs rakt ut",
      "Rubriken på texten",
      "Alla fakta i texten",
    ],
    correct: 1,
    explain:
      "Underförstått budskap är det man kan tolka mellan raderna.",
  },
  {
    q: "Vilken formulering är mest mottagaranpassad för ett mail till en lärare?",
    choices: [
      "Tja! Kan du fixa det där?",
      "Hej! Skulle du kunna förklara uppgiften och vad som förväntas? Tack!",
      "Ey, jag fattar inte. Svara.",
      "Okej men asså va ska man göra ens?",
    ],
    correct: 1,
    explain:
      "Mottagaranpassning handlar om artighet, tydlighet och passande ton.",
  },
  {
    q: "Vad är en tes + argument-struktur?",
    choices: [
      "Rubrik + berättelse",
      "Påstående (tes) + skäl (argument) + exempel",
      "Dialog + dikt",
      "Lista + instruktioner",
    ],
    correct: 1,
    explain:
      "Argumentation bygger ofta: tes → argument → exempel/stöd → slutsats.",
  },
  {
    q: "Vilket är ett exempel på en värdeladdad formulering?",
    choices: [
      "Studien visar en ökning på 5%.",
      "Många upplever frågan som komplex.",
      "Det är helt sjukt att de gör så här.",
      "Det finns flera perspektiv.",
    ],
    correct: 2,
    explain:
      "”Helt sjukt” är värderande och känsloladdat, inte neutralt.",
  },
  {
    q: "Vilken är den mest rimliga tolkningen av metaforen 'hon bar ett berg på sina axlar'?",
    choices: [
      "Hon tränade styrkelyft",
      "Hon hade bokstavligen ett berg",
      "Hon hade ett stort ansvar eller en tung börda",
      "Hon var på fjällvandring",
    ],
    correct: 2,
    explain:
      "Metaforer beskriver ofta känslor/situationer bildligt: tungt ansvar/bekymmer.",
  },
  {
    q: "Vilket är bäst som stöd för ett påstående i en argumenterande text?",
    choices: [
      "”Alla vet att…”",
      "Ett exempel + en källa (statistik/undersökning)",
      "En gissning",
      "En meme",
    ],
    correct: 1,
    explain:
      "Stöd blir starkare med exempel och trovärdiga källor.",
  },
  {
    q: "Vad menas med 'tendens' i källkritik?",
    choices: [
      "Att källan alltid ljuger",
      "Att källan kan vara vinklad av intresse/syfte",
      "Att källan är för gammal",
      "Att källan är lång",
    ],
    correct: 1,
    explain:
      "Tendens = risk för vinkling p.g.a. syfte, ekonomi, politik, varumärke osv.",
  },
  {
    q: "Vilket exempel visar bäst på 'relevans' i källkritik?",
    choices: [
      "En källa från 1990 om dagens elpriser",
      "En myndighetsrapport om ämnet du skriver om",
      "En rolig bloggpost utan källor",
      "En kommentar i ett forum",
    ],
    correct: 1,
    explain:
      "Relevans handlar om att källan faktiskt passar din fråga och ger rätt typ av information.",
  },
  {
    q: "Vilken rubrik passar bäst till en argumenterande text om mobilförbud i klassrummet?",
    choices: [
      "En dag i mitt liv",
      "Så här gör du en smoothie",
      "Därför bör mobilen begränsas under lektionstid",
      "Min favoritfilm",
    ],
    correct: 2,
    explain:
      "Rubriken signalerar tydligt argumentation (”Därför…”).",
  },
  {
    q: "Vad är en disposition i en längre text?",
    choices: [
      "Textens stavning",
      "Textens plan/struktur (inledning, avsnitt, avslutning)",
      "Textens typsnitt",
      "Textens titel",
    ],
    correct: 1,
    explain:
      "Disposition = hur texten är uppbyggd och organiserad.",
  },
  {
    q: "Vilket är ett bra sätt att göra en text mer sammanhängande?",
    choices: [
      "Ta bort alla sambandsord",
      "Blanda olika ämnen i varje mening",
      "Använda styckeindelning och sambandsord",
      "Undvika rubriker",
    ],
    correct: 2,
    explain:
      "Sambandsord + tydliga stycken gör resonemang lättare att följa.",
  },
  {
    q: "Vilken avslutning passar bäst i en utredande text?",
    choices: [
      "En ny fråga som inte hör ihop med ämnet",
      "En sammanfattning och en slutsats kopplad till frågeställningen",
      "En lista med slumpade fakta",
      "En ny inledning",
    ],
    correct: 1,
    explain:
      "Avslutning ska knyta ihop: sammanfatta det viktigaste och dra slutsats.",
  },
  {
    q: "Vilken formulering är mest korrekt om du är osäker på en uppgift men vill skriva sakligt?",
    choices: [
      "Det här är 100% sant.",
      "Jag vet inte men jag chansar.",
      "Det tyder på att… / Det verkar som att…",
      "Alla håller med om detta.",
    ],
    correct: 2,
    explain:
      "Sakliga formuleringar kan visa grad av säkerhet: ”det tyder på”, ”det verkar som”.",
  },
  {
    q: "Vilken mening visar bäst på att du bemöter ett motargument?",
    choices: [
      "Jag har rätt.",
      "Vissa menar att…, men det kan invändas att…",
      "Det är uppenbart.",
      "Alla borde förstå.",
    ],
    correct: 1,
    explain:
      "Att bemöta motargument: erkänn invändningen och förklara varför din ståndpunkt ändå håller.",
  },
];

export default function NationellaProvSvenskaAk9Quiz() {
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(QUESTIONS.length).fill(null)
  );
  const [submitted, setSubmitted] = useState(false);

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
            NP-träning: Svenska åk 9
          </h2>
          <p className="mt-1 text-sm text-white/60">
            Läs, analysera och välj bästa alternativet. Facit + förklaringar får
            du när du rättar.
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
                      disabled={submitted}
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

      {/* Actions – längst ner */}
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