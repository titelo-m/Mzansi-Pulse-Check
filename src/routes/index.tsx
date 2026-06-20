// src/routes/index.tsx
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
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(60% 50% at 80% 0%, color-mix(in oklab, var(--color-primary) 22%, transparent), transparent 70%), radial-gradient(50% 40% at 0% 100%, color-mix(in oklab, var(--color-accent) 16%, transparent), transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 pt-8 pb-16 md:pt-12 md:pb-20">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-success" /> {t("hero.tagline")}
            </span>

            <h1 className="mx-auto mt-6 text-balance text-6xl font-bold leading-[0.95] tracking-tight text-foreground sm:text-7xl md:text-8xl lg:text-[9rem]">
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
              <span className="inline-flex items-center gap-1.5"><Lock className="h-4 w-4" /> {t("hero.features")}</span>
              <span className="inline-flex items-center gap-1.5"><Languages className="h-4 w-4" /> {t("hero.features2")}</span>
              <span className="inline-flex items-center gap-1.5"><Users className="h-4 w-4" /> {t("hero.features3")}</span>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE GRID */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            to="/pulse-check"
            icon={<Activity className="h-5 w-5" />}
            title={t("features.pulseCheck")}
            description={t("features.pulseCheckDesc")}
          />
          <FeatureCard
            to="/pulse-ai"
            icon={<Bot className="h-5 w-5" />}
            title={t("features.pulseAI")}
            description={t("features.pulseAIDesc")}
          />
          <FeatureCard
            to="/find-help"
            icon={<MapPin className="h-5 w-5" />}
            title={t("features.findHelp")}
            description={t("features.findHelpDesc")}
          />
          <FeatureCard
            to="/stories"
            icon={<Sparkles className="h-5 w-5" />}
            title={t("features.stories")}
            description={t("features.storiesDesc")}
          />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-8 max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{t("howItWorks.title")}</h2>
          <p className="mt-2 text-muted-foreground">{t("howItWorks.subtitle")}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <Step n="1" icon={<Eye className="h-5 w-5" />} title={t("howItWorks.step1")}>
            {t("howItWorks.step1Desc")}
          </Step>
          <Step n="2" icon={<CheckCircle2 className="h-5 w-5" />} title={t("howItWorks.step2")}>
            {t("howItWorks.step2Desc")}
          </Step>
          <Step n="3" icon={<HeartPulse className="h-5 w-5" />} title={t("howItWorks.step3")}>
            {t("howItWorks.step3Desc")}
          </Step>
        </div>
      </section>

      {/* SIGNS PREVIEW */}
      <section className="border-y border-border bg-surface/40">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{t("signs.title")}</h2>
              <p className="mt-2 text-muted-foreground">{t("signs.subtitle")}</p>
              <Link
                to="/learn"
                className="mt-5 inline-flex items-center gap-2 rounded-md border border-border bg-surface px-4 py-2.5 text-sm font-medium hover:bg-surface-elevated"
              >
                {t("signs.cta")} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <SignCard title={t("signs.withdrawal")} body={t("signs.withdrawalDesc")} />
              <SignCard title={t("signs.money")} body={t("signs.moneyDesc")} />
              <SignCard title={t("signs.sleep")} body={t("signs.sleepDesc")} />
              <SignCard title={t("signs.crowd")} body={t("signs.crowdDesc")} />
              <SignCard title={t("signs.physical")} body={t("signs.physicalDesc")} />
              <SignCard title={t("signs.mood")} body={t("signs.moodDesc")} />
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{t("testimonials.title")}</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <Testimonial quote={t("testimonials.1")} who={t("testimonials.1who")} />
          <Testimonial quote={t("testimonials.2")} who={t("testimonials.2who")} />
          <Testimonial quote={t("testimonials.3")} who={t("testimonials.3who")} />
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{t("faq.title")}</h2>
        <div className="mt-8 grid gap-3 md:grid-cols-2">
          <Faq q={t("faq.q1")}>{t("faq.a1")}</Faq>
          <Faq q={t("faq.q2")}>{t("faq.a2")}</Faq>
          <Faq q={t("faq.q3")}>{t("faq.a3")}</Faq>
          <Faq q={t("faq.q4")}>{t("faq.a4")}</Faq>
        </div>
      </section>

      {/* CRISIS CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-16">
        <div className="rounded-3xl border border-urgent/40 bg-gradient-to-br from-urgent/15 via-surface to-surface-elevated p-8 md:p-12">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-urgent/20 px-3 py-1 text-xs font-semibold text-urgent-foreground">
                <Phone className="h-3.5 w-3.5" /> {t("crisis.title")}
              </div>
              <h3 className="mt-3 text-2xl font-bold tracking-tight md:text-3xl">
                {t("crisis.heading")}
              </h3>
              <p className="mt-2 text-muted-foreground">
                {t("crisis.text", { sadag: "0800 567 567", sanca: "011 892 3829", emergency: "10111" })}
              </p>
            </div>
            <Link
              to="/pulse-check"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              {t("crisis.cta")} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
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
    </Link>
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