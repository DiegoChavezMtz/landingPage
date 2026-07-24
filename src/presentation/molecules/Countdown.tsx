import styled from "styled-components";
import { motion } from "framer-motion";

const Badge = styled(motion.div)`
  position: absolute;
  top: ${({ theme }) => theme.spacing.lg};
  right: ${({ theme }) => theme.spacing.lg};
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.accent};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${({ theme }) => theme.fonts.header};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: 1.75rem;
  color: ${({ theme }) => theme.colors.foreground};
  z-index: 10;
`;

export function Countdown({ seconds }: { seconds: number }) {
  return (
    <Badge key={seconds} initial={{ scale: 1.3 }} animate={{ scale: 1 }}>
      {seconds}
    </Badge>
  );
}
