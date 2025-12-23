import type { Metadata } from "next";
import Link from "next/link";
import AdSlot from "@/components/AdSlot";
import NationellaProvSvenskaAk6Quiz from "./NationellaProvSvenskaAk6Quiz";

export const metadata: Metadata = {
  title: "Nationella prov svenska åk 6 – öva med quiz + facit",
  description:
    "Öva inför nationella prov i svenska för åk 6. Quiz med grammatik, ordkunskap, texttyper och källkritik – facit direkt.",
};

export default function Page() {
  return (
    <main className="max-w-4xl">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Nationella prov – svenska åk 6
          </h1>
          <p className="mt-3 text-white/70">
            Träna vanliga moment inför nationella: ordklasser, skiljetecken,
            ordkunskap (synonymer/antonymer), texttyper och enkel källkritik.
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
          <li>Ordklasser: lär dig känna igen substantiv, verb och adjektiv.</li>
          <li>Skiljetecken: punkt i slutet, komma i uppräkningar.</li>
          <li>Ord: träna synonymer/antonymer och läs meningar noga.</li>
          <li>Texttyper: fundera på syfte – berätta, informera eller instruera.</li>
          <li>Källkritik: välj hellre lärobok/myndighet än “någon sa…”.</li>
        </ul>
      </section>

      {/* Annons */}
      <div className="mt-8">
        <AdSlot />
      </div>

      {/* Quiz */}
      <div className="mt-8">
        <NationellaProvSvenskaAk6Quiz />
      </div>
    </main>
  );
}