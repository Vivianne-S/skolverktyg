import type { Metadata } from "next";
import Link from "next/link";
import AdSlot from "@/components/AdSlot";
import EnglishAk6Quiz from "./EnglishAk6Quiz";

export const metadata: Metadata = {
  title: "Nationella prov engelska åk 6 – öva med quiz + facit",
  description:
    "Öva inför nationella prov i engelska för åk 6. Övningsquiz i NP-stil med facit och korta förklaringar direkt.",
};

export default function Page() {
  return (
    <main className="max-w-4xl">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Nationella prov – engelska åk 6
          </h1>
          <p className="mt-3 text-white/70">
            Övningsquiz i NP-stil – reading,
            grammar och everyday English. Du får facit direkt.
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
          <li>Läs texten två gånger: först helhet, sen detaljer.</li>
          <li>Träna frågeord: what/where/when/why/how.</li>
          <li>Grammar basics: I am / he is / they are, have/has, do/does.</li>
          <li>Ordförråd: synonymer/motsatsord + vardagsfraser.</li>
          <li>Lyssna-känsla: följ instruktioner (“circle”, “underline”, “put … under”).</li>
        </ul>
      </section>

      {/* Annons + quiz */}
      <div className="mt-8">
      <AdSlot className="mb-6" adSlot="3622343285" />
        <EnglishAk6Quiz />
      </div>
    </main>
  );
}