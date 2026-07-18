import { useState, type FormEvent } from "react";
import type { Incidencia, IncidenciaFormData, Prioridad, Estado } from "../data/incidenciaConfig";
import {
  AREAS_SOLICITANTES,
  PRIORIDADES,
  ESTADOS,
  generarCodigoSugerido,
} from "../data/incidenciaConfig";

type Props = {
  incidenciaEditar?: Incidencia | null;
  onGuardar: (datos: IncidenciaFormData) => Promise<void> | void;
  onCancelar: () => void;
};

type FormState = {
  codigo: string;
  titulo: string;
  descripcion: string;
  areaSolicitante: string;
  prioridad: Prioridad;
  estado: Estado;
};

const VALOR_INICIAL: FormState = {
  codigo: generarCodigoSugerido(),
  titulo: "",
  descripcion: "",
  areaSolicitante: AREAS_SOLICITANTES[0],
  prioridad: "MEDIA",
  estado: "PENDIENTE",
};

export function IncidenciaForm({ incidenciaEditar, onGuardar, onCancelar }: Props) {
  const esEdicion = Boolean(incidenciaEditar);

  const [form, setForm] = useState<FormState>(
    incidenciaEditar
      ? {
          codigo: incidenciaEditar.codigo,
          titulo: incidenciaEditar.titulo,
          descripcion: incidenciaEditar.descripcion,
          areaSolicitante: incidenciaEditar.areaSolicitante,
          prioridad: incidenciaEditar.prioridad,
          estado: incidenciaEditar.estado,
        }
      : VALOR_INICIAL
  );
  const [errores, setErrores] = useState<Partial<Record<keyof FormState, string>>>({});
  const [enviando, setEnviando] = useState(false);

  function handleChange<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function validar(): boolean {
    const nuevosErrores: Partial<Record<keyof FormState, string>> = {};
    if (!form.codigo.trim()) nuevosErrores.codigo = "El código es obligatorio.";
    if (!form.titulo.trim() || form.titulo.trim().length < 5)
      nuevosErrores.titulo = "El título debe tener al menos 5 caracteres.";
    if (!form.descripcion.trim() || form.descripcion.trim().length < 10)
      nuevosErrores.descripcion = "La descripción debe tener al menos 10 caracteres.";
    if (!form.areaSolicitante) nuevosErrores.areaSolicitante = "Selecciona un área.";

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validar()) return;

    setEnviando(true);
    try {
      await onGuardar(form);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Código</label>
          <input
            type="text"
            className={`form-control ${errores.codigo ? "is-invalid" : ""}`}
            value={form.codigo}
            onChange={(e) => handleChange("codigo", e.target.value)}
            disabled={esEdicion}
          />
          {errores.codigo && (
            <div className="invalid-feedback">{errores.codigo}</div>
          )}
        </div>

        <div className="col-md-6">
          <label className="form-label">Área solicitante</label>
          <select
            className="form-select"
            value={form.areaSolicitante}
            onChange={(e) => handleChange("areaSolicitante", e.target.value)}
          >
            {AREAS_SOLICITANTES.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </div>

        <div className="col-12">
          <label className="form-label">Título</label>
          <input
            type="text"
            className={`form-control ${errores.titulo ? "is-invalid" : ""}`}
            value={form.titulo}
            onChange={(e) => handleChange("titulo", e.target.value)}
            placeholder="Ej: No enciende monitor de recepción"
          />
          {errores.titulo && (
            <div className="invalid-feedback">{errores.titulo}</div>
          )}
        </div>

        <div className="col-12">
          <label className="form-label">Descripción</label>
          <textarea
            className={`form-control ${errores.descripcion ? "is-invalid" : ""}`}
            rows={3}
            value={form.descripcion}
            onChange={(e) => handleChange("descripcion", e.target.value)}
            placeholder="Detalla el problema reportado…"
          />
          {errores.descripcion && (
            <div className="invalid-feedback">{errores.descripcion}</div>
          )}
        </div>

        <div className="col-md-6">
          <label className="form-label">Prioridad</label>
          <select
            className="form-select"
            value={form.prioridad}
            onChange={(e) => handleChange("prioridad", e.target.value as Prioridad)}
          >
            {PRIORIDADES.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-6">
          <label className="form-label">Estado</label>
          <select
            className="form-select"
            value={form.estado}
            onChange={(e) => handleChange("estado", e.target.value as Estado)}
          >
            {ESTADOS.map((es) => (
              <option key={es.value} value={es.value}>
                {es.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="d-flex justify-content-end gap-2 mt-4">
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={onCancelar}
        >
          Cancelar
        </button>
        <button type="submit" className="btn btn-danger" disabled={enviando}>
          {enviando ? "Guardando…" : esEdicion ? "Guardar cambios" : "Registrar"}
        </button>
      </div>
    </form>
  );
}