"use client";
import { useState } from 'react';
import { databases, DATABASE_ID, COLLECTION_ID } from './lib/appwrite';
import { ID } from 'appwrite';

export default function AuraPro() {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!phone) return alert("Isi nomor WA lo, anjing!");
    setLoading(true);
    try {
      // KIRIM DATA KE AURASTORAGE
      await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        {
          recordid: Math.floor(Math.random() * 100000), // Sesuai tipe data Integer lo
          description: `User Login: ${phone}`,
          changetype: "LOGIN_SINKRONISASI",
          result: `User dengan nomor ${phone} berhasil sinkron ke Aura OS.`
        }
      );
      alert("DATA MASUK! Cek Dashboard AuraStorage lo sekarang!");
    } catch (error: any) {
      console.error(error);
      alert("GAGAL! Cek Permissions atau ID di Vercel: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center">
      <main className="w-full max-w-md px-8 pt-20 flex flex-col gap-10">
        <div className="space-y-1">
          <h1 className="text-3xl font-black tracking-tighter">AURA OS <span className="text-purple-500 italic font-light text-xl">v1</span></h1>
          <p className="text-[10px] text-gray-500 font-mono italic">PROJECT: aura-os-tax-debt-plan</p>
        </div>

        <div className="space-y-6">
          <input 
            type="text" 
            placeholder="Nomor WhatsApp" 
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-5 px-6 text-white focus:border-purple-500 outline-none"
          />
          <button 
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-white text-black font-black py-5 rounded-2xl hover:bg-purple-500 hover:text-white transition-all disabled:bg-gray-800"
          >
            {loading ? 'MENGIRIM KE AURASTORAGE...' : 'SINKRONISASI SEKARANG'}
          </button>
        </div>
      </main>
    </div>
  );
}
