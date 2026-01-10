import type { Metadata } from "next";
import Link from "next/link";
import AdSlot from "@/components/AdSlot";
import NationellaProvMatteAk6Quiz from "./NationellaProvMatteAk6Quiz";

export const metadata: Metadata = {
  title: "Nationella prov matte åk 6 – öva med quiz + facit",
  description:
    "Öva inför nationella prov i matematik för åk 6. Procent, bråk, geometri, skala, statistik och sannolikhet – facit direkt.",
};

export default function Page() {
  return (
    <main className="max-w-4xl">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Nationella prov – matte åk 6
          </h1>
          <p className="mt-3 text-white/70">
            Träna vanliga NP-moment: procent, bråk/decimaltal, geometri
            (area/omkrets/volym), skala, enheter, statistik och sannolikhet.
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
          <li>Procent: 10% / 5% / 1% är bästa byggklossarna.</li>
          <li>Bråk/decimaltal: jämför genom att skriva som decimal eller gemensam nämnare.</li>
          <li>Geometri: skriv formeln först (area/omkrets/volym), sätt in värden sen.</li>
          <li>Skala & enheter: byt enhet direkt (cm↔m↔km, g↔kg, ml↔l).</li>
          <li>Statistik: median = mitten, typvärde = vanligast, medel = summa/antal.</li>
        </ul>
      </section>

      {/* Annons */}
      <div className="mt-8">
      <AdSlot className="mb-6" adSlot="3622343285" />
      </div>

      {/* Quiz */}
      <div className="mt-8">
        <NationellaProvMatteAk6Quiz />
      </div>
    </main>
  );
}