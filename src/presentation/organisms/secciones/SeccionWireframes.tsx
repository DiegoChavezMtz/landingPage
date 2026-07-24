import styled from "styled-components";
import { SketchBlock, SketchButton, SketchLine } from "@/presentation/atoms/SketchBlock";

type VariantProps = { variant?: number };
const Row = styled.div`display:flex; gap:14px; align-items:center;`;
const Column = styled.div`display:flex; flex-direction:column; gap:8px;`;
const Pill = styled.div`height:10px; width:54px; border:1px solid #b8b8b8; border-radius:999px; background:#f3f3f3;`;
const Accent = styled.div`width:34px; height:4px; background:#ff1b44; border-radius:99px;`;
const MiniButton = SketchButton;
const Card = styled.div`flex:1; min-height:82px; padding:12px; border:1px solid #c3c3c3; border-radius:10px; background:#fafafa;`;
const Dots = styled.div`display:flex; gap:5px; & > i { width:7px; height:7px; border-radius:50%; background:#c8c8c8; } & > i:first-child { background:#ff1b44; }`;
const BackgroundHero = styled.div`position:relative; min-height:174px; display:flex; align-items:center; overflow:hidden; padding:24px; border:1px solid #b8b8b8; border-radius:10px; background:repeating-linear-gradient(45deg,#ededed,#ededed 3px,#fff 3px,#fff 10px); &::before{content:"IMAGEN DE FONDO";position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:#8b8b8b;font:700 10px var(--font-body);letter-spacing:.16em} &::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(35,35,35,.66),rgba(35,35,35,.08))}`;
const HeroOverlay = styled(Column)`position:relative; z-index:1; max-width:58%; gap:9px; & > div:not(:last-child){color:#fff;border-color:#fff;background:transparent}`;

export function HeroWireframe({ variant = 0 }: VariantProps) {
  if (variant === 4) return <BackgroundHero><HeroOverlay><Pill/><SketchLine $width="92%" style={{height:20}}/><SketchLine $width="74%"/><MiniButton defaultText="Botón"/></HeroOverlay></BackgroundHero>;
  if (variant === 1) return <Column style={{ alignItems:"center", textAlign:"center" }}><Pill/><SketchLine $width="58%" style={{height:18}}/><SketchLine $width="40%"/><MiniButton/><Row><SketchBlock $tone="accent" style={{width:110,height:58}}/><SketchBlock style={{width:110,height:58}}/><SketchBlock style={{width:110,height:58}}/></Row></Column>;
  if (variant === 2) return <Row><SketchBlock $image $tone="accent" style={{width:"42%",height:142}}/><Column style={{flex:1}}><Accent/><SketchLine $width="90%" style={{height:20}}/><SketchLine $width="75%"/><SketchLine $width="55%"/><Row><MiniButton/><Pill/></Row></Column></Row>;
  if (variant === 3) return <Column><Row style={{justifyContent:"space-between"}}><Pill/><Dots><i/><i/><i/></Dots></Row><SketchLine $width="72%" style={{height:20}}/><Row><MiniButton/><SketchLine $width="26%"/></Row><SketchBlock $tone="dark" style={{height:70,width:"100%"}}/></Column>;
  return <Row><Column style={{flex:1}}><Pill/><SketchLine $width="90%" style={{height:18}}/><SketchLine $width="70%"/><SketchLine $width="55%"/><MiniButton/></Column><SketchBlock $image $tone="accent" style={{flex:1,height:128}}/></Row>;
}

export function KickerDolorWireframe({ variant = 0 }: VariantProps) {
  if (variant === 1) return <Row><Accent/><Column style={{flex:1}}><SketchLine $width="82%" style={{height:15}}/><SketchLine $width="55%"/></Column></Row>;
  if (variant === 2) return <Column style={{alignItems:"center"}}><Pill/><SketchLine $width="66%" style={{height:18}}/><SketchLine $width="42%"/></Column>;
  if (variant === 3) return <Card><SketchLine $width="74%" style={{height:16}}/><SketchLine $width="92%"/><Accent/></Card>;
  return <Row style={{justifyContent:"center"}}><SketchLine $width="60%" style={{height:17}}/></Row>;
}

