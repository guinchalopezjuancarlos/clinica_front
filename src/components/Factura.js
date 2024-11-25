import React, { useState, useEffect } from "react";
import axios from "axios";


const Factura = () => {
  const [facturas, setFacturas] = useState([]);
  const [selectedFacturaId, setSelectedFacturaId] = useState(null);

  const fetchFacturas = () => {
    axios.get("http://localhost:8000/api/facturas/")
      .then((response) => setFacturas(response.data))
      .catch((error) => console.error("Error cargando facturas:", error));
  };

  useEffect(() => {
    fetchFacturas();
  }, []);

  return (
    <div>
      <h1>Lista de Facturas</h1>
      <FacturaForm
        facturaId={selectedFacturaId}
        onSave={fetchFacturas}
      />

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Atención</th>
            <th>Monto Total</th>
            <th>Fecha</th>
            <th>Estado de Pago</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {facturas.map((factura) => (
            <tr key={factura.id}>
              <td>{factura.id}</td>
              <td>{factura.atencion}</td>
              <td>${factura.monto_total}</td>
              <td>{factura.fecha}</td>
              <td>{factura.estado_pago}</td>
              <td>
                <button onClick={() => setSelectedFacturaId(factura.id)}>
                  Editar
                </button>
                <FacturaDelete
                  facturaId={factura.id}
                  onDelete={fetchFacturas}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Factura;
