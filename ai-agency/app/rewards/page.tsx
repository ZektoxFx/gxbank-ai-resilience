'use client';
import { useState } from 'react';
import { startingPoints, vouchers } from '@/lib/data';

const pts = (n: number) => n.toLocaleString('en-MY');

export default function Rewards() {
  const [claimed, setClaimed] = useState<string[]>([]);
  const points = startingPoints - vouchers.filter((v) => claimed.includes(v.id)).reduce((a, v) => a + v.points, 0);
  const expiring = vouchers.filter((v) => v.days <= 3 && !claimed.includes(v.id));

  return (
    <>
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold">Rewards</h1>
          <p className="mt-1 text-sm text-muted">Earn 1 GXPoint for every RM 1 you pay with GXBank.</p>
        </div>
        <div className="text-right" aria-live="polite">
          <p className="text-sm text-muted">GXPoints</p>
          <p className="num text-2xl font-semibold">{pts(points)}</p>
        </div>
      </div>

      <section aria-labelledby="vouchers" className="card mt-6">
        <h2 id="vouchers" className="font-semibold">Vouchers</h2>
        <p className={`mt-1 text-sm ${expiring.length ? 'text-pink' : 'text-muted'}`}>
          {expiring.length
            ? `${expiring.length} expire within 3 days: ${expiring.map((v) => v.brand).join(' and ')}.`
            : 'Nothing expires in the next 3 days.'}
        </p>
        <ul className="mt-3 divide-y divide-line">
          {vouchers.map((v) => {
            const isClaimed = claimed.includes(v.id);
            const short = v.points - points;
            return (
              <li key={v.id} className="flex flex-wrap items-center gap-x-4 gap-y-1 py-3">
                <div className="min-w-48 flex-1">
                  <p className="font-medium">{v.brand}</p>
                  <p className="text-sm text-muted">{v.offer}</p>
                </div>
                <p className={`w-36 text-sm ${v.days <= 3 && !isClaimed ? 'text-pink' : 'text-muted'}`}>
                  {isClaimed ? 'In your wallet' : `Expires in ${v.days} days`}
                </p>
                <p className="num w-20 text-right text-sm">{pts(v.points)} pts</p>
                <button
                  onClick={() => setClaimed((c) => [...c, v.id])}
                  disabled={isClaimed || short > 0}
                  aria-label={`Claim ${v.brand} voucher`}
                  title={short > 0 && !isClaimed ? `${pts(short)} more points needed` : undefined}
                  className="h-9 w-28 rounded-full bg-raised text-sm font-medium transition hover:bg-line focus-visible:outline-2 focus-visible:outline-data active:scale-[.98] disabled:cursor-not-allowed disabled:text-muted disabled:hover:bg-raised"
                >
                  {isClaimed ? 'Claimed' : short > 0 ? 'Not enough' : 'Claim'}
                </button>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}
