import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';

const Pago = () => {
  const [pagos, setPagos] = useState([]);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ id: '', factura: '', monto: '', fecha_pago: '', metodo_pago: '' });
  const [facturas, setFacturas] = useState([]); // To fetch and show available facturas

  useEffect(() => {
    // Fetch pagos from the backend (API endpoint)
    fetch('/api/pagos/')
      .then((response) => response.json())
      .then((data) => setPagos(data));

    // Fetch facturas to show in the form
    fetch('/api/facturas/')
      .then((response) => response.json())
      .then((data) => setFacturas(data));
  }, []);

  const toggleModal = () => setModal(!modal);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const insertPago = () => {
    fetch('/api/pagos/', {
      method: 'POST',
      body: JSON.stringify(form),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then((data) => {
        setPagos([...pagos, data]);
        toggleModal();
      });
  };

  const editPago = (pago) => {
    setForm(pago);
    toggleModal();
  };

  const deletePago = (id) => {
    if (window.confirm('¿Estás seguro de eliminar este pago?')) {
      fetch(`/api/pagos/${id}/`, { method: 'DELETE' })
        .then(() => {
          setPagos(pagos.filter((pago) => pago.id !== id));
        });
    }
  };

  return (
    <div>
      <Button color="success" onClick={toggleModal}>Agregar Pago</Button>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Factura</th>
            <th>Monto</th>
            <th>Fecha de Pago</th>
            <th>Metodo de Pago</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pagos.map((pago) => (
            <tr key={pago.id}>
              <td>{pago.id}</td>
              <td>{pago.factura}</td>
              <td>${pago.monto}</td>
              <td>{pago.fecha_pago}</td>
              <td>{pago.metodo_pago}</td>
              <td>
                <Button color="primary" onClick={() => editPago(pago)}>Editar</Button>{' '}
                <Button color="danger" onClick={() => deletePago(pago.id)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Formulario de Pago</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="id">ID</Label>
            <Input
              id="id"
              name="id"
              readOnly
              type="text"
              value={form.id || ''}
            />
          </FormGroup>
          <FormGroup>
            <Label for="factura">Factura</Label>
            <Input
              id="factura"
              name="factura"
              type="select"
              value={form.factura || ''}
              onChange={handleChange}
            >
              <option value="">Seleccionar Factura</option>
              {facturas.map((factura) => (
                <option key={factura.id} value={factura.id}>
                  Factura #{factura.id} - ${factura.monto_total}
                </option>
              ))}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="monto">Monto</Label>
            <Input
              id="monto"
              name="monto"
              type="number"
              value={form.monto || ''}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="fecha_pago">Fecha de Pago</Label>
            <Input
              id="fecha_pago"
              name="fecha_pago"
              type="date"
              value={form.fecha_pago || ''}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="metodo_pago">Método de Pago</Label>
            <Input
              id="metodo_pago"
              name="metodo_pago"
              type="select"
              value={form.metodo_pago || ''}
              onChange={handleChange}
            >
              <option value="">Seleccionar Metodo de Pago</option>
              <option value="tarjeta">Tarjeta</option>
              <option value="efectivo">Efectivo</option>
              <option value="transferencia">Transferencia</option>
            </Input>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={insertPago}>Guardar</Button>
          <Button color="secondary" onClick={toggleModal}>Cancelar</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Pago;



