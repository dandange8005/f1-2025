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

const CHAR_STAGGER = 2;
const SIDE_INSET = 24;

// Longest team name: "Red Bull Racing" = 15 chars → 15×2 = 30 frames for stagger to complete
const UNDERLINE_START_FRAME = 30;

export const TeamSlide: React.FC<TeamSlideProps> = ({ team }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // === Entry color flash (frames 0–15) ===
  const flashOpacity = interpolate(frame, [0, 3, 15], [0.45, 0.45, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // === Team logo: fade in (frames 0–12) ===
  const logoOpacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateRight: "clamp",
  });

  // === Team name character stagger ===
  const nameChars = team.name.toUpperCase().split("");

  // === Animated underline beneath team name ===
  const underlineSpring = spring({
    frame: Math.max(0, frame - UNDERLINE_START_FRAME),
    fps,
    config: { damping: 90, stiffness: 180 },
    durationInFrames: 20,
  });
  const underlineScale = interpolate(underlineSpring, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // === Car: drives in from right + scale, then Ken Burns ===
  const carEntrance = spring({
    frame: Math.max(0, frame - 5),
    fps,
    config: { damping: 130, stiffness: 110 },
    durationInFrames: 30,
  });
  const carX = interpolate(carEntrance, [0, 1], [500, 0]);
  const carEntranceScale = interpolate(carEntrance, [0, 1], [0.88, 1.0]);
  const carKenBurns = interpolate(frame, [30, 210], [0, 0.04], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const carScale = carEntranceScale + carKenBurns;

  // === Car blur: dissipates as carX approaches 0 ===
  // carX goes 500→0; blur goes 10px→0px
  const carBlur = interpolate(Math.abs(carX), [0, 500], [0, 10], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // === Stats row fade in (frames 45–60) ===
  const statsOpacity = interpolate(frame, [45, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const statsY = interpolate(frame, [45, 60], [16, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const centerLeft = DRIVER_CARD_WIDTH + SIDE_INSET;
  const centerRight = DRIVER_CARD_WIDTH + SIDE_INSET;

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>

      {/* Entry color flash */}
      <AbsoluteFill
        style={{
          backgroundColor: team.stripColor,
          opacity: flashOpacity,
          pointerEvents: "none",
        }}
      />

      {/* Team color radial gradient behind car — center section only */}
      <div
        style={{
          position: "absolute",
          left: centerLeft,
          right: centerRight,
          top: 0,
          bottom: 0,
          background: `radial-gradient(ellipse 70% 50% at 50% 60%, ${team.stripColor}1A 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      {/* Driver 1 — left */}
      <div style={{ position: "absolute", left: SIDE_INSET, top: 0 }}>
        <DriverCard driver={team.drivers[0]} stripColor={team.stripColor} side="left" />
      </div>

      {/* Driver 2 — right */}
      <div style={{ position: "absolute", right: SIDE_INSET, top: 0 }}>
        <DriverCard driver={team.drivers[1]} stripColor={team.stripColor} side="right" />
      </div>

      {/* Team logo — top left of center section */}
      <div
        style={{
          position: "absolute",
          top: 36,
          left: centerLeft + 28,
          opacity: logoOpacity,
        }}
      >
        <Img
          src={staticFile(`images/logos/${team.logoImage}`)}
          style={{ height: 60, width: "auto", objectFit: "contain" }}
        />
      </div>

      {/* Team name — char stagger */}
      <div
        style={{
          position: "absolute",
          top: 38,
          left: centerLeft,
          right: centerRight,
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

      {/* Animated underline beneath team name */}
      <div
        style={{
          position: "absolute",
          top: 134,
          left: centerLeft,
          right: centerRight,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 180,
            height: 3,
            backgroundColor: team.stripColor,
            transform: `scaleX(${underlineScale})`,
            transformOrigin: "center",
            boxShadow: `0 0 10px ${team.stripColor}88`,
          }}
        />
      </div>

      {/* Stats row — engine + chassis */}
      <div
        style={{
          position: "absolute",
          top: 150,
          left: centerLeft,
          right: centerRight,
          display: "flex",
          justifyContent: "center",
          gap: 32,
          opacity: statsOpacity,
          transform: `translateY(${statsY}px)`,
        }}
      >
        {[
          { label: "ENGINE", value: team.engine },
          { label: "CHASSIS", value: team.chassis },
        ].map(({ label, value }) => (
          <div
            key={label}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <div
              style={{
                fontFamily,
                fontSize: 11,
                fontWeight: 600,
                color: team.stripColor,
                letterSpacing: 3,
                textTransform: "uppercase",
              }}
            >
              {label}
            </div>
            <div
              style={{
                fontFamily,
                fontSize: 18,
                fontWeight: 700,
                color: "white",
                letterSpacing: 1,
              }}
            >
              {value}
            </div>
          </div>
        ))}
      </div>

      {/* Car image — drives in from right with blur */}
      <div
        style={{
          position: "absolute",
          left: centerLeft,
          right: centerRight,
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
            filter: `blur(${carBlur}px)`,
          }}
        />
      </div>

    </AbsoluteFill>
  );
};
