import { useState } from 'react';
import PropTypes from 'prop-types';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Para la redirección

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);  // Para mostrar/ocultar formulario de 'Olvidé mi contraseña'
  const [showCreateAccount, setShowCreateAccount] = useState(false);  // Para mostrar/ocultar formulario de 'Crear cuenta'
  
  const navigate = useNavigate(); // Hook para redirección

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:8000/api/token/', {
        username,
        password,
      });

      localStorage.setItem('token', data.access);
      onLogin(data.access); // Llamamos a la función onLogin con el token
      navigate('/dashboard'); // Redirigimos al dashboard después de iniciar sesión
    } catch (err) {
      setError('Credenciales incorrectas');
    }
  };

  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes hacer una solicitud para resetear la contraseña (por ejemplo, enviar un correo)
    alert('Formulario para restablecer la contraseña enviado');
    setShowForgotPassword(false); // Cerrar el formulario de olvido de contraseña
  };

  const handleCreateAccountSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes hacer una solicitud para crear una nueva cuenta
    alert('Formulario de creación de cuenta enviado');
    setShowCreateAccount(false); // Cerrar el formulario de creación de cuenta
  };

  return (
    <div className="login-container">
      <h2>CLINICA MESOCRUZ</h2>
      <h3>LOGIN</h3>
      {error && <div className="error">{error}</div>}

      {/* Formulario de login */}
      {!showForgotPassword && !showCreateAccount && (
        <form onSubmit={handleLoginSubmit}>
          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      )}

      {/* Formulario para "Olvidé mi contraseña" */}
      {showForgotPassword && (
        <form onSubmit={handleForgotPasswordSubmit}>
          <div className="input-group">
            <label>Ingrese su correo electrónico para restablecer la contraseña</label>
            <input
              type="email"
              placeholder="Correo electrónico"
              required
            />
          </div>
          <button type="submit">Enviar enlace de restablecimiento</button>
          <button type="button" onClick={() => setShowForgotPassword(false)}>
            Volver al login
          </button>
        </form>
      )}

      {/* Formulario para "Crear una cuenta" */}
      {showCreateAccount && (
        <form onSubmit={handleCreateAccountSubmit}>
          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="Ingrese un nombre de usuario"
              required
            />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Ingrese un correo electrónico"
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Ingrese una contraseña"
              required
            />
          </div>
          <button type="submit">Crear Cuenta</button>
          <button type="button" onClick={() => setShowCreateAccount(false)}>
            Volver al login
          </button>
        </form>
      )}

      {/* Enlaces para "Olvidé mi contraseña" y "Crear cuenta" */}
      {!showForgotPassword && !showCreateAccount && (
        <div className="links">
          <a href="#!" onClick={() => setShowForgotPassword(true)}>
            ¿Olvidaste tu contraseña?
          </a>
          <a href="#!" onClick={() => setShowCreateAccount(true)}>
            Crear cuenta
          </a>
        </div>
      )}
    </div>
  );
};

Login.propTypes = {
  onLogin: PropTypes.func.isRequired, // Validamos que onLogin sea una función obligatoria
};

export default Login;






