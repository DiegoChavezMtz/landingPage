"use client";

import { useDraggable } from "@dnd-kit/core";
import styled from "styled-components";
import { GripVertical } from "lucide-react";
import { SeccionRenderer } from "@/presentation/organisms/secciones/SeccionRenderer";
import type { Seccion } from "@/domain/entities/Seccion";

const Card = styled.div<{ $dragging?: boolean; $overlay?: boolean }>`
  width: 100%;
  max-width: 460px;
  position: relative;
  cursor: ${({ $overlay }) => ($overlay ? "grabbing" : "grab")};
  touch-action: none;
  opacity: ${({ $dragging }) => ($dragging ? 0.22 : 1)};
  transform: ${({ $overlay }) => ($overlay ? "rotate(1.5deg) scale(1.03)" : "none")};
  filter: ${({ $overlay }) => ($overlay ? "brightness(1.12)" : "none")};
  box-shadow: ${({ $overlay }) => ($overlay ? "0 26px 70px rgba(0,0,0,.55)" : "none")};
  border-radius: ${({ theme }) => theme.radii.md};
  transition: opacity .15s ease, box-shadow .15s ease;
  &:focus-visible { outline: 3px solid ${({ theme }) => theme.colors.accent}; outline-offset: 4px; }
`;

const Handle = styled.div`
  position: absolute; z-index: 2; top: 10px; right: 10px;
  display: flex; align-items: center; gap: 5px; padding: 6px 9px;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: #0a0a0ad9; color: ${({ theme }) => theme.colors.foregroundMuted};
  font: 600 .68rem ${({ theme }) => theme.fonts.body};
`;

export function DraggableSeccionCard({ seccion, overlay = false }: { seccion: Seccion; overlay?: boolean }) {
  const draggable = useDraggable({ id: "current-card", disabled: overlay });
  return (
    <Card
      ref={overlay ? undefined : draggable.setNodeRef}
      $dragging={!overlay && draggable.isDragging}
      $overlay={overlay}
      {...(!overlay ? draggable.listeners : {})}
      {...(!overlay ? draggable.attributes : {})}
      aria-label={overlay ? undefined : `${seccion.nombre}. Arrastra hacia un pilar o selecciona una opción debajo.`}
    >
      <Handle><GripVertical size={14}/>{overlay ? "Suelta para elegir" : "Arrastra"}</Handle>
      <SeccionRenderer seccion={seccion} showPilarTag={false} />
    </Card>
  );
}
