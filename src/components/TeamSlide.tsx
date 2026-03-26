import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/TitilliumWeb";
import { DriverCard, DRIVER_CARD_WIDTH } from "./DriverCard";
import type { TeamData } from "../data/teams";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "600", "700"],
  subsets: ["latin"],
});

interface TeamSlideProps {
  team: TeamData;
}

const CHAR_STAGGER = 2; // frames between each character of the team name

export const TeamSlide: React.FC<TeamSlideProps> = ({ team }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // === Entry color flash (frames 0–15) ===
  const flashOpacity = interpolate(frame, [0, 3, 15], [0.45, 0.45, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // === Team logo: fade in (frames 0–12) ===
  const logoOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: "clamp" });

  // === Team name: character-by-character stagger ===
  const nameChars = team.name.toUpperCase().split("");

  // === Car: drives in from the right + scale, then Ken Burns ===
  const carEntrance = spring({
    frame: Math.max(0, frame - 5),
    fps,
    config: { damping: 130, stiffness: 110 },
    durationInFrames: 30,
  });
  const carX = interpolate(carEntrance, [0, 1], [500, 0]);
  const carEntranceScale = interpolate(carEntrance, [0, 1], [0.88, 1.0]);
  // Ken Burns: adds slow zoom after car settles
  const carKenBurns = interpolate(frame, [30, 150], [0, 0.04], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const carScale = carEntranceScale + carKenBurns;

  // === Strip glow: pulses brighter on entry then settles ===
  const glowSize = interpolate(frame, [0, 12, 45, 150], [0, 40, 20, 20], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>

      {/* Entry color flash — brief burst of team color */}
      <AbsoluteFill
        style={{
          backgroundColor: team.stripColor,
          opacity: flashOpacity,
          pointerEvents: "none",
        }}
      />

      {/* Driver 1 — full height portrait, left edge */}
      <div style={{ position: "absolute", left: 0, top: 0 }}>
        <DriverCard driver={team.drivers[0]} stripColor={team.stripColor} side="left" />
      </div>

      {/* Driver 2 — full height portrait, right edge */}
      <div style={{ position: "absolute", right: 0, top: 0 }}>
        <DriverCard driver={team.drivers[1]} stripColor={team.stripColor} side="right" />
      </div>

      {/* Team logo — top left of center section */}
      <div
        style={{
          position: "absolute",
          top: 36,
          left: DRIVER_CARD_WIDTH + 28,
          opacity: logoOpacity,
        }}
      >
        <Img
          src={staticFile(`images/logos/${team.logoImage}`)}
          style={{ height: 60, width: "auto", objectFit: "contain" }}
        />
      </div>

      {/* Team name — character-by-character stagger, top center */}
      <div
        style={{
          position: "absolute",
          top: 38,
          left: DRIVER_CARD_WIDTH,
          right: DRIVER_CARD_WIDTH,
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          fontFamily,
          fontSize: 72,
          fontWeight: 700,
          color: "white",
          overflow: "hidden",
          height: 90,
        }}
      >
        {nameChars.map((char, i) => {
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
                opacity,
                display: "inline-block",
                transform: `translateY(${y}px)`,
                letterSpacing: 6,
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          );
        })}
      </div>

      {/* Car image — center section, drives in from right */}
      <div
        style={{
          position: "absolute",
          left: DRIVER_CARD_WIDTH,
          right: DRIVER_CARD_WIDTH,
          top: 120,
          bottom: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <Img
          src={staticFile(`images/cars/${team.carImage}`)}
          style={{
            width: "92%",
            objectFit: "contain",
            transform: `translateX(${carX}px) scale(${carScale})`,
            transformOrigin: "center center",
          }}
        />
      </div>

      {/* Animated glow strip — inner edge left (between left portrait and center) */}
      <div
        style={{
          position: "absolute",
          left: DRIVER_CARD_WIDTH,
          top: 0,
          bottom: 0,
          width: 4,
          backgroundColor: team.stripColor,
          boxShadow: `0 0 ${glowSize}px ${team.stripColor}`,
        }}
      />

      {/* Animated glow strip — inner edge right */}
      <div
        style={{
          position: "absolute",
          right: DRIVER_CARD_WIDTH,
          top: 0,
          bottom: 0,
          width: 4,
          backgroundColor: team.stripColor,
          boxShadow: `0 0 ${glowSize}px ${team.stripColor}`,
        }}
      />

    </AbsoluteFill>
  );
};
