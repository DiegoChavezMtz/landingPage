import { create } from "zustand";
import { FIVE_SECOND_LANDINGS } from "@/domain/entities/FiveSecondLanding";

export type FiveSecondPhase = "showing" | "blackout";

type FiveSecondChallengeState = {
  landingIndex: number;
  phase: FiveSecondPhase;
  finishShowing: () => void;
  advanceLanding: () => void;
  reset: () => void;
};

export const useFiveSecondChallengeStore = create<FiveSecondChallengeState>(
  (set) => ({
    landingIndex: 0,
    phase: "showing",
    finishShowing: () => set({ phase: "blackout" }),
    advanceLanding: () =>
      set((state) => ({
        landingIndex: Math.min(
          state.landingIndex + 1,
          FIVE_SECOND_LANDINGS.length - 1
        ),
        phase: "showing",
      })),
    reset: () => set({ landingIndex: 0, phase: "showing" }),
  })
);
