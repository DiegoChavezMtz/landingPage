"use client";

import { DndContext, DragOverlay, PointerSensor, pointerWithin, useSensor, useSensors, type DragEndEvent, type DragMoveEvent, type DragStartEvent } from "@dnd-kit/core";
import { useRef, useState } from "react";
import styled from "styled-components";
import { Grid3X3, Maximize2 } from "lucide-react";
import { SeccionLibrary } from "@/presentation/organisms/canvas/SeccionLibrary";
import { Canvas } from "@/presentation/organisms/canvas/Canvas";
import { SeccionRenderer } from "@/presentation/organisms/secciones/SeccionRenderer";
import type { CanvasStore } from "@/application/hooks/createCanvasStore";
import { SANDBOX_WIDGETS, type SandboxWidget } from "@/domain/entities/Seccion";
import { getRenderedWidgetHeight, getWidgetHeight } from "@/presentation/organisms/canvas/widgetSizing";

const Editor = styled.div`display:flex; flex-direction:column; gap:12px; width:100%;`;
const Layout = styled.div`display:flex; align-items:flex-start; gap:20px; width:100%;`;
const Bar = styled.div`display:flex; align-items:center; justify-content:space-between; gap:12px; padding:10px 14px; background:#151515; border:1px solid #292929; border-radius:10px; color:#c9c9c9;`;
const Tools = styled.div`display:flex; align-items:center; gap:6px;`;
const Tool = styled.button`display:inline-flex; align-items:center; gap:6px; border:1px solid #343434; background:#202020; color:#d6d6d6; border-radius:7px; padding:7px 9px; cursor:pointer; font:500 12px var(--font-body); &:hover{border-color:#ff1b44;color:#fff}`;
const DragCard = styled.div<{ $width: number }>`width:${({ $width }) => $width}px; max-width:calc(100vw - 40px); border-radius:10px; background:#fff; box-shadow:0 18px 44px rgba(0,0,0,.24); cursor:grabbing; pointer-events:none;`;
const DragText = styled.p`min-height:78px; margin:0; padding:16px 18px; border:1px dashed #8d8d8d; border-left:4px solid #ff1b44; border-radius:10px; background:#f7f7f7; color:#282828; font:500 20px/1.45 var(--font-body); white-space:pre-wrap;`;

type DropPosition = { x: number; y: number; width: number; height: number };
const DEFAULT_WIDTH = 620;

