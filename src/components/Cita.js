import React, { useState, useEffect } from "react";
import axios from "axios";


const Cita= () => {
  const [citas, setCitas] = useState([]);
  const [selectedCitaId, setSelectedCitaId] = useState(null);

  const fetchCitas = () => {
    axios.get("http://localhost:8000/api/citas/")
      .then((response) => setCitas(response.data))
      .catch((error) => console.error("Error cargando citas:", error));
  };

  useEffect(() => {
    fetchCitas();
  }, []);

  return (
    <div>
      <h1>Lista de Citas</h1>
      <CitaForm citaId={selectedCitaId} onSave={fetchCitas} />

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Paciente</th>
            <th>Doctor</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {citas.map((cita) => (
            <tr key={cita.id}>
              <td>{cita.id}</td>
              <td>{cita.paciente_nombre}</td>
              <td>{cita.doctor_nombre}</td>
              <td>{new Date(cita.fecha).toLocaleString()}</td>
              <td>{cita.estado}</td>
              <td>
                <button onClick={() => setSelectedCitaId(cita.id)}>
                  Editar
                </button>
                <CitaDelete citaId={cita.id} onDelete={fetchCitas} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Cita;
