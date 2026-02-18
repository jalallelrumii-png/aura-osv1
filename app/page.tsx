"use client";
import { useState } from 'react';
import { databases, DATABASE_ID, COLLECTION_ID } from './lib/appwrite';
import { ID } from 'appwrite';

export default function AuraPro() {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!phone) return alert("Mohon masukkan nomor WhatsApp Anda.");
    setLoading(true);
    try {
      await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        {
          recordid: Math.floor(Math.random() * 100000),
          description: `Koneksi Klien: ${phone}`,
          changetype: "SINKRONISASI_USER",
          result: `Sistem berhasil mengamankan jalur audit untuk klien ${phone}.`
        }
      );
      alert("Koneksi Berhasil! Data Anda telah tersinkronisasi di AuraStorage.");
    } catch (error: any) {
      console.error(error);
      alert("Gagal terhubung. Pastikan konfigurasi Platform di Appwrite sudah sesuai.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center font-sans overflow-hidden">
      {/* GLOW DECORATION */}
      <div className="fixed -top-24 -left-24 w-96 h-96 bg-blue-600/10 blur-[100px] rounded-full" />
      <div className="fixed -bottom-24 -right-24 w-96 h-96 bg-indigo-600/10 blur-[100px] rounded-full" />

      <main className="w-full max-w-md px-8 pt-24 flex flex-col gap-10 z-10">
        {/* BRANDING */}
        <div className="space-y-2">
          <h1 className="text-4xl font-black tracking-tighter uppercase italic bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
            Aura OS <span className="text-blue-500 lowercase not-italic">v1</span>
          </h1>
          <p className="text-[10px] text-gray-500 font-mono tracking-[0.3em] uppercase">Professional Audit Infrastructure</p>
        </div>

        {/* INPUT CARD */}
        <div className="bg-white/[0.03] border border-white/10 rounded-[35px] p-8 backdrop-blur-md shadow-2xl">
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-2 text-blue-50">Audit Jasa Pajak</h2>
            <p className="text-xs text-gray-400 leading-relaxed">
              Hubungkan nomor Anda untuk sinkronisasi data dengan sistem <span className="text-blue-400">AuraStorage</span>.
            </p>
          </div>

          <div className="space-y-4">
            <input 
              type="text" 
              placeholder="08xxxxxxxxxx" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-2xl py-4 px-6 text-white focus:border-blue-500/50 outline-none transition-all font-mono"
            />
            <button 
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-white text-black font-black py-4 rounded-2xl active:scale-95 transition-transform hover:bg-blue-500 hover:text-white disabled:bg-gray-800"
            >
              {loading ? 'MENYAMBUNGKAN...' : 'MULAI SINKRONISASI'}
            </button>
          </div>
        </div>

        {/* SYSTEM STATUS */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/5 border border-white/5 p-4 rounded-2xl">
            <span className="block text-[8px] text-gray-500 uppercase tracking-widest mb-1">Project ID</span>
            <span className="text-[10px] font-mono text-blue-400">aura-os-tax-debt-plan</span>
          </div>
          <div className="bg-white/5 border border-white/5 p-4 rounded-2xl">
            <span className="block text-[8px] text-gray-500 uppercase tracking-widest mb-1">Database</span>
            <span className="text-[10px] font-mono text-blue-400">DatabaseAura</span>
          </div>
        </div>
      </main>

      <footer className="mt-auto pb-10 opacity-20">
        <p className="text-[8px] font-mono uppercase tracking-[0.5em]">Securely Processed by Llama 3.3</p>
      </footer>
    </div>
  );
}
