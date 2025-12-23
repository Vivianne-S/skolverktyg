type Props = {
  className?: string;
  label?: string;
};

export default function AdSlot({ className = "", label }: Props) {
  return (
    <div
      className={[
        "rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/60",
        className,
      ].join(" ")}
    >
      {label ?? "Annons"}
    </div>
  );
}