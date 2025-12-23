"use client";

import { useMemo, useState } from "react";

type Track =
  | "BarnFritid" 
  | "Bygg"
  | "El"
  | "Ekonomi"
  | "Estet"
  | "Fordon"
  | "HotellTurism"
  | "Natur"
  | "RestaurangLivsmedel"
  | "Samhälle"
  | "Teknik"
  | "Vård"
  | "FritidHalsa" 
  | "HandelAdministration"
  | "Humanist"
  | "Industriteknik"
  | "Naturbruk"
  | "RaddningSakerhet"
  | "SjoFart"
  | "VVSFastighet";

type Opt = {
  label: string;
  gives: Partial<Record<Track, number>>;
};

type Q = {
  q: string;
  options: Opt[];
};

const TRACK_LABEL: Record<Track, { title: string; desc: string }> = {
  Natur: {
    title: "Naturvetenskapsprogrammet",
    desc: "Passar ofta om du gillar biologi, kemi, matematik och vill hålla många dörrar öppna.",
  },
  Teknik: {
    title: "Teknikprogrammet",
    desc: "För dig som gillar problemlösning, matematik, teknik/IT och vill kunna bygga/utveckla saker.",
  },
  Samhälle: {
    title: "Samhällsvetenskapsprogrammet",
    desc: "Om du gillar samhälle, människor, medier, historia och att argumentera/analysera.",
  },
  Ekonomi: {
    title: "Ekonomiprogrammet",
    desc: "För dig som gillar företagande, marknadsföring, organisation och att förstå hur pengar och affärer fungerar.",
  },
  Estet: {
    title: "Estetiska programmet",
    desc: "Om du gillar skapande: musik, bild, design, teater, dans eller media/produktion.",
  },
  Humanist: {
    title: "Humanistiska programmet",
    desc: "För dig som gillar språk, kultur, filosofi och att förstå människor och idéer.",
  },
  Bygg: {
    title: "Bygg- och anläggningsprogrammet",
    desc: "För dig som gillar praktiskt arbete, bygga, renovera och se tydliga resultat.",
  },
  El: {
    title: "El- och energiprogrammet",
    desc: "Om du gillar teknik, felsökning, installationer och vill jobba praktiskt med el/energi.",
  },
  Fordon: {
    title: "Fordons- och transportprogrammet",
    desc: "För dig som gillar fordon, mekanik, service och att jobba hands-on.",
  },
  BarnFritid: {
    title: "Barn- och fritidsprogrammet",
    desc: "Om du gillar att arbeta med barn, unga, idrott, fritid och pedagogik.",
  },
  Vård: {
    title: "Vård- och omsorgsprogrammet",
    desc: "Passar ofta om du vill arbeta nära människor och göra skillnad i vardagen – hälsa och omsorg.",
  },
  HotellTurism: {
    title: "Hotell- och turismprogrammet",
    desc: "För dig som gillar service, resor, möten med människor och att skapa bra upplevelser.",
  },
  HandelAdministration: {
    title: "Handels- och administrationsprogrammet",
    desc: "För dig som gillar service, butiksarbete, kundkontakt, försäljning och administration.",
  },
  Industriteknik: {
    title: "Industritekniska programmet",
    desc: "Passar om du gillar teknik, produktion, maskiner och att jobba med tillverkning/industri.",
  },
  Naturbruk: {
    title: "Naturbruksprogrammet",
    desc: "För dig som gillar djur, skog, lantbruk, natur och att arbeta utomhus eller praktiskt med naturresurser.",
  },
  RestaurangLivsmedel: {
    title: "Restaurang- och livsmedelsprogrammet",
    desc: "Om du gillar mat, bakning, service, tempo och att skapa upplevelser för andra.",
  },
  RaddningSakerhet: {
    title: "Räddning och säkerhet (inriktning inom vissa skolor)",
    desc: "Passar om du gillar att hjälpa människor, teamwork, fysisk aktivitet och säkerhetsarbete.",
  },
  SjoFart: {
    title: "Sjöfartsutbildning (vanligtvis inom FT/NB på vissa skolor)",
    desc: "För dig som gillar havet, teknik/service ombord och arbete i maritim miljö.",
  },
  VVSFastighet: {
    title: "VVS- och fastighetsprogrammet",
    desc: "Om du gillar installationer, problemlösning och praktiskt arbete med värme, ventilation och fastighet.",
  },

  FritidHalsa: {
    title: "Fritid & hälsa (inriktning)",
    desc: "Inriktning för dig som gillar idrott, hälsa, ledarskap och att jobba med människor.",
  },
};

