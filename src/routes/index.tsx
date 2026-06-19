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
} from "lucide-react";

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
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(60% 50% at 80% 0%, color-mix(in oklab, var(--color-primary) 18%, transparent), transparent 70%), radial-gradient(50% 40% at 0% 100%, color-mix(in oklab, var(--color-accent) 14%, transparent), transparent 70%)",
          }}
        />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-[1.2fr_1fr] md:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-success" /> Anonymous • Free • 11 SA languages
            </span>
            <h1 className="mt-5 text-balance text-4xl font-semibold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Hear the signs <br className="hidden sm:block" />
              <span className="text-primary">before the crisis.</span>
            </h1>
            <p className="mt-5 max-w-xl text-pretty text-base text-muted-foreground md:text-lg">
              MzansiPulse helps families, teachers and friends recognise early warning signs of
              substance abuse — and take supportive action before things escalate.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/pulse-check"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-transform hover:-translate-y-0.5 hover:bg-primary/90"
              >
                <ShieldAlert className="h-4 w-4" />
                I'm worried about someone
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/find-help"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-surface-elevated"
              >
                <MapPin className="h-4 w-4" />
                Find help near me
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5"><Lock className="h-4 w-4" /> No login needed</span>
              <span className="inline-flex items-center gap-1.5"><Languages className="h-4 w-4" /> 11 SA languages</span>
              <span className="inline-flex items-center gap-1.5"><Users className="h-4 w-4" /> Community-led</span>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl border border-border bg-surface p-5 shadow-2xl shadow-black/30">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Activity className="h-4 w-4 text-primary" />
                Pulse Check preview
              </div>
              <div className="mt-4 space-y-3">
                {[
                  "Have they become withdrawn or secretive?",
                  "Has money or valuables gone missing?",
                  "Have their sleep patterns suddenly changed?",
                  "Are they hanging with a new, unfamiliar group?",
                ].map((q, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-border bg-surface-elevated px-4 py-3 text-sm text-foreground"
                  >
                    {q}
                  </div>
                ))}
              </div>
              <Link
                to="/pulse-check"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary/15 px-4 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-primary/25"
              >
                Start a Pulse Check <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature grid */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="mb-10 max-w-2xl">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            Practical tools, built for Mzansi.
          </h2>
          <p className="mt-2 text-muted-foreground">
            Everything you need to step in early — without judgement, without paperwork.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            to="/pulse-check"
            icon={<Activity className="h-5 w-5" />}
            title="Pulse Check"
            description="Answer a few simple questions and get a clear, non-diagnostic risk picture plus a 24-hour action plan."
          />
          <FeatureCard
            to="/find-help"
            icon={<MapPin className="h-5 w-5" />}
            title="Find Help Near Me"
            description="Rehab centres, counsellors, social workers and helplines — sorted by your province."
          />
          <FeatureCard
            to="/stories"
            icon={<Sparkles className="h-5 w-5" />}
            title="Recovery Stories"
            description="Real journeys from South Africans who walked through it and came back stronger."
          />
          <FeatureCard
            to="/learn"
            icon={<BookOpen className="h-5 w-5" />}
            title="Learn the Signs"
            description="Plain-language guides, myth-vs-fact cards and tips for families and educators."
          />
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-20">
        <div className="rounded-2xl border border-border bg-gradient-to-br from-surface to-surface-elevated p-8 md:p-12">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <h3 className="text-2xl font-semibold tracking-tight">Worried about someone right now?</h3>
              <p className="mt-2 text-muted-foreground">
                The Pulse Check is anonymous and takes about 2 minutes. You'll leave with a clear next step.
              </p>
            </div>
            <Link
              to="/pulse-check"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Start Pulse Check <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
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
