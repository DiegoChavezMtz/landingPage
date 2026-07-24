"use client";

import { useRef, useState } from "react";
import styled from "styled-components";
import { Trash2, Download } from "lucide-react";
import toast from "react-hot-toast";
import { CanvasEditor } from "@/presentation/organisms/canvas/CanvasEditor";
import { CanvasExportView } from "@/presentation/organisms/canvas/CanvasExportView";
import { Button } from "@/presentation/atoms/Button";
import { Logo } from "@/presentation/atoms/Logo";
import { useSandboxCanvasStore } from "@/application/hooks/useSandboxCanvasStore";
import { exportarLayout } from "@/application/useCases/exportarLayout";

const Screen = styled.div`
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing.lg} clamp(20px, 4vw, 64px);
  color: ${({ theme }) => theme.colors.foreground};
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const HeaderActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.header};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: 1.4rem;
`;

const Intro = styled.p`
  margin-top: -${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.foregroundMuted};
  font: 400 0.9rem/1.5 ${({ theme }) => theme.fonts.body};
`;

const ExportStage = styled.div`
  position: fixed;
  top: 0;
  left: -10000px;
  pointer-events: none;
`;

export function SandboxPage() {
  const clear = useSandboxCanvasStore((state) => state.clear);
  const items = useSandboxCanvasStore((state) => state.items);
  const exportRef = useRef<HTMLDivElement>(null);
  const [exporting, setExporting] = useState(false);

  function handleClear() {
    if (items.length === 0) return;
    if (window.confirm("¿Reiniciar el lienzo? Se eliminarán todas las secciones.")) {
      clear();
    }
  }

  async function handleExport() {
    if (items.length === 0 || !exportRef.current) return;
    setExporting(true);
    try {
      await exportarLayout(exportRef.current);
      toast.success("Imagen descargada");
    } catch {
      toast.error("No se pudo exportar la imagen");
    } finally {
      setExporting(false);
    }
  }

  return (
    <Screen>
      <Header>
        <HeaderLeft>
          <Logo variant="light" width={120} />
          <Title>Constructor de wireframes</Title>
        </HeaderLeft>
        <HeaderActions>
          <Button variant="secondary" onClick={handleExport} disabled={items.length === 0 || exporting}>
            <Download size={16} style={{ marginRight: 6 }} />
            {exporting ? "Preparando imagen…" : "Descargar wireframe"}
          </Button>
          <Button variant="secondary" onClick={handleClear}>
            <Trash2 size={16} style={{ marginRight: 6 }} />
            Reiniciar lienzo
          </Button>
        </HeaderActions>
      </Header>
      <Intro>Convierte tu argumento en un recorrido: añade secciones, ordénalas y comprueba si cada una merece estar ahí.</Intro>
      <CanvasEditor store={useSandboxCanvasStore} />
      <ExportStage aria-hidden="true">
        <div ref={exportRef}>
          <CanvasExportView items={items} />
        </div>
      </ExportStage>
    </Screen>
  );
}
