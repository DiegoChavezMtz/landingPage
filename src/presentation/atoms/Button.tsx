"use client";

import styled from "styled-components";
import { motion } from "framer-motion";

export type ButtonVariant = "primary" | "secondary";
export type ButtonSize = "md" | "lg";

const StyledButton = styled(motion.button)<{
  $variant: ButtonVariant;
  $size: ButtonSize;
}>`
  font-family: ${({ theme }) => theme.fonts.header};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: ${({ $size }) => ($size === "lg" ? "1.15rem" : "1rem")};
  letter-spacing: 0.01em;
  padding: ${({ theme, $size }) =>
    $size === "lg"
      ? `${theme.spacing.md} ${theme.spacing.xl}`
      : `${theme.spacing.sm} ${theme.spacing.lg}`};
  border-radius: ${({ theme }) => theme.radii.pill};
  border: 1px solid
    ${({ theme, $variant }) =>
      $variant === "primary" ? theme.colors.accent : theme.colors.border};
  background: ${({ theme, $variant }) =>
    $variant === "primary" ? theme.colors.accent : "transparent"};
  color: ${({ theme }) => theme.colors.foreground};
  cursor: pointer;
  opacity: 1;
  transition: opacity 0.2s ease, border-color 0.2s ease;

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export function Button({
  variant = "primary",
  size = "md",
  disabled,
  children,
  ...props
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<typeof motion.button>) {
  return (
    <StyledButton
      $variant={variant}
      $size={size}
      disabled={disabled}
      whileHover={disabled ? undefined : { scale: 1.04 }}
      whileTap={disabled ? undefined : { scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      {...props}
    >
      {children}
    </StyledButton>
  );
}
