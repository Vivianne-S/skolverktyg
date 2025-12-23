// app/opengraph-image.tsx
import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630, // Open Graph
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#070A12", // ✅
          color: "white",
          fontSize: 72,
          fontWeight: 800,
          letterSpacing: -1,
        }}
      >
        <div style={{ textAlign: "center", padding: 60 }}>
          <div style={{ opacity: 0.9 }}>Skolverktyg</div>
          <div style={{ fontSize: 40, marginTop: 18, opacity: 0.7 }}>
            Snabb hjälp för skolan
          </div>
        </div>
      </div>
    ),
    size
  );
}