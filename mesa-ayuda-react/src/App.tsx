import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import { IncidenciasPage } from "./pages/IncidenciaPage";
import { NuevaIncidenciaPage } from "./pages/NuevaIncidencia";

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-dark bg-dark mb-2">
        <div className="container">
          <Link className="navbar-brand" to="/incidencias">
            🛠️ Mesa de Ayuda
          </Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/incidencias" replace />} />
        <Route path="/incidencias" element={<IncidenciasPage />} />
        <Route path="/incidencias/nueva" element={<NuevaIncidenciaPage />} />
        <Route path="/incidencias/editar/:id" element={<NuevaIncidenciaPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;