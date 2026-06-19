import { useState } from "react";
import { AlertTriangle, Megaphone, Heart, X, ChevronLeft, ChevronRight } from "lucide-react";

type Category = "alert" | "campaign" | "tip";

interface AlertItem {
  category: Category;
  title: string;
  message: string;
}

const ITEMS: AlertItem[] = [
  {
    category: "alert",
    title: "Community Alert",
    message:
      "Rising reports of nyaope and crystal meth use among youth in Gauteng townships. If you notice sudden withdrawal or money disappearing, talk early — don't wait.",
  },
  {
    category: "campaign",
    title: "Awareness Campaign",
    message:
      "October is Substance Abuse Awareness Month. Join community walks across Mzansi — Soweto, Khayelitsha, Mitchells Plain and more.",
  },
  {
    category: "tip",
    title: "Prevention Tip",
    message:
      "Open conversations beat lectures. Ask your teen one question about their day — every day. Connection is the strongest protective factor.",
  },
];

const CATEGORY_META: Record<Category, { label: string; icon: typeof AlertTriangle; tone: string }> = {
  alert: {
    label: "Community Alert",
    icon: AlertTriangle,
    tone: "bg-urgent text-urgent-foreground",
  },
  campaign: {
    label: "Campaign",
    icon: Megaphone,
    tone: "bg-info text-info-foreground",
  },
  tip: {
    label: "Prevention Tip",
    icon: Heart,
    tone: "bg-success text-success-foreground",
  },
};

export function AlertBanner() {
  const [open, setOpen] = useState(true);
  const [index, setIndex] = useState(0);

  if (!open) return null;

  const item = ITEMS[index];
  const meta = CATEGORY_META[item.category];
  const Icon = meta.icon;

  const next = () => setIndex((i) => (i + 1) % ITEMS.length);
  const prev = () => setIndex((i) => (i - 1 + ITEMS.length) % ITEMS.length);

  return (
    <div className="w-full border-b border-border bg-surface-elevated">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2.5">
        <span
          className={`inline-flex shrink-0 items-center gap-1.5 rounded-md px-2 py-1 text-xs font-semibold ${meta.tone}`}
        >
          <Icon className="h-3.5 w-3.5" />
          {meta.label}
        </span>

        <div className="min-w-0 flex-1 text-sm text-foreground">
          <span className="font-medium">{item.title}: </span>
          <span className="text-muted-foreground">{item.message}</span>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <button
            onClick={prev}
            aria-label="Previous alert"
            className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="text-xs tabular-nums text-muted-foreground">
            {index + 1}/{ITEMS.length}
          </span>
          <button
            onClick={next}
            aria-label="Next alert"
            className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close banner"
            className="ml-1 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
