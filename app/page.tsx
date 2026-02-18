"use client";
import { useState } from 'react';

export default function AuraPro() {
  const [phone, setPhone] = useState('');

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans flex flex-col items-center">
      {/* GLOW DEKORASI */}
      <div className="fixed top-0 left-0 w-full h-32 bg-purple-600/10 blur-[100px] pointer-events-none" />
      
      <main className="w-full max-w-md px-8 pt-20 flex flex-col gap-10">
        {/* BRANDING */}
        <div className="space-y-1">
          <h1 className="text-3xl font-black tracking-tighter bg-gradient-to-br from-white to-gray-500 bg-clip-text text-transparent">
            AURA OS <span className="text-purple-500 font-light italic">v1</span>
          </h1>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <p className="text-[10px] text-gray-500 font-mono tracking-widest uppercase italic">System Online: AuraStorage</p>
          </div>
        </div>

        {/* LOGIN SECTION */}
        <div className="space-y-6">
          <div className="space-y-3">
            <h2 className="text-xl font-bold tracking-tight">Audit Jasa Pajak.</h2>
            <p className="text-sm text-gray-400 leading-relaxed">Masukkan nomor WhatsApp untuk sinkronisasi data audit dengan <span className="text-white border-b border-purple-500/50">aura-os-tax-debt-plan</span>.</p>
          </div>

          <div className="space-y-4">
            <input 
              type="text" 
              placeholder="0812xxxxxxx" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-5 px-6 text-white focus:outline-none focus:border-purple-500 transition-all text-lg shadow-inner"
            />
            <button className="w-full bg-white text-black font-black py-5 rounded-2xl hover:bg-purple-500 hover:text-white transition-all active:scale-[0.97] shadow-lg">
              MULAI AUDIT SEKARANG
            </button>
          </div>
        </div>

        {/* STATUS CARD */}
        <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 space-y-4">
          <div className="flex justify-between">
            <span className="text-[9px] text-gray-600 uppercase font-bold tracking-widest">Database ID</span>
            <span className="text-[10px] font-mono text-purple-400">DatabaseAura</span>
          </div>
          <div className="flex justify-between border-t border-white/5 pt-4">
            <span className="text-[9px] text-gray-600 uppercase font-bold tracking-widest">Engine</span>
            <span className="text-[10px] font-mono text-pink-500">LLAMA-3.3-AURA</span>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="mt-auto pb-10">
        <p className="text-[9px] text-gray-700 font-mono tracking-[0.5em] uppercase">Built for Professionals</p>
      </footer>
    </div>
  );
}
