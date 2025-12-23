import type { Metadata } from "next";
import Link from "next/link";
import AdSlot from "@/components/AdSlot";
import NationellaProvMatteAk3Quiz from "./NationellaProvMatteAk3Quiz";

export const metadata: Metadata = {
  title: "Nationella prov matte åk 3 – öva med quiz + facit",
  description:
    "Öva inför nationella prov i matematik för åk 3. Quiz med facit och förklaringar direkt.",
};

export default function Page() {
  return (
    <main className="max-w-4xl">
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
        <section className="mt-10 rounded-3xl border border-white/10 bg-black/20 p-5">
  <h2 className="text-lg font-semibold text-white/90">
    Tips inför nationella
  </h2>
  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-white/65">
    <li>Taluppfattning: träna hundratal/tiotal/ental och jämför tal.</li>
    <li>Addition/subtraktion: räkna i steg (t.ex. −20 och sen −8).</li>
    <li>Textuppgifter: stryk under viktiga ord och skriv en räknesats.</li>
    <li>Klockan: “halv tre” = 2:30 (halvvägs till tre).</li>
    <li>Mått: 1 m = 100 cm. Skriv alltid enheten i svaret.</li>
    <li>Bråk (grund): 1/2 är större än 1/4 (mindre nämnare ⇒ större del).</li>
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
        <NationellaProvMatteAk3Quiz />
      </div>

    </main>
  );
}