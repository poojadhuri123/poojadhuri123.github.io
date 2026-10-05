import React from 'react';
import { Terminal, ArrowRight, Download, Server, Database, Code2, Cpu, ShieldCheck, Zap, Layers, Sparkles } from 'lucide-react';

export default function Hero({ onOpenTerminal, onOpenApiTester }) {
  const techPills = [
    { name: 'PHP 8.3', color: '#777BB4' },
    { name: 'Laravel 11', color: '#FF2D20' },
    { name: 'Livewire 3', color: '#FB70A9' },
    { name: 'MySQL / PostgreSQL', color: '#00758F' },
    { name: 'Redis Caching', color: '#DC382D' },
    { name: 'RESTful & GraphQL', color: '#E535AB' },
    { name: 'Docker / CI/CD', color: '#2496ED' },
    { name: 'React / Vue.js', color: '#61DAFB' },
  ];

  return (
    <section
      id="about"
      style={{
        paddingTop: '8.5rem',
        paddingBottom: '5rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Orbs */}
      <div className="bg-glow-orb" style={{ top: '-10%', left: '-10%' }}></div>
      <div className="bg-glow-orb" style={{ bottom: '10%', right: '-10%', background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)' }}></div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: '3rem', alignItems: 'center' }} className="hero-grid">
          
          {/* Left Hero Text Column */}
          <div>
            {/* Tag Pill */}
            <div className="pill mono" style={{ marginBottom: '1.25rem', display: 'inline-flex' }}>
              <span style={{ color: 'var(--laravel-red)' }}>&lt;?php</span>
              <span>echo "Senior PHP & Laravel Engineer";</span>
              <span style={{ color: 'var(--laravel-red)' }}>?&gt;</span>
            </div>

            <h1
              style={{
                fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
                fontWeight: 800,
                lineHeight: 1.15,
                letterSpacing: '-0.03em',
                marginBottom: '1.25rem',
              }}
            >
              Architecting High-Performance <span className="gradient-text">Laravel APIs</span> & Enterprise SaaS Systems
            </h1>

            <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '2rem', maxWidth: '620px' }}>
              Hi, I'm <strong style={{ color: 'var(--text-heading)' }}>Pooja</strong> — a Full-Stack Engineer with 6+ years of expertise crafting scalable backends, clean Eloquent schemas, real-time microservices, and slick React/Vue dashboards.
            </p>

            {/* Quick Tech Chips */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2.5rem' }}>
              {techPills.map((tech) => (
                <span
                  key={tech.name}
                  className="mono"
                  style={{
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    padding: '0.35rem 0.75rem',
                    borderRadius: '6px',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-main)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                  }}
                >
                  <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: tech.color }}></span>
                  {tech.name}
                </span>
              ))}
            </div>

            {/* CTA Action Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
              <a href="#projects" className="btn btn-primary">
                <span>View Projects</span>
                <ArrowRight size={18} />
              </a>

              <button onClick={onOpenApiTester} className="btn btn-secondary">
                <Zap size={18} style={{ color: 'var(--laravel-red)' }} />
                <span>Interactive API Tester</span>
              </button>

              <button onClick={onOpenTerminal} className="btn btn-outline mono">
                <Terminal size={17} style={{ color: 'var(--laravel-red)' }} />
                <span>php artisan serve</span>
              </button>
            </div>
          </div>

          {/* Right Profile & Code Snippet Card */}
          <div style={{ position: 'relative' }}>
            <div className="glass-card glow-box" style={{ padding: '1.75rem', position: 'relative', zIndex: 2 }}>
              
              {/* Profile Card Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '1.5rem' }}>
                <div style={{ position: 'relative' }}>
                  <img
                    src="./avatar.jpg"
                    alt="Pooja - Senior PHP & Laravel Developer"
                    style={{
                      width: '84px',
                      height: '84px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '3px solid var(--laravel-red)',
                      boxShadow: '0 8px 20px var(--laravel-glow)',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '2px',
                      right: '2px',
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      background: 'var(--accent-emerald)',
                      border: '2px solid var(--bg-card)',
                    }}
                    title="Online & Ready for Work"
                  ></div>
                </div>

                <div>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 700 }}>Pooja</h3>
                  <p className="mono" style={{ fontSize: '0.85rem', color: 'var(--laravel-red)', fontWeight: 600 }}>
                    Senior Laravel & API Architect
                  </p>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    📍 Mumbai, India • Available Worldwide
                  </p>
                </div>
              </div>

              {/* Code Snippet Box */}
              <div
                style={{
                  background: 'var(--code-bg)',
                  border: '1px solid var(--code-border)',
                  borderRadius: '10px',
                  overflow: 'hidden',
                }}
              >
                {/* Code Header */}
                <div
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    padding: '0.6rem 1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid var(--code-border)',
                  }}
                >
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FF5F56' }}></span>
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FFBD2E' }}></span>
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27C93F' }}></span>
                  </div>
                  <span className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    DeveloperProfile.php
                  </span>
                </div>

                {/* Code Body */}
                <div className="mono" style={{ padding: '1rem', fontSize: '0.82rem', lineHeight: '1.7', color: '#E2E8F0' }}>
                  <div>
                    <span style={{ color: '#F43F5E' }}>namespace</span> App\Services;
                  </div>
                  <div style={{ marginTop: '0.4rem' }}>
                    <span style={{ color: '#F43F5E' }}>class</span> <span style={{ color: '#38BDF8' }}>PoojaDeveloper</span> {'{'}
                  </div>
                  <div style={{ paddingLeft: '1.2rem' }}>
                    <span style={{ color: '#F43F5E' }}>public array</span> <span style={{ color: '#F59E0B' }}>$stack</span> = [<br/>
                    &nbsp;&nbsp;<span style={{ color: '#10B981' }}>'framework'</span> =&gt; <span style={{ color: '#10B981' }}>'Laravel 11.x'</span>,<br/>
                    &nbsp;&nbsp;<span style={{ color: '#10B981' }}>'database'</span> =&gt; <span style={{ color: '#10B981' }}>'MySQL / Redis'</span>,<br/>
                    &nbsp;&nbsp;<span style={{ color: '#10B981' }}>'frontend'</span> =&gt; <span style={{ color: '#10B981' }}>'React / Livewire'</span>,<br/>
                    ];
                  </div>
                  <div style={{ paddingLeft: '1.2rem', marginTop: '0.4rem' }}>
                    <span style={{ color: '#F43F5E' }}>public function</span> <span style={{ color: '#A855F7' }}>deliverValue</span>(): <span style={{ color: '#F43F5E' }}>Response</span> {'{'}
                  </div>
                  <div style={{ paddingLeft: '2.4rem' }}>
                    <span style={{ color: '#F43F5E' }}>return</span> response()-&gt;json([<br/>
                    &nbsp;&nbsp;<span style={{ color: '#10B981' }}>'code_quality'</span> =&gt; <span style={{ color: '#10B981' }}>'Pest/PHPUnit 100%'</span>,<br/>
                    &nbsp;&nbsp;<span style={{ color: '#10B981' }}>'performance'</span> =&gt; <span style={{ color: '#10B981' }}>'Sub-20ms execution'</span>,<br/>
                    ]);
                  </div>
                  <div style={{ paddingLeft: '1.2rem' }}>{'}'}</div>
                  <div>{'}'}</div>
                </div>
              </div>

              {/* Bottom Feature Badges */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', marginTop: '1.2rem' }}>
                <div style={{ textAlign: 'center', padding: '0.6rem', background: 'var(--bg-main)', borderRadius: '8px' }}>
                  <Zap size={18} style={{ color: '#F59E0B', margin: '0 auto 4px auto' }} />
                  <div style={{ fontSize: '0.75rem', fontWeight: 700 }}>Octane Ready</div>
                </div>
                <div style={{ textAlign: 'center', padding: '0.6rem', background: 'var(--bg-main)', borderRadius: '8px' }}>
                  <ShieldCheck size={18} style={{ color: 'var(--accent-emerald)', margin: '0 auto 4px auto' }} />
                  <div style={{ fontSize: '0.75rem', fontWeight: 700 }}>Sanctum/OAuth</div>
                </div>
                <div style={{ textAlign: 'center', padding: '0.6rem', background: 'var(--bg-main)', borderRadius: '8px' }}>
                  <Database size={18} style={{ color: 'var(--accent-cyan)', margin: '0 auto 4px auto' }} />
                  <div style={{ fontSize: '0.75rem', fontWeight: 700 }}>SQL Optimized</div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Quick Stats Grid Bar */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.5rem',
            marginTop: '4.5rem',
          }}
        >
          {[
            { label: 'Years PHP & Laravel Exp.', value: '6+ Yrs', desc: 'Enterprise & SaaS scale', icon: Code2, color: 'var(--laravel-red)' },
            { label: 'Projects & APIs Delivered', value: '50+', desc: 'Production deployments', icon: Server, color: '#A855F7' },
            { label: 'Query Latency Optimization', value: '<15 ms', desc: 'Redis & Index tuning', icon: Zap, color: '#F59E0B' },
            { label: 'Test Coverage & Quality', value: '98%+', desc: 'Pest & PHPUnit automation', icon: ShieldCheck, color: 'var(--accent-emerald)' },
          ].map((stat, i) => {
            const IconComp = stat.icon;
            return (
              <div
                key={i}
                className="glass-card"
                style={{
                  padding: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.2rem',
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: `${stat.color}15`,
                    border: `1px solid ${stat.color}30`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: stat.color,
                    flexShrink: 0,
                  }}
                >
                  <IconComp size={24} />
                </div>
                <div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-heading)', lineHeight: 1 }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', marginTop: '2px' }}>
                    {stat.label}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{stat.desc}</div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      <style>{`
        @media (max-width: 992px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
