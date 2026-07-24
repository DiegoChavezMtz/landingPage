"use client";

import { useState } from "react";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  Braces,
  CheckCircle2,
  CloudUpload,
  FileImage,
  GitFork,
  Globe2,
  Layers3,
  LayoutTemplate,
  Rocket,
  Target,
  TextQuote,
} from "lucide-react";

type AITab = "poder" | "despliegue" | "proceso";

const TABS: Array<{ id: AITab; label: string }> = [
  { id: "poder", label: "IA con dirección" },
  { id: "despliegue", label: "Del código a internet" },
  { id: "proceso", label: "El mapa completo" },
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
  max-width: 900px;
  margin: -8px auto 18px;
`;

const Tab = styled.button<{ $active: boolean }>`
  min-height: 52px;
  padding: 9px 10px;
  border: 1px solid ${({ $active, theme }) => $active ? theme.colors.accent : theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ $active, theme }) => $active ? theme.colors.accentMuted : theme.colors.backgroundElevated};
  color: ${({ theme }) => theme.colors.foreground};
  cursor: pointer;
  font: 700 1rem ${({ theme }) => theme.fonts.header};

  @media (max-width: 600px) {
    padding: 7px 4px;
    font-size: 0.64rem;
  }
`;

const View = styled(motion.section)`
  min-height: min(500px, 61vh);
`;

const Head = styled.div`
  max-width: 980px;
  margin: 0 auto 20px;
  text-align: center;

  > svg {
    margin-bottom: 7px;
    color: ${({ theme }) => theme.colors.accent};
  }

  h3 {
    margin-bottom: 8px;
    font: 900 clamp(2rem, 3.8vw, 3.2rem) ${({ theme }) => theme.fonts.header};
  }

  p {
    color: ${({ theme }) => theme.colors.foregroundMuted};
    font-size: 1.15rem;
    line-height: 1.55;
  }
`;

const PowerLayout = styled.div`
  display: grid;
  grid-template-columns: .8fr 1.2fr;
  gap: 20px;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const PromptCard = styled.div`
  min-height: 360px;
  padding: 34px;
  border: 1px solid ${({ theme }) => theme.colors.accent};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: linear-gradient(145deg, ${({ theme }) => theme.colors.accentMuted}, ${({ theme }) => theme.colors.backgroundElevated});

  small {
    color: ${({ theme }) => theme.colors.accent};
    font: 700 0.85rem ${({ theme }) => theme.fonts.header};
    letter-spacing: 0.1em;
  }

  h4 {
    margin: 10px 0;
    font: 900 clamp(2rem,3vw,3.1rem) ${({ theme }) => theme.fonts.header};
  }

  p {
    color: ${({ theme }) => theme.colors.foregroundMuted};
    font-size: 1.15rem;
    line-height: 1.5;
  }
`;

const Inputs = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
`;

const InputCard = styled.div`
  min-height: 170px;
  padding: 22px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.backgroundElevated};

  svg {
    color: ${({ theme }) => theme.colors.accent};
    width: 30px;
    height: 30px;
  }

  b {
    display: block;
    margin: 8px 0 5px;
    font-family: ${({ theme }) => theme.fonts.header};
  }

  p {
    color: ${({ theme }) => theme.colors.foregroundMuted};
    font-size: 1.05rem;
    line-height: 1.45;
  }
`;

const Tools = styled.div`
  grid-column: 1 / -1;
  display: flex;
  justify-content: center;
  gap: 8px;
  padding-top: 2px;

  span {
    padding: 7px 11px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 99px;
    color: ${({ theme }) => theme.colors.foregroundMuted};
    font: 700 0.9rem ${({ theme }) => theme.fonts.header};
  }
`;

const DeployFlow = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr auto 1fr;
  gap: 10px;
  align-items: center;
  max-width: 1240px;
  margin: 0 auto;

  > svg {
    color: ${({ theme }) => theme.colors.accent};
  }

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
    > svg { transform: rotate(90deg); margin: 0 auto; }
  }
`;

const DeployCard = styled.div`
  min-height: 250px;
  padding: 26px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.backgroundElevated};

  svg {
    color: ${({ theme }) => theme.colors.accent};
  }

  h4 {
    margin: 10px 0 7px;
    font: 800 1.25rem ${({ theme }) => theme.fonts.header};
  }

  p {
    color: ${({ theme }) => theme.colors.foregroundMuted};
    font-size: 1rem;
    line-height: 1.48;
  }
`;

const Definition = styled.div`
  max-width: 860px;
  margin: 16px auto 0;
  padding: 13px 16px;
  border-left: 3px solid ${({ theme }) => theme.colors.accent};
  background: ${({ theme }) => theme.colors.backgroundElevated};
  color: ${({ theme }) => theme.colors.foregroundMuted};
  font-size: 1rem;
  line-height: 1.5;

  b { color: ${({ theme }) => theme.colors.foreground}; }
`;

