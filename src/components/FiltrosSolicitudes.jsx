import { Button } from "./ui/button";

const opciones = [
  { valor: "todos", texto: "Todas" },
  { valor: "pendiente", texto: "Pendientes" },
  { valor: "en proceso", texto: "En proceso" },
  { valor: "resuelta", texto: "Resueltas" },
];

function FiltrosSolicitudes({ filtro, conteos, onCambiarFiltro }) {
  return (
    <div className="filter-list">
      {opciones.map((opcion) => (
        <Button
          key={opcion.valor}
          type="button"
          variant="outline"
          data-active={filtro === opcion.valor}
          data-filter={opcion.valor}
          onClick={() => onCambiarFiltro(opcion.valor)}
          className="filter-chip"
        >
          {opcion.texto}
          <span className="filter-count">{conteos[opcion.valor]}</span>
        </Button>
      ))}
    </div>
  );
}

export default FiltrosSolicitudes;