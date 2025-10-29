import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from './../../contexts/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      navigate('/login', { replace: true });
    } catch {
      // optional: toast or inline error
    }
  }

  return (
    <nav className='navbar' role='navigation' aria-label='Global'>
      <div className='navbar__inner'>
        {/* Brand — left */}
        <Link
          to={user ? '/dashboard' : '/'}
          className='navbar__brand'
          aria-label='CiC-CMS Home'
        >
          CiC-CMS
        </Link>

        {/* Right cluster (links + auth) */}
        <div className='navbar__right'>
          {/* Protected links — only render when signed in */}
          {user && (
            <div className='navbar__links' aria-label='Primary'>
              <NavLink to='/dashboard' end className='navbar__link'>
                Dashboard
              </NavLink>
              <NavLink to='/hives' className='navbar__link'>
                Hives
              </NavLink>
            </div>
          )}

          {/* Auth controls */}
          <div className='navbar__auth'>
            {user ? (
              <>
                <span className='navbar__user' title={user.email || ''}>
                  {user.email}
                </span>
                <button className='btn btn--sm' onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to='/login' className='btn-link'>
                  Log in
                </NavLink>
                <NavLink to='/signup' className='btn btn--sm'>
                  Sign up
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
