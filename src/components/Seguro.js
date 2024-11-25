import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Seguro.css';

const Seguro = () => {
  const [seguros, setSeguros] = useState([]);
  const [newSeguro, setNewSeguro] = useState({ nombre: '', tipo_plan: '', cobertura: '' });
  const [editingSeguro, setEditingSeguro] = useState(null);

  useEffect(() => {
    fetchSeguros();
  }, []);

  const fetchSeguros = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/seguros/');
      setSeguros(response.data);
      console.log(response.data); // Verifica si los datos se están obteniendo correctamente
    } catch (error) {
      console.error('Error al obtener los seguros', error);
    }
  };

  const createSeguro = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/seguros/', newSeguro);
      setSeguros([...seguros, response.data]);
      setNewSeguro({ nombre: '', tipo_plan: '', cobertura: '' }); // Limpiar el formulario
    } catch (error) {
      console.error('Error al crear el seguro', error);
    }
  };

  const updateSeguro = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8000/api/seguros/${editingSeguro.id}/`, editingSeguro);
      const updatedSeguros = seguros.map(seguro =>
        seguro.id === editingSeguro.id ? response.data : seguro
      );
      setSeguros(updatedSeguros);
      setEditingSeguro(null); // Salir del modo de edición
    } catch (error) {
      console.error('Error al actualizar el seguro', error);
    }
  };

  const deleteSeguro = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/seguros/${id}/`);
      setSeguros(seguros.filter(seguro => seguro.id !== id));
    } catch (error) {
      console.error('Error al eliminar el seguro', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingSeguro) {
      setEditingSeguro(prevState => ({ ...prevState, [name]: value }));
    } else {
      setNewSeguro(prevState => ({ ...prevState, [name]: value }));
    }
  };

  return (
    <div className="seguro-container">
      <h2>Lista de Seguros</h2>
      
      <form onSubmit={editingSeguro ? updateSeguro : createSeguro}>
        <input
          type="text"
          name="nombre"
          value={editingSeguro ? editingSeguro.nombre : newSeguro.nombre}
          onChange={handleInputChange}
          placeholder="Nombre"
          required
        />
        <input
          type="text"
          name="tipo_plan"
          value={editingSeguro ? editingSeguro.tipo_plan : newSeguro.tipo_plan}
          onChange={handleInputChange}
          placeholder="Tipo de Plan"
        />
        <textarea
          name="cobertura"
          value={editingSeguro ? editingSeguro.cobertura : newSeguro.cobertura}
          onChange={handleInputChange}
          placeholder="Cobertura"
        />
        <button type="submit">{editingSeguro ? 'Actualizar Seguro' : 'Crear Seguro'}</button>
      </form>

      <h3>Seguros Disponibles</h3>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Tipo de Plan</th>
            <th>Cobertura</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {seguros.map(seguro => (
            <tr key={seguro.id}>
              <td>{seguro.nombre}</td>
              <td>{seguro.tipo_plan}</td>
              <td>{seguro.cobertura}</td>
              <td>
                <button onClick={() => setEditingSeguro(seguro)}>Editar</button>
                <button onClick={() => deleteSeguro(seguro.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
const token = localStorage.getItem('token');
console.log('Token:', token); // Esto te permitirá ver si el token está presente

if (!token) {
  console.error('No token found. Please login first.');
}
export default Seguro;

