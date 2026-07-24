"use client";

import { Toaster } from "react-hot-toast";

export function AppToaster() {
  return (
    <Toaster
      position="bottom-center"
      toastOptions={{
        style: {
          background: "#1F1F1F",
          color: "#FFFFFF",
          border: "1px solid #2A2A2A",
          fontFamily: "var(--font-body)",
        },
      }}
    />
  );
}
