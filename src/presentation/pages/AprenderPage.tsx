"use client";

import styled from "styled-components";
import { LearnModeTemplate } from "@/presentation/templates/LearnModeTemplate";
import { FiveSecondReveal } from "@/presentation/organisms/FiveSecondReveal";
import { PilaresGrid } from "@/presentation/organisms/PilaresGrid";
import { MatchingExercise } from "@/presentation/organisms/MatchingExercise";
import { DisciplinasGrid } from "@/presentation/organisms/DisciplinasGrid";
import { GuidedSandbox } from "@/presentation/organisms/GuidedSandbox";
import { ElementsExplainer } from "@/presentation/organisms/ElementsExplainer";
import { WireframeExplainer } from "@/presentation/organisms/WireframeExplainer";
import { LandingEvolution } from "@/presentation/organisms/LandingEvolution";
import { AIPoweredLanding } from "@/presentation/organisms/AIPoweredLanding";
import { useLearnModeStore } from "@/application/hooks/useLearnModeStore";
import { useFiveSecondChallengeStore } from "@/application/hooks/useFiveSecondChallengeStore";
import { useMatchingExerciseStore, MATCHING_EXERCISE_TOTAL } from "@/application/hooks/useMatchingExerciseStore";
import { FIVE_SECOND_LANDINGS } from "@/domain/entities/FiveSecondLanding";

const StepTitle = styled.h2`
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.header};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: clamp(2.35rem, 4.5vw, 3.75rem);
  line-height: 1;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export function AprenderPage() {
  const currentStep = useLearnModeStore((state) => state.currentStep);
  const goNext = useLearnModeStore((state) => state.goNext);

  const landingIndex = useFiveSecondChallengeStore((state) => state.landingIndex);
  const advanceLanding = useFiveSecondChallengeStore((state) => state.advanceLanding);

  const isFiveSecondStep = currentStep === 0;
  const isPilaresStep = currentStep === 1;
  const isElementsStep = currentStep === 2;
  const isMatchingStep = currentStep === 3;
  const isDisciplinasStep = currentStep === 4;
  const isWireframeStep = currentStep === 5;
  const isEvolutionStep = currentStep === 6;
  const isAIStep = currentStep === 7;
  const isGuidedSandboxStep = currentStep === 8;
  const isLastLanding = landingIndex === FIVE_SECOND_LANDINGS.length - 1;
  const isMatchingComplete = useMatchingExerciseStore((state) => state.currentPos >= MATCHING_EXERCISE_TOTAL);

  const handleNext = isFiveSecondStep
    ? () => {
        if (isLastLanding) {
          goNext();
        } else {
          advanceLanding();
        }
      }
    : undefined;

  return (
    <LearnModeTemplate
      nextDisabled={isMatchingStep && !isMatchingComplete}
      onNext={handleNext}
      fullBleedContent={isFiveSecondStep}
    >
      {isFiveSecondStep && <FiveSecondReveal />}
      {isPilaresStep && (
        <div>
          <StepTitle>Antes de diseñar, construye el argumento</StepTitle>
          <PilaresGrid />
        </div>
      )}
      {isMatchingStep && (
        <div style={{ width: "100%" }}>
          <StepTitle>Cada sección debe ganarse su lugar</StepTitle>
          <MatchingExercise />
        </div>
      )}
      {isElementsStep && (
        <div style={{ width: "100%" }}>
          <StepTitle>Las ideas se convierten en secciones</StepTitle>
          <ElementsExplainer />
        </div>
      )}
      {isDisciplinasStep && (
        <div style={{ width: "100%" }}>
          <StepTitle>Una gran landing nunca es obra de una sola disciplina</StepTitle>
          <DisciplinasGrid />
        </div>
      )}
      {isWireframeStep && (
        <div style={{ width: "100%" }}>
          <StepTitle>Piensa la experiencia antes de decorarla</StepTitle>
          <WireframeExplainer />
        </div>
      )}
      {isEvolutionStep && (
        <div style={{ width: "100%" }}>
          <StepTitle>Aprende de las decisiones, no de la decoración</StepTitle>
          <LandingEvolution />
        </div>
      )}
      {isAIStep && (
        <div style={{ width: "100%" }}>
          <StepTitle>La IA acelera la ejecución, no reemplaza el criterio</StepTitle>
          <AIPoweredLanding />
        </div>
      )}
      {isGuidedSandboxStep && (
        <div style={{ width: "100%" }}>
          <StepTitle>Del argumento al wireframe</StepTitle>
          <GuidedSandbox />
        </div>
      )}
    </LearnModeTemplate>
  );
}
