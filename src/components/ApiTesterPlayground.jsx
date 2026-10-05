import React, { useState } from 'react';
import { Play, Code, Database, Clock, Server, CheckCircle2, Copy, Check, FileText, Cpu, AlertCircle, RefreshCw } from 'lucide-react';

export default function ApiTesterPlayground() {
  const [activeTab, setActiveTab] = useState('tester'); // 'tester' | 'controller' | 'schema'
  const [selectedEndpointIndex, setSelectedEndpointIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [copied, setCopied] = useState(false);

  const endpoints = [
    {
      id: 'analytics',
      method: 'GET',
      path: '/api/v1/orders/analytics',
      title: 'E-Commerce Analytics Engine',
      description: 'Aggregates sales metrics, daily transaction volumes, and revenue breakdown using optimized SQL group-by queries and Redis caching.',
      controllerCode: `<?php

namespace App\\Http\\Controllers\\Api\\V1;

use App\\Http\\Controllers\\Controller;
use App\\Services\\AnalyticsService;
use Illuminate\\Http\\JsonResponse;
use Illuminate\\Support\\Facades\\Cache;

class OrderAnalyticsController extends Controller
{
    public function __construct(
        protected AnalyticsService $analytics
    ) {}

    /**
     * Get real-time aggregated sales analytics.
     */
    public function __invoke(): JsonResponse
    {
        $metrics = Cache::remember('analytics_daily_summary', 300, function () {
            return $this->analytics->calculateDailyMetrics();
        });

        return response()->json([
            'status' => 'success',
            'timestamp' => now()->toIso8601String(),
            'data' => $metrics,
            'meta' => [
                'cached' => true,
                'ttl_seconds' => 300
            ]
        ]);
    }
}`,
      databaseSchema: `-- Orders Table Index Optimization
CREATE TABLE \`orders\` (
  \`id\` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  \`tenant_id\` uuid NOT NULL,
  \`user_id\` bigint(20) UNSIGNED NOT NULL,
  \`amount\` decimal(12,2) NOT NULL,
  \`status\` enum('pending','paid','failed','refunded') NOT NULL DEFAULT 'pending',
  \`created_at\` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (\`id\`),
  KEY \`orders_tenant_status_created_idx\` (\`tenant_id\`,\`status\`,\`created_at\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,
      mockResponse: {
        status: 200,
        statusText: 'OK',
        timeMs: 14,
        memory: '3.8 MB',
        sqlQueries: [
          { query: 'SELECT COUNT(*) as total_orders, SUM(amount) as gross_revenue FROM orders WHERE created_at >= "2026-10-01" AND status = "paid";', durationMs: 4.2 },
          { query: 'SELECT status, COUNT(*) as count FROM orders GROUP BY status;', durationMs: 2.1 },
        ],
        body: {
          status: 'success',
          timestamp: '2026-10-05T13:20:00Z',
          data: {
            gross_revenue_usd: 148590.25,
            total_orders: 3420,
            active_subscriptions: 890,
            conversion_rate: '4.85%',
            top_payment_methods: [
              { method: 'stripe_card', percentage: 65.4 },
              { method: 'apple_pay', percentage: 22.1 },
              { method: 'paypal', percentage: 12.5 }
            ]
          },
          meta: {
            cache_hit: true,
            execution_time_ms: 14.2,
            laravel_version: '11.x'
          }
        }
      }
    },
    {
      id: 'checkout',
      method: 'POST',
      path: '/api/v1/checkout/process',
      title: 'Idempotent Payment & Order Dispatcher',
      description: 'Processes payment via Stripe SDK, dispatches DB transaction, triggers queued OrderPaid email event, and returns Sanctum authenticated payload.',
      controllerCode: `<?php

namespace App\\Http\\Controllers\\Api\\V1;

use App\\Http\\Requests\\CheckoutRequest;
use App\\Services\\PaymentGatewayService;
use App\\Events\\OrderCompleted;
use Illuminate\\Support\\Facades\\DB;

class CheckoutController extends Controller
{
    public function process(CheckoutRequest $request, PaymentGatewayService $gateway)
    {
        return DB::transaction(function () use ($request, $gateway) {
            $order = $request->user()->orders()->create([
                'amount' => $request->validated('total_amount'),
                'status' => 'pending'
            ]);

            $payment = $gateway->charge($order, $request->validated('payment_method_id'));
            
            $order->update(['status' => 'paid', 'transaction_id' => $payment->id]);
            
            event(new OrderCompleted($order));

            return response()->json([
                'message' => 'Order processed successfully',
                'order_id' => $order->id,
                'status' => 'paid'
            ], 201);
        });
    }
}`,
      databaseSchema: `-- Transactions Table with Unique Idempotency Key
CREATE TABLE \`transactions\` (
  \`id\` uuid NOT NULL,
  \`order_id\` bigint(20) UNSIGNED NOT NULL,
  \`idempotency_key\` varchar(255) NOT NULL UNIQUE,
  \`gateway\` varchar(50) NOT NULL,
  \`amount\` decimal(12,2) NOT NULL,
  \`status\` varchar(50) NOT NULL,
  \`created_at\` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB;`,
      mockResponse: {
        status: 201,
        statusText: 'Created',
        timeMs: 28,
        memory: '5.1 MB',
        sqlQueries: [
          { query: 'START TRANSACTION;', durationMs: 0.5 },
          { query: 'INSERT INTO orders (user_id, amount, status) VALUES (42, 199.99, "pending");', durationMs: 3.1 },
          { query: 'UPDATE orders SET status = "paid" WHERE id = 8049;', durationMs: 2.8 },
          { query: 'COMMIT;', durationMs: 1.2 },
        ],
        body: {
          message: 'Order processed successfully',
          order_id: 8049,
          transaction_id: 'txn_3N8xY2Lkd87sKw1z',
          status: 'paid',
          customer: {
            id: 42,
            name: 'Alex Vance',
            email: 'alex@example.com'
          },
          dispatched_jobs: ['SendOrderConfirmationEmail', 'UpdateInventoryStock']
        }
      }
    },
    {
      id: 'health',
      method: 'GET',
      path: '/api/v1/health/check',
      title: 'Infrastructure Health & Redis Cluster Monitor',
      description: 'Checks database connectivity ping, Redis memory usage, queue backlog depth, and Laravel Horizon status.',
      controllerCode: `<?php

namespace App\\Http\\Controllers\\Api\\V1;

use Illuminate\\Support\\Facades\\DB;
use Illuminate\\Support\\Facades\\Redis;

class HealthController extends Controller
{
    public function check()
    {
        $dbStatus = DB::connection()->getPdo() ? 'healthy' : 'down';
        $redisStatus = Redis::ping() ? 'healthy' : 'down';

        return response()->json([
          'service' => 'Laravel Microservice Engine',
          'status' => 'operational',
          'checks' => [
             'mysql' => $dbStatus,
             'redis' => $redisStatus,
             'horizon_queues' => 'active'
          ]
        ]);
    }
}`,
      databaseSchema: `-- Horizon Metrics Store
SELECT schema_name FROM information_schema.schemata;`,
      mockResponse: {
        status: 200,
        statusText: 'OK',
        timeMs: 8,
        memory: '2.4 MB',
        sqlQueries: [
          { query: 'SELECT 1;', durationMs: 1.1 }
        ],
        body: {
          service: 'Laravel API Gateway',
          status: 'operational',
          uptime: '99.99%',
          environment: 'production',
          checks: {
            mysql_primary: { status: 'healthy', latency_ms: 1.2 },
            redis_cache: { status: 'healthy', memory_used: '142.5 MB' },
            horizon_queues: { status: 'active', pending_jobs: 0 }
          }
        }
      }
    }
  ];

  const currentEndpoint = endpoints[selectedEndpointIndex];

  const handleRunRequest = () => {
    setLoading(true);
    setResponse(null);
    setTimeout(() => {
      setResponse(currentEndpoint.mockResponse);
      setLoading(false);
    }, 400);
  };

  const copyJson = () => {
    if (!response) return;
    navigator.clipboard.writeText(JSON.stringify(response.body, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="api-tester" style={{ padding: '6rem 0', position: 'relative', background: 'var(--bg-tertiary)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">&lt;API_STUDIO /&gt;</span>
          <h2>Interactive <span className="gradient-text">Laravel API Tester</span> & Code Studio</h2>
          <p>
            Experience my backend code in action. Select a route, execute real-time simulated API calls, inspect response headers, query latency, and view clean Laravel Controller implementations.
          </p>
        </div>

        {/* API Playground Grid */}
        <div
          className="glass-card"
          style={{
            display: 'grid',
            gridTemplateColumns: '320px 1fr',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-lg)',
          }}
          className="api-studio-container"
        >
          {/* Left Endpoint List Sidebar */}
          <div
            style={{
              background: 'var(--bg-card)',
              borderRight: '1px solid var(--border-color)',
              padding: '1.5rem',
            }}
          >
            <h4 className="mono" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>
              Endpoints to Test
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {endpoints.map((ep, idx) => {
                const isSelected = selectedEndpointIndex === idx;
                return (
                  <button
                    key={ep.id}
                    onClick={() => {
                      setSelectedEndpointIndex(idx);
                      setResponse(null);
                    }}
                    style={{
                      textAlign: 'left',
                      padding: '0.85rem 1rem',
                      borderRadius: '10px',
                      background: isSelected ? 'rgba(255, 45, 32, 0.1)' : 'var(--bg-main)',
                      border: isSelected ? '1px solid var(--laravel-red)' : '1px solid var(--border-color)',
                      transition: 'all 0.2s ease',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                      <span
                        className="mono"
                        style={{
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          padding: '0.15rem 0.45rem',
                          borderRadius: '4px',
                          background: ep.method === 'GET' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                          color: ep.method === 'GET' ? 'var(--accent-emerald)' : 'var(--accent-amber)',
                          border: ep.method === 'GET' ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(245, 158, 11, 0.3)',
                        }}
                      >
                        {ep.method}
                      </span>
                      <span className="mono" style={{ fontSize: '0.78rem', color: 'var(--text-heading)', fontWeight: 600 }}>
                        {ep.path}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.82rem', color: isSelected ? 'var(--text-heading)' : 'var(--text-muted)', fontWeight: 500 }}>
                      {ep.title}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Quick Metrics Note */}
            <div
              style={{
                marginTop: '2rem',
                padding: '1rem',
                borderRadius: '8px',
                background: 'var(--code-bg)',
                border: '1px solid var(--code-border)',
                fontSize: '0.78rem',
                color: 'var(--text-muted)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--laravel-red)', fontWeight: 600, marginBottom: '0.4rem' }}>
                <Cpu size={14} />
                <span>Laravel Octane Engine</span>
              </div>
              Simulating sub-20ms HTTP response times with zero-downtime queue workers.
            </div>
          </div>

          {/* Right Request / Response / Code Area */}
          <div style={{ background: 'var(--bg-main)', display: 'flex', flexDirection: 'column' }}>
            
            {/* Top Toolbar Tabs */}
            <div
              style={{
                background: 'var(--bg-card)',
                padding: '0.75rem 1.5rem',
                borderBottom: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem',
              }}
            >
              {/* Endpoint URL Pill */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span
                  className="mono"
                  style={{
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    padding: '0.25rem 0.6rem',
                    borderRadius: '4px',
                    background: currentEndpoint.method === 'GET' ? 'var(--accent-emerald)' : 'var(--accent-amber)',
                    color: '#fff',
                  }}
                >
                  {currentEndpoint.method}
                </span>
                <span className="mono" style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-heading)' }}>
                  https://api.poojadev.io{currentEndpoint.path}
                </span>
              </div>

              {/* View Switcher Tabs */}
              <div style={{ display: 'flex', background: 'var(--bg-main)', padding: '3px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                <button
                  onClick={() => setActiveTab('tester')}
                  className="mono"
                  style={{
                    padding: '0.35rem 0.85rem',
                    fontSize: '0.8rem',
                    borderRadius: '6px',
                    background: activeTab === 'tester' ? 'var(--laravel-red)' : 'transparent',
                    color: activeTab === 'tester' ? '#fff' : 'var(--text-muted)',
                    fontWeight: 600,
                  }}
                >
                  API Debugger
                </button>
                <button
                  onClick={() => setActiveTab('controller')}
                  className="mono"
                  style={{
                    padding: '0.35rem 0.85rem',
                    fontSize: '0.8rem',
                    borderRadius: '6px',
                    background: activeTab === 'controller' ? 'var(--laravel-red)' : 'transparent',
                    color: activeTab === 'controller' ? '#fff' : 'var(--text-muted)',
                    fontWeight: 600,
                  }}
                >
                  Controller.php
                </button>
                <button
                  onClick={() => setActiveTab('schema')}
                  className="mono"
                  style={{
                    padding: '0.35rem 0.85rem',
                    fontSize: '0.8rem',
                    borderRadius: '6px',
                    background: activeTab === 'schema' ? 'var(--laravel-red)' : 'transparent',
                    color: activeTab === 'schema' ? '#fff' : 'var(--text-muted)',
                    fontWeight: 600,
                  }}
                >
                  Schema.sql
                </button>
              </div>
            </div>

            {/* Tab 1: API Debugger & Execution */}
            {activeTab === 'tester' && (
              <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '0.4rem' }}>{currentEndpoint.title}</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{currentEndpoint.description}</p>
                </div>

                {/* Send Request Action Bar */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <button
                    onClick={handleRunRequest}
                    disabled={loading}
                    className="btn btn-primary"
                    style={{ minWidth: '160px' }}
                  >
                    {loading ? (
                      <>
                        <RefreshCw size={16} className="animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Play size={16} fill="currentColor" />
                        <span>Send Request</span>
                      </>
                    )}
                  </button>

                  <span className="mono" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Headers: <code style={{ fontSize: '0.75rem' }}>Accept: application/json</code>
                  </span>
                </div>

                {/* Response Output Window */}
                <div
                  style={{
                    background: 'var(--code-bg)',
                    border: '1px solid var(--code-border)',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  {/* Response Header Info Bar */}
                  <div
                    style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      padding: '0.6rem 1rem',
                      borderBottom: '1px solid var(--code-border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <span className="mono" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Response Output:</span>
                      {response && (
                        <>
                          <span
                            className="mono"
                            style={{
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              color: 'var(--accent-emerald)',
                              padding: '0.15rem 0.5rem',
                              borderRadius: '4px',
                              background: 'rgba(16, 185, 129, 0.15)',
                            }}
                          >
                            HTTP {response.status} {response.statusText}
                          </span>
                          <span className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                            <Clock size={13} /> {response.timeMs} ms
                          </span>
                          <span className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                            <Server size={13} /> {response.memory}
                          </span>
                        </>
                      )}
                    </div>

                    {response && (
                      <button
                        onClick={copyJson}
                        className="btn btn-secondary btn-sm mono"
                        style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}
                      >
                        {copied ? <Check size={13} style={{ color: 'var(--accent-emerald)' }} /> : <Copy size={13} />}
                        <span>{copied ? 'Copied' : 'Copy JSON'}</span>
                      </button>
                    )}
                  </div>

                  {/* JSON Response Body */}
                  <div className="mono" style={{ padding: '1.25rem', overflowY: 'auto', maxHeight: '280px', fontSize: '0.82rem', color: '#E2E8F0' }}>
                    {loading ? (
                      <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                        Executing PHP request on virtual server...
                      </div>
                    ) : response ? (
                      <pre style={{ margin: 0, fontFamily: 'var(--font-mono)' }}>
                        {JSON.stringify(response.body, null, 2)}
                      </pre>
                    ) : (
                      <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                        Click <strong>"Send Request"</strong> to execute this API route and view response data & SQL query logs.
                      </div>
                    )}
                  </div>

                  {/* SQL Telescope Query Trace */}
                  {response && (
                    <div style={{ borderTop: '1px solid var(--code-border)', background: '#0F172A', padding: '0.85rem 1.25rem' }}>
                      <div className="mono" style={{ fontSize: '0.75rem', color: 'var(--laravel-red)', fontWeight: 700, marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <Database size={13} />
                        <span>Laravel Telescope SQL Trace ({response.sqlQueries.length} Query Executed)</span>
                      </div>
                      {response.sqlQueries.map((sql, idx) => (
                        <div key={idx} className="mono" style={{ fontSize: '0.75rem', color: '#94A3B8', margin: '0.2rem 0' }}>
                          <span style={{ color: '#38BDF8' }}>[{sql.durationMs}ms]</span> {sql.query}
                        </div>
                      ))}
                    </div>
                  )}

                </div>
              </div>
            )}

            {/* Tab 2: Controller Code View */}
            {activeTab === 'controller' && (
              <div style={{ padding: '1.25rem', flex: 1, overflowY: 'auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span className="mono" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    app/Http/Controllers/Api/V1/{currentEndpoint.id.toUpperCase()}Controller.php
                  </span>
                  <span className="pill pill-status" style={{ fontSize: '0.72rem' }}>PSR-12 Compliant</span>
                </div>
                <div style={{ background: 'var(--code-bg)', border: '1px solid var(--code-border)', borderRadius: '10px', padding: '1.25rem', overflowX: 'auto' }}>
                  <pre className="mono" style={{ margin: 0, fontSize: '0.83rem', lineHeight: '1.6', color: '#E2E8F0' }}>
                    {currentEndpoint.controllerCode}
                  </pre>
                </div>
              </div>
            )}

            {/* Tab 3: Database Schema View */}
            {activeTab === 'schema' && (
              <div style={{ padding: '1.25rem', flex: 1, overflowY: 'auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span className="mono" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    database/migrations/2026_01_01_create_tables.sql
                  </span>
                  <span className="pill" style={{ fontSize: '0.72rem' }}>Indexed InnoDB</span>
                </div>
                <div style={{ background: 'var(--code-bg)', border: '1px solid var(--code-border)', borderRadius: '10px', padding: '1.25rem', overflowX: 'auto' }}>
                  <pre className="mono" style={{ margin: 0, fontSize: '0.83rem', lineHeight: '1.6', color: '#38BDF8' }}>
                    {currentEndpoint.databaseSchema}
                  </pre>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

      <style>{`
        @media (max-width: 992px) {
          .api-studio-container {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
