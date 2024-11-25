import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Menu from './components/Menu';
import Paciente from './components/Paciente'; // Asegúrate de tener este componente
import Seguro from './components/Seguro';
import Atencion from './components/Atencion'; // Puedes agregar más componentes aquí
import Cita from './components/Cita'; // Agrega otros componentes según sea necesario

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Al cargar la aplicación, verificamos si hay un token almacenado
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // Función para manejar el login
  const handleLogin = (token) => {
    localStorage.setItem('token', token); // Guardamos el token
    setIsLoggedIn(true); // Cambiamos el estado de autenticación
  };

  // Función para manejar el logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Eliminamos el token
    setIsLoggedIn(false); // Cambiamos el estado de autenticación
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Ruta para login */}
          <Route
            path="/login"
            element={!isLoggedIn ? <Login onLogin={handleLogin} /> : <Navigate to="/dashboard" />}
          />

          {/* Ruta protegida para el dashboard/menu */}
          <Route
            path="/dashboard"
            element={isLoggedIn ? <Menu onLogout={handleLogout} /> : <Navigate to="/login" />}
          />
          
          {/* Ruta para el componente Paciente */}
          <Route
            path="/pacientes"
            element={isLoggedIn ? <Paciente /> : <Navigate to="/login" />}
          />

          {/* Ruta para el componente Seguro */}
          <Route
            path="/seguros"
            element={isLoggedIn ? <Seguro /> : <Navigate to="/login" />}
          />

          {/* Agrega más rutas para otros componentes */}
          <Route
            path="/atencion"
            element={isLoggedIn ? <Atencion /> : <Navigate to="/login" />}
          />
          <Route
            path="/cita"
            element={isLoggedIn ? <Cita /> : <Navigate to="/login" />}
          />
          {/* Redirige a la página de login si el usuario accede a una ruta no definida */}
          <Route path="*" element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;










