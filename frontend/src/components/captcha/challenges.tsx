import { ImageChoicePopup, SingleChoicePopup } from "./challenge_types";
import type { CaptchaChallenge } from "./types";

export const challenges: CaptchaChallenge[] = [
  {
    id: "single-choice-shape",
    popup: (props) => (
      <SingleChoicePopup
        {...props}
        promptLabel="Select the correct answer"
        prompt="Which shape has three sides?"
        promptHint="Choose one option below"
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
  {
    id: "image-choice-traffic-light",
    popup: (props) => (
      <ImageChoicePopup
        {...props}
        promptLabel="Select the correct image"
        prompt="Which image shows a traffic light?"
        promptHint="Choose one image below"
        options={[
          {
            id: "hydrant",
            imageSrc: "/challenge-images/hydrant.svg",
          },
          {
            id: "traffic-light",
            imageSrc: "/challenge-images/traffic-light.svg",
          },
          {
            id: "mailbox",
            imageSrc: "/challenge-images/mailbox.svg",
          },
          {
            id: "streetlamp",
            imageSrc: "/challenge-images/streetlamp.svg",
          },
        ]}
        correctOptionId="traffic-light"
      />
    ),
  },
];

export function getNextChallengeIndex(currentIndex: number) {
  return (currentIndex + 1) % challenges.length;
}
