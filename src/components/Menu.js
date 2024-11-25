import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Menu.css';
import PropTypes from 'prop-types';

const Menu = ({ onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(true); // Estado para manejar el menú lateral
  const navigate = useNavigate(); // Hook para navegación

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Cambiar entre abierto/cerrado
  };

  const handleLogoutClick = () => {
    onLogout(); // Ejecutamos la función de logout cuando el usuario hace clic en logout
    navigate('/login'); // Redirigimos a la página de login
  };

  return (
    <div className="menu-container">
      <div className="logo">CLINICA PRIVADA MESOCRUZ</div>
      {/* Botones flotantes */}
      <div className="floating-buttons">
        {/* Botón de toggle para abrir/cerrar el menú */}
        <button className="menu-toggle-btn" onClick={toggleMenu}>
          ☰
        </button>
      </div>

      {/* Header */}
      <header className="header">
        <div className="logo">CLINICA PRIVADA MESOCRUZ</div>
        <div className="user-info">
          <button className="logout-btn" onClick={handleLogoutClick}>
            Logout
          </button>
        </div>
      </header>

      <div className="container">
        {/* Sidebar */}
        {menuOpen && (
          <aside className="sidebar">
            <button className="close-btn" onClick={toggleMenu}>
              ✖
            </button>
            <nav>
              <ul className="menu-items">
                <li><Link to="/atencion"><i className="fa fa-stethoscope"></i> Atención</Link></li>
                <li><Link to="/cita"><i className="fa fa-calendar"></i> Cita</Link></li>
                <li><Link to="/pacientes"><i className="fa fa-user"></i> Paciente</Link></li>
                <li><Link to="/seguros"><i className="fa fa-shield-alt"></i> Seguro</Link></li>
                {/* Agrega más elementos según sea necesario */}
              </ul>
            </nav>
          </aside>
        )}

        {/* Main Content */}
        <main className="main-content">
          <div className="grid">
            <div className="card">
              <h3>Bienvenido</h3>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

Menu.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

export default Menu;


















