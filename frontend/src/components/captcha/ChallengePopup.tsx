import { Headphones, Info, RefreshCw } from "lucide-react";
import {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  type KeyboardEvent,
} from "react";
import styled from "styled-components";
import type { Challenge } from "./types";

type ChallengePopupProps = {
  isClosing: boolean;
  challenge: Challenge;
  selectedAnswer: string;
  onAnswerChange: (answer: string) => void;
  onClose: () => void;
  onRefresh: () => void;
  onVerify: () => void;
};

export const ChallengePopup = forwardRef<HTMLElement, ChallengePopupProps>(
  function ChallengePopup(
    {
      isClosing,
      challenge,
      selectedAnswer,
      onAnswerChange,
      onClose,
      onRefresh,
      onVerify,
    },
    ref,
  ) {
    const popupRef = useRef<HTMLElement | null>(null);

    const setPopupRef = useCallback(
      (node: HTMLElement | null) => {
        popupRef.current = node;

        if (typeof ref === "function") {
          ref(node);
          return;
        }

        if (ref) {
          ref.current = node;
        }
      },
      [ref],
    );

    useEffect(() => {
      popupRef.current?.focus();
    }, []);

    function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (
        event.key === "ArrowDown" ||
        event.key === "ArrowRight" ||
        event.key === "ArrowUp" ||
        event.key === "ArrowLeft" ||
        event.key === "Home" ||
        event.key === "End"
      ) {
        event.preventDefault();

        const selectedIndex = challenge.answers.indexOf(selectedAnswer);
        const lastIndex = challenge.answers.length - 1;
        let nextIndex = selectedIndex;

        if (event.key === "ArrowDown" || event.key === "ArrowRight") {
          nextIndex = selectedIndex === lastIndex ? 0 : selectedIndex + 1;
        }

        if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
          nextIndex = selectedIndex <= 0 ? lastIndex : selectedIndex - 1;
        }

        if (event.key === "Home") {
          nextIndex = 0;
        }

        if (event.key === "End") {
          nextIndex = lastIndex;
        }

        onAnswerChange(challenge.answers[nextIndex]);
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusableElements = getFocusableElements(popupRef.current);

      if (focusableElements.length === 0) {
        event.preventDefault();
        popupRef.current?.focus();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
        return;
      }

      if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }

    return (
      <Popup
        $isClosing={isClosing}
        ref={setPopupRef}
        role="dialog"
        aria-modal="true"
        aria-label="Captcha security question"
        tabIndex={-1}
        onKeyDown={handleKeyDown}
      >
        <ChallengePrompt>
          <PromptSmall>Select the correct answer</PromptSmall>
          <PromptMain>{challenge.prompt}</PromptMain>
          <PromptSmall>Choose one option below</PromptSmall>
        </ChallengePrompt>

        <AnswerGrid aria-label="Captcha answer choices">
          {challenge.answers.map((answer) => (
            <AnswerOption key={answer} $checked={selectedAnswer === answer}>
              <input
                type="radio"
                name="captcha-answer"
                value={answer}
                checked={selectedAnswer === answer}
                onChange={() => onAnswerChange(answer)}
              />
              <span>{answer}</span>
            </AnswerOption>
          ))}
        </AnswerGrid>

        <ChallengeFooter>
          <FooterIconButton
            type="button"
            onClick={onRefresh}
            aria-label="Get a new challenge"
          >
            <RefreshCw aria-hidden="true" />
          </FooterIconButton>
          <FooterIconButton type="button" tabIndex={-1} aria-hidden="true">
            <Headphones />
          </FooterIconButton>
          <FooterIconButton type="button" tabIndex={-1} aria-hidden="true">
            <Info />
          </FooterIconButton>
          <VerifyButton type="button" onClick={onVerify}>
            VERIFY
          </VerifyButton>
        </ChallengeFooter>
      </Popup>
    );
  },
);

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

function getFocusableElements(root: HTMLElement | null) {
  if (!root) {
    return [];
  }

  return Array.from(root.querySelectorAll<HTMLElement>(focusableSelector))
    .filter((element) => !element.hasAttribute("aria-hidden"));
}

