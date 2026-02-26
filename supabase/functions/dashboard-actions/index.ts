import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { context } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const systemPrompt = `You are a senior malaria elimination strategist advising Nigeria's National Malaria Elimination Programme. Based on the dashboard data provided, generate actionable recommendations.

Return a JSON object with exactly three keys:
- "shortTerm": Markdown-formatted list of 3-4 urgent actions for the next 0-3 months
- "mediumTerm": Markdown-formatted list of 3-4 strategic actions for 3-12 months  
- "longTerm": Markdown-formatted list of 3-4 systemic actions for 1-3 years

Focus on:
- Declining indicators that need immediate attention
- Data-driven specifics (reference actual numbers)
- Actionable steps, not vague advice
- Nigeria-specific context (states, zones, health system)

Each action should start with a bold verb and include a measurable target where possible.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: context },
        ],
        tools: [{
          type: "function",
          function: {
            name: "generate_actions",
            description: "Generate short, medium, and long term action recommendations",
            parameters: {
              type: "object",
              properties: {
                shortTerm: { type: "string", description: "Markdown list of short-term actions (0-3 months)" },
                mediumTerm: { type: "string", description: "Markdown list of medium-term actions (3-12 months)" },
                longTerm: { type: "string", description: "Markdown list of long-term actions (1-3 years)" },
              },
              required: ["shortTerm", "mediumTerm", "longTerm"],
              additionalProperties: false,
            },
          },
        }],
        tool_choice: { type: "function", function: { name: "generate_actions" } },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded" }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required" }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall) throw new Error("No tool call in response");

    const actions = JSON.parse(toolCall.function.arguments);

    return new Response(JSON.stringify(actions), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("dashboard-actions error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
