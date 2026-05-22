'use client';
import { motion } from 'framer-motion';

export const Navbar = () => (
  <motion.nav 
    initial={{ y: -100, opacity: 0 }} 
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl px-6 py-3 rounded-full border border-white/10 bg-[#0a0a0f]/60 backdrop-blur-2xl flex justify-between items-center shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
  >
    <span className="font-space-grotesk font-black text-white tracking-tighter text-xl flex items-center gap-2">
      <div className="w-2 h-2 rounded-full bg-[#3B82F6] animate-pulse" />
      GX.NEURAL
    </span>
    <div className="hidden md:flex gap-8 font-jetbrains text-[10px] uppercase tracking-widest text-gray-400">
      <a href="#demo" className="hover:text-white transition-colors">Live Simulation</a>
      <a href="#architecture" className="hover:text-white transition-colors">Architecture</a>
    </div>
    <button className="px-5 py-2 rounded-full bg-white/5 border border-white/10 text-[#3B82F6] font-jetbrains text-xs uppercase tracking-widest hover:bg-[#3B82F6] hover:text-white transition-all duration-300">
      Initialize
    </button>
  </motion.nav>
);

export const Hero = () => (
  <section className="relative pt-40 pb-20 flex flex-col justify-center items-center px-4 text-center z-10">
    <motion.div
      initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-[#8B5CF6]/30 bg-[#8B5CF6]/10 backdrop-blur-md">
        <span className="font-jetbrains text-[10px] text-[#8B5CF6] uppercase tracking-widest">
          UTMxHackathon '26 // Youth Resilience
        </span>
      </div>
      
      <h1 className="font-space-grotesk font-black text-6xl md:text-[8rem] text-white tracking-tighter leading-[0.85] mb-8">
        FINANCIAL <br /> 
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] via-[#8B5CF6] to-[#3B82F6] bg-[length:200%_auto] animate-gradient">
          RESILIENCE.
        </span>
      </h1>
      
      <p className="font-jetbrains text-gray-300 text-sm md:text-base max-w-2xl mx-auto uppercase tracking-widest leading-relaxed">
        Transforming passive banking into an active, automated habit-builder for the next generation of Malaysian savers.
      </p>
      
      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-12 px-10 py-5 bg-[#3B82F6]/10 hover:bg-[#3B82F6]/20 border border-[#3B82F6]/50 hover:border-[#3B82F6] text-white font-space-grotesk font-bold text-lg rounded-full backdrop-blur-md transition-all shadow-[0_0_30px_rgba(59,130,246,0.2)] hover:shadow-[0_0_50px_rgba(59,130,246,0.4)]"
      >
        CONNECT GXBANK //
      </motion.button>
    </motion.div>
  </section>
);

export const Services = () => {
  const features = [
    { title: "Context-Aware AI", size: "col-span-12 md:col-span-8", desc: "Analyzes real-time spending velocity to generate personalized financial guidance before debt accumulates." },
    { title: "Behavioral Nudges", size: "col-span-12 md:col-span-4", desc: "Smart spending alerts & dynamic milestone rewards." },
    { title: "Auto-Savings", size: "col-span-12 md:col-span-4", desc: "Salary-triggered transfers & micro-round-ups." },
    { title: "Gamification", size: "col-span-12 md:col-span-4", desc: "Social accountability & competitive savings streaks." },
    { title: "GXBank Native", size: "col-span-12 md:col-span-4", desc: "Seamless integration with existing Savings Pockets." },
  ];

  return (
    <section id="architecture" className="py-24 px-6 max-w-7xl mx-auto z-10 relative">
      <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8">
        <h2 className="font-space-grotesk font-bold text-4xl text-white uppercase tracking-tighter">System <br/>Architecture_</h2>
        <p className="font-jetbrains text-xs text-gray-400 uppercase tracking-widest max-w-xs mt-4 md:mt-0 text-right">
          Built to make financial health the default setting.
        </p>
      </div>

      <div className="grid grid-cols-12 gap-4">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -5, scale: 1.01 }}
            className={`${f.size} p-8 rounded-3xl bg-[#0a0a0f]/80 backdrop-blur-xl border border-white/5 hover:border-[#8B5CF6]/50 transition-all duration-300 flex flex-col justify-between min-h-[280px] group relative overflow-hidden`}
          >
            {/* Hover Gradient Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#8B5CF6]/0 to-[#8B5CF6]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10 flex justify-between items-start">
              <div className="font-jetbrains text-[#3B82F6] text-xs uppercase tracking-widest">0{i+1} // MODULE</div>
              <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#8B5CF6]/50 transition-colors">
                <div className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-[#8B5CF6] transition-colors" />
              </div>
            </div>
            
            <div className="relative z-10">
              <h3 className="font-space-grotesk font-bold text-3xl text-white leading-tight mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">
                {f.title}
              </h3>
              {/* Updated Text Color for Readability */}
              <p className="font-jetbrains text-gray-200 text-sm md:text-base leading-relaxed">{f.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};