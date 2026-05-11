'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { size } from 'zod';

/* ─── DATA ─────────────────────────────────────────────── */
const TRANSACTIONS = [
  { name: '‎ ‎ Grab Food', cat: 'Food & Drinks', amt: -24.50,  icon: '\\logos\\grab-food.png', date: '‎ ‎ Today, 12:34 PM', clr: '#F472B6' },
  { name: '‎ ‎ Salary Credit', cat: 'Income', amt: 3980.20, icon: '\\logos\\salary-credit.jpg', date: '‎ ‎ Today, 9:00 AM', clr: '#34D399' },
  { name: '‎ ‎ Netflix', cat: 'Subscriptions', amt: -17.00,  icon: '\\logos\\netflix.png', date: '‎ ‎ Yesterday', clr: '#F87171' },
  { name: '‎ ‎ Shopee', cat: 'Shopping', amt: -89.90,  icon: '\\logos\\shopee.png', date: '‎ ‎ Yesterday', clr: '#FB923C' },
  { name: "‎ ‎ Touch 'n Go", cat: 'Transport', amt: -30.00,  icon: '\\logos\\touchngo.png', date: '‎ ‎ 8 May', clr: '#60A5FA' },
];

const BARS = [
  { label: 'Food', pct: 42, clr: '#A78BFA' },
  { label: 'Shopping', pct: 31, clr: '#F472B6' },
  { label: 'Transport',pct: 16, clr: '#34D399' },
  { label: 'Other', pct: 11, clr: '#60A5FA' },
];

const INSIGHTS = [
  { label: 'Savings Rate', val: '23%', sub: 'of income saved', clr: '#A78BFA' },
  { label: 'Streak', val: '7 month', sub: 'savings protected', clr: '#FB923C' },
  { label: 'Subscriptions', val: 'RM85', sub: 'can be optimised', clr: '#F472B6' },
];

/* ─── ICONS (filled Heroicons — 100 % reliable) ────────── */
const HomeIco = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" width="18" height="18">
    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
  </svg>
);
const WalletIco = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" width="18" height="18">
    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"/>
    <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd"/>
  </svg>
);
const SwapIco = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" width="18" height="18">
    <path d="M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8zM12 15a1 1 0 100-2H6.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 15H12z"/>
  </svg>
);
const StarIco = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" width="18" height="18">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
  </svg>
);
const SearchIco = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" width="18" height="18">
    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"/>
  </svg>
);

const NAV = [
  { key: 'Home',     Ico: HomeIco },
  { key: 'Pockets',  Ico: WalletIco },
  { key: 'Transfer', Ico: SwapIco },
  { key: 'Rewards',  Ico: StarIco },
  { key: 'Discover', Ico: SearchIco },
];

