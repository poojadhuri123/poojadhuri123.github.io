import React from 'react';
import { X, ExternalLink, Layers, Database, Cpu, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { GithubIcon } from './SocialIcons';

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content glow-box"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '850px',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            position: 'relative',
            height: '240px',
            backgroundImage: `url(${project.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, var(--bg-card) 0%, transparent 100%)',
            }}
          ></div>

          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              background: 'rgba(0, 0, 0, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#fff',
              padding: '0.4rem',
              borderRadius: '50%',
              cursor: 'pointer',
              backdropFilter: 'blur(8px)',
            }}
          >
            <X size={20} />
          </button>

          <div
            style={{
              position: 'absolute',
              bottom: '1.25rem',
              left: '1.5rem',
              right: '1.5rem',
            }}
          >
            <span className="mono" style={{ fontSize: '0.75rem', color: 'var(--laravel-red)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              {project.category}
            </span>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '2px', color: '#FFFFFF' }}>
              {project.title}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <p style={{ fontSize: '1.05rem', color: 'var(--text-main)', lineHeight: '1.6' }}>
            {project.longDescription || project.description}
          </p>

          {/* Key Architecture Highlights */}
          {project.highlights && (
            <div>
              <h4 style={{ fontSize: '1rem', marginBottom: '0.75rem', color: 'var(--text-heading)' }}>
                Key Technical Highlights & Achievements
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: 0 }}>
                {project.highlights.map((h, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    <CheckCircle2 size={16} style={{ color: 'var(--accent-emerald)', flexShrink: 0 }} />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Code & Schema Snippet if present */}
          {project.snippet && (
            <div>
              <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: 'var(--text-heading)' }}>
                Laravel Implementation Snippet
              </h4>
              <div style={{ background: 'var(--code-bg)', border: '1px solid var(--code-border)', borderRadius: '10px', padding: '1rem', overflowX: 'auto' }}>
                <pre className="mono" style={{ margin: 0, fontSize: '0.8rem', lineHeight: '1.6', color: '#E2E8F0' }}>
                  {project.snippet}
                </pre>
              </div>
            </div>
          )}

          {/* Tech Stack Pills */}
          <div>
            <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '0.5rem' }} className="mono">
              Technologies & Tools Used
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="mono"
                  style={{
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    padding: '0.3rem 0.65rem',
                    borderRadius: '6px',
                    background: 'var(--bg-main)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--laravel-red)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Footer Actions */}
          <div style={{ display: 'flex', gap: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem', marginTop: '0.5rem' }}>
            <a
              href={project.demoUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <ExternalLink size={16} />
              <span>Live Demonstration</span>
            </a>

            <a
              href={project.githubUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary mono"
            >
              <GithubIcon size={16} />
              <span>GitHub Repository</span>
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}
