"use client";
import { useState } from 'react';
import { databases, DATABASE_ID, COLLECTION_ID } from './lib/appwrite';
import { ID } from 'appwrite';

export default function AuraOS() {
  const [phone, setPhone] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [taxData, setTaxData] = useState('');
  const [auditResult, setAuditResult] = useState('');

  const handleLogin = async () => {
    if (!phone) return alert("Mohon masukkan nomor WhatsApp.");
    setLoading(true);
    try {
      await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        recordid: Math.floor(Math.random() * 100000),
        description: `Login: ${phone}`,
        changetype: "AUTH",
        result: "Success"
      });
      setIsLoggedIn(true);
    } catch (e: any) {
      alert("Error Koneksi: Pastikan Permissions Appwrite sudah SET ANY. " + e.message);
    } finally {
      setLoading(false);
    }
  };

  const runAudit = async () => {
    if (!taxData) return alert("Isi data pajak.");
    setLoading(true);
    try {
      const result = `Hasil Audit Aura: Data ${taxData} valid. Rekomendasi: Optimasi PPh.`;
      await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        recordid: Math.floor(Math.random() * 100000),
        description: `Audit: ${phone}`,
        changetype: "AUDIT_REPORT",
        result: result
      });
      setAuditResult(result);
    } catch (e: any) {
      alert("Gagal simpan: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-black text-white p-10 flex flex-col items-center">
        <h1 className="text-2xl font-black mb-8 text-blue-500 italic">AURA PRO DASHBOARD</h1>
        <div className="w-full max-w-md space-y-4">
          <textarea 
            className="w-full bg-zinc-900 border border-zinc-800 p-4 rounded-2xl h-40 outline-none focus:border-blue-500"
            placeholder="Input data laporan pajak..."
            value={taxData}
            onChange={(e) => setTaxData(e.target.value)}
          />
          <button onClick={runAudit} className="w-full bg-blue-600 py-4 rounded-2xl font-bold">RUN AI AUDIT</button>
          {auditResult && <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-2xl text-sm italic">{auditResult}</div>}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-black italic mb-2 tracking-tighter">AURA OS v1</h1>
      <p className="text-[10px] text-zinc-500 tracking-[0.5em] mb-10 uppercase">Professional Auditor</p>
      <div className="w-full max-w-md bg-zinc-900/50 border border-zinc-800 p-8 rounded-[40px] space-y-6">
        <input 
          type="text" placeholder="WhatsApp Number" value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full bg-black border border-zinc-800 py-4 px-6 rounded-2xl text-center font-mono outline-none focus:border-blue-500"
        />
        <button onClick={handleLogin} disabled={loading} className="w-full bg-white text-black font-black py-4 rounded-2xl hover:bg-blue-500 hover:text-white transition-all">
          {loading ? 'CONNECTING...' : 'ACCESS SYSTEM'}
        </button>
      </div>
    </div>
  );
}
