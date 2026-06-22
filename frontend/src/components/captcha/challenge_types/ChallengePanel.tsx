import { Headphones, Info, RefreshCw } from "lucide-react";
import type { ReactNode } from "react";
import styled from "styled-components";

type ChallengePanelProps = {
  prompt: string;
  submitDisabled: boolean;
  children: ReactNode;
  onSubmit: () => void;
};

export function ChallengePanel({
  prompt,
  submitDisabled,
  children,
  onSubmit,
}: ChallengePanelProps) {
  return (
    <>
      <ChallengePrompt>
        <PromptSmall>Select the correct answer</PromptSmall>
        <PromptMain>{prompt}</PromptMain>
      </ChallengePrompt>

      <ChallengeBody>{children}</ChallengeBody>

      <ChallengeFooter>
        <FooterIconButton type="button" tabIndex={-1} aria-hidden="true">
          <RefreshCw />
        </FooterIconButton>
        <FooterIconButton type="button" tabIndex={-1} aria-hidden="true">
          <Headphones />
        </FooterIconButton>
        <FooterIconButton type="button" tabIndex={-1} aria-hidden="true">
          <Info />
        </FooterIconButton>
        <VerifyButton
          type="button"
          disabled={submitDisabled}
          onClick={onSubmit}
        >
          VERIFY
        </VerifyButton>
      </ChallengeFooter>
    </>
  );
}

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
  margin: 4px 0 0;
  font-size: 24px;
  font-weight: 700;
  line-height: 1.12;
`;

const ChallengeBody = styled.div`
  padding: 12px;
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
  cursor: default;
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

  &:disabled {
    background: #a8c7fa;
    cursor: not-allowed;
  }
`;
