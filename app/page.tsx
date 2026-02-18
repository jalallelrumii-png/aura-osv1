"use client";
import { useState } from 'react';
import { databases, DATABASE_ID, COLLECTION_ID } from './lib/appwrite';
import { ID } from 'appwrite';

export default function AuraOSFull() {
  // Authentication State
  const [phone, setPhone] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  // Audit Feature State
  const [taxData, setTaxData] = useState('');
  const [auditResult, setAuditResult] = useState('');
  const [isAuditing, setIsAuditing] = useState(false);

  // 1. FUNGSI LOGIN & DATABASE SYNC
  const handleLogin = async () => {
    if (!phone) return alert("Masukkan nomor WhatsApp!");
    setLoading(true);
    try {
      await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        recordid: Math.floor(Math.random() * 100000),
        description: `Login Klien: ${phone}`,
        changetype: "USER_LOGIN",
        result: "Sesi Audit Dimulai"
      });
      setIsLoggedIn(true);
    } catch (error: any) {
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // 2. FUNGSI ENGINE AI AUDIT
  const handleRunAudit = async () => {
    if (!taxData) return alert("Masukkan data pajak!");
    setIsAuditing(true);
    try {
      // Simulasi Analisis Llama 3.3
      const analysis = `HASIL AUDIT AURA OS: Data "${taxData}" menunjukkan indikasi hutang pajak yang perlu direstrukturisasi. Rekomendasi: Gunakan skema cicilan PPh Pasal 25.`;
      
      await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        recordid: Math.floor(Math.random() * 100000),
        description: `Audit Pajak Klien: ${phone}`,
        changetype: "TAX_REPORT",
        result: analysis
      });

      setAuditResult(analysis);
    } catch (error: any) {
      alert("Gagal simpan audit: " + error.message);
    } finally {
      setIsAuditing(false);
    }
  };

  // --- UI HANDLER ---

  // TAMPILAN DASHBOARD (SETELAH LOGIN)
  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#050505] text-white p-6 font-sans">
        <div className="max-w-md mx-auto space-y-8">
          <header className="flex justify-between items-center py-4 border-b border-white/10">
            <h1 className="text-xl font-black italic tracking-tighter text-blue-500">AURA PRO OS</h1>
            <span className="text-[10px] font-mono text-gray-500 uppercase">User: {phone}</span>
          </header>

          <div className="space-y-6">
            <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 space-y-4">
              <h2 className="text-lg font-bold">Input Laporan Pajak</h2>
              <textarea 
                value={taxData}
                onChange={(e) => setTaxData(e.target.value)}
                placeholder="Masukkan rincian hutang pajak Anda di sini..."
                className="w-full bg-black border border-white/10 rounded-2xl p-4 text-sm font-mono h-40 outline-none focus:border-blue-500 transition-all"
              />
              <button 
                onClick={handleRunAudit}
                disabled={isAuditing}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-2xl transition-all disabled:opacity-50"
              >
                {isAuditing ? 'AI ANALYZING...' : 'JALANKAN AUDIT AI'}
              </button>
            </div>

            {auditResult && (
              <div className="bg-blue-600/20 border border-blue-500/30 rounded-3xl p-6 space-y-2 animate-pulse">
                <h3 className="text-xs font-bold text-blue-400 uppercase tracking-widest">Llama 3.3 Analysis Report:</h3>
                <p className="text-sm leading-relaxed">{auditResult}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // TAMPILAN GATEWAY (SEBELUM LOGIN)
  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-md space-y-10">
        <div className="text-center space-y-2">
          <h1 className="text-5xl font-black italic tracking-tighter">AURA OS</h1>
          <p className="text-gray-500 text-[9px] uppercase tracking-[0.6em]">Professional Tax Auditor</p>
        </div>
        
        <div className="bg-white/[0.02] border border-white/10 rounded-[40px] p-8 space-y-6 backdrop-blur-3xl shadow-2xl">
          <div className="space-y-2">
            <label className="text-[10px] text-gray-600 uppercase font-bold ml-2">WhatsApp Access</label>
            <input 
              type="text" 
              placeholder="08123456789" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-2xl py-5 px-6 outline-none focus:border-blue-500 transition-all text-center text-xl font-mono"
            />
          </div>
          <button 
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-white text-black font-black py-5 rounded-2xl active:scale-95 transition-all text-lg hover:bg-blue-500 hover:text-white"
          >
            {loading ? 'SYNCING...' : 'MASUK KE SISTEM'}
          </button>
        </div>

        <div className="flex justify-between px-4 opacity-20">
          <span className="text-[8px] font-mono uppercase tracking-widest">Project: aura-os-tax-debt-plan</span>
          <span className="text-[8px] font-mono uppercase tracking-widest">Db: DatabaseAura</span>
        </div>
      </div>
    </div>
  );
}
