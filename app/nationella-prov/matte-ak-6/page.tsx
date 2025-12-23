import type { Metadata } from "next";
import Link from "next/link";
import AdSlot from "@/components/AdSlot";
import NationellaProvMatteAk6Quiz from "./NationellaProvMatteAk6Quiz";

export const metadata: Metadata = {
  title: "Nationella prov matte åk 9 – öva med quiz + facit",
  description:
    "Öva inför nationella prov i matematik för åk 9. Algebra, geometri, skala, statistik och sannolikhet – facit direkt.",
};

export default function Page() {
  return (
    <main className="max-w-4xl">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Nationella prov – matte åk 9
          </h1>
          <p className="mt-3 text-white/70">
            Träna vanliga NP-moment: algebra (uttryck/ekvationer), procent,
            geometri (area/omkrets/volym), skala, statistik och sannolikhet.
          </p>
        </div>

      <section className="mt-10 rounded-3xl border border-white/10 bg-black/20 p-5">
        <h2 className="text-lg font-semibold text-white/90">
          Tips inför nationella
        </h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-white/65">
          <li>Algebra: förenkla steg för steg och håll koll på minus.</li>
          <li>Procent: jobba med 80% = 0,8, 25% = 0,25 osv.</li>
          <li>Geometri: skriv formeln först, sätt in värden sen.</li>
          <li>Skala: 1 cm på kartan → verklig sträcka med enhetsbyte.</li>
          <li>Statistik: typvärde/median/medelvärde – vad betyder vad.</li>
        </ul>
      </section>
      

        <Link
          href="/nationella-prov"
          className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/80 hover:bg-white/[0.06]"
        >
          ← Tillbaka
        </Link>
      </div>

      <div className="mt-8">
        <AdSlot className="mb-6" label="Annons (placeholder)" />
        <NationellaProvMatteAk6Quiz />
      </div>

    </main>
  );
}