const QUESTIONS: Q[] = [
  {
    q: "Vilken typ av uppgift gillar du mest?",
    options: [
      { label: "Lösa logiska problem och klura ut hur saker fungerar", gives: { Teknik: 2, Natur: 1, El: 1, Industriteknik: 1 } },
      { label: "Diskutera samhällsfrågor och förstå människor", gives: { Samhälle: 2, BarnFritid: 1, Ekonomi: 1, Humanist: 1 } },
      { label: "Skapa något kreativt: design, musik, foto, film", gives: { Estet: 2, HotellTurism: 1 } },
      { label: "Jobba praktiskt: bygga, fixa, reparera", gives: { Bygg: 2, Fordon: 1, El: 1, VVSFastighet: 1 } },
    ],
  },
  {
    q: "Vilket skolämne känns oftast roligast?",
    options: [
      { label: "Matte / NO", gives: { Natur: 2, Teknik: 1, Industriteknik: 1 } },
      { label: "SO / svenska", gives: { Samhälle: 2, Ekonomi: 1, Humanist: 1 } },
      { label: "Bild / musik", gives: { Estet: 2 } },
      { label: "Slöjd / teknik", gives: { Teknik: 1, Bygg: 1, El: 1, Industriteknik: 1, VVSFastighet: 1 } },
    ],
  },
  {
    q: "Hur vill du helst jobba?",
    options: [
      { label: "Med människor och hjälpa till", gives: { Vård: 2, BarnFritid: 2, RaddningSakerhet: 1 } },
      { label: "Med siffror, planering och affärer", gives: { Ekonomi: 2, HandelAdministration: 1 } },
      { label: "Med teknik/IT och problemlösning", gives: { Teknik: 2, El: 1, Industriteknik: 1 } },
      { label: "Med händerna och tydliga resultat", gives: { Bygg: 2, Fordon: 2, VVSFastighet: 1 } },
    ],
  },
  {
    q: "Vilken miljö trivs du bäst i?",
    options: [
      { label: "Lugn studiemiljö – läsa, analysera, skriva", gives: { Samhälle: 2, Ekonomi: 1, Humanist: 1 } },
      { label: "Labba/testa – experiment, modeller, data", gives: { Natur: 2, Teknik: 1 } },
      { label: "Verkstad/bygge – praktiskt och rörelse", gives: { Fordon: 2, Bygg: 2, El: 1, Industriteknik: 1, VVSFastighet: 1 } },
      { label: "Service – möta människor, skapa upplevelser", gives: { HotellTurism: 2, Vård: 1, BarnFritid: 1, RestaurangLivsmedel: 1, HandelAdministration: 1 } },
    ],
  },
  {
    q: "Vad låter mest kul som projekt?",
    options: [
      { label: "Bygga en app eller robot", gives: { Teknik: 2, Natur: 1 } },
      { label: "Starta ett litet företag/koncept", gives: { Ekonomi: 2, HotellTurism: 1, HandelAdministration: 1 } },
      { label: "Göra en film/podd eller en utställning", gives: { Estet: 2, Samhälle: 1, Humanist: 1 } },
      { label: "Renovera/bygga något som står kvar", gives: { Bygg: 2, El: 1, VVSFastighet: 1 } },
    ],
  },
  {
    q: "Vilket påstående stämmer bäst?",
    options: [
      { label: "Jag vill hålla många vägar öppna för framtiden", gives: { Natur: 2, Teknik: 1, Samhälle: 1, Ekonomi: 1, Humanist: 1 } },
      { label: "Jag vill snabbt få ett praktiskt yrke", gives: { Bygg: 2, El: 2, Fordon: 2, Vård: 1, VVSFastighet: 1, Industriteknik: 1, RestaurangLivsmedel: 1, HandelAdministration: 1, Naturbruk: 1 } },
      { label: "Jag vill jobba kreativt och uttrycka mig", gives: { Estet: 2 } },
      { label: "Jag vill jobba nära människor", gives: { Vård: 2, BarnFritid: 2, HotellTurism: 1, RaddningSakerhet: 1 } },
    ],
  },
  {
    q: "Hur känns matte för dig oftast?",
    options: [
      { label: "Kul – jag gillar att räkna och förstå", gives: { Natur: 2, Teknik: 2, Ekonomi: 1 } },
      { label: "Okej – men jag vill använda matte praktiskt", gives: { Teknik: 1, El: 1, Bygg: 1, Fordon: 1, VVSFastighet: 1, Industriteknik: 1 } },
      { label: "Inte favorit – jag vill inte ha för mycket matte", gives: { Estet: 1, Vård: 1, BarnFritid: 1, HotellTurism: 1, RestaurangLivsmedel: 1, HandelAdministration: 1, Naturbruk: 1 } },
      { label: "Beror på – om det känns relevant blir det roligare", gives: { Ekonomi: 1, Samhälle: 1, Teknik: 1, Vård: 1 } },
    ],
  },
  {
    q: "Vad driver dig mest?",
    options: [
      { label: "Att hjälpa andra och göra skillnad", gives: { Vård: 2, BarnFritid: 2, Samhälle: 1, RaddningSakerhet: 1 } },
      { label: "Att skapa/uttrycka mig kreativt", gives: { Estet: 2, HotellTurism: 1 } },
      { label: "Att bygga/fixa och se resultat direkt", gives: { Bygg: 2, El: 1, Fordon: 1, VVSFastighet: 1, Industriteknik: 1 } },
      { label: "Att lösa svåra problem och utvecklas", gives: { Teknik: 2, Natur: 1 } },
    ],
  },
  {
    q: "Vilken arbetsstil passar dig bäst?",
    options: [
      { label: "Jag gillar tydliga instruktioner och rutiner", gives: { Vård: 1, BarnFritid: 1, Bygg: 1, El: 1, Fordon: 1, VVSFastighet: 1, Industriteknik: 1 } },
      { label: "Jag gillar frihet att testa egna idéer", gives: { Estet: 2, Teknik: 1, Samhälle: 1, Humanist: 1 } },
      { label: "Jag gillar att planera, organisera och få saker i mål", gives: { Ekonomi: 2, HotellTurism: 1, HandelAdministration: 1 } },
      { label: "Jag gillar att undersöka, analysera och fördjupa mig", gives: { Natur: 2, Samhälle: 1, Humanist: 1 } },
    ],
  },
  {
    q: "Vilken typ av framtid lockar mest?",
    options: [
      { label: "Plugga vidare på universitet/högskola", gives: { Natur: 2, Teknik: 2, Samhälle: 2, Ekonomi: 1, Humanist: 1 } },
      { label: "Komma ut i jobb snabbare med yrkeskunskap", gives: { Bygg: 2, El: 2, Fordon: 2, Vård: 1, HotellTurism: 1, VVSFastighet: 1, Industriteknik: 1, RestaurangLivsmedel: 1, HandelAdministration: 1, Naturbruk: 1 } },
      { label: "Jobba kreativt/projektbaserat", gives: { Estet: 2, Teknik: 1 } },
      { label: "Kunna starta eget eller jobba med affärer", gives: { Ekonomi: 2, HotellTurism: 1, Bygg: 1, HandelAdministration: 1 } },
    ],
  },
  {
    q: "Vad tycker du om att jobba med människor hela dagen?",
    options: [
      { label: "Jag älskar det – energi av att träffa människor", gives: { HotellTurism: 2, BarnFritid: 2, Vård: 2, RestaurangLivsmedel: 1, HandelAdministration: 1 } },
      { label: "Gillar det, men vill också ha lugna stunder", gives: { Samhälle: 1, Ekonomi: 1, Vård: 1, HotellTurism: 1 } },
      { label: "Helst mindre – jag trivs bättre med teknik/uppgifter", gives: { Teknik: 2, Natur: 1, El: 1, Fordon: 1, Industriteknik: 1 } },
      { label: "Beror på – om det är ett team med bra vibe", gives: { Teknik: 1, Bygg: 1, HotellTurism: 1, Samhälle: 1 } },
    ],
  },
  {
    q: "Vilket låter mest som en 'bra dag' för dig?",
    options: [
      { label: "Felsöka/bygga något som funkar bättre efteråt", gives: { Teknik: 2, El: 2, Fordon: 1, Industriteknik: 1, VVSFastighet: 1 } },
      { label: "Renovera/bygga/montera och se det växa fram", gives: { Bygg: 2, El: 1, VVSFastighet: 1 } },
      { label: "Hjälpa någon som behöver stöd", gives: { Vård: 2, BarnFritid: 2, RaddningSakerhet: 1 } },
      { label: "Skapa upplevelse: service, event, mat, bemötande", gives: { HotellTurism: 2, Ekonomi: 1, RestaurangLivsmedel: 1, HandelAdministration: 1 } },
    ],
  },
  {
    q: "Vilken typ av plats trivs du bäst på?",
    options: [
      { label: "Lab/klassrum där man testar och räknar", gives: { Natur: 2, Teknik: 1 } },
      { label: "Verkstad/garage med verktyg och maskiner", gives: { Fordon: 2, El: 1, Teknik: 1, Industriteknik: 1, VVSFastighet: 1 } },
      { label: "Bygge/arbetsplats där man är i rörelse", gives: { Bygg: 2, El: 1, VVSFastighet: 1 } },
      { label: "Miljö där man jobbar med människor och relationer", gives: { Vård: 2, BarnFritid: 2, Samhälle: 1 } },
    ],
  },
  {
    q: "Om du får välja, vilket 'ansvar' låter mest intressant?",
    options: [
      { label: "Ansvara för teknik/IT-lösningar", gives: { Teknik: 2, El: 1, Industriteknik: 1 } },
      { label: "Ansvara för ekonomi/planering/budget", gives: { Ekonomi: 2, HandelAdministration: 1 } },
      { label: "Ansvara för trygghet och omsorg", gives: { Vård: 2, BarnFritid: 2, RaddningSakerhet: 1 } },
      { label: "Ansvara för kvalitet och hantverk", gives: { Bygg: 2, Fordon: 1, El: 1, VVSFastighet: 1 } },
    ],
  },
  {
    q: "Hur viktigt är kreativt skapande i ditt liv?",
    options: [
      { label: "Superviktigt – jag vill göra kreativa saker varje vecka", gives: { Estet: 2, HotellTurism: 1 } },
      { label: "Lite viktigt – jag vill ha variation", gives: { Samhälle: 1, Teknik: 1, Estet: 1, Humanist: 1 } },
      { label: "Inte så viktigt – jag vill hellre bygga/fixa", gives: { Bygg: 1, El: 1, Fordon: 1, Teknik: 1, VVSFastighet: 1, Industriteknik: 1 } },
      { label: "Inte viktigt – jag vill fokusera på fakta/analys", gives: { Natur: 2, Ekonomi: 1, Samhälle: 1, Humanist: 1 } },
    ],
  },
  {
    q: "Vad passar dig bäst när du lär dig något nytt?",
    options: [
      { label: "Se exempel och sedan testa själv", gives: { Teknik: 2, Natur: 1, El: 1, Industriteknik: 1 } },
      { label: "Prata och diskutera – jag lär mig genom dialog", gives: { Samhälle: 2, BarnFritid: 1, HotellTurism: 1, Humanist: 1 } },
      { label: "Göra praktiskt direkt (hands-on)", gives: { Bygg: 2, Fordon: 2, El: 1, VVSFastighet: 1, Naturbruk: 1 } },
      { label: "Öva stegvis och få tydlig feedback", gives: { Ekonomi: 1, Vård: 1, Natur: 1, HandelAdministration: 1 } },
    ],
  },
  {
    q: "Vilket känns mest sant för dig?",
    options: [
      { label: "Jag gillar att läsa, skriva och diskutera", gives: { Samhälle: 2, Humanist: 2, Ekonomi: 1 } },
      { label: "Jag gillar att bygga, meka eller arbeta praktiskt", gives: { Bygg: 2, Fordon: 2, El: 1, VVSFastighet: 1 } },
      { label: "Jag gillar att ta hand om eller stötta andra", gives: { Vård: 2, BarnFritid: 2, RaddningSakerhet: 1 } },
      { label: "Jag gillar att skapa/framföra/uttrycka mig", gives: { Estet: 2, HotellTurism: 1, RestaurangLivsmedel: 1 } },
    ],
  },
  {
    q: "Vad lockar mest med framtida jobb?",
    options: [
      { label: "Hög lön / karriärmöjligheter på sikt", gives: { Teknik: 2, Ekonomi: 2, Natur: 1 } },
      { label: "Tryggt jobb där jag hjälper människor", gives: { Vård: 2, BarnFritid: 2, RaddningSakerhet: 1 } },
      { label: "Varierande jobb och mycket rörelse", gives: { Bygg: 2, Fordon: 2, HotellTurism: 1 } },
      { label: "Jag vill jobba med något jag älskar (passion)", gives: { Estet: 2, Naturbruk: 1, RestaurangLivsmedel: 1 } },
    ],
  },
];

