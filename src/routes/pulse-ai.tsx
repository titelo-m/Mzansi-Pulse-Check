// src/routes/pulse-ai.tsx
import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { Bot, Send, Sparkles, User, ArrowLeft } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/pulse-ai")({
  head: () => ({
    meta: [
      { title: "Pulse AI — Your confidential MzansiPulse companion" },
      {
        name: "description",
        content:
          "Chat with Pulse AI in your language. Spot the signs, draft the conversation, get a 24-hour plan.",
      },
    ],
  }),
  component: PulseAIPage,
});

// Pre-written responses for all keywords
function getAIResponse(message: string): string {
  const lower = message.toLowerCase();
  
  // Check for crisis keywords first
  if (lower.includes("overdose") || lower.includes("suicide") || lower.includes("danger") || lower.includes("emergency") || lower.includes("10111") || lower.includes("hurt") || lower.includes("killing")) {
    return `⚠️ **IMMEDIATE ACTION REQUIRED**

I'm very concerned about what you're sharing. Please take these steps right now:

🚨 **Call SADAG 24-hour Helpline: 0800 567 567**
🚨 **If there's immediate danger, call 10111**

You don't have to handle this alone. Help is available right now.

---
*Pulse AI cares about your safety. Please make the call.*`;
  }

  // Check for each question and return proper answer
  if (lower.includes("withdrawn") && lower.includes("money")) {
    return `**My 17-year-old son has become withdrawn and money keeps going missing**

I hear you. This is one of the most common and heartbreaking situations parents face. The fact that you're noticing these changes means you're already doing the right thing.

**What this usually means:**
- Your son is likely going through something he doesn't know how to talk about
- The missing money is often a sign that he's buying substances or alcohol
- The withdrawal is his way of hiding what's happening from you

**Here's a script you can use to start the conversation:**

*"I've noticed you've been spending a lot of time alone lately, and I've also noticed some money going missing from home. I'm not angry — I'm worried about you. I love you and I want to understand what's going on. If there's something you're struggling with, I want to help, not punish."*

**What to do next:**
1️⃣ Choose a calm moment — not when you're angry or tired
2️⃣ Don't accuse or interrogate — approach with care
3️⃣ Listen more than you talk — let him explain
4️⃣ Don't promise not to get help — you can promise to support him through it
5️⃣ Contact SADAG on **0800 567 567** for free counselling and guidance
6️⃣ Visit the Pulse Check page for a proper assessment

**Remember:** Your son needs you to be his safe place, not another person who's angry at him. You've got this.`;
  }

  if (lower.includes("brother") && lower.includes("nyaope")) {
    return `**Help me write what to say to my brother. I think he's using nyaope.**

This is a really tough situation, and I can feel how much you care about your brother. Nyaope is one of the most destructive drugs in our communities, but with the right approach, you can help him.

**Here's exactly what you can say to him:**

*"I've noticed you haven't been yourself lately. I've seen you losing weight and pulling away from everyone. I'm not here to judge you or tell you what to do. I'm your brother and I love you. I'm worried about you, and I want you to know that I'm here for you no matter what. If you're going through something, you don't have to do it alone. When you're ready to talk, I'll listen."*

**What to do after you say this:**
1️⃣ Don't push — he might not be ready to talk right away
2️⃣ Let him know the door is always open
3️⃣ Offer specific help — "Can I take you to see someone who can help?"
4️⃣ Watch for his response — if he opens up, listen without interrupting
5️⃣ If he gets angry, stay calm — he's probably scared and ashamed

**What to do if he's using nyaope:**
- Nyaope withdrawal is very difficult — he will need professional help
- Call SANCA on **011 892 3829** for advice on what to do
- Contact SADAG on **0800 567 567** for counselling support
- Visit the Find Help page for rehab centres near you

**You're a good sibling for caring. Don't give up on him. Help is available.**`;
  }

  if (lower.includes("vape") && lower.includes("daughter")) {
    return `**Give me a 24-hour action plan — I just found a vape pen in my daughter's bag.**

Finding a vape in your daughter's bag is scary, but don't panic. Here's a clear plan for the next 24 hours:

**Step 1: Take a breath (Next 10 minutes)**
- Step away and calm down — don't react immediately
- Remind yourself: she's not a bad kid, she's making a bad choice
- Your goal is to help, not to punish

**Step 2: Plan the conversation (Next 30 minutes)**
- Write down what you want to say
- Choose a quiet, private time to talk
- Prepare yourself mentally — stay calm

**Step 3: Have the conversation (Within 24 hours)**
- Start gently: *"I found something in your bag yesterday. I want to talk about it because I'm worried about you."*
- Ask questions: *"When did you start? Why? What do you know about vaping?"*
- Listen — don't interrupt, don't judge
- Share your concern: *"I'm worried about what this could do to your health."*
- Don't forbid — offer support instead

**Step 4: Get support (Within 24 hours)**
- Call SANCA on **011 892 3829** for guidance
- Visit the Learn the Signs page for more information
- Consider getting help from a school counsellor

**Remember:** Your daughter needs you to be a safe person to talk to, not another authority to rebel against.`;
  }

  if (lower.includes("teenage") && lower.includes("moodiness")) {
    return `**What's the difference between teenage moodiness and early warning signs?**

This is such an important question! It's really hard to tell the difference, but here's a guide:

**Normal teenage moodiness looks like:**
- ✅ Mood swings that pass within a few hours
- ✅ Wanting more privacy but still spending some time with family
- ✅ Being moody but still communicating when asked
- ✅ Testing boundaries but respecting them when explained
- ✅ Changing friend groups occasionally but still having some old friends

**Warning signs that something is wrong:**
- ⚠️ Extreme mood swings that last for days or weeks
- ⚠️ Complete withdrawal from family — avoiding meals, refusing to talk
- ⚠️ Money or valuables going missing without explanation
- ⚠️ Drastic changes in appearance — weight loss, poor hygiene
- ⚠️ Lying constantly about where they've been
- ⚠️ New friends they absolutely refuse to introduce to you
- ⚠️ Dropping out of activities they used to love
- ⚠️ Failing grades when they used to do well

**Trust your gut!** If something feels off, it probably is. Parents' intuition is usually right.

**What to do:**
1️⃣ Start a conversation — "I've noticed you seem different lately. Is everything okay?"
2️⃣ Don't accuse — show concern, not suspicion
3️⃣ Watch and wait — but don't wait too long
4️⃣ Get support from SADAG on **0800 567 567**
5️⃣ Visit the Pulse Check page for a full assessment

**Better to act early and be wrong than to wait until it's too late.**`;
  }

  if (lower.includes("money") && lower.includes("disappearing")) {
    return `**Money keeps disappearing from my house. What should I do?**

This is one of the most common and stressful signs that something is wrong. Here's what you need to know:

**Why this happens:**
- Substance use is expensive — they need money to buy drugs or alcohol
- They're not thinking clearly and making bad decisions
- They might be desperate and don't know where else to turn

**What you should do:**
1️⃣ **Don't confront with anger** — this will only make them defensive and secretive
2️⃣ **Secure your valuables** — put cash, jewellery, and important items in a safe place
3️⃣ **Have a calm conversation** — "I've noticed money going missing. Can we talk about it?"
4️⃣ **Show concern, not accusation** — "I'm worried about you, not angry about the money"
5️⃣ **Don't give them money** — it will likely go to substances
6️⃣ **Get professional help** — call SANCA on **011 892 3829** for family guidance
7️⃣ **Visit the Pulse Check page** to assess other signs

**What to say:** 
*"I've noticed some money and things going missing from home. I'm not angry, but I am worried. If there's something going on that you're struggling with, I want to help you. You don't have to face this alone."*

**Remember:** Your loved one is more important than the money. They need help, not punishment.`;
  }

  if (lower.includes("sleeping") && lower.includes("all day")) {
    return `**My child is sleeping all day and awake all night. Is this normal?**

This is a major red flag that something is wrong. Here's what you should know:

**Normal sleep patterns for teens:**
- Teens naturally need more sleep (8-10 hours)
- They might sleep in on weekends
- BUT they should still have a somewhat normal rhythm

**What's not normal:**
- Sleeping through the entire day
- Being wide awake all night
- Never seeming to sleep at all
- Sleeping at completely random times
- Always exhausted

**Why this happens with substance use:**
- Many substances disrupt normal sleep patterns
- They may be using at night and crashing during the day
- Withdrawal can make it hard to sleep normally
- Their body clock is completely broken

**What to do:**
1️⃣ **Notice the pattern** — exactly when are they awake vs sleeping?
2️⃣ **Ask gently** — "I've noticed your sleep seems really different lately. Is everything okay?"
3️⃣ **Don't accuse** — show concern, not suspicion
4️⃣ **Don't make excuses** — it's not "just being a teenager"
5️⃣ **Get professional help** — call SADAG on **0800 567 567**

**Watch for other signs:**
- Are they also losing weight?
- Have they stopped taking care of themselves?
- Are they avoiding family?

**These often go together — don't ignore them.**`;
  }

  if (lower.includes("new friends") && lower.includes("never met")) {
    return `**They have new friends I've never met. Should I be worried?**

A sudden change in friends is one of the most common warning signs. Here's what you need to know:

**Why this happens:**
- They may be using substances with these new friends
- They might feel judged by their old friends
- They're avoiding people who might confront them
- They feel like these new people "understand" them better

**What you can do:**

1️⃣ **Ask about their new friends** — show interest, not suspicion
   - *"Tell me about your new friends — how did you meet them?"*

2️⃣ **Offer to meet them** — 
   - *"I'd love to meet your new friends. Can you invite them over for dinner?"*

3️⃣ **Pay attention to their reaction** — 
   - Are they defensive? Do they refuse? That's a warning sign

4️⃣ **Watch for other signs** — 
   - Is money missing? Sleep changes? Mood swings?

5️⃣ **Don't forbid the friendship** — 
   - This will push them away and make them more secretive

**Red flags to watch for:**
- They refuse to introduce you to their new friends
- They get very defensive when you ask about them
- They avoid family gatherings to be with these friends
- Their new friends are older or from a different area

**Stay connected:** Your relationship is more important than being right. Keep the door open.`;
  }

  if (lower.includes("grades") && lower.includes("dropping")) {
    return `**My child's school grades are dropping. What could be happening?**

When a young person starts struggling at school, it's often a sign that something deeper is going on. Here's what you need to know:

**What might be happening:**
- 🔴 They're using substances and can't focus or remember
- 🔴 They're depressed or anxious and can't concentrate
- 🔴 They're hanging with the wrong crowd and priorities have changed
- 🔴 They've given up on their future and don't care anymore
- 🔴 They're being bullied and are distracted
- 🔴 They're not sleeping and can't function

**What you can do:**

1️⃣ **Talk to their teachers** — get a fuller picture of what's happening in class
2️⃣ **Ask your child** — *"I'm worried about your grades. Is everything okay? Is there something going on that I don't know about?"*
3️⃣ **Don't punish** — punishment won't help if there's a deeper issue
4️⃣ **Find out what's really going on** — school problems are usually a symptom, not the root cause
5️⃣ **Get support** — school counsellor, community services, SADAG

**Remember:**
- Don't assume they're just lazy — there's almost always something else going on
- Don't compare them to other kids or siblings
- Do ask questions with concern, not accusation
- Do get help early — waiting makes it harder

📞 **Call SADAG for guidance:** 0800 567 567`;
  }

  if (lower.includes("need help") && lower.includes("support")) {
    return `**I need help and support. Where can I go in Tshwane?**

You're doing the right thing by asking for help. You don't have to go through this alone.

**Here are resources in Tshwane:**

**National Helplines (24/7):**
- 📞 SADAG (South African Depression & Anxiety Group): **0800 567 567** (Counselling & Support)
- 📞 SANCA (National Council on Alcoholism & Drug Dependence): **011 892 3829** (Substance Abuse)
- 📞 Lifeline SA: **0861 322 322** (Counselling)
- 📞 Emergency: **10111**

**Local Support in Tshwane:**
- 🏥 Tshwane Health Department: **012 358 8600**
- 🏥 Pretoria West Hospital: **012 380 6000**
- 🏥 Mamelodi Clinic: **012 841 2000**
- 🏥 Ga-Rankuwa Clinic: **012 702 1111**
- 🏥 Soshanguve Clinic: **012 731 8000**
- 🏥 Atteridgeville Clinic: **012 373 8000**
- 🏥 Hammanskraal Clinic: **012 711 1000**

**What to do next:**
1️⃣ Visit the **Find Help** page on this website for more options
2️⃣ Call SADAG for free, confidential counselling right now
3️⃣ Talk to a trusted friend, pastor, or family member
4️⃣ Don't wait — the earlier you get help, the better

**You are not alone. Help is available. Please reach out today.**`;
  }

  if (lower.includes("withdrawal symptoms")) {
    return `**My brother is showing withdrawal symptoms. What should I do?**

Withdrawal symptoms mean that someone has become dependent on a substance. Stopping suddenly can be dangerous — even life-threatening.

**Common withdrawal symptoms to watch for:**
- 🔴 Sweating and shaking (tremors)
- 🔴 Nausea and vomiting
- 🔴 Severe anxiety and irritability
- 🔴 Insomnia (can't sleep at all)
- 🔴 Muscle aches and pains
- 🔴 Depression and mood swings
- 🔴 Headaches and dizziness
- 🔴 Cravings for the substance

**What you should do NOW:**

1️⃣ **Don't let them stop suddenly** — this can be very dangerous, especially with alcohol and certain drugs
2️⃣ **Seek professional help immediately** — call SANCA on **011 892 3829**
3️⃣ **Stay calm and supportive** — don't judge or shame them
4️⃣ **Be patient** — withdrawal is very difficult and takes time
5️⃣ **Keep them safe** — don't leave them alone if they're severely withdrawing

**When to call emergency (10111):**
- If they are having seizures
- If they are hallucinating
- If they are in severe pain
- If they are suicidal or talking about suicide
- If they are confused and disoriented

**What to say:**
*"I can see you're going through a really hard time right now. I want to help you get through this. We're going to get professional help together. You're not alone."*

📞 **Call SANCA: 011 892 3829** for professional help
📞 **SADAG 24h: 0800 567 567** for immediate counselling
📞 **Emergency: 10111** if they're in immediate danger`;
  }

  // Fallback response
  return `🤝 **I'm here to help**

Thank you for reaching out. What you're sharing is important, and I want to help you.

**Try asking me about:**
- 📌 "My 17-year-old son has become withdrawn and money keeps going missing"
- 📌 "Help me write what to say to my brother. I think he's using nyaope"
- 📌 "Give me a 24-hour action plan — I just found a vape pen in my daughter's bag"
- 📌 "What's the difference between teenage moodiness and early warning signs?"
- 📌 "Money keeps disappearing from my house"
- 📌 "My child is sleeping all day and awake all night"
- 📌 "They have new friends I've never met"
- 📌 "My child's school grades are dropping"
- 📌 "I need help and support in Tshwane"
- 📌 "My brother is showing withdrawal symptoms"

**Remember:** You're not alone. Many families in Tshwane are going through the same thing.

📞 **If you need immediate help:** 
- SADAG 24h: **0800 567 567**
- Emergency: **10111**`;
}

