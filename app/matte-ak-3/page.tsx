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
      <h1 className="text-3xl font-bold tracking-tight text-white">
        Matte-test (åk 3)
      </h1>
      <p className="mt-3 text-white/70">
        Gör quizet och få en snabb indikation på nivå + tips.
      </p>

      <div className="mt-6">
        <AdSlot label="Annons (topp) (AdSense kommer här)" />
      </div>

      <div className="mt-6">
        <MatteAk3Quiz />
      </div>

      <div className="mt-6">
        <AdSlot label="Annons (under quiz) (AdSense kommer här)" />
      </div>
    </main>
  );
}