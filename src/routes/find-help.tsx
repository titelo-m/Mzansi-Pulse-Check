// src/routes/find-help.tsx
import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { Phone, MapPin, Search, Building, Users, Heart, CheckCircle, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/find-help")({
  head: () => ({
    meta: [
      { title: "Find Help Near Me — MzansiPulse" },
      {
        name: "description",
        content:
          "Rehab centres, counsellors, social workers and 24-hour helplines across South Africa's nine provinces.",
      },
    ],
  }),
  component: FindHelp,
});

type Kind = "Helpline" | "Rehab" | "Counselling" | "Community" | "Government" | "Emergency";

interface Resource {
  name: string;
  kind: Kind;
  province: string;
  phone?: string;
  whatsapp?: string;
  address?: string;
  description: string;
  services: string[];
}

const PROVINCES = [
  "All Provinces",
  "Gauteng",
  "Western Cape",
  "KwaZulu-Natal",
  "Eastern Cape",
  "Free State",
  "Limpopo",
  "Mpumalanga",
  "North West",
  "Northern Cape",
  "Nationwide",
];

const RESOURCES: Resource[] = [
  // === NATIONWIDE HELPLINES ===
  {
    name: "SADAG - Suicide Crisis Helpline",
    kind: "Helpline",
    province: "Nationwide",
    phone: "0800 567 567",
    description: "24/7 free counselling for substance abuse, depression, anxiety, and suicide prevention.",
    services: ["Substance Abuse Support", "Depression & Anxiety", "Suicide Prevention", "Referrals"],
  },
  {
    name: "SADAG - WhatsApp Support",
    kind: "Helpline",
    province: "Nationwide",
    phone: "076 882 2775",
    description: "WhatsApp counselling support for mental health and substance abuse concerns.",
    services: ["Counselling", "Support", "Referrals"],
  },
  {
    name: "SANCA National",
    kind: "Helpline",
    province: "Nationwide",
    phone: "011 892 3829",
    description: "South African National Council on Alcoholism and Drug Dependence - national support and referrals.",
    services: ["Drug Addiction", "Alcohol Addiction", "Family Support", "Rehab Referrals"],
  },
  {
    name: "Lifeline South Africa",
    kind: "Helpline",
    province: "Nationwide",
    phone: "0861 322 322",
    description: "Confidential telephone counselling, 24 hours a day.",
    services: ["Counselling", "Crisis Support", "Referrals"],
  },
  {
    name: "Local Drug Action Committee (LDAC)",
    kind: "Community",
    province: "Nationwide",
    description: "Community-based drug action committees available through municipalities nationwide.",
    services: ["Local Referrals", "Community Intervention", "Recovery Support", "Family Assistance"],
  },

  // === GAUTENG ===
  {
    name: "Dr Fabian and Florence Rebeiro Treatment Centre",
    kind: "Government",
    province: "Gauteng",
    phone: "012 734 8300",
    address: "Gauteng",
    description: "Government inpatient rehabilitation centre for drug and alcohol addiction.",
    services: ["Drug Addiction", "Alcohol Addiction", "Inpatient Rehabilitation", "Family Support"],
  },
  {
    name: "Crossroads Recovery Centre Pretoria",
    kind: "Rehab",
    province: "Gauteng",
    phone: "082 653 3311",
    address: "Pretoria, Gauteng",
    description: "Comprehensive recovery centre offering inpatient and outpatient treatment.",
    services: ["Drug Addiction", "Alcohol Addiction", "Gambling Addiction", "Outpatient Treatment"],
  },
  {
    name: "Crossroads Recovery Centre Johannesburg",
    kind: "Rehab",
    province: "Gauteng",
    phone: "074 895 1043",
    address: "Johannesburg, Gauteng",
    description: "Recovery centre treating multiple addictions including food and gambling.",
    services: ["Drug Addiction", "Alcohol Addiction", "Food Addiction", "Gambling Addiction"],
  },
  {
    name: "Houghton House",
    kind: "Rehab",
    province: "Gauteng",
    phone: "011 787 9142",
    whatsapp: "079 770 7532",
    address: "Johannesburg, Gauteng",
    description: "Long-term recovery programmes with outpatient support options.",
    services: ["Drug Addiction", "Alcohol Addiction", "Long-term Recovery", "Outpatient Programmes"],
  },
  {
    name: "Journey Rehabilitation Centre",
    kind: "Rehab",
    province: "Gauteng",
    phone: "011 786 0326",
    whatsapp: "082 447 6727",
    address: "Gauteng",
    description: "Medical detox and treatment for behavioural disorders.",
    services: ["Drug Addiction", "Alcohol Addiction", "Medical Detox", "Behavioural Disorders"],
  },

  // === WESTERN CAPE ===
  {
    name: "Kensington Treatment Centre",
    kind: "Government",
    province: "Western Cape",
    phone: "021 511 9169",
    address: "Cape Town, Western Cape",
    description: "Substance abuse treatment, counselling, and recovery programmes.",
    services: ["Substance Abuse Treatment", "Counselling", "Recovery Programmes"],
  },
  {
    name: "Cape Town Drug Counselling Centre",
    kind: "Counselling",
    province: "Western Cape",
    phone: "021 447 3811",
    address: "Cape Town, Western Cape",
    description: "Free outpatient counselling for individuals and families.",
    services: ["Counselling", "Family Support", "Outpatient Services"],
  },
  {
    name: "Stepping Stones Addiction Centre",
    kind: "Rehab",
    province: "Western Cape",
    phone: "028 754 1255",
    address: "Kommetjie, Western Cape",
    description: "Long-term residential recovery programme in Kommetjie.",
    services: ["Drug Addiction", "Alcohol Addiction", "Residential Treatment", "Recovery Support"],
  },

  // === KWAZULU-NATAL ===
  {
    name: "Madadeni Treatment Centre",
    kind: "Government",
    province: "KwaZulu-Natal",
    phone: "034 329 2011",
    address: "Madadeni, KwaZulu-Natal",
    description: "Government substance abuse treatment centre.",
    services: ["Substance Abuse Treatment", "Rehabilitation", "Recovery Support"],
  },
  {
    name: "Newlands Park Treatment Centre",
    kind: "Government",
    province: "KwaZulu-Natal",
    phone: "031 578 3992",
    address: "Newlands, KwaZulu-Natal",
    description: "Government treatment centre for substance abuse recovery.",
    services: ["Substance Abuse Treatment", "Rehabilitation", "Recovery Support"],
  },
  {
    name: "Khanyani Treatment Centre",
    kind: "Government",
    province: "KwaZulu-Natal",
    phone: "034 317 3802",
    address: "KwaZulu-Natal",
    description: "Government substance abuse treatment and recovery centre.",
    services: ["Substance Abuse Treatment", "Rehabilitation", "Recovery Support"],
  },
  {
    name: "SANCA Durban",
    kind: "Counselling",
    province: "KwaZulu-Natal",
    phone: "031 303 1417",
    address: "Durban, KwaZulu-Natal",
    description: "Outpatient services, prevention and youth programmes.",
    services: ["Outpatient Services", "Prevention Programmes", "Youth Programmes", "Counselling"],
  },

  // === EASTERN CAPE ===
  {
    name: "Ernest Malgas Treatment Centre",
    kind: "Government",
    province: "Eastern Cape",
    phone: "041 454 0058",
    description: "Substance abuse treatment, rehabilitation, and recovery support.",
    services: ["Substance Abuse Treatment", "Rehabilitation", "Recovery Support"],
  },
  {
    name: "SANCA Eastern Cape",
    kind: "Counselling",
    province: "Eastern Cape",
    phone: "041 373 1091",
    address: "Port Elizabeth, Eastern Cape",
    description: "Counselling, education and outreach in Port Elizabeth and surrounds.",
    services: ["Counselling", "Education", "Outreach", "Family Support"],
  },

  // === FREE STATE ===
  {
    name: "Charlotte Maxeke Treatment Centre",
    kind: "Government",
    province: "Free State",
    phone: "051 533 0815",
    address: "Free State",
    description: "Government substance abuse treatment centre.",
    services: ["Substance Abuse Treatment", "Rehabilitation", "Recovery Support"],
  },
  {
    name: "Beyers Naude Public Halfway House",
    kind: "Government",
    province: "Free State",
    phone: "066 486 6906",
    address: "Free State",
    description: "Halfway house for recovery support and reintegration.",
    services: ["Halfway House", "Recovery Support", "Reintegration"],
  },
  {
    name: "SANCA Free State",
    kind: "Counselling",
    province: "Free State",
    phone: "051 447 3059",
    address: "Bloemfontein, Free State",
    description: "Bloemfontein-based prevention and treatment programmes.",
    services: ["Prevention", "Treatment", "Counselling", "Family Support"],
  },

  // === LIMPOPO ===
  {
    name: "Seshego Treatment Centre",
    kind: "Government",
    province: "Limpopo",
    phone: "015 233 7016",
    address: "Seshego, Limpopo",
    description: "Government substance abuse treatment and recovery centre.",
    services: ["Substance Abuse Treatment", "Rehabilitation", "Recovery Support"],
  },
  {
    name: "SANCA Limpopo",
    kind: "Counselling",
    province: "Limpopo",
    phone: "015 291 5448",
    address: "Polokwane, Limpopo",
    description: "Community outreach and substance abuse counselling in Polokwane.",
    services: ["Community Outreach", "Counselling", "Prevention", "Family Support"],
  },

  // === MPUMALANGA ===
  {
    name: "Swartfontein Treatment Centre",
    kind: "Government",
    province: "Mpumalanga",
    phone: "013 750 9918",
    address: "Mpumalanga",
    description: "Substance abuse rehabilitation and recovery centre.",
    services: ["Substance Abuse Rehabilitation", "Recovery Support", "Treatment"],
  },
  {
    name: "Nkangala Rehabilitation Centre",
    kind: "Government",
    province: "Mpumalanga",
    phone: "013 665 0620",
    address: "Mpumalanga",
    description: "Drug and alcohol rehabilitation centre.",
    services: ["Drug Rehabilitation", "Alcohol Rehabilitation", "Recovery Support"],
  },
  {
    name: "White River Manor",
    kind: "Rehab",
    province: "Mpumalanga",
    phone: "082 731 5939",
    address: "White River, Mpumalanga",
    description: "Executive recovery programmes for drug and alcohol addiction.",
    services: ["Drug Addiction", "Alcohol Addiction", "Executive Recovery Programmes"],
  },
  {
    name: "SANCA Mpumalanga",
    kind: "Counselling",
    province: "Mpumalanga",
    phone: "013 752 4448",
    address: "Witbank, Mpumalanga",
    description: "Witbank and Nelspruit support services.",
    services: ["Counselling", "Support", "Prevention", "Referrals"],
  },

  // === NORTH WEST ===
  {
    name: "JB Marks Treatment Centre",
    kind: "Government",
    province: "North West",
    phone: "018 294 5134",
    address: "North West",
    description: "Government substance abuse treatment centre.",
    services: ["Substance Abuse Treatment", "Rehabilitation", "Recovery Support"],
  },
  {
    name: "Taung Treatment Centre",
    kind: "Government",
    province: "North West",
    phone: "053 994 1379",
    address: "Taung, North West",
    description: "Government treatment centre for substance abuse recovery.",
    services: ["Substance Abuse Treatment", "Rehabilitation", "Recovery Support"],
  },
  {
    name: "SANCA North West",
    kind: "Counselling",
    province: "North West",
    phone: "018 462 8211",
    address: "Klerksdorp, North West",
    description: "Klerksdorp and surrounding community programmes.",
    services: ["Counselling", "Community Programmes", "Prevention", "Family Support"],
  },

  // === NORTHERN CAPE ===
  {
    name: "Northern Cape Substance Dependency Treatment Centre",
    kind: "Government",
    province: "Northern Cape",
    phone: "053 802 3300",
    address: "Northern Cape",
    description: "Government substance dependency treatment centre.",
    services: ["Substance Dependency Treatment", "Rehabilitation", "Recovery Support"],
  },
  {
    name: "SANCA Northern Cape",
    kind: "Counselling",
    province: "Northern Cape",
    address: "Kimberley, Northern Cape",
    description: "Kimberley-based community support and education.",
    services: ["Community Support", "Education", "Counselling", "Prevention"],
  },
];

