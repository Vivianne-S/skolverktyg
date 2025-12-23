"use client";

import { useEffect } from "react";

type Props = {
  className?: string;
  adSlot?: string; // ⬅️ NU OPTIONAL
  label?: string;
};

const ADSENSE_CLIENT = "ca-pub-7517436157328119";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export default function AdSlot({
  className = "",
  adSlot,
  label,
}: Props) {
  useEffect(() => {
    if (!adSlot) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {}
  }, [adSlot]);

  // 🔹 FALLBACK / PLACEHOLDER
  if (!adSlot) {
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

  // 🔹 RIKTIG ADSENSE
  return (
    <div
      className={[
        "rounded-2xl border border-white/10 bg-black/20 p-4",
        className,
      ].join(" ")}
    >
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={adSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}