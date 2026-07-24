"use client";

import { useRouter } from "next/navigation";
import styled, { keyframes } from "styled-components";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { Logo } from "@/presentation/atoms/Logo";

const pulse = keyframes`
  0%, 100% { opacity: .28; transform: scale(1); }
  50% { opacity: .85; transform: scale(1.14); }
`;

const aurora = keyframes`
  0%, 100% { opacity: .58; transform: scale(1) translate3d(-4%, -2%, 0) rotate(-4deg); }
  50% { opacity: 1; transform: scale(1.2) translate3d(5%, 4%, 0) rotate(4deg); }
`;

const gridBreathe = keyframes`
  0%, 100% { opacity: .21; background-position: 0 0, 0 0; }
  50% { opacity: .43; background-position: 28px 18px, 28px 18px; }
`;

const Screen = styled.main`
  position: relative;
  isolation: isolate;
  min-height: 100svh;
  overflow: hidden;
  background: #090909;
  color: #fff;
`;

const Ambient = styled.div`
  position: absolute;
  z-index: -3;
  inset: 0;
  overflow: hidden;
  background: #090909;

  &::before {
    position: absolute;
    inset: 0;
    content: "";
    background-image: linear-gradient(rgba(255,255,255,.13) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.13) 1px, transparent 1px);
    background-size: clamp(36px, 4vw, 64px) clamp(36px, 4vw, 64px);
    mask-image: linear-gradient(to bottom, rgba(0,0,0,.5), transparent 78%);
    animation: ${gridBreathe} 14s ease-in-out infinite;
  }

  &::after {
    position: absolute;
    inset: -18%;
    content: "";
    background:
      radial-gradient(ellipse 36% 31% at 69% 40%, rgba(255,27,68,.34), transparent 70%),
      radial-gradient(ellipse 30% 34% at 26% 85%, rgba(255,27,68,.19), transparent 72%),
      radial-gradient(ellipse 27% 25% at 86% 84%, rgba(217,27,65,.14), transparent 72%);
    filter: blur(18px);
    transform-origin: 65% 50%;
    animation: ${aurora} 16s ease-in-out infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    &::before, &::after { animation: none; }
  }
`;

const Navigation = styled(motion.header)`
  position: relative;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: min(100%, 1600px);
  margin: 0 auto;
  padding: clamp(24px, 3vw, 48px) clamp(24px, 5vw, 80px);
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  img { display: block; height: auto; }
`;

const Edition = styled.p`
  display: flex;
  align-items: center;
  gap: 8px;
  color: rgba(255,255,255,.56);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .16em;
  text-transform: uppercase;

  &::before {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #ff1b44;
    content: "";
    animation: ${pulse} 2s ease-in-out infinite;
  }

  @media (max-width: 560px) { display: none; }
`;

const Hero = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: min(100%, 1600px);
  min-height: calc(100svh - 103px);
  margin: 0 auto;
  padding: clamp(32px, 4vw, 64px) clamp(24px, 5vw, 80px) clamp(32px, 5vw, 72px);
`;

const Eyebrow = styled(motion.p)`
  display: flex;
  align-items: center;
  gap: 9px;
  margin-bottom: clamp(20px, 3vh, 34px);
  color: #ff627e;
  font-family: ${({ theme }) => theme.fonts.header};
  font-size: clamp(.66rem, .8vw, .78rem);
  font-weight: 700;
  letter-spacing: .17em;
  text-transform: uppercase;
`;

const Headline = styled(motion.h1)`
  position: relative;
  z-index: 1;
  max-width: 11ch;
  font-family: ${({ theme }) => theme.fonts.header};
  font-size: clamp(4.25rem, 10.8vw, 11.5rem);
  font-weight: 700;
  letter-spacing: -.075em;
  line-height: .79;
  text-wrap: balance;

  span {
    display: block;
    color: #ff1b44;
    text-shadow: 0 0 48px rgba(255, 27, 68, .2);
  }
`;

const Lower = styled(motion.div)`
  position: relative;
  z-index: 2;
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 32px;
  width: min(100%, 980px);
  margin-top: clamp(34px, 6vh, 76px);

  @media (max-width: 700px) {
    align-items: flex-start;
    flex-direction: column;
  }
