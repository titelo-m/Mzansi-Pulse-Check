import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, XCircle, AlertTriangle, Brain, Eye, Users } from "lucide-react";

export const Route = createFileRoute("/learn")({
  head: () => ({
    meta: [
      { title: "Learn the Signs — MzansiPulse" },
      {
        name: "description",
        content:
          "Plain-language guides on the early warning signs of substance abuse, myth-vs-fact cards, and tips for South African families and educators.",
      },
    ],
  }),
  component: Learn,
});

const SIGN_GROUPS = [
  {
    icon: Eye,
    title: "Physical signs",
    items: [
      "Bloodshot or glazed eyes; dilated or pinpoint pupils",
      "Sudden weight loss or gain",
      "Poor hygiene, unkempt appearance",
      "Unusual smells on breath, body or clothes",
      "Tremors, slurred speech or poor coordination",
    ],
  },
  {
    icon: Brain,
    title: "Behavioural signs",
    items: [
      "Secrecy, lying, becoming withdrawn",
      "Sudden change in friends or hangouts",
      "Loss of interest in school, work or hobbies",
      "Missing money, medication or valuables",
      "Sleeping much more or much less than usual",
    ],
  },
  {
    icon: Users,
    title: "Emotional signs",
    items: [
      "Unexplained mood swings or irritability",
      "Anxiety, paranoia or fearfulness",
      "Depression, hopelessness or low motivation",
      "Sudden defensiveness when asked simple questions",
      "Loss of motivation for things they once loved",
    ],
  },
];

const MYTHS = [
  {
    myth: "It's just a phase — they'll grow out of it.",
    fact: "Early substance use rewires a developing brain. The earlier you intervene, the better the long-term outcome.",
  },
  {
    myth: "Addiction only happens in poor communities.",
    fact: "Substance abuse cuts across every income level, race and suburb in South Africa. The face of addiction looks like everyone.",
  },
  {
    myth: "If I talk about drugs, I'll plant the idea.",
    fact: "The opposite is true. Open conversations with parents are one of the strongest protective factors against substance use.",
  },
  {
    myth: "They have to hit rock bottom before they'll change.",
    fact: "Waiting for 'rock bottom' costs lives. Early, supportive intervention works — and rock bottom can be fatal.",
  },
];

function Learn() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Learn the signs</h1>
        <p className="mt-2 text-muted-foreground">
          Plain-language guidance for parents, teachers, friends and community members. Knowing what
          to look for is the first step in stopping addiction before it takes hold.
        </p>
      </header>

      <section className="mt-10">
        <h2 className="text-xl font-semibold tracking-tight">What to look for</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {SIGN_GROUPS.map((g) => {
            const Icon = g.icon;
            return (
              <div key={g.title} className="rounded-xl border border-border bg-surface p-5">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-semibold text-foreground">{g.title}</h3>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  {g.items.map((it) => (
                    <li key={it} className="flex gap-2">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-xl font-semibold tracking-tight">Myth vs Fact</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Common beliefs about substance abuse in Mzansi — and what the research actually shows.
        </p>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {MYTHS.map((m) => (
            <div key={m.myth} className="overflow-hidden rounded-xl border border-border bg-surface">
              <div className="flex items-start gap-3 border-b border-border bg-destructive/10 p-5">
                <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-destructive">
                    Myth
                  </div>
                  <p className="mt-1 text-foreground">{m.myth}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-5">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-success">
                    Fact
                  </div>
                  <p className="mt-1 text-foreground">{m.fact}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14 rounded-2xl border border-border bg-gradient-to-br from-surface to-surface-elevated p-6 md:p-8">
        <div className="flex items-start gap-4">
          <AlertTriangle className="mt-1 h-6 w-6 shrink-0 text-warning" />
          <div>
            <h2 className="text-xl font-semibold tracking-tight">If you've spotted the signs</h2>
            <p className="mt-2 text-muted-foreground">
              Don't wait to be sure. Run a Pulse Check — it's free, anonymous, and gives you a clear
              next step you can take today.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                to="/pulse-check"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
              >
                Start a Pulse Check
              </Link>
              <Link
                to="/find-help"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-4 py-2.5 text-sm font-medium text-foreground hover:bg-surface-elevated"
              >
                Find help near me
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
