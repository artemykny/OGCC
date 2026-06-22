import { SingleChoicePopup } from "./challenge_types";
import type { CaptchaChallenge } from "./types";

export const challenges: CaptchaChallenge[] = [
  {
    id: "single-choice-shape",
    popup: (props) => (
      <SingleChoicePopup
        {...props}
        prompt="Which shape has three sides?"
        options={[
          { id: "circle", label: "Circle" },
          { id: "square", label: "Square" },
          { id: "triangle", label: "Triangle" },
          { id: "rectangle", label: "Rectangle" },
        ]}
        correctOptionId="triangle"
      />
    ),
  },
];

export function getNextChallengeIndex(currentIndex: number) {
  return (currentIndex + 1) % challenges.length;
}
