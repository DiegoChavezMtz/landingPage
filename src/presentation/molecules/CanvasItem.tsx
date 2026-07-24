"use client";

import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import { SeccionRenderer } from "@/presentation/organisms/secciones/SeccionRenderer";
import { SANDBOX_WIDGETS } from "@/domain/entities/Seccion";
import type { LandingLayoutItem } from "@/domain/entities/LandingLayout";
import type { CanvasStore } from "@/application/hooks/createCanvasStore";

const Wrap = styled.div<{ $dragging: boolean; $preview: boolean; $selected: boolean; $left: number; $top: number; $width: number }>`position:absolute; left:${({ $left }) => $left}px; top:${({ $top }) => $top}px; width:${({ $width }) => $width}px; max-width:calc(100% - 40px); opacity:${({ $dragging }) => $dragging ? 0 : 1}; cursor:${({ $preview }) => $preview ? "default" : "move"}; outline:${({$selected})=>$selected?"2px solid #ff1b44":"none"}; outline-offset:5px; border-radius:10px;`;
const MoveHandle = styled.button<{ $selected: boolean }>`position:absolute; top:10px; left:10px; z-index:4; display:flex; align-items:center; gap:5px; height:28px; padding:0 9px; border:1px solid #ff1b44; border-radius:6px; background:#ff1b44; color:#fff; cursor:grab; font:700 11px var(--font-body); touch-action:none; opacity:${({ $selected }) => $selected ? 1 : 0}; transition:opacity .14s ease; box-shadow:0 5px 14px rgba(255,27,68,.25); ${Wrap}:hover &{opacity:1;} &:active{cursor:grabbing;}`;
const EditableText = styled.textarea`display:block; box-sizing:border-box; width:100%; min-height:116px; resize:vertical; padding:16px 18px; border:1px dashed #8d8d8d; border-left:4px solid #ff1b44; border-radius:10px; background:#f7f7f7; color:#282828; font:500 20px/1.45 var(--font-body); letter-spacing:-.02em; outline:none; &::placeholder{color:#a4a4a4} &:focus{background:#fff;border-color:#ff1b44;box-shadow:0 8px 24px rgba(255,27,68,.12)}`;
const TextPreview = styled.p`box-sizing:border-box; width:100%; min-height:78px; margin:0; padding:16px 18px; border:1px dashed #8d8d8d; border-left:4px solid #ff1b44; border-radius:10px; background:#f7f7f7; color:#282828; font:500 20px/1.45 var(--font-body); white-space:pre-wrap;`;

export function CanvasItem({ item, store, preview = false, selected = false, onSelect }: { item: LandingLayoutItem; store: CanvasStore; preview?: boolean; selected?: boolean; onSelect?: () => void }) {
  const updateText = store((state) => state.updateText); const updateContent = store((state) => state.updateContent); const updatePosition = store((state) => state.updatePosition); const updateSize = store((state) => state.updateSize);
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: item.id, disabled: preview });
  const nodeRef = useRef<HTMLDivElement | null>(null);
  const seccion = SANDBOX_WIDGETS.find((s) => s.tipo === item.seccionTipo && s.variante === (item.variante ?? 0)) ?? SANDBOX_WIDGETS.find((s) => s.tipo === item.seccionTipo)!;
  const left = item.x ?? 80; const top = item.y ?? 80; const width = item.width ?? 620;
  const isTextWidget = item.seccionTipo === "texto";
  // The floating DragOverlay is the only drag visual; the original keeps its layout
  // space but becomes invisible while the scrollable canvas advances underneath it.
  const style = { zIndex: item.zIndex ?? 1, transform: isDragging ? undefined : CSS.Translate.toString(transform) } as React.CSSProperties;
  function handleKeyDown(event: React.KeyboardEvent) {
    const step = event.shiftKey ? 10 : 2;
    const moves = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] } as Record<string, number[]>;
    const move = moves[event.key];
    if (!move) return;
    event.preventDefault();
    updatePosition(item.id, { x: Math.max(20, (item.x ?? 80) + move[0]), y: Math.max(20, (item.y ?? 80) + move[1]) });
  }
  function handleMovePointerDown(event: React.PointerEvent<HTMLButtonElement>) {
    // Keep the parent selection update out of the activator event. The handle stays
    // mounted, so dnd-kit can begin measuring on the very first drag gesture.
    event.stopPropagation();
    listeners?.onPointerDown?.(event);
  }
  function assignNodeRef(node: HTMLDivElement | null) {
    nodeRef.current = node;
    setNodeRef(node);
  }
  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;
    const syncHeight = () => {
      const height = Math.ceil(node.getBoundingClientRect().height);
      if (height > 0 && Math.abs((item.height ?? 0) - height) > 1) updateSize(item.id, { width, height });
    };
    syncHeight();
    const observer = new ResizeObserver(syncHeight);
    observer.observe(node);
    return () => observer.disconnect();
  }, [item.height, item.id, updateSize, width]);
  return <Wrap ref={assignNodeRef} onPointerDown={onSelect} style={style} $left={left} $top={top} $width={width} $dragging={isDragging} $preview={preview} $selected={selected}>
    {!preview && <MoveHandle {...attributes} {...listeners} $selected={selected} onPointerDown={handleMovePointerDown} onKeyDown={handleKeyDown} aria-label="Mover widget"><GripVertical size={14} /> Mover</MoveHandle>}
    {isTextWidget
      ? preview
        ? <TextPreview>{item.texto || "Texto"}</TextPreview>
        : <EditableText value={item.texto ?? ""} onChange={(event) => updateText(item.id, event.target.value)} placeholder="Escribe tu texto aquí…" aria-label="Texto editable" />
      : <SeccionRenderer seccion={seccion} showPilarTag={false} showHeader={false} sandbox variant={item.variante ?? 0} content={item.contenido} onContentChange={preview ? undefined : (key, value) => updateContent(item.id, key, value)} />}
  </Wrap>;
}
