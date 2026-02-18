"use client";
import React, { useState, useEffect } from 'react';
import { Settings, Phone, Search, ChevronDown } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';
import { ID, Query } from 'appwrite';
import { databases, DATABASE_ID, COLLECTION_ID } from './lib/appwrite';

export default function AuraSaaS() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [waNumber, setWaNumber] = useState('');
  const [showConfig, setShowConfig] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [history, setHistory] = useState<any[]>([]);
  const [objek, setObjek] = useState('');
  const [nilai, setNilai] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const session = localStorage.getItem('aura_session');
    const key = localStorage.getItem('groq_key');
    if (session) {
      setIsLoggedIn(true);
      setWaNumber(session);
      getHistory(session);
    }
    if (key) setApiKey(key);
  }, []);

  const getHistory = async (userId: string) => {
    try {
      const res = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
        Query.equal('userid', userId),
        Query.orderDesc('timestamp')
      ]);
      setHistory(res.documents);
    } catch (e) { console.error(e); }
  };

  const handleLogin = () => {
    if (waNumber.length < 10) return;
    localStorage.setItem('aura_session', waNumber);
    setIsLoggedIn(true);
    getHistory(waNumber);
  };

  const runAudit = async () => {
    if (!apiKey || !objek || !nilai) return;
    setLoading(true);
    try {
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [{ role: "user", content: `Analisis pajak: ${objek} nilai ${nilai}` }]
        })
      });
      const data = await res.json();
      const aiResponse = data.choices[0].message.content;

      const payload = {
        userid: waNumber,
        recordId: parseInt(nilai),
        description: objek,
        changetype: 'TAX',
        timestamp: new Date().toISOString(),
        result: aiResponse
      };

      await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), payload);
      setObjek(''); setNilai('');
      getHistory(waNumber);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex flex-col px-8 py-20 font-sans">
        <h1 className="text-5xl font-black tracking-tighter mb-2">Aura Pro.</h1>
        <p className="text-zinc-400 font-medium mb-12">Smart Auditor in your pocket.</p>
        <div className="bg-white rounded-[40px] p-10 shadow-sm border border-zinc-100">
          <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-4 mb-2 block">WhatsApp Number</label>
          <input type="number" className="w-full bg-[#F2F2F7] rounded-2xl p-5 outline-none font-bold mb-6" placeholder="0812xxxx" value={waNumber} onChange={(e) => setWaNumber(e.target.value)} />
          <button onClick={handleLogin} className="w-full bg-black text-white py-5 rounded-3xl font-black text-lg">Sign In</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] px-6 py-10 font-sans">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black tracking-tighter">Aura Pro.</h1>
        <button onClick={() => setShowConfig(true)} className="p-3 bg-zinc-200 rounded-2xl"><Settings size={22} /></button>
      </div>

      <div className="bg-white rounded-[40px] p-6 mb-6 shadow-sm border border-zinc-100 h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={history.slice(0, 5).reverse()}>
            <XAxis dataKey="description" hide />
            <Bar dataKey="recordId" radius={[10, 10, 0, 0]} barSize={40}>
              {history.map((_, i) => <Cell key={i} fill={i === 0 ? '#007AFF' : '#E5E5EA'} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-[40px] p-8 mb-6 shadow-sm border border-zinc-100 space-y-4">
        <input className="w-full bg-[#F2F2F7] rounded-2xl p-5 outline-none font-bold" placeholder="Objek Pajak" value={objek} onChange={e => setObjek(e.target.value)} />
        <input className="w-full bg-[#F2F2F7] rounded-2xl p-5 outline-none font-bold" placeholder="Nilai OTR (Rp)" type="number" value={nilai} onChange={e => setNilai(e.target.value)} />
        <button onClick={runAudit} className="w-full bg-black text-white py-5 rounded-3xl font-black text-lg">{loading ? 'Processing...' : 'Hitung Sekarang'}</button>
      </div>

      <div className="space-y-4">
        {history.map((item) => (
          <div key={item.$id} className="bg-white rounded-[30px] p-6 shadow-sm border border-zinc-100">
            <p className="text-[10px] font-black text-blue-600 uppercase mb-1">{item.changetype}</p>
            <h3 className="font-bold text-lg">{item.description}</h3>
            <p className="text-zinc-400 text-sm font-medium">Rp {item.recordId.toLocaleString()}</p>
          </div>
        ))}
      </div>

      {showConfig && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-md z-50 flex items-center justify-center p-8">
          <div className="bg-white w-full max-w-sm rounded-[45px] p-12 text-center shadow-2xl">
            <Settings size={40} className="mx-auto mb-4 text-blue-500" />
            <h3 className="text-2xl font-black mb-2">Config AI</h3>
            <p className="text-xs text-zinc-400 font-bold mb-8 uppercase tracking-widest">Groq API Key (gsk_...)</p>
            <input className="w-full bg-[#F2F2F7] rounded-2xl p-5 outline-none font-bold text-center mb-6" placeholder="gsk_xxxx" value={apiKey} onChange={e => {setApiKey(e.target.value); localStorage.setItem('groq_key', e.target.value)}} />
            <button onClick={() => setShowConfig(false)} className="w-full bg-black text-white py-5 rounded-3xl font-black">Simpan</button>
          </div>
        </div>
      )}
    </div>
  );
}