/* ─── COMPONENT ─────────────────────────────────────────── */
export default function GXBankDashboard() {
  const [activeNav, setActiveNav] = useState('Home');
  const [logs, setLogs] = useState<{ text: string; kind: 'sys' | 'ai' }[]>([
    { text: '> GX.AI Neural Sync established. Awaiting context data...', kind: 'sys' },
  ]);
  const [loading, setLoading] = useState(false);

  const runScenario = (key: string) => {
    if (loading) return;
    setLogs(p => [...p, { text: `> Analyzing Data Vector: [${key}]...`, kind: 'sys' }]);
    setLoading(true);
    setTimeout(() => {
      const R: Record<string, string> = {
        Weekend: '✦ GX_NUDGE — High velocity weekend spending detected (RM150). Diverting RM50 to Emergency Pocket to protect your 3-month savings streak.',
        Audit:   '✦ GX_AUDIT — Found 3 dormant subscriptions (RM85/mo). Cancellation queued. Funds redirected to High-Yield Pocket at 3.55% p.a.',
        Salary:  '✦ GX_AUTO — Salary inflow: RM3,980.20. Auto-routing 20% (RM796.04) into High-Yield Pockets. Your savings streak is now 4 months strong.',
      };
      setLogs(p => [...p, { text: R[key], kind: 'ai' }]);
      setLoading(false);
    }, 1400);
  };

  /* ── shared card style ── */
  const glassCard: React.CSSProperties = {
    background: 'rgba(255,255,255,0.065)',
    border: '1px solid rgba(167,139,250,0.18)',
    backdropFilter: 'blur(14px)',
    borderRadius: 18,
  };

  return (
    /*
      body = h-screen w-screen overflow-hidden  →  child must be h-full w-full
      We also add overflow-hidden here so each inner panel handles its own scroll.
    */
    <div className="h-full w-full flex overflow-hidden">

      {/* ══ SIDEBAR ══ */}
      <aside
        className="flex-shrink-0 flex flex-col items-center py-6 gap-1"
        style={{ width: 70, background: '#0D0621', borderRight: '1px solid rgba(109,40,217,0.22)' }}
      >
        {/* Logo */}
        <img
          src="/gxbank-logo.png"
          alt="GX Bank"
          className="mb-7 flex-shrink-0"
          style={{ width: 42, height: 42, borderRadius: 13, objectFit: 'contain' }}
        />

        {NAV.map(({ key, Ico }) => {
          const active = activeNav === key;
          return (
            <button
              key={key}
              title={key}
              onClick={() => setActiveNav(key)}
              className="flex items-center justify-center flex-shrink-0 transition-all duration-200"
              style={{
                width: 42, height: 42, borderRadius: 12,
                color: active ? '#C4B5FD' : 'rgba(255,255,255,0.3)',
                background: active ? 'rgba(109,40,217,0.32)' : 'transparent',
                boxShadow: active ? 'inset 0 0 0 1px rgba(167,139,250,0.25)' : 'none',
              }}
            >
              <Ico />
            </button>
          );
        })}

        <div className="flex-1" />

        {/* Avatar */}
        <div
          className="flex items-center justify-center font-bold text-white text-[11px] flex-shrink-0"
          style={{
            width: 34, height: 34, borderRadius: '50%',
            background: 'linear-gradient(135deg,#C084FC,#7C3AED)',
            border: '2px solid rgba(124,58,237,0.45)',
          }}
        >
          MI
        </div>
      </aside>

      {/* ══ MAIN ══ */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">

        {/* ── HERO ── */}
        <div
          className="flex-shrink-0 relative overflow-hidden"
          style={{ background: 'linear-gradient(130deg,#4C1D95 0%,#3B0764 35%,#1E0B3E 65%,#0D0621 100%)' }}
        >
          {/* glow blobs */}
          <div className="absolute inset-0 pointer-events-none">
            <div style={{ position:'absolute', top:-90, left:-50, width:580, height:440, background:'radial-gradient(ellipse,rgba(167,139,250,0.28) 0%,transparent 65%)' }}/>
            <div style={{ position:'absolute', top:-20, right:160, width:460, height:340, background:'radial-gradient(ellipse,rgba(236,72,153,0.2) 0%,transparent 60%)' }}/>
          </div>

          <div className="relative px-12 pt-10 pb-10">

            {/* top row */}
            <div className="flex items-center justify-between mb-10">
              <div>
                <p style={{ fontSize:11, fontWeight:700, letterSpacing:'0.16em', color:'rgba(196,181,253,0.6)', textTransform:'uppercase', marginBottom:4 }}>
                  ‎ ‎ Personal Account
                </p>
                <p style={{ fontSize:15, fontWeight:500, color:'rgba(255,255,255,0.87)' }}>
                  ‎ ‎ Good morning, Mr. Ikhwan 👋
                </p>
              </div>
              <div className="flex gap-2">
                {['🔔','?'].map(ic => (
                  <button key={ic}
                    className="flex items-center justify-center text-sm transition-all"
                    style={{ width:36, height:36, borderRadius:10, background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.1)', color:'rgba(255,255,255,0.45)' }}>
                    {ic}
                  </button>
                ))}
              </div>
            </div>

            {/* balance + subcards */}
            <div className="flex items-end gap-20 mb-10">

              {/* big balance */}
              <div style={{ flexShrink:0, minWidth:260 }}>
                <p style={{ fontSize:11, fontWeight:700, letterSpacing:'0.16em', color:'rgba(196,181,253,0.55)', textTransform:'uppercase', marginBottom:18 }}>
                  ‎ ‎ Total Balance
                </p>
                <div className="flex items-baseline gap-1" style={{ marginBottom:18 }}>
                  <span style={{ fontSize:24, fontWeight:400, color:'rgba(255,255,255,0.45)' }}>‎ RM</span>
                  <span style={{ fontSize:68, fontWeight:900, lineHeight:1, letterSpacing:'-3px', color:'#fff' }}>14,875</span>
                  <span style={{ fontSize:30, fontWeight:300, color:'rgba(255,255,255,0.45)' }}>.71</span>
                </div>
                <div className="flex items-center gap-2">
                  <span style={{ fontSize:17, fontWeight:500, color:'rgba(52,211,153,0.92)' }}> ‎ ‎ + RM 3,980.20 salary received today</span>
                </div>
              </div>

              {/* sub cards */}
              <div className="flex gap-5 flex-1 min-w-0">
                {[
                  { label:'Main Account',     val:'RM 14,722.63', foot:'View transactions →', badge:null,         bar:false },
                  { label:'Pockets',          val:'RM 153.08',    foot:'Earning interest →',  badge:'3.55% p.a.', bar:false },
                  { label:'Spent This Month', val:'RM 1,284.30',  foot:null,                  badge:null,         bar:true  },
                ].map(c => (
                  <div
                    key={c.label}
                    className="flex-1 min-w-0 cursor-pointer relative overflow-hidden transition-all duration-150"
                    style={{ ...glassCard, padding:'16px 18px' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.11)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.065)'; }}
                  >
                    {c.badge && (
                      <span style={{ position:'absolute', top:10, right:10, fontSize:10, fontWeight:700, padding:'3px 8px', borderRadius:99, background:'rgba(52,211,153,0.15)', color:'#34D399', border:'1px solid rgba(52,211,153,0.28)' }}>
                        {c.badge}
                      </span>
                    )}
                    <p style={{ fontSize:10, fontWeight:700, letterSpacing:'0.14em', color:'rgba(196,181,253,0.48)', textTransform:'uppercase', marginBottom:10 }}>{c.label}</p>
                    <p style={{ fontSize:19, fontWeight:800, color:'#fff', marginBottom:8 }}>{c.val}</p>
                    {c.bar && (
                      <div style={{ display:'flex', height:4, borderRadius:99, overflow:'hidden', gap:2 }}>
                        {BARS.map(b => <div key={b.label} style={{ flex:b.pct, background:b.clr }}/>)}
                      </div>
                    )}
                    {c.foot && <p style={{ fontSize:11, color:'rgba(167,139,250,0.6)' }}>{c.foot}</p>}
                  </div>
                ))}
              </div>
            </div>

            {/* quick actions */}
            <div className="flex flex-row items-center gap-6">
              {[{l:'Add Money'},{l:'Scan QR'},{l:'Send Money'},{l:'More'}].map(a => (
                <button key={a.l}
                  className="flex items-center gap-2.5 font-medium transition-all duration-150"
                  style={{ padding:'11px 22px', borderRadius:200, fontSize:14, background:'rgba(255,255,255,0.07)', border:'1px solid rgba(109,40,217,0.38)', color:'rgba(255,255,255,0.78)' }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.13)';
                    (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(167,139,250,0.5)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.07)';
                    (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(109,40,217,0.38)';
                  }}
                >
                  <span style={{ color:'#A78BFA', fontWeight:800 }}></span>{a.l}
                </button>
              ))}
            </div>

          </div>
        </div>

        {/* ── CONTENT ROW ── */}
        <div className="flex flex-1 min-h-0 overflow-hidden" style={{ borderTop: '1px solid rgba(109,40,217,0.22)' }}>

          {/* ─ LEFT: Transactions ─ */}
          <div
            className="flex flex-col overflow-y-auto custom-scrollbar flex-shrink-0"
            style={{ width:370, background:'#0E0826', borderRight:'1px solid rgba(109,40,217,0.16)' }}
          >
            {/* sticky header */}
            <div
              className="flex items-center justify-between flex-shrink-0"
              style={{ padding:'24px 24px 14px', position:'sticky', top:0, background:'#0E0826', zIndex:10 }}
            >
              <h3 style={{ fontSize:15, fontWeight:700, color:'#fff' }}>Recent Transactions</h3>
              <button style={{ fontSize:12, fontWeight:700, color:'#A78BFA' }}>View all →</button>
            </div>

            {/* list */}
            <div style={{ padding:'4px 12px' }}>
              {TRANSACTIONS.map((tx, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity:0, x:-12 }}
                  animate={{ opacity:1, x:0 }}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-center gap-4 cursor-pointer transition-all"
                  style={{ padding:'15px 14px', borderRadius:14, marginBottom:4 }}
                  onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = 'rgba(109,40,217,0.14)'}
                  onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = 'transparent'}
                >
                  {/* icon chip */}
                  <div
                    className="flex items-center justify-center flex-shrink-0"
                    style={{ width:46, height:46, borderRadius:14, background:'rgba(255,255,255,0.05)', border:`1px solid ${tx.clr}35`, overflow:'hidden' }}
                  >
                    <img src={tx.icon} alt={tx.name} style={{ width:28, height:28, objectFit:'contain' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p style={{ fontSize:14, fontWeight:600, color:'rgba(255,255,255,0.92)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', marginBottom:4 }}>{tx.name}</p>
                    <p style={{ fontSize:12, color:'rgba(255,255,255,0.32)' }}>{tx.date} · {tx.cat}</p>
                  </div>
                  <p style={{ fontSize:14, fontWeight:700, color: tx.amt > 0 ? '#34D399' : 'rgba(255,255,255,0.85)', flexShrink:0 }}>
                    {tx.amt > 0 ? '+' : '−'}RM{Math.abs(tx.amt).toFixed(2)}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* spending card */}
            <div style={{ margin:'8px 14px 18px', padding:'18px 18px', borderRadius:18, background:'#150C35', border:'1px solid rgba(109,40,217,0.28)', flexShrink:0 }}>
              <div className="flex items-center justify-between" style={{ marginBottom:14 }}>
                <p style={{ fontSize:10, fontWeight:700, letterSpacing:'0.13em', color:'rgba(167,139,250,0.5)', textTransform:'uppercase' }}>May Spending</p>
                <p style={{ fontSize:13, fontWeight:700, color:'#fff' }}>RM1,284.30</p>
              </div>
              {/* bar */}
              <div style={{ display:'flex', height:8, borderRadius:99, overflow:'hidden', gap:2, marginBottom:14 }}>
                {BARS.map(b => <div key={b.label} style={{ flex:b.pct, background:b.clr }}/>)}
              </div>
              {/* legend */}
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px 6px' }}>
                {BARS.map(b => (
                  <div key={b.label} className="flex items-center gap-2">
                    <div style={{ width:8, height:8, borderRadius:'50%', background:b.clr, flexShrink:0 }}/>
                    <span style={{ fontSize:11, color:'rgba(255,255,255,0.38)' }}>{b.label}</span>
                    <span style={{ fontSize:11, fontWeight:600, color:'rgba(255,255,255,0.65)', marginLeft:'auto' }}>{b.pct}%</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* ─ RIGHT: GX.AI ─ */}
          <div className="flex-1 flex flex-col overflow-hidden min-w-0" style={{ background:'#0C0720' }}>

            {/* AI panel header */}
            <div
              className="flex items-center justify-between flex-shrink-0"
              style={{ padding:'22px 32px 20px', borderBottom:'1px solid rgba(109,40,217,0.16)' }}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className="flex items-center justify-center font-black text-white flex-shrink-0"
                  style={{ width:42, height:42, borderRadius:13, fontSize:11, background:'linear-gradient(135deg,#9333EA,#6D28D9)', boxShadow:'0 0 22px rgba(147,51,234,0.42)' }}
                >
                  AI
                </div>
                <div className="min-w-0">
                  <p style={{ fontSize:20, fontWeight:700, color:'#fff' }}>‎ ‎ GX.AI Context Engine</p>
                  <p style={{ fontSize:15, color:'rgba(167,139,250,0.5)', marginTop:2 }}>‎ ‎ Automated financial habit building</p>
                </div>
              </div>
              <div
                className="flex items-center gap-2 flex-shrink-0"
                style={{ padding:'6px 14px', borderRadius:99, background:'rgba(52,211,153,0.08)', border:'1px solid rgba(52,211,153,0.24)' }}
              >
                <span
                  className="animate-pulse"
                  style={{ display:'inline-block', width:7, height:7, borderRadius:'50%', background:'#34D399', boxShadow:'0 0 7px #34D399' }}
                />
                <span style={{ fontSize:10, fontWeight:700, letterSpacing:'0.14em', color:'#34D399', textTransform:'uppercase', whiteSpace:'nowrap' }}>
                  Database Synced
                </span>
              </div>
            </div>

            {/* insight metric cards */}
            <div
              className="flex gap-4 flex-shrink-0"
              style={{ padding:'18px 32px', borderBottom:'1px solid rgba(109,40,217,0.1)' }}
            >
              {INSIGHTS.map(ins => (
                <div key={ins.label} className="flex-1" style={{ padding:'18px 20px', borderRadius:16, background:'rgba(255,255,255,0.03)', border:`1px solid ${ins.clr}28` }}>
                  <div className="flex items-center justify-between" style={{ marginBottom:12 }}>
                    <span style={{ fontSize:10, fontWeight:700, letterSpacing:'0.13em', color:'rgba(167,139,250,0.45)', textTransform:'uppercase' }}>{ins.label}</span>
                    <span style={{ fontSize:16 }}></span>
                  </div>
                  <p style={{ fontSize:30, fontWeight:900, color:ins.clr, lineHeight:1, marginBottom:8 }}>{ins.val}</p>
                  <p style={{ fontSize:12, color:'rgba(255,255,255,0.3)' }}>{ins.sub}</p>
                </div>
              ))}
            </div>

            {/* terminal — takes remaining space */}
            <div className="flex-1 min-h-0 flex flex-col overflow-hidden" style={{ padding:'16px 32px' }}>
              <div
                className="flex-1 flex flex-col overflow-hidden"
                style={{ borderRadius:18, background:'#060412', border:'1px solid rgba(109,40,217,0.24)' }}
              >
                {/* chrome bar */}
                <div
                  className="flex items-center gap-1.5 flex-shrink-0"
                  style={{ padding:'14px 20px', borderBottom:'1px solid rgba(109,40,217,0.16)' }}
                >
                  {['#EF4444','#F59E0B','#10B981'].map(c => (
                    <div key={c} style={{ width:12, height:12, borderRadius:'50%', background:c, opacity:0.7 }}/>
                  ))}
                  <span className="terminal" style={{ marginLeft:12, fontSize:11, color:'rgba(167,139,250,0.32)' }}>
                    gx.ai — neural_context_engine v2.4.1
                  </span>
                </div>

                {/* log output */}
                <div className="flex-1 overflow-y-auto custom-scrollbar" style={{ padding:'18px 20px', display:'flex', flexDirection:'column', gap:14 }}>
                  <AnimatePresence>
                    {logs.map((log, i) => (
                      <motion.div key={i} initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.28 }}>
                        {log.kind === 'sys' ? (
                          <p className="terminal" style={{ fontSize:12, color:'rgba(167,139,250,0.44)' }}>{log.text}</p>
                        ) : (
                          <div
                            className="terminal"
                            style={{ fontSize:13, lineHeight:1.6, padding:'12px 16px', borderRadius:13, maxWidth:'92%', background:'rgba(109,40,217,0.22)', border:'1px solid rgba(167,139,250,0.24)', color:'#C4B5FD' }}
                          >
                            {log.text}
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {loading && (
                    <div className="flex items-center gap-2">
                      {[0,1,2].map(i => (
                        <motion.div key={i}
                          style={{ width:6, height:6, borderRadius:'50%', background:'#7C3AED' }}
                          animate={{ opacity:[0.3,1,0.3], scale:[0.8,1.1,0.8] }}
                          transition={{ duration:1.2, repeat:Infinity, delay:i*0.2 }}
                        />
                      ))}
                      <span className="terminal" style={{ fontSize:11, color:'rgba(167,139,250,0.35)', marginLeft:4 }}>Processing vectors...</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* scenario buttons */}
            <div className="flex-shrink-0" style={{ padding:'0 32px 28px', borderTop:'1px solid rgba(109,40,217,0.14)' }}>
              <p style={{ fontSize:15, fontWeight:700, letterSpacing:'0.18em', color:'rgba(167,139,250,0.4)', textTransform:'uppercase', padding:'16px 0 12px' }}>
                Command Center / Scenarios
              </p>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:14 }}>
                {[
                  { k:'Weekend', v:'Function 01', l:'Analyze Weekend',     primary:false },
                  { k:'Audit',   v:'Function 02', l:'Audit Subscriptions', primary:false },
                  { k:'Salary',  v:'Function 03', l:'Auto-Salary Route',   primary:true  },
                ].map(btn => (
                  <button
                    key={btn.k}
                    onClick={() => runScenario(btn.k)}
                    disabled={loading}
                    className="text-left transition-all duration-200 disabled:opacity-40"
                    style={{
                      padding:'18px 20px', borderRadius:16,
                      ...(btn.primary
                        ? { background:'linear-gradient(135deg,#7C3AED,#6D28D9)', border:'1px solid rgba(167,139,250,0.32)', boxShadow:'0 0 26px rgba(124,58,237,0.38)' }
                        : { background:'rgba(255,255,255,0.03)', border:'1px solid rgba(109,40,217,0.32)' }
                      ),
                    }}
                    onMouseEnter={e => { if(!btn.primary) (e.currentTarget as HTMLButtonElement).style.background='rgba(109,40,217,0.18)'; }}
                    onMouseLeave={e => { if(!btn.primary) (e.currentTarget as HTMLButtonElement).style.background='rgba(255,255,255,0.03)'; }}
                  >
                    <p style={{ fontSize:10, fontWeight:700, letterSpacing:'0.14em', textTransform:'uppercase', marginBottom:8, color: btn.primary ? 'rgba(255,255,255,0.55)' : '#7C3AED' }}>
                      {btn.v}
                    </p>
                    <p style={{ fontSize:15, fontWeight:600, color: btn.primary ? '#fff' : 'rgba(255,255,255,0.84)' }}>
                      {btn.l}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}