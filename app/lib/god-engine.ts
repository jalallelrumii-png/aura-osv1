export type AuraMode = 'TAX' | 'CONTENT' | 'DEBT' | 'PLAN';

export const hitAuraEngine = async (mode: AuraMode, input: string, key: string) => {
  const prompts = {
    TAX: "Senior Tax Consultant Indonesia. UU HPP, PPh 21 TER, PPN 11%. Jawab dengan kalkulasi presisi.",
    DEBT: "Master Negotiator & Debt Recovery. Buat skrip penagihan persuasif dan legal.",
    PLAN: "Business Strategist. Bedah model bisnis, profit, dan roadmap 90 hari.",
    CONTENT: "Viral Growth Engineer. Buat hook dan skrip konten retensi tinggi."
  };

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: { 
      'Authorization': `Bearer ${key}`, 
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: `${prompts[mode]}. Jawab wajib dalam format JSON murni.` },
        { role: "user", content: input }
      ],
      response_format: { type: "json_object" }
    })
  });
  
  if (!response.ok) throw new Error("Neural Engine Error");
  const data = await response.json();
  return JSON.parse(data.choices[0].message.content);
};