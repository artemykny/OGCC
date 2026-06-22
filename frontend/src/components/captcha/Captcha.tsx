import { useCallback, useEffect, useRef, useState } from "react";
import { CaptchaCheckbox } from "./CaptchaCheckbox";
import { CaptchaLayout } from "./CaptchaLayout";
import { ChallengePopup } from "./ChallengePopup";
import { challenges, getNextChallengeIndex } from "./challenges";
import type { CaptchaStatus } from "./types";

const challengeCloseAnimationDuration = 240;

export function Captcha() {
  const popupRef = useRef<HTMLElement | null>(null);
  const checkboxButtonRef = useRef<HTMLButtonElement | null>(null);
  const verificationTimerRef = useRef<number | null>(null);
  const closeTimerRef = useRef<number | null>(null);
  const [challengeIndex, setChallengeIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [status, setStatus] = useState<CaptchaStatus>("idle");
  const [isChallengeOpen, setIsChallengeOpen] = useState(false);
  const [isChallengeClosing, setIsChallengeClosing] = useState(false);

  const challenge = challenges[challengeIndex];

  const closeChallenge = useCallback(() => {
    if (!isChallengeOpen || isChallengeClosing) {
      return;
    }

    setIsChallengeClosing(true);
    checkboxButtonRef.current?.focus();

    closeTimerRef.current = window.setTimeout(() => {
      setIsChallengeOpen(false);
      setIsChallengeClosing(false);
      closeTimerRef.current = null;
    }, challengeCloseAnimationDuration);
  }, [isChallengeClosing, isChallengeOpen]);

  useEffect(() => {
    if (!isChallengeOpen) {
      return;
    }

    function handleOutsideClick(event: PointerEvent) {
      const target = event.target as Node;

      if (popupRef.current?.contains(target)) {
        return;
      }

      if (checkboxButtonRef.current?.contains(target)) {
        return;
      }

      if (popupRef.current) {
        closeChallenge();
      }
    }

    document.addEventListener("pointerdown", handleOutsideClick);

    return () => {
      document.removeEventListener("pointerdown", handleOutsideClick);
    };
  }, [closeChallenge, isChallengeOpen]);

  useEffect(() => {
    return () => {
      if (verificationTimerRef.current !== null) {
        window.clearTimeout(verificationTimerRef.current);
      }

      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  function openChallenge() {
    if (status === "loading") {
      return;
    }

    if (isChallengeOpen) {
      closeChallenge();
      return;
    }

    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }

    setSelectedAnswer("");
    setStatus("idle");
    setIsChallengeClosing(false);
    setIsChallengeOpen(true);
  }

  function refreshChallenge() {
    setChallengeIndex((currentIndex) => getNextChallengeIndex(currentIndex));
    setSelectedAnswer("");
    setStatus("idle");
  }

  function selectAnswer(answer: string) {
    setSelectedAnswer(answer);
    setStatus("idle");
  }

  function verifyAnswer() {
    if (!selectedAnswer) {
      return;
    }

    closeChallenge();
    setStatus("loading");

    if (verificationTimerRef.current !== null) {
      window.clearTimeout(verificationTimerRef.current);
    }

    verificationTimerRef.current = window.setTimeout(() => {
      setStatus(
        selectedAnswer === challenge.correctAnswer ? "success" : "fail",
      );
      verificationTimerRef.current = null;
    }, 400);
  }

  return (
    <CaptchaLayout>
      <CaptchaCheckbox
        ref={checkboxButtonRef}
        isOpen={isChallengeOpen && !isChallengeClosing}
        status={status}
        onOpen={openChallenge}
      />

      {isChallengeOpen && (
        <ChallengePopup
          ref={popupRef}
          isClosing={isChallengeClosing}
          challenge={challenge}
          selectedAnswer={selectedAnswer}
          onAnswerChange={selectAnswer}
          onClose={closeChallenge}
          onRefresh={refreshChallenge}
          onVerify={verifyAnswer}
        />
      )}
    </CaptchaLayout>
  );
}
