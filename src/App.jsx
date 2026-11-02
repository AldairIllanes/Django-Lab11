import { useState } from "react";
import {
  CalendarDays,
  CircleCheck,
  Clock3,
  LifeBuoy,
  ListTodo,
  RefreshCw,
} from "lucide-react";
import SolicitudForm from "./components/SolicitudForm";
import ListaSolicitudes from "./components/ListaSolicitudes";
import FiltrosSolicitudes from "./components/FiltrosSolicitudes";
import "./App.css";

function App() {
  const [solicitudes, setSolicitudes] = useState([
    {
      id: 1,
      titulo: "Computadora no enciende",
      descripcion:
        "La computadora de escritorio no enciende cuando presiono el botón de inicio.",
      solicitante: "Carlos Mendoza",
      prioridad: "alta",
      estado: "pendiente",
      fecha: "2026-10-25T09:30:00", },
    {
      id: 2,
      titulo: "Problemas con la conexión a Internet",
      descripcion:
        "No puedo conectarme a la red Wi-Fi desde mi computadora portátil.",
      solicitante: "María Torres",
      prioridad: "media",
      estado: "en proceso",
      fecha: "2026-10-25T11:15:00", },
    {
      id: 3,
      titulo: "Instalación de software",
      descripcion:
        "Necesito ayuda para instalar un programa de trabajo en mi computadora.",
      solicitante: "José Ramírez",
      prioridad: "baja",
      estado: "resuelta",
      fecha: "2026-10-24T14:00:00", },
  ]);
  const [filtro, setFiltro] = useState("todos");
  function agregarSolicitud(nuevaSolicitud) {
    const solicitud = {
      ...nuevaSolicitud,
      id: Date.now(),
      estado: "pendiente",
      fecha: new Date().toISOString(),
    };
    setSolicitudes((actuales) => [solicitud, ...actuales]);
  }
  function cambiarEstado(id, nuevoEstado) {
    setSolicitudes((actuales) =>
      actuales.map((solicitud) =>
        solicitud.id === id
          ? { ...solicitud, estado: nuevoEstado }
          : solicitud
      )
    );
  }
  function eliminarSolicitud(id) {
    setSolicitudes((actuales) =>
      actuales.filter((solicitud) => solicitud.id !== id)
    );
  }
  const conteos = {
    todos: solicitudes.length,
    pendiente: solicitudes.filter(
      (solicitud) => solicitud.estado === "pendiente"
    ).length,
    "en proceso": solicitudes.filter(
      (solicitud) => solicitud.estado === "en proceso"
    ).length,
    resuelta: solicitudes.filter(
      (solicitud) => solicitud.estado === "resuelta"
    ).length,
};
  const solicitudesFiltradas = solicitudes.filter(
    (solicitud) => filtro === "todos" || solicitud.estado === filtro
  );
  const estadisticas = [
    { titulo: "Totales", total: conteos.todos, icono: ListTodo, clase: "" },
    { titulo: "Pendientes",
      total: conteos.pendiente,
      icono: Clock3,
      clase: "pending",},
    { titulo: "En proceso",
      total: conteos["en proceso"],
      icono: RefreshCw,
      clase: "",},
    { titulo: "Resueltas",
      total: conteos.resuelta,
      icono: CircleCheck,
      clase: "", },
  ];
  const [fechaActual] = useState(() =>
    new Intl.DateTimeFormat("es-PE", {
      weekday: "long",
      day: "numeric",
      month: "long",
    }).format(new Date())
  );

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand-lockup">
          <span className="brand-mark">
            <LifeBuoy aria-hidden="true" />
          </span>
          <div>
            <span className="brand">Mesa de ayuda</span>
            <span className="brand-caption">SOPORTE INTERNO</span>
          </div>
        </div>
        <div className="topbar-status">
          <span className="status-pulse" aria-hidden="true" />
          <span>Centro de soporte activo</span>
        </div>
      </header>
      <div className="dashboard">
        <aside className="sidebar">
          <h2 className="section-heading">CREA UNA SOLICITUD</h2>
          <SolicitudForm onAgregarSolicitud={agregarSolicitud} />
          <p className="sidebar-note">
            <span aria-hidden="true">✳</span>
            Tu equipo de soporte está aquí para ayudarte.
          </p>
        </aside>
        <section className="workspace">
          <div className="workspace-intro">
            <div>
              <p className="eyebrow">PANEL DE SOPORTE <span>·</span> VISTA GENERAL</p>
              <h1>Soporte claro.<br /><span>Trabajo en marcha.</span></h1>
              <p className="intro-copy">
                Organiza los problemas del equipo y sigue cada solicitud hasta
                encontrar una solución.
              </p>
            </div>
            <div className="date-pill">
              <CalendarDays size={16} aria-hidden="true" />
              <span>{fechaActual}</span>
            </div>
          </div>
          <div className="stats-grid" aria-label="Resumen de solicitudes">
            {estadisticas.map(({ titulo, total, icono: Icono, clase }) => (
              <article
                className={`stat-card ${clase}`}
                key={titulo}
                aria-label={`${titulo}: ${total}`}
              >
                <div>
                  <p className="stat-label">{titulo}</p>
                  <p className="stat-value">{total}</p>
                </div>
                <Icono className="stat-icon" aria-hidden="true" />
              </article>
            ))}
          </div>
          <section className="filters-section" aria-labelledby="filters-heading">
            <h2 className="section-heading" id="filters-heading">
              FILTROS
            </h2>
            <FiltrosSolicitudes
              filtro={filtro}
              conteos={conteos}
              onCambiarFiltro={setFiltro}
            />
          </section>
          <section aria-labelledby="workflow-heading">
            <div className="workflow-heading-row">
              <h2 className="section-heading" id="workflow-heading">
                SOLICITUDES DEL EQUIPO
              </h2>
              <p className="results-count" aria-live="polite">
                {solicitudesFiltradas.length} de {solicitudes.length}
              </p>
            </div>
            <ListaSolicitudes
              solicitudes={solicitudesFiltradas}
              onCambiarEstado={cambiarEstado}
              onEliminarSolicitud={eliminarSolicitud}
            />
          </section>
        </section>
      </div>
    </main>
  );
}

export default App;
