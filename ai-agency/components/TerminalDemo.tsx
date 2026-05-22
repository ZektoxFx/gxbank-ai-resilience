'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TerminalDemo() {
  const [logs, setLogs] = useState<{text: string, type: 'sys' | 'nudge' | 'error'}[]>([
    { text: '> GXBank Neural Sync established.', type: 'sys' },
    { text: '> Monitoring real-time financial velocity...', type: 'sys' }
  ]);
  const [loading, setLoading] = useState(false);

  const simulateAnalysis = async (scenario: string) => {
    setLogs(prev => [...prev, { text: `> Executing scan protocol: [${scenario}]`, type: 'sys' }]);
    setLoading(true);

    // Simulating Backend Latency
    setTimeout(() => {
      let response = "";
      if (scenario === 'Weekend Spending') {
        response = "[GX_NUDGE]: High velocity spending detected (RM150 on Food Delivery). Diverting RM50 to 'Emergency Pocket' to maintain your 3-month resilience streak.";
      } else if (scenario === 'Subscription Audit') {
        response = "[GX_AUDIT]: Identified 3 dormant subscriptions (RM85/mo total). Initiating cancellation protocol. Re-routing RM85 to investment portfolio.";
      } else {
        response = "[GX_SYSTEM]: Inflow detected: RM3,000. Executing 50/30/20 rule. RM600 (20%) safely locked into High-Yield Savings automatically.";
      }
      
      setLogs(prev => [...prev, { text: response, type: 'nudge' }]);
      setLoading(false);
    }, 1500);
  };

  return (
    <div id="demo" className="w-full max-w-4xl mx-auto relative z-20">
      {/* Decorative Glow Behind Terminal */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#3B82F6]/10 blur-[100px] -z-10 rounded-full pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-[#050508]/80 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden"
      >
        {/* Terminal Header */}
        <div className="flex justify-between items-center px-6 py-4 bg-white/[0.02] border-b border-white/5">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#FF5F56] shadow-[0_0_10px_rgba(255,95,86,0.5)]"></div>
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E] shadow-[0_0_10px_rgba(255,189,46,0.5)]"></div>
            <div className="w-3 h-3 rounded-full bg-[#27C93F] shadow-[0_0_10px_rgba(39,201,63,0.5)]"></div>
          </div>
          <div className="font-jetbrains text-[10px] text-gray-500 uppercase tracking-widest flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#3B82F6] rounded-full animate-pulse" />
            Active Neural Connection
          </div>
        </div>

        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Output Screen */}
          <div className="md:col-span-8 bg-black/50 rounded-xl border border-white/5 p-6 h-[300px] flex flex-col font-jetbrains text-sm overflow-hidden relative">
            <div className="flex-1 overflow-y-auto space-y-4 pr-4 custom-scrollbar">
              <AnimatePresence>
                {logs.map((log, i) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    key={i} 
                    className={`${
                      log.type === 'nudge' ? 'text-[#3B82F6] bg-[#3B82F6]/10 p-3 rounded-lg border border-[#3B82F6]/20' : 'text-gray-400'
                    }`}
                  >
                    {log.text}
                  </motion.div>
                ))}
              </AnimatePresence>
              {loading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[#8B5CF6] flex items-center gap-2">
                  <span className="animate-spin text-xl leading-none">◒</span> _processing behavioral vectors...
                </motion.div>
              )}
            </div>
          </div>

          {/* Action Controls */}
          <div className="md:col-span-4 flex flex-col justify-center gap-4">
            <h4 className="font-space-grotesk font-bold text-white text-lg mb-2">Simulate Data Ingestion</h4>
            
            <button 
              onClick={() => simulateAnalysis('Weekend Spending')}
              disabled={loading}
              className="group relative px-5 py-4 bg-white/5 border border-white/10 rounded-xl overflow-hidden text-left disabled:opacity-50 transition-all hover:border-[#3B82F6]/50"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#3B82F6]/0 to-[#3B82F6]/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
              <div className="font-jetbrains text-xs uppercase tracking-widest text-white mb-1">Vector 01</div>
              <div className="font-space-grotesk font-bold text-gray-400 group-hover:text-[#3B82F6] transition-colors">Analyze Weekend</div>
            </button>

            <button 
              onClick={() => simulateAnalysis('Subscription Audit')}
              disabled={loading}
              className="group relative px-5 py-4 bg-white/5 border border-white/10 rounded-xl overflow-hidden text-left disabled:opacity-50 transition-all hover:border-[#8B5CF6]/50"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#8B5CF6]/0 to-[#8B5CF6]/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
              <div className="font-jetbrains text-xs uppercase tracking-widest text-white mb-1">Vector 02</div>
              <div className="font-space-grotesk font-bold text-gray-400 group-hover:text-[#8B5CF6] transition-colors">Audit Subscriptions</div>
            </button>

            <button 
              onClick={() => simulateAnalysis('Salary Routing')}
              disabled={loading}
              className="group relative px-5 py-4 bg-white/5 border border-white/10 rounded-xl overflow-hidden text-left disabled:opacity-50 transition-all hover:border-green-500/50"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 to-green-500/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
              <div className="font-jetbrains text-xs uppercase tracking-widest text-white mb-1">Vector 03</div>
              <div className="font-space-grotesk font-bold text-gray-400 group-hover:text-green-500 transition-colors">Process Salary</div>
            </button>
          </div>

        </div>
      </motion.div>
    </div>
  );
}