import Link from "next/link";

const tools = [
  {
    title: "Betygskalkylator (åk 6–9)",
    desc: "Räkna ut snittbetyg och meritvärde (16 bästa).",
    href: "/betygskalkylator",
    tag: "Populär",
  },
  {
    title: "Skärmtidsrekommendation",
    desc: "Interaktiv rekommendation per ålder.",
    href: "/skarmtid",
    tag: "Ny",
  },
  {
    title: "Matte-test (åk 3)",
    desc: "Quiz med diagnos + resultat.",
    href: "/matte-ak-3",
    tag: "Ny",
  },
  {
    title: "Matte-test (åk 6)",
    desc: "Quiz med svårare nivåer.",
    href: "/matte-ak-6",
    tag: "Ny",
  },
] as const;

export default function ToolsList({
  title = "Fler gratis verktyg",
}: {
  title?: string;
}) {
  return (
    <section className="mt-12">
      <h2 className="text-xl font-semibold text-white/90">{title}</h2>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {tools.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 hover:bg-white/[0.06]"
          >
            <div className="mb-2 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
              {t.tag}
            </div>
            <h3 className="text-lg font-semibold text-white">{t.title}</h3>
            <p className="mt-1 text-sm text-white/65">{t.desc}</p>
            <p className="mt-4 text-sm font-semibold text-white/90">Öppna →</p>
          </Link>
        ))}
      </div>
    </section>
  );
}