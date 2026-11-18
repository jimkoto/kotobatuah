/**
 * Cloudflare Pages Function: /api/gemini/chat
 * Server-side AI Advisor endpoint powered by Google Gemini REST API (Native Edge Fetch)
 * Zero external dependencies - 100% compatible with Cloudflare Workers / Pages Functions
 */

type PagesFunction<T = any> = (context: {
  env: T;
  request: Request;
  params?: any;
  next?: () => Promise<Response>;
  data?: any;
}) => Promise<Response> | Response;

interface Env {
  GEMINI_API_KEY?: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  try {
    const body: any = await context.request.json();
    const { message } = body;

    const apiKey = context.env.GEMINI_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({
        text: `[Jim Koto Tech Advisor]: API key belum dikonfigurasi di Cloudflare environment secret (GEMINI_API_KEY). Pertanyaan Anda: "${message}". Anda dapat menambahkan secret via 'wrangler secret put GEMINI_API_KEY'.`
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    // Direct Google Gemini 2.5 Flash REST API call (native edge fetch)
    const geminiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const payload = {
      system_instruction: {
        parts: [
          {
            text: `You are the Jim Koto Editorial Tech Advisor & Akomoda Network System Architect for jimkoto.my.id.
Founder: Jim Koto (James Isa).
Motto: "Mesin Untuk Efisiensi. Manusia Untuk Makna. Kesadaran Adalah Anugerah."
Focus: Software Architecture, React 19/Next.js 15, Core Web Vitals, Cloudflare Edge Deployment, and UMKM Digitalization in Indonesia.
Provide sharp, insightful, and practical engineering guidance with respectful and uplifting tone.`
          }
        ]
      },
      contents: [
        {
          role: "user",
          parts: [{ text: message }]
        }
      ]
    };

    const res = await fetch(geminiEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const errText = await res.text();
      return new Response(JSON.stringify({
        error: `Gemini API Error: ${res.status}`,
        details: errText
      }), {
        status: res.status,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    const data: any = await res.json();
    const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated.";

    return new Response(JSON.stringify({
      text: replyText
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({
      error: error.message || "Failed to process chat request"
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
};

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    }
  });
};
