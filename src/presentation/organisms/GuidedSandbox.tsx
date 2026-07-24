"use client";

import { useEffect } from "react";
import { CanvasEditor } from "@/presentation/organisms/canvas/CanvasEditor";
import { usePaso5CanvasStore } from "@/application/hooks/usePaso5CanvasStore";
import { usePilaresStore } from "@/application/hooks/usePilaresStore";
import { buildPaso5InitialLayout } from "@/application/useCases/buildPaso5InitialLayout";

export function GuidedSandbox() {
  const itemCount = usePaso5CanvasStore((state) => state.items.length);
  const setItems = usePaso5CanvasStore((state) => state.setItems);

  useEffect(() => {
    async function init() {
      await usePilaresStore.persist.rehydrate();
      if (usePaso5CanvasStore.getState().items.length === 0) {
        setItems(buildPaso5InitialLayout(usePilaresStore.getState().respuestas));
      }
    }
    if (itemCount === 0) {
      init();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CanvasEditor
      store={usePaso5CanvasStore}
      showLibrary={false}
      emptyHint="Depuraste hasta quedarte sin secciones. ¿Qué era realmente esencial?"
    />
  );
}
