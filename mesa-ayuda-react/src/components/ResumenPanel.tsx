import type { Incidencia } from "../data/incidenciaConfig";
import { ESTADOS } from "../data/incidenciaConfig";

const CLASES_ESTADO: Record<string, string> = {
  PENDIENTE: "border-danger text-danger",
  EN_PROCESO: "border-warning text-warning",
  RESUELTO: "border-success text-success",
};

export function ResumenPanel({ incidencias }: { incidencias: Incidencia[] }) {
  const total = incidencias.length;

  const conteos = ESTADOS.map((e) => ({
    ...e,
    cantidad: incidencias.filter((inc) => inc.estado === e.value).length,
  }));

  return (
    <div className="row g-3 mb-4">
      <div className="col-6 col-md-3">
        <div className="card text-center bg-dark text-white h-100">
          <div className="card-body">
            <h3 className="mb-0">{total}</h3>
            <small>Total incidencias</small>
          </div>
        </div>
      </div>

      {conteos.map((c) => (
        <div className="col-6 col-md-3" key={c.value}>
          <div
            className={`card text-center h-100 border-2 ${CLASES_ESTADO[c.value]}`}
          >
            <div className="card-body">
              <h3 className={`mb-0 ${CLASES_ESTADO[c.value]}`}>
                {c.cantidad}
              </h3>
              <small className="text-body">{c.label}</small>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}