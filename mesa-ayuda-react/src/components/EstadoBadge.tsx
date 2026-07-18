import type { Estado } from "../data/incidenciaConfig";

const CLASES_ESTADO: Record<Estado, string> = {
  PENDIENTE: "bg-danger",
  EN_PROCESO: "bg-warning text-dark",
  RESUELTO: "bg-success",
};

const LABEL_ESTADO: Record<Estado, string> = {
  PENDIENTE: "Pendiente",
  EN_PROCESO: "En proceso",
  RESUELTO: "Resuelto",
};

export function EstadoBadge({ estado }: { estado: Estado }) {
  return (
    <span className={`badge rounded-pill ${CLASES_ESTADO[estado]}`}>
      {LABEL_ESTADO[estado]}
    </span>
  );
}