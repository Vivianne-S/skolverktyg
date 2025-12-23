"use client";

import { useEffect } from "react";

type Props = {
  className?: string;
  adSlot: string; 
  adFormat?: "auto" | "rectangle" | "horizontal" | "vertical";
  fullWidthResponsive?: boolean;
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
  adFormat = "auto",
  fullWidthResponsive = true,
}: Props) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // ignore (kan hända under dev/strict mode)
    }
  }, []);

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
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive ? "true" : "false"}
      />
    </div>
  );
}