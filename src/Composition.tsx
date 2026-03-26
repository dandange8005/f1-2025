import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { wipe } from "@remotion/transitions/wipe";
import { teams } from "./data/teams";
import { Intro } from "./components/Intro";
import { TeamSlide } from "./components/TeamSlide";
import { Outro } from "./components/Outro";

// Timeline constants
const INTRO_FRAMES = 90;          // 3s
const SLIDE_FRAMES = 150;         // 5s per team
const TRANSITION_FRAMES = 15;     // 0.5s wipe overlap
const OUTRO_FRAMES = 90;          // 3s

// TransitionSeries total: 10 slides × 150 - 9 transitions × 15 = 1500 - 135 = 1365
const TRANSITION_SERIES_FRAMES =
  teams.length * SLIDE_FRAMES - (teams.length - 1) * TRANSITION_FRAMES;

// Outro starts after Intro + TransitionSeries
const OUTRO_START = INTRO_FRAMES + TRANSITION_SERIES_FRAMES;

export const F12025: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      {/* Background music for full duration */}
      <Audio src={staticFile("audio/background.mp3")} volume={0.6} />

      {/* Intro: frames 0–89 */}
      <Sequence durationInFrames={INTRO_FRAMES}>
        <Intro />
      </Sequence>

      {/* Team slides with wipe transitions: frames 90–1454 */}
      <Sequence from={INTRO_FRAMES} durationInFrames={TRANSITION_SERIES_FRAMES}>
        <TransitionSeries>
          {teams.map((team, i) => (
            <React.Fragment key={team.name}>
              <TransitionSeries.Sequence durationInFrames={SLIDE_FRAMES}>
                <TeamSlide team={team} />
              </TransitionSeries.Sequence>
              {i < teams.length - 1 && (
                <TransitionSeries.Transition
                  presentation={wipe({ direction: "from-left" })}
                  timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
                />
              )}
            </React.Fragment>
          ))}
        </TransitionSeries>
      </Sequence>

      {/* Outro: frames 1455–1544 */}
      <Sequence from={OUTRO_START} durationInFrames={OUTRO_FRAMES}>
        <Outro />
      </Sequence>
    </AbsoluteFill>
  );
};