const KIND_TONE: Record<Kind, { label: string; bg: string; text: string; border: string }> = {
  Helpline: { 
    label: "📞 Helpline", 
    bg: "bg-blue-500/15", 
    text: "text-blue-400", 
    border: "border-blue-500/30" 
  },
  Rehab: { 
    label: "🏥 Rehab Centre", 
    bg: "bg-emerald-500/15", 
    text: "text-emerald-400", 
    border: "border-emerald-500/30" 
  },
  Counselling: { 
    label: "💬 Counselling", 
    bg: "bg-purple-500/15", 
    text: "text-purple-400", 
    border: "border-purple-500/30" 
  },
  Community: { 
    label: "🤝 Community", 
    bg: "bg-yellow-500/15", 
    text: "text-yellow-400", 
    border: "border-yellow-500/30" 
  },
  Government: { 
    label: "🏛️ Government", 
    bg: "bg-orange-500/15", 
    text: "text-orange-400", 
    border: "border-orange-500/30" 
  },
  Emergency: { 
    label: "🚨 Emergency", 
    bg: "bg-red-500/15", 
    text: "text-red-400", 
    border: "border-red-500/30" 
  },
};

function FindHelp() {
  const { t } = useI18n();
  const [province, setProvince] = useState("All Provinces");
  const [q, setQ] = useState("");

  const translateDescription = (r: Resource) => {
    // Example: SADAG has a longer description we want translated
    if (r.name?.includes("SADAG")) return t("resources.sadag.description");
    return r.description;
  };

  const SERVICE_KEY_MAP: Record<string, string> = {
    "Substance Abuse Support": "service.substanceAbuseSupport",
    "Depression & Anxiety": "service.depressionAnxiety",
    "Suicide Prevention": "service.suicidePrevention",
    "Referrals": "service.referrals",
    "Counselling": "service.counselling",
    "Support": "service.support",
    "Rehab Referrals": "service.rehabReferrals",
    "Drug Addiction": "service.drugAddiction",
    "Alcohol Addiction": "service.alcoholAddiction",
    "Family Support": "service.familySupport",
  };

  const translateService = (s: string) => {
    const key = SERVICE_KEY_MAP[s];
    return key ? t(key) : s;
  };

  const filtered = useMemo(() => {
    return RESOURCES.filter((r) => {
      const provMatch = province === "All Provinces" || r.province === province;
      const queryMatch =
        !q ||
        r.name.toLowerCase().includes(q.toLowerCase()) ||
        r.description.toLowerCase().includes(q.toLowerCase()) ||
        r.services.some(s => s.toLowerCase().includes(q.toLowerCase()));
      return provMatch && queryMatch;
    });
  }, [province, q]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Back Link */}
      <div className="mb-6">
        <a href="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> {t("pulseCheck.back")}
        </a>
      </div>

      <header className="max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{t("findHelp.title")}</h1>
        <p className="mt-2 text-muted-foreground">{t("findHelp.subtitle")}</p>
      </header>

      {/* Search & Filter */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <label className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t("findHelp.search")}
            className="h-11 w-full rounded-md border border-input bg-surface pl-10 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </label>
        <select
          value={province}
          onChange={(e) => setProvince(e.target.value)}
          className="h-11 cursor-pointer rounded-md border border-input bg-surface px-3 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring sm:w-64"
        >
          {PROVINCES.map((p) => (
            <option key={p} value={p}>{p === "All Provinces" ? t("findHelp.province") : p}</option>
          ))}
        </select>
      </div>

      <div className="mt-2 text-xs text-muted-foreground">{filtered.length} {t("findHelp.results")}</div>

      {/* Results */}
      <ul className="mt-4 grid gap-4 md:grid-cols-2">
        {filtered.map((r) => {
          const tone = KIND_TONE[r.kind];
          return (
            <li
              key={r.name}
              className="flex flex-col rounded-xl border border-border bg-surface p-5 transition-colors hover:bg-surface-elevated"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-semibold text-foreground">{r.name}</h3>
                <span className={`shrink-0 rounded-md border px-2 py-0.5 text-[10px] font-medium ${tone.bg} ${tone.text} ${tone.border}`}>
                  {tone.label}
                </span>
              </div>
              
              {r.address && (
                <div className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" /> {r.address}
                </div>
              )}
              
              <div className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground">
                <Building className="h-3.5 w-3.5" /> {r.province}
              </div>
              
              <p className="mt-3 text-sm text-muted-foreground">{translateDescription(r)}</p>
              
              {/* Services */}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {r.services.map((service, i) => (
                  <span key={i} className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] text-primary">
                    {translateService(service)}
                  </span>
                ))}
              </div>
              
              {/* Contact */}
              <div className="mt-4 flex flex-wrap gap-2">
                {r.phone && (
                  <a
                    href={`tel:${r.phone.replace(/\s/g, '')}`}
                    className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
                  >
                    <Phone className="h-3.5 w-3.5" /> {r.phone}
                  </a>
                )}
                {r.whatsapp && (
                  <a
                    href={`https://wa.me/${r.whatsapp.replace(/\s/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-md bg-emerald-600/20 px-3 py-1.5 text-xs font-semibold text-emerald-400 hover:bg-emerald-600/30"
                  >
                    <Heart className="h-3.5 w-3.5" /> WhatsApp
                  </a>
                )}
                {r.kind === "Helpline" && (
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-blue-500/15 px-3 py-1.5 text-xs font-medium text-blue-400">
                    <CheckCircle className="h-3.5 w-3.5" /> 24/7 Available
                  </span>
                )}
              </div>
            </li>
          );
        })}
      </ul>

      {filtered.length === 0 && (
        <div className="mt-10 rounded-xl border border-dashed border-border bg-surface p-10 text-center text-sm text-muted-foreground">
          {t("findHelp.noResults")}
        </div>
      )}

      {/* Emergency Reminder */}
      <div className="mt-10 rounded-xl border border-urgent/30 bg-urgent/5 p-6">
        <div className="flex items-start gap-4">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-urgent/20 text-urgent">
            <Phone className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{t("findHelp.emergency.title")}</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {t("findHelp.emergency.text", { sadag: "0800 567 567", emergency: "10111" })}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">{t("findHelp.emergency.subtext")}</p>
          </div>
        </div>
      </div>

      {/* National Helplines Quick Access */}
      <div className="mt-6 rounded-xl border border-border bg-surface p-6">
        <h3 className="text-sm font-semibold text-foreground">{t("findHelp.nationalHelplines")}</h3>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <div className="rounded-lg bg-surface-elevated p-3">
            <div className="text-xs text-muted-foreground">SADAG Suicide Crisis</div>
            <div className="font-medium text-foreground">0800 567 567</div>
          </div>
          <div className="rounded-lg bg-surface-elevated p-3">
            <div className="text-xs text-muted-foreground">SANCA National</div>
            <div className="font-medium text-foreground">011 892 3829</div>
          </div>
          <div className="rounded-lg bg-surface-elevated p-3">
            <div className="text-xs text-muted-foreground">Lifeline SA</div>
            <div className="font-medium text-foreground">0861 322 322</div>
          </div>
          <div className="rounded-lg bg-surface-elevated p-3">
            <div className="text-xs text-muted-foreground">SADAG WhatsApp</div>
            <div className="font-medium text-foreground">076 882 2775</div>
          </div>
        </div>
      </div>
    </div>
  );
}