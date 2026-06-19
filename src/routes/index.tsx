import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ShieldAlert,
  MapPin,
  BookOpen,
  Sparkles,
  ArrowRight,
  Activity,
  Users,
  Lock,
  Languages,
  Bot,
  HeartPulse,
  Eye,
  MessageCircle,
  ClipboardCheck,
  Phone,
  Quote,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MzansiPulse — Hear the Signs Before the Crisis" },
      {
        name: "description",
        content:
          "Anonymous, multilingual platform helping South African families spot the early signs of substance abuse and find support nearby.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const { t } = useI18n();

  return (
    <div>
      {/* HERO with massive brand */}
      <section className="relative overflow-hidden border-b border-border">
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(60% 50% at 80% 0%, color-mix(in oklab, var(--color-primary) 22%, transparent), transparent 70%), radial-gradient(50% 40% at 0% 100%, color-mix(in oklab, var(--color-accent) 16%, transparent), transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 pt-14 pb-20 md:pt-20 md:pb-28">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-success" /> {t("hero.tagline")}
            </span>

            <h1 className="mx-auto mt-6 text-balance text-6xl font-bold leading-[0.95] tracking-tight text-foreground sm:text-7xl md:text-8xl lg:text-[10rem]">
              <span className="bg-gradient-to-br from-foreground via-primary to-accent bg-clip-text text-transparent">
                MzansiPulse
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-balance text-2xl font-medium text-foreground md:text-3xl">
              {t("hero.title1")} <span className="text-primary">{t("hero.title2")}</span>
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-pretty text-base text-muted-foreground md:text-lg">
              {t("hero.subtitle")}
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                to="/pulse-check"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-transform hover:-translate-y-0.5 hover:bg-primary/90"
              >
                <ShieldAlert className="h-4 w-4" />
                {t("hero.cta1")}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/pulse-ai"
                className="inline-flex items-center gap-2 rounded-md border border-primary/40 bg-primary/10 px-5 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary/20"
              >
                <Bot className="h-4 w-4" />
                {t("hero.ai")}
              </Link>
              <Link
                to="/find-help"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-surface-elevated"
              >
                <MapPin className="h-4 w-4" />
                {t("hero.cta2")}
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5"><Lock className="h-4 w-4" /> No login needed</span>
              <span className="inline-flex items-center gap-1.5"><Languages className="h-4 w-4" /> 11 SA languages</span>
              <span className="inline-flex items-center gap-1.5"><Users className="h-4 w-4" /> Community-led</span>
            </div>
          </div>
        </div>
      </section>

      {/* STAT STRIP */}
      <section className="border-b border-border bg-surface/40">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-10 md:grid-cols-4">
          <Stat value="1 in 4" label="South Africans affected by substance abuse in their family" />
          <Stat value="< 18" label="Average age of first substance use in many SA communities" />
          <Stat value="11" label="Official languages we proudly support" />
          <Stat value="24h" label="Action plan after every Pulse Check" />
        </div>
      </section>

      {/* AI FEATURE HIGHLIGHT */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid items-center gap-8 rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/10 via-surface to-accent/10 p-6 md:p-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary">
              <Sparkles className="h-3.5 w-3.5" /> NEW · Powered by AI
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
              Meet <span className="text-primary">Pulse AI</span> — your private companion.
            </h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              The first AI built for South African families worried about substance abuse. Tell it
              what you've noticed and it will:
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <AiBullet>Identify which warning signs are likely showing up</AiBullet>
              <AiBullet>Draft a real conversation script in your home language</AiBullet>
              <AiBullet>Give you a clear 24-hour action plan</AiBullet>
              <AiBullet>Knows nyaope, tik, codeine syrups and the SA context</AiBullet>
            </ul>
            <div className="mt-6">
              <Link
                to="/pulse-ai"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <Bot className="h-4 w-4" /> Open Pulse AI <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-background/60 p-4 shadow-2xl shadow-black/30">
            <div className="flex items-center gap-2 border-b border-border pb-2 text-xs text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-success" /> Pulse AI · isiZulu
            </div>
            <div className="mt-3 space-y-3 text-sm">
              <ChatBubble side="user">
                Indodana yami ineminyaka engu-16. Iyagcina imali yayo iphela futhi izihlalela yodwa.
              </ChatBubble>
              <ChatBubble side="ai">
                Ngiyakuzwa. Lokhu kuwukukhathazeka okufanele — imali engahleleki nokuhlukana
                kungaba izimpawu zokuqala. Ake sikwenzele uhlelo lwamahora angu-24…
              </ChatBubble>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="mb-10 max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">How MzansiPulse works</h2>
          <p className="mt-2 text-muted-foreground">Three simple steps. No paperwork, no judgement.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <Step n="1" icon={<Eye className="h-5 w-5" />} title="Notice">
            You feel something is off — withdrawn behaviour, missing money, new friends. Trust the
            gut.
          </Step>
          <Step n="2" icon={<ClipboardCheck className="h-5 w-5" />} title="Check">
            Take the 2-minute Pulse Check or chat with Pulse AI to put words to the worry.
          </Step>
          <Step n="3" icon={<HeartPulse className="h-5 w-5" />} title="Act">
            Get a 24-hour plan, a conversation script, and the closest support service.
          </Step>
        </div>
      </section>

      {/* FEATURE GRID */}
      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            to="/pulse-check"
            icon={<Activity className="h-5 w-5" />}
            title="Pulse Check"
            description="A few simple questions. A clear, non-diagnostic risk picture plus a 24-hour plan."
          />
          <FeatureCard
            to="/pulse-ai"
            icon={<Bot className="h-5 w-5" />}
            title="Pulse AI"
            description="Confidential AI companion that speaks your language and knows the SA context."
          />
          <FeatureCard
            to="/find-help"
            icon={<MapPin className="h-5 w-5" />}
            title="Find Help"
            description="Rehab centres, counsellors, social workers and helplines — by province."
          />
          <FeatureCard
            to="/stories"
            icon={<Sparkles className="h-5 w-5" />}
            title="Recovery Stories"
            description="Real journeys from South Africans who walked through it and came back."
          />
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Built for everyone who cares</h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          MzansiPulse meets you where you are — at home, at school, or in your community.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Persona title="Parents & Guardians" body="See the early signs. Have the hard conversation without losing the relationship." />
          <Persona title="Teachers & Counsellors" body="Spot at-risk learners early and refer them to community support discreetly." />
          <Persona title="Friends & Siblings" body="Know what to say when your bestie or cousin starts changing." />
          <Persona title="Community Leaders" body="Equip izinduna, pastors and CPF members with prevention tools." />
        </div>
      </section>

      {/* SIGNS PREVIEW */}
      <section className="border-y border-border bg-surface/40">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Know the signs</h2>
            <p className="mt-2 text-muted-foreground">
              Early signs are usually quiet — small shifts you almost dismiss. Catch them and you
              change the story.
            </p>
            <Link
              to="/learn"
              className="mt-5 inline-flex items-center gap-2 rounded-md border border-border bg-surface px-4 py-2.5 text-sm font-medium hover:bg-surface-elevated"
            >
              See all signs <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <SignCard title="Withdrawal" body="Suddenly distant from family. Spending hours alone in their room." />
            <SignCard title="Missing money" body="Cash, jewellery or small items disappearing without explanation." />
            <SignCard title="Sleep changes" body="Awake all night, asleep all day. Or never seems to sleep." />
            <SignCard title="New crowd" body="A different group of friends they won't introduce you to." />
            <SignCard title="Red eyes / weight loss" body="Physical signs you can't quite explain away." />
            <SignCard title="Mood swings" body="Snapping over nothing. Numb when something is clearly wrong." />
          </div>
        </div>
      </section>

      {/* MYTH VS FACT */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Myth vs Fact</h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Stigma keeps families silent. Let's clear up the most damaging myths.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <MythCard
            myth="It only happens to bad families."
            fact="Substance abuse cuts across every income, race and religion in Mzansi."
          />
          <MythCard
            myth="If I confront them, they'll stop."
            fact="Confrontation usually backfires. Calm, curious conversations work better."
          />
          <MythCard
            myth="Rehab is the only option."
            fact="Outpatient counselling, support groups and family programmes save thousands without inpatient care."
          />
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">From the community</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <Testimonial
            quote="I took the Pulse Check on a Wednesday. By Saturday my son was at his first counselling session. I didn't know where to start before this."
            who="Nomsa · Soweto"
          />
          <Testimonial
            quote="The AI helped me find the words in isiXhosa to talk to my brother. He cried. Then he agreed to get help."
            who="Sive · East London"
          />
          <Testimonial
            quote="As a Life Orientation teacher, I now point every worried parent to MzansiPulse. It's free and it works."
            who="Mr. van Wyk · Mitchells Plain"
          />
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Frequently asked</h2>
        <div className="mt-8 grid gap-3 md:grid-cols-2">
          <Faq q="Is MzansiPulse really anonymous?">
            Yes. No account, no login, no email. Your Pulse Check and Pulse AI conversations live on
            your device.
          </Faq>
          <Faq q="Is this medical advice?">
            No. MzansiPulse is an early-intervention guide. For diagnosis or treatment please speak
            to a registered professional — we'll help you find one.
          </Faq>
          <Faq q="What if it's already a crisis?">
            Call SADAG on 0800 567 567 (24h) or Emergency on 10111. Pulse AI will also redirect you
            immediately if it senses danger.
          </Faq>
          <Faq q="Which languages do you support?">
            All 11 official South African languages — switch any time from the top-right menu.
          </Faq>
        </div>
      </section>

      {/* CRISIS / FINAL CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-20">
        <div className="rounded-3xl border border-urgent/40 bg-gradient-to-br from-urgent/15 via-surface to-surface-elevated p-8 md:p-12">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-urgent/20 px-3 py-1 text-xs font-semibold text-urgent-foreground">
                <Phone className="h-3.5 w-3.5" /> Crisis support, 24/7
              </div>
              <h3 className="mt-3 text-2xl font-bold tracking-tight md:text-3xl">
                You don't have to do this alone.
              </h3>
              <p className="mt-2 text-muted-foreground">
                Call SADAG <span className="text-foreground font-semibold">0800 567 567</span> any
                hour of any day, or SANCA on{" "}
                <span className="text-foreground font-semibold">011 892 3829</span>. In immediate
                danger? Dial <span className="text-foreground font-semibold">10111</span>.
              </p>
            </div>
            <Link
              to="/pulse-check"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              {t("common.start")} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-5">
      <div className="text-3xl font-bold text-primary md:text-4xl">{value}</div>
      <div className="mt-1 text-xs text-muted-foreground">{label}</div>
    </div>
  );
}

function AiBullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2">
      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
      <span className="text-foreground">{children}</span>
    </li>
  );
}

function ChatBubble({ side, children }: { side: "user" | "ai"; children: React.ReactNode }) {
  return (
    <div className={`flex ${side === "user" ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-sm ${
          side === "user"
            ? "bg-primary/20 text-foreground"
            : "border border-border bg-surface-elevated text-foreground"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

function Step({
  n,
  icon,
  title,
  children,
}: {
  n: string;
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border bg-surface p-6">
      <div className="flex items-center gap-3">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground text-sm font-bold">
          {n}
        </span>
        <span className="text-primary">{icon}</span>
      </div>
      <h3 className="mt-4 font-semibold text-foreground">{title}</h3>
      <p className="mt-1.5 text-sm text-muted-foreground">{children}</p>
    </div>
  );
}

function FeatureCard({
  to,
  icon,
  title,
  description,
}: {
  to: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Link
      to={to}
      className="group flex flex-col rounded-xl border border-border bg-surface p-5 transition-colors hover:border-primary/50 hover:bg-surface-elevated"
    >
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15 text-primary">
        {icon}
      </span>
      <h3 className="mt-4 font-semibold text-foreground">{title}</h3>
      <p className="mt-1.5 text-sm text-muted-foreground">{description}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
        Open <ArrowRight className="h-3.5 w-3.5" />
      </span>
    </Link>
  );
}

function Persona({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-5">
      <div className="font-semibold text-foreground">{title}</div>
      <p className="mt-1.5 text-sm text-muted-foreground">{body}</p>
    </div>
  );
}

function SignCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-lg border border-border bg-surface p-4">
      <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
        <AlertTriangle className="h-4 w-4 text-warning" /> {title}
      </div>
      <p className="mt-1.5 text-sm text-muted-foreground">{body}</p>
    </div>
  );
}

function MythCard({ myth, fact }: { myth: string; fact: string }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-5">
      <div className="text-xs font-semibold uppercase tracking-wide text-destructive">Myth</div>
      <p className="mt-1 text-sm text-foreground">{myth}</p>
      <div className="mt-4 text-xs font-semibold uppercase tracking-wide text-success">Fact</div>
      <p className="mt-1 text-sm text-foreground">{fact}</p>
    </div>
  );
}

function Testimonial({ quote, who }: { quote: string; who: string }) {
  return (
    <figure className="rounded-xl border border-border bg-surface p-6">
      <Quote className="h-5 w-5 text-primary" />
      <blockquote className="mt-3 text-sm text-foreground">"{quote}"</blockquote>
      <figcaption className="mt-4 text-xs text-muted-foreground">— {who}</figcaption>
    </figure>
  );
}

function Faq({ q, children }: { q: string; children: React.ReactNode }) {
  return (
    <details className="group rounded-xl border border-border bg-surface p-5 open:bg-surface-elevated">
      <summary className="flex cursor-pointer items-center justify-between gap-3 text-sm font-semibold text-foreground">
        <span className="inline-flex items-center gap-2">
          <MessageCircle className="h-4 w-4 text-primary" /> {q}
        </span>
        <span className="text-muted-foreground transition-transform group-open:rotate-180">⌄</span>
      </summary>
      <p className="mt-3 text-sm text-muted-foreground">{children}</p>
    </details>
  );
}
