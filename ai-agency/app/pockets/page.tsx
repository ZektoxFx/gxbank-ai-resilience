import { POCKET_RATE, monthlyInterest, pocketTotal, pockets, rm } from '@/lib/data';

export const metadata = { title: 'Pockets · GXBank' };

export default function Pockets() {
  return (
    <>
      <h1 className="text-xl font-semibold">Pockets</h1>
      <p className="mt-1 text-sm text-muted">
        <span className="num">{rm(pocketTotal)}</span> across {pockets.length} pockets at {POCKET_RATE}% p.a. About{' '}
        <span className="num">{rm(monthlyInterest)}</span> interest this month, credited on the 1st.
      </p>
      <ul className="mt-6 grid gap-4 md:grid-cols-3">
        {pockets.map((p) => {
          const pct = Math.round((p.balance / p.goal) * 100);
          return (
            <li key={p.name} className="card">
              <h2 className="font-semibold">{p.name}</h2>
              <p className="num mt-3 text-2xl font-semibold">{rm(p.balance)}</p>
              <p className="num text-sm text-muted">of {rm(p.goal)} goal</p>
              <div
                role="progressbar"
                aria-label={`${p.name} progress`}
                aria-valuenow={pct}
                aria-valuemin={0}
                aria-valuemax={100}
                className="mt-4 h-2 rounded-full bg-raised"
              >
                <div className="h-full rounded-full bg-data" style={{ width: `${(p.balance / p.goal) * 100}%` }} />
              </div>
              <p className="num mt-2 flex justify-between text-sm text-muted">
                <span>{pct}% saved</span>
                <span>{rm(p.goal - p.balance)} to go</span>
              </p>
            </li>
          );
        })}
      </ul>
    </>
  );
}