function addScores(base: Record<Track, number>, delta: Partial<Record<Track, number>>) {
  for (const k of Object.keys(delta) as Track[]) {
    base[k] += delta[k] ?? 0;
  }
}

export default function GymnasievalQuiz() {
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(QUESTIONS.length).fill(null)
  );
  const [show, setShow] = useState(false);

  const answeredCount = useMemo(
    () => answers.filter((a) => a !== null).length,
    [answers]
  );

  const result = useMemo(() => {
    const scores: Record<Track, number> = {
      Natur: 0,
      Teknik: 0,
      Samhälle: 0,
      Ekonomi: 0,
      Estet: 0,
      Vård: 0,
      Bygg: 0,
      El: 0,
      Fordon: 0,
      BarnFritid: 0,
      HotellTurism: 0,
      HandelAdministration: 0,
      Humanist: 0,
      Industriteknik: 0,
      Naturbruk: 0,
      RestaurangLivsmedel: 0,
      RaddningSakerhet: 0,
      SjoFart: 0,
      VVSFastighet: 0,
      FritidHalsa: 0,
    };

    answers.forEach((a, i) => {
      if (a === null) return;
      addScores(scores, QUESTIONS[i].options[a].gives);
    });

    const ranked = (Object.keys(scores) as Track[])
      .map((k) => ({ track: k, score: scores[k] }))
      .sort((a, b) => b.score - a.score);

    return { scores, ranked, top3: ranked.slice(0, 3) };
  }, [answers]);

  const scoreSum = useMemo(() => {
    if (!show) return 0;
    let total = 0;
    for (const k of Object.keys(result.scores) as Track[]) total += result.scores[k];
    return total;
  }, [result, show]);

  const canShow = answeredCount > 0;

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.25)]">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-white/90">
            Gymnasieval – hitta rätt program
          </h2>
          <p className="mt-1 text-sm text-white/60">
            Svara på frågorna och få topp 3 förslag. (Det här är en hjälp – inte ett facit.)
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-2 text-sm text-white/70">
          {answeredCount}/{QUESTIONS.length} svarade
        </div>
      </div>

      {/* Questions */}
      <div className="mt-6 space-y-5">
        {QUESTIONS.map((q, qi) => (
          <div
            key={q.q}
            className="rounded-2xl border border-white/10 bg-black/20 p-4"
          >
            <p className="font-medium text-white/90">
              {qi + 1}. {q.q}
            </p>

            <div className="mt-3 grid gap-2">
              {q.options.map((o, oi) => {
                const selected = answers[qi] === oi;
                return (
                  <button
                    key={o.label}
                    type="button"
                    onClick={() => {
                      setShow(false);
                      setAnswers((prev) => {
                        const next = [...prev];
                        next[qi] = oi;
                        return next;
                      });
                    }}
                    className={[
                      "rounded-2xl border px-4 py-3 text-left text-sm transition",
                      "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]",
                      selected ? "border-white/25 bg-white/[0.08]" : "",
                    ].join(" ")}
                  >
                    {o.label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="mt-6 flex flex-wrap items-center gap-2">
        <button
          type="button"
          disabled={!canShow}
          onClick={() => setShow(true)}
          className={[
            "rounded-2xl px-4 py-2 text-sm font-semibold",
            canShow
              ? "bg-white text-black hover:opacity-90"
              : "cursor-not-allowed bg-white/20 text-white/50",
          ].join(" ")}
        >
          Visa resultat
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
            Totalt poäng: <span className="font-semibold text-white">{scoreSum}</span>
          </div>
        )}
      </div>

      {/* Result */}
      {show && (
        <div className="mt-6 space-y-4">
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <p className="font-semibold text-white/90">Topp 3 förslag</p>
            <p className="mt-1 text-sm text-white/65">
              1 = bäst match just nu baserat på dina svar.
            </p>

            <div className="mt-4 grid gap-3">
              {result.top3.map((t, idx) => (
                <div
                  key={t.track}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm text-white/60">
                        #{idx + 1}
                      </p>
                      <p className="font-semibold text-white">
                        {TRACK_LABEL[t.track]?.title ?? t.track}
                      </p>
                    </div>
                    <p className="text-sm text-white/60">Poäng: {t.score}</p>
                  </div>

                  <p className="mt-2 text-sm text-white/70">
                    {TRACK_LABEL[t.track]?.desc ?? "—"}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <details className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <summary className="cursor-pointer text-sm font-semibold text-white">
              Visa alla poäng
            </summary>
            <div className="mt-3 grid gap-2">
              {result.ranked.map((r) => (
                <div
                  key={r.track}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-white/80">
                    {TRACK_LABEL[r.track]?.title ?? r.track}
                  </span>
                  <span className="text-white/60">{r.score}</span>
                </div>
              ))}
            </div>
          </details>

          <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/70">
            <p className="font-semibold text-white/90">Tips inför val</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Kolla kurserna (inte bara programnamnet) – det skiljer mellan skolor.</li>
              <li>Gå på öppet hus och prata med elever/lärare.</li>
              <li>Prata med SYV och jämför “högskoleförberedande” vs “yrkesprogram”.</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}