import { create } from "zustand";
import type { LandingLayoutItem } from "@/domain/entities/LandingLayout";
import type { SeccionTipo } from "@/domain/entities/Seccion";

export type CanvasState = {
  items: LandingLayoutItem[];
  selectedId: string | null;
  addItem: (seccionTipo: SeccionTipo, position?: { x: number; y: number }, variante?: number, size?: { width: number; height: number }) => void;
  removeItem: (id: string) => void;
  updatePosition: (id: string, position: { x: number; y: number }) => void;
  updateSize: (id: string, size: { width: number; height: number }) => void;
  bringToFront: (id: string) => void;
  sendToBack: (id: string) => void;
  duplicate: (id: string) => void;
  updateText: (id: string, texto: string) => void;
  updateContent: (id: string, key: string, value: string) => void;
  selectItem: (id: string | null) => void;
  clear: () => void;
  setItems: (items: LandingLayoutItem[]) => void;
};

function createId() {
  return typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `item-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function createCanvasStore() {
  return create<CanvasState>((set) => ({
    items: [],
    selectedId: null,
    addItem: (seccionTipo, position = { x: 80, y: 80 }, variante = 0, size = { width: 620, height: 260 }) => set((state) => ({
      items: [...state.items, { id: createId(), seccionTipo, variante, texto: "", ...position, ...size, zIndex: state.items.length + 1 }],
    })),
    removeItem: (id) => set((state) => ({ items: state.items.filter((item) => item.id !== id), selectedId: state.selectedId === id ? null : state.selectedId })),
    updatePosition: (id, position) => set((state) => ({ items: state.items.map((item) => item.id === id ? { ...item, ...position } : item) })),
    updateSize: (id, size) => set((state) => ({ items: state.items.map((item) => item.id === id ? { ...item, ...size } : item) })),
    bringToFront: (id) => set((state) => ({ items: state.items.map((item) => item.id === id ? { ...item, zIndex: Math.max(...state.items.map((i) => i.zIndex ?? 0), 0) + 1 } : item) })),
    sendToBack: (id) => set((state) => ({ items: state.items.map((item) => item.id === id ? { ...item, zIndex: 0 } : item) })),
    duplicate: (id) => set((state) => { const item = state.items.find((i) => i.id === id); if (!item) return state; return { items: [...state.items, { ...item, id: createId(), x: (item.x ?? 80) + 24, y: (item.y ?? 80) + 24, zIndex: Math.max(...state.items.map((i) => i.zIndex ?? 0), 0) + 1 }] }; }),
    updateText: (id, texto) => set((state) => ({ items: state.items.map((item) => item.id === id ? { ...item, texto } : item) })),
    updateContent: (id, key, value) => set((state) => ({ items: state.items.map((item) => item.id === id ? { ...item, contenido: { ...item.contenido, [key]: value } } : item) })),
    selectItem: (id) => set((state) => ({ selectedId: id, items: id ? state.items.map((item) => item.id === id ? { ...item, zIndex: Math.max(...state.items.map((candidate) => candidate.zIndex ?? 0), 0) + 1 } : item) : state.items })),
    clear: () => set({ items: [], selectedId: null }),
    setItems: (items) => set({ items: items.map((item, index) => ({ x: 80, y: index * 300 + 80, width: 620, height: 260, zIndex: index + 1, ...item })) }),
  }));
}

export type CanvasStore = ReturnType<typeof createCanvasStore>;
