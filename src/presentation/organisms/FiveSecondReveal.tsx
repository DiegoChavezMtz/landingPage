"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { Countdown } from "@/presentation/molecules/Countdown";
import { FIVE_SECOND_LANDINGS } from "@/domain/entities/FiveSecondLanding";
import { useFiveSecondChallengeStore } from "@/application/hooks/useFiveSecondChallengeStore";

const CHALLENGE_DURATION_SECONDS = 5;

const Stage = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background: #000;
`;

const ImageWrap = styled(motion.div)`
  position: absolute;
  inset: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Reflection = styled(motion.div)`
  position: absolute;
  inset: 0;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(20px, 4vw, 56px);
`;

const ReflectionCard = styled.div`
  width: min(920px, 100%);
  text-align: center;
`;

const ReflectionEyebrow = styled.p`
  margin-bottom: 10px;
  font-family: ${({ theme }) => theme.fonts.header};
  color: ${({ theme }) => theme.colors.accent};
  font-size: clamp(0.72rem, 1.2vw, 0.86rem);
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

const Question = styled.p`
  margin: 0 auto;
  max-width: 800px;
  color: ${({ theme }) => theme.colors.foreground};
  font: 900 clamp(2rem, 4.4vw, 3.75rem)/1.08 ${({ theme }) => theme.fonts.header};
`;

const Hint = styled.p`
  margin-top: 26px;
  color: ${({ theme }) => theme.colors.foregroundMuted};
  font-size: clamp(1rem, 1.8vw, 1.35rem);
`;

const REFLECTION_QUESTIONS = [
  "¿Qué ofrece esta página?",
  "¿Para quién parece ser?",
  "¿Qué beneficio recuerdas?",
  "¿Qué te hizo creerle?",
  "¿Qué acción te propuso?",
];

export function FiveSecondReveal() {
  const landingIndex = useFiveSecondChallengeStore((state) => state.landingIndex);
  const phase = useFiveSecondChallengeStore((state) => state.phase);
  const finishShowing = useFiveSecondChallengeStore((state) => state.finishShowing);
  const [secondsLeft, setSecondsLeft] = useState(CHALLENGE_DURATION_SECONDS);
  const [trackedLandingIndex, setTrackedLandingIndex] = useState(landingIndex);

  if (landingIndex !== trackedLandingIndex) {
    setTrackedLandingIndex(landingIndex);
    setSecondsLeft(CHALLENGE_DURATION_SECONDS);
  }

  useEffect(() => {
    if (phase !== "showing") return;
    const timeout = setTimeout(() => {
      if (secondsLeft <= 1) {
        finishShowing();
      } else {
        setSecondsLeft((value) => value - 1);
      }
    }, 1000);
    return () => clearTimeout(timeout);
  }, [phase, secondsLeft, finishShowing]);

  const landing = FIVE_SECOND_LANDINGS[landingIndex];

  return (
    <Stage>
      <AnimatePresence mode="wait">
        {phase === "showing" ? (
          <ImageWrap
            key={`landing-${landing.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={landing.src} alt={landing.alt} />
            <Countdown seconds={secondsLeft} />
          </ImageWrap>
        ) : (
          <Reflection
            key="reflection"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ReflectionCard>
              <ReflectionEyebrow>La prueba de los cinco segundos</ReflectionEyebrow>
              <Question>{REFLECTION_QUESTIONS[landingIndex]}</Question>
              <Hint>La primera impresión no cuenta toda la historia, pero decide si queremos seguir leyendo.</Hint>
            </ReflectionCard>
          </Reflection>
        )}
      </AnimatePresence>
    </Stage>
  );
}
