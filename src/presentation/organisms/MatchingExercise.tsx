"use client";

import { useMemo, useState } from "react";
import { DndContext, DragOverlay, PointerSensor, TouchSensor, pointerWithin, useSensor, useSensors, type DragEndEvent } from "@dnd-kit/core";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { BadgeCheck, Check, CircleSlash, HeartPulse, MousePointer2, RotateCcw, Sparkles, Trophy, X } from "lucide-react";
import { SECCIONES } from "@/domain/entities/Seccion";
import { PILARES, type PilarId } from "@/domain/entities/Pilar";
import { useMatchingExerciseStore, MATCHING_EXERCISE_TOTAL } from "@/application/hooks/useMatchingExerciseStore";
import { DraggableSeccionCard } from "@/presentation/molecules/DraggableSeccionCard";
import { PilarDropZone } from "@/presentation/molecules/PilarDropZone";

const Wrap=styled.div`width:100%;max-width:1440px;margin:0 auto;`;
const Game=styled.div`position:relative;display:grid;grid-template-columns:minmax(430px,.9fr) minmax(620px,1.1fr);gap:22px;padding:22px;border:1px solid ${({theme})=>theme.colors.border};border-radius:${({theme})=>theme.radii.lg};background:#0d0d0d;overscroll-behavior:contain;@media(max-width:950px){grid-template-columns:1fr;}`;
const Challenge=styled.section`min-height:430px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px;padding:20px;border-radius:${({theme})=>theme.radii.md};background:radial-gradient(circle at 50% 35%,#251016 0,#151515 62%);`;
const Kicker=styled.div`display:flex;align-items:center;gap:8px;color:${({theme})=>theme.colors.foregroundMuted};font:600 .75rem ${({theme})=>theme.fonts.body};text-transform:uppercase;letter-spacing:.08em;`;
const Prompt=styled.h3`max-width:390px;text-align:center;font:900 clamp(1.25rem,3vw,1.7rem) ${({theme})=>theme.fonts.header};line-height:1.2;`;
const Choices=styled.section`display:flex;flex-direction:column;justify-content:center;padding:10px;`;
const ChoiceHead=styled.div`margin-bottom:16px;h3{font:800 clamp(1.25rem,2vw,1.7rem) ${({theme})=>theme.fonts.header};margin-bottom:5px;}p{color:${({theme})=>theme.colors.foregroundMuted};font-size:1rem;}`;
const Grid=styled.div`display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;@media(max-width:850px){grid-template-columns:repeat(2,minmax(0,1fr));}`;
const Progress=styled.div`display:flex;align-items:center;gap:12px;margin-bottom:16px;`;
const Bar=styled.div`height:6px;flex:1;background:${({theme})=>theme.colors.border};border-radius:99px;overflow:hidden;i{display:block;height:100%;background:${({theme})=>theme.colors.accent};border-radius:inherit;transition:width .35s ease;}`;
const Count=styled.span`color:${({theme})=>theme.colors.foregroundMuted};font:600 .75rem ${({theme})=>theme.fonts.body};white-space:nowrap;`;
const Feedback=styled(motion.div)<{$correct:boolean}>`position:absolute;inset:0;z-index:30;display:grid;place-items:center;border-radius:inherit;background:#090909e8;backdrop-filter:blur(7px);text-align:center;padding:24px;div{max-width:520px;}svg{color:${({$correct,theme})=>$correct?"#45d47a":theme.colors.accent};margin-bottom:12px;}h3{font:900 2.4rem ${({theme})=>theme.fonts.header};margin-bottom:8px;}p{color:${({theme})=>theme.colors.foregroundMuted};font-size:1.15rem;line-height:1.5;}button{margin-top:22px;padding:12px 20px;border:0;border-radius:99px;background:${({theme})=>theme.colors.accent};color:white;font:700 1rem ${({theme})=>theme.fonts.header};cursor:pointer;}`;
const Complete=styled.div`min-height:430px;display:grid;place-items:center;text-align:center;padding:30px;border:1px solid ${({theme})=>theme.colors.border};border-radius:${({theme})=>theme.radii.lg};background:radial-gradient(circle,#251016,#101010 65%);h3{font:900 clamp(2rem,5vw,3.5rem) ${({theme})=>theme.fonts.header};margin:12px 0 8px;}p{color:${({theme})=>theme.colors.foregroundMuted};margin-bottom:20px;}button{border:1px solid ${({theme})=>theme.colors.border};border-radius:99px;background:transparent;color:white;padding:10px 16px;cursor:pointer;}`;

const META:Record<PilarId,{hint:string;Icon:typeof HeartPulse}>={necesidad:{hint:"Situación que reconoce",Icon:HeartPulse},"propuesta-valor":{hint:"Promesa principal",Icon:Sparkles},beneficios:{hint:"Lo que gana",Icon:Trophy},evidencia:{hint:"Razón para creer",Icon:BadgeCheck},objeciones:{hint:"Duda o fricción que reduce",Icon:CircleSlash},cta:{hint:"Siguiente acción",Icon:MousePointer2}};

const SCENARIOS:Record<string,string>={
  hero:"Abre la página con una promesa, una explicación breve y una acción.",
  "kicker-dolor":"Nombra una situación que la audiencia reconoce antes de presentar la solución.",
  "grid-beneficios":"Traduce funciones del producto en resultados concretos y escaneables.",
  "franja-confianza":"Muestra logos, una métrica y un sello verificable en una banda compacta.",
  testimonio:"Cuenta, con nombre y contexto, el resultado que consiguió un cliente.",
  "cta-final":"Cierra el recorrido, recuerda el valor y propone el siguiente paso.",
  carrusel:"Muestra fotografías atractivas que no explican el producto ni apoyan una decisión.",
  "nuestra-historia":"Cuenta el origen de la marca, pero no lo conecta con lo que necesita decidir el visitante.",
  "popup-newsletter":"Interrumpe la lectura para pedir un correo sin ofrecer un beneficio pertinente.",
};

