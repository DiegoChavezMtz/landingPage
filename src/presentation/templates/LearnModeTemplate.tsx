"use client";

import { useEffect } from "react";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProgressIndicator } from "@/presentation/molecules/ProgressIndicator";
import { Button } from "@/presentation/atoms/Button";
import { useLearnModeStore } from "@/application/hooks/useLearnModeStore";
import { TOTAL_LEARN_STEPS } from "@/domain/types/LearnStep";

const Screen = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.colors.foreground};
`;

const Header = styled.header`
  display: flex;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.sm};
  @media (max-width: 640px) { padding: ${({ theme }) => theme.spacing.md}; }
`;

const Content = styled.div<{ $fullBleed?: boolean }>`
  position: relative;
  flex: 1;
  display: flex;
  align-items: ${({ $fullBleed }) => ($fullBleed ? "stretch" : "center")};
  justify-content: ${({ $fullBleed }) => ($fullBleed ? "stretch" : "center")};
  padding: ${({ theme, $fullBleed }) => ($fullBleed ? "0" : `0 ${theme.spacing.xl}`)};
  overflow-x: hidden;
  overflow-y: hidden;
  @media (max-width: 760px) { overflow-y: auto; }
`;

const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
  @media (max-width: 640px) { padding: ${({ theme }) => theme.spacing.md}; }
`;

export function LearnModeTemplate({
  children,
  nextDisabled = false,
  onNext,
  fullBleedContent = false,
}: {
  children: React.ReactNode;
  nextDisabled?: boolean;
  onNext?: () => void;
  fullBleedContent?: boolean;
}) {
  const currentStep = useLearnModeStore((state) => state.currentStep);
  const goNext = useLearnModeStore((state) => state.goNext);
  const goPrev = useLearnModeStore((state) => state.goPrev);

  const isLastStep = currentStep === TOTAL_LEARN_STEPS - 1;
  const nextButtonDisabled = isLastStep || nextDisabled;

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement;
      if (target.matches("input, textarea, select, [contenteditable='true']")) return;
      if (event.key === "ArrowLeft" && currentStep > 0) goPrev();
      if (event.key === "ArrowRight" && !nextButtonDisabled) (onNext ?? goNext)();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentStep, goNext, goPrev, nextButtonDisabled, onNext]);

  return (
    <Screen>
      <Header>
        <ProgressIndicator currentStep={currentStep} />
      </Header>
      <Content $fullBleed={fullBleedContent}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            style={
              fullBleedContent
                ? { position: "absolute", inset: 0 }
                : { width: "100%" }
            }
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </Content>
      <Footer>
        <Button variant="secondary" onClick={goPrev} disabled={currentStep === 0}>
          <ChevronLeft size={18} style={{ marginRight: 4 }} />
          Anterior
        </Button>
        <Button variant="primary" onClick={onNext ?? goNext} disabled={nextButtonDisabled}>
          Siguiente
          <ChevronRight size={18} style={{ marginLeft: 4 }} />
        </Button>
      </Footer>
    </Screen>
  );
}
