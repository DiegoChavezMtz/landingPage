"use client";

import { useState } from "react";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle2,
  Eye,
  MessageSquare,
  Move,
  Route,
  ScanSearch,
  Zap,
} from "lucide-react";

type WireframeTab = "concepto" | "validacion" | "recorrido";

const TABS: Array<{ id: WireframeTab; label: string }> = [
  { id: "concepto", label: "Pensar antes de diseñar" },
  { id: "validacion", label: "Lo que debe demostrar" },
  { id: "recorrido", label: "La lógica del recorrido" },
];

const Wrap = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  max-width: 920px;
  margin: -8px auto 18px;
`;

const Tab = styled.button<{ $active: boolean }>`
  min-height: 68px;
  padding: 12px 18px;
  border: 1px solid
    ${({ $active, theme }) =>
      $active ? theme.colors.accent : theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ $active, theme }) =>
    $active ? theme.colors.accentMuted : theme.colors.backgroundElevated};
  color: ${({ theme }) => theme.colors.foreground};
  cursor: pointer;
  font: 800 1.2rem ${({ theme }) => theme.fonts.header};

  @media (max-width: 560px) {
    padding: 8px 5px;
    font-size: 0.68rem;
  }
`;

const View = styled(motion.section)`
  min-height: min(590px, 68vh);
`;

const Concept = styled.div`
  display: grid;
  grid-template-columns: .82fr 1.18fr;
  gap: clamp(30px, 5vw, 72px);
  align-items: center;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const Copy = styled.div`
  h3 {
    margin-bottom: 14px;
    font: 900 clamp(3rem, 5.5vw, 5.2rem) ${({ theme }) => theme.fonts.header};
    line-height: 1.02;
  }

  p {
    margin-bottom: 16px;
    color: ${({ theme }) => theme.colors.foregroundMuted};
    font-size: clamp(1.25rem, 2.1vw, 1.65rem);
    line-height: 1.55;
  }
`;

const Benefits = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`;

const Benefit = styled.div`
  min-height:120px;
  padding: 17px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.backgroundElevated};
  font-size: 1.1rem;

  svg {
    margin-bottom: 5px;
    color: ${({ theme }) => theme.colors.accent};
  }

  b {
    display: block;
    margin-bottom: 2px;
  }
`;

const Board = styled.div`
  padding: 26px;
  border-radius: ${({ theme }) => theme.radii.lg};
  background: #efede8;
  color: #151515;
  box-shadow: 0 32px 90px #0009;
  transform: rotate(0.6deg);
`;

const BrowserBar = styled.div`
  display: flex;
  gap: 5px;
  margin-bottom: 12px;

  span {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #aaa;
  }
`;

const Hero = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 14px;
  padding: clamp(14px, 2.5vw, 22px);
  border: 2px solid #777;
`;

const Lines = styled.div`
  display: grid;
  align-content: center;
  gap: 7px;

  i {
    display: block;
    width: 100%;
    height: 7px;
    background: #aaa;

    &:first-child {
      width: 85%;
      height: 14px;
      background: #555;
    }

    &:nth-child(3) {
      width: 70%;
    }
  }

  button {
    width: 90px;
    height: 26px;
    margin-top: 5px;
    border: 0;
    background: #444;
  }
`;

const VisualPlaceholder = styled.div`
  display: grid;
  place-items: center;
  min-height: 180px;
  border: 2px dashed #888;
  color: #777;
  font-size: 2rem;
`;

const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-top: 9px;

  div {
    height: 104px;
    padding: 12px;
    border: 2px solid #999;
  }

  i {
    display: block;
    height: 5px;
    margin-bottom: 6px;
    background: #aaa;
  }
`;

const BoardNote = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
  margin-top: 12px;
  color: #555;
  font: 600 0.7rem ${({ theme }) => theme.fonts.body};
`;

const SectionHead = styled.div`
  max-width: 760px;
  margin: 0 auto 18px;
  text-align: center;

  svg {
    margin-bottom: 7px;
    color: ${({ theme }) => theme.colors.accent};
  }

  h3 {
    margin-bottom: 7px;
    font: 900 clamp(2.7rem, 4.5vw, 4.3rem) ${({ theme }) => theme.fonts.header};
  }

  p {
    color: ${({ theme }) => theme.colors.foregroundMuted};
    font-size: 1.35rem;
    line-height: 1.5;
  }
`;

const Questions = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  max-width: 1240px;
  margin: 0 auto;

  @media (max-width: 620px) {
    grid-template-columns: 1fr;
  }
