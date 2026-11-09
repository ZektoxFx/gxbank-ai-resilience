'use client';
import { useState } from 'react';
import { DAILY_LIMIT, mainBalance, recipients, rm } from '@/lib/data';

const r2 = (n: number) => Math.round(n * 100) / 100;
const field = 'mt-2 h-10 w-full rounded-lg bg-raised px-3 placeholder:text-faint focus:outline-2 focus:outline-data aria-invalid:outline-2 aria-invalid:outline-pink';

// Demo only: nothing leaves the browser. Validation mirrors what the real transfer API must enforce.
export default function Transfer() {
  const [account, setAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [reference, setReference] = useState('');
  const [sentToday, setSentToday] = useState(0);
  const [errors, setErrors] = useState<{ account?: string; amount?: string }>({});
  const [done, setDone] = useState<{ to: string; amount: number; reference: string } | null>(null);

  const available = r2(mainBalance - sentToday);
  const limitLeft = r2(DAILY_LIMIT - sentToday);
  const acct = account.replace(/\s/g, '');
  const payee = recipients.find((r) => r.account === acct);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const value = Number(amount.trim());
    const next: typeof errors = {};
    if (!/^\d{10,16}$/.test(acct)) next.account = 'Enter a 10 to 16 digit account number.';
    if (!/^\d+(\.\d{1,2})?$/.test(amount.trim()) || value <= 0) next.amount = 'Enter an amount like 50 or 50.00.';
    else if (value > available) next.amount = `That's more than your available ${rm(available)}.`;
    else if (value > limitLeft) next.amount = `That's over today's remaining limit of ${rm(limitLeft)}.`;
    setErrors(next);
    if (next.account || next.amount) return;
    setSentToday((s) => r2(s + value));
    setDone({ to: payee ? `${payee.name} (${payee.bank})` : acct, amount: value, reference: reference.trim() });
    setAccount('');
    setAmount('');
    setReference('');
  }

  return (
    <>
      <h1 className="text-xl font-semibold">Transfer</h1>
      <p className="mt-1 text-sm text-muted">Send money instantly to any bank account in Malaysia.</p>

      <div className="mt-6 grid items-start gap-4 md:grid-cols-[3fr_2fr]">
        <section aria-labelledby="details" className="card" aria-live="polite">
          <h2 id="details" className="font-semibold">Transfer details</h2>
          {done ? (
            <div className="mt-4">
              <p className="text-lg">
                Sent <span className="num font-semibold text-positive">{rm(done.amount)}</span> to {done.to}.
              </p>
              {done.reference && <p className="mt-1 text-sm text-muted">Reference: {done.reference}</p>}
              <button onClick={() => setDone(null)} className="btn mt-5 inline-flex">Make another transfer</button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="mt-4 grid gap-4">
              <label className="block text-sm font-medium">
                Account number
                <input
                  value={account}
                  onChange={(e) => setAccount(e.target.value)}
                  inputMode="numeric"
                  autoComplete="off"
                  aria-invalid={!!errors.account}
                  aria-describedby="account-hint"
                  className={field}
                />
                <span id="account-hint" className={`mt-1 block font-normal ${errors.account ? 'text-pink' : 'text-muted'}`}>
                  {errors.account ?? (payee ? `${payee.name}, ${payee.bank}` : '10 to 16 digits, spaces are fine.')}
                </span>
              </label>
              <label className="block text-sm font-medium">
                Amount (RM)
                <input
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  inputMode="decimal"
                  placeholder="0.00"
                  aria-invalid={!!errors.amount}
                  aria-describedby="amount-hint"
                  className={`num ${field}`}
                />
                <span id="amount-hint" className={`num mt-1 block font-normal ${errors.amount ? 'text-pink' : 'text-muted'}`}>
                  {errors.amount ?? `Available ${rm(available)} · ${rm(limitLeft)} left of today's limit`}
                </span>
              </label>
              <label className="block text-sm font-medium">
                Reference <span className="font-normal text-muted">(optional)</span>
                <input value={reference} onChange={(e) => setReference(e.target.value)} maxLength={20} className={field} />
              </label>
              <button className="btn mt-1 inline-flex w-full sm:w-auto sm:justify-self-start">Transfer now</button>
            </form>
          )}
        </section>

        <section aria-labelledby="recent" className="card">
          <h2 id="recent" className="font-semibold">Recent recipients</h2>
          <ul className="mt-3 grid gap-1">
            {recipients.map((r) => (
              <li key={r.account}>
                <button
                  onClick={() => { setDone(null); setAccount(r.account); setErrors({}); }}
                  className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left transition hover:bg-raised focus-visible:outline-2 focus-visible:outline-data"
                >
                  <span className="flex size-9 flex-none items-center justify-center rounded-full bg-raised text-xs font-medium">
                    {r.name.split(' ').map((w) => w[0]).join('')}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-medium">{r.name}</span>
                    <span className="num block text-sm text-muted">{r.bank} · {r.account}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
