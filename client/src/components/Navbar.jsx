import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 2rem',
        backgroundColor: 'transparent',
        position: 'fixed',
        width: '100%',
        top: 0,
        left: 0,
        zIndex: 100,
        boxSizing: 'border-box',
      }}>
        {/* Logo */}
        <div style={{ fontWeight: 'bold', fontSize: '1.5rem', cursor: 'pointer' }}>
          Logo
        </div>

        {/* Desktop Links */}
        {!isMobile && (
          <div style={{ display: 'flex', gap: '1.5rem', fontWeight: 500 }}>
            <Link to="/portfolio" style={{ textDecoration: 'none', color: 'inherit' }}>Portfolio</Link>
            <Link to="/contact" style={{ textDecoration: 'none', color: 'inherit' }}>Contact</Link>
            <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>Login</Link>
          </div>
        )}

        {/* Mobile Right: Login + Menu */}
        {isMobile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Link to="/login" style={{ textDecoration: 'none', color: 'inherit', fontWeight: 500 }}>Login</Link>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '1.5rem',
                cursor: 'pointer',
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
        <div style={{
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
          zIndex: 99
        }}>
          <Link to="/portfolio" onClick={() => setMenuOpen(false)} style={{ textDecoration: 'none', color: 'black' }}>Portfolio</Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)} style={{ textDecoration: 'none', color: 'black' }}>Contact</Link>
        </div>
      )}
    </>
  );
}
