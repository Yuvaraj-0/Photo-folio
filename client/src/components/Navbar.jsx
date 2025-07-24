import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/authSlice';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isAuthenticated } = useSelector(state => state.auth);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    dispatch(logout());
    setMenuOpen(false);
    navigate('/');
  };

  return (
    <>
      <nav
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0.5rem 2rem', // Reduced vertical padding
          backgroundColor: 'transparent',
          position: 'fixed',
          width: '100%',
          top: 0,
          left: 0,
          zIndex: 100,
          boxSizing: 'border-box',
        }}
      >
        {/* Logo */}
        <div style={{ lineHeight: 0, cursor: 'pointer' }}>
          <Link to="/">
            <img src={logo} alt="Company Logo" style={{ height: '60px', width: 'auto' }} />
          </Link>
        </div>

        {/* Desktop Links */}
        {!isMobile && (
          <div style={{ display: 'flex', gap: '1.5rem', fontWeight: 500, alignItems: 'center' }}>
            <Link to="/portfolio" style={{ textDecoration: 'none', color: '#5D3A00' }}>
              Portfolio
            </Link>
            <Link to="/contact" style={{ textDecoration: 'none', color: '#5D3A00' }}>
              Contact
            </Link>

            {isAuthenticated && (
              <button
                onClick={handleLogout}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#B9975B', fontWeight: '600' }}
              >
                Logout
              </button>
            )}
          </div>
        )}

        {/* Mobile Menu Toggle */}
        {isMobile && (
          <div style={{ display: 'flex', alignItems: 'center',gap: '1rem'  }}>
            <button
  onClick={() => setMenuOpen(!menuOpen)}
  style={{
    background: 'none',
    border: 'none',  
    outline: 'none',      // ✅ This removes the border
    fontSize: '1.5rem',
    cursor: 'pointer',
    color: '#B9975B',
  }}
  aria-label="Toggle menu"
>
  &#9776;
</button>

          </div>
        )}
      </nav>

      {/* Mobile Dropdown */}
      {menuOpen && isMobile && (
  <div
    style={{
      position: 'fixed',
      top: '60px',
      right: 0,
      backgroundColor: 'white',
      width: '160px',
      padding: '1rem',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      zIndex: 99,
    }}
  >
   <Link
  to="/portfolio"
  onClick={() => setMenuOpen(false)}
  style={{ 
    textDecoration: 'none', 
    color: '#5D3A00', // royal brown
    fontWeight: '600',
    fontSize: '1.1rem',
    fontFamily: 'Georgia, serif'
  }}
>
  Portfolio
</Link>
<Link
  to="/contact"
  onClick={() => setMenuOpen(false)}
  style={{ 
    textDecoration: 'none', 
    color: '#5D3A00', // royal brown
    fontWeight: '600',
    fontSize: '1.1rem',
    fontFamily: 'Georgia, serif'
  }}
>
  Contact
</Link>


    {/* ✅ Only show Logout if authenticated */}
    {isAuthenticated && (
      <button
        onClick={handleLogout}
        style={{ textDecoration: 'none', color: 'red', fontWeight: '600' }}
      >
        Logout
      </button>
    )}
  </div>
)}

    </>
  );
}