const Popup = styled.section<{ $isClosing: boolean }>`
  position: absolute;
  top: 37px;
  left: 56px;
  transform: translateY(-50%);
  z-index: 10;
  width: min(320px, calc(100vw - 32px));
  border: 1px solid #c8c8c8;
  border-radius: 2px;
  background: #ffffff;
  box-shadow: 0 8px 26px rgba(60, 64, 67, 0.28);
  padding: 8px;
  transform-origin: left 58px;
  pointer-events: ${({ $isClosing }) => ($isClosing ? "none" : "auto")};
  animation: ${({ $isClosing }) => (
    $isClosing ? "popup-exit" : "popup-enter"
  )} ${({ $isClosing }) => ($isClosing ? "240ms" : "520ms")}
    cubic-bezier(0.16, 1, 0.3, 1) both;

  &:focus {
    outline: 0;
  }

  &::before,
  &::after {
    position: absolute;
    top: 50%;
    right: 100%;
    width: 0;
    height: 0;
    content: "";
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    transform: translateY(-50%);
  }

  &::before {
    border-right: 10px solid #c8c8c8;
  }

  &::after {
    margin-right: -1px;
    border-right: 10px solid #ffffff;
  }

  @keyframes popup-enter {
    from {
      opacity: 0;
      transform: translateY(-50%);
    }

    to {
      opacity: 1;
      transform: translateY(-50%);
    }
  }

  @keyframes popup-exit {
    from {
      opacity: 1;
      transform: translateY(-50%);
    }

    to {
      opacity: 0;
      transform: translateY(-50%);
    }
  }

  @media (max-width: 700px) {
    top: calc(100% + 16px);
    left: 50%;
    transform: translateX(-50%);
    transform-origin: top center;

    &::before,
    &::after {
      top: auto;
      right: auto;
      bottom: 100%;
      left: 33px;
      border-right: 10px solid transparent;
      border-left: 10px solid transparent;
      border-bottom: 10px solid #c8c8c8;
      transform: none;
    }

    &::after {
      margin-right: 0;
      margin-bottom: -1px;
      border-bottom-color: #ffffff;
    }

    @keyframes popup-enter {
      from {
        opacity: 0;
        transform: translateX(-50%);
      }

      to {
        opacity: 1;
        transform: translateX(-50%);
      }
    }

    @keyframes popup-exit {
      from {
        opacity: 1;
        transform: translateX(-50%);
      }

      to {
        opacity: 0;
        transform: translateX(-50%);
      }
    }
  }
`;

const ChallengePrompt = styled.div`
  min-height: 104px;
  background: #4a90e2;
  color: #ffffff;
  padding: 18px 20px;
`;

const PromptSmall = styled.div`
  font-size: 15px;
  line-height: 1.25;
`;

const PromptMain = styled.div`
  margin: 4px 0;
  font-size: 26px;
  font-weight: 700;
  line-height: 1.12;
`;

const AnswerGrid = styled.div`
  display: grid;
  gap: 8px;
  margin-top: 8px;
  padding: 12px;
  background: #ffffff;
`;

const AnswerOption = styled.label<{ $checked: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 44px;
  border: 1px solid ${({ $checked }) => ($checked ? "#4a90e2" : "#dadce0")};
  border-radius: 2px;
  background: ${({ $checked }) => ($checked ? "#eef4fe" : "#ffffff")};
  cursor: pointer;
  font-size: 15px;
  padding: 8px 10px;

  input {
    accent-color: #4a90e2;
    margin: 0;
  }

  span {
    overflow-wrap: anywhere;
  }
`;

const ChallengeFooter = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
  min-height: 64px;
  margin-top: 8px;
  border-top: 1px solid #dadce0;
  padding: 10px 4px 0;
`;

const FooterIconButton = styled.button`
  appearance: none;
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border: 0;
  background: transparent;
  color: #5f6368;
  cursor: pointer;
  padding: 0;

  svg {
    width: 27px;
    height: 27px;
    stroke-width: 2.5;
  }
`;

const VerifyButton = styled.button`
  appearance: none;
  min-width: 94px;
  margin-left: auto;
  border: 0;
  border-radius: 2px;
  background: #4a90e2;
  color: #ffffff;
  cursor: pointer;
  font: inherit;
  font-size: 15px;
  font-weight: 600;
  padding: 14px 18px;

  &:focus-visible {
    outline: 2px solid #174ea6;
    outline-offset: 2px;
  }
`;
