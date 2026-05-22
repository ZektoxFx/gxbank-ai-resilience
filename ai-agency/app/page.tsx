'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── DATA ─────────────────────────────────────────────── */
const TRANSACTIONS = [
  { name: '‎ ‎ Grab Food',     cat: 'Food & Drinks',  amt: -24.50,  icon: '\\logos\\grab-food.png',      date: '‎ ‎ Today, 12:34 PM', clr: '#F472B6' },
  { name: '‎ ‎ Salary Credit', cat: 'Income',          amt: 3980.20, icon: '\\logos\\salary-credit.jpg', date: '‎ ‎ Today, 9:00 AM',  clr: '#34D399' },
  { name: '‎ ‎ Netflix',       cat: 'Subscriptions',   amt: -17.00,  icon: '\\logos\\netflix.png',        date: '‎ ‎ Yesterday',       clr: '#F87171' },
  { name: '‎ ‎ Shopee',        cat: 'Shopping',        amt: -89.90,  icon: '\\logos\\shopee.png',         date: '‎ ‎ Yesterday',       clr: '#FB923C' },
  { name: "‎ ‎ Touch 'n Go",  cat: 'Transport',        amt: -30.00,  icon: '\\logos\\touchngo.png',       date: '‎ ‎ 8 May',           clr: '#60A5FA' },
];

const BARS = [
  { label: 'Food',     pct: 42, clr: '#A78BFA' },
  { label: 'Shopping', pct: 31, clr: '#F472B6' },
  { label: 'Transport',pct: 16, clr: '#34D399' },
  { label: 'Other',    pct: 11, clr: '#60A5FA' },
];

const INSIGHTS = [
  { label: 'Savings Rate',  val: '23%',     sub: 'of income saved',   clr: '#A78BFA' },
  { label: 'Streak',        val: '7 month', sub: 'savings protected',  clr: '#FB923C' },
  { label: 'Subscriptions', val: 'RM85',    sub: 'can be optimised',   clr: '#F472B6' },
];

/* ─── ICONS ─────────────────────────────────────────────── */
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
const PlusIco = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd"/>
  </svg>
);

const NAV = [
  { key: 'Home',     Ico: HomeIco },
  { key: 'Pockets',  Ico: WalletIco },
  { key: 'Transfer', Ico: SwapIco },
  { key: 'Rewards',  Ico: StarIco },
  { key: 'Discover', Ico: SearchIco },
];

/* ─── SHARED STYLES ──────────────────────────────────────── */
const glassCard: React.CSSProperties = {
  background: 'rgba(255,255,255,0.065)',
  border: '1px solid rgba(167,139,250,0.18)',
  backdropFilter: 'blur(14px)',
  borderRadius: 18,
};

const pageHero = (title: string, sub: string, extra?: React.ReactNode) => (
  <div className="flex-shrink-0 relative overflow-hidden" style={{ background: 'linear-gradient(130deg,#4C1D95 0%,#3B0764 35%,#1E0B3E 65%,#0D0621 100%)' }}>
    <div className="absolute inset-0 pointer-events-none">
      <div style={{ position:'absolute', top:-90, left:-50, width:580, height:440, background:'radial-gradient(ellipse,rgba(167,139,250,0.28) 0%,transparent 65%)' }}/>
      <div style={{ position:'absolute', top:-20, right:160, width:460, height:340, background:'radial-gradient(ellipse,rgba(236,72,153,0.2) 0%,transparent 60%)' }}/>
    </div>
    <div className="relative px-12 pt-8 pb-8">
      <div className="flex items-center justify-between mb-2">
        <div>
          <p style={{ fontSize:14, fontWeight:700, letterSpacing:'0.16em', color:'rgba(196,181,253,0.6)', textTransform:'uppercase', marginBottom:6 }}>‎ ‎ Personal Account</p>
          <p style={{ fontSize:26, fontWeight:700, color:'#fff' }}>{title}</p>
          <p style={{ fontSize:13, color:'rgba(196,181,253,0.55)', marginTop:4 }}>{sub}</p>
        </div>
        {extra}
      </div>
    </div>
  </div>
);

