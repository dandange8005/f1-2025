import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { loadFont } from "@remotion/google-fonts/TitilliumWeb";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "700"],
  subsets: ["latin"],
});

export const Intro: React.FC = () => {
  const frame = useCurrentFrame();

  // Title: slide up 30px + fade in (frames 0–20)
  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const titleY = interpolate(frame, [0, 20], [30, 0], { extrapolateRight: "clamp" });

  // Subtitle: fade in (frames 15–35)
  const subtitleOpacity = interpolate(frame, [15, 35], [0, 1], { extrapolateRight: "clamp" });

  // Red accent bar: scale in from centre (frames 5–25)
  const barScale = interpolate(frame, [5, 25], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#000000",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Line 1 */}
      <div
        style={{
          fontFamily,
          fontSize: 120,
          fontWeight: 700,
          color: "white",
          letterSpacing: 10,
          textTransform: "uppercase",
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          textAlign: "center",
          lineHeight: 1.1,
        }}
      >
        2025 FORMULA 1
      </div>

      {/* Line 2 */}
      <div
        style={{
          fontFamily,
          fontSize: 120,
          fontWeight: 700,
          color: "white",
          letterSpacing: 10,
          textTransform: "uppercase",
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          textAlign: "center",
          lineHeight: 1.1,
        }}
      >
        SEASON
      </div>

      {/* Red accent bar */}
      <div
        style={{
          width: 200,
          height: 5,
          backgroundColor: "#E8002D",
          margin: "24px 0",
          transform: `scaleX(${barScale})`,
          transformOrigin: "center",
        }}
      />

      {/* Subtitle */}
      <div
        style={{
          fontFamily,
          fontSize: 48,
          fontWeight: 400,
          color: "#888888",
          letterSpacing: 8,
          textTransform: "uppercase",
          opacity: subtitleOpacity,
        }}
      >
        Teams &amp; Drivers
      </div>
    </AbsoluteFill>
  );
};
