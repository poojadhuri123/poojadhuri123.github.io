import React, { useState } from 'react';
import { Server, Database, Cpu, Globe, Layers, ArrowRight, ShieldCheck, Zap, HardDrive, Mail } from 'lucide-react';

export default function ArchitectureFlow() {
  const [activeNode, setActiveNode] = useState('octane');

  const nodes = [
    {
      id: 'cdn',
      title: '1. Edge CDN & Cloudflare WAF',
      subtitle: 'Global DDoS protection & static asset cache',
      icon: Globe,
      color: '#38BDF8',
      details: 'Cloudflare caches static React/Vue assets at edge nodes, rate limits malicious IP addresses, and terminates initial TLS connections.',
      stat: '50ms Global Latency Saved'
    },
    {
      id: 'nginx',
      title: '2. Nginx Reverse Proxy',
      subtitle: 'High-throughput web server & FastCGI',
      icon: Server,
      color: '#10B981',
      details: 'Nginx handles HTTP/2 request buffering, gzip/brotli compression, gzip stream filtering, and proxies dynamic PHP traffic directly to Laravel Octane Swoole workers.',
      stat: '10,000+ Req/sec Handled'
    },
    {
      id: 'octane',
      title: '3. Laravel Octane Worker Pool',
      subtitle: 'Persistent memory PHP 8.3 & Swoole engine',
      icon: Cpu,
      color: '#FF2D20',
      details: 'By booting the Laravel Application framework ONCE into Swoole memory, Octane bypasses traditional PHP request bootstrap overhead, dropping response times down to <15ms.',
      stat: '<15ms Response Time'
    },
    {
      id: 'redis',
      title: '4. Redis Cache & Horizon Queues',
      subtitle: 'In-memory data store & async queue workers',
      icon: Zap,
      color: '#F59E0B',
      details: 'Offloads heavy tasks (PDF invoice creation, Stripe webhooks, email dispatch) to Laravel Horizon background workers with zero impact on HTTP request threads.',
      stat: '0 Blocking I/O Threads'
    },
    {
      id: 'db',
      title: '5. MySQL 8.0 Primary / Read-Replica',
      subtitle: 'Query optimized InnoDB relational store',
      icon: Database,
      color: '#A855F7',
      details: 'Utilizes read/write connection splitting in Laravel config. Eager loading Eloquent queries with composite indexing ensures zero N+1 database locks.',
      stat: '99.99% DB Availability'
    }
  ];

  const selectedNode = nodes.find(n => n.id === activeNode) || nodes[2];

  return (
    <section id="architecture" style={{ padding: '6.5rem 0', position: 'relative', background: 'var(--bg-tertiary)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">&lt;ENTERPRISE_PIPELINE /&gt;</span>
          <h2>Scalable <span className="gradient-text">Laravel Octane Architecture</span></h2>
          <p>
            Click any node below to inspect how my enterprise backend pipelines achieve high concurrency, sub-20ms latency, and 99.99% availability.
          </p>
        </div>

        {/* Interactive Architecture Flow Diagram */}
        <div
          className="glass-card"
          style={{
            padding: '2rem',
            background: 'var(--bg-card)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-lg)',
          }}
        >
          {/* Flow Diagram Nodes Row */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem',
              alignItems: 'center',
              marginBottom: '2.5rem',
            }}
          >
            {nodes.map((node, index) => {
              const Icon = node.icon;
              const isSelected = activeNode === node.id;
              return (
                <div key={node.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <button
                    onClick={() => setActiveNode(node.id)}
                    style={{
                      width: '100%',
                      padding: '1.25rem 1rem',
                      borderRadius: '12px',
                      background: isSelected ? `${node.color}15` : 'var(--bg-main)',
                      border: isSelected ? `2px solid ${node.color}` : '1px solid var(--border-color)',
                      textAlign: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.25s ease',
                      boxShadow: isSelected ? `0 0 20px ${node.color}40` : 'none',
                    }}
                  >
                    <div
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '10px',
                        background: `${node.color}20`,
                        color: node.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 0.75rem auto',
                      }}
                    >
                      <Icon size={22} />
                    </div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-heading)' }}>
                      {node.title.split('. ')[1]}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                      {node.stat}
                    </div>
                  </button>

                  {index < nodes.length - 1 && (
                    <ArrowRight size={18} style={{ color: 'var(--text-subtle)', flexShrink: 0, display: 'none', '@media (min-width: 1100px)': { display: 'block' } }} />
                  )}
                </div>
              );
            })}
          </div>

          {/* Active Node Detailed Inspection Drawer */}
          <div
            style={{
              background: 'var(--code-bg)',
              border: `1px solid ${selectedNode.color}50`,
              borderRadius: '14px',
              padding: '1.75rem',
              display: 'grid',
              gridTemplateColumns: '1.2fr 0.8fr',
              gap: '2rem',
              alignItems: 'center',
            }}
            className="architecture-detail-grid"
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <div
                  style={{
                    padding: '0.4rem 0.8rem',
                    borderRadius: '6px',
                    background: `${selectedNode.color}20`,
                    color: selectedNode.color,
                    fontWeight: 700,
                    fontSize: '0.8rem',
                  }}
                  className="mono"
                >
                  {selectedNode.title}
                </div>
                <span className="mono" style={{ fontSize: '0.8rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>
                  ⚡ {selectedNode.stat}
                </span>
              </div>

              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.6rem', color: '#FFFFFF' }}>
                {selectedNode.subtitle}
              </h3>

              <p style={{ fontSize: '0.98rem', color: '#94A3B8', lineHeight: '1.65' }}>
                {selectedNode.details}
              </p>
            </div>

            {/* Architecture Code Config Preview */}
            <div
              style={{
                background: '#090D16',
                border: '1px solid #1E293B',
                borderRadius: '10px',
                padding: '1rem',
              }}
            >
              <div className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
                <span>octane.php / horizon.php</span>
                <span style={{ color: 'var(--accent-emerald)' }}>Active Config</span>
              </div>
              <pre className="mono" style={{ margin: 0, fontSize: '0.78rem', color: '#E2E8F0', lineHeight: '1.5' }}>
{`'server' => env('OCTANE_SERVER', 'swoole'),

'workers' => [
    'task' => env('OCTANE_TASK_WORKERS', 16),
    'max_requests' => 1000,
],

'cache' => [
    'rows' => 10000,
    'bytes' => 10000 * 1024,
],`}
              </pre>
            </div>
          </div>

        </div>

      </div>

      <style>{`
        @media (max-width: 992px) {
          .architecture-detail-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
