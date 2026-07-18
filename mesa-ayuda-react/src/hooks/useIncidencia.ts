import { useCallback, useEffect, useState } from "react";
import type {
  Incidencia,
  IncidenciaFormData,
  IncidenciaUpdateData,
} from "../data/incidenciaConfig";
import {
  listarIncidencias,
  crearIncidencia,
  actualizarIncidencia,
  eliminarIncidencia,
} from "../services/incidenciaService";

export function useIncidencias() {
  const [incidencias, setIncidencias] = useState<Incidencia[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cargar = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await listarIncidencias();
      setIncidencias(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "No se pudo conectar con el servidor."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    cargar();
  }, [cargar]);

  async function registrar(datos: IncidenciaFormData) {
    setError(null);
    try {
      const nueva = await crearIncidencia(datos);
      setIncidencias((prev) => [nueva, ...prev]);
      return nueva;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "No se pudo registrar la incidencia."
      );
      return null;
    }
  }

  async function editar(id: string, datos: IncidenciaUpdateData) {
    setError(null);
    try {
      const actualizada = await actualizarIncidencia(id, datos);
      setIncidencias((prev) =>
        prev.map((inc) => (inc.id === id ? actualizada : inc))
      );
      return actualizada;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "No se pudo actualizar la incidencia."
      );
      return null;
    }
  }

  async function eliminar(id: string) {
    setError(null);
    try {
      await eliminarIncidencia(id);
      setIncidencias((prev) => prev.filter((inc) => inc.id !== id));
      return true;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "No se pudo eliminar la incidencia."
      );
      return false;
    }
  }

  return { incidencias, loading, error, recargar: cargar, registrar, editar, eliminar };
}
