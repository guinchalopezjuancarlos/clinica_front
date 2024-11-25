import React, { useState, useEffect } from "react";
import axios from "axios";


const Especialidad = () => {
  const [especialidades, setEspecialidades] = useState([]);
  const [selectedEspecialidadId, setSelectedEspecialidadId] = useState(null);

  const fetchEspecialidades = () => {
    axios.get("http://localhost:8000/api/especialidades/")
      .then((response) => setEspecialidades(response.data))
      .catch((error) => console.error("Error cargando especialidades:", error));
  };

  useEffect(() => {
    fetchEspecialidades();
  }, []);

  return (
    <div>
      <h1>Lista de Especialidades</h1>
      <EspecialidadForm
        especialidadId={selectedEspecialidadId}
        onSave={fetchEspecialidades}
      />

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {especialidades.map((especialidad) => (
            <tr key={especialidad.id}>
              <td>{especialidad.id}</td>
              <td>{especialidad.nombre}</td>
              <td>
                <button onClick={() => setSelectedEspecialidadId(especialidad.id)}>
                  Editar
                </button>
                <EspecialidadDelete
                  especialidadId={especialidad.id}
                  onDelete={fetchEspecialidades}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Especialidad;
