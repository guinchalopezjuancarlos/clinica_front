import React, { useState, useEffect } from "react";
import axios from "axios";

const Receta = () => {
  const [recetas, setRecetas] = useState([]);
  const [selectedRecetaId, setSelectedRecetaId] = useState(null);

  const fetchRecetas = () => {
    axios.get("http://localhost:8000/api/recetas/")
      .then((response) => setRecetas(response.data))
      .catch((error) => console.error("Error cargando recetas:", error));
  };

  useEffect(() => {
    fetchRecetas();
  }, []);

  return (
    <div>
      <h1>Lista de Recetas</h1>
      <RecetaForm
        recetaId={selectedRecetaId}
        onSave={fetchRecetas}
      />

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Paciente</th>
            <th>Doctor</th>
            <th>Medicamento</th>
            <th>Dosis</th>
            <th>Fecha</th>
            <th>Indicaciones</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {recetas.map((receta) => (
            <tr key={receta.id}>
              <td>{receta.id}</td>
              <td>{receta.paciente}</td>
              <td>{receta.doctor}</td>
              <td>{receta.medicamento}</td>
              <td>{receta.dosis}</td>
              <td>{receta.fecha}</td>
              <td>{receta.indicaciones}</td>
              <td>
                <button onClick={() => setSelectedRecetaId(receta.id)}>
                  Editar
                </button>
                <RecetaDelete
                  recetaId={receta.id}
                  onDelete={fetchRecetas}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Receta;
