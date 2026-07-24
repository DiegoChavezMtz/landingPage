"use client";

import { useState } from "react";
import { ChevronRight, Plus } from "lucide-react";
import styled from "styled-components";
import { SANDBOX_WIDGETS } from "@/domain/entities/Seccion";
import { SeccionRenderer } from "@/presentation/organisms/secciones/SeccionRenderer";
import type { SandboxWidget } from "@/domain/entities/Seccion";

const SidebarWrap = styled.aside`width:332px; flex-shrink:0; display:flex; flex-direction:column; gap:10px; position:sticky; top:0; max-height:calc(100vh - 190px); overflow-y:auto; overflow-x:hidden; padding:14px; border:1px solid #303030; border-radius:12px; background:#141414;`;
const Heading = styled.div`font:700 12px var(--font-body); color:#fff; text-transform:uppercase; letter-spacing:.08em;`;
const Hint = styled.p`font:400 12px/1.45 var(--font-body); color:#8e8e8e; margin-bottom:4px;`;
const Grid = styled.div`display:flex; flex-direction:column; gap:12px;`;
const Group = styled.section`display:flex; flex-direction:column; gap:9px; padding-top:8px; border-top:1px solid #2b2b2b;`;
const GroupTitle = styled.button<{ $open: boolean }>`display:flex; align-items:center; justify-content:space-between; width:100%; border:0; background:transparent; color:#f2f2f2; cursor:pointer; font:700 10px var(--font-body); text-align:left; text-transform:uppercase; letter-spacing:.12em; svg{color:#ff1b44;transition:transform .18s ease; transform:rotate(${({$open})=>$open?90:0}deg)}`;
const AddCard = styled.button`position:relative; width:100%; padding:30px 0 0; border:0; border-radius:10px; overflow:hidden; cursor:pointer; background:transparent; text-align:left; transition:transform .18s ease,filter .18s ease; &:hover{transform:translateY(-2px);filter:drop-shadow(0 8px 12px rgba(0,0,0,.28));} &:focus-visible{outline:2px solid #ff1b44;outline-offset:3px;}`;
const Tooltip = styled.div`position:absolute; inset:30px 8px 8px; z-index:5; display:flex; align-items:center; padding:12px; border:1px solid rgba(255,27,68,.7); border-radius:8px; background:rgba(20,20,20,.97); color:#f3f3f3; font:500 11px/1.45 var(--font-body); opacity:0; pointer-events:none; transition:opacity .16s ease; ${AddCard}:hover &{opacity:1;}`;
const WidgetName = styled.span`position:absolute; top:0; left:0; z-index:4; width:100%; box-sizing:border-box; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; padding:8px 10px; border:1px solid #3a3a3a; border-bottom:0; border-radius:8px 8px 0 0; background:#242424; color:#f5f5f5; font:700 10px var(--font-body); letter-spacing:.03em;`;
const AddMark = styled.span`position:absolute; right:10px; bottom:10px; z-index:6; display:grid; place-items:center; width:28px; height:28px; border:1px solid #ff1b44; border-radius:50%; background:#ff1b44; color:#fff; box-shadow:0 3px 8px rgba(0,0,0,.22);`;

function LibraryItem({ seccion, onAdd }: { seccion: SandboxWidget; onAdd: (widget: SandboxWidget) => void }) {
  return <AddCard type="button" title={seccion.descripcion} aria-label={`Agregar ${seccion.nombre}: ${seccion.descripcion}`} onClick={() => onAdd(seccion)}><SeccionRenderer seccion={seccion} showHeader={false} showPilarTag={false} sandbox variant={seccion.variante} /><WidgetName>{seccion.nombre}</WidgetName><AddMark aria-hidden="true"><Plus size={15} /></AddMark><Tooltip>{seccion.descripcion}</Tooltip></AddCard>;
}

export function SeccionLibrary({ onAdd }: { onAdd: (widget: SandboxWidget) => void }) {
  const categories = ["Estructura y conversión", "Confianza y narrativa", "Media y captación", "Contenido"] as const;
  const [openCategories, setOpenCategories] = useState<Set<string>>(() => new Set());
  function toggle(category: string) { setOpenCategories((current) => { const next = new Set(current); if (next.has(category)) next.delete(category); else next.add(category); return next; }); }
  return <SidebarWrap><Heading>Secciones para construir</Heading><Hint>Cada sección debe resolver una necesidad del recorrido. Añade solo las que fortalezcan el argumento.</Hint><Grid>{categories.map((category) => { const open = openCategories.has(category); return <Group key={category}><GroupTitle type="button" $open={open} onClick={() => toggle(category)} aria-expanded={open}>{category}<ChevronRight size={14} /></GroupTitle>{open && SANDBOX_WIDGETS.filter((widget) => widget.categoria === category).map((seccion) => <LibraryItem key={seccion.id} seccion={seccion} onAdd={onAdd} />)}</Group>; })}</Grid></SidebarWrap>;
}
