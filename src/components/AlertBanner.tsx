// src/components/AlertBanner.tsx
import { useState, useEffect } from "react";
import { 
  AlertTriangle, Megaphone, Heart, X, ChevronLeft, ChevronRight, 
  Clock, Globe, MapPin, ShieldCheck 
} from "lucide-react";
import { useI18n } from "@/lib/i18n";

type Category = "alert" | "campaign" | "tip" | "update";

interface AlertItem {
  category: Category;
  titleKey: string;
  messageKey: string;
  source: string;
  reportedBy: string;
  location: string;
  timestamp: Date;
}

function getRandomTimestamp(): Date {
  const now = new Date();
  const hoursAgo = Math.floor(Math.random() * 168);
  return new Date(now.getTime() - hoursAgo * 60 * 60 * 1000);
}

const ITEMS: AlertItem[] = [
  {
    category: "alert",
    titleKey: "banner.alert1.title",
    messageKey: "banner.alert1.message",
    source: "Tshwane Health Department",
    reportedBy: "Clinic Sister",
    location: "Hammanskraal, Tshwane",
    timestamp: getRandomTimestamp(),
  },
  {
    category: "campaign",
    titleKey: "banner.alert2.title",
    messageKey: "banner.alert2.message",
    source: "Pretoria West Community Forum",
    reportedBy: "Forum Chairperson",
    location: "Pretoria West, Tshwane",
    timestamp: getRandomTimestamp(),
  },
  {
    category: "tip",
    titleKey: "banner.alert3.title",
    messageKey: "banner.alert3.message",
    source: "SADAG Youth Helpline",
    reportedBy: "Counsellor S. Mthembu",
    location: "Ga-Rankuwa, Tshwane",
    timestamp: getRandomTimestamp(),
  },
  {
    category: "update",
    titleKey: "banner.alert4.title",
    messageKey: "banner.alert4.message",
    source: "SANCA National Office",
    reportedBy: "CEO Dr. L. Mokoena",
    location: "Tshwane & Nationwide",
    timestamp: getRandomTimestamp(),
  },
];

const CATEGORY_META: Record<Category, { labelKey: string; icon: typeof AlertTriangle; bgColor: string; borderColor: string; textColor: string }> = {
  alert: {
    labelKey: "banner.urgentAlert",
    icon: AlertTriangle,
    bgColor: "bg-red-600/20",
    borderColor: "border-red-600/50",
    textColor: "text-red-400",
  },
  campaign: {
    labelKey: "banner.communityAction",
    icon: Megaphone,
    bgColor: "bg-yellow-600/20",
    borderColor: "border-yellow-600/50",
    textColor: "text-yellow-400",
  },
  tip: {
    labelKey: "banner.earlyWarningTip",
    icon: Heart,
    bgColor: "bg-emerald-600/20",
    borderColor: "border-emerald-600/50",
    textColor: "text-emerald-400",
  },
  update: {
    labelKey: "banner.officialUpdate",
    icon: Globe,
    bgColor: "bg-blue-600/20",
    borderColor: "border-blue-600/50",
    textColor: "text-blue-400",
  },
};

function formatTimestamp(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const timeStr = `${hours}:${minutes}`;

  let timeAgo = "";
  if (diffMins < 1) timeAgo = "Just now";
  else if (diffMins < 60) timeAgo = `${diffMins} minutes ago`;
  else if (diffHours < 24) timeAgo = `${diffHours} hours ago`;
  else if (diffDays === 1) timeAgo = "Yesterday";
  else timeAgo = `${diffDays} days ago`;

  return `${timeStr} • ${timeAgo}`;
}

export function AlertBanner() {
  const { t } = useI18n();
  const [open, setOpen] = useState(true);
  const [index, setIndex] = useState(0);
  const [timeDisplay, setTimeDisplay] = useState("");

  useEffect(() => {
    const item = ITEMS[index];
    setTimeDisplay(formatTimestamp(item.timestamp));
    
    const interval = setInterval(() => {
      setTimeDisplay(formatTimestamp(item.timestamp));
    }, 60000);
    
    return () => clearInterval(interval);
  }, [index]);

  if (!open) return null;

  const item = ITEMS[index];
  const meta = CATEGORY_META[item.category];
  const Icon = meta.icon;
  const isAlert = item.category === "alert";

  const next = () => setIndex((i) => (i + 1) % ITEMS.length);
  const prev = () => setIndex((i) => (i - 1 + ITEMS.length) % ITEMS.length);

  return (
    <div className="mx-auto max-w-7xl px-4 pt-4">
      <div 
        className={`relative w-full rounded-xl border ${meta.borderColor} ${meta.bgColor} shadow-lg shadow-black/30 backdrop-blur-sm transition-all`}
      >
        {isAlert && (
          <div className="absolute inset-0 overflow-hidden rounded-xl">
            <div className="absolute inset-0 animate-pulse bg-red-500/5" />
          </div>
        )}
        
        <div className="relative flex items-start gap-3 px-4 py-3">
          <span
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-semibold ${meta.textColor} ${meta.bgColor} border ${meta.borderColor} mt-0.5`}
          >
            <Icon className="h-3.5 w-3.5" />
            {t(meta.labelKey)}
          </span>

          <div className="min-w-0 flex-1">
            <div className="text-sm font-semibold text-foreground">
              {t(item.titleKey)}
            </div>

            <div className="text-sm leading-relaxed text-muted-foreground">
              {t(item.messageKey)}
            </div>

            <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground/70">
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {item.location}
              </span>
              <span className="inline-flex items-center gap-1">
                <Globe className="h-3 w-3" />
                {t("banner.source")}: {item.source}
              </span>
              <span className="inline-flex items-center gap-1">
                <ShieldCheck className="h-3 w-3" />
                {t("banner.reported")}: {item.reportedBy}
              </span>
            </div>

            <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground/50">
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {timeDisplay}
              </span>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-1">
            <button
              onClick={prev}
              aria-label={t("banner.previous")}
              className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-xs tabular-nums text-muted-foreground">
              {index + 1}/{ITEMS.length}
            </span>
            <button
              onClick={next}
              aria-label={t("banner.next")}
              className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => setOpen(false)}
              aria-label={t("banner.close")}
              className="ml-1 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}