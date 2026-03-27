import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { loadFont } from "@remotion/google-fonts/TitilliumWeb";
import type { DriverData } from "../data/teams";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "600", "700"],
  subsets: ["latin"],
});

interface DriverCardProps {
  driver: DriverData;
  stripColor: string;
  side: "left" | "right";
}

export const DRIVER_CARD_WIDTH = 330;

export const DriverCard: React.FC<DriverCardProps> = ({ driver, stripColor, side }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Clip-path reveal from respective side (starts at frame 8)
  const revealSpring = spring({
    frame: Math.max(0, frame - 8),
    fps,
    config: { damping: 95, stiffness: 140 },
    durationInFrames: 28,
  });
  const revealPercent = interpolate(revealSpring, [0, 1], [100, 0]);
  const clipPath =
    side === "left"
      ? `inset(0 ${revealPercent}% 0 0)`
      : `inset(0 0 0 ${revealPercent}%)`;

  // Info card: side-aware slide (starts at frame 22)
  const infoSpring = spring({
    frame: Math.max(0, frame - 22),
    fps,
    config: { damping: 85, stiffness: 200 },
    durationInFrames: 22,
  });
  // Left driver slides in from left (negative X), right from right (positive X)
  const slideFrom = side === "left" ? -80 : 80;
  const infoX = interpolate(infoSpring, [0, 1], [slideFrom, 0]);
  const infoOpacity = interpolate(frame, [22, 34], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Driver number glow: spread animates from 0 to 28px with infoSpring
  const glowSpread = interpolate(infoSpring, [0, 1], [0, 28]);

  return (
    <div
      style={{
        width: DRIVER_CARD_WIDTH,
        height: 1080,
        position: "relative",
        clipPath,
        borderRight: side === "left" ? `4px solid ${stripColor}` : "none",
        borderLeft: side === "right" ? `4px solid ${stripColor}` : "none",
        boxShadow:
          side === "left"
            ? `6px 0 30px ${stripColor}44`
            : `-6px 0 30px ${stripColor}44`,
      }}
    >
      {/* Full-height portrait */}
      <Img
        src={staticFile(`images/drivers/${driver.image}`)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "top center",
          display: "block",
        }}
      />

      {/* Bottom gradient fade */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 420,
          background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.98))",
          pointerEvents: "none",
        }}
      />

      {/* Info overlay — slides in from side */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "0 18px 28px 18px",
          transform: `translateX(${infoX}px)`,
          opacity: infoOpacity,
          boxSizing: "border-box",
        }}
      >
        {/* Driver number with animated glow */}
        <div
          style={{
            color: stripColor,
            fontSize: 80,
            fontWeight: 700,
            fontFamily,
            lineHeight: 1,
            marginBottom: 4,
            textShadow: `0 0 ${glowSpread}px ${stripColor}99`,
          }}
        >
          #{driver.number}
        </div>

        {/* First name */}
        <div
          style={{
            color: "white",
            fontSize: 30,
            fontWeight: 600,
            fontFamily,
            lineHeight: 1.2,
          }}
        >
          {driver.firstName}
        </div>

        {/* Last name */}
        <div
          style={{
            color: "white",
            fontSize: 44,
            fontWeight: 700,
            fontFamily,
            textTransform: "uppercase",
            letterSpacing: 2,
            lineHeight: 1.1,
          }}
        >
          {driver.lastName}
        </div>

        {/* Divider */}
        <div
          style={{
            borderTop: `1px solid ${stripColor}55`,
            margin: "12px 0",
          }}
        />

        {/* Nationality + age */}
        <div
          style={{
            color: "#cccccc",
            fontSize: 21,
            fontFamily,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span>{driver.flag}</span>
          <span>{driver.nationality}</span>
          <span style={{ color: "rgba(255,255,255,0.35)" }}>·</span>
          <span>{driver.age} yrs</span>
        </div>
      </div>
    </div>
  );
};
