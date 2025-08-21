import './Navbar.css';
import { Icon } from '@iconify/react';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="brand">
        <img src="/img/logo.png" alt="DD.CFF Logo" className="logo-img" />
        DD.CFF
      </div>
      <div className="navbar-actions">
        <button className="button">
          <Icon icon="lucide:book-open" style={{fontSize: '18px', color: 'currentColor'}}></Icon>
          Docs
        </button>
        <button className="button">
          <Icon icon="lucide:github" style={{fontSize: '18px', color: 'currentColor'}}></Icon>
          GitHub
        </button>
      </div>
    </nav>
  );
}

export default Navbar;