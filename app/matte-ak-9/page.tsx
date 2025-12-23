import MatteAk9Quiz from "./MatteAk9Quiz";

export const metadata = {
  title: "Matte-test åk 9 – Quiz med facit",
  description:
    "Förberedande mattequiz för åk 9 med facit och korta förklaringar.",
};

export default function Page() {
  return (
    <main className="max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight text-white">
          Matte-test (åk 9)
        </h1>
        <p className="mt-2 text-sm text-white/70">
          Quiz med blandade uppgifter (algebra, geometri, procent, funktioner).
          Du får facit + korta förklaringar efteråt.
        </p>
      </div>

      {/* Tips – åk 9 (det här är “vad man ska kunna”) */}
      <section className="mb-8 rounded-3xl border border-white/10 bg-black/20 p-5">
        <h2 className="text-lg font-semibold text-white/90">Tips för åk 9</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-white/65">
          <li>
            <span className="text-white/85 font-semibold">Algebra:</span> förenkla uttryck, hantera parenteser och minus, och lös ekvationer stegvis.
          </li>
          <li>
            <span className="text-white/85 font-semibold">Procent:</span> räkna med procent som decimal (t.ex. 15% = 0,15) och jobba med förändring (sänkt/höjt pris).
          </li>
          <li>
            <span className="text-white/85 font-semibold">Funktioner:</span> kunna tolka y = kx + m, hitta lutning (k) och beräkna funktionsvärde f(x).
          </li>
          <li>
            <span className="text-white/85 font-semibold">Geometri:</span> omkrets/area (triangel, rektangel, cirkel) + Pythagoras i rätvinkliga trianglar.
          </li>
          <li>
            <span className="text-white/85 font-semibold">Bråk & tal:</span> räkna med bråk, särskilt division (multiplicera med inversen).
          </li>
          <li>
            <span className="text-white/85 font-semibold">Volym:</span> volym = basyta × höjd och kunna lösa ut det som saknas.
          </li>
          <li>
            <span className="text-white/85 font-semibold">Skala:</span> 1:n → byt enheter (cm → m → km) och håll koll på rimlighet.
          </li>
          <li>
            <span className="text-white/85 font-semibold">Strategi:</span> skriv upp formeln först, sätt in värden sen, och gör en snabb rimlighetskontroll.
          </li>
        </ul>
      </section>

      <MatteAk9Quiz />
    </main>
  );
}