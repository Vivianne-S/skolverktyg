import type { Metadata } from "next";
import GymnasievalQuiz from "./GymnasievalQuiz";

export const metadata: Metadata = {
  title: "Gymnasieval-quiz – hitta rätt program",
  description:
    "Quiz som hjälper elever att få en första indikation på gymnasieprogram utifrån intressen.",
};

export default function Page() {
  return (
    <main className="max-w-4xl">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Gymnasieval-quiz
        </h1>
        <p className="mt-3 text-white/70">
          Svara på frågorna och få topp 3 förslag. Resultatet är en startpunkt –
          prata gärna med studie- och yrkesvägledare också.
        </p>
      </div>

      <div className="mt-8">
        <GymnasievalQuiz />
      </div>
    </main>
  );
}