export function GridBeneficiosWireframe({ variant = 0 }: VariantProps) {
  const count = variant === 1 ? 3 : variant === 2 ? 2 : 4;
  if (variant === 3) return <Column><Row><Card><SketchBlock $tone="accent" $circle style={{width:30,height:30}}/><SketchLine $width="80%"/></Card><Card><SketchBlock $circle style={{width:30,height:30}}/><SketchLine $width="70%"/></Card></Row><Row><Card><SketchLine $width="85%"/><SketchLine $width="55%"/></Card><Card><SketchLine $width="72%"/><SketchLine $width="48%"/></Card></Row></Column>;
  return <Row>{Array.from({length:count},(_,i)=><Column key={i} style={{flex:1,alignItems:variant===2?"flex-start":"center"}}><SketchBlock $tone={i===0&&variant===1?"accent":"soft"} $circle={variant!==2} style={{width:variant===2?"100%":36,height:variant===2?48:36}}/><SketchLine $width="82%"/><SketchLine $width="58%"/></Column>)}</Row>;
}

export function FranjaConfianzaWireframe({ variant = 0 }: VariantProps) {
  if (variant === 1) return <Row style={{justifyContent:"space-between"}}>{Array.from({length:5},(_,i)=><SketchBlock key={i} $tone={i===2?"accent":"soft"} style={{width:52,height:28}}/>)}</Row>;
  if (variant === 2) return <Column><SketchLine $width="24%"/><Row style={{justifyContent:"space-around"}}>{Array.from({length:3},(_,i)=><Card key={i}><SketchLine $width="60%"/><SketchLine $width="88%"/></Card>)}</Row></Column>;
  if (variant === 3) return <Row><Accent/>{Array.from({length:4},(_,i)=><SketchBlock key={i} $tone={i===0?"accent":"muted"} style={{flex:1,height:34}}/>)}</Row>;
  return <Row style={{justifyContent:"space-around"}}>{Array.from({length:4},(_,i)=><SketchBlock key={i} style={{width:64,height:22}}/>)}</Row>;
}

export function TestimonioWireframe({ variant = 0 }: VariantProps) {
  if (variant === 1) return <Card><Column style={{alignItems:"center"}}><SketchBlock $circle $tone="accent" style={{width:46,height:46}}/><SketchLine $width="88%"/><SketchLine $width="63%"/><Pill/></Column></Card>;
  if (variant === 2) return <Row><SketchBlock $image $tone="dark" style={{width:"43%",height:116}}/><Column style={{flex:1}}><Pill/><SketchLine $width="100%"/><SketchLine $width="78%"/><SketchLine $width="46%"/></Column></Row>;
  if (variant === 3) return <Column><Row><SketchBlock $circle $tone="accent" style={{width:36,height:36}}/><SketchLine $width="30%"/></Row><SketchLine $width="94%" style={{height:16}}/><SketchLine $width="84%"/><SketchLine $width="55%"/></Column>;
  return <Row><SketchBlock $circle style={{width:56,height:56,flexShrink:0}}/><Column style={{flex:1}}><SketchLine $width="95%"/><SketchLine $width="80%"/><SketchLine $width="35%" style={{marginTop:6}}/></Column></Row>;
}

export function CtaFinalWireframe({ variant = 0 }: VariantProps) {
  if (variant === 1) return <Row><Column style={{flex:1}}><Pill/><SketchLine $width="82%" style={{height:18}}/><SketchLine $width="62%"/></Column><MiniButton/></Row>;
  if (variant === 2) return <Card><Column style={{alignItems:"center"}}><Accent/><SketchLine $width="64%" style={{height:18}}/><SketchLine $width="42%"/><SketchBlock $tone="accent" style={{width:180,height:38}}/></Column></Card>;
  if (variant === 3) return <Row><SketchBlock $tone="accent" style={{width:64,height:64}}/><Column style={{flex:1}}><SketchLine $width="92%" style={{height:17}}/><MiniButton/></Column></Row>;
  return <Column style={{alignItems:"center"}}><SketchLine $width="50%" style={{height:18}}/><SketchBlock $tone="accent" style={{width:160,height:40,marginTop:10}}/></Column>;
}