`;

const Question = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  min-height: 125px;
  padding: 22px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.backgroundElevated};
  color: ${({ theme }) => theme.colors.foregroundMuted};
  font-size: 1.2rem;
  line-height: 1.45;

  svg {
    flex: none;
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const Sequence = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  max-width: 1240px;
  margin: 0 auto;

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

const Phase = styled.div`
  position: relative;
  min-height: 285px;
  padding: clamp(24px, 3vw, 34px);
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.backgroundElevated};

  small {
    color: ${({ theme }) => theme.colors.accent};
    font: 700 0.68rem ${({ theme }) => theme.fonts.header};
    letter-spacing: 0.1em;
  }

  h4 {
    margin: 11px 0 8px;
    font: 900 1.8rem ${({ theme }) => theme.fonts.header};
  }

  p {
    color: ${({ theme }) => theme.colors.foregroundMuted};
    font-size: 1.1rem;
    line-height: 1.5;
  }
`;

export function WireframeExplainer() {
  const [activeTab, setActiveTab] = useState<WireframeTab>("concepto");

  return (
    <Wrap>
      <Tabs role="tablist" aria-label="Contenido sobre wireframes">
        {TABS.map((tab) => (
          <Tab
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            $active={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </Tab>
        ))}
      </Tabs>

      <AnimatePresence mode="wait">
        {activeTab === "concepto" && (
          <View
            key="concepto"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
          >
            <Concept>
              <Copy>
                <h3>Primero la lógica. Después la belleza.</h3>
                <p>
                  Un <b>wireframe</b> es un plano de baja fidelidad que permite
                  probar la jerarquía del mensaje, el orden de las secciones y
                  el camino hacia la acción sin distraerse con colores o detalles.
                </p>
                <Benefits>
                  <Benefit><Eye size={18}/><b>Expone la idea</b>Deja claro qué debe entenderse primero.</Benefit>
                  <Benefit><Move size={18}/><b>Ordena la atención</b>Da a cada sección un lugar y un propósito.</Benefit>
                  <Benefit><MessageSquare size={18}/><b>Mejora la conversación</b>Permite discutir decisiones, no gustos.</Benefit>
                  <Benefit><Zap size={18}/><b>Ahorra errores caros</b>Encuentra vacíos antes de escribir código.</Benefit>
                </Benefits>
              </Copy>
              <Board aria-label="Ejemplo de wireframe de una landing">
                <BrowserBar><span/><span/><span/></BrowserBar>
                <Hero>
                  <Lines><i/><i/><i/><button aria-label="CTA representado en el wireframe"/></Lines>
                  <VisualPlaceholder aria-label="Espacio reservado para una imagen">×</VisualPlaceholder>
                </Hero>
                <Cards>
                  <div><i/><i/><i/></div>
                  <div><i/><i/><i/></div>
                  <div><i/><i/><i/></div>
                </Cards>
                <BoardNote><Move size={14}/>Cada bloque debe ganarse su lugar.</BoardNote>
              </Board>
            </Concept>
          </View>
        )}

        {activeTab === "validacion" && (
          <View
            key="validacion"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
          >
            <SectionHead>
              <ScanSearch size={28}/>
              <h3>Un wireframe no se ve bonito: piensa con claridad</h3>
              <p>Cada sección debe responder una duda, aumentar la confianza o facilitar una decisión.</p>
            </SectionHead>
            <Questions>
              <Question><CheckCircle2 size={19}/>¿Qué debe entender la persona en los primeros cinco segundos?</Question>
              <Question><CheckCircle2 size={19}/>¿Qué problema, necesidad o aspiración reconoce primero?</Question>
              <Question><CheckCircle2 size={19}/>¿Qué objeción resuelve cada bloque y con qué evidencia?</Question>
              <Question><CheckCircle2 size={19}/>¿Dónde aparece la acción principal y qué prepara a la persona para tomarla?</Question>
            </Questions>
          </View>
        )}

        {activeTab === "recorrido" && (
          <View
            key="recorrido"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
          >
            <SectionHead>
              <Route size={28}/>
              <h3>Una landing es una conversación en el orden correcto</h3>
              <p>El orden puede cambiar; la lógica no: primero comprender, después creer y finalmente actuar.</p>
            </SectionHead>
            <Sequence>
              <Phase>
                <small>01 · COMPRENDER</small>
                <h4>Hazlo evidente</h4>
                <p>La persona reconoce su situación, entiende la propuesta y descubre lo que puede ganar.</p>
              </Phase>
              <Phase>
                <small>02 · CREER</small>
                <h4>Hazlo creíble</h4>
                <p>La evidencia demuestra la promesa y las objeciones dejan de ser una salida.</p>
              </Phase>
              <Phase>
                <small>03 · ACTUAR</small>
                <h4>Hazlo fácil</h4>
                <p>Una acción principal, una expectativa clara y la menor fricción posible.</p>
              </Phase>
            </Sequence>
          </View>
        )}
      </AnimatePresence>
    </Wrap>
  );
}
