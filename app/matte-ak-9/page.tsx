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
          Quiz med blandade uppgifter (algebra, geometri, procent, funktioner). Du
          får facit + korta förklaringar efteråt.
        </p>
      </div>

      <MatteAk9Quiz />
      
    </main>
  );
}