export function CarruselWireframe({ variant = 0 }: VariantProps) {
  const blocks = variant === 1 ? 3 : variant === 2 ? 2 : 1;
  if (variant === 3) return <Column><Row>{Array.from({length:3},(_,i)=><SketchBlock key={i} $image $tone={i===1?"accent":"soft"} style={{flex:1,height:82}}/>)}</Row><Dots><i/><i/><i/></Dots></Column>;
  return <Row><SketchLine $width="16px" style={{height:16}}/>{Array.from({length:blocks},(_,i)=><SketchBlock key={i} $image $tone={i===0&&variant===2?"accent":"soft"} style={{flex:1,height:variant===1?86:108}}/>)}<SketchLine $width="16px" style={{height:16}}/></Row>;
}

export function NuestraHistoriaWireframe({ variant = 0 }: VariantProps) {
  if (variant === 1) return <Row><Column style={{width:32}}>{Array.from({length:4},(_,i)=><SketchBlock key={i} $circle $tone={i===1?"accent":"muted"} style={{width:18,height:18}}/>)}</Column><Column style={{flex:1}}>{Array.from({length:4},(_,i)=><Card key={i}><SketchLine $width={i%2?"60%":"82%"}/></Card>)}</Column></Row>;
  if (variant === 2) return <Row><SketchBlock $image $tone="dark" style={{width:"45%",height:132}}/><Column style={{flex:1}}><Pill/><SketchLine $width="90%"/><SketchLine $width="78%"/><SketchLine $width="66%"/></Column></Row>;
  if (variant === 3) return <Column><Accent/><SketchLine $width="80%" style={{height:18}}/><Row><SketchBlock style={{flex:1,height:72}}/><Column style={{flex:1}}><SketchLine/><SketchLine $width="68%"/><MiniButton/></Column></Row></Column>;
  return <Column>{Array.from({length:5},(_,i)=><SketchLine key={i} $width={i%2===0?"95%":"80%"}/>)}</Column>;
}

export function PopupNewsletterWireframe({ variant = 0 }: VariantProps) {
  if (variant === 1) return <Card><Row><Column style={{flex:1}}><Pill/><SketchLine $width="85%"/><SketchLine $width="62%"/></Column><SketchBlock $tone="accent" style={{width:70,height:70}}/></Row><SketchBlock $tone="accent" style={{height:28,width:"100%",marginTop:10}}/></Card>;
  if (variant === 2) return <Column style={{maxWidth:260,margin:"auto"}}><Row style={{justifyContent:"space-between"}}><Pill/><SketchLine $width="14px"/></Row><SketchLine $width="88%" style={{height:16}}/><SketchBlock style={{height:28,width:"100%"}}/><MiniButton/></Column>;
  if (variant === 3) return <Row><SketchBlock $image $tone="accent" style={{width:94,height:104}}/><Column style={{flex:1}}><SketchLine $width="95%" style={{height:16}}/><SketchLine $width="72%"/><SketchBlock style={{height:27,width:"100%"}}/><SketchBlock $tone="accent" style={{height:27,width:"60%"}}/></Column></Row>;
  return <Card><Row style={{justifyContent:"space-between"}}><SketchLine $width="60%"/><SketchLine $width="14px"/></Row><SketchLine $width="86%"/><SketchBlock $tone="accent" style={{width:100,height:28,marginTop:8}}/></Card>;
}

export function TextoWireframe({ variant = 0 }: VariantProps) {
  if (variant === 1) return <Column><Pill/><SketchLine $width="78%" style={{height:18}}/><SketchLine $width="96%"/><SketchLine $width="88%"/><SketchLine $width="54%"/></Column>;
  if (variant === 2) return <Card><SketchLine $width="56%" style={{height:21}}/><SketchLine $width="94%"/><SketchLine $width="82%"/><Accent/></Card>;
  if (variant === 3) return <Row><Accent/><Column style={{flex:1}}><SketchLine $width="92%" style={{height:17}}/><SketchLine $width="74%"/></Column></Row>;
  return <Column><SketchLine $width="88%" style={{height:20}}/><SketchLine $width="98%"/><SketchLine $width="76%"/></Column>;
}
