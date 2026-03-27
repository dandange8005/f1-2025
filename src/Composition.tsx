import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { TransitionSeries, springTiming } from "@remotion/transitions";
import { wipe } from "@remotion/transitions/wipe";
import { teams } from "./data/teams";
import { Intro } from "./components/Intro";
import { TeamSlide } from "./components/TeamSlide";
import { Outro } from "./components/Outro";

// Timeline constants
const INTRO_FRAMES = 90;
const SLIDE_FRAMES = 210;
const TRANSITION_FRAMES = 15;
const OUTRO_FRAMES = 90;

const TRANSITION_SERIES_FRAMES =
  teams.length * SLIDE_FRAMES - (teams.length - 1) * TRANSITION_FRAMES;

const OUTRO_START = INTRO_FRAMES + TRANSITION_SERIES_FRAMES;

// Offset of each team slide's first frame within the TransitionSeries (accounting for overlaps)
function slideOffset(index: number): number {
  return index * (SLIDE_FRAMES - TRANSITION_FRAMES);
}

export const F12025: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      {/* Background music */}
      <Audio src={staticFile("audio/background.mp3")} volume={0.5} />

      {/* Per-slide whoosh stings — one per team, volume ducks under music */}
      {teams.map((_, i) => (
        <Sequence
          key={i}
          from={INTRO_FRAMES + slideOffset(i)}
          durationInFrames={15}
        >
          <Audio src={staticFile("audio/whoosh.mp3")} volume={0.35} />
        </Sequence>
      ))}

      {/* Intro */}
      <Sequence durationInFrames={INTRO_FRAMES}>
        <Intro />
      </Sequence>

      {/* Team slides with alternating wipe transitions */}
      <Sequence from={INTRO_FRAMES} durationInFrames={TRANSITION_SERIES_FRAMES}>
        <TransitionSeries>
          {teams.map((team, i) => (
            <React.Fragment key={team.name}>
              <TransitionSeries.Sequence durationInFrames={SLIDE_FRAMES}>
                <TeamSlide team={team} />
              </TransitionSeries.Sequence>
              {i < teams.length - 1 && (
                <TransitionSeries.Transition
                  presentation={wipe({
                    direction: i % 2 === 0 ? "from-left" : "from-right",
                  })}
                  timing={springTiming({
                    durationInFrames: TRANSITION_FRAMES,
                    config: { damping: 200, stiffness: 1000 },
                  })}
                />
              )}
            </React.Fragment>
          ))}
        </TransitionSeries>
      </Sequence>

      {/* Outro */}
      <Sequence from={OUTRO_START} durationInFrames={OUTRO_FRAMES}>
        <Outro />
      </Sequence>
    </AbsoluteFill>
  );
};
