"use client";

import { createContext, useContext, useId, type ComponentPropsWithoutRef, type ReactNode } from "react";
import styled from "styled-components";

type Tone = "soft" | "muted" | "dark" | "accent";
// The tones describe content roles, not visual themes. This keeps every widget
// legible as the same wireframe system regardless of its composition.
const tone = { soft:{fill:"#f8f8f8",line:"#c5c5c5"}, muted:{fill:"#f0f0f0",line:"#adadad"}, dark:{fill:"#e4e4e4",line:"#888888"}, accent:{fill:"#fff1f3",line:"#ff1b44"} };
type EditContext = { editable: boolean; content?: Record<string,string>; onChange?: (key:string, value:string) => void };
const WireframeEditContext = createContext<EditContext>({ editable:false });

export function WireframeEditProvider({ children, ...value }: EditContext & { children: ReactNode }) { return <WireframeEditContext.Provider value={value}>{children}</WireframeEditContext.Provider>; }

export const SketchBlock = styled.div<{ $circle?: boolean; $tone?: Tone; $image?: boolean }>`
  position:relative; display:flex; align-items:center; justify-content:center; overflow:hidden;
  background:${({$tone="soft",$image})=>$image?`repeating-linear-gradient(45deg, ${tone[$tone].fill}, ${tone[$tone].fill} 3px, #fff 3px, #fff 9px)`:tone[$tone].fill};
  border:1px solid ${({$tone="soft"})=>tone[$tone].line}; border-radius:${({theme,$circle})=>$circle?"50%":theme.radii.sm};
  ${({$image})=>$image && `&::before{content:"IMAGEN";position:relative;z-index:1;color:#777;font:700 9px var(--font-body);letter-spacing:.14em}`}
`;

const Line = styled.div<{ $width?: string; $tone?: Tone }>`
  width:${({$width})=>$width??"100%"}; min-height:10px; padding:1px 0; border-bottom:1px solid ${({$tone="dark"})=>tone[$tone].line};
  color:#555; font:500 11px/1.25 var(--font-body); letter-spacing:-.01em; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; opacity:.88;
  &[contenteditable="true"]{cursor:text;background:rgba(255,255,255,.65)} &[contenteditable="true"]:focus{outline:1px solid #ff1b44;background:#fff;border-radius:3px;padding-inline:3px;white-space:normal}
`;

type SketchLineProps = ComponentPropsWithoutRef<"div"> & { $width?: string; $tone?: Tone; slot?: string; defaultText?: string };
export function SketchLine({ $width, $tone, slot, defaultText = "Una idea clara ocupa el lugar correcto", children, onBlur, ...props }: SketchLineProps) {
  const context = useContext(WireframeEditContext); const generated = useId(); const key = slot ?? generated; const value = context.content?.[key] ?? (children ? String(children) : defaultText);
  return <Line {...props} $width={$width} $tone={$tone} contentEditable={context.editable} suppressContentEditableWarning onBlur={(event) => { context.onChange?.(key, event.currentTarget.textContent ?? ""); onBlur?.(event); }}>{value}</Line>;
}

const Button = styled.div`display:inline-flex; align-items:center; justify-content:center; min-width:92px; min-height:28px; padding:6px 12px; border:1px solid #ff1b44; border-radius:6px; background:#ff1b44; color:#fff; font:700 11px var(--font-body); white-space:nowrap; &[contenteditable="true"]{cursor:text} &[contenteditable="true"]:focus{outline:2px solid rgba(255,27,68,.25);background:#d90e34}`;
export function SketchButton({ slot, defaultText = "Botón" }: { slot?: string; defaultText?: string }) { const context = useContext(WireframeEditContext); const generated = useId(); const key = slot ?? generated; return <Button contentEditable={context.editable} suppressContentEditableWarning onBlur={(event)=>context.onChange?.(key,event.currentTarget.textContent??"")}>{context.content?.[key] ?? defaultText}</Button>; }
