import {
  ImageChoicePopup,
  OrderingPopup,
  PointSelectionPopup,
  SingleChoicePopup,
} from "./challenge_types";
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
  {
    id: "point-selection-door-handle",
    popup: (props) => (
      <PointSelectionPopup
        {...props}
        promptLabel="Select the requested point"
        prompt="Click the door handle"
        promptHint="Click once on the image below"
        imageSrc="/challenge-images/door.svg"
        target={{ x: 0.647, y: 0.534, radius: 0.065 }}
      />
    ),
  },
  {
    id: "ordering-animal-size",
    popup: (props) => (
      <OrderingPopup
        {...props}
        promptLabel="Put the items in order"
        prompt="Smallest animal to largest"
        promptHint="Drag items or use the arrow buttons"
        options={[
          { id: "horse", label: "Horse" },
          { id: "ant", label: "Ant" },
          { id: "elephant", label: "Elephant" },
          { id: "cat", label: "Cat" },
        ]}
        correctOrder={["ant", "cat", "horse", "elephant"]}
      />
    ),
  },
];

export function getNextChallengeIndex(currentIndex: number) {
  return (currentIndex + 1) % challenges.length;
}
