import React from 'react';
import { Code2, Heart, Terminal, ArrowUp } from 'lucide-react';

export default function Footer({ onOpenTerminal }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        background: 'var(--bg-card)',
        borderTop: '1px solid var(--border-color)',
        padding: '3.5rem 0 2rem 0',
        position: 'relative',
      }}
    >
      <div className="container">
        
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '2rem',
            paddingBottom: '2.5rem',
            borderBottom: '1px solid var(--border-color)',
          }}
        >
          {/* Left Brand info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, var(--laravel-red), #FF7A00)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                }}
              >
                <Code2 size={18} />
              </div>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-heading)' }}>
                Pooja<span style={{ color: 'var(--laravel-red)' }}>.php</span>
              </span>
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', maxWidth: '400px' }}>
              Senior PHP & Laravel Full Stack Engineer crafting high-concurrency microservices, clean Eloquent schemas, and reactive web applications.
            </p>
          </div>

          {/* Quick Links */}
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <button
              onClick={onOpenTerminal}
              className="btn btn-secondary btn-sm mono"
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
            >
              <Terminal size={14} style={{ color: 'var(--laravel-red)' }} />
              <span>php artisan serve</span>
            </button>

            <button
              onClick={scrollToTop}
              className="btn btn-secondary btn-sm"
              style={{ padding: '0.5rem 0.8rem' }}
              title="Scroll to Top"
            >
              <ArrowUp size={16} />
              <span>Back to Top</span>
            </button>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
            marginTop: '2rem',
            fontSize: '0.85rem',
            color: 'var(--text-muted)',
          }}
          className="mono"
        >
          <div>
            © 2026 Pooja. All rights reserved. Crafted with PHP & Laravel passion.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>Powered by React 18, Vite & Laravel Design System</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
