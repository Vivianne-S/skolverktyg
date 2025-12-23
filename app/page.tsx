import Link from "next/link";
import FaqSchema from "@/components/FaqSchema";

export const metadata = {
  title: "Gratis skolverktyg – betyg, matte & studiestöd",
  description:
    "Gratis verktyg för elever och föräldrar: betygskalkylator, matte-test, skärmtid och studiestöd.",
};

const tools = [
  {
    title: "Betygskalkylator (åk 6–9)",
    desc: "Räkna ut snittbetyg och meritvärde (16 bästa).",
    href: "/betygskalkylator",
    tag: "Populär",
  },
  {
    title: "Skärmtidsrekommendation",
    desc: "Interaktiv rekommendation per ålder + tips.",
    href: "/skarmtid",
    tag: "Ny",
  },
  {
    title: "Matte-test (åk 3)",
    desc: "Snabb diagnos (quiz) + facit.",
    href: "/matte-ak-3",
    tag: "Ny",
  },
  {
    title: "Matte-test (åk 6)",
    desc: "Diagnos (quiz) + tips på träning.",
    href: "/matte-ak-6",
    tag: "Ny",
  },
  {
    title: "Matte-test (åk 9)",
    desc: "Förberedande quiz inför högstadiet + facit.",
    href: "/matte-ak-9",
    tag: "Ny",
  },
  {
    title: "Nationella prov – matte",
    desc: "Öva på provliknande frågor per årskurs.",
    href: "/nationella-prov",
    tag: "Ny",
  },
  {
    title: "Gymnasieval-quiz",
    desc: "Hjälp för elever att hitta rätt inriktning.",
    href: "/gymnasieval",
    tag: "Ny",
  },
] as const;

const faqItems = [
  { q: "Är Skolverktyg gratis?", a: "Ja, verktygen är gratis att använda." },
  {
    q: "Hur funkar betygskalkylatorn?",
    a: "Du skriver in betyg A–F, verktyget räknar ut snittbetyg och meritvärde (16 bästa).",
  },
  {
    q: "Kommer fler quiz och prov?",
    a: "Yes! Vi fyller på med fler årskurser, nationella-prov-övningar och mer.",
  },
];

export default function Home() {
  return (
    <main>
      <section className="max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight">
          <span className="bg-gradient-to-r from-indigo-300 via-white to-emerald-200 bg-clip-text text-transparent">
            Gratis skolverktyg
          </span>
        </h1>
        <p className="mt-3 text-white/70">
          Verktyg som hjälper elever och föräldrar – snabba, tydliga och gratis.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {["Skolverktyg för elever", "Mobilvänligt", "Snabb laddning"].map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
            >
              {t}
            </span>
          ))}
        </div>
      </section>

      <section className="mt-10 grid gap-4 sm:grid-cols-2">
        {tools.map((t) => (
          <Link
            key={t.title}
            href={t.href}
            className="group rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-[0_20px_80px_rgba(0,0,0,0.25)] hover:bg-white/[0.06] transition"
          >
            <div className="mb-2 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
              {t.tag}
            </div>
            <h2 className="text-lg font-semibold text-white">{t.title}</h2>
            <p className="mt-1 text-sm text-white/65">{t.desc}</p>
            <p className="mt-4 text-sm font-semibold text-white/90 group-hover:translate-x-0.5 transition">
              Öppna →
            </p>
          </Link>
        ))}
      </section>

      <section className="mt-12 max-w-3xl">
        <h2 className="text-xl font-semibold text-white/90">Verktyg för skola, matte och betyg</h2>
        <p className="mt-2 text-white/65">
          Här samlar vi verktyg som många googlar varje dag – betygskalkylator, matte-test och
          skärmtidsrekommendationer. Målet är att göra det lättare att planera, räkna och förstå.
        </p>
      </section>

      <section className="mt-10 max-w-3xl">
        <h2 className="text-xl font-semibold text-white/90">Vanliga frågor</h2>
        <div className="mt-4 space-y-3">
          {faqItems.map((it, idx) => (
            <details
              key={idx}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-4 text-white/80"
            >
              <summary className="cursor-pointer font-medium text-white/90">{it.q}</summary>
              <p className="mt-2 text-sm text-white/65">{it.a}</p>
            </details>
          ))}
        </div>
      </section>

      <FaqSchema items={faqItems} />
    </main>
  );
}