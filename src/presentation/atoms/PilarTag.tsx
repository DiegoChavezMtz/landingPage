import styled from "styled-components";
import { PILARES, type PilarId } from "@/domain/entities/Pilar";

const Tag = styled.span<{ $sinPilar?: boolean }>`
  display: inline-flex;
  align-items: center;
  padding: 2px 10px;
  border-radius: ${({ theme }) => theme.radii.pill};
  border: 1px dashed
    ${({ theme, $sinPilar }) =>
      $sinPilar ? theme.colors.foregroundMuted : theme.colors.accent};
  color: ${({ theme, $sinPilar }) =>
    $sinPilar ? theme.colors.foregroundMuted : theme.colors.accent};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.7rem;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  white-space: nowrap;
`;

export function PilarTag({ pilarId }: { pilarId: PilarId | null }) {
  const pilar = PILARES.find((p) => p.id === pilarId);

  return (
    <Tag $sinPilar={!pilar}>{pilar ? pilar.nombre : "Sin pilar claro"}</Tag>
  );
}
