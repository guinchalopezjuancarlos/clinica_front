import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:8000/api/token/', {
        username: username,  // Asegúrate de que el nombre de usuario sea correcto
        password: password,  // Y que la contraseña también lo sea
      });
  
      // Guarda el token en localStorage
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
  
      // Llama la función onLogin con el token recibido
      onLogin(response.data.access);
    } catch (err) {
      console.error(err); // Agregar para ver detalles del error
      setError('Credenciales incorrectas');
    }
    axios.get('http://localhost:8000/api/pacientes/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      })
      .then((response) => console.log('Pacientes:', response.data))
      .catch((error) => console.error('Error al obtener pacientes:', error));
      
  };
  axios.post('http://localhost:8000/api/token/refresh/', {
    refresh: localStorage.getItem('refresh_token'),
  })
  .then((response) => {
    localStorage.setItem('access_token', response.data.access); // Guarda el nuevo token de acceso
  })
  .catch((error) => console.error('Error al refrescar el token:', error));
  
  
export default axiosInstance;