const Process = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 9px;

  @media (max-width: 820px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Step = styled.div`
  min-height: 250px;
  padding: 22px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.backgroundElevated};

  > svg {
    color: ${({ theme }) => theme.colors.accent};
  }

  small {
    display: block;
    margin-top: 12px;
    color: ${({ theme }) => theme.colors.accent};
    font: 700 0.8rem ${({ theme }) => theme.fonts.header};
    letter-spacing: 0.08em;
  }

  h4 {
    margin: 7px 0;
    font: 800 1.15rem ${({ theme }) => theme.fonts.header};
  }

  p {
    color: ${({ theme }) => theme.colors.foregroundMuted};
    font-size: 1rem;
    line-height: 1.45;
  }
`;

const Closing = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 15px;
  color: ${({ theme }) => theme.colors.foregroundMuted};
  font-size: 0.82rem;

  svg { color: #45d47a; }
`;

export function AIPoweredLanding() {
  const [activeTab, setActiveTab] = useState<AITab>("poder");

  return (
    <Wrap>
      <Tabs role="tablist" aria-label="IA, despliegue y proceso">
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
        {activeTab === "poder" && (
          <View key="poder" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}>
            <Head>
              <Bot size={29}/>
              <h3>La IA multiplica la claridad que le entregas</h3>
              <p>Una buena dirección puede convertirse en minutos en una versión funcional que el equipo ya puede probar.</p>
            </Head>
            <PowerLayout>
              <PromptCard>
                <small>UNA DIRECCIÓN PODEROSA REÚNE</small>
                <h4>Objetivo + referencias + contenido + restricciones</h4>
                <p>La velocidad produce versiones. El criterio produce buenas decisiones.</p>
              </PromptCard>
              <Inputs>
                <InputCard><FileImage size={21}/><b>Referencias</b><p>La experiencia visual que buscas y por qué funciona.</p></InputCard>
                <InputCard><TextQuote size={21}/><b>Estrategia</b><p>La audiencia, la promesa y la decisión principal.</p></InputCard>
                <InputCard><Braces size={21}/><b>Primera versión</b><p>Algo real que se puede observar, usar y cuestionar.</p></InputCard>
                <InputCard><LayoutTemplate size={21}/><b>Iteración</b><p>Aprendizaje convertido en una versión mejor.</p></InputCard>
                <Tools><span>Claude</span><span>Codex</span><span>Gemini</span></Tools>
              </Inputs>
            </PowerLayout>
          </View>
        )}

        {activeTab === "despliegue" && (
          <View key="despliegue" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}>
            <Head>
              <CloudUpload size={29}/>
              <h3>El código que nadie puede abrir todavía no comunica</h3>
              <p>Construir es solo una parte. Publicar vuelve la idea accesible, comprobable y compartible.</p>
            </Head>
            <DeployFlow>
              <DeployCard><Braces size={23}/><h4>1. Código local</h4><p>La experiencia existe en una computadora.</p></DeployCard>
              <ArrowRight size={20}/>
              <DeployCard><GitFork size={23}/><h4>2. Repositorio</h4><p>El trabajo queda organizado y puede evolucionar en equipo.</p></DeployCard>
              <ArrowRight size={20}/>
              <DeployCard><Globe2 size={23}/><h4>3. Sitio publicado</h4><p>La audiencia puede abrirlo, usarlo y responder.</p></DeployCard>
            </DeployFlow>
            <Definition><b>Publicar</b> es convertir archivos en una experiencia que vive en una URL.</Definition>
          </View>
        )}

        {activeTab === "proceso" && (
          <View key="proceso" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}>
            <Head>
              <Rocket size={29}/>
              <h3>La herramienta más poderosa sigue siendo el criterio</h3>
              <p>La IA puede acelerar cada etapa, pero no puede decidir qué merece existir.</p>
            </Head>
            <Process>
              <Step><Target size={22}/><small>01 · ESTRATEGIA</small><h4>Argumento</h4><p>Define qué debe entenderse, creerse y hacerse.</p></Step>
              <Step><Layers3 size={22}/><small>02 · CONTENIDO</small><h4>Secciones</h4><p>Da una misión a cada bloque.</p></Step>
              <Step><LayoutTemplate size={22}/><small>03 · WIREFRAME</small><h4>Recorrido</h4><p>Ordena la atención.</p></Step>
              <Step><Bot size={22}/><small>04 · EJECUCIÓN</small><h4>IA + código</h4><p>Convierte decisiones en una versión real.</p></Step>
              <Step><Globe2 size={22}/><small>05 · PUBLICACIÓN</small><h4>Aprendizaje</h4><p>Comparte, observa y mejora.</p></Step>
            </Process>
            <Closing><CheckCircle2 size={17}/>No gana quien publica primero. Gana quien aprende más rápido.</Closing>
          </View>
        )}
      </AnimatePresence>
    </Wrap>
  );
}
