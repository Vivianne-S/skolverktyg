import type { Metadata } from "next";
import Link from "next/link";
import AdSlot from "@/components/AdSlot";
import NationellaProvSvenskaAk6Quiz from "./NationellaProvSvenskaAk6Quiz";

export const metadata: Metadata = {
  title: "Nationella prov svenska åk 6 – öva med quiz + facit",
  description:
    "Öva inför nationella prov i svenska för åk 6. Quiz med läsförståelse, grammatik, ordkunskap, texttyper och källkritik – facit direkt.",
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
            Träna på läsförståelse med berättande text, faktatext och argumenterande
            text – plus språk (ordkunskap, ordklasser, skiljetecken) och enkel
            källkritik.
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
          <li>
            <span className="font-semibold text-white/85">Läsförståelse:</span>{" "}
            läs frågan först ibland, leta sedan stöd i texten.
          </li>
          <li>
            <span className="font-semibold text-white/85">Ord i text:</span>{" "}
            använd sammanhanget (meningen före/efter) för att lista ut betydelsen.
          </li>
          <li>
            <span className="font-semibold text-white/85">Texttyp:</span>{" "}
            fråga dig: vill texten berätta, informera eller övertyga?
          </li>
          <li>
            <span className="font-semibold text-white/85">Skiljetecken:</span>{" "}
            punkt avslutar mening, komma används ofta i uppräkningar.
          </li>
          <li>
            <span className="font-semibold text-white/85">Källkritik:</span>{" "}
            jämför källor och lita mer på lärobok/myndighet än rykten.
          </li>
        </ul>
      </section>

      {/* Annons */}
      <div className="mt-8">
      <AdSlot className="mb-6" adSlot="1234567890" />
      </div>

      {/* Quiz */}
      <div className="mt-8">
        <NationellaProvSvenskaAk6Quiz />
      </div>
    </main>
  );
}