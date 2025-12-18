import type { Metadata } from "next";
import AdSlot from "@/components/AdSlot";
import Calculator from "@/components/Calculator";
import FAQ from "@/components/FAQ";
import FaqSchema from "@/components/FaqSchema";

export const metadata: Metadata = {
  title: "Betygskalkylator (åk 6–9) – snittbetyg & meritvärde",
  description:
    "Gratis betygskalkylator för åk 6–9. Räkna snittbetyg och meritvärde (16 bästa, max 320) enligt Skolverkets modell.",
};

const faqItems = [
  {
    q: "Hur många betyg räknas i meritvärdet?",
    a: "I grundskolan räknas normalt de 16 bästa betygen ihop till ett meritvärde (max 320 poäng).",
  },
  {
    q: "Kan jag skriva in fler än 16 betyg?",
    a: "Ja. Verktyget väljer automatiskt de 16 bästa betygen när meritvärdet räknas ut.",
  },
  {
    q: "Vad händer om jag skriver fel bokstav?",
    a: "Om betyget inte är A–F ignoreras det i beräkningen.",
  },
];

export default function Page() {
  return (
    <main className="max-w-3xl">
      <h1 className="text-3xl font-bold tracking-tight text-white">
        Betygskalkylator för åk 6–9
      </h1>
      <p className="mt-3 text-white/70">
        Ange dina betyg (A–F) så räknar verktyget ut ditt snittbetyg och
        meritvärde. Meritvärdet baseras på de 16 bästa betygen (max 320).
      </p>

      <div className="mt-6">
        <AdSlot label="Annons (topp) (AdSense kommer här)" />
      </div>

      <div className="mt-6">
        <Calculator />
      </div>

      <div className="mt-6">
        <AdSlot label="Annons (under kalkylator) (AdSense kommer här)" />
      </div>

      <section className="mt-10">
  <FAQ items={faqItems} />
</section>

      <FaqSchema items={faqItems} />
    </main>
  );
}