import styled from "styled-components";
import { motion } from "framer-motion";
import { TextArea } from "@/presentation/atoms/TextArea";
import type { Pilar } from "@/domain/entities/Pilar";

const Card = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  background: ${({ theme }) => theme.colors.backgroundElevated};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => theme.spacing.md};
  text-align: left;
`;

const Nombre = styled.h3`
  font-family: ${({ theme }) => theme.fonts.header};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: 1.05rem;
  color: ${({ theme }) => theme.colors.accent};
`;

const Pregunta = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.foregroundMuted};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

export function PilarCard({
  pilar,
  value,
  onChange,
}: {
  pilar: Pilar;
  value: string;
  onChange: (texto: string) => void;
}) {
  return (
    <Card
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Nombre>{pilar.nombre}</Nombre>
      <Pregunta>{pilar.pregunta}</Pregunta>
      <TextArea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Captura aquí la idea más clara…"
      />
    </Card>
  );
}
