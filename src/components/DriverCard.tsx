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

export const DriverCard: React.FC<DriverCardProps> = ({ driver, stripColor, side }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Slide in from respective side, starting at frame 10
  const slideProgress = spring({
    frame: Math.max(0, frame - 10),
    fps,
    config: { damping: 200, stiffness: 180 },
    durationInFrames: 20,
  });
  const translateX = interpolate(slideProgress, [0, 1], [side === "left" ? -350 : 350, 0]);
  const opacity = interpolate(frame, [10, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div
      style={{
        transform: `translateX(${translateX}px)`,
        opacity,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        width: 240,
      }}
    >
      {/* Driver headshot */}
      <Img
        src={staticFile(`images/drivers/${driver.image}`)}
        style={{
          width: 240,
          height: 290,
          objectFit: "cover",
          objectPosition: "top center",
          display: "block",
        }}
      />

      {/* Lower-third broadcast card */}
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.82)",
          borderLeft: `4px solid ${stripColor}`,
          padding: "10px 14px",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {/* Driver number */}
        <div
          style={{
            color: stripColor,
            fontSize: 42,
            fontWeight: 700,
            fontFamily,
            lineHeight: 1,
            marginBottom: 2,
          }}
        >
          #{driver.number}
        </div>

        {/* First name */}
        <div
          style={{
            color: "white",
            fontSize: 20,
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
            fontSize: 28,
            fontWeight: 700,
            fontFamily,
            lineHeight: 1.1,
            textTransform: "uppercase",
            letterSpacing: 1,
          }}
        >
          {driver.lastName}
        </div>

        {/* Divider */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.2)",
            margin: "8px 0",
          }}
        />

        {/* Nationality + age */}
        <div
          style={{
            color: "#cccccc",
            fontSize: 15,
            fontFamily,
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <span>{driver.flag}</span>
          <span>{driver.nationality}</span>
          <span style={{ color: "rgba(255,255,255,0.4)" }}>·</span>
          <span>{driver.age} yrs</span>
        </div>
      </div>
    </div>
  );
};
