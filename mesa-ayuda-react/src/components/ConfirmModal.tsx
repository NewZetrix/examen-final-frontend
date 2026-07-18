type Props = {
  abierto: boolean;
  titulo: string;
  mensaje: string;
  onConfirmar: () => void;
  onCancelar: () => void;
};

export function ConfirmModal({
  abierto,
  titulo,
  mensaje,
  onConfirmar,
  onCancelar,
}: Props) {
  if (!abierto) return null;

  return (
    <>
      <div className="modal-backdrop show"></div>

      <div
        className="modal show d-block"
        tabIndex={-1}
        role="dialog"
        onClick={onCancelar}
      >
        <div
          className="modal-dialog modal-dialog-centered"
          role="document"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{titulo}</h5>
              <button
                type="button"
                className="btn-close"
                onClick={onCancelar}
              ></button>
            </div>
            <div className="modal-body">
              <p className="mb-0">{mensaje}</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onCancelar}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={onConfirmar}
              >
                Sí, eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
