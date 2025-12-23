import type { Metadata } from "next";
import Link from "next/link";
import AdSlot from "@/components/AdSlot";
import NationellaProvMatteAk9Quiz from "./NationellaProvMatteAk9Quiz";

export const metadata: Metadata = {
  title: "Nationella prov matte åk 9 – öva med quiz + facit",
  description:
    "Öva inför nationella prov i matematik för åk 9. 25 frågor med facit och förklaringar direkt.",
};

export default function Page() {
  return (
    <main className="max-w-3xl">
      <nav className="mb-6 text-sm text-white/60">
        <Link href="/" className="hover:text-white">
          Hem
        </Link>
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
        25 frågor som speglar vanliga områden i NP åk 9: algebra, funktioner,
        procent, geometri, statistik och sannolikhet. Du får facit och korta
        förklaringar direkt.
      </p>

      <section className="mt-10 rounded-3xl border border-white/10 bg-white/[0.04] p-5 text-white/70">
        <h2 className="text-lg font-semibold text-white/90">Tips inför provet</h2>
        <ul className="mt-2 list-disc pl-5 space-y-1 text-sm">
          <li>Skriv ut mellanled – ofta ger det poäng även om svaret blir fel.</li>
          <li>Var extra noga med procent (baklänges), enheter och rimlighet.</li>
          <li>Vid ekvationer: samla x-termer för sig och konstanter för sig.</li>
          <li>Vid geometri: skriv formeln först, sätt in värden sen.</li>
          <li>Funktioner: kunna tolka k och m i y = kx + m.</li>
        </ul>
      </section>

      <Link
        href="/nationella-prov"
        className="mt-6 inline-flex rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/80 hover:bg-white/[0.06]"
      >
        ← Tillbaka
      </Link>

      <div className="mt-8">
        <AdSlot label="Annons (placeholder)" />
      </div>

      <div className="mt-8">
        <NationellaProvMatteAk9Quiz />
      </div>
    </main>
  );
}