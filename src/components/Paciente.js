import { useState, useEffect } from 'react'
import axios from 'axios'
import './Paciente.css'

const PACIENTE_INICIAL = {
  nombre: '',
  fecha_nacimiento: '',
  sexo: 'M',
  telefono: '',
  email: '',
  direccion: '',
  historial_medico: '',
  seguro: null
}

const API_URL = 'http://localhost:8000/api/pacientes'

export default function Paciente() {
  const [pacientes, setPacientes] = useState([])
  const [editMode, setEditMode] = useState(false)
  const [editPacienteId, setEditPacienteId] = useState(null)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState(PACIENTE_INICIAL)

  // Función para obtener todos los pacientes
  const getPacientes = async () => {
    try {
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`
        }
      })
      setPacientes(response.data)
    } catch (error) {
      setError(
        error.response?.data?.message || 'Error al obtener los pacientes'
      )
    }
  }

  // Nuevo manejador para los cambios en el formulario
  const handleInputChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Función mejorada para manejar el envío del formulario
  const handleSubmit = async e => {
    e.preventDefault()

    if (
      (!formData.nombre ||
        !formData.fecha_nacimiento ||
        !formData.direccion ||
        !formData.sexo ||
        !formData.telefono,
      !formData.historial_medico || !formData.seguro)
    ) {
      setError('Por favor, complete todos los campos')
      return
    }

    try {
      if (editMode) {
        const response = await axios.put(
          `${API_URL}/${editPacienteId}`,
          formData,
          {
            headers: {
              Authorization: `Token ${localStorage.getItem('token')}`
            }
          }
        )
        setPacientes(prev =>
          prev.map(paciente =>
            paciente.id === editPacienteId ? response.data : paciente
          )
        )
        setEditMode(false)
        setEditPacienteId(null)
      } else {
        const response = await axios.post(API_URL, formData, {
          headers: {
            Authorization: `Token ${localStorage.getItem('token')}`
          }
        })
        setPacientes(prev => [...prev, response.data])
      }
      // Limpiar el formulario después de enviar
      setFormData(PACIENTE_INICIAL)
      setError('')
    } catch (error) {
      setError(
        error.response?.data?.message ||
          `Error al ${editMode ? 'actualizar' : 'agregar'} el paciente`
      )
    }
  }

  // Función mejorada para habilitar la edición
  const handleEditClick = paciente => {
    setEditMode(true)
    setEditPacienteId(paciente.id)
    setFormData({
      nombre: paciente.nombre,
      fechaNacimiento: paciente.fechaNacimiento,
      direccion: paciente.direccion,
      sexo: paciente.sexo,
      telefono: paciente.telefono
    })
  }

  const handleDeletePaciente = async id => {
    if (!window.confirm('¿Está seguro que desea eliminar este paciente?')) {
      return
    }

    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`
        }
      })

      // Actualizar el estado eliminando el paciente
      setPacientes(prevPacientes =>
        prevPacientes.filter(paciente => paciente.id !== id)
      )
    } catch (error) {
      setError(error.response?.data?.message || 'Error al eliminar el paciente')
    }
  }

  useEffect(() => {
    getPacientes()
  }, [])

  const calcularEdad = edad => {
    return new Date().getFullYear() - parseInt(edad)
  }

  return (
    <div className="paciente-container">
      <h2>Pacientes</h2>
      {error && <div className="error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="nombre">Nombre</label>
          <input
            id="nombre"
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-group">
          <label htmlFor="fecha_nacimiento">Fecha de nacimiento</label>
          <input
            id="fecha_nacimiento"
            name="fecha_nacimiento"
            type="date"
            value={formData.fecha_nacimiento}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-group">
          <label htmlFor="sexo">Sexo</label>
          <select
            id="sexo"
            name="sexo"
            value={formData.sexo}
            onChange={handleInputChange}
          >
            <option value="M">Masculino</option>
            <option value="F">Femenino</option>
          </select>
        </div>
        <div className="input-group">
          <label htmlFor="telefono">Teléfono</label>
          <input
            id="telefono"
            type="number"
            name="telefono"
            value={formData.telefono}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-group">
          <label htmlFor="email">Correo</label>
          <input
            id="email"
            type="text"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-group">
          <label htmlFor="direccion">Dirección</label>
          <input
            id="direccion"
            type="text"
            name="direccion"
            value={formData.direccion}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-group">
          <label htmlFor="historial_medico">Historial Médico</label>
          <input
            id="historial_medico"
            type="text"
            name="historial_medico"
            value={formData.historial_medico}
            onChange={handleInputChange}
          />
        </div>
        {/* <div className="input-group">
          <label htmlFor="seguro">Seguro</label>
          <select
            id="seguro"
            name="seguro"
            value={formData.seguro}
            onChange={handleInputChange}
          >
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
        </div> */}
        <button type="submit">
          {editMode ? 'Actualizar' : 'Agregar'} Paciente
        </button>
      </form>

      {/* Lista de pacientes */}
      <ul className="paciente-list">
        {pacientes.map(paciente => (
          <li key={paciente.id}>
            {paciente.nombre} - {calcularEdad(paciente.fechaNacimiento)} años -{' '}
            {paciente.direccion}
            <pre>{JSON.stringify(paciente, null, 2)}</pre>
            <button onClick={() => handleEditClick(paciente)}>Editar</button>
            <button onClick={() => handleDeletePaciente(paciente.id)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
