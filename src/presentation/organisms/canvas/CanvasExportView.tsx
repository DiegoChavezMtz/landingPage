import styled from "styled-components";
import { SeccionRenderer } from "@/presentation/organisms/secciones/SeccionRenderer";
import { SANDBOX_WIDGETS } from "@/domain/entities/Seccion";
import type { LandingLayoutItem } from "@/domain/entities/LandingLayout";

const Sheet = styled.div<{ $height: number }>`position:relative; width:1100px; min-height:${({ $height }) => $height}px; padding:28px; background:#fff;`;
const Item = styled.div<{ $x:number; $y:number; $width:number; $z:number }>`position:absolute; left:${({$x})=>$x}px; top:${({$y})=>$y}px; width:${({$width})=>$width}px; z-index:${({$z})=>$z};`;
const CaptionText = styled.p`margin-top:8px; color:#333; font:400 13px/1.5 var(--font-body);`;
const TextWidget = styled.p`min-height:78px; padding:16px 18px; border:1px dashed #8d8d8d; border-left:4px solid #ff1b44; border-radius:10px; background:#f7f7f7; color:#282828; font:500 20px/1.45 var(--font-body); white-space:pre-wrap;`;

export function CanvasExportView({ items }: { items: LandingLayoutItem[] }) {
  const height = Math.max(1400, ...items.map((item) => (item.y ?? 80) + (item.height ?? 260) + 120));
  return <Sheet $height={height}>{items.map((item) => { const seccion = SANDBOX_WIDGETS.find((s) => s.tipo === item.seccionTipo && s.variante === (item.variante ?? 0)) ?? SANDBOX_WIDGETS.find((s) => s.tipo === item.seccionTipo); if (!seccion) return null; return <Item key={item.id} $x={item.x ?? 80} $y={item.y ?? 80} $width={item.width ?? 620} $z={item.zIndex ?? 1}>{item.seccionTipo === "texto" ? <TextWidget>{item.texto || "Texto"}</TextWidget> : <><SeccionRenderer seccion={seccion} showPilarTag={false} showHeader={false} sandbox variant={item.variante ?? 0} content={item.contenido} />{item.texto && <CaptionText>{item.texto}</CaptionText>}</>}</Item>; })}</Sheet>;
}
