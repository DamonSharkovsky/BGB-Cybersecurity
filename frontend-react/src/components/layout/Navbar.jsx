import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'

const Navbar = () => {
  const { user, logout } = useAuth()

  return (
    <header className="header">
      <div className="nav-container">
        <Link to="/" className="logo" style={{ textDecoration: 'none', color: 'inherit' }}>
          <span className="shield-icon">🛡️</span>
          SafeGuard Community
        </Link>
        <nav className="nav-links">
          <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Home
          </NavLink>
          <NavLink
            to="/tools/scanner"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            Scanner
          </NavLink>
          <a href="#" className="nav-link">
            Resources
          </a>
          <a href="#" className="nav-link">
            About
          </a>

          {user ? (
            <>
              <span className="nav-link" style={{ color: '#fff', fontWeight: 'bold' }}>
                Hi, {user.name}
              </span>
              <button
                onClick={logout}
                className="nav-link nav-btn"
                style={{ background: 'transparent', border: '1px solid #fff', cursor: 'pointer' }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link nav-btn">
                Login
              </Link>
              <Link to="/register" className="nav-link nav-btn">
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar
