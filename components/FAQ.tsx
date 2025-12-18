type Item = { q: string; a: string };

export default function FAQ({ items }: { items: Item[] }) {
  return (
    <section>
      <h2 className="text-xl font-semibold text-white/90">Vanliga frågor</h2>
      <div className="mt-4 space-y-3">
        {items.map((it, idx) => (
          <details
            key={idx}
            className="rounded-3xl border border-white/10 bg-white/[0.04] p-4 text-white/80"
          >
            <summary className="cursor-pointer font-medium text-white/90">
              {it.q}
            </summary>
            <p className="mt-2 text-sm text-white/65">{it.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}