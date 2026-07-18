export type Prioridad = "BAJA" | "MEDIA" | "ALTA";
export type Estado = "PENDIENTE" | "EN_PROCESO" | "RESUELTO";

export interface Incidencia {
  id: string;
  codigo: string;
  titulo: string;
  descripcion: string;
  areaSolicitante: string;
  prioridad: Prioridad;
  estado: Estado;
  fechaRegistro: string; // ISO string
}

// Datos que manda el formulario al crear (sin id ni fecha, los pone el backend)
export type IncidenciaFormData = Omit<Incidencia, "id" | "fechaRegistro">;

// Datos que manda el formulario al editar (todo opcional)
export type IncidenciaUpdateData = Partial<IncidenciaFormData> & {
  estado?: Estado;
};

// Filtros de búsqueda que usa FiltrosBar.tsx
export interface FiltrosIncidencia {
  busqueda: string; // por título o código
  prioridad: Prioridad | "TODAS";
  estado: Estado | "TODOS";
}

export const AREAS_SOLICITANTES = [
  "Administración",
  "Contabilidad",
  "Logística",
  "Recursos Humanos",
  "Ventas",
  "Sistemas",
  "Gerencia",
] as const;

export const PRIORIDADES: { value: Prioridad; label: string; color: string; bg: string }[] = [
  { value: "BAJA", label: "Baja", color: "#16a34a", bg: "#dcfce7" },
  { value: "MEDIA", label: "Media", color: "#d97706", bg: "#fef3c7" },
  { value: "ALTA", label: "Alta", color: "#dc2626", bg: "#fee2e2" },
];

export const ESTADOS: { value: Estado; label: string; color: string; bg: string }[] = [
  { value: "PENDIENTE", label: "Pendiente", color: "#dc2626", bg: "#fee2e2" },
  { value: "EN_PROCESO", label: "En proceso", color: "#d97706", bg: "#fef3c7" },
  { value: "RESUELTO", label: "Resuelto", color: "#16a34a", bg: "#dcfce7" },
];

export const ORDEN_ESTADOS: Estado[] = ["PENDIENTE", "EN_PROCESO", "RESUELTO"];

export function siguienteEstado(actual: Estado): Estado | null {
  const idx = ORDEN_ESTADOS.indexOf(actual);
  if (idx === -1 || idx === ORDEN_ESTADOS.length - 1) return null;
  return ORDEN_ESTADOS[idx + 1];
}

export function getPrioridadConfig(p: Prioridad) {
  return PRIORIDADES.find((x) => x.value === p)!;
}

export function getEstadoConfig(e: Estado) {
  return ESTADOS.find((x) => x.value === e)!;
}

export function generarCodigoSugerido(): string {
  const year = new Date().getFullYear();
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `INC-${year}-${rand}`;
}