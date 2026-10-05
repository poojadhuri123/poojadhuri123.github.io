import React from 'react';
import { Briefcase, Calendar, MapPin, Award, CheckCircle2 } from 'lucide-react';

export default function ExperienceTimeline() {
  const experiences = [
    {
      role: 'Lead PHP & Laravel Architect',
      company: 'TechCorp SaaS Solutions',
      location: 'Mumbai, India (Hybrid)',
      period: '2022 — Present',
      description: 'Head of backend engineering managing multi-tenant Laravel platforms and microservices handling 2M+ monthly API requests.',
      achievements: [
        'Architected Laravel Octane migration reducing overall cloud server infra costs by 40%.',
        'Implemented Stripe Connect automated multi-vendor payouts with zero payment discrepancies.',
        'Mentored 6 junior/mid-level Laravel developers in PSR standards and TDD with Pest PHP.'
      ],
      tech: ['Laravel 11', 'PHP 8.3', 'Octane', 'Redis', 'PostgreSQL', 'Docker', 'Filament']
    },
    {
      role: 'Senior Full-Stack Developer',
      company: 'WebCraft Digital Media',
      location: 'Remote',
      period: '2020 — 2022',
      description: 'Built custom web applications, e-commerce platforms, and RESTful APIs for high-volume international clients.',
      achievements: [
        'Built real-time analytics dashboard with Inertia.js & Vue.js serving 500k active visitors.',
        'Optimized legacy MySQL database queries, decreasing average response time from 1.2s to 120ms.',
        'Integrated automated GitHub Actions CI/CD pipelines deploying directly to AWS EC2 instances.'
      ],
      tech: ['PHP 8.0', 'Laravel 8/9', 'Vue.js 3', 'MySQL', 'Livewire', 'AWS S3']
    },
    {
      role: 'PHP / MySQL Web Developer',
      company: 'Innovate Tech Studios',
      location: 'Mumbai, India',
      period: '2018 — 2020',
      description: 'Developed custom PHP web applications, REST APIs, and client backend portals from ground up.',
      achievements: [
        'Built over 25+ client web applications utilizing core PHP, OOP principles, and MySQL.',
        'Implemented OAuth2 authentication for mobile applications using Laravel Passport.',
        'Designed database migrations, seeds, and automated backup routines.'
      ],
      tech: ['PHP 7.4', 'Laravel 6/7', 'MySQL', 'JavaScript', 'Bootstrap', 'Git']
    }
  ];

  return (
    <section id="experience" style={{ padding: '6.5rem 0', position: 'relative', background: 'var(--bg-main)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">&lt;CAREER_PATH /&gt;</span>
          <h2>Professional <span className="gradient-text">Engineering Journey</span></h2>
          <p>
            6+ years of continuous backend evolution, leading development teams, and shipping production-ready software.
          </p>
        </div>

        {/* Timeline Items */}
        <div style={{ maxWidth: '860px', margin: '0 auto', position: 'relative' }}>
          
          {/* Vertical Center Line */}
          <div
            style={{
              position: 'absolute',
              top: '1.5rem',
              bottom: '1.5rem',
              left: '24px',
              width: '2px',
              background: 'linear-gradient(to bottom, var(--laravel-red), var(--accent-purple), var(--border-color))',
              zIndex: 1,
            }}
          ></div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {experiences.map((exp, index) => (
              <div
                key={index}
                style={{
                  position: 'relative',
                  paddingLeft: '60px',
                  zIndex: 2,
                }}
              >
                {/* Timeline Dot Icon */}
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: '0.2rem',
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: 'var(--bg-card)',
                    border: '2px solid var(--laravel-red)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--laravel-red)',
                    boxShadow: 'var(--shadow-glow)',
                  }}
                >
                  <Briefcase size={20} />
                </div>

                {/* Timeline Content Card */}
                <div className="glass-card glow-box" style={{ padding: '1.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
                    <div>
                      <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-heading)' }}>
                        {exp.role}
                      </h3>
                      <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--laravel-red)', marginTop: '2px' }}>
                        {exp.company}
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '2px' }}>
                      <span className="mono" style={{ fontSize: '0.8rem', fontWeight: 700, padding: '0.25rem 0.65rem', borderRadius: '6px', background: 'rgba(255, 45, 32, 0.1)', color: 'var(--laravel-red)' }}>
                        {exp.period}
                      </span>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <MapPin size={12} /> {exp.location}
                      </span>
                    </div>
                  </div>

                  <p style={{ fontSize: '0.92rem', color: 'var(--text-main)', lineHeight: '1.6', marginBottom: '1.2rem' }}>
                    {exp.description}
                  </p>

                  {/* Key Achievements Bullet points */}
                  <div style={{ marginBottom: '1.25rem' }}>
                    <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '0.5rem' }} className="mono">
                      Key Impact & Accomplishments
                    </h4>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem', padding: 0 }}>
                      {exp.achievements.map((ach, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                          <CheckCircle2 size={15} style={{ color: 'var(--accent-emerald)', flexShrink: 0 }} />
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {exp.tech.map((t) => (
                      <span
                        key={t}
                        className="mono"
                        style={{
                          fontSize: '0.75rem',
                          padding: '0.2rem 0.55rem',
                          borderRadius: '4px',
                          background: 'var(--bg-main)',
                          border: '1px solid var(--border-color)',
                          color: 'var(--text-main)',
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                </div>

              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
