import React, { useState, useEffect } from "react";
import axios from "axios";


const AtencionList = () => {
  const [atenciones, setAtenciones] = useState([]);
  const [selectedAtencionId, setSelectedAtencionId] = useState(null);

  const fetchAtenciones = () => {
    axios.get("http://localhost:8000/api/atenciones/")
      .then((response) => setAtenciones(response.data))
      .catch((error) => console.error("Error cargando atenciones:", error));
  };

  useEffect(() => {
    fetchAtenciones();
  }, []);

  return (
    <div>
      <h1>Lista de Atenciones</h1>
      <AtencionForm atencionId={selectedAtencionId} onSave={fetchAtenciones} />

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Paciente</th>
            <th>Doctor</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {atenciones.map((atencion) => (
            <tr key={atencion.id}>
              <td>{atencion.id}</td>
              <td>{atencion.paciente_nombre}</td>
              <td>{atencion.doctor_nombre}</td>
              <td>{new Date(atencion.fecha).toLocaleString()}</td>
              <td>
                <button onClick={() => setSelectedAtencionId(atencion.id)}>
                  Editar
                </button>
                <AtencionDelete atencionId={atencion.id} onDelete={fetchAtenciones} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AtencionList;
