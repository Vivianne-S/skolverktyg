"use client";

import { useMemo, useState } from "react";

type Q = {
  q: string;
  choices: string[];
  correct: number;
  explain: string;
};

const TEXTS = {
  A: {
    title: "Text A (berättande)",
    body: [
      "När dörren till klassrummet stängdes blev korridoren tystare än vanligt. Noor stod kvar vid fönstret och såg hur de sista eleverna gick ut på skolgården. Hon borde också gå, men benen kändes tunga.",
      "I ryggsäcken låg pappret med omdömet. Läraren hade sagt att det var viktigt att visa hemma och att det fanns saker att träna på. Noor hade nickat, men nu snurrade orden i huvudet. Hon tänkte på hur pappa brukade säga: “Du kan bättre.” Inte argt, mer som ett konstaterande som gjorde att man kände sig mindre.",
      "Hon drog upp luvan och stoppade pappret djupare ner. Kanske kunde hon vänta tills efter middagen, när pappa var på bättre humör. Eller i helgen. Hon hörde städvagnen gnissla längre bort och ryckte till.",
      "På bänken låg hennes pennfodral. Noor tog det, drog ett djupt andetag och bestämde sig. Hon skulle säga som det var: att hon hade försökt, att hon behövde hjälp, och att hon ville göra en plan.",
    ],
  },
  B: {
    title: "Text B (faktatext)",
    body: [
      "Många pratar om “energi” i vardagen, men energi är egentligen ett sätt att beskriva förmågan att utföra arbete. I samhället använder vi energi till nästan allt: belysning, uppvärmning, transporter och tillverkning.",
      "Energi kan komma från olika källor. Förnybara energikällor, som vindkraft, solenergi och vattenkraft, fylls på naturligt och tar inte slut på samma sätt som fossila bränslen. Fossila bränslen, som kol och olja, bildas under mycket lång tid och räknas därför som icke-förnybara.",
      "När fossila bränslen bränns bildas koldioxid, vilket kan bidra till att jordens temperatur ökar. Därför försöker många länder öka andelen förnybar energi. Samtidigt behöver elnätet kunna leverera el även när det inte blåser eller när solen inte lyser. Det gör att energilagring och smarta lösningar blir viktiga.",
      "En viktig sak är att spara energi. Om man till exempel släcker lampor i rum där ingen är och sänker temperaturen en grad inomhus kan man minska energianvändningen över tid.",
    ],
  },
  C: {
    title: "Text C (argumenterande)",
    body: [
      "Jag tycker att elever i mellanstadiet borde få en kort paus mellan varje längre lektion. Det handlar inte om att slippa arbeta – det handlar om att orka arbeta bättre.",
      "När man sitter länge tappar många fokus. Då blir det svårare att lyssna, och man börjar prata eller tänka på annat. Med en paus på bara tre till fem minuter kan man resa sig, sträcka på sig och hämta ny energi. Det skulle göra att fler kan vara koncentrerade när lektionen fortsätter.",
      "En kort paus kan också göra klassrummet lugnare. Om man får röra på sig lite behöver man inte “sprängas” av rastlöshet mitt i en genomgång. Läraren slipper avbryta lika ofta, och alla sparar tid.",
      "Därför borde skolan införa korta mikropauser. Det är en liten förändring som kan ge bättre arbetsro och bättre resultat.",
    ],
  },
};

