import { Check } from "lucide-react";
import { useId, useState } from "react";
import styled from "styled-components";
import type { CaptchaPopupProps, CaptchaResult } from "../types";
import { ChallengePanel } from "./ChallengePanel";

type ImageChoiceOption = {
  id: string;
  imageSrc: string;
};

export type ImageChoicePopupProps = CaptchaPopupProps & {
  promptLabel: string;
  prompt: string;
  promptHint: string;
  options: ImageChoiceOption[];
  correctOptionId: string;
};

export function ImageChoicePopup({
  promptLabel,
  prompt,
  promptHint,
  options,
  correctOptionId,
  onComplete,
  onRefresh,
}: ImageChoicePopupProps) {
  const legendId = useId();
  const [selectedOptionId, setSelectedOptionId] = useState("");

  function submitAnswer() {
    if (!selectedOptionId) {
      return;
    }

    onComplete(scoreResult(selectedOptionId === correctOptionId));
  }

  return (
    <ChallengePanel
      promptLabel={promptLabel}
      prompt={prompt}
      promptHint={promptHint}
      submitDisabled={!selectedOptionId}
      onSubmit={submitAnswer}
      onRefresh={onRefresh}
    >
      <ImageGrid aria-labelledby={legendId}>
        <VisuallyHiddenLegend id={legendId}>{prompt}</VisuallyHiddenLegend>
        {options.map((option) => {
          const isSelected = selectedOptionId === option.id;

          return (
            <ImageOption key={option.id} $checked={isSelected}>
              <VisuallyHiddenInput
                type="radio"
                name="captcha-image-answer"
                value={option.id}
                aria-label={`Select ${formatOptionId(option.id)}`}
                checked={isSelected}
                onChange={() => setSelectedOptionId(option.id)}
              />
              <img src={option.imageSrc} alt="" />
              {isSelected && (
                <SelectionMark aria-hidden="true">
                  <Check />
                </SelectionMark>
              )}
            </ImageOption>
          );
        })}
      </ImageGrid>
    </ChallengePanel>
  );
}

function formatOptionId(optionId: string) {
  return optionId.replaceAll("-", " ");
}

function scoreResult(isAccepted: boolean): CaptchaResult {
  return {
    status: isAccepted ? "accepted" : "rejected",
    humanPercentage: isAccepted ? 0.96 : 0.22,
  };
}

const ImageGrid = styled.fieldset`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 6px;
  border: 0;
  padding: 0;
  margin: 0;
`;

const VisuallyHiddenLegend = styled.legend`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
`;

const ImageOption = styled.label<{ $checked: boolean }>`
  position: relative;
  display: block;
  aspect-ratio: 1;
  overflow: hidden;
  border: ${({ $checked }) => ($checked ? "4px solid #4a90e2" : "1px solid #dadce0")};
  background: #f4f6f8;
  cursor: pointer;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: ${({ $checked }) => ($checked ? "scale(0.96)" : "none")};
  }

  &:focus-within {
    outline: 2px solid #174ea6;
    outline-offset: 2px;
  }
`;

const VisuallyHiddenInput = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
`;

const SelectionMark = styled.span`
  position: absolute;
  top: 6px;
  right: 6px;
  display: grid;
  place-items: center;
  width: 25px;
  height: 25px;
  border: 2px solid #ffffff;
  border-radius: 50%;
  background: #4a90e2;
  color: #ffffff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);

  svg {
    width: 16px;
    height: 16px;
    stroke-width: 3;
  }
`;
