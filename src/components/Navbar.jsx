import React, { useState, useEffect } from 'react';
import { Terminal, Code2, Moon, Sun, Menu, X, CheckCircle2, ChevronRight, Download, Mail } from 'lucide-react';

export default function Navbar({ onOpenTerminal, isLightTheme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'API Tester', href: '#api-tester' },
    { name: 'Architecture', href: '#architecture' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'all 0.3s ease',
        background: scrolled ? 'var(--bg-card-glass)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border-color)' : '1px solid transparent',
        boxShadow: scrolled ? 'var(--shadow-md)' : 'none',
        padding: scrolled ? '0.75rem 0' : '1.25rem 0',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Brand Logo */}
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none' }}>
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, var(--laravel-red), #FF7A00)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              boxShadow: '0 4px 12px var(--laravel-glow)',
            }}
          >
            <Code2 size={22} />
          </div>
          <div>
            <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-heading)', letterSpacing: '-0.02em' }}>
              Pooja<span style={{ color: 'var(--laravel-red)' }}>.php</span>
            </span>
            <span
              className="mono"
              style={{
                display: 'block',
                fontSize: '0.68rem',
                color: 'var(--text-muted)',
                letterSpacing: '0.05em',
                marginTop: '-2px',
              }}
            >
              Laravel Specialist
            </span>
          </div>
        </a>

        {/* Status Badge */}
        <div
          className="pill pill-status"
          style={{ display: 'none', gap: '0.4rem', '@media (min-width: 992px)': { display: 'flex' } }}
        >
          <span className="status-dot"></span>
          <span style={{ fontSize: '0.8rem' }}>Available for Hire / Contracts</span>
        </div>

        {/* Desktop Navigation Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '1.8rem' }} className="desktop-nav">
          <ul style={{ display: 'flex', listStyle: 'none', gap: '1.5rem', margin: 0, padding: 0 }}>
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  style={{
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    color: 'var(--text-muted)',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--laravel-red)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {/* Terminal Trigger Button */}
            <button
              onClick={onOpenTerminal}
              className="btn btn-secondary btn-sm mono"
              title="Open Interactive Artisan Terminal"
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
            >
              <Terminal size={15} style={{ color: 'var(--laravel-red)' }} />
              <span>Artisan CLI</span>
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="btn btn-secondary btn-sm"
              title="Toggle Light/Dark Theme"
              style={{ padding: '0.5rem', borderRadius: '50%' }}
            >
              {isLightTheme ? <Moon size={17} /> : <Sun size={17} style={{ color: '#F59E0B' }} />}
            </button>

            {/* CTA Contact Button */}
            <a href="#contact" className="btn btn-primary btn-sm">
              <Mail size={15} />
              <span>Hire Me</span>
            </a>
          </div>
        </nav>

        {/* Mobile Hamburger Toggle */}
        <button
          className="mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            display: 'none',
            color: 'var(--text-heading)',
            padding: '0.5rem',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
          }}
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'var(--bg-card)',
            borderBottom: '1px solid var(--border-color)',
            padding: '1.5rem',
            boxShadow: 'var(--shadow-lg)',
          }}
        >
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: 'var(--text-main)',
                    display: 'block',
                  }}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTerminal();
              }}
              className="btn btn-secondary mono"
              style={{ width: '100%' }}
            >
              <Terminal size={16} style={{ color: 'var(--laravel-red)' }} />
              <span>Artisan CLI Emulator</span>
            </button>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="btn btn-primary" style={{ width: '100%' }}>
              <Mail size={16} />
              <span>Hire Me</span>
            </a>
          </div>
        </div>
      )}

      {/* Responsive Inline CSS overrides */}
      <style>{`
        @media (max-width: 992px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
