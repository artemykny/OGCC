import { useState, type MouseEvent } from "react";
import styled from "styled-components";
import type { CaptchaPopupProps, CaptchaResult } from "../types";
import { ChallengePanel } from "./ChallengePanel";

type Point = {
  x: number;
  y: number;
};

export type PointSelectionPopupProps = CaptchaPopupProps & {
  promptLabel: string;
  prompt: string;
  promptHint: string;
  imageSrc: string;
  target: Point & { radius: number };
};

export function PointSelectionPopup({
  promptLabel,
  prompt,
  promptHint,
  imageSrc,
  target,
  onComplete,
  onRefresh,
}: PointSelectionPopupProps) {
  const [selectedPoint, setSelectedPoint] = useState<Point | null>(null);

  function selectPoint(event: MouseEvent<HTMLButtonElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();

    setSelectedPoint({
      x: (event.clientX - bounds.left) / bounds.width,
      y: (event.clientY - bounds.top) / bounds.height,
    });
  }

  function submitAnswer() {
    if (!selectedPoint) {
      return;
    }

    const distance = Math.hypot(
      selectedPoint.x - target.x,
      selectedPoint.y - target.y,
    );

    onComplete(scoreResult(distance <= target.radius));
  }

  return (
    <ChallengePanel
      promptLabel={promptLabel}
      prompt={prompt}
      promptHint={promptHint}
      submitDisabled={!selectedPoint}
      onSubmit={submitAnswer}
      onRefresh={onRefresh}
    >
      <SelectionCanvas
        type="button"
        aria-label={prompt}
        onClick={selectPoint}
      >
        <img src={imageSrc} alt="" draggable={false} />
        {selectedPoint && (
          <PointMarker
            aria-hidden="true"
            style={{
              left: `${selectedPoint.x * 100}%`,
              top: `${selectedPoint.y * 100}%`,
            }}
          />
        )}
      </SelectionCanvas>
    </ChallengePanel>
  );
}

function scoreResult(isAccepted: boolean): CaptchaResult {
  return {
    status: isAccepted ? "accepted" : "rejected",
    humanPercentage: isAccepted ? 0.97 : 0.19,
  };
}

const SelectionCanvas = styled.button`
  appearance: none;
  position: relative;
  display: block;
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  border: 1px solid #dadce0;
  background: #f4f6f8;
  cursor: crosshair;
  padding: 0;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    pointer-events: none;
    user-select: none;
  }

  &:focus-visible {
    outline: 2px solid #174ea6;
    outline-offset: 2px;
  }
`;

const PointMarker = styled.span`
  position: absolute;
  width: 26px;
  height: 26px;
  border: 3px solid #ffffff;
  border-radius: 50%;
  background: rgba(74, 144, 226, 0.78);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.45);
  pointer-events: none;
  transform: translate(-50%, -50%);

  &::after {
    position: absolute;
    inset: 7px;
    border-radius: 50%;
    background: #ffffff;
    content: "";
  }
`;
