import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Marcus Vance',
      role: 'CTO @ SaaSify Global',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      text: 'Pooja transformed our entire backend stack to Laravel 11 with Octane. Her deep understanding of Eloquent database indexing reduced our server response latency from 180ms to under 18ms. Exceptional code quality!',
      rating: 5,
      project: 'Multi-Tenant SaaS Core'
    },
    {
      name: 'Elena Rostova',
      role: 'VP of Product @ PayPulse Fintech',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
      text: 'Working with Pooja on our high-throughput payment microservice was a game changer. She delivered sub-15ms Stripe API integration with comprehensive Pest PHP automated tests. Highly recommended!',
      rating: 5,
      project: 'Fintech Microservice API'
    },
    {
      name: 'David Chen',
      role: 'Engineering Director @ HealthTech Labs',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      text: 'Pooja is one of the sharpest Laravel developers I have hired. Her work on our HIPAA-compliant database encryption and Livewire 3 portal was flawless. She delivers clean, PSR-compliant code ahead of deadlines.',
      rating: 5,
      project: 'EHR Medical System'
    }
  ];

  return (
    <section id="testimonials" style={{ padding: '6.5rem 0', position: 'relative', background: 'var(--bg-tertiary)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">&lt;RECOMMENDATIONS /&gt;</span>
          <h2>Client & Lead <span className="gradient-text">Testimonials</span></h2>
          <p>
            Here is what CTOs, Engineering Leaders, and Product Managers say about my PHP & Laravel development work.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem',
          }}
        >
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="glass-card"
              style={{
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                background: 'var(--bg-card)',
                position: 'relative',
              }}
            >
              <Quote
                size={42}
                style={{
                  position: 'absolute',
                  top: '1.25rem',
                  right: '1.25rem',
                  color: 'rgba(255, 45, 32, 0.1)',
                }}
              />

              <div>
                {/* Stars */}
                <div style={{ display: 'flex', gap: '4px', color: '#F59E0B', marginBottom: '1rem' }}>
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>

                <p style={{ fontSize: '0.95rem', color: 'var(--text-main)', lineHeight: '1.65', fontStyle: 'italic', marginBottom: '1.5rem' }}>
                  "{t.text}"
                </p>
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <img
                  src={t.avatar}
                  alt={t.name}
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '2px solid var(--laravel-red)',
                  }}
                />
                <div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-heading)' }}>{t.name}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--laravel-red)', fontWeight: 600 }}>{t.role}</div>
                  <div className="mono" style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '1px' }}>
                    Project: {t.project}
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