const QUESTIONS: Q[] = [
  // =========================
  // TEXT A – 10 frågor
  // =========================
  {
    q: "Text A: Varför stannar Noor kvar i klassrummet när de andra går?",
    choices: [
      "Hon väntar på en kompis",
      "Hon vill undvika att gå hem direkt med omdömet",
      "Hon har glömt sin jacka",
      "Hon ska hjälpa läraren",
    ],
    correct: 1,
    explain:
      "Hon dröjer sig kvar eftersom omdömet känns jobbigt och hon vill skjuta upp att visa det hemma.",
  },
  {
    q: "Text A: Vad ligger i Noors ryggsäck som påverkar henne mycket?",
    choices: ["En present", "En bok", "Ett omdöme", "En mobil"],
    correct: 2,
    explain:
      "Hon tänker på pappret med omdömet och hur det ska tas emot hemma.",
  },
  {
    q: "Text A: Hur beskrivs pappas kommentar “Du kan bättre”?",
    choices: [
      "Som ett skämt",
      "Som argt och högljutt",
      "Som ett lugnt konstaterande som ändå sårar",
      "Som uppmuntrande och peppande",
    ],
    correct: 2,
    explain:
      "Texten säger att det inte var argt, men att det gjorde att man kände sig mindre.",
  },
  {
    q: "Text A: Vad betyder ordet “konstaterande” i sammanhanget?",
    choices: ["Ett löfte", "Ett påstående", "En fråga", "En ursäkt"],
    correct: 1,
    explain:
      "Ett konstaterande är ett sakligt påstående – inte en fråga eller ett löfte.",
  },
  {
    q: "Text A: Varför stoppar Noor pappret “djupare ner” i ryggsäcken?",
    choices: [
      "För att det inte ska bli blött",
      "För att hon skäms och vill undvika att ta fram det",
      "För att hon vill spara det till skolan",
      "För att hon ska lämna det till läraren",
    ],
    correct: 1,
    explain:
      "Hon vill skjuta upp och undvika situationen hemma, så hon gömmer pappret.",
  },
  {
    q: "Text A: Vilken känsla dominerar hos Noor i början av texten?",
    choices: ["Glädje", "Oro", "Ilska", "Stolthet"],
    correct: 1,
    explain:
      "Hon är spänd och orolig över att visa omdömet hemma.",
  },
  {
    q: "Text A: Vilken detalj i texten visar att Noor lätt blir stressad just då?",
    choices: [
      "Hon hör städvagnen och rycker till",
      "Hon går ut på skolgården",
      "Hon skrattar åt en kompis",
      "Hon läser en bok",
    ],
    correct: 0,
    explain:
      "Att hon rycker till av ett vanligt ljud visar att hon är spänd.",
  },
  {
    q: "Text A: Vad är Noors plan mot slutet?",
    choices: [
      "Att riva sönder pappret",
      "Att inte säga något alls",
      "Att säga som det är och be om hjälp + göra en plan",
      "Att skylla på någon annan",
    ],
    correct: 2,
    explain:
      "Hon bestämmer sig för att vara ärlig och be om hjälp.",
  },
  {
    q: "Text A: Vilket tema passar bäst?",
    choices: [
      "Att vinna en tävling",
      "Att hantera förväntningar och våga be om stöd",
      "Att resa bort på lovet",
      "Att hitta en borttappad sak",
    ],
    correct: 1,
    explain:
      "Texten handlar om press, förväntningar och att våga prata om hjälp.",
  },
  {
    q: "Text A: Vad gör texten berättande?",
    choices: [
      "Den listar fakta",
      "Den beskriver händelser och tankar hos en person",
      "Den ger instruktioner steg för steg",
      "Den försöker övertala läsaren",
    ],
    correct: 1,
    explain:
      "Berättande texter har personer, händelser och ofta tankar/känslor.",
  },

  // =========================
  // TEXT B – 8 frågor
  // =========================
  {
    q: "Text B: Vad är textens syfte?",
    choices: ["Underhålla", "Informera", "Övertala", "Berätta en saga"],
    correct: 1,
    explain:
      "Texten är saklig och förklarar energi, energikällor och konsekvenser.",
  },
  {
    q: "Text B: Vad betyder “förnybara energikällor”?",
    choices: [
      "Källor som tar slut snabbt",
      "Källor som fylls på naturligt",
      "Källor som alltid är billiga",
      "Källor som bara finns i Sverige",
    ],
    correct: 1,
    explain:
      "Förnybara källor fylls på av naturen, som vind, sol och vatten.",
  },
  {
    q: "Text B: Vilket är ett exempel på en icke-förnybar energikälla enligt texten?",
    choices: ["Sol", "Vind", "Vatten", "Olja"],
    correct: 3,
    explain:
      "Olja (och kol) är fossila bränslen och räknas som icke-förnybara.",
  },
  {
    q: "Text B: Varför vill många länder öka andelen förnybar energi?",
    choices: [
      "För att förnybar energi alltid är gratis",
      "För att fossila bränslen kan bidra till mer koldioxid och uppvärmning",
      "För att elnätet inte behövs",
      "För att lampor blir starkare",
    ],
    correct: 1,
    explain:
      "Texten kopplar fossila bränslen till koldioxid och klimatpåverkan.",
  },
  {
    q: "Text B: Vilket problem nämns med vind och sol?",
    choices: [
      "De är förbjudna",
      "De fungerar bara på natten",
      "De ger alltid för mycket el",
      "De är beroende av väder och ljus",
    ],
    correct: 3,
    explain:
      "Texten säger att el behövs även när det inte blåser eller är sol.",
  },
  {
    q: "Text B: Vad menas med “energilagring” i textens sammanhang?",
    choices: [
      "Att man sparar el/energi till senare",
      "Att man kastar energi",
      "Att man mäter energi i meter",
      "Att man stänger av elnätet",
    ],
    correct: 0,
    explain:
      "Energilagring betyder att man kan lagra energi och använda den när den behövs.",
  },
  {
    q: "Text B: Vilken av följande är ett exempel på att spara energi enligt texten?",
    choices: [
      "Ha lampor tända i alla rum",
      "Sänka inomhustemperaturen en grad",
      "Ladda mobilen hela natten",
      "Höja temperaturen mycket",
    ],
    correct: 1,
    explain:
      "Texten nämner att sänka temperaturen en grad kan minska användningen.",
  },
  {
    q: "Text B: Hur är språket i texten?",
    choices: ["Sakligt", "Skämtsamt", "Argt", "Poetiskt"],
    correct: 0,
    explain:
      "Faktatexter använder neutralt och sakligt språk.",
  },

  // =========================
  // TEXT C – 7 frågor
  // =========================
  {
    q: "Text C: Vad tycker skribenten att skolan borde införa?",
    choices: [
      "Längre sommarlov",
      "Kort paus mellan längre lektioner",
      "Mindre raster",
      "Fler prov",
    ],
    correct: 1,
    explain:
      "Skribenten vill ha mikropauser på 3–5 minuter mellan längre pass.",
  },
  {
    q: "Text C: Vilket är ett argument i texten?",
    choices: [
      "Jag tycker det är bra.",
      "Det är så det är.",
      "Elever tappar fokus när de sitter länge",
      "Alla andra skolor gör det",
    ],
    correct: 2,
    explain:
      "Argument innehåller skäl – här är skälet att fokus minskar utan paus.",
  },
  {
    q: "Text C: Vilket ord visar tydligt att texten försöker övertyga?",
    choices: ["Kanske", "Därför", "Igår", "Plötsligt"],
    correct: 1,
    explain:
      "“Därför” binder ihop resonemang och leder till slutsats/krav.",
  },
  {
    q: "Text C: Vad menas med “arbetsro” i texten?",
    choices: [
      "Att man arbetar snabbare",
      "Att klassrummet blir lugnare och man kan jobba bättre",
      "Att man jobbar ensam",
      "Att man får fler läxor",
    ],
    correct: 1,
    explain:
      "Arbetsro handlar om lugn och fokus i klassrummet.",
  },
  {
    q: "Text C: Vilken slutsats drar skribenten?",
    choices: [
      "Mikropauser är onödiga",
      "Mikropauser kan ge bättre koncentration och lugnare klassrum",
      "Raster ska tas bort",
      "Elever ska få slippa lektioner",
    ],
    correct: 1,
    explain:
      "Skribenten kopplar mikropauser till fokus och mindre avbrott.",
  },
  {
    q: "Text C: Vad skulle göra argumentationen ännu starkare?",
    choices: [
      "Ett faktaexempel eller en undersökning",
      "Ett skämt",
      "Ett rim",
      "Ett svårare ord",
    ],
    correct: 0,
    explain:
      "Fakta/undersökningar kan stärka argument genom bevis.",
  },
  {
    q: "Text C: Vilken texttyp är Text C?",
    choices: ["Berättande", "Faktatext", "Argumenterande", "Instruktion"],
    correct: 2,
    explain:
      "Texten har tydlig åsikt + argument + slutsats/uppmaning.",
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
            Läs texterna och svara på frågorna. Tryck <b>Rätta</b> längst ner för
            facit + förklaringar.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-2 text-sm text-white/70">
          {answeredCount}/{QUESTIONS.length} svarade
        </div>
      </div>

      {/* TEXTER (berättande + fakta + argument) */}
      <div className="mt-6 space-y-4">
        {(["A", "B", "C"] as const).map((key) => {
          const t = TEXTS[key];
          return (
            <details
              key={key}
              className="rounded-2xl border border-white/10 bg-black/20 p-4"
              open={key === "A"}
            >
              <summary className="cursor-pointer text-sm font-semibold text-white/90">
                {t.title}
              </summary>
              <div className="mt-3 space-y-3 text-sm text-white/70">
                {t.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </details>
          );
        })}
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

            {show && answers[i] !== null && (
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
            Resultat: <span className="font-semibold text-white">{score}</span> /{" "}
            {QUESTIONS.length} • {pct}% •{" "}
            <span className="text-white/70">{level}</span>
          </div>
        )}
      </div>
    </div>
  );
}