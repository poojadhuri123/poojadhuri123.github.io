import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, X, Play, RefreshCw, Sparkles, Copy, Check, Minimize2 } from 'lucide-react';

export default function InteractiveTerminal({ isOpen, onClose }) {
  const [history, setHistory] = useState([
    { type: 'system', content: 'Laravel Framework 11.x (PHP v8.3.4)' },
    { type: 'system', content: 'Type "help" or click one of the pre-set Artisan commands below.' },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [copied, setCopied] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const quickCommands = [
    'php artisan list',
    'php artisan pooja:bio',
    'php artisan pooja:skills',
    'php artisan route:list',
    'php artisan test',
    'php artisan migrate:status',
    'composer show',
    'clear',
  ];

  const handleRunCommand = (cmdStr) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    const newHistory = [...history, { type: 'input', content: trimmed }];

    const lower = trimmed.toLowerCase();

    if (lower === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    }

    let output = [];

    if (lower === 'help' || lower === 'php artisan list') {
      output = [
        'Available Artisan Commands:',
        '  pooja:bio          Display Senior Developer biography & summary',
        '  pooja:skills       Output detailed technical stack & proficiency',
        '  route:list         Display registered RESTful API routes',
        '  test               Run Pest / PHPUnit test suite',
        '  migrate:status     Show database schema migration status',
        '  composer show      List primary composer package dependencies',
        '  clear              Clear terminal history',
      ];
    } else if (lower === 'php artisan pooja:bio') {
      output = [
        '┌─────────────────────────────────────────────────────────────┐',
        '│  POOJA - SENIOR PHP & LARAVEL FULL STACK DEVELOPER          │',
        '└─────────────────────────────────────────────────────────────┘',
        '  Name:         Pooja',
        '  Role:         Senior PHP / Laravel Engineer & API Architect',
        '  Experience:   6+ Years in Enterprise Web & SaaS Backends',
        '  Location:     Mumbai, India (Remote Available Worldwide)',
        '  Specialties:  Laravel 11, PHP 8.3, Eloquent ORM, Livewire,',
        '                MySQL Tuning, Redis Caching, REST/GraphQL,',
        '                Microservices, Docker, Vue/React Integrations.',
        '  Email:        pooja.laravel.dev@gmail.com',
        '  GitHub:       https://github.com/pooja-laravel',
      ];
    } else if (lower === 'php artisan pooja:skills') {
      output = [
        '+--------------------+-----------------------+-------------+',
        '| Tech Category      | Core Skills           | Level       |',
        '+--------------------+-----------------------+-------------+',
        '| Backend Core       | PHP 8.3, Laravel 11   | Expert      |',
        '| Full-Stack Engine  | Livewire 3, Filament  | Advanced    |',
        '| Database           | MySQL, PostgreSQL     | Expert      |',
        '| Caching & Queues   | Redis, SQS, Horizon   | Expert      |',
        '| Testing            | Pest PHP, PHPUnit     | Advanced    |',
        '| Frontend           | React, Vue, Inertia   | Advanced    |',
        '| Cloud & DevOps     | Docker, AWS, Nginx    | Proficient  |',
        '+--------------------+-----------------------+-------------+',
      ];
    } else if (lower === 'php artisan route:list') {
      output = [
        '  GET|HEAD   /                             ...................... home',
        '  GET|HEAD   api/v1/health                 .......... HealthCheckController',
        '  POST       api/v1/auth/login             ............... AuthController@login',
        '  GET|HEAD   api/v1/projects               ............ ProjectController@index',
        '  GET|HEAD   api/v1/orders/analytics       ............ OrderController@analytics',
        '  POST       api/v1/checkout               ........... CheckoutController@process',
        '  POST       api/v1/webhooks/stripe        ............ StripeWebhookHandler',
      ];
    } else if (lower === 'php artisan test') {
      output = [
        '   PASS  Tests\\Unit\\OrderServiceTest',
        '  ✓ order service calculates tax and applies promo code .. 0.08s',
        '  ✓ order events trigger queued email notifications ...... 0.05s',
        '',
        '   PASS  Tests\\Feature\\ApiAuthTest',
        '  ✓ user can authenticate via sanctum token .............. 0.12s',
        '  ✓ rate limiter blocks excessive failed attempts ........ 0.04s',
        '',
        '   PASS  Tests\\Feature\\DatabaseOptimizationTest',
        '  ✓ eloquent eager loading avoids N+1 queries ............ 0.02s',
        '',
        '  Tests:    14 passed (32 assertions)',
        '  Duration: 0.41s',
      ];
    } else if (lower === 'php artisan migrate:status') {
      output = [
        '+------+----------------------------------------------------+-------+',
        '| Ran? | Migration                                          | Batch |',
        '+------+----------------------------------------------------+-------+',
        '| Yes  | 2024_01_01_000000_create_users_table               | 1     |',
        '| Yes  | 2024_01_01_000001_create_orders_table              | 1     |',
        '| Yes  | 2024_01_01_000002_create_jobs_and_batches_table    | 1     |',
        '| Yes  | 2024_01_01_000003_create_personal_access_tokens    | 1     |',
        '+------+----------------------------------------------------+-------+',
      ];
    } else if (lower === 'composer show' || lower === 'composer show --installed') {
      output = [
        'laravel/framework           v11.5.0   The Laravel Framework.',
        'laravel/sanctum             v4.0.0    Laravel Sanctum API Auth.',
        'laravel/octane              v2.3.0    Supercharge performance.',
        'inertiajs/inertia-laravel   v1.0.0    Inertia.js Laravel Adapter.',
        'pestphp/pest                v2.34.0   The elegant PHP Testing Framework.',
        'predis/predis               v2.2.0    Flexible Redis client for PHP.',
      ];
    } else {
      output = [
        `Command "${trimmed}" not recognized.`,
        'Type "php artisan list" to view available options.',
      ];
    }

    output.forEach((line) => {
      newHistory.push({ type: 'output', content: line });
    });

    setHistory(newHistory);
    setInputVal('');
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleRunCommand(inputVal);
  };

  const copyHistoryText = () => {
    const text = history.map((h) => h.content).join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="modal-overlay">
      <div
        className="modal-content glow-box"
        style={{
          maxWidth: '850px',
          background: '#090D16',
          border: '1px solid #1E293B',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
          borderRadius: '16px',
          overflow: 'hidden',
        }}
      >
        {/* Terminal Titlebar */}
        <div
          style={{
            background: '#131B2A',
            padding: '0.75rem 1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid #1E293B',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{ display: 'flex', gap: '6px' }}>
              <span
                onClick={onClose}
                style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FF5F56', cursor: 'pointer' }}
                title="Close"
              ></span>
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FFBD2E' }}></span>
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27C93F' }}></span>
            </div>
            <span className="mono" style={{ fontSize: '0.85rem', color: '#94A3B8', marginLeft: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <TerminalIcon size={14} style={{ color: 'var(--laravel-red)' }} />
              pooja@laravel-app: ~/artisan-studio
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              onClick={copyHistoryText}
              className="btn btn-secondary btn-sm mono"
              style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem', background: '#1E293B', color: '#94A3B8' }}
            >
              {copied ? <Check size={13} style={{ color: 'var(--accent-emerald)' }} /> : <Copy size={13} />}
              <span>{copied ? 'Copied' : 'Copy Log'}</span>
            </button>
            <button onClick={onClose} style={{ color: '#94A3B8', padding: '0.2rem' }}>
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Quick Click Command Buttons */}
        <div
          style={{
            background: '#0F172A',
            padding: '0.6rem 1rem',
            borderBottom: '1px solid #1E293B',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            overflowX: 'auto',
          }}
        >
          <span className="mono" style={{ fontSize: '0.75rem', color: 'var(--laravel-red)', fontWeight: 600, flexShrink: 0 }}>
            Quick Commands:
          </span>
          {quickCommands.map((cmd) => (
            <button
              key={cmd}
              onClick={() => handleRunCommand(cmd)}
              className="mono"
              style={{
                fontSize: '0.75rem',
                padding: '0.2rem 0.6rem',
                borderRadius: '4px',
                background: '#1E293B',
                color: '#E2E8F0',
                border: '1px solid #334155',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--laravel-red)';
                e.currentTarget.style.color = 'var(--laravel-red)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#334155';
                e.currentTarget.style.color = '#E2E8F0';
              }}
            >
              {cmd}
            </button>
          ))}
        </div>

        {/* Terminal Screen Body */}
        <div
          className="mono"
          style={{
            padding: '1.25rem',
            minHeight: '340px',
            maxHeight: '480px',
            overflowY: 'auto',
            fontSize: '0.85rem',
            lineHeight: '1.6',
            color: '#F1F5F9',
          }}
        >
          {history.map((item, index) => {
            if (item.type === 'input') {
              return (
                <div key={index} style={{ margin: '0.4rem 0', color: '#F1F5F9' }}>
                  <span style={{ color: 'var(--laravel-red)', fontWeight: 700 }}>pooja@laravel:~$</span> {item.content}
                </div>
              );
            } else if (item.type === 'system') {
              return (
                <div key={index} style={{ color: '#64748B', fontStyle: 'italic' }}>
                  // {item.content}
                </div>
              );
            } else {
              return (
                <div key={index} style={{ color: '#38BDF8', whiteSpace: 'pre-wrap' }}>
                  {item.content}
                </div>
              );
            }
          })}

          {/* Active Input Line */}
          <form onSubmit={handleFormSubmit} style={{ display: 'flex', alignItems: 'center', marginTop: '0.5rem' }}>
            <span style={{ color: 'var(--laravel-red)', fontWeight: 700, marginRight: '0.5rem' }}>pooja@laravel:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Type 'php artisan list'..."
              className="mono"
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#FFFFFF',
                fontSize: '0.85rem',
              }}
            />
            <button type="submit" style={{ display: 'none' }}>Run</button>
          </form>

          <div ref={bottomRef} />
        </div>

        {/* Footer Hint */}
        <div
          style={{
            background: '#0F172A',
            padding: '0.5rem 1.25rem',
            borderTop: '1px solid #1E293B',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.75rem',
            color: '#64748B',
          }}
          className="mono"
        >
          <span>Press ENTER to execute • Type "clear" to reset screen</span>
          <span style={{ color: 'var(--accent-emerald)' }}>🟢 Artisan Runtime Active</span>
        </div>

      </div>
    </div>
  );
}
