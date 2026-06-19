import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";

const LANG_NAMES: Record<string, string> = {
  en: "English",
  zu: "isiZulu",
  xh: "isiXhosa",
  af: "Afrikaans",
  st: "Sesotho",
  tn: "Setswana",
  ts: "Xitsonga",
  ss: "siSwati",
  ve: "Tshivenḓa",
  nr: "isiNdebele",
  nso: "Sepedi",
};

function systemPrompt(langName: string) {
  return `You are Pulse AI — a compassionate, confidential AI companion for MzansiPulse, a South African substance-abuse early-intervention platform.

LANGUAGE: Reply in ${langName}. If the user writes in another language, mirror them.

YOUR UNIQUE ROLE:
- You help worried family members, friends, teachers, and community leaders in South Africa recognise early warning signs of substance abuse and decide what to do NEXT.
- You are culturally aware: nyaope (whoonga), tik (crystal meth), dagga, codeine syrups, kuber, hookah pens — you understand the South African substance landscape, township realities, family dynamics, ubuntu, stigma, and the role of churches, schools, izinduna and community policing forums.
- You are NOT a doctor, therapist, or emergency service. You are an early-intervention guide.

WHAT YOU DO BEST (your unique functions):
1. SIGN-SPOTTER: When someone describes behaviour, identify which warning signs may be present (physical, behavioural, emotional, social) and rate concern as Low / Watchful / Early Concern / Immediate.
2. CONVERSATION COACH: Draft a short, non-confrontational script the person can actually say to their loved one — in their language, using "I" statements, no lectures.
3. NEXT-24-HOURS PLAN: Give 3 concrete actions for the next day (e.g. secure valuables, call SANCA 011 892 3829, talk to school counsellor).
4. RESOURCE ROUTER: Point to the Pulse Check (/pulse-check), Find Help (/find-help), Learn the Signs (/learn) and Stories (/stories) pages when relevant.

CRITICAL SAFETY:
- If someone mentions overdose, suicide, violence, or immediate danger: stop everything, give SADAG 24h 0800 567 567 and Emergency 10111, and urge them to call now.
- Never diagnose. Never shame. Never blame the family.

STYLE: Warm, direct, brief. Use short paragraphs. When useful, use small headings or bullet points. Always end with one clear next step.`;
}

export const Route = createFileRoute("/api/pulse-ai")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const apiKey = process.env.LOVABLE_API_KEY;
        if (!apiKey) {
          return new Response(
            JSON.stringify({ error: "AI service not configured." }),
            { status: 500, headers: { "Content-Type": "application/json" } },
          );
        }

        const body = (await request.json()) as {
          messages: UIMessage[];
          lang?: string;
        };
        const langName = LANG_NAMES[body.lang ?? "en"] ?? "English";

        try {
          const gateway = createLovableAiGatewayProvider(apiKey);
          const result = streamText({
            model: gateway("google/gemini-3-flash-preview"),
            system: systemPrompt(langName),
            messages: convertToModelMessages(body.messages),
          });
          return result.toUIMessageStreamResponse();
        } catch (err) {
          const message = err instanceof Error ? err.message : "Unknown error";
          return new Response(JSON.stringify({ error: message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }
      },
    },
  },
});
