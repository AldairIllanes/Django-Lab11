import { Card, CardContent } from "./ui/card";
import SolicitudItem from "./SolicitudItem";

function ListaSolicitudes({
  solicitudes,
  onCambiarEstado,
  onEliminarSolicitud,
}) {
  if (solicitudes.length === 0) {
    return (
      <Card className="empty-state">
        <CardContent>
          <h3>No hay solicitudes</h3>
          <p>
            No se encontraron solicitudes para este filtro. Registra una nueva
            solicitud o selecciona otro estado.
          </p>
        </CardContent>
      </Card>
    );
  }
  return (
    <div className="request-list">
      {solicitudes.map((solicitud) => (
        <SolicitudItem
          key={solicitud.id}
          solicitud={solicitud}
          onCambiarEstado={onCambiarEstado}
          onEliminarSolicitud={onEliminarSolicitud}/>
      ))}
    </div>
  );
}
export default ListaSolicitudes;