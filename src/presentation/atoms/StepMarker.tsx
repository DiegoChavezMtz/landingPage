import styled from "styled-components";
import { motion } from "framer-motion";

const Triangle = styled(motion.div)<{ $active: boolean }>`
  width: 0;
  height: 0;
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
  border-bottom: 12px solid
    ${({ theme, $active }) =>
      $active ? theme.colors.accent : theme.colors.border};
`;

export function StepMarker({ active }: { active: boolean }) {
  return (
    <Triangle
      $active={active}
      animate={{ scale: active ? 1.15 : 1, opacity: active ? 1 : 0.6 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    />
  );
}
