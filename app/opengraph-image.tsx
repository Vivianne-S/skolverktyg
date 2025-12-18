import { ImageResponse } from "next/og";
import { siteMeta } from "@/lib/seo";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };

export default async function OG() {
  const meta = siteMeta();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          color: "white",
          background:
            "radial-gradient(circle at top, rgba(99,102,241,0.35), transparent 55%), radial-gradient(circle at bottom, rgba(16,185,129,0.25), transparent 55%), #070A12",
        }}
      >
        <div style={{ fontSize: 64, fontWeight: 800, letterSpacing: -1 }}>
          {meta.name}
        </div>
        <div style={{ marginTop: 16, fontSize: 28, opacity: 0.8, maxWidth: 900 }}>
          Gratis verktyg för skola: betyg, matte-test och skärmtid.
        </div>
        <div style={{ marginTop: 36, fontSize: 22, opacity: 0.75 }}>
          skolverktyg.se
        </div>
      </div>
    ),
    size
  );
}