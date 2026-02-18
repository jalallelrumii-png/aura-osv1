"use client";
import React, { useState, useEffect } from 'react';
import { Settings, Zap, Shield, TrendingUp, Search, ChevronDown, Phone } from 'lucide-react';
import { BarChart, Bar, ResponsiveContainer, Cell, XAxis, YAxis, Tooltip } from 'recharts';

type Mode = 'TAX' | 'DEBT' | 'PLAN';

export default function AuraOS() {
  const [isAuth, setIsAuth] = useState(false);
  const [wa, setWa] = useState('');
  const [mode, setMode] = useState<Mode>('TAX');
  const [input, setInput] = useState('');
  const [nilai, setNilai] = useState('');
  const [openConfig, setOpenConfig] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    const savedKey = localStorage.getItem('aura_key');
    if (savedKey) setApiKey(savedKey);
    if (localStorage.getItem('aura_session')) setIsAuth(true);
  }, []);

  const handleLogin = () => {
    if (wa.length < 10) return;
    localStorage.setItem('aura_session', wa);
    setIsAuth(true);
  };

  const executeNeural = async () => {
    if (!apiKey) return setOpenConfig(true);
    setLoading(true);
    // Logic hit API Llama 3.3 di sini
    setTimeout(() => {
      const newEntry = { name: input || 'New Task', value: parseInt(nilai) || 1000000 };
      setHistory([newEntry, ...history]);
      setLoading(false);
    }, 1500);
  };

  if (!isAuth) {
    return (
      <div className="min-h-screen p-8 flex flex-col justify-center bg-black">
        <Zap className="text-blue-500 mb-4" size={48} />
        <h1 className="text-6xl font-black tracking-tighter mb-2">AURA OS.</h1>
        <p className="text-zinc-500 font-bold mb-10">Neural Strategy: TAX, DEBT, PLAN.</p>
        <div className="glass-card p-8 space-y-4">
          <input 
            type="number" placeholder="WhatsApp Number" 
            className="input-neural text-lg"
            onChange={(e) => setWa(e.target.value)}
          />
          <button onClick={handleLogin} className="btn-neural w-full text-xl">Access System</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pb-20">
      {/* Top Header */}
      <div className="flex justify-between items-center px-6 py-10">
        <div>
          <h1 className="text-3xl font-black italic tracking-tighter">AURA OS.</h1>
          <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Active Session: {mode}</p>
        </div>
        <button onClick={() => setOpenConfig(true)} className="p-4 bg-zinc-900 rounded-2xl">
          <Settings size={24} className="text-zinc-400" />
        </button>
      </div>

      <div className="px-6 space-y-6">
        {/* Analytics Graph */}
        <div className="glass-card p-6 h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={history.length > 0 ? history : [{name: 'Empty', value: 0}]}>
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                {history.map((_, i) => <Cell key={i} fill={i === 0 ? '#007AFF' : '#333'} />)}
              </Bar>
              <XAxis dataKey="name" hide />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Mode Selector */}
        <div className="flex gap-2">
          {(['TAX', 'DEBT', 'PLAN'] as Mode[]).map((m) => (
            <button 
              key={m}
              onClick={() => setMode(m)}
              className={`flex-1 py-4 rounded-2xl font-black text-xs transition-all ${mode === m ? 'bg-blue-600 text-white' : 'bg-zinc-900 text-zinc-500'}`}
            >
              {m}
            </button>
          ))}
        </div>

        {/* Input Interface */}
        <div className="glass-card p-8 space-y-5">
          <div>
            <label className="text-[9px] font-black text-zinc-500 uppercase mb-2 block tracking-[0.2em]">Neural Command</label>
            <input 
              className="input-neural" 
              placeholder={mode === 'TAX' ? "Objek Pajak..." : mode === 'DEBT' ? "Detail Hutang..." : "Rencana Bisnis..."}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <div>
            <label className="text-[9px] font-black text-zinc-500 uppercase mb-2 block tracking-[0.2em]">Valuation (RP)</label>
            <input 
              type="number"
              className="input-neural" 
              placeholder="0"
              value={nilai}
              onChange={(e) => setNilai(e.target.value)}
            />
          </div>
          <button onClick={executeNeural} className="btn-neural w-full text-xl shadow-[0_0_30px_rgba(0,122,255,0.3)]">
            {loading ? "PROCESING..." : `Execute ${mode} Strategy`}
          </button>
        </div>

        {/* Search Bar */}
        <div className="bg-zinc-900 p-5 rounded-2xl flex items-center gap-4">
          <Search size={20} className="text-zinc-600" />
          <input className="bg-transparent outline-none font-bold text-zinc-400 w-full" placeholder="Search History..." />
        </div>

        {/* List Riwayat */}
        {history.map((item, i) => (
          <div key={i} className="glass-card p-6 flex justify-between items-center">
            <div>
              <h3 className="font-black text-zinc-100 uppercase tracking-tight">{item.name}</h3>
              <p className="text-blue-500 font-black">Rp {item.value.toLocaleString()}</p>
            </div>
            <ChevronDown className="text-zinc-700" />
          </div>
        ))}
      </div>

      {/* MODAL CONFIG AI (REPLIKA SCREENSHOT) */}
      {openConfig && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 flex items-center justify-center p-8">
          <div className="bg-[#111] w-full max-w-sm rounded-[50px] p-12 text-center border border-zinc-800 shadow-2xl">
            <div className="bg-zinc-900 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Settings size={40} className="text-blue-500" />
            </div>
            <h3 className="text-3xl font-black mb-2 italic">Config AI.</h3>
            <p className="text-[10px] text-zinc-500 font-bold mb-10 uppercase tracking-widest px-4">
              Enter Groq API Key (gsk_...) to activate AURA Neural Station.
            </p>
            <input 
              className="input-neural text-center mb-8 border border-zinc-800"
              placeholder="gsk_xxxxxxxxxxxx"
              value={apiKey}
              onChange={(e) => {
                setApiKey(e.target.value);
                localStorage.setItem('aura_key', e.target.value);
              }}
            />
            <button onClick={() => setOpenConfig(false)} className="btn-neural w-full mb-6">Save Neural Key</button>
            <button onClick={() => setOpenConfig(false)} className="text-zinc-600 font-black text-xs uppercase tracking-widest">Back to OS</button>
          </div>
        </div>
      )}
    </div>
  );
}