/* ══════════════════════════════════════════════
   POCKETS PAGE
══════════════════════════════════════════════ */
function PocketsPage() {
  const pockets = [
    { name: '‎ ‎ Emergency Fund',  bal: 53.08,  goal: 500,   apy: '3.55', clr: '#34D399', icon: '🛡️' },
    { name: '‎ ‎ Holiday Savings', bal: 60.00,  goal: 2000,  apy: '3.55', clr: '#60A5FA', icon: '✈️' },
    { name: '‎ ‎ Education Fund',  bal: 40.00,  goal: 1000,  apy: '3.55', clr: '#A78BFA', icon: '📚' },
  ];

  return (
    <div className="flex-1 flex flex-col overflow-hidden min-w-0">
      {/* Hero */}
      <div className="flex-shrink-0 relative overflow-hidden" style={{ background: 'linear-gradient(130deg,#4C1D95 0%,#3B0764 35%,#1E0B3E 65%,#0D0621 100%)' }}>
        <div className="absolute inset-0 pointer-events-none">
          <div style={{ position:'absolute', top:-90, left:-50, width:580, height:440, background:'radial-gradient(ellipse,rgba(167,139,250,0.28) 0%, transparent 65%)' }}/>
        </div>
        <div className="relative px-12 pt-8 pb-8">
          <p style={{ fontSize:14, fontWeight:700, letterSpacing:'0.16em', color:'rgba(196,181,253,0.6)', textTransform:'uppercase', marginBottom:6 }}>‎ ‎ Personal Account</p>
          <div className="flex items-end justify-between">
            <div>
              <p style={{ fontSize:15, color:'rgba(196,181,253,0.55)', marginBottom:8 }}>‎ ‎ Total in Pockets</p>
              <div className="flex items-baseline gap-1" style={{ marginBottom:8 }}>
                <span style={{ fontSize:20, fontWeight:400, color:'rgba(255,255,255,0.45)' }}>‎ RM</span>
                <span style={{ fontSize:50, fontWeight:900, lineHeight:1, letterSpacing:'-2px', color:'#fff' }}>153</span>
                <span style={{ fontSize:26, fontWeight:300, color:'rgba(255,255,255,0.45)' }}>.08</span>
              </div>
              <span style={{ fontSize:14, fontWeight:700, padding:'4px 16px', borderRadius:99, letterSpacing:'0.08em', background:'rgba(52,211,153,0.15)', color:'#34D399', border:'1px solid rgba(52,211,153,0.28)' }}>
                Earning 3.55% p.a. interest
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar" style={{ background:'#0C0720', padding:'28px 32px' }}>
        <p style={{ fontSize:16, fontWeight:700, letterSpacing:'0.08em', color:'rgba(167,139,250,0.5)', textTransform:'uppercase', marginBottom:18 }}>GX Pockets</p>

        <div className="flex flex-col gap-4">
          {pockets.map((p, i) => {
            const pct = Math.round((p.bal / p.goal) * 100);
            return (
              <motion.div
                key={p.name}
                initial={{ opacity:0, y:16 }}
                animate={{ opacity:1, y:0 }}
                transition={{ delay: i * 0.08 }}
                className="cursor-pointer transition-all"
                style={{ ...glassCard ,padding:'18px 28px' }}
                onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.1)'}
                onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.065)'}
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div style={{ width:44, height:44, borderRadius:13, background:`${p.clr}22`, border:`1px solid ${p.clr}44`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:20 }}>
                      {p.icon}
                    </div>
                    <div>
                      <p style={{ fontSize:20, fontWeight:700, color:'#fff', marginBottom:6 }}>{p.name}</p>
                      <span style={{ fontSize:14, fontWeight:700, padding:'2px 8px', marginLeft:6, borderRadius:99, background:'rgba(52,211,153,0.12)', color:'#34D399', border:'1px solid rgba(52,211,153,0.22)' }}>
                        {p.apy}% p.a.
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p style={{ fontSize:30, fontWeight:800, color:'#fff' }}>RM {p.bal.toFixed(2)}</p>
                    <p style={{ fontSize:16, color:'rgba(255,255,255,0.35)', marginTop:2 }}>Goal: RM {p.goal.toLocaleString()}</p>
                  </div>
                </div>

                {/* Progress bar */}
                <div style={{ height:10, borderRadius:99, background:'rgba(255,255,255,0.08)', overflow:'hidden', marginBottom:4 }}>
                  <motion.div
                    initial={{ width:0 }}
                    animate={{ width:`${pct}%` }}
                    transition={{ delay: i * 0.08 + 0.3, duration:0.8, ease:'easeOut' }}
                    style={{ height:'100%', borderRadius:99, background:`linear-gradient(90deg, ${p.clr}, ${p.clr}99)` }}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <p style={{ fontSize:14, color:'rgba(255,255,255,0.35)' }}>{pct}% of goal reached</p>
                  <p style={{ fontSize:14, color:'rgba(255,255,255,0.35)' }}>RM {(p.goal - p.bal).toFixed(2)} to go</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Interest earned card */}
        <div style={{ marginTop:24, padding:'20px 24px', borderRadius:18, background:'rgba(52,211,153,0.07)', border:'1px solid rgba(52,211,153,0.2)' }}>
          <div className="flex items-center justify-between">
            <div>
              <p style={{ fontSize:16, fontWeight:700, letterSpacing:'0.14em', color:'rgba(52,211,153,0.7)', textTransform:'uppercase', marginBottom:2 }}>Interest Earned This Month</p>
              <p style={{ fontSize:28, fontWeight:900, color:'#34D399' }}>RM 0.45</p>
              <p style={{ fontSize:16, fontWeight:400, color:'rgba(255,255,255,0.35)', marginTop:4 }}>Auto-credited on 1st of next month</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   TRANSFER PAGE
══════════════════════════════════════════════ */
function TransferPage() {
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [reference, setReference] = useState('');
  const [sent, setSent] = useState(false);

  const recent = [
    { name:'Ali Hassan',   initials:'AH', clr:'#A78BFA', bank:'Maybank' },
    { name:'Siti Rahim',   initials:'SR', clr:'#F472B6', bank:'CIMB' },
    { name:'Farid Mohd',   initials:'FM', clr:'#34D399', bank:'GXBank' },
    { name:'Ahmad Zaki',   initials:'AZ', clr:'#60A5FA', bank:'RHB' },
  ];

  const inputStyle: React.CSSProperties = {
    width:'100%', padding:'14px 16px', borderRadius:12,
    background:'rgba(255,255,255,0.05)', border:'1px solid rgba(109,40,217,0.35)',
    color:'#fff', fontSize:15, outline:'none',
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden min-w-0">
      {/* Hero */}
      <div className="flex-shrink-0 relative overflow-hidden" style={{ background: 'linear-gradient(130deg,#4C1D95 0%,#3B0764 35%,#1E0B3E 65%,#0D0621 100%)' }}>
        <div className="absolute inset-0 pointer-events-none">
          <div style={{ position:'absolute', top:-90, left:-50, width:580, height:440, background:'radial-gradient(ellipse,rgba(167,139,250,0.28) 0%,transparent 65%)' }}/>
        </div>
        <div className="relative px-12 pt-8 pb-8">
          <p style={{ fontSize:20, fontWeight:700, letterSpacing:'0.16em', color:'rgba(196,181,253,0.6)', textTransform:'uppercase', marginBottom:6 }}>‎ ‎ Personal Account</p>
          <p style={{ fontSize:26, fontWeight:700, color:'#fff', marginBottom:4, marginLeft: 10}}>GX Transfer</p>
          <p style={{ fontSize:18, color:'rgba(196,181,253,0.55)', marginLeft: 10 }}>Transfer funds instantly to any bank</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar" style={{ background:'#0C0720' }}>
        <div style={{ padding:'28px 32px', maxWidth:800 }}>

          {/* Transfer form */}
          <div style={{ ...glassCard, padding:'20px 80px 30px', borderRadius:18, marginBottom:24 }}>
            <p style={{ fontSize:20, letterSpacing:'0.08em', fontWeight:700, color:'#fff', marginBottom:16 }}>Transfer Details</p>

            {/* To field */}
            <div style={{ marginBottom:16 }}>
              <p style={{ fontSize:14, fontWeight:700, letterSpacing:'0.12em', color:'rgba(167,139,250,0.6)', textTransform:'uppercase', marginBottom:8 }}>Send To</p>
              <input
                value={recipient}
                onChange={e => setRecipient(e.target.value)}
                placeholder="Account number"
                style={{ ...inputStyle, fontSize:16, fontWeight:600, paddingRight:10 }}
              />
            </div>

            {/* Amount field */}
            <div style={{ marginBottom:16 }}>
              <p style={{ fontSize:14, fontWeight:700, letterSpacing:'0.12em', color:'rgba(167,139,250,0.6)', textTransform:'uppercase', marginBottom:8 }}>Amount</p>
              <div style={{ position:'relative' }}>
                <span style={{ position:'absolute', left:16, top:'50%', transform:'translateY(-50%)', color:'rgba(167,139,250,0.7)', fontSize:16, fontWeight:700 }}></span>
                <input
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  placeholder="0.00"
                  style={{ ...inputStyle, paddingLeft:10, fontSize:16, fontWeight:600 }}
                />
              </div>
              <p style={{ fontSize:14, color:'rgba(255,255,255,0.28)', marginTop:6 }}>Available balance: RM 14,722.63</p>
            </div>

            {/* Reference */}
            <div style={{ marginBottom:28 }}>
              <p style={{ fontSize:14, fontWeight:700, letterSpacing:'0.12em', color:'rgba(167,139,250,0.6)', textTransform:'uppercase', marginBottom:8 }}>Reference (Optional)</p>
              <input
                value={reference}
                onChange={e => setReference(e.target.value)}
                placeholder="e.g. Lunch money, Rental..."
                style={inputStyle}
              />
            </div>

            {/* Submit */}
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="success"
                  initial={{ opacity:0, scale:0.95 }}
                  animate={{ opacity:1, scale:1 }}
                  style={{ padding:'16px 24px', borderRadius:12, background:'rgba(52,211,153,0.15)', border:'1px solid rgba(52,211,153,0.3)', display:'flex', alignItems:'center', gap:12 }}
                >
                  <span style={{ fontSize:20 }}>✅</span>
                  <div>
                    <p style={{ fontSize:20, fontWeight:700, color:'#34D399' }}>Transfer Successful!</p>
                    <p style={{ fontSize:18, color:'rgba(52,211,153,0.7)' }}>RM {amount || '0.00'} sent to {recipient || 'recipient'}</p>
                  </div>
                </motion.div>
              ) : (
                <motion.button
                  key="btn"
                  onClick={() => { if (amount && recipient) setSent(true); }}
                  className="w-full font-semibold transition-all"
                  style={{
                    padding:'15px', borderRadius:13, fontSize:16,
                    background: 'linear-gradient(135deg,#7C3AED,#6D28D9)',
                    color:'#fff', border:'1px solid rgba(167,139,250,0.3)',
                    boxShadow:'0 0 24px rgba(124,58,237,0.35)', cursor:'pointer',
                    opacity: (amount && recipient) ? 1 : 0.5,
                  }}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  Transfer Now →
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Limits note */}
          <p style={{ fontSize:14, color:'rgba(255,255,255,0.25)', textAlign:'center', marginTop:16 }}>
            Daily transfer limit: RM 5,000 · Secured by GXBank 256-bit encryption
          </p>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   REWARDS PAGE
══════════════════════════════════════════════ */
function RewardsPage() {
  const [claimed, setClaimed] = useState<string[]>([]);

  const vouchers = [
    { id:'grab',   brand:'Grab Food',    desc:'RM5 off your next order',        expires:'Expires in 3 days',  clr:'#34D399', pts:500,  hot:true  },
    { id:'shopee', brand:'Shopee',        desc:'10% cashback (max RM20)',         expires:'Expires in 7 days',  clr:'#FB923C', pts:800,  hot:true  },
    { id:'tng',    brand:'Touch \'n Go', desc:'RM2 reload bonus',                expires:'Expires in 14 days', clr:'#60A5FA', pts:300,  hot:false },
    { id:'mcd',    brand:'McDonald\'s',  desc:'Free McFlurry with any purchase', expires:'Expires in 5 days',  clr:'#F472B6', pts:600,  hot:false },
    { id:'lazada', brand:'Lazada',        desc:'RM10 off (min spend RM50)',        expires:'Expires in 21 days', clr:'#A78BFA', pts:1000, hot:false },
    { id:'grab2',  brand:'Grab Rides',   desc:'Free ride up to RM8',             expires:'Expires in 2 days',  clr:'#34D399', pts:700,  hot:true  },
  ];

  return (
    <div className="flex-1 flex flex-col overflow-hidden min-w-0">
      {/* Hero */}
      <div className="flex-shrink-0 relative overflow-hidden" style={{ background: 'linear-gradient(130deg,#4C1D95 0%,#3B0764 35%,#1E0B3E 65%,#0D0621 100%)' }}>
        <div className="absolute inset-0 pointer-events-none">
          <div style={{ position:'absolute', top:-90, left:-50, width:580, height:440, background:'radial-gradient(ellipse,rgba(167,139,250,0.28) 0%,transparent 65%)' }}/>
        </div>
        <div className="relative px-12 pt-8 pb-8 flex items-end justify-between">
          <div>
            <p style={{ fontSize:20, fontWeight:700, letterSpacing:'0.16em', color:'rgba(196,181,253,0.6)', textTransform:'uppercase', marginBottom:6 }}>‎ ‎ Personal Account</p>
            <p style={{ fontSize:26, fontWeight:700, color:'#fff', marginBottom:4 }}>‎ ‎ GX Rewards</p>
            <p style={{ fontSize:18,  letterSpacing:'0.16em', color:'rgba(196,181,253,0.55)' }}>‎ ‎ Redeem vouchers with your GXPoints</p>
          </div>
          {/* Points balance */}
          <div style={{ ...glassCard, padding:'2px 16px', textAlign:'right' }}>
            <p style={{ fontSize:14, fontWeight:700, letterSpacing:'0.14em', color:'rgba(196,181,253,0.5)', textTransform:'uppercase', marginBottom:6 }}>GXPoints Balance</p>
            <p style={{ fontSize:32, fontWeight:900, color:'#A78BFA' }}>2,450</p>
            <p style={{ fontSize:14, color:'rgba(255,255,255,0.3)', marginTop:2 }}>pts</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar" style={{ background:'#0C0720', padding:'28px 32px' }}>

        {/* Expiring soon banner */}
        <div style={{ padding:'14px 20px', borderRadius:13, background:'rgba(251,146,60,0.1)', border:'1px solid rgba(251,146,60,0.25)', display:'flex', alignItems:'center', gap:12, marginBottom:24 }}>
          <span style={{ fontSize:24 }}>⏰</span>
          <div>
            <p style={{ fontSize:16, fontWeight:700, color:'#FB923C' }}>3 vouchers expiring soon</p>
            <p style={{ fontSize:14, color:'rgba(255,255,255,0.4)' }}>Claim before they expire — Grab Rides expires in 2 days</p>
          </div>
        </div>

        <p style={{ fontSize:16, fontWeight:700, letterSpacing:'0.12em', color:'rgba(167,139,250,0.5)', textTransform:'uppercase', marginBottom:18 }}>Available Vouchers</p>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16 }}>
          {vouchers.map((v, i) => {
            const isClaimed = claimed.includes(v.id);
            return (
              <motion.div
                key={v.id}
                initial={{ opacity:0, y:16 }}
                animate={{ opacity:1, y:0 }}
                transition={{ delay: i * 0.06 }}
                style={{
                  borderRadius:18, overflow:'hidden',
                  background:'rgba(255,255,255,0.04)',
                  border:`1px solid ${v.clr}28`,
                  opacity: isClaimed ? 0.5 : 1,
                  transition:'opacity 0.3s',
                }}
              >
                {/* Top accent */}
                <div style={{ height:4, background:`linear-gradient(90deg, ${v.clr}, ${v.clr}66)` }}/>

                <div style={{ padding:'18px 20px' }}>
                  {/* Header row */}
                  <div className="flex items-start justify-between mb-3">
                    <p style={{ fontSize:20, fontWeight:700, color:'#fff' }}>{v.brand}</p>
                    {v.hot && !isClaimed && (
                      <span style={{ fontSize:10, letterSpacing:'0.10em', fontWeight:700, padding:'4px 10px', borderRadius:99, background:'rgba(239,68,68,0.2)', color:'#F87171', border:'1px solid rgba(239,68,68,0.3)' }}>
                        LIMITED
                      </span>
                    )}
                    {isClaimed && (
                      <span style={{ fontSize:10, letterSpacing:'0.10em', fontWeight:700, padding:'4px 10px', borderRadius:99, background:'rgba(52,211,153,0.2)', color:'#34D399' }}>
                        CLAIMED
                      </span>
                    )}
                  </div>

                  <p style={{ fontSize:15, letterSpacing: '0.08em',fontWeight:800, color:v.clr, marginBottom:6, marginTop:0 }}>{v.desc}</p>
                  <p style={{ fontSize:14, color:'rgba(255,255,255,0.3)', marginBottom:16 }}>{v.expires}</p>

                  {/* Cost + claim */}
                  <div className="flex items-center justify-between">
                    <span style={{ fontSize:15, fontWeight:700, color:'rgba(167,139,250,0.7)' }}>🪙 {v.pts} pts</span>
                    <button
                      onClick={() => !isClaimed && setClaimed(prev => [...prev, v.id])}
                      style={{
                        padding:'7px 16px', borderRadius:99, fontSize:12, fontWeight:700,
                        background: isClaimed ? 'rgba(255,255,255,0.05)' : `${v.clr}22`,
                        border: `1px solid ${isClaimed ? 'rgba(255,255,255,0.1)' : v.clr + '55'}`,
                        color: isClaimed ? 'rgba(255,255,255,0.3)' : v.clr,
                        cursor: isClaimed ? 'default' : 'pointer',
                        transition:'all 0.2s',
                      }}
                    >
                      {isClaimed ? 'Claimed ✓' : 'Claim'}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Earn more points */}
        <div style={{ marginTop:28, padding:'20px 24px', borderRadius:18, background:'rgba(167,139,250,0.07)', border:'1px solid rgba(167,139,250,0.2)' }}>
          <p style={{ fontSize:20, fontWeight:700, color:'#A78BFA', marginBottom:8 }}>✦ Earn more GXPoints</p>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12 }}>
            {[
              { action:'Pay with GXBank', pts:'+1 pt per RM1' },
              { action:'Save RM500/month', pts:'+500 pts bonus' },
              { action:'Refer a friend', pts:'+1,000 pts' },
            ].map(e => (
              <div key={e.action} style={{ padding:'12px 16px', borderRadius:12, background:'rgba(255,255,255,0.03)', border:'1px solid rgba(167,139,250,0.12)' }}>
                <p style={{ fontSize:14, color:'rgba(255,255,255,0.7)', marginBottom:2 }}>{e.action}</p>
                <p style={{ fontSize:15, fontWeight:700, color:'#A78BFA' }}>{e.pts}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════ */
export default function GXBankDashboard() {
  const [activeNav, setActiveNav] = useState('Home');
  const [searchQuery, setSearchQuery] = useState('');
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

  /* filtered transactions for search */
  const filteredTx = searchQuery.trim()
    ? TRANSACTIONS.filter(tx =>
        tx.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.cat.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : TRANSACTIONS;

  /* ── HOME PAGE ── */
  const HomePage = () => (
    <>
      {/* HERO */}
      <div className="flex-shrink-0 relative overflow-hidden" style={{ background: 'linear-gradient(130deg,#4C1D95 0%,#3B0764 35%,#1E0B3E 65%,#0D0621 100%)' }}>
        <div className="absolute inset-0 pointer-events-none">
          <div style={{ position:'absolute', top:-90, left:-50, width:580, height:440, background:'radial-gradient(ellipse,rgba(167,139,250,0.28) 0%,transparent 65%)' }}/>
          <div style={{ position:'absolute', top:-20, right:160, width:460, height:340, background:'radial-gradient(ellipse,rgba(236,72,153,0.2) 0%,transparent 60%)' }}/>
        </div>

        <div className="relative px-12 pt-10 pb-10">
          {/* top row */}
          <div className="flex items-center justify-between mb-10">
            <div>
              <p style={{ fontSize:20, fontWeight:700, letterSpacing:'0.12em', color:'rgba(196,181,253,0.6)', textTransform:'uppercase' }}>‎ ‎ Personal Account</p>
              <p style={{ fontSize:23, fontWeight:500, color:'rgba(255,255,255,0.87)' }}>‎ ‎ Good morning, Mr. Ikhwan 👋</p>
            </div>
          </div>

          {/* balance + subcards */}
          <div className="flex items-end gap-20 mb-10">
            <div style={{ flexShrink:0, minWidth:260 }}>
              <p style={{ fontSize:18, fontWeight:700, letterSpacing:'0.16em', color:'rgba(196,181,253,0.55)', textTransform:'uppercase', marginBottom:18 }}>‎ ‎ Total Balance</p>
              <div className="flex items-baseline gap-1" style={{ marginBottom:18 }}>
                <span style={{ fontSize:24, fontWeight:400, color:'rgba(255,255,255,0.45)' }}>‎ RM</span>
                <span style={{ fontSize:68, fontWeight:900, lineHeight:1, letterSpacing:'-3px', color:'#fff' }}>14,875</span>
                <span style={{ fontSize:30, fontWeight:300, color:'rgba(255,255,255,0.45)' }}>.71</span>
              </div>
              <div className="flex items-center gap-2">
                <span style={{ fontSize:17, fontWeight:500, color:'rgba(52,211,153,0.92)' }}> ‎ ‎ + RM 3,980.20 salary received today</span>
              </div>
            </div>

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
                    <span style={{ position:'absolute', top:10, right:10, fontSize:14, fontWeight:700, padding:'3px 8px', borderRadius:99, background:'rgba(52,211,153,0.15)', color:'#34D399', border:'1px solid rgba(52,211,153,0.28)' }}>
                      {c.badge}
                    </span>
                  )}
                  <p style={{ fontSize:16, fontWeight:700, letterSpacing:'0.14em', color:'rgba(196,181,253,0.48)', textTransform:'uppercase', marginBottom:10 }}>{c.label}</p>
                  <p style={{ fontSize:25, fontWeight:800, color:'#fff', marginBottom:8 }}>{c.val}</p>
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
        </div>
      </div>

      {/* CONTENT ROW */}
      <div className="flex flex-1 min-h-0 overflow-hidden" style={{ borderTop:'1px solid rgba(109,40,217,0.22)' }}>

        {/* LEFT: Transactions */}
        <div className="flex flex-col overflow-y-auto custom-scrollbar flex-shrink-0" style={{ width:370, background:'#0E0826', borderRight:'1px solid rgba(109,40,217,0.16)' }}>
          <div className="flex items-center justify-between flex-shrink-0" style={{ padding:'24px 24px 14px', position:'sticky', top:0, background:'#0E0826', zIndex:10 }}>
            <h3 style={{ fontSize:15, fontWeight:700, letterSpacing:'0.08em', color:'#fff' }}>Recent Transactions</h3>
          </div>

          <div style={{ padding:'4px 12px' }}>
            {filteredTx.map((tx, i) => (
              <motion.div
                key={i}
                initial={{ opacity:0, x:-12 }}
                animate={{ opacity:1, x:0 }}
                transition={{ delay: i * 0.06 }}
                className="flex items-center gap-4 cursor-pointer transition-all"
                style={{ padding:'15px 14px', borderRadius:14, marginBottom:4 }}
                onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background='rgba(109,40,217,0.14)'}
                onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background='transparent'}
              >
                <div className="flex items-center justify-center flex-shrink-0"
                  style={{ width:46, height:46, borderRadius:14, background:'rgba(255,255,255,0.05)', border:`1px solid ${tx.clr}35`, overflow:'hidden' }}>
                  <img src={tx.icon} alt={tx.name} style={{ width:28, height:28, objectFit:'contain' }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p style={{ fontSize:16, fontWeight:600, color:'rgba(255,255,255,0.92)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', marginBottom:4 }}>{tx.name}</p>
                  <p style={{ fontSize:12, color:'rgba(255,255,255,0.32)' }}>{tx.date} · {tx.cat}</p>
                </div>
                <p style={{ fontSize:14, fontWeight:700, letterSpacing:'0.08em', color: tx.amt > 0 ? '#34D399' : 'rgba(255,255,255,0.85)', flexShrink:0 }}>
                  {tx.amt > 0 ? '+' : '−'}RM{Math.abs(tx.amt).toFixed(2)}
                </p>
              </motion.div>
            ))}
            {filteredTx.length === 0 && (
              <div style={{ padding:'32px', textAlign:'center', color:'rgba(255,255,255,0.25)', fontSize:13 }}>
                No transactions match "{searchQuery}"
              </div>
            )}
          </div>

          <div style={{ margin:'8px 14px 18px', padding:'18px 18px', borderRadius:18, background:'#150C35', border:'1px solid rgba(109,40,217,0.28)', flexShrink:0 }}>
            <div className="flex items-center justify-between" style={{ marginBottom:14 }}>
              <p style={{ fontSize:14, fontWeight:700, letterSpacing:'0.13em', color:'rgba(167,139,250,0.5)', textTransform:'uppercase' }}>May Spending</p>
              <p style={{ fontSize:13, fontWeight:700, letterSpacing:'0.14em', color:'#fff' }}>RM1,284.30</p>
            </div>
            <div style={{ display:'flex', height:8, borderRadius:99, overflow:'hidden', gap:2, marginBottom:14 }}>
              {BARS.map(b => <div key={b.label} style={{ flex:b.pct, background:b.clr }}/>)}
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px 6px' }}>
              {BARS.map(b => (
                <div key={b.label} className="flex items-center gap-2">
                  <div style={{ width:8, height:8, borderRadius:'50%', background:b.clr, flexShrink:0 }}/>
                  <span style={{ fontSize:14, marginLeft:5 ,color:'rgba(255,255,255,0.38)' }}>{b.label}</span>
                  <span style={{ fontSize:14, fontWeight:600, color:'rgba(255,255,255,0.65)', marginLeft:'auto' }}>{b.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: GX.AI */}
        <div className="flex-1 flex flex-col overflow-hidden min-w-0" style={{ background:'#0C0720' }}>
          <div className="flex items-center justify-between flex-shrink-0" style={{ padding:'22px 32px 20px', borderBottom:'1px solid rgba(109,40,217,0.16)' }}>
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex items-center justify-center font-black text-white flex-shrink-0"
                style={{ width:42, height:42, borderRadius:13, fontSize:11, background:'linear-gradient(135deg,#9333EA,#6D28D9)', boxShadow:'0 0 22px rgba(147,51,234,0.42)' }}>
                AI
              </div>
              <div className="min-w-0">
                <p style={{ fontSize:20, fontWeight:700, color:'#fff' }}>‎ ‎ GX.AI Context Engine</p>
                <p style={{ fontSize:15, letterSpacing:'0.08em', color:'rgba(167,139,250,0.5)', marginTop:2 }}>‎ ‎ Automated financial habit building</p>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0"
              style={{ padding:'6px 14px', borderRadius:99, background:'rgba(52,211,153,0.08)', border:'1px solid rgba(52,211,153,0.24)' }}>
              <span className="animate-pulse" style={{ display:'inline-block', width:7, height:7, borderRadius:'50%', background:'#34D399', boxShadow:'0 0 7px #34D399' }}/>
              <span style={{ fontSize:10, fontWeight:700, letterSpacing:'0.14em', color:'#34D399', textTransform:'uppercase', whiteSpace:'nowrap' }}>‎ ‎ Database Synced</span>
            </div>
          </div>

          <div className="flex gap-4 flex-shrink-0" style={{ padding:'10px 64px', gap:10 , borderBottom:'1px solid rgba(109,40,217,0.1)' }}>
            {INSIGHTS.map(ins => (
              <div key={ins.label} className="flex-1" style={{ padding:'10px 20px', borderRadius:16, background:'rgba(255,255,255,0.03)', border:`1px solid ${ins.clr}28` }}>
                <div className="flex items-center justify-between" style={{ marginBottom:12 }}>
                  <span style={{ fontSize:16, fontWeight:700, marginTop:10,letterSpacing:'0.13em', color:'rgba(167,139,250,0.45)', textTransform:'uppercase' }}>{ins.label}</span>
                </div>
                <p style={{ fontSize:30, fontWeight:900, color:ins.clr, lineHeight:1, marginBottom:8 }}>{ins.val}</p>
                <p style={{ fontSize:14, color:'rgba(255,255,255,0.3)' }}>{ins.sub}</p>
              </div>
            ))}
          </div>

          <div className="flex-1 min-h-0 flex flex-col overflow-hidden" style={{ padding:'10px 35px' }}>
            <div className="flex-1 flex flex-col overflow-hidden" style={{ borderRadius:18, background:'#060412', border:'1px solid rgba(109,40,217,0.24)' }}>
              <div className="flex items-center gap-1.5 flex-shrink-0" style={{ padding:'14px 20px', borderBottom:'1px solid rgba(109,40,217,0.16)' }}>
                {['#EF4444','#F59E0B','#10B981'].map(c => (
                  <div key={c} style={{ width:12, height:12, borderRadius:'50%', background:c, opacity:0.7 }}/>
                ))}
                <span className="terminal" style={{ marginLeft:12, fontSize:14, color:'rgba(167,139,250,0.32)' }}>gx.ai — neural_context_engine v1.1.1</span>
              </div>
              <div className="flex-1 overflow-y-auto custom-scrollbar" style={{ padding:'18px 20px', display:'flex', flexDirection:'column', gap:14 }}>
                <AnimatePresence>
                  {logs.map((log, i) => (
                    <motion.div key={i} initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.28 }}>
                      {log.kind === 'sys' ? (
                        <p className="terminal" style={{ fontSize:16, color:'rgba(167,139,250,0.44)' }}>{log.text}</p>
                      ) : (
                        <div className="terminal" style={{ fontSize:16, lineHeight:1.6, padding:'12px 16px', borderRadius:13, maxWidth:'92%', background:'rgba(109,40,217,0.22)', border:'1px solid rgba(167,139,250,0.24)', color:'#C4B5FD' }}>
                          {log.text}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
                {loading && (
                  <div className="flex items-center gap-2">
                    {[0,1,2].map(i => (
                      <motion.div key={i} style={{ width:6, height:6, borderRadius:'50%', background:'#7C3AED' }}
                        animate={{ opacity:[0.3,1,0.3], scale:[0.8,1.1,0.8] }}
                        transition={{ duration:1.2, repeat:Infinity, delay:i*0.2 }}/>
                    ))}
                    <span className="terminal" style={{ fontSize:11, color:'rgba(167,139,250,0.35)', marginLeft:4 }}>Processing vectors...</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex-shrink-0" style={{ padding:'0 32px 28px', borderTop:'1px solid rgba(109,40,217,0.14)' }}>
            <p style={{ fontSize:15, fontWeight:700, letterSpacing:'0.14em', color:'rgba(167,139,250,0.4)', textTransform:'uppercase', padding:'px 0 5px' }}>
              Command Center
            </p>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:14 }}>
              {[
                { k:'Weekend', v:'Function 01', l:'Analyze Weekend',     primary:true },
                { k:'Audit',   v:'Function 02', l:'Audit Subscriptions', primary:true },
                { k:'Salary',  v:'Function 03', l:'Auto-Salary Route',   primary:true  },
              ].map(btn => (
                <button key={btn.k} onClick={() => runScenario(btn.k)} disabled={loading}
                  className="text-left transition-all duration-200 disabled:opacity-40"
                  style={{ padding:'18px 20px', borderRadius:16,
                    ...(btn.primary
                      ? { background:'linear-gradient(135deg,#7C3AED,#6D28D9)', border:'1px solid rgba(167,139,250,0.32)', boxShadow:'0 0 26px rgba(124,58,237,0.38)' }
                      : { background:'rgba(255,255,255,0.03)', border:'1px solid rgba(109,40,217,0.32)' }
                    ),
                  }}
                  onMouseEnter={e => { if(!btn.primary) (e.currentTarget as HTMLButtonElement).style.background='rgba(109,40,217,0.18)'; }}
                  onMouseLeave={e => { if(!btn.primary) (e.currentTarget as HTMLButtonElement).style.background='rgba(255,255,255,0.03)'; }}
                >
                  <p style={{ fontSize:12, fontWeight:700, letterSpacing:'0.14em', textTransform:'uppercase', marginBottom:8, color: btn.primary ? 'rgba(255,255,255,0.55)' : '#7C3AED' }}>{btn.v}</p>
                  <p style={{ fontSize:16, fontWeight:600, color: btn.primary ? '#fff' : 'rgba(255,255,255,0.84)' }}>{btn.l}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );

  /* ── RENDER ── */
  return (
    <div className="h-full w-full flex overflow-hidden">

      {/* SIDEBAR */}
      <aside className="flex-shrink-0 flex flex-col items-center py-6 gap-1"
        style={{ width:70, background:'#0D0621', borderRight:'1px solid rgba(109,40,217,0.22)' }}>
        <img src="/gxbank-logo.png" alt="GX Bank" className="mb-7 flex-shrink-0"
          style={{ width:42, height:42, borderRadius:13, objectFit:'contain' }}/>

        {NAV.map(({ key, Ico }) => {
          const active = activeNav === key;
          return (
            <button key={key} title={key}
              onClick={() => {
                setActiveNav(key);
                if (key !== 'Discover') setSearchQuery('');
              }}
              className="flex items-center justify-center flex-shrink-0 transition-all duration-200"
              style={{
                width:42, height:42, borderRadius:12,
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
        <div className="flex items-center justify-center font-bold text-white text-[11px] flex-shrink-0"
          style={{ width:34, height:34, borderRadius:'50%', background:'linear-gradient(135deg,#C084FC,#7C3AED)', border:'2px solid rgba(124,58,237,0.45)' }}>
          MI
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeNav}
            className="flex-1 flex flex-col overflow-hidden min-w-0"
            initial={{ opacity:0, x:12 }}
            animate={{ opacity:1, x:0 }}
            exit={{ opacity:0, x:-12 }}
            transition={{ duration:0.18, ease:'easeOut' }}
          >
            {/* Search bar — shown when Discover is active, sits above content */}
            {activeNav === 'Discover' && (
              <div className="flex-shrink-0" style={{ padding:'16px 24px', background:'#0D0621', borderBottom:'1px solid rgba(109,40,217,0.22)', zIndex:20 }}>
                <div style={{ position:'relative', maxWidth:600 }}>
                  <span style={{ position:'absolute', left:16, top:'50%', transform:'translateY(-50%)', color:'rgba(167,139,250,0.5)' }}>
                    <SearchIco />
                  </span>
                  <input
                    autoFocus
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search transactions, features, pockets..."
                    style={{
                      width:'100%', padding:'13px 16px 13px 48px',
                      borderRadius:13, fontSize:14,
                      background:'rgba(255,255,255,0.05)',
                      border:'1px solid rgba(109,40,217,0.45)',
                      color:'#fff', outline:'none',
                    }}
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery('')}
                      style={{ position:'absolute', right:14, top:'50%', transform:'translateY(-50%)', color:'rgba(255,255,255,0.3)', fontSize:18, cursor:'pointer', background:'none', border:'none' }}>
                      ×
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Page content */}
            {(activeNav === 'Home' || activeNav === 'Discover') && <HomePage />}
            {activeNav === 'Pockets'  && <PocketsPage />}
            {activeNav === 'Transfer' && <TransferPage />}
            {activeNav === 'Rewards'  && <RewardsPage />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}