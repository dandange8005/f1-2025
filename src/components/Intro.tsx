import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { loadFont } from "@remotion/google-fonts/TitilliumWeb";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "700"],
  subsets: ["latin"],
});

// Team colors to cycle through for the accent bar teaser
const TEASER_COLORS = ["#FF1801", "#DC0000", "#00D2BE", "#FF8000"];

// Frames at which each color starts (must fit within 90-frame intro)
const COLOR_STOPS = [5, 25, 45, 65, 85];

function interpolateColor(frame: number): string {
  const idx = COLOR_STOPS.findIndex((stop, i) =>
    frame >= stop && frame < (COLOR_STOPS[i + 1] ?? Infinity)
  );
  const clampedIdx = Math.max(0, Math.min(idx, TEASER_COLORS.length - 1));
  const nextIdx = Math.min(clampedIdx + 1, TEASER_COLORS.length - 1);
  const segStart = COLOR_STOPS[clampedIdx] ?? 5;
  const segEnd = COLOR_STOPS[clampedIdx + 1] ?? 85;
  const t = interpolate(frame, [segStart, segEnd], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const hexToRgb = (hex: string) => ({
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16),
  });

  const from = hexToRgb(TEASER_COLORS[clampedIdx]);
  const to = hexToRgb(TEASER_COLORS[nextIdx]);

  const r = Math.round(from.r + (to.r - from.r) * t);
  const g = Math.round(from.g + (to.g - from.g) * t);
  const b = Math.round(from.b + (to.b - from.b) * t);

  return `rgb(${r},${g},${b})`;
}

const CHAR_STAGGER = 2;

function StaggeredText({
  text,
  frame,
  startFrame,
  style,
}: {
  text: string;
  frame: number;
  startFrame: number;
  style: React.CSSProperties;
}) {
  const chars = text.split("");
  return (
    <div style={{ display: "flex", justifyContent: "center", ...style }}>
      {chars.map((char, i) => {
        const charFrame = Math.max(0, frame - startFrame - i * CHAR_STAGGER);
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
  );
}

export const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Red accent bar: spring scale-in (frames 5–30)
  const barSpring = spring({
    frame: Math.max(0, frame - 5),
    fps,
    config: { damping: 80, stiffness: 160 },
    durationInFrames: 25,
  });
  const barScale = interpolate(barSpring, [0, 1], [0, 1]);

  // Animated bar color cycling through team colors
  const barColor = interpolateColor(frame);

  // Subtitle: fade in after title chars finish (≈ frame 30 for "2025 FORMULA 1" = 14 chars × 2 = 28 frames)
  const subtitleOpacity = interpolate(frame, [30, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const sharedTextStyle: React.CSSProperties = {
    fontFamily,
    fontSize: 120,
    fontWeight: 700,
    color: "white",
    letterSpacing: 10,
    textTransform: "uppercase",
    lineHeight: 1.1,
  };

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
      {/* Line 1: "2025 FORMULA 1" — chars stagger from frame 0 */}
      <StaggeredText
        text="2025 FORMULA 1"
        frame={frame}
        startFrame={0}
        style={sharedTextStyle}
      />

      {/* Line 2: "SEASON" — chars stagger from frame 8 (slight offset after line 1) */}
      <StaggeredText
        text="SEASON"
        frame={frame}
        startFrame={8}
        style={sharedTextStyle}
      />

      {/* Accent bar — spring scale + animated team color */}
      <div
        style={{
          width: 200,
          height: 5,
          backgroundColor: barColor,
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
