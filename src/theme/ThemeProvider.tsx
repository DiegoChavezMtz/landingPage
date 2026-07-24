"use client";

import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { tokens } from "./tokens";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <StyledThemeProvider theme={tokens}>{children}</StyledThemeProvider>;
}
