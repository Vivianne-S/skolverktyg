import type { Metadata } from "next";
import Link from "next/link";
import AdSlot from "@/components/AdSlot";
import NationellaProvSvenskaAk9Quiz from "./NationellaProvSvenskaAk9Quiz";

export const metadata: Metadata = {
  title: "Nationella prov svenska åk 9 – öva med quiz + facit",
  description:
    "Öva inför nationella prov i svenska för åk 9. Quiz med texttyper, argumentation, källkritik och språkriktighet – facit och förklaringar direkt.",
};

export default function Page() {
  return (
    <main className="max-w-4xl">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Nationella prov – svenska åk 9
          </h1>
          <p className="mt-3 text-white/70">
            Träna på läsförståelse, texttyper, argumentation, källkritik,
            språkriktighet och mottagaranpassning.
          </p>
        </div>

        <Link
          href="/nationella-prov"
          className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/80 hover:bg-white/[0.06]"
        >
          ← Tillbaka
        </Link>
      </div>

      {/* Tips – överst */}
      <section className="mt-8 rounded-3xl border border-white/10 bg-black/20 p-5">
        <h2 className="text-lg font-semibold text-white/90">
          Tips inför nationella
        </h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-white/65">
          <li>Identifiera texttyp och syfte: informera, argumentera, utreda.</li>
          <li>Markera nyckelord och sambandsord (orsak, kontrast, slutsats).</li>
          <li>Skriv/resonera med tes → argument → exempel → slutsats.</li>
          <li>Var källkritisk: avsändare, syfte, tendens, beroende och relevans.</li>
          <li>Mottagaranpassa språket: mer formellt i skolarbete.</li>
        </ul>
      </section>

      <div className="mt-8">
  ´<AdSlot className="mb-6" adSlot="3622343285" />
      </div>

      <div className="mt-8">
        <NationellaProvSvenskaAk9Quiz />
      </div>
    </main>
  );
}