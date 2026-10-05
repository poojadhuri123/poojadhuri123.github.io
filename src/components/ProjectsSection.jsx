import React, { useState } from 'react';
import { ExternalLink, ArrowRight, Server, Database, Code2, Shield, Eye, Layers } from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import ProjectModal from './ProjectModal';

export default function ProjectsSection() {
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: 'laracommerce',
      title: 'LaraCommerce Enterprise Multi-Tenant Engine',
      category: 'saas',
      categoryName: 'Enterprise SaaS',
      image: './project-saas.jpg',
      description: 'High-scale multi-tenant SaaS platform with tenant domain routing, Stripe Connect subscriptions, Redis queues, and Filament v3 admin control panel.',
      longDescription: 'LaraCommerce is an enterprise-grade multi-tenant e-commerce core built using Laravel 11 and Inertia.js with React. It supports dynamic tenant database isolation, automated tenant provisioning, Stripe Connect split payments, and real-time inventory management.',
      metrics: '100k+ Orders / Day',
      tags: ['Laravel 11', 'Inertia.js', 'React', 'Multi-Tenancy', 'Stripe API', 'Filament v3', 'PostgreSQL', 'Redis'],
      highlights: [
        'Implemented strict multi-tenant database connection switching using custom Eloquent scopes.',
        'Processed over 100,000 orders/day with RedisHorizon queue worker concurrency.',
        'Built full real-time sales dashboard with Filament v3 & Recharts.'
      ],
      snippet: `// Tenant Connection Middleware
namespace App\\Http\\Middleware;

class IdentifyTenant
{
    public function handle($request, Closure $next)
    {
        $subdomain = $request->route('tenant');
        $tenant = Tenant::where('subdomain', $subdomain)->firstOrFail();
        
        TenantManager::setTenant($tenant);
        
        return $next($request);
    }
}`,
      demoUrl: 'https://laracommerce-demo.poojadev.io',
      githubUrl: 'https://github.com/pooja-laravel/laracommerce-saas',
    },
    {
      id: 'pulsepay',
      title: 'PulsePay High-Throughput Payment Microservice',
      category: 'api',
      categoryName: 'Microservices & APIs',
      image: './project-fintech.jpg',
      description: 'Ultra low-latency payment processing microservice powered by Laravel Octane, Swoole, and Redis caching. Achieves sub-15ms response times.',
      longDescription: 'PulsePay is a specialized fintech API engine designed for instant payout processing and transaction webhooks. Powered by Laravel Octane and Swoole, it bypasses standard PHP-FPM bootstrap overhead to deliver blazing fast HTTP responses under heavy concurrency.',
      metrics: 'sub-15ms Latency',
      tags: ['Laravel Octane', 'Swoole', 'Sanctum', 'Redis Pub/Sub', 'MySQL 8', 'Pest PHP', 'Docker'],
      highlights: [
        'Reduced API latency from 140ms down to 14ms using Laravel Octane state persistence.',
        'Configured Redis Pub/Sub for real-time payment status broadcast to WebSockets.',
        'Achieved 99.99% uptime with automated Pest PHP test suite & GitHub Actions CI/CD.'
      ],
      snippet: `// Laravel Octane Swoole Response Handler
namespace App\\Services;

use Laravel\\Octane\\Facades\\Octane;

class PulsePayService
{
    public function processPayout(array $data)
    {
        return Octane::concurrently([
            fn () => $this->validateBalance($data['user_id']),
            fn () => $this->reserveFunds($data['amount']),
        ]);
    }
}`,
      demoUrl: 'https://pulsepay-api.poojadev.io',
      githubUrl: 'https://github.com/pooja-laravel/pulsepay-octane',
    },
    {
      id: 'healthflow',
      title: 'HealthFlow EHR & Telehealth Platform',
      category: 'fullstack',
      categoryName: 'Full-Stack Apps',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
      description: 'HIPAA-compliant Electronic Health Records portal built with Laravel 11, Livewire 3, Alpine.js, and encrypted MySQL database fields.',
      longDescription: 'HealthFlow is a comprehensive clinical management system connecting doctors and patients. Features encrypted medical record storage (AES-256), video consultation scheduling, automated PDF prescription generation, and role-based access control (Spatie Permission).',
      metrics: 'HIPAA Compliant',
      tags: ['Laravel 11', 'Livewire 3', 'Alpine.js', 'Spatie Permissions', 'AES-256 Encryption', 'MySQL'],
      highlights: [
        'Implemented field-level AES-256 encryption on patient medical records using Laravel Attribute Casts.',
        'Designed patient appointment queue system with Livewire 3 real-time polling.',
        'Passed independent security audit with zero high-risk vulnerabilities.'
      ],
      snippet: `// Encrypted Medical Record Attribute Cast
namespace App\\Casts;

use Illuminate\\Contracts\\Database\\Eloquent\\CastsAttributes;
use Illuminate\\Support\\Facades\\Crypt;

class EncryptedRecord implements CastsAttributes
{
    public function get($model, string $key, $value, array $attributes)
    {
        return $value ? Crypt::decryptString($value) : null;
    }

    public function set($model, string $key, $value, array $attributes)
    {
        return [$key => Crypt::encryptString($value)];
    }
}`,
      demoUrl: 'https://healthflow-demo.poojadev.io',
      githubUrl: 'https://github.com/pooja-laravel/healthflow-ehr',
    },
    {
      id: 'artisanaudit',
      title: 'ArtisanAudit Open-Source Package',
      category: 'opensource',
      categoryName: 'Open Source',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
      description: 'A developer-friendly open-source Laravel package for automated model change tracking, audit trail logging, and CLI diff inspection.',
      longDescription: 'ArtisanAudit is a lightweight open-source Laravel package created to automatically record Eloquent model creations, updates, and soft deletes with IP address, user agent, and diff snapshots. Includes Artisan CLI commands for fast audit inspections.',
      metrics: '1,500+ Downloads',
      tags: ['Laravel Package', 'PHP 8.3', 'Pest PHP', 'Artisan CLI', 'Open Source', 'GitHub Actions'],
      highlights: [
        'Downloaded over 1,500+ times on Packagist with 4.9★ rating.',
        'Built with zero external dependencies to ensure fast execution and minimal footprint.',
        'Includes full Pest PHP test suite covering 100% code branches.'
      ],
      snippet: `// Artisan Audit Model Observer Trait
namespace Pooja\\ArtisanAudit\\Traits;

trait Auditable
{
    public static function bootAuditable()
    {
        static::created(fn ($model) => $model->recordAudit('CREATED'));
        static::updated(fn ($model) => $model->recordAudit('UPDATED'));
        static::deleted(fn ($model) => $model->recordAudit('DELETED'));
    }
}`,
      demoUrl: 'https://packagist.org/packages/pooja/artisan-audit',
      githubUrl: 'https://github.com/pooja-laravel/artisan-audit-package',
    }
  ];

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" style={{ padding: '6.5rem 0', position: 'relative', background: 'var(--bg-main)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">&lt;FEATURED_WORK /&gt;</span>
          <h2>Production-Grade <span className="gradient-text">Laravel Projects</span></h2>
          <p>
            Explore real-world SaaS applications, microservice architectures, and open-source packages built with Laravel 11, PHP 8.3, and clean software patterns.
          </p>
        </div>

        {/* Filter Buttons */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.6rem',
            flexWrap: 'wrap',
            marginBottom: '3rem',
          }}
        >
          {[
            { id: 'all', label: 'All Projects' },
            { id: 'saas', label: 'Enterprise SaaS' },
            { id: 'api', label: 'Microservices & APIs' },
            { id: 'fullstack', label: 'Full-Stack Apps' },
            { id: 'opensource', label: 'Open Source Packages' },
          ].map((btn) => {
            const isSelected = filter === btn.id;
            return (
              <button
                key={btn.id}
                onClick={() => setFilter(btn.id)}
                className="mono"
                style={{
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  padding: '0.5rem 1.1rem',
                  borderRadius: 'var(--radius-sm)',
                  background: isSelected ? 'var(--laravel-red)' : 'var(--bg-card)',
                  color: isSelected ? '#FFFFFF' : 'var(--text-muted)',
                  border: isSelected ? '1px solid var(--laravel-red)' : '1px solid var(--border-color)',
                  transition: 'all 0.2s ease',
                }}
              >
                {btn.label}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
            gap: '2rem',
          }}
        >
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="glass-card glow-box"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                overflow: 'hidden',
                borderRadius: 'var(--radius-md)',
              }}
            >
              <div>
                {/* Project Thumbnail Image */}
                <div style={{ position: 'relative', height: '210px', overflow: 'hidden' }}>
                  <img
                    src={project.image}
                    alt={project.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  />

                  {/* Category Pill */}
                  <span
                    className="mono"
                    style={{
                      position: 'absolute',
                      top: '1rem',
                      left: '1rem',
                      background: 'rgba(9, 13, 22, 0.85)',
                      backdropFilter: 'blur(8px)',
                      color: 'var(--laravel-red)',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      padding: '0.25rem 0.65rem',
                      borderRadius: '6px',
                      border: '1px solid rgba(255, 45, 32, 0.3)',
                    }}
                  >
                    {project.categoryName}
                  </span>

                  {/* Metric Badge */}
                  <span
                    className="mono"
                    style={{
                      position: 'absolute',
                      bottom: '1rem',
                      right: '1rem',
                      background: 'rgba(16, 185, 129, 0.9)',
                      color: '#FFFFFF',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      padding: '0.25rem 0.65rem',
                      borderRadius: '6px',
                    }}
                  >
                    ⚡ {project.metrics}
                  </span>
                </div>

                {/* Card Content */}
                <div style={{ padding: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.6rem', color: 'var(--text-heading)' }}>
                    {project.title}
                  </h3>

                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '1.25rem' }}>
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1rem' }}>
                    {project.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="mono"
                        style={{
                          fontSize: '0.72rem',
                          padding: '0.2rem 0.5rem',
                          borderRadius: '4px',
                          background: 'var(--bg-main)',
                          border: '1px solid var(--border-color)',
                          color: 'var(--text-main)',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 4 && (
                      <span className="mono" style={{ fontSize: '0.72rem', color: 'var(--text-muted)', padding: '0.2rem' }}>
                        +{project.tags.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div
                style={{
                  padding: '1rem 1.5rem',
                  borderTop: '1px solid var(--border-color)',
                  background: 'rgba(0,0,0,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <button
                  onClick={() => setSelectedProject(project)}
                  className="btn btn-secondary btn-sm mono"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                >
                  <Eye size={14} style={{ color: 'var(--laravel-red)' }} />
                  <span>Architecture & Details</span>
                </button>

                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--laravel-red)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                  title="View GitHub Repository"
                >
                  <GithubIcon size={18} />
                </a>
              </div>

            </div>
          ))}
        </div>

        {/* Modal Popup */}
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />

      </div>
    </section>
  );
}
