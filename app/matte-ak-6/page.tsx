import type { Metadata } from "next";
import MatteAk6Quiz from "./MatteAk6Quiz";

export const metadata: Metadata = {
  title: "Matte-test åk 6 – diagnos (quiz) + facit",
  description:
    "Gratis matte-test för åk 6. Gör quizet och få resultat, facit och tips på träning direkt.",
};

export default function Page() {
  return (
    <main className="max-w-3xl">
      <h1 className="text-3xl font-bold tracking-tight text-white">
        Matte-test åk 6
      </h1>

      <p className="mt-3 text-white/70">
        Gör quizet och få resultat + facit direkt. Perfekt för snabb diagnos.
      </p>

      <div className="mt-8">
        <MatteAk6Quiz />
      </div>
    </main>
  );
}