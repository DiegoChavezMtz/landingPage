import styled from "styled-components";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import type { Disciplina } from "@/domain/entities/Disciplina";

const Card = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.backgroundElevated};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => theme.spacing.md};
  text-align: left;
`;

const IconWrap = styled.div`
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.accentMuted};
  color: ${({ theme }) => theme.colors.accent};
`;

const Nombre = styled.h3`
  font-family: ${({ theme }) => theme.fonts.header};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: 1.1rem;
`;

const Descripcion = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.9rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.foregroundMuted};
`;

export function DisciplinaCard({
  disciplina,
  Icon,
}: {
  disciplina: Disciplina;
  Icon: LucideIcon;
}) {
  return (
    <Card
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <IconWrap>
        <Icon size={22} />
      </IconWrap>
      <Nombre>{disciplina.nombre}</Nombre>
      <Descripcion>{disciplina.descripcion}</Descripcion>
    </Card>
  );
}
