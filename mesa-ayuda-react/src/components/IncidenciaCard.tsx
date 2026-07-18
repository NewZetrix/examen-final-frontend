import type { Incidencia } from "../data/incidenciaConfig";
import { siguienteEstado, getEstadoConfig } from "../data/incidenciaConfig";
import { EstadoBadge } from "./EstadoBadge";

type Props = {
  incidencia: Incidencia;
  onEditar: (inc: Incidencia) => void;
  onEliminar: (inc: Incidencia) => void;
  onAvanzarEstado: (inc: Incidencia) => void;
};

const CLASES_PRIORIDAD: Record<Incidencia["prioridad"], string> = {
  BAJA: "bg-success",
  MEDIA: "bg-warning text-dark",
  ALTA: "bg-danger",
};

function formatFecha(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("es-PE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

export function IncidenciaCard({
  incidencia,
  onEditar,
  onEliminar,
  onAvanzarEstado,
}: Props) {
  const proximo = siguienteEstado(incidencia.estado);

  return (
    <div className="card shadow-sm h-100">
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <span className="badge bg-dark font-monospace">
            {incidencia.codigo}
          </span>
          <EstadoBadge estado={incidencia.estado} />
        </div>

        <h5 className="card-title mb-1">{incidencia.titulo}</h5>
        <p className="card-text text-muted small mb-2">
          {incidencia.descripcion}
        </p>

        <div className="d-flex justify-content-between align-items-center mb-2">
          <small className="text-muted">{incidencia.areaSolicitante}</small>
          <span className={`badge rounded-pill ${CLASES_PRIORIDAD[incidencia.prioridad]}`}>
            {incidencia.prioridad}
          </span>
        </div>

        <small className="text-muted mb-3">
          Registrado: {formatFecha(incidencia.fechaRegistro)}
        </small>

        <div className="mt-auto d-flex flex-wrap gap-2">
          {proximo && (
            <button
              type="button"
              className="btn btn-sm btn-outline-success"
              onClick={() => onAvanzarEstado(incidencia)}
            >
              → {getEstadoConfig(proximo).label}
            </button>
          )}
          <button
            type="button"
            className="btn btn-sm btn-outline-primary"
            onClick={() => onEditar(incidencia)}
          >
            Editar
          </button>
          <button
            type="button"
            className="btn btn-sm btn-outline-danger"
            onClick={() => onEliminar(incidencia)}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}