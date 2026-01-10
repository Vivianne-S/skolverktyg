import type { Metadata } from "next";
import Link from "next/link";
import AdSlot from "@/components/AdSlot";
import EnglishAk9Quiz from "./EnglishAk9Quiz";

export const metadata: Metadata = {
  title: "Nationella prov engelska åk 9 – öva med quiz + facit",
  description:
    "Öva inför nationella prov i engelska för åk 9. Övningsquiz i NP-stil med facit och korta förklaringar direkt.",
};

export default function Page() {
  return (
    <main className="max-w-4xl">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Nationella prov – engelska åk 9
          </h1>
          <p className="mt-3 text-white/70">
            Övningsquiz i NP-stil – reading,
            grammar, vocabulary och functional language. Facit direkt efter rättning.
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
          <li>Reading: leta efter evidence i texten (inte gissa på magkänsla).</li>
          <li>Grammar: past simple vs present perfect, conditionals, comparisons.</li>
          <li>Vocabulary: jobba med synonymer/motsatser och vanliga uttryck.</li>
          <li>Writing: använd linking words (however/therefore/because/although).</li>
          <li>Pragmatics: välj ton (formal/informal) beroende på mottagare.</li>
        </ul>
      </section>

      {/* Annons + quiz */}
      <div className="mt-8">
      <AdSlot className="mb-6" adSlot="3622343285" />
        <EnglishAk9Quiz />
      </div>
    </main>
  );
}