`;

const Hook = styled.p`
  max-width: 21ch;
  color: rgba(255,255,255,.78);
  font-size: clamp(1.12rem, 1.7vw, 1.45rem);
  font-weight: 500;
  letter-spacing: -.025em;
  line-height: 1.23;

  strong { color: #fff; font-weight: 700; }
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const Action = styled(motion.button)<{ $primary?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  min-height: 56px;
  padding: 0 20px;
  border: 1px solid ${({ $primary }) => ($primary ? "#ff1b44" : "rgba(255,255,255,.25)")};
  border-radius: 999px;
  background: ${({ $primary }) => ($primary ? "#ff1b44" : "rgba(16,16,16,.52)")};
  box-shadow: ${({ $primary }) => ($primary ? "0 16px 44px rgba(255, 27, 68, .25)" : "none")};
  color: #fff;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.header};
  font-size: .96rem;
  font-weight: 700;
  letter-spacing: -.015em;
  backdrop-filter: blur(10px);
`;

const WireframeWorld = styled(motion.div)`
  position: absolute;
  z-index: 0;
  top: 50%;
  right: clamp(-180px, -8vw, -64px);
  width: min(53vw, 790px);
  min-width: 520px;
  transform: translateY(-43%);
  pointer-events: none;

  @media (max-width: 780px) {
    top: 27%;
    right: -275px;
    opacity: .52;
    transform: scale(.75);
    transform-origin: top right;
  }
`;

const FloatingCard = styled(motion.div)<{ $type: "proof" | "cta" | "benefit" }>`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: ${({ $type }) => ($type === "proof" ? "186px" : $type === "cta" ? "214px" : "158px")};
  height: ${({ $type }) => ($type === "proof" ? "125px" : $type === "cta" ? "158px" : "112px")};
  padding: 17px;
  border: 1px solid ${({ $type }) => ($type === "cta" ? "rgba(255,27,68,.78)" : "rgba(255,255,255,.26)")};
  border-radius: 8px;
  background: ${({ $type }) => ($type === "cta" ? "rgba(255,27,68,.16)" : "rgba(13,13,13,.7)")};
  box-shadow: 0 16px 60px rgba(0,0,0,.35);
  backdrop-filter: blur(8px);

  &::before, &::after { content: ""; display: block; }
  &::before { width: 48%; height: 6px; border-radius: 99px; background: ${({ $type }) => ($type === "cta" ? "#ff1b44" : "rgba(255,255,255,.72)")}; }
  &::after { width: 100%; height: 6px; border-radius: 99px; background: rgba(255,255,255,.16); box-shadow: 0 -16px 0 rgba(255,255,255,.10); }
`;

const cardMotion = {
  hidden: { opacity: 0, scale: .86, y: 32 },
  show: (delay: number) => ({ opacity: 1, scale: 1, y: 0, transition: { delay, duration: .9, ease: [0.16, 1, 0.3, 1] } }),
};

const heroVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: .13, delayChildren: .16 } },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: .85, ease: [0.16, 1, 0.3, 1] } },
};

function WireframeArtwork({ reducedMotion }: { reducedMotion: boolean | null }) {
  return (
    <WireframeWorld initial={{ opacity: 0, x: 56 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.3, delay: .32, ease: [0.16, 1, .3, 1] }}>
      <svg viewBox="0 0 780 620" fill="none" aria-hidden="true">
        <motion.circle cx="465" cy="307" r="255" stroke="rgba(255,255,255,.12)" strokeWidth="1" strokeDasharray="5 9" animate={reducedMotion ? undefined : { rotate: 360 }} transition={{ duration: 42, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: "465px 307px" }} />
        <motion.circle cx="465" cy="307" r="183" stroke="rgba(255,27,68,.35)" strokeWidth="1" strokeDasharray="2 10" animate={reducedMotion ? undefined : { rotate: -360 }} transition={{ duration: 28, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: "465px 307px" }} />
        <path d="M178 98H609V480H178z" fill="rgba(12,12,12,.55)" stroke="rgba(255,255,255,.4)" />
        <path d="M178 98H609V150H178z" fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,.18)" />
        <circle cx="205" cy="124" r="5" fill="#FF1B44" /><circle cx="223" cy="124" r="5" fill="rgba(255,255,255,.3)" /><circle cx="241" cy="124" r="5" fill="rgba(255,255,255,.3)" />
        <rect x="222" y="194" width="205" height="16" rx="8" fill="rgba(255,255,255,.84)" />
        <rect x="222" y="224" width="142" height="9" rx="4.5" fill="rgba(255,255,255,.25)" />
        <rect x="222" y="241" width="168" height="9" rx="4.5" fill="rgba(255,255,255,.15)" />
        <rect x="222" y="278" width="108" height="35" rx="17.5" fill="#FF1B44" />
        <rect x="457" y="192" width="112" height="156" rx="4" fill="rgba(255,255,255,.06)" stroke="rgba(255,255,255,.28)" />
        <path d="M473 321l28-41 25 23 18-20 27 38H473z" fill="rgba(255,27,68,.54)" />
        <circle cx="522" cy="244" r="17" fill="rgba(255,255,255,.2)" />
        <path d="M222 387H565" stroke="rgba(255,255,255,.18)" />
        <rect x="222" y="412" width="96" height="48" rx="4" fill="rgba(255,255,255,.06)" stroke="rgba(255,255,255,.18)" />
        <rect x="340" y="412" width="96" height="48" rx="4" fill="rgba(255,255,255,.06)" stroke="rgba(255,255,255,.18)" />
        <rect x="458" y="412" width="107" height="48" rx="4" fill="rgba(255,255,255,.06)" stroke="rgba(255,255,255,.18)" />
        <motion.path d="M80 525C185 431 254 548 359 485S560 438 700 518" stroke="#FF1B44" strokeWidth="2" strokeLinecap="round" strokeDasharray="1 12" animate={reducedMotion ? undefined : { pathLength: [0, 1], opacity: [.1, 1, .3] }} transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }} />
      </svg>
      <FloatingCard $type="proof" style={{ top: "39px", left: "70px" }} variants={cardMotion} custom={.72} initial="hidden" animate="show" />
      <FloatingCard $type="cta" style={{ top: "377px", right: "-3px" }} variants={cardMotion} custom={.96} initial="hidden" animate="show" />
      <FloatingCard $type="benefit" style={{ bottom: "-8px", left: "158px" }} variants={cardMotion} custom={1.14} initial="hidden" animate="show" />
    </WireframeWorld>
  );
}

export function HomePage() {
  const router = useRouter();
  const reducedMotion = useReducedMotion();

  return (
    <Screen>
      <Ambient />
      <Navigation initial={{ opacity: 0, y: -18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, ease: "easeOut" }}>
        <Brand><Logo variant="light" width={174} /></Brand>
        <Edition>Experiencia interactiva</Edition>
      </Navigation>

      <Hero>
        <WireframeArtwork reducedMotion={reducedMotion} />
        <motion.div variants={heroVariants} initial="hidden" animate="show">
          <Eyebrow variants={rise}><Sparkles size={14} strokeWidth={2.5} /> Cómo crear experiencias que convierten</Eyebrow>
          <Headline variants={rise}>Landing pages <span>poderosas.</span></Headline>
          <Lower variants={rise}>
            <Hook>Se entienden en segundos. <strong>Mueven a actuar.</strong></Hook>
            <Actions>
              <Action $primary onClick={() => router.push("/aprender")} whileHover={reducedMotion ? undefined : { y: -4, scale: 1.02 }} whileTap={{ scale: .97 }}>
                Descubrir cómo <ArrowUpRight size={18} />
              </Action>
              <Action onClick={() => router.push("/sandbox")} whileHover={reducedMotion ? undefined : { y: -4, borderColor: "rgba(255,255,255,.7)" }} whileTap={{ scale: .97 }}>
                Construir una
              </Action>
            </Actions>
          </Lower>
        </motion.div>
      </Hero>
    </Screen>
  );
}
