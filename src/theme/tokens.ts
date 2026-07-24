export const tokens = {
  colors: {
    background: "#0A0A0A",
    backgroundElevated: "#161616",
    surface: "#1F1F1F",
    border: "#2A2A2A",
    foreground: "#FFFFFF",
    foregroundMuted: "#A3A3A3",
    accent: "#FF1B44",
    accentMuted: "#4D0817",
  },
  fonts: {
    header: "var(--font-header)",
    body: "var(--font-body)",
  },
  fontWeights: {
    regular: 400,
    medium: 500,
    bold: 700,
    black: 900,
  },
  spacing: {
    xxs: "4px",
    xs: "8px",
    sm: "12px",
    md: "20px",
    lg: "32px",
    xl: "48px",
    xxl: "80px",
  },
  radii: {
    sm: "6px",
    md: "12px",
    lg: "20px",
    pill: "999px",
  },
} as const;

export type Tokens = typeof tokens;
