import axios from "axios";
import type {
  Incidencia,
  IncidenciaFormData,
  IncidenciaUpdateData,
} from "../data/incidenciaConfig";

export const API_BASE_URL = "http://localhost:8080";
const ENDPOINT = "/api/incidencias";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: { "Content-Type": "application/json" },
});

function mapToBackend(data: IncidenciaFormData | IncidenciaUpdateData) {
  return { ...data };
}

function mapFromBackend(raw: any): Incidencia {
  return {
    id: String(raw.id),
    codigo: raw.codigo,
    titulo: raw.titulo,
    descripcion: raw.descripcion,
    areaSolicitante: raw.areaSolicitante ?? raw.area_solicitante,
    prioridad: raw.prioridad,
    estado: raw.estado,
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