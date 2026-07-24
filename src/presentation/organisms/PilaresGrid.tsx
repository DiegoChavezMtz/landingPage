"use client";

import { useState } from "react";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { CircleDot } from "lucide-react";
import { PILARES, type PilarId } from "@/domain/entities/Pilar";

const Wrap=styled.div`width:100%;max-width:1440px;margin:0 auto;`;
const Intro=styled.p`margin:-6px 0 18px;text-align:center;color:${({theme})=>theme.colors.foregroundMuted};font:600 clamp(1rem,1.5vw,1.25rem) ${({theme})=>theme.fonts.body};`;
const Tabs=styled.div`display:grid;grid-template-columns:repeat(6,1fr);gap:8px;margin-bottom:14px;@media(max-width:850px){grid-template-columns:repeat(3,1fr);}`;
const Tab=styled.button<{$active:boolean}>`min-height:74px;padding:12px;border:1px solid ${({$active,theme})=>$active?theme.colors.accent:theme.colors.border};border-radius:${({theme})=>theme.radii.md};background:${({$active,theme})=>$active?theme.colors.accentMuted:theme.colors.backgroundElevated};color:white;cursor:pointer;text-align:left;transition:.2s;small{display:block;color:${({theme})=>theme.colors.accent};font:800 .72rem ${({theme})=>theme.fonts.header};letter-spacing:.1em;}strong{display:block;margin-top:5px;font:800 clamp(.85rem,1.15vw,1rem) ${({theme})=>theme.fonts.header};line-height:1.15;}&:hover{transform:translateY(-2px);border-color:${({theme})=>theme.colors.accent};}`;
const Stage=styled(motion.section)`position:relative;overflow:hidden;display:grid;grid-template-columns:1.1fr .9fr;min-height:430px;border:1px solid ${({theme})=>theme.colors.border};border-radius:${({theme})=>theme.radii.lg};background:linear-gradient(120deg,${({theme})=>theme.colors.backgroundElevated},#110b10);@media(max-width:800px){grid-template-columns:1fr;}`;
const Copy=styled.div`position:relative;z-index:1;padding:clamp(26px,4vw,56px);display:flex;flex-direction:column;justify-content:center;`;
const Number=styled.div`color:${({theme})=>theme.colors.accent};font:900 clamp(4rem,9vw,8rem)/.8 ${({theme})=>theme.fonts.header};opacity:.9;`;
const Title=styled.h3`margin:12px 0;font:900 clamp(2.8rem,5vw,5.2rem)/.96 ${({theme})=>theme.fonts.header};letter-spacing:-.06em;`;
const Idea=styled.p`max-width:700px;font:700 clamp(1.35rem,2.3vw,2rem)/1.25 ${({theme})=>theme.fonts.body};`;
const Ask=styled.p`margin-top:22px;color:${({theme})=>theme.colors.foregroundMuted};font-size:clamp(1rem,1.5vw,1.2rem);b{color:white;}`;
const Visual=styled.div`position:relative;display:flex;align-items:center;justify-content:center;padding:28px;background:radial-gradient(circle at 60% 40%,#3a0b17 0,transparent 50%);`;
const Orb=styled.div`width:min(30vw,350px);aspect-ratio:1;border-radius:50%;background:${({theme})=>theme.colors.accent};box-shadow:0 0 0 38px #ff1b4417,0 0 0 82px #ff1b440c;display:grid;place-items:center;text-align:center;padding:34px;color:white;font:900 clamp(1.6rem,2.8vw,2.8rem)/1 ${({theme})=>theme.fonts.header};`;
const Signal=styled.div`position:absolute;bottom:30px;left:30px;right:30px;display:flex;gap:8px;justify-content:center;span{display:flex;align-items:center;gap:6px;padding:9px 11px;border:1px solid ${({theme})=>theme.colors.border};border-radius:99px;background:#0a0a0acc;color:${({theme})=>theme.colors.foregroundMuted};font-size:.9rem;}`;

export function PilaresGrid(){const [active,setActive]=useState<PilarId>(PILARES[0].id);const pilar=PILARES.find(p=>p.id===active)!;const number=PILARES.findIndex(p=>p.id===active)+1;return <Wrap><Intro>Una landing poderosa logra tres cosas: se entiende, se cree y mueve a actuar.</Intro><Tabs role="tablist" aria-label="Pilares de una landing">{PILARES.map((p,i)=><Tab key={p.id} role="tab" aria-selected={active===p.id} $active={active===p.id} onClick={()=>setActive(p.id)}><small>0{i+1}</small><strong>{p.nombre}</strong></Tab>)}</Tabs><AnimatePresence mode="wait"><Stage key={pilar.id} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}}><Copy><Number>0{number}</Number><Title>{pilar.nombre}</Title><Idea>{pilar.idea}</Idea><Ask><b>La pregunta que importa:</b> {pilar.pregunta}</Ask></Copy><Visual><Orb>{pilar.nombre}</Orb><Signal>{pilar.senales.slice(0,3).map(s=><span key={s}><CircleDot size={14}/>{s}</span>)}</Signal></Visual></Stage></AnimatePresence></Wrap>}
