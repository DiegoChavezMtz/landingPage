import styled from "styled-components";
import { PilarTag } from "@/presentation/atoms/PilarTag";
import type { PageWidget, Seccion } from "@/domain/entities/Seccion";

const Frame = styled.div<{ $sandbox: boolean; $variant: number }>`
  position: relative;
  border: 1px solid ${({ $sandbox, theme }) => $sandbox ? "#b8b8b8" : theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ $sandbox }) => $sandbox ? "#ffffff" : "#161616"};
  box-shadow: ${({ $sandbox }) => ! $sandbox ? "none" : "0 5px 14px rgba(0,0,0,.06)"};
  transform: none;
  padding: ${({ theme }) => theme.spacing.md};
  overflow: hidden;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const Nombre = styled.span`
  font-family: ${({ theme }) => theme.fonts.header};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.foregroundMuted};
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

export function SeccionFrame({
  seccion,
  showPilarTag = true,
  showHeader = true,
  sandbox = false,
  variant = 0,
  children,
}: {
  seccion: Seccion | PageWidget;
  showPilarTag?: boolean;
  showHeader?: boolean;
  sandbox?: boolean;
  variant?: number;
  children: React.ReactNode;
}) {
  return (
    <Frame $sandbox={sandbox} $variant={variant}>
      {showHeader && <Header>
        <Nombre>{seccion.nombre}</Nombre>
        {showPilarTag && <PilarTag pilarId={("pilarId" in seccion && seccion.pilarId) ? seccion.pilarId : null} />}
      </Header>}
      {children}
    </Frame>
  );
}
