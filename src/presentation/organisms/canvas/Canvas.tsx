"use client";

import { forwardRef } from "react";
import { useDroppable } from "@dnd-kit/core";
import styled from "styled-components";
import { Copy, Layers, SendToBack, Trash2, X } from "lucide-react";
import type { CanvasStore } from "@/application/hooks/createCanvasStore";
import { CanvasItem } from "@/presentation/molecules/CanvasItem";
import { getRenderedWidgetHeight } from "@/presentation/organisms/canvas/widgetSizing";

const Shell = styled.div<{ $grid: boolean; $isOver: boolean }>`position:relative; flex:1; min-width:0; min-height:640px; height:calc(100vh - 190px); overflow-y:auto; overflow-x:hidden; overscroll-behavior-x:none; border:1px solid ${({ $isOver }) => $isOver ? "#ff1b44" : "#d6d4d0"}; border-radius:12px; background-color:#f3f2f0; background-image:${({ $grid }) => $grid ? "linear-gradient(#dfddd9 1px, transparent 1px),linear-gradient(90deg,#dfddd9 1px,transparent 1px)" : "none"}; background-size:20px 20px; box-shadow:0 18px 50px rgba(0,0,0,.18); padding:28px;`;
const Stage = styled.div<{ $height: number }>`position:relative; width:100%; min-height:${({ $height }) => $height}px;`;
const DropGhost = styled.div<{ $x:number; $y:number; $width:number; $height:number }>`position:absolute; left:${({$x})=>$x}px; top:${({$y})=>$y}px; width:${({$width})=>$width}px; max-width:calc(100% - 40px); height:${({$height})=>$height}px; border:2px dashed #ff1b44; border-radius:10px; background:rgba(255,27,68,.07); pointer-events:none; z-index:999; transition:left .04s linear,top .04s linear;`;
const Empty = styled.p`position:absolute; top:45%; left:0; right:0; text-align:center; color:#8d8d8d; font:500 14px var(--font-body);`;
const Exit = styled.button`position:sticky; top:14px; float:right; z-index:20; border:1px solid #d8d8d8; background:#fff; color:#242424; border-radius:7px; padding:7px 10px; cursor:pointer;`;
const SelectionLayer = styled.div`position:sticky; top:12px; z-index:1000; height:0; display:flex; justify-content:flex-end; pointer-events:none;`;
const SelectionBar = styled.div`display:flex; align-items:center; gap:5px; padding:6px; border:1px solid #ff1b44; border-radius:8px; background:#1d1d1d; box-shadow:0 10px 26px rgba(0,0,0,.25); pointer-events:auto;`;
const Action = styled.button`display:grid; place-items:center; width:30px; height:30px; border:0; border-radius:5px; background:#2c2c2c; color:#fff; cursor:pointer; &:hover{background:#ff1b44;}`;

export const Canvas = forwardRef<HTMLDivElement, { store: CanvasStore; grid: boolean; preview?: boolean; emptyHint?: string; onExitPreview?: () => void; dropPreview?: { x:number; y:number; width:number; height:number } | null }>(function Canvas({ store, grid, preview = false, emptyHint = "Tu landing comienza con una decisión: ¿qué debe entenderse primero?", onExitPreview, dropPreview }, ref) {
  const items = store((state) => state.items);
  const selectedId = store((state) => state.selectedId);
  const selectItem = store((state) => state.selectItem);
  const removeItem = store((state) => state.removeItem);
  const duplicate = store((state) => state.duplicate);
  const bringToFront = store((state) => state.bringToFront);
  const sendToBack = store((state) => state.sendToBack);
  const { setNodeRef, isOver } = useDroppable({ id: "canvas-dropzone" });
  const stageHeight = Math.max(1200, ...items.map((item) => (item.y ?? 80) + getRenderedWidgetHeight(item) + 120), dropPreview ? dropPreview.y + dropPreview.height + 120 : 0);
  const clearSelection = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!preview && event.target === event.currentTarget) selectItem(null);
  };
  return <Shell onPointerDown={clearSelection} ref={(node) => { setNodeRef(node); if (typeof ref === "function") ref(node); else if (ref) ref.current = node; }} $grid={grid} $isOver={isOver}>
    {preview && onExitPreview && <Exit onClick={onExitPreview}><X size={14} /> Salir</Exit>}
    {!preview && selectedId && <SelectionLayer><SelectionBar aria-label="Herramientas del widget seleccionado"><Action onClick={() => bringToFront(selectedId)} aria-label="Traer al frente"><Layers size={15} /></Action><Action onClick={() => sendToBack(selectedId)} aria-label="Enviar atrás"><SendToBack size={15} /></Action><Action onClick={() => duplicate(selectedId)} aria-label="Duplicar"><Copy size={15} /></Action><Action onClick={() => removeItem(selectedId)} aria-label="Eliminar"><Trash2 size={15} /></Action></SelectionBar></SelectionLayer>}
    <Stage onPointerDown={clearSelection} data-canvas-stage="true" $height={stageHeight}>{items.length === 0 && <Empty>{emptyHint}</Empty>}{dropPreview && <DropGhost $x={dropPreview.x} $y={dropPreview.y} $width={dropPreview.width} $height={dropPreview.height} />}{items.map((item) => <CanvasItem key={item.id} item={item} store={store} preview={preview} selected={item.id === selectedId} onSelect={() => selectItem(item.id)} />)}</Stage>
  </Shell>;
});
