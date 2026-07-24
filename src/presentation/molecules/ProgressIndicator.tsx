import styled from "styled-components";
import { TOTAL_LEARN_STEPS } from "@/domain/types/LearnStep";
import { LEARN_STEPS } from "@/domain/types/LearnStep";

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: 8px 14px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.backgroundElevated};
`;

const Count = styled.span`
  color: ${({ theme }) => theme.colors.accent};
  font: 800 0.9rem ${({ theme }) => theme.fonts.header};
`;

const Label = styled.span`
  color: ${({ theme }) => theme.colors.foregroundMuted};
  font: 700 0.9rem ${({ theme }) => theme.fonts.header};
`;

export function ProgressIndicator({ currentStep }: { currentStep: number }) {
  return (
    <Row aria-label={`Paso ${currentStep + 1} de ${TOTAL_LEARN_STEPS}: ${LEARN_STEPS[currentStep]}`}>
      <Count>{currentStep + 1}/{TOTAL_LEARN_STEPS}</Count>
      <Label>{LEARN_STEPS[currentStep]}</Label>
    </Row>
  );
}
