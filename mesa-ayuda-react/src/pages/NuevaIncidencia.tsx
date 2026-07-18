import { useNavigate, useParams } from "react-router-dom";
import { useIncidencias } from "../hooks/useIncidencia";
import { IncidenciaForm } from "../components/IncidenciaForm";
import type { IncidenciaFormData } from "../data/incidenciaConfig";

export function NuevaIncidenciaPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { incidencias, registrar, editar } = useIncidencias();

  const incidenciaEditar = id
    ? incidencias.find((inc) => inc.id === id) ?? null
    : null;

  const esEdicion = Boolean(id);

  async function handleGuardar(datos: IncidenciaFormData) {
    if (esEdicion && incidenciaEditar) {
      await editar(incidenciaEditar.id, datos);
    } else {
      await registrar(datos);
    }
    navigate("/incidencias");
  }

  function handleCancelar() {
    navigate("/incidencias");
  }

  // Si la ruta es de edición pero aún no cargo la lista (o el id no existe)
  if (esEdicion && !incidenciaEditar) {
    return (
      <div className="container py-4">
        <p className="text-muted">Cargando incidencia…</p>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-8">
          <div className="card shadow-sm">
            <div className="card-body">
              <h1 className="h4 mb-4">
                {esEdicion ? "Editar incidencia" : "Registrar nueva incidencia"}
              </h1>
              <IncidenciaForm
                incidenciaEditar={incidenciaEditar}
                onGuardar={handleGuardar}
                onCancelar={handleCancelar}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}