type Choice = { id: PilarId | null; label: string; hint: string; Icon: typeof HeartPulse; sinPilar?: boolean };
function choicesFor(seccionIndex: number, correct: PilarId | null): Choice[] {
  const all: Choice[] = PILARES.map((p) => ({ id:p.id, label:p.nombre, hint:META[p.id].hint, Icon:META[p.id].Icon }));
  const noPilar: Choice = { id:null, label:"Sin función clara", hint:"No aporta a la decisión", Icon:CircleSlash, sinPilar:true };
  const candidates = correct === null ? all : [...all, noPilar];
  const correctChoice = correct === null ? noPilar : all.find((choice) => choice.id === correct)!;
  const distractors = candidates.filter((choice) => choice.id !== correct).sort((a,b) => {
    const score = (choice: Choice) => ((String(choice.id).length * 19 + seccionIndex * 7 + String(choice.id).charCodeAt(0)) % 17);
    return score(a) - score(b);
  }).slice(0,3);
  return [correctChoice, ...distractors].sort((a,b) => ((String(a.id).charCodeAt(0) + seccionIndex * 3) % 11) - ((String(b.id).charCodeAt(0) + seccionIndex * 3) % 11));
}

export function MatchingExercise(){
  const currentPos=useMatchingExerciseStore(s=>s.currentPos);const order=useMatchingExerciseStore(s=>s.order);const feedback=useMatchingExerciseStore(s=>s.feedback);const submit=useMatchingExerciseStore(s=>s.submit);const advance=useMatchingExerciseStore(s=>s.advance);const reset=useMatchingExerciseStore(s=>s.reset);
  const [dragging,setDragging]=useState(false);
  const sensors=useSensors(useSensor(PointerSensor,{activationConstraint:{distance:8}}),useSensor(TouchSensor,{activationConstraint:{delay:180,tolerance:8}}));
  const isComplete=currentPos>=MATCHING_EXERCISE_TOTAL;const seccionIndex=isComplete?0:order[currentPos];const seccion=isComplete?null:SECCIONES[seccionIndex];
  const correctPilar=useMemo(()=>seccion?PILARES.find(p=>p.id===seccion.pilarId):undefined,[seccion]);
  function choose(id:PilarId|null){if(!feedback)submit(id);}
  function handleDragEnd(event:DragEndEvent){setDragging(false);const overId=event.over?.id;if(!overId)return;choose(overId==="sin-pilar"?null:overId as PilarId);}
  if(isComplete)return <Wrap><Complete><div><Check size={48} color="#45d47a"/><h3>Ya puedes ver lo invisible.</h3><p>Detrás de cada sección debe existir una intención. Sin intención, solo hay espacio ocupado.</p><button onClick={reset}><RotateCcw size={15}/> Volver a explorar</button></div></Complete></Wrap>;
  const choices=choicesFor(seccionIndex,seccion!.pilarId);
  return <Wrap><Progress><Bar><i style={{width:`${(currentPos/MATCHING_EXERCISE_TOTAL)*100}%`}}/></Bar><Count>{currentPos+1} de {MATCHING_EXERCISE_TOTAL}</Count></Progress><DndContext sensors={sensors} collisionDetection={pointerWithin} autoScroll={false} onDragStart={()=>setDragging(true)} onDragCancel={()=>setDragging(false)} onDragEnd={handleDragEnd}><Game><Challenge><Kicker><MousePointer2 size={15}/>{dragging?"Conecta la sección con su intención":"Toda sección debe responder: «¿para qué existo?»"}</Kicker><Prompt>{SCENARIOS[seccion!.tipo]}</Prompt><DraggableSeccionCard seccion={seccion!}/></Challenge><Choices><ChoiceHead><h3>¿Cuál es su función estratégica principal?</h3><p>Una sección puede hacer muchas cosas, pero debe tener una misión dominante.</p></ChoiceHead><Grid>{choices.map(choice=><PilarDropZone key={String(choice.id)} id={choice.id??"sin-pilar"} label={choice.label} hint={choice.hint} Icon={choice.Icon} sinPilar={choice.sinPilar} disabled={Boolean(feedback)} onSelect={()=>choose(choice.id)}/>)}</Grid></Choices><AnimatePresence>{feedback&&<Feedback $correct={feedback==="correct"} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}><motion.div initial={{scale:.9,y:8}} animate={{scale:1,y:0}}>{feedback==="correct"?<Check size={44}/>:<X size={44}/>}<h3>{feedback==="correct"?"Exacto: forma e intención están conectadas.":"La pregunta no es cómo se ve, sino qué aporta."}</h3><p>{correctPilar?`${seccion!.nombre} sostiene principalmente ${correctPilar.nombre}. Puede apoyar otras ideas, pero necesita una misión dominante.`:`En este escenario, ${seccion!.nombre.toLowerCase()} no aporta a una decisión concreta. El formato no es el problema; usarlo sin propósito sí.`}</p><button onClick={advance}>Descubrir la siguiente</button></motion.div></Feedback>}</AnimatePresence></Game><DragOverlay dropAnimation={{duration:180,easing:"ease-out"}}>{dragging?<DraggableSeccionCard seccion={seccion!} overlay/>:null}</DragOverlay></DndContext></Wrap>;
}
