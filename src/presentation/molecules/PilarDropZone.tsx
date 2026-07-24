"use client";

import { useDroppable } from "@dnd-kit/core";
import styled from "styled-components";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

const Zone = styled(motion.button)<{ $isOver: boolean; $sinPilar?: boolean }>`
  min-height: 98px; display: flex; flex-direction: column; align-items: flex-start; justify-content: space-between;
  gap: 10px; text-align: left; padding: 16px; cursor: pointer;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme, $isOver, $sinPilar }) => $isOver ? theme.colors.accent : $sinPilar ? "#555" : theme.colors.border};
  background: ${({ theme, $isOver }) => $isOver ? theme.colors.accentMuted : theme.colors.backgroundElevated};
  color: ${({ theme }) => theme.colors.foreground};
  font: 700 1rem ${({ theme }) => theme.fonts.header};
  transition: background .15s ease, border-color .15s ease, transform .15s ease;
  svg { color: ${({ theme, $isOver, $sinPilar }) => $isOver ? theme.colors.accent : $sinPilar ? theme.colors.foregroundMuted : theme.colors.accent}; }
  &:hover:not(:disabled) { transform: translateY(-2px); border-color: ${({ theme }) => theme.colors.accent}; }
  &:focus-visible { outline: 3px solid ${({ theme }) => theme.colors.accent}; outline-offset: 2px; }
  &:disabled { cursor: default; opacity: .55; }
  span { display:block; margin-top:4px; color: ${({ theme }) => theme.colors.foregroundMuted}; font: 400 .82rem ${({ theme }) => theme.fonts.body}; }
`;

export function PilarDropZone({ id, label, hint, Icon, sinPilar = false, disabled = false, onSelect }: { id: string; label: string; hint: string; Icon: LucideIcon; sinPilar?: boolean; disabled?: boolean; onSelect: () => void; }) {
  const { setNodeRef, isOver } = useDroppable({ id, disabled });
  return <Zone ref={setNodeRef} type="button" $isOver={isOver} $sinPilar={sinPilar} disabled={disabled} onClick={onSelect} aria-label={`Elegir ${label}`} animate={{ scale: isOver ? 1.035 : 1 }} transition={{ type:"spring", stiffness:450, damping:28 }}><Icon size={20}/><div>{label}<span>{hint}</span></div></Zone>;
}
