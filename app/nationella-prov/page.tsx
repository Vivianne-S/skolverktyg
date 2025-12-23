import Link from "next/link";

export const metadata = {
  title: "Nationella prov – öva matte (åk 3, 6, 9)",
  description:
    "Öva inför nationella prov med gratis matte-quiz för åk 3, åk 6 och åk 9. Facit och förklaringar direkt.",
};

const items = [
  {
    title: "Matte åk 3 – öva inför nationella",
    desc: "Taluppfattning, +/−, klockan, mått och enkel problemlösning.",
    href: "/nationella-prov/matte-ak-3",
    tag: "Åk 3",
  },
  {
    title: "Matte åk 6 – öva inför nationella",
    desc: "Procent, bråk, geometri, ekvationer och blandad färdighetsträning.",
    href: "/nationella-prov/matte-ak-6",
    tag: "Åk 6",
  },
  {
    title: "Matte åk 9 – öva inför nationella",
    desc: "Algebra, funktioner, geometri, sannolikhet och problemlösning.",
    href: "/nationella-prov/matte-ak-9",
    tag: "Åk 9",
  },
];

export default function Page() {
  return (
    <main className="max-w-4xl">
      <h1 className="text-3xl font-bold tracking-tight text-white">
        Öva inför nationella prov
      </h1>
      <p className="mt-3 text-white/70">
        Välj årskurs så får du ett quiz med facit och förklaringar direkt.
      </p>

      <section className="mt-8 grid gap-4 sm:grid-cols-2">
        {items.map((it) => (
          <Link
            key={it.href}
            href={it.href}
            className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-[0_20px_80px_rgba(0,0,0,0.25)] hover:bg-white/[0.06]"
          >
            <div className="mb-2 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
              {it.tag}
            </div>
            <h2 className="text-lg font-semibold text-white">{it.title}</h2>
            <p className="mt-1 text-sm text-white/65">{it.desc}</p>
            <p className="mt-4 text-sm font-semibold text-white/90">Öppna →</p>
          </Link>
        ))}
      </section>

      <section className="mt-12 rounded-3xl border border-white/10 bg-black/20 p-5">
        <h2 className="text-lg font-semibold text-white/90">Tips för högre poäng</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-white/65">
          <li>Gör quizet utan stress – men skriv gärna mellanberäkningar.</li>
          <li>Läs frågan två gånger: vad frågas det efter?</li>
          <li>När du får fel: läs förklaringen och testa igen direkt.</li>
        </ul>
      </section>
    </main>
  );
}
