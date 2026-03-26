import React from "react";
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { loadFont } from "@remotion/google-fonts/TitilliumWeb";
import { DriverCard } from "./DriverCard";
import type { TeamData } from "../data/teams";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "600", "700"],
  subsets: ["latin"],
});

interface TeamSlideProps {
  team: TeamData;
}

export const TeamSlide: React.FC<TeamSlideProps> = ({ team }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Team name: slide up 20px + fade in (frames 0–15)
  const nameOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const nameY = interpolate(frame, [0, 15], [20, 0], { extrapolateRight: "clamp" });

  // Team logo: fade in (frames 0–10)
  const logoOpacity = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });

  // Car: spring zoom in from 0.8→1.0 starting at frame 5
  const carSpring = spring({
    frame: Math.max(0, frame - 5),
    fps,
    config: { damping: 200, stiffness: 150 },
    durationInFrames: 20,
  });
  const carEntranceScale = interpolate(carSpring, [0, 1], [0.8, 1.0]);

  // Ken Burns: slow zoom adds 0→0.05 over entire slide
  const carKenBurns = interpolate(frame, [0, 150], [0, 0.05], { extrapolateRight: "clamp" });

  // Combined scale: entrance + Ken Burns
  const carScale = carEntranceScale + carKenBurns;

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      {/* Left edge colour strip with glow */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 8,
          backgroundColor: team.stripColor,
          boxShadow: `0 0 20px ${team.stripColor}`,
        }}
      />

      {/* Team logo — top left */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 28,
          opacity: logoOpacity,
        }}
      >
        <Img
          src={staticFile(`images/logos/${team.logoImage}`)}
          style={{ height: 70, width: "auto", objectFit: "contain" }}
        />
      </div>

      {/* Team name — top centre */}
      <div
        style={{
          position: "absolute",
          top: 44,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: nameOpacity,
          transform: `translateY(${nameY}px)`,
          fontFamily,
          fontSize: 72,
          fontWeight: 700,
          color: "white",
          letterSpacing: 6,
          textTransform: "uppercase",
        }}
      >
        {team.name}
      </div>

      {/* Car image — centre */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: "30%",
          bottom: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Img
          src={staticFile(`images/cars/${team.carImage}`)}
          style={{
            width: 900,
            objectFit: "contain",
            transform: `scale(${carScale})`,
            transformOrigin: "center center",
          }}
        />
      </div>

      {/* Driver 1 card — bottom left */}
      <div style={{ position: "absolute", bottom: 60, left: 80 }}>
        <DriverCard driver={team.drivers[0]} stripColor={team.stripColor} side="left" />
      </div>

      {/* Driver 2 card — bottom right */}
      <div style={{ position: "absolute", bottom: 60, right: 80 }}>
        <DriverCard driver={team.drivers[1]} stripColor={team.stripColor} side="right" />
      </div>
    </AbsoluteFill>
  );
};
