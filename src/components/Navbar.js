import './Navbar.css';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="brand">
        <img src="./img/logo.png" alt="DD.CFF Logo" className="logo-img" />
        DD.CFF
      </div>
      <div className="navbar-actions">
        <Link to="/" className="button">
          <Icon icon="lucide:book-open" style={{fontSize: '18px', color: 'currentColor'}} />
          CFF Docs
        </Link>
        <Link to="/cheat-docs" className="button">
          <Icon icon="lucide:book-open" style={{fontSize: '18px', color: 'currentColor'}} />
          Cheat Docs
        </Link>
        <Link to="https://github.com/gc-cff/" className="button" target="_blank" rel="noopener noreferrer">
          <Icon icon="lucide:github" style={{fontSize: '18px', color: 'currentColor'}} />
          GitHub
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;