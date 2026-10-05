import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare, Terminal } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from './SocialIcons';

export default function ContactSection({ onShowToast }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Freelance / Contract Laravel Project',
    budget: '$3,000 - $10,000',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      onShowToast('🚀 Message Sent! Thanks for contacting Pooja. I will get back to you within 12 hours.');
      setFormData({
        name: '',
        email: '',
        subject: 'Freelance / Contract Laravel Project',
        budget: '$3,000 - $10,000',
        message: '',
      });
    }, 600);
  };

  return (
    <section id="contact" style={{ padding: '6.5rem 0', position: 'relative', background: 'var(--bg-main)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">&lt;GET_IN_TOUCH /&gt;</span>
          <h2>Let's Build Something <span className="gradient-text">Exceptional Together</span></h2>
          <p>
            Have a project in mind, need a Laravel performance audit, or looking to hire a Senior Full-Stack Engineer? Send me a message below!
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '3rem', alignItems: 'start' }} className="contact-grid">
          
          {/* Left Contact Info Column */}
          <div>
            <div className="glass-card glow-box" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--text-heading)' }}>
                Contact & Hire Information
              </h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '1.75rem' }}>
                I am currently open for full-time roles, freelance project consulting, and enterprise backend engineering contracts.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(255, 45, 32, 0.1)', color: 'var(--laravel-red)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Mail size={20} />
                  </div>
                  <div>
                    <div className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Direct Email</div>
                    <a href="mailto:pooja.laravel.dev@gmail.com" style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-heading)' }}>
                      pooja.laravel.dev@gmail.com
                    </a>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <MapPin size={20} />
                  </div>
                  <div>
                    <div className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Base Location</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-heading)' }}>
                      Mumbai, India (Remote Worldwide)
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media Links */}
              <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
                <div className="mono" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                  Connect on Social & Code Hubs:
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  {[
                    { name: 'GitHub', icon: GithubIcon, url: 'https://github.com/pooja-laravel' },
                    { name: 'LinkedIn', icon: LinkedinIcon, url: 'https://linkedin.com/in/pooja-laravel-dev' },
                    { name: 'Twitter', icon: TwitterIcon, url: 'https://twitter.com/pooja_laravel' },
                  ].map((s) => {
                    const Icon = s.icon;
                    return (
                      <a
                        key={s.name}
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '0.6rem 0.9rem', fontSize: '0.82rem' }}
                      >
                        <Icon size={16} />
                        <span>{s.name}</span>
                      </a>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Quick response commitment badge */}
            <div
              className="glass-card"
              style={{
                padding: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                background: 'rgba(16, 185, 129, 0.05)',
                borderColor: 'rgba(16, 185, 129, 0.2)',
              }}
            >
              <CheckCircle2 size={24} style={{ color: 'var(--accent-emerald)', flexShrink: 0 }} />
              <div style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>
                <strong>Guaranteed 12-Hour Response Time</strong> for project inquiries and recruiters.
              </div>
            </div>

          </div>

          {/* Right Contact Form Column */}
          <div className="glass-card glow-box" style={{ padding: '2.25rem' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="form-row">
                <div>
                  <label className="mono" style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Morgan"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '8px',
                      background: 'var(--bg-main)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-main)',
                      fontSize: '0.9rem',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label className="mono" style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@company.com"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '8px',
                      background: 'var(--bg-main)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-main)',
                      fontSize: '0.9rem',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              <div>
                <label className="mono" style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                  Subject / Requirement Type
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    background: 'var(--bg-main)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-main)',
                    fontSize: '0.9rem',
                    outline: 'none',
                  }}
                >
                  <option value="Freelance / Contract Laravel Project">Freelance / Contract Laravel Project</option>
                  <option value="Full-Time Senior PHP Engineer Role">Full-Time Senior PHP Engineer Role</option>
                  <option value="Laravel Database & Performance Audit">Laravel Database & Performance Audit</option>
                  <option value="Custom REST / GraphQL API Development">Custom REST / GraphQL API Development</option>
                </select>
              </div>

              <div>
                <label className="mono" style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                  Project Details / Message *
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your project, timeline, tech stack requirements, or team role..."
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    background: 'var(--bg-main)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-main)',
                    fontSize: '0.9rem',
                    outline: 'none',
                    fontFamily: 'var(--font-sans)',
                  }}
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn btn-primary"
                style={{ padding: '0.9rem 1.8rem', fontSize: '1rem' }}
              >
                {submitting ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <Send size={18} />
                    <span>Send Message to Pooja</span>
                  </>
                )}
              </button>

            </form>
          </div>

        </div>

      </div>

      <style>{`
        @media (max-width: 992px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
          .form-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
