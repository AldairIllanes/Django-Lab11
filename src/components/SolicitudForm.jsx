import { useState } from "react";
import { ClipboardPenLine } from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

function SolicitudForm({ onAgregarSolicitud }) {
  const [formulario, setFormulario] = useState({
    titulo: "",
    descripcion: "",
    solicitante: "",
    prioridad: "media",});

  const [error, setError] = useState("");

  function manejarCambio(evento) {
    const { name, value } = evento.target;

    setFormulario((actual) => ({
      ...actual,
      [name]: value,
    }));

    setError("");
  }

  function manejarEnvio(evento) {
    evento.preventDefault();
    if (
      !formulario.titulo.trim() ||
      !formulario.descripcion.trim() ||
      !formulario.solicitante.trim()
    ) {
      setError(
        "Completa el título, la descripción y el nombre del solicitante."
      );
      return;}

    onAgregarSolicitud({
      titulo: formulario.titulo.trim(),
      descripcion: formulario.descripcion.trim(),
      solicitante: formulario.solicitante.trim(),
      prioridad: formulario.prioridad,});
    setFormulario({
      titulo: "",
      descripcion: "",
      solicitante: "",
      prioridad: "media",});
    setError("");
  }
  return (
    <Card className="request-form">
      <CardHeader>
        <div className="form-icon">
          <ClipboardPenLine size={21} aria-hidden="true" />
        </div>
        <CardTitle className="text-xl font-bold text-slate-800">
          Nueva solicitud
        </CardTitle>
        <CardDescription>
          Completa los datos para registrar un problema técnico.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={manejarEnvio} className="request-fields">
          <div>
            <label htmlFor="titulo">Título del problema *</label>
            <Input
              id="titulo"
              name="titulo"
              placeholder="Ej. Computadora no enciende"
              value={formulario.titulo}
              onChange={manejarCambio}
              maxLength={100}
              required
            />
          </div>

          <div>
            <label htmlFor="descripcion">Descripción detallada *</label>
            <Textarea
              id="descripcion"
              name="descripcion"
              placeholder="Describe el problema técnico..."
              value={formulario.descripcion}
              onChange={manejarCambio}
              rows={4}
              maxLength={500}
              required
            />
          </div>

          <div>
            <label htmlFor="solicitante">Solicitante *</label>
            <Input
              id="solicitante"
              name="solicitante"
              placeholder="Ej. Juan Pérez"
              value={formulario.solicitante}
              onChange={manejarCambio}
              maxLength={80}
              required
            />
          </div>

          <div>
            <label htmlFor="prioridad">Prioridad</label>
            <select
              id="prioridad"
              name="prioridad"
              value={formulario.prioridad}
              onChange={manejarCambio}
              >
              <option value="baja">Baja</option>
              <option value="media">Media</option>
              <option value="alta">Alta</option>
            </select>
          </div>
          {error && (
            <div
              role="alert"
              className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
            >
              {error}
            </div>
          )}
          <Button
            type="submit"
            className="submit-button">
            Registrar solicitud
          </Button>
          <p className="form-hint">
            * Los campos marcados son obligatorios.</p>
        </form>
      </CardContent>
    </Card>
  );
}

export default SolicitudForm;