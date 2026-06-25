import type { ComponentType } from "react";

export type ChallengeResult = {
  score: number;
};

export type CaptchaResult = {
  status: "accepted" | "rejected" | "retry";
  score: number;
};

export type CaptchaPopupProps = {
  onComplete: (result: ChallengeResult) => void;
  onCancel?: () => void;
  onRefresh: () => void;
};

export type CaptchaChallenge = {
  id: string;
  popup: ComponentType<CaptchaPopupProps>;
};

export type CaptchaStatus = "idle" | "loading" | "passed" | "failed" | "retry";
