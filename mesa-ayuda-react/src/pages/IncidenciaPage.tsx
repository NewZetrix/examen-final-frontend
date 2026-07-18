import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Incidencia, FiltrosIncidencia } from "../data/incidenciaConfig";
import { useIncidencias } from "../hooks/useIncidencia";
import { siguienteEstado } from "../data/incidenciaConfig";
import { ResumenPanel } from "../components/ResumenPanel";
import { FiltrosBar } from "../components/FiltrosBar";
import { IncidenciaCard } from "../components/IncidenciaCard";
import { ConfirmModal } from "../components/ConfirmModal";

const FILTROS_INICIALES: FiltrosIncidencia = {
  busqueda: "",
  prioridad: "TODAS",
  estado: "TODOS",
};

export function IncidenciasPage() {
  const navigate = useNavigate();
  const { incidencias, loading, error, editar, eliminar } = useIncidencias();

  const [filtros, setFiltros] = useState<FiltrosIncidencia>(FILTROS_INICIALES);
  const [incidenciaEliminar, setIncidenciaEliminar] =
    useState<Incidencia | null>(null);

  const incidenciasFiltradas = useMemo(() => {
    const busq = filtros.busqueda.trim().toLowerCase();
    return incidencias.filter((inc) => {
      const coincideBusqueda =
        busq === "" ||
        inc.titulo.toLowerCase().includes(busq) ||
        inc.codigo.toLowerCase().includes(busq);
      const coincidePrioridad =
        filtros.prioridad === "TODAS" || inc.prioridad === filtros.prioridad;
      const coincideEstado =
        filtros.estado === "TODOS" || inc.estado === filtros.estado;
      return coincideBusqueda && coincidePrioridad && coincideEstado;
    });
  }, [incidencias, filtros]);

  function actualizarFiltro<K extends keyof FiltrosIncidencia>(
    key: K,
    value: FiltrosIncidencia[K]
  ) {
    setFiltros((prev) => ({ ...prev, [key]: value }));
  }

  function limpiarFiltros() {
    setFiltros(FILTROS_INICIALES);
  }

  async function handleAvanzarEstado(inc: Incidencia) {
    const nuevo = siguienteEstado(inc.estado);
    if (nuevo) {
      await editar(inc.id, { estado: nuevo });
    }
  }

  async function handleConfirmarEliminar() {
    if (incidenciaEliminar) {
      await eliminar(incidenciaEliminar.id);
      setIncidenciaEliminar(null);
    }
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-start flex-wrap gap-3 mb-4">
        <div>
          <h1 className="h3 mb-1">Mesa de Ayuda</h1>
          <p className="text-muted mb-0">
            Gestión de incidencias técnicas reportadas por colaboradores.
          </p>
        </div>
        <button
          className="btn btn-danger"
          onClick={() => navigate("/incidencias/nueva")}
        >
          + Nueva incidencia
        </button>
      </div>

      {error && <div className="alert alert-danger">⚠️ {error}</div>}

      <ResumenPanel incidencias={incidencias} />
      <FiltrosBar
        filtros={filtros}
        onChange={actualizarFiltro}
        onLimpiar={limpiarFiltros}
      />

      {loading ? (
        <div className="text-center text-muted py-5">
          Cargando incidencias…
        </div>
      ) : incidenciasFiltradas.length === 0 ? (
        <div className="alert alert-light border text-center">
          No hay incidencias que coincidan con la búsqueda/filtros.
        </div>
      ) : (
        <div className="row g-3">
          {incidenciasFiltradas.map((inc) => (
            <div className="col-12 col-md-6 col-lg-4" key={inc.id}>
              <IncidenciaCard
                incidencia={inc}
                onEditar={(i) => navigate(`/incidencias/editar/${i.id}`)}
                onEliminar={setIncidenciaEliminar}
                onAvanzarEstado={handleAvanzarEstado}
              />
            </div>
          ))}
        </div>
      )}

      <ConfirmModal
        abierto={Boolean(incidenciaEliminar)}
        titulo="Eliminar incidencia"
        mensaje={`¿Seguro que deseas eliminar "${incidenciaEliminar?.titulo}"? Esta acción no se puede deshacer.`}
        onConfirmar={handleConfirmarEliminar}
        onCancelar={() => setIncidenciaEliminar(null)}
      />
    </div>
  );
}