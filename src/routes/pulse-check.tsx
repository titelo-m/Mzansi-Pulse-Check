import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ArrowRight, RotateCcw, ShieldAlert, Phone, MapPin } from "lucide-react";

export const Route = createFileRoute("/pulse-check")({
  head: () => ({
    meta: [
      { title: "Pulse Check — MzansiPulse" },
      {
        name: "description",
        content:
          "An anonymous 2-minute check to help you spot the early signs of substance abuse in a loved one.",
      },
    ],
  }),
  component: PulseCheck,
});

interface Question {
  id: string;
  text: string;
  hint?: string;
}

const QUESTIONS: Question[] = [
  { id: "q1", text: "Have they become noticeably withdrawn or secretive in the last few weeks?" },
  { id: "q2", text: "Has money, medication or valuables gone missing without explanation?" },
  { id: "q3", text: "Have their sleeping or eating patterns changed dramatically?" },
  { id: "q4", text: "Are they suddenly hanging around a new, unfamiliar group of friends?" },
  { id: "q5", text: "Have you noticed red eyes, slurred speech, or unusual smells on their clothes?" },
  { id: "q6", text: "Are they neglecting school, work, or things they used to love?" },
  { id: "q7", text: "Have you seen sudden mood swings, aggression, or paranoia?" },
  { id: "q8", text: "Do you suspect they are currently using or in danger right now?", hint: "Honest answers help us guide you correctly." },
];

const ANSWERS = [
  { value: 0, label: "No" },
  { value: 1, label: "Not sure" },
  { value: 2, label: "Sometimes" },
  { value: 3, label: "Often / Yes" },
] as const;

type Tier = "low" | "early" | "immediate";

function classify(answers: Record<string, number>): Tier {
  const total = Object.values(answers).reduce((a, b) => a + b, 0);
  const q8 = answers["q8"] ?? 0;
  if (q8 >= 3 || total >= 16) return "immediate";
  if (total >= 7) return "early";
  return "low";
}

function PulseCheck() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [done, setDone] = useState(false);

  const total = QUESTIONS.length;
  const q = QUESTIONS[step];
  const progress = ((step + (done ? 1 : 0)) / total) * 100;

  const select = (value: number) => {
    setAnswers((a) => ({ ...a, [q.id]: value }));
    if (step + 1 < total) setStep(step + 1);
    else setDone(true);
  };

  const reset = () => {
    setAnswers({});
    setStep(0);
    setDone(false);
  };

  if (done) {
    const tier = classify(answers);
    return <Result tier={tier} onReset={reset} />;
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <div className="mb-6">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back home
        </Link>
      </div>

      <div className="rounded-2xl border border-border bg-surface p-6 md:p-8">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Question {step + 1} of {total}</span>
          <span>~2 minutes</span>
        </div>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
          <div className="h-full bg-primary transition-all" style={{ width: `${progress}%` }} />
        </div>

        <h1 className="mt-7 text-xl font-semibold leading-snug text-foreground md:text-2xl">
          {q.text}
        </h1>
        {q.hint && <p className="mt-2 text-sm text-muted-foreground">{q.hint}</p>}

        <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
          {ANSWERS.map((a) => (
            <button
              key={a.value}
              onClick={() => select(a.value)}
              className="rounded-lg border border-border bg-surface-elevated px-4 py-4 text-left text-sm font-medium text-foreground transition-colors hover:border-primary hover:bg-primary/10"
            >
              {a.label}
            </button>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={() => setStep(Math.max(0, step - 1))}
            disabled={step === 0}
            className="inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground disabled:opacity-40 disabled:hover:bg-transparent"
          >
            <ArrowLeft className="h-4 w-4" /> Previous
          </button>
          <button
            onClick={reset}
            className="inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <RotateCcw className="h-4 w-4" /> Restart
          </button>
        </div>
      </div>

      <p className="mt-4 text-center text-xs text-muted-foreground">
        Your answers stay on this device. Nothing is saved or shared.
      </p>
    </div>
  );
}

const RESULTS: Record<Tier, {
  title: string;
  tagline: string;
  tone: string;
  summary: string;
  actions: string[];
}> = {
  low: {
    title: "Low Risk",
    tagline: "Stay aware, stay connected.",
    tone: "bg-success text-success-foreground",
    summary:
      "Based on your answers, there are no strong indicators of substance abuse right now. That doesn't mean you stop watching — connection is the best prevention.",
    actions: [
      "Have one open, judgement-free chat in the next 24 hours.",
      "Eat one meal together this week without phones.",
      "Bookmark Learn the Signs so you can spot changes early.",
      "Save SADAG (0800 567 567) in your phone, just in case.",
    ],
  },
  early: {
    title: "Early Warning Signs",
    tagline: "Time to lean in, gently.",
    tone: "bg-warning text-warning-foreground",
    summary:
      "Your answers suggest changes worth taking seriously. Acting now — calmly and supportively — can change the path before things escalate.",
    actions: [
      "Within 24 hours: find a private moment and ask how they're really doing.",
      "Listen 80% of the time. Don't accuse, don't lecture.",
      "Quietly remove easy access to alcohol, medication or cash.",
      "Call SANCA (011 892 3829) for free family guidance.",
      "Check Find Help Near Me for a counsellor in your area.",
    ],
  },
  immediate: {
    title: "Immediate Support Recommended",
    tagline: "Please don't wait.",
    tone: "bg-urgent text-urgent-foreground",
    summary:
      "Your answers point to serious concern. You don't have to handle this alone — trained South African counsellors are ready to help you take the next step today.",
    actions: [
      "Call SADAG's 24-hour line now: 0800 567 567.",
      "If they are in physical danger, call 10111 immediately.",
      "Stay calm and present — your steady presence matters more than the perfect words.",
      "Find the nearest rehab or clinic through Find Help Near Me.",
      "Reach out to one trusted adult or family member today so you're not alone in this.",
    ],
  },
};

function Result({ tier, onReset }: { tier: Tier; onReset: () => void }) {
  const r = RESULTS[tier];
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <div className="rounded-2xl border border-border bg-surface p-6 md:p-8">
        <span className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold ${r.tone}`}>
          <ShieldAlert className="h-3.5 w-3.5" />
          {r.title}
        </span>
        <h1 className="mt-4 text-2xl font-semibold tracking-tight md:text-3xl">{r.tagline}</h1>
        <p className="mt-3 text-muted-foreground">{r.summary}</p>

        <div className="mt-7">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            What to do in the next 24 hours
          </h2>
          <ol className="mt-3 space-y-2.5">
            {r.actions.map((a, i) => (
              <li
                key={i}
                className="flex gap-3 rounded-lg border border-border bg-surface-elevated px-4 py-3 text-sm text-foreground"
              >
                <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-semibold text-primary">
                  {i + 1}
                </span>
                <span>{a}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            to="/find-help"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            <MapPin className="h-4 w-4" /> Find help near me
          </Link>
          <a
            href="tel:0800567567"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-surface-elevated px-4 py-2.5 text-sm font-medium text-foreground hover:bg-secondary"
          >
            <Phone className="h-4 w-4" /> Call SADAG 24h
          </a>
          <button
            onClick={onReset}
            className="inline-flex items-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            <RotateCcw className="h-4 w-4" /> Start over
          </button>
        </div>
      </div>

      <p className="mt-4 text-center text-xs text-muted-foreground">
        This is not a medical diagnosis. It's a starting point for an honest conversation.
      </p>
    </div>
  );
}
