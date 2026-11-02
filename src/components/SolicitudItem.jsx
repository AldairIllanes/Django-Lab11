import { Trash2 } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

const estados = ["pendiente", "en proceso", "resuelta"];
const nombresEstado = ["Registrada", "En proceso", "Resuelta"];
function SolicitudItem({
  solicitud,
  onCambiarEstado,
  onEliminarSolicitud,
}) {
  const coloresPrioridad = {
    baja: "border-emerald-200 bg-emerald-50 text-emerald-700",
    media: "border-amber-200 bg-amber-50 text-amber-700",
    alta: "border-red-200 bg-red-50 text-red-700",};
  const coloresEstado = {
    pendiente: "border-amber-200 bg-amber-50 text-amber-700",
    "en proceso": "border-blue-200 bg-blue-50 text-blue-700",
    resuelta: "border-emerald-200 bg-emerald-50 text-emerald-700",};
  const indiceEstado = estados.indexOf(solicitud.estado);
  const fechaFormateada = new Date(solicitud.fecha).toLocaleString("es-PE", {
    dateStyle: "medium",
    timeStyle: "short",});

  function manejarEliminacion() {
    const confirmar = window.confirm(
      `¿Estás seguro de eliminar la solicitud "${solicitud.titulo}"?`
    );
    if (confirmar) {
      onEliminarSolicitud(solicitud.id);
    }
  }
  return (
    <Card className="request-card">
      <CardContent>
        <div className="request-card-layout">
          <div className="request-main">
            <div className="request-title-row">
              <h3 className="request-title">{solicitud.titulo}</h3>
              <Badge
                variant="outline"
                className={`priority-badge capitalize ${coloresPrioridad[solicitud.prioridad]}`}>
                {solicitud.prioridad}
              </Badge>
            </div>
            <p className="request-meta">
              <span>Solicitante: {solicitud.solicitante}</span>
              <span>{fechaFormateada}</span>
            </p>
            <p className="request-description">{solicitud.descripcion}</p>
            <div className="workflow" aria-label={`Estado: ${solicitud.estado}`}>
              {estados.map((estado, indice) => (
                <span
                  className={`workflow-step ${indice <= indiceEstado ? "done" : ""}`}
                  key={estado}
                />
              ))}
            </div>
            <div className="workflow-labels">
              {nombresEstado.map((nombre, indice) => (
                <span
                  className={indice === indiceEstado ? "current" : ""}
                  key={nombre}>
                  {nombre}
                </span>
              ))}
            </div>
          </div>
          <Badge
            variant="outline"
            className={`status-badge capitalize ${coloresEstado[solicitud.estado]}`}>
            {solicitud.estado}
          </Badge>
          <div className="request-actions">
            <label className="sr-only" htmlFor={`estado-${solicitud.id}`}>
              Actualizar estado de {solicitud.titulo}
            </label>
            <select
              id={`estado-${solicitud.id}`}
              value={solicitud.estado}
              onChange={(evento) =>
                onCambiarEstado(solicitud.id, evento.target.value)
              }
              className="status-select">
              <option value="pendiente">Pendiente</option>
              <option value="en proceso">En proceso</option>
              <option value="resuelta">Resuelta</option>
            </select>
            <Button
              type="button"
              variant="ghost"
              onClick={manejarEliminacion}
              className="delete-button">
              <Trash2 size={16} aria-hidden="true" />
              Eliminar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
export default SolicitudItem;
