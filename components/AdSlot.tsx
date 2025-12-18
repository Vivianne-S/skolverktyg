"use client";

import { useEffect } from "react";

type Props = {
  label?: string;
  slot?: string; // AdSense slot id, ex: "1234567890"
};

export default function AdSlot({ label = "Annons", slot }: Props) {
  useEffect(() => {
    // Try to render AdSense ad if available (won't crash locally)
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // ignore
    }
  }, []);

  // If no slot/client configured, show a nice placeholder box
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

  if (!client || !slot) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm text-white/60">
        {label} (AdSense kommer här)
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-2">
      <ins
        className="adsbygoogle block"
        style={{ display: "block" }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}