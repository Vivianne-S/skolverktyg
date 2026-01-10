import type { Metadata } from "next";
import Link from "next/link";
import AdSlot from "@/components/AdSlot";
import NationellaProvSvenskaAk3Quiz from "./NationellaProvSvenskaAk3Quiz";

export const metadata: Metadata = {
  title: "Nationella prov svenska åk 3 – öva med quiz + facit",
  description:
    "Öva inför nationella prov i svenska för åk 3. Stavning, grammatik, läsförståelse och språkförståelse med facit.",
};

export default function Page() {
  return (
    <main className="max-w-4xl">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Nationella prov – svenska åk 3
          </h1>
          <p className="mt-3 text-white/70">
            Träna inför nationella prov i svenska. Quiz med stavning,
            grammatik, ordkunskap och tydliga förklaringar.
          </p>
        </div>

        <Link
          href="/nationella-prov"
          className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/80 hover:bg-white/[0.06]"
        >
          ← Tillbaka
        </Link>
      </div>

      {/* ✅ TIPS – LÄNGST UPP */}
      <section className="mt-8 rounded-3xl border border-white/10 bg-black/20 p-5">
        <h2 className="text-lg font-semibold text-white/90">
          Tips inför nationella
        </h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-white/65">
          <li>Läs varje mening långsamt och noggrant.</li>
          <li>Tänk: stor bokstav i början och punkt på slutet.</li>
          <li>Fundera på om ordet är verb, substantiv eller adjektiv.</li>
          <li>Om du är osäker – välj det alternativ som låter mest korrekt.</li>
        </ul>
      </section>

      {/* Annons */}
      <div className="mt-8">
      <AdSlot className="mb-6" adSlot="3622343285" />
      </div>

      {/* ✅ QUIZ – MITTEN */}
      <div className="mt-8">
        <NationellaProvSvenskaAk3Quiz />
      </div>
    </main>
  );
}