// ALL 10 QUICK PROMPTS
const QUICK_PROMPTS = [
  "My 17-year-old son has become withdrawn and money keeps going missing. What should I look for?",
  "Help me write what to say to my brother. I think he's using nyaope.",
  "Give me a 24-hour action plan — I just found a vape pen in my daughter's bag.",
  "What's the difference between teenage moodiness and early warning signs?",
  "Money keeps disappearing from my house. What should I do?",
  "My child is sleeping all day and awake all night. Is this normal?",
  "They have new friends I've never met. Should I be worried?",
  "My child's school grades are dropping. What could be happening?",
  "I need help and support. Where can I go in Tshwane?",
  "My brother is showing withdrawal symptoms. What should I do?",
];

function PulseAIPage() {
  const { t } = useI18n();
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const submitMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;

    setMessages(prev => [...prev, { role: "user", content: trimmed }]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const response = getAIResponse(trimmed);
      setMessages(prev => [...prev, { role: "assistant", content: response }]);
      setIsTyping(false);
    }, 800);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitMessage(input);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-6">
        <a href="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> {t("pulseCheck.back")}
        </a>
      </div>

      <div className="mb-6 flex items-start gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-primary-foreground">
          <Bot className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            {t("pulseAI.title")}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">{t("pulseAI.subtitle")}</p>
        </div>
      </div>

      <div className="flex flex-col rounded-2xl border border-border bg-surface shadow-xl shadow-black/20">
        <div
          ref={scrollRef}
          className="flex max-h-[60vh] min-h-[420px] flex-col gap-4 overflow-y-auto p-4 md:p-6"
        >
          {messages.length === 0 && (
            <div className="space-y-5">
              <div className="rounded-xl border border-border bg-surface-elevated p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                  <Sparkles className="h-4 w-4" /> {t("pulseAI.welcome")}
                </div>
                <p className="mt-2 text-sm text-foreground">{t("pulseAI.welcomeMessage")}</p>
                <p className="mt-2 text-xs text-muted-foreground">{t("pulseAI.privacy")}</p>
              </div>

              <div>
                <div className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {t("pulseAI.tryOne")}
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  {QUICK_PROMPTS.map((p) => (
                    <button
                      key={p}
                      onClick={() => submitMessage(p)}
                      className="rounded-lg border border-border bg-background p-3 text-left text-sm text-foreground transition-colors hover:border-primary/50 hover:bg-surface-elevated"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {messages.map((m, index) => (
            <div key={index} className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
              <div
                className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${
                  m.role === "user" ? "bg-secondary text-foreground" : "bg-primary text-primary-foreground"
                }`}
              >
                {m.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
              </div>
              <div
                className={`max-w-[80%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  m.role === "user"
                    ? "bg-primary/15 text-foreground"
                    : "bg-surface-elevated text-foreground"
                }`}
              >
                {m.content}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3">
              <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground">
                <Bot className="h-4 w-4" />
              </div>
              <div className="max-w-[80%] rounded-2xl bg-surface-elevated px-4 py-2.5 text-sm">
                <span className="inline-flex gap-1 text-muted-foreground">
                  <span className="animate-pulse">•</span>
                  <span className="animate-pulse delay-200">•</span>
                  <span className="animate-pulse delay-400">•</span>
                </span>
              </div>
            </div>
          )}
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex items-end gap-2 border-t border-border p-3"
        >
            <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            rows={1}
            placeholder={t("pulseAI.placeholder")}
            className="min-h-[44px] max-h-40 flex-1 resize-none rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Send className="h-4 w-4" /> {t("pulseAI.send")}
          </button>
        </form>
      </div>

      <p className="mt-4 text-center text-xs text-muted-foreground">
        {t("pulseAI.disclaimer", { emergency: "10111", sadag: "0800 567 567" })}
      </p>
    </div>
  );
}