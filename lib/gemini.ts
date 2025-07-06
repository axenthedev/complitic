import { supabase } from '@/lib/supabase';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY; // Google AI Studio API Key
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

export async function generatePolicyText({
  policy_type,
  store_type,
  region,
  regulation,
  user_id,
}: {
  policy_type: string;
  store_type: string;
  region: string;
  regulation: string;
  user_id?: string;
}) {
  const prompt = `
You are a legal policy generator for e-commerce. 
Generate an updated ${policy_type} policy for a ${store_type} store in ${region}, reflecting the latest changes in this regulation:
---
${regulation}
---
Output only the legal text, no explanations.
`;

  const body = {
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }],
      },
    ],
  };

  const res = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) throw new Error("Gemini API error");
  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

  // Log to policy_update_log if user_id is provided
  if (user_id) {
    await supabase.from('policy_update_log').insert({
      user_id,
      policy_type,
      change: `Auto-updated ${policy_type} policy for ${region}`,
      timestamp: new Date().toISOString(),
    });
  }

  return text;
} 