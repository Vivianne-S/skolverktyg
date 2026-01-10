import type { Metadata } from "next";
import AdSlot from "@/components/AdSlot";
import SkarmtidTool from "./SkarmtidTool";

export const metadata: Metadata = {
  title: "Skärmtidsrekommendation – per ålder",
  description: "Interaktiv skärmtidsrekommendation per ålder + tips.",
};

export default function Page() {
  return (
    <main className="mx-auto max-w-3xl">
      <h1 className="text-3xl font-bold tracking-tight text-white">Skärmtidsrekommendation</h1>
      <p className="mt-3 text-white/70">Välj ålder så får du en snabb rekommendation + tips.</p>

      <div className="mt-6">
      <AdSlot className="mb-6" adSlot="3622343285" />
      </div>

      <div className="mt-6">
        <SkarmtidTool />
      </div>

      <div className="mt-6">
      <AdSlot className="mb-6" adSlot="3622343285" />
      </div>
    </main>
  );
}