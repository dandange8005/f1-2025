import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { loadFont } from "@remotion/google-fonts/TitilliumWeb";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "700"],
  subsets: ["latin"],
});

const CHAR_STAGGER = 2;

export const Outro: React.FC = () => {
  const frame = useCurrentFrame(); // 0–89
  const { fps } = useVideoConfig();

  // Heading char stagger starts at frame 0
  const headingChars = "LIGHTS OUT".split("");

  // Accent bar: spring scale after heading chars finish (≈ frame 20)
  const barSpring = spring({
    frame: Math.max(0, frame - 20),
    fps,
    config: { damping: 80, stiffness: 160 },
    durationInFrames: 20,
  });
  const barScale = interpolate(barSpring, [0, 1], [0, 1]);

  // Stats line 1: fade in at frame 30
  const stats1Opacity = interpolate(frame, [30, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const stats1Y = interpolate(frame, [30, 45], [16, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Stats line 2: fade in at frame 40
  const stats2Opacity = interpolate(frame, [40, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const stats2Y = interpolate(frame, [40, 55], [16, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Entire slide fades to black 60–89
  const slideOpacity = interpolate(frame, [60, 89], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#000000",
        opacity: slideOpacity,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Heading: "LIGHTS OUT" with char stagger */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        {headingChars.map((char, i) => {
          const charFrame = Math.max(0, frame - i * CHAR_STAGGER);
          const opacity = interpolate(charFrame, [0, 10], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const y = interpolate(charFrame, [0, 10], [30, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          return (
            <span
              key={i}
              style={{
                fontFamily,
                fontSize: 120,
                fontWeight: 700,
                color: "white",
                letterSpacing: 10,
                textTransform: "uppercase",
                opacity,
                display: "inline-block",
                transform: `translateY(${y}px)`,
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          );
        })}
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

      {/* Stats line 1 */}
      <div
        style={{
          fontFamily,
          fontSize: 36,
          fontWeight: 700,
          color: "white",
          letterSpacing: 6,
          textTransform: "uppercase",
          opacity: stats1Opacity,
          transform: `translateY(${stats1Y}px)`,
          marginBottom: 12,
        }}
      >
        24 Races · 5 Continents
      </div>

      {/* Stats line 2 */}
      <div
        style={{
          fontFamily,
          fontSize: 28,
          fontWeight: 400,
          color: "#888888",
          letterSpacing: 4,
          textTransform: "uppercase",
          opacity: stats2Opacity,
          transform: `translateY(${stats2Y}px)`,
        }}
      >
        Season starts March 16, 2025
      </div>
    </AbsoluteFill>
  );
};
