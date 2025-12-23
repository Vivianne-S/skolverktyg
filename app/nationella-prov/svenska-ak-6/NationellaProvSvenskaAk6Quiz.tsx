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
    q: "Vilken mening är skriven med korrekt stor bokstav och punkt?",
    choices: [
      "igår gick vi till skolan",
      "Igår gick vi till skolan.",
      "Igår gick vi till skolan",
      "igår gick vi till skolan.",
    ],
    correct: 1,
    explain: "En mening börjar med stor bokstav och slutar med punkt.",
  },
  {
    q: "Vilket ord är ett adjektiv?",
    choices: ["springa", "blå", "skola", "snabbt"],
    correct: 1,
    explain: "Adjektiv beskriver substantiv, t.ex. 'en blå tröja'.",
  },
  {
    q: "Vilket ord är ett verb?",
    choices: ["stol", "läser", "glad", "under"],
    correct: 1,
    explain: "Verb är något man gör – 'läser' är ett verb.",
  },
  {
    q: "Vilket av följande är ett substantiv?",
    choices: ["vacker", "barn", "snart", "hoppa"],
    correct: 1,
    explain: "Substantiv är namn på saker, personer eller platser – 'barn'.",
  },
  {
    q: "Vilken mening har rätt skiljetecken (kommatecken) i en uppräkning?",
    choices: [
      "Jag köpte äpplen bananer och päron.",
      "Jag köpte äpplen, bananer och päron.",
      "Jag köpte äpplen bananer, och päron.",
      "Jag köpte äpplen, bananer, och päron.",
    ],
    correct: 1,
    explain: "I en uppräkning sätter man kommatecken mellan orden och 'och' före sista.",
  },
  {
    q: "Vad är syftet med en rubrik i en text?",
    choices: [
      "Att göra texten längre",
      "Att berätta vem som skrev texten",
      "Att ge läsaren en bild av vad texten handlar om",
      "Att ersätta hela texten",
    ],
    correct: 2,
    explain: "En rubrik hjälper läsaren att förstå textens ämne snabbt.",
  },
  {
    q: "Vilket ord är en synonym till 'glad'?",
    choices: ["arg", "lycklig", "trött", "rädd"],
    correct: 1,
    explain: "Synonymer betyder ungefär samma sak. 'Lycklig' = 'glad'.",
  },
  {
    q: "Vilket ord är en antonym till 'billig'?",
    choices: ["dyr", "stor", "snabb", "lätt"],
    correct: 0,
    explain: "Antonymer är motsatsord. Billig ↔ dyr.",
  },
  {
    q: "Vilket alternativ är en fakta-uppgift (inte en åsikt)?",
    choices: [
      "Den filmen är bäst!",
      "Katter är sötare än hundar.",
      "Stockholm är Sveriges huvudstad.",
      "Det är tråkigt med matte.",
    ],
    correct: 2,
    explain: "Fakta kan kontrolleras. Sveriges huvudstad är Stockholm.",
  },
  {
    q: "Vad betyder ordet 'förstärka' i meningen: 'Vi behöver förstärka bron'?",
    choices: [
      "Göra svagare",
      "Göra starkare",
      "Måla om",
      "Riva ner",
    ],
    correct: 1,
    explain: "Förstärka betyder göra starkare eller mer hållbar.",
  },
  {
    q: "Vilket är ett exempel på en berättande text?",
    choices: ["Instruktion", "Berättelse", "Reklam", "Faktatext"],
    correct: 1,
    explain: "En berättelse har ofta handling, personer och en händelsekedja.",
  },
  {
    q: "Vilket påstående stämmer om en instruktionstext?",
    choices: [
      "Den berättar en saga",
      "Den förklarar hur man gör något steg för steg",
      "Den beskriver en person",
      "Den är alltid en dikt",
    ],
    correct: 1,
    explain: "Instruktionstexter visar steg för steg hur man gör.",
  },
  {
    q: "Vilken mening är mest formell (passar i skolarbete)?",
    choices: [
      "Asså jag tycker typ att det var nice.",
      "Det var fett bra, liksom.",
      "Jag anser att resultatet blev bra.",
      "Det blev bra typ, aja.",
    ],
    correct: 2,
    explain: "Formellt språk passar i skolan: 'Jag anser att…'.",
  },
  {
    q: "Vilken källa är oftast mest trovärdig för fakta om ett historiskt datum?",
    choices: [
      "En anonym kommentar på sociala medier",
      "En lärobok eller en myndighetssida",
      "En reklamannons",
      "Ett rykte från en kompis",
    ],
    correct: 1,
    explain: "Läroböcker och myndighetssidor är vanligtvis mer kontrollerade källor.",
  },
  {
    q: "Vilket ord är en preposition?",
    choices: ["under", "springer", "blomma", "vacker"],
    correct: 0,
    explain: "Prepositioner är små ord som visar relation, t.ex. under, på, i, över.",
  },
  {
    q: "Vilket ord är ett pronomen?",
    choices: ["hon", "skriver", "penna", "snäll"],
    correct: 0,
    explain: "Pronomen ersätter substantiv: jag, du, han, hon, den, det, vi, ni, de.",
  },
  {
    q: "Vilken mening har rätt stavning?",
    choices: ["Jag vill värkligen gå.", "Jag vill verkligen gå.", "Jag vill verckligen gå.", "Jag vill värkligen gå!"],
    correct: 1,
    explain: "Rätt stavning är 'verkligen'.",
  },
  {
    q: "Vilket ord är rätt särskrivet/ihopskrivet?",
    choices: ["glass strut", "glass-strut", "glassstrut", "glasstr ut"],
    correct: 2,
    explain: "Ofta ska sammansatta ord skrivas ihop: glass + strut = glassstrut.",
  },
  {
    q: "Vad är ett tema i en text?",
    choices: [
      "Textens huvudämne/budskap",
      "Antal meningar i texten",
      "Vilken font texten har",
      "Vem som läser texten",
    ],
    correct: 0,
    explain: "Tema är det övergripande ämnet eller budskapet, t.ex. vänskap eller mod.",
  },
  {
    q: "Vad är en slutsats?",
    choices: [
      "En gissning utan stöd",
      "Det man kommer fram till efter att ha tänkt igenom fakta",
      "En rubrik",
      "Ett citat",
    ],
    correct: 1,
    explain: "En slutsats bygger på information och resonemang.",
  },
  {
    q: "Vilken av dessa är en uppmaning (imperativ)?",
    choices: ["Jag springer hem.", "Spring hem!", "Han sprang hem.", "Vi ska springa hem."],
    correct: 1,
    explain: "Imperativ är uppmaning: 'Spring!' 'Sitt!' 'Lyssna!'",
  },
  {
    q: "Vilken mening innehåller ett citat med rätt skiljetecken?",
    choices: [
      'Hon sa: "Jag kommer snart".',
      'Hon sa: "Jag kommer snart."',
      'Hon sa "Jag kommer snart".',
      'Hon sa, "Jag kommer snart".',
    ],
    correct: 1,
    explain: "Punkten hör oftast till citatet när hela meningen är ett citat.",
  },
  {
    q: "Vilket alternativ beskriver bäst skillnaden mellan fakta och åsikt?",
    choices: [
      "Fakta är alltid roligt, åsikt är alltid tråkigt",
      "Fakta kan kontrolleras, åsikt är vad någon tycker",
      "Fakta är längre än åsikt",
      "Åsikt finns bara i böcker",
    ],
    correct: 1,
    explain: "Fakta går att kontrollera. Åsikt är en värdering.",
  },
  {
    q: "Vilken mening har korrekt användning av frågetecken?",
    choices: ["Var bor du.", "Var bor du?", "Var bor du!", "Var bor du,"],
    correct: 1,
    explain: "Frågor avslutas med frågetecken.",
  },
  {
    q: "Vad är en argumenterande text?",
    choices: [
      "En text som berättar en saga",
      "En text som vill övertyga med argument",
      "En text som ger instruktioner",
      "En text som bara listar fakta",
    ],
    correct: 1,
    explain: "Argumenterande text försöker övertyga med skäl/argument.",
  },
  {
    q: "Vilket är ett exempel på ett argument?",
    choices: [
      "Jag tycker det är bäst.",
      "Alla borde göra som jag.",
      "Vi borde ha längre raster eftersom elever orkar bättre då.",
      "Det är så.",
    ],
    correct: 2,
    explain: "Ett argument ger ett skäl: 'eftersom…'.",
  },
  {
    q: "Vilket av följande är en bra källa när du skriver ett arbete om Sverige?",
    choices: ["Wikipedia utan att kolla källor", "En myndighetssida (t.ex. SCB)", "En meme", "En okänd TikTok-kommentar"],
    correct: 1,
    explain: "Myndigheter/statistik är ofta mer tillförlitliga för fakta.",
  },
  {
    q: "Vilket ord passar bäst i meningen? 'Han var ___ efter att ha sprungit.'",
    choices: ["trött", "träd", "trappa", "träna"],
    correct: 0,
    explain: "Trött är ett adjektiv som beskriver hur någon känner sig.",
  },
  {
    q: "Vad är en sammanfattning?",
    choices: [
      "En längre version av texten",
      "De viktigaste delarna återberättade kort",
      "En lista med svåra ord",
      "En ny berättelse",
    ],
    correct: 1,
    explain: "En sammanfattning tar med det viktigaste och håller det kort.",
  },
  {
    q: "Vilket ord är rätt böjt i meningen? 'Två ___ sprang förbi.'",
    choices: ["pojke", "pojkar", "pojkes", "pojka"],
    correct: 1,
    explain: "Plural av pojke är pojkar: en pojke – två pojkar.",
  },
  {
    q: "Vad är ett budskap i en berättelse?",
    choices: [
      "Antal sidor",
      "Något författaren vill att läsaren ska förstå eller känna",
      "Vilken tid det är i berättelsen",
      "Namnet på huvudpersonen",
    ],
    correct: 1,
    explain: "Budskap är det berättelsen vill förmedla, t.ex. att stå upp för andra.",
  },
];
export default function NationellaProvSvenskaAk6Quiz() {
    const [answers, setAnswers] = useState<(number | null)[]>(
      Array(QUESTIONS.length).fill(null)
    );
    const [show, setShow] = useState(false);
  
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
              NP-träning: Svenska åk 6
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
  
                {show && isAnswered && (
                  <div className="mt-3 rounded-2xl border border-white/10 bg-black/20 p-3">
                    <p className="text-sm text-white/70">
                      <span className="font-semibold text-white/85">Facit:</span>{" "}
                      {q.choices[q.correct]}
                    </p>
                    <p className="mt-1 text-sm text-white/60">
                      <span className="font-semibold text-white/75">Förklaring:</span>{" "}
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
              Resultat: <span className="font-semibold text-white">{score}</span> /{" "}
              {QUESTIONS.length} • {pct}% •{" "}
              <span className="text-white/70">{level}</span>
            </div>
          )}
        </div>
  
        {/* Tips – under allt, bara efter rättning */}
        {show && (
          <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/70">
            <p className="font-semibold text-white/90">Tips inför nationella</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Ordklasser: lär dig känna igen substantiv, verb och adjektiv.</li>
              <li>Skiljetecken: punkt i slutet, komma i uppräkningar.</li>
              <li>Ord: träna synonymer/antonymer och läs meningar noga.</li>
              <li>Texttyper: fundera på syfte – berätta, informera eller instruera.</li>
              <li>Källkritik: välj hellre lärobok/myndighet än “någon sa…”.</li>
            </ul>
          </div>
        )}
      </div>
    );
  }