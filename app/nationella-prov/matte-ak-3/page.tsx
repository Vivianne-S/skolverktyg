import type { Metadata } from "next";
import Link from "next/link";
import AdSlot from "@/components/AdSlot";
import NationellaProvMatteAk3Quiz from "./NationellaProvMatteAk3Quiz";

export const metadata: Metadata = {
  title: "Nationella prov matte åk 3 – öva med quiz + facit",
  description:
    "Öva inför nationella prov i matematik för åk 3. Övningsquiz i NP-stil med facit och förklaringar direkt.",
};

export default function Page() {
  return (
    <main className="max-w-4xl">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Nationella prov – matte åk 3
          </h1>
          <p className="mt-3 text-white/70">
            Övningsquiz i NP-stil (inte riktiga provfrågor) – med facit och korta
            förklaringar.
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
          <li>Taluppfattning: hundratal/tiotal/ental och jämför tal.</li>
          <li>
            Addition/subtraktion: räkna i steg och kontrollera med “baklänges”.
          </li>
          <li>Textuppgifter: stryk under viktiga ord och skriv en räknesats.</li>
          <li>Klockan: hel/halv/kvart och räkna minuter till nästa hel timme.</li>
          <li>
            Mått: 1 m = 100 cm, 1 l = 10 dl. Skriv alltid enheten i svaret.
          </li>
          <li>Bråk (grund): “delar av en hel” (t.ex. 3 av 8 = 3/8).</li>
        </ul>
      </section>

      {/* Annons + quiz */}
      <div className="mt-8">
        <AdSlot className="mb-6" label="Annons (placeholder)" />
        <NationellaProvMatteAk3Quiz />
      </div>
    </main>
  );
}