import type { Metadata } from "next";
import Link from "next/link";
import AdSlot from "@/components/AdSlot";
import MatteAk9Quiz from "@/app/matte-ak-9/MatteAk9Quiz";
import NationellaProvMatteAk9Quiz from "./NationellaProvMatteAk9Quiz";

export const metadata: Metadata = {
  title: "Nationella prov matte åk 9 – öva med quiz + facit",
  description:
    "Öva inför nationella prov i matematik för åk 9. Quiz med facit och förklaringar direkt.",
};


export default function Page() {
  return (
    <main className="max-w-3xl">
      <nav className="mb-6 text-sm text-white/60">
        <Link href="/" className="hover:text-white">Hem</Link>
        <span className="mx-2">/</span>
        <Link href="/nationella-prov" className="hover:text-white">
          Nationella prov
        </Link>
        <span className="mx-2">/</span>
        <span className="text-white/80">Matte åk 9</span>
      </nav>

      <h1 className="text-3xl font-bold tracking-tight text-white">
        Nationella prov – matte åk 9 (övningsquiz)
      </h1>
      <p className="mt-3 text-white/70">
        Ett snabb-quiz som tränar vanliga områden som kommer upp i åk 9.
        Du får facit och förklaringar direkt.
      </p>

      <section className="mt-10 rounded-3xl border border-white/10 bg-white/[0.04] p-5 text-white/70">
        <h2 className="text-lg font-semibold text-white/90">Tips inför provet</h2>
        <ul className="mt-2 list-disc pl-5 space-y-1 text-sm">
          <li>Träna på att skriva ut mellanled (inte bara svaret).</li>
          <li>Var noggrann med enheter, procent och bråk.</li>
          <li>Rimlighetsbedöm: “låter svaret rimligt?”</li>
        </ul>
      </section>

      <Link
          href="/nationella-prov"
          className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/80 hover:bg-white/[0.06]"
        >
          ← Tillbaka
        </Link>

      <div className="mt-8">
  <AdSlot className="mb-6" label="Annons (placeholder)" />
  <NationellaProvMatteAk9Quiz />
</div>


    </main>
  );
}
