import React, { useState } from 'react';
import { Server, Database, Cpu, Layout, Terminal, Shield, Zap, CheckCircle2, Award } from 'lucide-react';

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState('backend');

  const categories = [
    { id: 'backend', label: 'Backend & Laravel', icon: Server },
    { id: 'database', label: 'Database & Redis', icon: Database },
    { id: 'api', label: 'APIs & Microservices', icon: Cpu },
    { id: 'frontend', label: 'Frontend Integration', icon: Layout },
    { id: 'devops', label: 'DevOps & Tooling', icon: Terminal },
  ];

  const skillData = {
    backend: [
      { name: 'PHP 8.3 / 8.x', level: 98, experience: '6+ Years', highlight: 'Strict typing, Attributes, Enums, JIT Compiler' },
      { name: 'Laravel 11.x', level: 98, experience: '6+ Years', highlight: 'Service Providers, Contracts, Facades, Middleware' },
      { name: 'Eloquent ORM', level: 95, experience: '6+ Years', highlight: 'Complex Relationships, Polymorphic, Query Scopes' },
      { name: 'Livewire 3 & Alpine.js', level: 90, experience: '4 Years', highlight: 'Reactivity without JS frameworks, Wire:model' },
      { name: 'Filament Admin v3', level: 92, experience: '3 Years', highlight: 'Rapid CRUD Dashboards, Widgets, Form Builder' },
      { name: 'Pest PHP & PHPUnit', level: 92, experience: '5 Years', highlight: 'TDD, Feature Tests, Mocking & Assertions' },
      { name: 'Laravel Octane / Swoole', level: 85, experience: '2 Years', highlight: 'High-concurrency async worker pools' },
      { name: 'Composer Package Dev', level: 88, experience: '4 Years', highlight: 'Custom package architecture & PSR standards' },
    ],
    database: [
      { name: 'MySQL 8.0', level: 95, experience: '6+ Years', highlight: 'Query Plan Optimization, Composite Indexing, Views' },
      { name: 'Redis Caching', level: 92, experience: '5 Years', highlight: 'Pub/Sub, Session Store, Cache Tags, Rate Limiters' },
      { name: 'PostgreSQL', level: 88, experience: '4 Years', highlight: 'JSONB Data types, Full-text Search, Foreign Keys' },
      { name: 'Database Migrations', level: 95, experience: '6 Years', highlight: 'Zero-downtime schema migrations & seeding' },
      { name: 'Laravel Horizon', level: 90, experience: '4 Years', highlight: 'Redis Queue Monitoring, Concurrency & Job Retries' },
    ],
    api: [
      { name: 'RESTful API Design', level: 98, experience: '6+ Years', highlight: 'API Versioning, Resources, OpenAPI / Swagger Specs' },
      { name: 'Laravel Sanctum & Passport', level: 95, experience: '5 Years', highlight: 'OAuth2 Tokens, SPA Auth, Mobile API Tokens' },
      { name: 'GraphQL (Lighthouse)', level: 85, experience: '3 Years', highlight: 'Schema Definition, Queries, Mutations & Directives' },
      { name: 'Laravel Reverb / WebSockets', level: 88, experience: '3 Years', highlight: 'Real-time broadcasting, Channel Auth & Presences' },
      { name: 'Stripe & Paypal Gateways', level: 92, experience: '5 Years', highlight: 'Webhooks, Subscriptions, Idempotency & Invoicing' },
    ],
    frontend: [
      { name: 'Inertia.js Integration', level: 92, experience: '4 Years', highlight: 'Monolithic SPA architecture with React/Vue' },
      { name: 'React.js', level: 88, experience: '4 Years', highlight: 'Hooks, Context API, Dynamic UI Components' },
      { name: 'Vue.js 3 (Composition API)', level: 88, experience: '4 Years', highlight: 'Pinia state, Vue Router, Reactive Props' },
      { name: 'Tailwind CSS', level: 95, experience: '5 Years', highlight: 'Custom themes, Design systems, Responsive Layouts' },
      { name: 'Blade Templating', level: 96, experience: '6 Years', highlight: 'Blade Components, Directives, Stack/Push' },
    ],
    devops: [
      { name: 'Docker & Compose', level: 88, experience: '4 Years', highlight: 'Multi-stage builds, Containerized PHP-FPM & Nginx' },
      { name: 'GitHub Actions CI/CD', level: 90, experience: '4 Years', highlight: 'Automated Pest testing, Linting & Auto Deployment' },
      { name: 'AWS S3, EC2, RDS', level: 85, experience: '3 Years', highlight: 'S3 Asset storage, Server configuration & Backups' },
      { name: 'Nginx Configuration', level: 88, experience: '5 Years', highlight: 'SSL Config, Reverse Proxy, FastCGI Caching' },
      { name: 'Laravel Forge & Vapor', level: 92, experience: '4 Years', highlight: 'Server provisioning, SSL renewal, Serverless PHP' },
    ]
  };

  return (
    <section id="skills" style={{ padding: '6.5rem 0', position: 'relative' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">&lt;TECHNICAL_SKILLS /&gt;</span>
          <h2>Deep <span className="gradient-text">PHP & Laravel Ecosystem</span> Mastery</h2>
          <p>
            Engineered with best practices, object-oriented design patterns, PSR compliance, and robust enterprise architectural standards.
          </p>
        </div>

        {/* Category Tabs */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.75rem',
            flexWrap: 'wrap',
            marginBottom: '3rem',
          }}
        >
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className="btn"
                style={{
                  background: isSelected ? 'var(--laravel-red)' : 'var(--bg-card)',
                  color: isSelected ? '#FFFFFF' : 'var(--text-main)',
                  border: isSelected ? '1px solid var(--laravel-red)' : '1px solid var(--border-color)',
                  boxShadow: isSelected ? 'var(--shadow-glow)' : 'none',
                  borderRadius: 'var(--radius-sm)',
                  padding: '0.6rem 1.25rem',
                }}
              >
                <Icon size={17} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Skills Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {skillData[activeCategory].map((skill, i) => (
            <div
              key={skill.name}
              className="glass-card"
              style={{
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.6rem' }}>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-heading)' }}>
                    {skill.name}
                  </h4>
                  <span className="mono" style={{ fontSize: '0.75rem', color: 'var(--laravel-red)', fontWeight: 600, background: 'rgba(255, 45, 32, 0.1)', padding: '0.15rem 0.5rem', borderRadius: '4px' }}>
                    {skill.experience}
                  </span>
                </div>

                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '1.25rem' }}>
                  {skill.highlight}
                </p>
              </div>

              {/* Progress Bar */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }} className="mono">
                  <span>Proficiency</span>
                  <span style={{ fontWeight: 700, color: 'var(--text-heading)' }}>{skill.level}%</span>
                </div>
                <div
                  style={{
                    width: '100%',
                    height: '7px',
                    borderRadius: 'var(--radius-full)',
                    background: 'var(--bg-main)',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      width: `${skill.level}%`,
                      height: '100%',
                      borderRadius: 'var(--radius-full)',
                      background: 'linear-gradient(90deg, var(--laravel-red) 0%, #FF7A00 100%)',
                      transition: 'width 0.8s ease-in-out',
                    }}
                  ></div>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom Architectural Practices Banner */}
        <div
          className="glass-card"
          style={{
            marginTop: '3.5rem',
            padding: '2rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.5rem',
            background: 'var(--bg-card)',
          }}
        >
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{ color: 'var(--laravel-red)', padding: '0.5rem', background: 'rgba(255, 45, 32, 0.1)', borderRadius: '10px' }}>
              <Shield size={22} />
            </div>
            <div>
              <h4 style={{ fontSize: '1rem', marginBottom: '0.2rem' }}>Clean Architecture & DDD</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Action classes, DTOs, Service-Repository pattern, & Domain Event separation.</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{ color: 'var(--accent-emerald)', padding: '0.5rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '10px' }}>
              <CheckCircle2 size={22} />
            </div>
            <div>
              <h4 style={{ fontSize: '1rem', marginBottom: '0.2rem' }}>Automated Testing First</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Rigorous Pest & PHPUnit coverage ensuring zero production regressions.</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{ color: '#F59E0B', padding: '0.5rem', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '10px' }}>
              <Zap size={22} />
            </div>
            <div>
              <h4 style={{ fontSize: '1rem', marginBottom: '0.2rem' }}>Query & Cache Optimization</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Strict elimination of N+1 queries, Redis caching, & database index tuning.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
