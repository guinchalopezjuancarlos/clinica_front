import React, { useState, useEffect } from "react";
import axios from "axios";


const Doctor= () => {
  const [doctores, setDoctores] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);

  const fetchDoctores = () => {
    axios.get("http://localhost:8000/api/doctores/")
      .then((response) => setDoctores(response.data))
      .catch((error) => console.error("Error cargando doctores:", error));
  };

  useEffect(() => {
    fetchDoctores();
  }, []);

  return (
    <div>
      <h1>Lista de Doctores</h1>
      <DoctorForm doctorId={selectedDoctorId} onSave={fetchDoctores} />

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Especialidad</th>
            <th>Teléfono</th>
            <th>Email</th>
            <th>Horario</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {doctores.map((doctor) => (
            <tr key={doctor.id}>
              <td>{doctor.id}</td>
              <td>{doctor.nombre}</td>
              <td>{doctor.especialidad_nombre}</td>
              <td>{doctor.telefono}</td>
              <td>{doctor.email}</td>
              <td>{doctor.horario}</td>
              <td>
                <button onClick={() => setSelectedDoctorId(doctor.id)}>
                  Editar
                </button>
                <DoctorDelete doctorId={doctor.id} onDelete={fetchDoctores} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Doctor;

