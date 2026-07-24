import { SeccionFrame } from "@/presentation/molecules/SeccionFrame";
import { WireframeEditProvider } from "@/presentation/atoms/SketchBlock";
import type { PageWidget, Seccion, SeccionTipo } from "@/domain/entities/Seccion";
import {
  HeroWireframe,
  KickerDolorWireframe,
  GridBeneficiosWireframe,
  FranjaConfianzaWireframe,
  TestimonioWireframe,
  CtaFinalWireframe,
  CarruselWireframe,
  NuestraHistoriaWireframe,
  PopupNewsletterWireframe,
  TextoWireframe,
} from "@/presentation/organisms/secciones/SeccionWireframes";

const WIREFRAME_BY_TIPO: Record<SeccionTipo, (props: { variant?: number }) => React.ReactElement> = {
  hero: HeroWireframe,
  "kicker-dolor": KickerDolorWireframe,
  "grid-beneficios": GridBeneficiosWireframe,
  "franja-confianza": FranjaConfianzaWireframe,
  testimonio: TestimonioWireframe,
  "cta-final": CtaFinalWireframe,
  carrusel: CarruselWireframe,
  "nuestra-historia": NuestraHistoriaWireframe,
  "popup-newsletter": PopupNewsletterWireframe,
  texto: TextoWireframe,
};

export function SeccionRenderer({
  seccion,
  showPilarTag = true,
  showHeader = true,
  sandbox = false,
  variant = 0,
  content,
  onContentChange,
}: {
  seccion: Seccion | PageWidget;
  showPilarTag?: boolean;
  showHeader?: boolean;
  sandbox?: boolean;
  variant?: number;
  content?: Record<string, string>;
  onContentChange?: (key: string, value: string) => void;
}) {
  const Wireframe = WIREFRAME_BY_TIPO[seccion.tipo];

  return (
    <SeccionFrame seccion={seccion} showPilarTag={showPilarTag} showHeader={showHeader} sandbox={sandbox} variant={variant}>
      <WireframeEditProvider editable={sandbox && Boolean(onContentChange)} content={content} onChange={onContentChange}>
        <Wireframe variant={variant} />
      </WireframeEditProvider>
    </SeccionFrame>
  );
}
