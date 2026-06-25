import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Apex Circuit — Enterprise Technology Partner";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0D0D14 0%, #1A0505 50%, #0D0D14 100%)",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Grid dots */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Glow orbs */}
        <div style={{ position: "absolute", top: -100, right: -100, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(139,0,0,0.25) 0%, transparent 70%)" }} />
        <div style={{ position: "absolute", bottom: -80, left: -80, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 70%)" }} />

        {/* Top accent line */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, transparent, #DC2626, #8B0000, transparent)" }} />

        {/* Content */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 28, zIndex: 10 }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{
              width: 64, height: 64, borderRadius: 16,
              background: "linear-gradient(135deg, #8B0000, #DC2626)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 0 40px rgba(139,0,0,0.5)",
            }}>
              <span style={{ color: "white", fontSize: 28, fontWeight: 900 }}>A</span>
            </div>
            <span style={{ color: "white", fontSize: 48, fontWeight: 900, letterSpacing: -2 }}>
              Apex <span style={{ color: "#DC2626" }}>Circuit</span>
            </span>
          </div>

          {/* Tagline */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
            <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 20, letterSpacing: 4, textTransform: "uppercase", fontWeight: 600 }}>
              Enterprise Technology Partner
            </span>
            <span style={{ color: "rgba(255,255,255,0.75)", fontSize: 28, fontWeight: 700, textAlign: "center", maxWidth: 700, lineHeight: 1.3 }}>
              Bespoke Software · ERPNext · GIS · AI Automation · Cloud
            </span>
          </div>

          {/* Badges */}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
            {["UK Based", "Global Delivery", "11 Services", "12 Sectors"].map((b) => (
              <div key={b} style={{
                padding: "8px 18px",
                borderRadius: 100,
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.04)",
                color: "rgba(255,255,255,0.7)",
                fontSize: 14,
                fontWeight: 600,
              }}>
                {b}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom accent line */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, transparent, rgba(37,99,235,0.6), transparent)" }} />
      </div>
    ),
    { ...size }
  );
}
