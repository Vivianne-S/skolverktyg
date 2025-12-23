import type { Metadata } from "next";
import AdSlot from "@/components/AdSlot";
import MatteAk3Quiz from "./MatteAk3Quiz";

export const metadata: Metadata = {
  title: "Matte-test åk 3 – diagnos (quiz) + tips",
  description:
    "Gratis matte-test för åk 3. Snabb diagnos med facit och tips på träning.",
};

export default function Page() {
  return (
    <main className="max-w-3xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Matte-test (åk 3)
        </h1>
        <p className="mt-3 text-white/70">
          Gör quizet och få en snabb indikation på nivå + tips.
        </p>
      </div>

      {/* Tips – överst  */}
      <section className="mb-8 rounded-3xl border border-white/10 bg-black/20 p-5">
        <h2 className="text-lg font-semibold text-white/90">Tips för åk 3</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-white/65">
          <li>
            <span className="font-semibold text-white/85">Taluppfattning:</span>{" "}
            träna hundratal/tiotal/ental (t.ex. 346 = 300 + 40 + 6).
          </li>
          <li>
            <span className="font-semibold text-white/85">Addition/Subtraktion:</span>{" "}
            räkna i steg (−20 sen −8), och kontrollera med plus.
          </li>
          <li>
            <span className="font-semibold text-white/85">Gånger:</span>{" "}
            öva 2-, 5- och 10-tabellen lite varje dag.
          </li>
          <li>
            <span className="font-semibold text-white/85">Klockan:</span>{" "}
            “halv tre” = 2:30 (halvvägs till tre).
          </li>
          <li>
            <span className="font-semibold text-white/85">Mått:</span>{" "}
            1 m = 100 cm. Skriv upp enheten innan du svarar.
          </li>
          <li>
            <span className="font-semibold text-white/85">Strategi:</span>{" "}
            låt eleven säga högt hur den tänker – det ger snabbast utveckling.
          </li>
        </ul>
      </section>

      {/* Annons */}
      <div className="mb-8">
      <AdSlot className="mb-6" adSlot="1234567890" />
      </div>

      {/* Quiz */}
      <MatteAk3Quiz />

      {/* Annons */}
      <div className="mt-8">
      <AdSlot className="mb-6" adSlot="1234567890" />
      </div>
    </main>
  );
}