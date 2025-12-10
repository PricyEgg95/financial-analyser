import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
  const location = useLocation();

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-brand">
          <Link to="/">💼 Portfolio Analyser</Link>
        </div>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link 
              to="/" 
              className={location.pathname === '/' ? 'nav-link active' : 'nav-link'}
            >
              Accueil
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/dashboard" 
              className={location.pathname === '/dashboard' ? 'nav-link active' : 'nav-link'}
            >
              Dashboard
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
