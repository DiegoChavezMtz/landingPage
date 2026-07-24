"use client";

import { useState } from "react";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Clock3, GalleryHorizontalEnd } from "lucide-react";

type EvolutionTab = "evolucion" | "inspiracion";

const ERAS = [
  {
    years: "1991–1999",
    title: "La web como documento",
    body: "Publicar y encontrar información.",
    shift: "DOCUMENTO",
  },
  {
    years: "2010–2015",
    title: "La web como experiencia",
    body: "Comprender y actuar desde cualquier pantalla.",
    shift: "EXPERIENCIA",
  },
  {
    years: "2021–hoy",
    title: "La web como sistema",
    body: "Medir, aprender, personalizar y mejorar.",
    shift: "SISTEMA",
  },
];

const REFERENCES = [
  {
    name: "Apple · MacBook Air",
    category: "Producto",
    url: "https://www.apple.com/macbook-air/",
    lesson: "Convierte beneficios en una demostración visual que se recuerda.",
    accent: "#8ab4ff",
  },
  {
    name: "Stripe · Payments",
    category: "B2B / Fintech",
    url: "https://stripe.com/payments",
    lesson: "Una propuesta técnica compleja explicada mediante modularidad, evidencia y caminos por audiencia.",
    accent: "#a99cff",
  },
  {
    name: "Framer",
    category: "Herramienta creativa",
    url: "https://www.framer.com/solutions/website-builder/",
    lesson: "Demostración visual, segmentación por casos de uso y una identidad expresiva sin perder claridad.",
    accent: "#72e5ff",
  },
  {
    name: "Airbnb",
    category: "Marketplace",
    url: "https://www.airbnb.com/",
    lesson: "Hace que la acción principal sea útil desde el primer segundo.",
    accent: "#ff8b9b",
  },
];

const Wrap = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  max-width: 560px;
  margin: -8px auto 18px;
`;

const Tab = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 44px;
  padding: 9px 12px;
  border: 1px solid ${({ $active, theme }) => $active ? theme.colors.accent : theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ $active, theme }) => $active ? theme.colors.accentMuted : theme.colors.backgroundElevated};
  color: ${({ theme }) => theme.colors.foreground};
  cursor: pointer;
  font: 700 0.78rem ${({ theme }) => theme.fonts.header};
`;

const View = styled(motion.section)`
  min-height: min(520px, 63vh);
`;

const Head = styled.div`
  max-width: 900px;
  margin: 0 auto 20px;
  text-align: center;

  h3 {
    margin-bottom: 7px;
    font: 900 clamp(2.2rem, 4.2vw, 4rem) ${({ theme }) => theme.fonts.header};
  }

  p {
    color: ${({ theme }) => theme.colors.foregroundMuted};
    font-size: 1.15rem;
    line-height: 1.5;
  }
`;