export function CanvasEditor({ store, showLibrary = true, emptyHint }: { store: CanvasStore; showLibrary?: boolean; emptyHint?: string }) {
  const addItem = store((state) => state.addItem);
  const updatePosition = store((state) => state.updatePosition);
  const bringToFront = store((state) => state.bringToFront);
  const selectItem = store((state) => state.selectItem);
  const items = store((state) => state.items);
  const canvasRef = useRef<HTMLDivElement>(null);
  const grabOffsetRef = useRef({ x: 0, y: 0 });
  const lastDropPositionRef = useRef<DropPosition | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [grid, setGrid] = useState(true);
  const [preview, setPreview] = useState(false);
  const [dropPreview, setDropPreview] = useState<DropPosition | null>(null);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));

  function stage() { return canvasRef.current?.querySelector<HTMLElement>("[data-canvas-stage]") ?? null; }
  function isActiveInsideCanvas(active: DragEndEvent["active"]) {
    const canvas = canvasRef.current;
    const translated = active.rect.current.translated ?? active.rect.current.initial;
    if (!canvas || !translated) return false;
    const rect = canvas.getBoundingClientRect();
    const pointerX = translated.left + grabOffsetRef.current.x;
    const pointerY = translated.top + grabOffsetRef.current.y;
    return pointerX >= rect.left && pointerX <= rect.right && pointerY >= rect.top && pointerY <= rect.bottom;
  }
  function calculateDrop(active: DragEndEvent["active"]): DropPosition | null {
    const canvas = canvasRef.current; const canvasStage = stage();
    if (!canvas || !canvasStage) return null;
    const item = items.find((candidate) => candidate.id === String(active.id));
    if (!item) return null;
    const width = item.width ?? DEFAULT_WIDTH;
    const rect = canvas.getBoundingClientRect();
    const paddingLeft = Number.parseFloat(window.getComputedStyle(canvas).paddingLeft) || 0;
    const paddingTop = Number.parseFloat(window.getComputedStyle(canvas).paddingTop) || 0;
    // Use the same translated rectangle that powers DragOverlay. This keeps the
    // destination marker and the visible dragged widget in exact sync.
    const translated = active.rect.current.translated ?? active.rect.current.initial;
    if (!translated) return null;
    const height = Math.ceil(translated.height);
    const rawX = translated.left - rect.left - paddingLeft;
    const rawY = translated.top - rect.top - paddingTop + canvas.scrollTop;
    const snap = (value: number) => Math.max(20, Math.round(value / 4) * 4);
    return { x: Math.min(Math.max(20, canvasStage.clientWidth - width - 20), snap(rawX)), y: snap(rawY), width, height };
  }
  function handleDragStart(event: DragStartEvent) {
    const pointer = event.activatorEvent as PointerEvent | undefined;
    const initial = event.active.rect.current.initial;
    grabOffsetRef.current = initial && pointer ? { x: pointer.clientX - initial.left, y: pointer.clientY - initial.top } : { x: 0, y: 0 };
    lastDropPositionRef.current = null;
    selectItem(String(event.active.id));
    setActiveId(String(event.active.id));
  }
  function handleDragMove(event: DragMoveEvent) {
    const next = calculateDrop(event.active);
    lastDropPositionRef.current = next;
    setDropPreview(next);
  }
  function finishDrag() {
    setDropPreview(null); grabOffsetRef.current = { x: 0, y: 0 }; lastDropPositionRef.current = null; setActiveId(null);
  }
  function handleDragEnd(event: DragEndEvent) {
    const canDrop = isActiveInsideCanvas(event.active);
    const next = canDrop ? lastDropPositionRef.current : null;
    finishDrag();
    if (!canDrop || !next) return;
    updatePosition(String(event.active.id), { x: next.x, y: next.y });
    bringToFront(String(event.active.id));
  }
  function addFromLibrary(widget: SandboxWidget) {
    const canvasStage = stage();
    if (!canvasStage) return;
    const width = Math.min(DEFAULT_WIDTH, Math.max(240, canvasStage.clientWidth - 40));
    const lowest = items.reduce((bottom, item) => Math.max(bottom, (item.y ?? 80) + getRenderedWidgetHeight(item)), 40);
    const y = items.length === 0 ? 80 : lowest + 48;
    addItem(widget.tipo, { x: 20, y }, widget.variante, { width, height: getWidgetHeight(widget.tipo, widget.variante) });
    canvasRef.current?.scrollTo({ top: Math.max(0, y - 64), behavior: "smooth" });
  }

  const activeItem = activeId ? items.find((item) => item.id === activeId) : null;
  const activeSection = activeItem ? SANDBOX_WIDGETS.find((section) => section.tipo === activeItem.seccionTipo && section.variante === (activeItem.variante ?? 0)) ?? SANDBOX_WIDGETS.find((section) => section.tipo === activeItem.seccionTipo) : null;

  return <DndContext sensors={sensors} autoScroll={false} collisionDetection={pointerWithin} onDragStart={handleDragStart} onDragMove={handleDragMove} onDragCancel={finishDrag} onDragEnd={handleDragEnd}>
    <Editor>
      {!preview && <Bar><span>Tu argumento, convertido en recorrido</span><Tools><Tool onClick={() => setGrid((value) => !value)}><Grid3X3 size={14} /> Cuadrícula</Tool><Tool onClick={() => setPreview(true)}><Maximize2 size={14} /> Ver recorrido</Tool></Tools></Bar>}
      <Layout>{showLibrary && !preview && <SeccionLibrary onAdd={addFromLibrary} />}<Canvas ref={canvasRef} store={store} grid={grid} preview={preview} emptyHint={emptyHint} onExitPreview={() => setPreview(false)} dropPreview={dropPreview} /></Layout>
    </Editor>
    <DragOverlay adjustScale={false} dropAnimation={null}>
      {activeItem && activeSection && <DragCard $width={activeItem.width ?? DEFAULT_WIDTH}>
        {activeItem.seccionTipo === "texto"
          ? <DragText>{activeItem.texto || "Texto"}</DragText>
          : <SeccionRenderer seccion={activeSection} showPilarTag={false} showHeader={false} sandbox variant={activeItem.variante ?? 0} content={activeItem.contenido} />}
      </DragCard>}
    </DragOverlay>
  </DndContext>;
}
