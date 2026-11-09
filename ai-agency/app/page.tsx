'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Banknote, Search } from 'lucide-react';
import {
  mainBalance, pocketTotal, rm, salary, scenarios, spending, streakMonths, totalBalance, transactions,
  type ScenarioKey,
} from '@/lib/data';

type Nudge = { id: number; key: ScenarioKey; text: string; source: 'ai' | 'offline' };

const top = spending.parts.reduce((a, b) => (b.amount > a.amount ? b : a));

export default function Home() {
  const [query, setQuery] = useState('');
  const [nudges, setNudges] = useState<Nudge[]>([]);
  const [busy, setBusy] = useState<ScenarioKey | null>(null);
  const [error, setError] = useState('');

  async function run(key: ScenarioKey) {
    setBusy(key);
    setError('');
    try {
      const res = await fetch(`/api/nudge/${key}`);
      if (!res.ok) throw new Error(String(res.status));
      const { text, source } = await res.json();
      setNudges((n) => [{ id: Date.now(), key, text, source }, ...n]);
    } catch {
      setError(`Couldn't reach GX.AI for "${scenarios[key].label}". Try again.`);
    } finally {
      setBusy(null);
    }
  }

  const q = query.trim().toLowerCase();
  const shown = transactions.filter((t) => `${t.name} ${t.category}`.toLowerCase().includes(q));

  return (
    <>
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold">Personal account</h1>
          <p className="mt-1 text-sm text-muted">
            Your salary landed today. {top.label} is {Math.round((top.amount / spending.total) * 100)}% of{' '}
            {spending.month} spending, the biggest share.
          </p>
        </div>
        <Link href="/transfer" className="btn hidden sm:inline-flex">Transfer</Link>
      </div>

      <div className="mt-6 grid items-start gap-4 lg:grid-cols-[2fr_1fr]">
        <div className="grid gap-4">
          <section aria-labelledby="balance" className="card">
            <h2 id="balance" className="text-sm text-muted">Total balance</h2>
            <p className="num mt-1 text-3xl font-semibold">{rm(totalBalance)}</p>
            <p className="mt-1 text-sm text-muted">
              <span className="num text-positive">+{rm(salary)}</span> salary received today
            </p>
            <dl className="mt-5 grid grid-cols-1 divide-y divide-line rounded-xl bg-raised sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {[
                ['Main account', rm(mainBalance)],
                ['Pockets', rm(pocketTotal)],
                [`Spent in ${spending.month}`, rm(spending.total)],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between px-4 py-3 sm:block">
                  <dt className="text-sm text-muted">{label}</dt>
                  <dd className="num font-medium sm:mt-1">{value}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section aria-labelledby="ai" className="card">
            <h2 id="ai" className="font-semibold">GX.AI resilience engine</h2>
            <p className="mt-1 text-sm text-muted">
              Savings streak: {streakMonths} months. Run a check and GX.AI suggests one move to protect it.
            </p>
            <div className="mt-4 grid gap-2 sm:grid-cols-3">
              {(Object.keys(scenarios) as ScenarioKey[]).map((key) => (
                <button
                  key={key}
                  onClick={() => run(key)}
                  disabled={busy !== null}
                  className="rounded-xl bg-raised px-4 py-3 text-left transition hover:bg-line focus-visible:outline-2 focus-visible:outline-data active:scale-[.98] disabled:opacity-60"
                >
                  <span className="block font-medium">{busy === key ? 'Checking…' : scenarios[key].label}</span>
                  <span className="num mt-0.5 block text-sm text-muted">{scenarios[key].hint}</span>
                </button>
              ))}
            </div>
            <div aria-live="polite" className="mt-4 grid gap-2">
              {error && <p className="text-sm text-pink">{error}</p>}
              {nudges.length === 0 && !error && (
                <p className="rounded-xl border border-dashed border-line px-4 py-3 text-sm text-muted">
                  No checks yet. Start with your weekend spending.
                </p>
              )}
              {nudges.map((n) => (
                <article key={n.id} className="rounded-xl border-l-2 border-data bg-raised px-4 py-3">
                  <p className="flex flex-wrap items-center gap-2 text-sm text-muted">
                    {scenarios[n.key].label}
                    {n.source === 'offline' && (
                      <span className="rounded-full bg-line px-2 py-0.5 text-xs">Offline answer</span>
                    )}
                  </p>
                  <p className="mt-1">{n.text}</p>
                </article>
              ))}
            </div>
          </section>
        </div>

        <div className="grid gap-4">
          <section aria-labelledby="spend" className="card">
            <div className="flex items-baseline justify-between">
              <h2 id="spend" className="font-semibold">{spending.month} spending</h2>
              <span className="num font-medium">{rm(spending.total)}</span>
            </div>
            <ul className="mt-4 grid gap-3">
              {spending.parts.map((p) => (
                <li key={p.label}>
                  <div className="flex justify-between text-sm">
                    <span>{p.label}</span>
                    <span className="num text-muted">{rm(p.amount)}</span>
                  </div>
                  <div className="mt-1.5 h-1.5 rounded-full bg-raised">
                    <div className="h-full rounded-full bg-data" style={{ width: `${(p.amount / top.amount) * 100}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="tx" className="card">
            <h2 id="tx" className="font-semibold">Recent transactions</h2>
            <label className="relative mt-3 block">
              <span className="sr-only">Search transactions</span>
              <Search size={14} aria-hidden className="absolute top-1/2 left-3 -translate-y-1/2 text-faint" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name or category"
                className="h-9 w-full rounded-lg bg-raised pr-3 pl-9 text-sm placeholder:text-faint focus:outline-2 focus:outline-data"
              />
            </label>
            <ul className="mt-2">
              {shown.map((t) => (
                <li key={t.id} className="flex items-center gap-3 py-2.5">
                  <span className="flex size-9 flex-none items-center justify-center overflow-hidden rounded-full bg-white">
                    {t.logo ? (
                      // eslint-disable-next-line @next/next/no-img-element -- tiny local logos, no optimisation needed
                      <img src={t.logo} alt="" className="size-6 object-contain" />
                    ) : (
                      <Banknote size={18} strokeWidth={1.5} className="text-ground" aria-hidden />
                    )}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-medium">{t.name}</span>
                    <span className="block truncate text-sm text-muted">{t.when} · {t.category}</span>
                  </span>
                  <span className={`num flex-none font-medium ${t.amount > 0 ? 'text-positive' : ''}`}>
                    {t.amount > 0 ? '+' : ''}{rm(t.amount)}
                  </span>
                </li>
              ))}
              {shown.length === 0 && <li className="py-3 text-sm text-muted">No transactions match “{query}”.</li>}
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}
