import { create } from "zustand";
import { TOTAL_LEARN_STEPS } from "@/domain/types/LearnStep";

type LearnModeState = {
  currentStep: number;
  goNext: () => void;
  goPrev: () => void;
  goToStep: (step: number) => void;
};

const clampStep = (step: number) =>
  Math.min(Math.max(step, 0), TOTAL_LEARN_STEPS - 1);

export const useLearnModeStore = create<LearnModeState>((set) => ({
  currentStep: 0,
  goNext: () => set((state) => ({ currentStep: clampStep(state.currentStep + 1) })),
  goPrev: () => set((state) => ({ currentStep: clampStep(state.currentStep - 1) })),
  goToStep: (step) => set({ currentStep: clampStep(step) }),
}));
