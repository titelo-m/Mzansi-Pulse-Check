import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Quote, MapPin, Clock } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/stories")({
  head: () => ({
    meta: [
      { title: "Recovery Stories — MzansiPulse" },
      {
        name: "description",
        content:
          "Real recovery journeys from South Africans who overcame substance abuse. Hope, honesty, and proof that recovery is possible.",
      },
    ],
  }),
  component: Stories,
});

interface Story {
  name: string;
  age: number;
  location: string;
  substance: string;
  cleanFor: string;
  excerpt: string;
  body: string[];
}

const STORIES: Story[] = [
  {
    name: "Thabo M.",
    age: 29,
    location: "Soweto, Gauteng",
    substance: "Nyaope",
    cleanFor: "3 years",
    excerpt:
      "I started with my friends after matric. I thought I could stop whenever I wanted. Three years later I was stealing from my own mother.",
    body: [
      "Nyaope took everything from me — my dignity, my family, my future. The hardest part wasn't the using. It was looking my mama in the eyes after she found her wedding ring missing.",
      "What saved me was a community worker from SANCA who didn't give up. He didn't lecture me. He just kept showing up. One day I showed up too.",
      "Today I work with young men in Diepkloof. Recovery isn't a straight line — but every morning I wake up clean is a small victory worth fighting for.",
    ],
  },
  {
    name: "Lerato K.",
    age: 34,
    location: "Cape Town, Western Cape",
    substance: "Crystal meth (tik)",
    cleanFor: "5 years",
    excerpt:
      "I was a teacher. I was a mother. I told myself addicts looked different from me. They don't.",
    body: [
      "It started with weekend parties. Then weekdays. Then I couldn't teach without it. I lost my job before I lost my marriage, and I lost my marriage before I lost myself.",
      "My sister staged a quiet intervention — no shouting, just a packed bag and a bed at a rehab in Kommetjie. I cried for a week. Then I started listening.",
      "I'm a teacher again. My kids are back home. If you're reading this and you're scared — please make the call. The first step is the hardest. After that, you're not alone.",
    ],
  },
  {
    name: "Sipho D.",
    age: 41,
    location: "Durban, KwaZulu-Natal",
    substance: "Alcohol",
    cleanFor: "8 years",
    excerpt:
      "Alcohol is so normal in our culture. Nobody noticed I was drinking myself to death.",
    body: [
      "I owned my own business. I never missed a day of work. That's how I convinced myself I wasn't an alcoholic. But my hands would shake until the first drink at 11am.",
      "My turning point was my daughter, then 7, asking why I smelt funny at her school play. I checked into Newlands Park the next Monday.",
      "Eight years sober. I run an AA group in Umlazi twice a week. The biggest lie addiction tells you is that you're alone. You're not.",
    ],
  },
];

function Stories() {
  const [open, setOpen] = useState<Story | null>(null);
  const { t } = useI18n();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{t("stories.title")}</h1>
        <p className="mt-2 text-muted-foreground">{t("stories.subtitle")}</p>
      </header>

      <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {STORIES.map((s) => (
          <li key={s.name}>
            <button
              onClick={() => setOpen(s)}
              className="group flex h-full w-full flex-col rounded-xl border border-border bg-surface p-6 text-left transition-colors hover:border-primary/40 hover:bg-surface-elevated"
            >
              <Quote className="h-6 w-6 text-primary/70" />
              <p className="mt-4 text-foreground">"{s.excerpt}"</p>
              <div className="mt-6 flex items-end justify-between">
                <div>
                  <div className="font-semibold text-foreground">{s.name}, {s.age}</div>
                  <div className="mt-0.5 inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" /> {s.location}
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 rounded-md bg-success/15 px-2 py-1 text-xs font-semibold text-success">
                  <Clock className="h-3 w-3" /> {t("stories.clean")} {s.cleanFor}
                </span>
              </div>
            </button>
          </li>
        ))}
      </ul>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm"
          onClick={() => setOpen(null)}
        >
          <article
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-border bg-surface p-6 shadow-2xl md:p-8"
          >
            <button
              onClick={() => setOpen(null)}
              className="absolute right-4 top-4 rounded-md px-2 py-1 text-xs text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              {t("stories.close")}
            </button>
            <div className="text-xs font-semibold uppercase tracking-wider text-primary">
              {open.substance} • Clean {open.cleanFor}
            </div>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">{open.name}, {open.age}</h2>
            <div className="mt-1 inline-flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" /> {open.location}
            </div>
            <div className="mt-6 space-y-4 text-foreground/90">
              {open.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </article>
        </div>
      )}
    </div>
  );
}
