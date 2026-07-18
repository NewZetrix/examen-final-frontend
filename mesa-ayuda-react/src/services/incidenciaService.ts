import axios from "axios";
import type {
  Incidencia,
  IncidenciaFormData,
  IncidenciaUpdateData,
} from "../data/incidenciaConfig";

export const API_BASE_URL = "https://backend-examenfinal.onrender.com";
const ENDPOINT = "/api/incidencias";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: { "Content-Type": "application/json" },
});

const ESTADO_A_BACKEND: Record<string, string> = {
  PENDIENTE: "Pendiente",
  EN_PROCESO: "En proceso",
  RESUELTO: "Resuelto",
};

const PRIORIDAD_A_BACKEND: Record<string, string> = {
  BAJA: "Baja",
  MEDIA: "Media",
  ALTA: "Alta",
};

const ESTADO_DESDE_BACKEND: Record<string, string> = {
  Pendiente: "PENDIENTE",
  "En proceso": "EN_PROCESO",
  Resuelto: "RESUELTO",
};

const PRIORIDAD_DESDE_BACKEND: Record<string, string> = {
  Baja: "BAJA",
  Media: "MEDIA",
  Alta: "ALTA",
};

function mapToBackend(data: IncidenciaFormData | IncidenciaUpdateData) {
  const payload: any = { ...data };
  if (payload.estado) {
    payload.estado = ESTADO_A_BACKEND[payload.estado] ?? payload.estado;
  }
  if (payload.prioridad) {
    payload.prioridad = PRIORIDAD_A_BACKEND[payload.prioridad] ?? payload.prioridad;
  }
  return payload;
}

function mapFromBackend(raw: any): Incidencia {
  return {
    id: String(raw.id),
    codigo: raw.codigo,
    titulo: raw.titulo,
    descripcion: raw.descripcion,
    areaSolicitante: raw.areaSolicitante ?? raw.area_solicitante,
    prioridad: (PRIORIDAD_DESDE_BACKEND[raw.prioridad] ?? raw.prioridad) as Incidencia["prioridad"],
    estado: (ESTADO_DESDE_BACKEND[raw.estado] ?? raw.estado) as Incidencia["estado"],
    fechaRegistro: raw.fechaRegistro ?? raw.fecha_registro,
  };
}

export async function listarIncidencias(): Promise<Incidencia[]> {
  const { data } = await api.get(ENDPOINT);
  return Array.isArray(data) ? data.map(mapFromBackend) : [];
}

export async function crearIncidencia(
  datos: IncidenciaFormData
): Promise<Incidencia> {
  const { data } = await api.post(ENDPOINT, mapToBackend(datos));
  return mapFromBackend(data);
}

export async function actualizarIncidencia(
  id: string,
  datos: IncidenciaUpdateData
): Promise<Incidencia> {
  const { data } = await api.put(`${ENDPOINT}/${id}`, mapToBackend(datos));
  return mapFromBackend(data);
}

export async function eliminarIncidencia(id: string): Promise<void> {
  await api.delete(`${ENDPOINT}/${id}`);
}