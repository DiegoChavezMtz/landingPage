import { create } from "zustand";
import { SECCIONES } from "@/domain/entities/Seccion";
import type { PilarId } from "@/domain/entities/Pilar";

export type MatchFeedback = "correct" | "incorrect" | null;

type MatchingExerciseState = {
  currentPos: number;
  order: number[];
  feedback: MatchFeedback;
  submit: (pilarId: PilarId | null) => void;
  advance: () => void;
  reset: () => void;
};

const TOTAL = SECCIONES.length;
const INITIAL_ORDER = shuffledOrder();

function shuffledOrder() {
  const order = Array.from({ length: TOTAL }, (_, index) => index);
  for (let index = order.length - 1; index > 0; index--) {
    const target = Math.floor(Math.random() * (index + 1));
    [order[index], order[target]] = [order[target], order[index]];
  }
  return order;
}

export const useMatchingExerciseStore = create<MatchingExerciseState>(
  (set, get) => ({
    currentPos: 0,
    order: INITIAL_ORDER,
    feedback: null,
    submit: (pilarId) => {
      const { currentPos, feedback, order } = get();
      if (feedback || currentPos >= TOTAL) return;
      const seccion = SECCIONES[order[currentPos]];
      set({ feedback: seccion.pilarId === pilarId ? "correct" : "incorrect" });
    },
    advance: () =>
      set((state) => ({
        currentPos: Math.min(state.currentPos + 1, TOTAL),
        feedback: null,
      })),
    reset: () => set({ currentPos: 0, order: shuffledOrder(), feedback: null }),
  })
);

export const MATCHING_EXERCISE_TOTAL = TOTAL;
