import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { loadFont } from "@remotion/google-fonts/TitilliumWeb";

const { fontFamily } = loadFont("normal", {
  weights: ["400"],
  subsets: ["latin"],
});

export const Outro: React.FC = () => {
  const frame = useCurrentFrame(); // 0–89

  // Text: fade in 0–20, hold, fade out 60–90
  const textOpacity = interpolate(
    frame,
    [0, 20, 60, 90],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Entire slide fades to black 60–90
  const slideOpacity = interpolate(frame, [60, 90], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#000000",
        opacity: slideOpacity,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          fontFamily,
          fontSize: 48,
          fontWeight: 400,
          color: "white",
          letterSpacing: 4,
          textTransform: "uppercase",
          opacity: textOpacity,
          textAlign: "center",
        }}
      >
        Season starts March 2025
      </div>
    </AbsoluteFill>
  );
};
