import { Link } from "@tanstack/react-router";
import { Activity, MapPin, BookOpen, Sparkles, Globe, Bot } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import type { LangCode } from "@/lib/languages";

export function SiteHeader() {
  const { lang, setLang, t, languages } = useI18n();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-4 px-4">
        <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-primary text-primary-foreground">
            <Sparkles className="h-4 w-4" />
          </span>
          <span className="text-foreground">MzansiPulse</span>
        </Link>

        <nav className="ml-4 hidden items-center gap-1 md:flex">
          <NavItem to="/pulse-check" icon={<Activity className="h-4 w-4" />} label={t("nav.pulseCheck")} />
          <NavItem to="/pulse-ai" icon={<Bot className="h-4 w-4" />} label={t("nav.pulseAI")} />
          <NavItem to="/find-help" icon={<MapPin className="h-4 w-4" />} label={t("nav.findHelp")} />
          <NavItem to="/stories" icon={<BookOpen className="h-4 w-4" />} label={t("nav.stories")} />
          <NavItem to="/learn" icon={<BookOpen className="h-4 w-4" />} label={t("nav.learn")} />
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <label className="relative flex items-center">
            <Globe className="pointer-events-none absolute left-2.5 h-4 w-4 text-muted-foreground" />
            <select
              aria-label={t("lang.label")}
              value={lang}
              onChange={(e) => setLang(e.target.value as LangCode)}
              className="h-9 cursor-pointer appearance-none rounded-md border border-input bg-surface pl-8 pr-3 text-sm text-foreground transition-colors hover:bg-surface-elevated focus:outline-none focus:ring-1 focus:ring-ring"
            >
              {languages.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.native}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <nav className="flex items-center gap-1 overflow-x-auto border-t border-border px-2 py-1.5 md:hidden">
        <NavItem to="/pulse-check" icon={<Activity className="h-4 w-4" />} label={t("nav.pulseCheck")} />
        <NavItem to="/pulse-ai" icon={<Bot className="h-4 w-4" />} label={t("nav.pulseAI")} />
        <NavItem to="/find-help" icon={<MapPin className="h-4 w-4" />} label={t("nav.findHelp")} />
        <NavItem to="/stories" icon={<BookOpen className="h-4 w-4" />} label={t("nav.stories")} />
        <NavItem to="/learn" icon={<BookOpen className="h-4 w-4" />} label="Learn" />
      </nav>
    </header>
  );
}

function NavItem({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) {
  return (
    <Link
      to={to}
      activeOptions={{ exact: false }}
      className="inline-flex shrink-0 items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground [&.active]:bg-secondary [&.active]:text-foreground"
    >
      {icon}
      {label}
    </Link>
  );
}

export function SiteFooter() {
  const { t } = useI18n();
  return (
    <footer className="mt-20 border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-10 text-sm text-muted-foreground">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="font-semibold text-foreground">MzansiPulse</div>
            <p className="mt-1 max-w-md">{t("footer.tagline")}</p>
          </div>
          <div className="space-y-1">
            <div className="font-medium text-foreground">{t("footer.crisis")}</div>
            <div>SANCA: <span className="text-foreground">011 892 3829</span></div>
            <div>SADAG 24h: <span className="text-foreground">0800 567 567</span></div>
            <div>Emergency: <span className="text-foreground">10111</span></div>
          </div>
        </div>
        <div className="mt-8 text-xs">© {new Date().getFullYear()} MzansiPulse. {t("footer.notMedical")}</div>
      </div>
    </footer>
  );
}
