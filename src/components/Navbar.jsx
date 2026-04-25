import { Link, useLocation } from 'react-router-dom';
import { Compass, User, Map as MapIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user } = useAuth();
  const location = useLocation();

  if (location.pathname === '/') {
    return null;
  }

  return (
    <nav className="navbar glass-panel" style={{ margin: '16px', borderRadius: '16px' }}>
      <div className="nav-left">
        <Link to="/map" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
          <img src="/assets/peak_logo.png" alt="PeakPursuit Logo" style={{ height: '40px', objectFit: 'contain' }} />
          <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--text-main)' }}>
            Peak<span className="text-gradient">Pursuit</span>
          </span>
        </Link>
      </div>

      {user && (
        <div className="nav-links">
          <Link to="/map" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <MapIcon size={18} /> Explore Map
          </Link>
          <Link to="#" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Compass size={18} /> Community
          </Link>
          <Link to="/profile" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <User size={18} /> Profile
          </Link>
        </div>
      )}
    </nav>
  );
}
