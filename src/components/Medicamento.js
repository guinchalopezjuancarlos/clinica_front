import React, { useState, useEffect } from "react";
import axios from "axios";


const Medicamento = () => {
  const [medicamentos, setMedicamentos] = useState([]);
  const [selectedMedicamentoId, setSelectedMedicamentoId] = useState(null);

  const fetchMedicamentos = () => {
    axios.get("http://localhost:8000/api/medicamentos/")
      .then((response) => setMedicamentos(response.data))
      .catch((error) => console.error("Error cargando medicamentos:", error));
  };

  useEffect(() => {
    fetchMedicamentos();
  }, []);

  return (
    <div>
      <h1>Lista de Medicamentos</h1>
      <MedicamentoForm
        medicamentoId={selectedMedicamentoId}
        onSave={fetchMedicamentos}
      />

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {medicamentos.map((medicamento) => (
            <tr key={medicamento.id}>
              <td>{medicamento.id}</td>
              <td>{medicamento.nombre}</td>
              <td>{medicamento.descripcion}</td>
              <td>{medicamento.cantidad_disponible}</td>
              <td>${medicamento.precio}</td>
              <td>
                <button onClick={() => setSelectedMedicamentoId(medicamento.id)}>
                  Editar
                </button>
                <MedicamentoDelete
                  medicamentoId={medicamento.id}
                  onDelete={fetchMedicamentos}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Medicamento;
