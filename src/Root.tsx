import React from "react";
import "./index.css";
import { Composition } from "remotion";
import { F12025 } from "./Composition";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="F12025"
        component={F12025}
        durationInFrames={2145}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
