import type { FiltrosIncidencia } from "../data/incidenciaConfig";
import { PRIORIDADES, ESTADOS } from "../data/incidenciaConfig";

type Props = {
  filtros: FiltrosIncidencia;
  onChange: <K extends keyof FiltrosIncidencia>(
    key: K,
    value: FiltrosIncidencia[K]
  ) => void;
  onLimpiar: () => void;
};

export function FiltrosBar({ filtros, onChange, onLimpiar }: Props) {
  return (
    <div className="row g-2 mb-4">
      <div className="col-12 col-md-5">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar por título o código…"
          value={filtros.busqueda}
          onChange={(e) => onChange("busqueda", e.target.value)}
        />
      </div>

      <div className="col-6 col-md-3">
        <select
          className="form-select"
          value={filtros.prioridad}
          onChange={(e) =>
            onChange(
              "prioridad",
              e.target.value as FiltrosIncidencia["prioridad"]
            )
          }
        >
          <option value="TODAS">Toda prioridad</option>
          {PRIORIDADES.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>
      </div>

      <div className="col-6 col-md-3">
        <select
          className="form-select"
          value={filtros.estado}
          onChange={(e) =>
            onChange("estado", e.target.value as FiltrosIncidencia["estado"])
          }
        >
          <option value="TODOS">Todo estado</option>
          {ESTADOS.map((es) => (
            <option key={es.value} value={es.value}>
              {es.label}
            </option>
          ))}
        </select>
      </div>

      <div className="col-12 col-md-1">
        <button
          type="button"
          className="btn btn-outline-secondary w-100"
          onClick={onLimpiar}
        >
          Limpiar
        </button>
      </div>
    </div>
  );
}