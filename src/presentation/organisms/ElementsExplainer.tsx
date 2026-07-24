"use client";
import { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { ArrowRight, Box, Check, Layers3, Target } from "lucide-react";
import { PILARES } from "@/domain/entities/Pilar";
import { SECCIONES, type SeccionTipo } from "@/domain/entities/Seccion";

const Wrap=styled.div`width:100%;max-width:1440px;margin:0 auto;`;
const Intro=styled.p`margin:-6px 0 18px;text-align:center;color:${({theme})=>theme.colors.foregroundMuted};font:600 clamp(1rem,1.5vw,1.25rem) ${({theme})=>theme.fonts.body};`;
const Layout=styled.div`display:grid;grid-template-columns:270px minmax(0,1fr);gap:14px;@media(max-width:760px){grid-template-columns:1fr;}`;
const Menu=styled.nav`display:grid;grid-template-columns:1fr;gap:8px;`;
const Item=styled.button<{$active:boolean}>`display:flex;align-items:center;justify-content:space-between;min-height:67px;padding:12px 14px;border:1px solid ${({$active,theme})=>$active?theme.colors.accent:theme.colors.border};border-radius:${({theme})=>theme.radii.md};background:${({$active,theme})=>$active?theme.colors.accentMuted:theme.colors.backgroundElevated};color:white;text-align:left;cursor:pointer;font:800 1rem ${({theme})=>theme.fonts.header};small{display:block;color:${({theme})=>theme.colors.foregroundMuted};font:700 .72rem ${({theme})=>theme.fonts.body};margin-bottom:3px;}svg{color:${({theme})=>theme.colors.accent};}`;
const Stage=styled(motion.section)`min-height:430px;display:grid;grid-template-columns:1.05fr .95fr;border:1px solid ${({theme})=>theme.colors.border};border-radius:${({theme})=>theme.radii.lg};overflow:hidden;background:${({theme})=>theme.colors.backgroundElevated};@media(max-width:860px){grid-template-columns:1fr;}`;
const Copy=styled.div`padding:clamp(26px,4vw,54px);display:flex;flex-direction:column;justify-content:center;`;
const Eyebrow=styled.div`display:flex;gap:7px;align-items:center;color:${({theme})=>theme.colors.accent};font:800 .8rem ${({theme})=>theme.fonts.header};letter-spacing:.12em;`;
const Title=styled.h3`margin:12px 0;font:900 clamp(2.6rem,5vw,5rem)/.95 ${({theme})=>theme.fonts.header};letter-spacing:-.06em;`;
const Definition=styled.p`color:${({theme})=>theme.colors.foregroundMuted};font-size:clamp(1.2rem,2vw,1.7rem);line-height:1.35;`;
const Function=styled.div`display:flex;gap:12px;align-items:flex-start;margin-top:26px;padding-top:20px;border-top:1px solid ${({theme})=>theme.colors.border};color:${({theme})=>theme.colors.foregroundMuted};font-size:1rem;strong{display:block;color:white;font-size:1.1rem;margin-bottom:4px;}`;
const Anatomy=styled.div`padding:clamp(24px,3vw,44px);background:linear-gradient(145deg,#1c1216,#100d0f);h4{display:flex;align-items:center;gap:8px;margin-bottom:18px;font:800 1.1rem ${({theme})=>theme.fonts.header};}`;
const Parts=styled.div`display:grid;grid-template-columns:1fr 1fr;gap:10px;`;
const Part=styled.div`min-height:95px;display:flex;align-items:center;gap:11px;padding:15px;border:1px solid ${({theme})=>theme.colors.border};border-radius:${({theme})=>theme.radii.md};background:#0a0a0a;color:white;font:700 clamp(.95rem,1.4vw,1.15rem) ${({theme})=>theme.fonts.header};svg{color:${({theme})=>theme.colors.accent};flex:none;}`;

export function ElementsExplainer(){const useful=SECCIONES.filter(s=>!s.esTrampa);const [active,setActive]=useState<SeccionTipo>(useful[0].tipo);const section=SECCIONES.find(s=>s.tipo===active)!;const pilar=PILARES.find(p=>p.id===section.pilarId)!;return <Wrap><Intro><b>La sección es la forma visible.</b> El pilar es la idea que le da sentido.</Intro><Layout><Menu aria-label="Elementos de una landing">{useful.map((s,index)=><Item key={s.tipo} $active={active===s.tipo} onClick={()=>setActive(s.tipo)}><div><small>SECCIÓN 0{index+1}</small>{s.nombre}</div><ArrowRight size={19}/></Item>)}</Menu><Stage key={section.tipo} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}}><Copy><Eyebrow><Box size={16}/>UNA DECISIÓN DE CONTENIDO</Eyebrow><Title>{section.nombre}</Title><Definition>{section.definicion}</Definition><Function><Target size={22}/><div><strong>La idea que debe comunicar</strong>{pilar.nombre}: {pilar.idea}</div></Function></Copy><Anatomy><h4><Layers3 size={19}/>Las piezas que la construyen</h4><Parts>{section.componentes?.map(part=><Part key={part}><Check size={18}/>{part}</Part>)}</Parts></Anatomy></Stage></Layout></Wrap>}
