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
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Matte-test åk 6
        </h1>
        <p className="mt-3 text-white/70">
          Gör quizet och få resultat + facit direkt. Perfekt för snabb diagnos.
        </p>
      </div>

      {/* Tips – åk 6 */}
      <section className="mb-8 rounded-3xl border border-white/10 bg-black/20 p-5">
        <h2 className="text-lg font-semibold text-white/90">Tips för åk 6</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-white/65">
          <li>
            <span className="font-semibold text-white/85">Procent:</span> träna
            10% / 5% / 1% och bygg upp (t.ex. 15% = 10% + 5%).
          </li>
          <li>
            <span className="font-semibold text-white/85">Bråk:</span> samma
            nämnare när du adderar/subtraherar – förenkla alltid svaret.
          </li>
          <li>
            <span className="font-semibold text-white/85">Decimaltal:</span>{" "}
            dela med 0,5 = dubbla, dela med 0,25 = fyrdubbla (snabbt knep).
          </li>
          <li>
            <span className="font-semibold text-white/85">Geometri:</span>{" "}
            omkrets = runtom, area = inuti. Skriv formeln innan du räknar.
          </li>
          <li>
            <span className="font-semibold text-white/85">Ekvationer:</span>{" "}
            gör samma sak på båda sidor (t.ex. x + 9 = 17 ⇒ ta bort 9 på båda).
          </li>
          <li>
            <span className="font-semibold text-white/85">Strategi:</span> läs
            frågan noga, skriv ett mellanled och kolla rimlighet på svaret.
          </li>
        </ul>
      </section>

      <MatteAk6Quiz />
    </main>
  );
}