const Timeline = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 9px;

  @media (max-width: 820px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Era = styled.article`
  position: relative;
  min-height: 350px;
  padding: 32px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.backgroundElevated};

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 17px;
    width: 68px;
    height: 6px;
    background: ${({ theme }) => theme.colors.accent};
  }

  small {
    color: ${({ theme }) => theme.colors.accent};
    font: 900 1rem ${({ theme }) => theme.fonts.header};
    letter-spacing: 0.07em;
  }

  h4 {
    margin: 12px 0 8px;
    font: 900 clamp(1.7rem,2.4vw,2.35rem) ${({ theme }) => theme.fonts.header};
  }

  p {
    color: ${({ theme }) => theme.colors.foregroundMuted};
    font-size: 1.2rem;
    line-height: 1.48;
  }

  strong {
    display: block;
    margin-top: 13px;
    padding-top: 11px;
    border-top: 1px solid ${({ theme }) => theme.colors.border};
    color: ${({ theme }) => theme.colors.accent};
    font: 900 1rem ${({ theme }) => theme.fonts.header};
    letter-spacing: .12em;
    line-height: 1.4;
  }
`;

const InspirationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;

  @media (max-width: 760px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Reference = styled.a<{ $accent: string }>`
  position: relative;
  min-height: 370px;
  padding: 24px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background:
    radial-gradient(circle at 85% 10%, ${({ $accent }) => `${$accent}55`}, transparent 38%),
    ${({ theme }) => theme.colors.backgroundElevated};
  color: ${({ theme }) => theme.colors.foreground};
  text-decoration: none;
  transition: transform 0.2s, border-color 0.2s;

  &:hover {
    transform: translateY(-3px);
    border-color: ${({ $accent }) => $accent};
  }

  small {
    color: ${({ $accent }) => $accent};
    font: 800 .85rem ${({ theme }) => theme.fonts.header};
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  h4 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 9px 0 7px;
    font: 900 clamp(1.45rem,2vw,2rem) ${({ theme }) => theme.fonts.header};
  }

  p {
    color: ${({ theme }) => theme.colors.foregroundMuted};
    font-size: 1.05rem;
    line-height: 1.45;
  }
`;

const Preview = styled.div<{ $accent:string }>`
  height: 145px; margin: 18px 0; border: 1px solid ${({$accent})=>$accent}; border-radius: 12px;
  background: linear-gradient(135deg, ${({$accent})=>$accent}55, transparent 65%), #111;
  overflow:hidden; position:relative;
  &::before{content:"";position:absolute;left:15px;right:15px;top:18px;height:8px;background:#fff9;border-radius:99px;box-shadow:0 21px 0 #fff5,0 42px 0 #fff3;}
  &::after{content:"";position:absolute;width:84px;height:84px;right:18px;bottom:-18px;border-radius:50%;background:${({$accent})=>$accent};opacity:.8;}
`;

export function LandingEvolution() {
  const [activeTab, setActiveTab] = useState<EvolutionTab>("evolucion");

  return (
    <Wrap>
      <Tabs role="tablist" aria-label="Evolución e inspiración de landing pages">
        <Tab
          role="tab"
          aria-selected={activeTab === "evolucion"}
          $active={activeTab === "evolucion"}
          onClick={() => setActiveTab("evolucion")}
        >
          <Clock3 size={16}/> Evolución
        </Tab>
        <Tab
          role="tab"
          aria-selected={activeTab === "inspiracion"}
          $active={activeTab === "inspiracion"}
          onClick={() => setActiveTab("inspiracion")}
        >
          <GalleryHorizontalEnd size={16}/> Landing pages inspiradoras
        </Tab>
      </Tabs>

      <AnimatePresence mode="wait">
        {activeTab === "evolucion" ? (
          <View key="evolucion" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}>
            <Head>
              <h3>Tres cambios que transformaron la web</h3>
              <p>Pasamos de publicar información a diseñar experiencias que aprenden.</p>
            </Head>
            <Timeline>
              {ERAS.map((era) => (
                <Era key={era.years}>
                  <small>{era.years}</small>
                  <h4>{era.title}</h4>
                  <p>{era.body}</p>
                  <strong>{era.shift}</strong>
                </Era>
              ))}
            </Timeline>
          </View>
        ) : (
          <View key="inspiracion" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}>
            <Head>
              <h3>Las grandes referencias no se copian: se descifran</h3>
              <p>Detrás de cada gran pantalla hay una decisión sobre qué mostrar, qué callar y qué hacer evidente.</p>
            </Head>
            <InspirationGrid>
              {REFERENCES.map((reference) => (
                <Reference
                  key={reference.name}
                  $accent={reference.accent}
                  href={reference.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <small>{reference.category}</small>
                  <h4>{reference.name}<ArrowUpRight size={20}/></h4>
                  <Preview $accent={reference.accent}/>
                  <p>{reference.lesson}</p>
                </Reference>
              ))}
            </InspirationGrid>
          </View>
        )}
      </AnimatePresence>
    </Wrap>
  );
}
