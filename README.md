# Sistema de Mesa de Ayuda — React

Evaluación Final · **Java Script Avanzado** · UTP

Aplicación web para registrar, consultar y gestionar incidencias técnicas
reportadas por los colaboradores de una empresa.

## 🔗 Enlaces

- **Aplicación desplegada:** https://examen-final-frontend-ashen.vercel.app/incidencias
- **API Backend:** https://backend-examenfinal.onrender.com/api/incidencias

## 👥 Integrantes - Grupo 7

| Integrante | Rol |
|---|---|
| _(Bedia Castillo)_ | Arquitectura, navegación y estructura del frontend |
| _(Garcia Muñoz)_ | Componentes, formularios y diseño de interfaz |

## 🧰 Tecnologías

- React 18 + TypeScript + Vite
- React Router DOM (ruteo)
- Axios (consumo de API REST)
- Bootstrap 5 (estilos, diseño responsivo)
- Despliegue: Vercel

## 📦 Instalación

cd mesa-ayuda-react
npm install #examen-final-frontend

## ▶️Funcionalidades del frontend implementadas
- [x] Registrar incidencia (código, título, descripción, área, prioridad, estado, fecha)
- [x] Listar incidencias en tarjetas
- [x] Buscar por título o código
- [x] Filtrar por prioridad y estado
- [x] Editar incidencia
- [x] Cambiar estado: Pendiente → En proceso → Resuelto
- [x] Eliminar incidencia con confirmación
- [x] Panel resumen con total y conteo por estado
- [x] Navegación entre páginas (Listado, Nueva/Editar incidencia)
- [x] Formularios con validaciones
- [x] Manejo de estados de carga y error
- [x] Diseño responsivo (Bootstrap)

## 🗂Estructura del proyecto
src/
├─ components/
│  ├─ IncidenciaForm.tsx      → formulario crear/editar
│  ├─ IncidenciaCard.tsx      → tarjeta individual de incidencia
│  ├─ FiltrosBar.tsx          → búsqueda + filtros de prioridad/estado
│  ├─ ResumenPanel.tsx        → contadores por estado
│  └─ ConfirmModal.tsx        → confirmación antes de eliminar
├─ pages/
│  ├─ IncidenciasPage.tsx     → listado + filtros + resumen
│  └─ NuevaIncidenciaPage.tsx → registrar/editar (ruta propia)
├─ hooks/
│  └─ useIncidencias.ts       → CRUD completo (list, create, update, delete)
├─ services/
│  └─ incidenciaService.ts    → llamadas REST al backend
├─ data/
│  └─ incidenciaConfig.ts     → tipos, opciones de prioridad/estado, validaciones
└─ App.tsx                    → rutas (React Router)