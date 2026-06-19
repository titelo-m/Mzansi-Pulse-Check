import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Phone, MapPin, ExternalLink, Search } from "lucide-react";

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

type Kind = "Helpline" | "Rehab" | "Counselling" | "Community" | "Emergency";

interface Resource {
  name: string;
  kind: Kind;
  province: string;
  phone?: string;
  url?: string;
  description: string;
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
  { name: "SADAG 24-Hour Substance Abuse Helpline", kind: "Helpline", province: "Nationwide", phone: "0800567567", description: "Free counselling and crisis support, available 24/7." },
  { name: "SANCA National Office", kind: "Helpline", province: "Nationwide", phone: "0118923829", description: "South African National Council on Alcoholism and Drug Dependence — referrals and family support." },
  { name: "Emergency Services", kind: "Emergency", province: "Nationwide", phone: "10111", description: "If life is in danger right now — police and emergency response." },
  { name: "Lifeline South Africa", kind: "Helpline", province: "Nationwide", phone: "0861322322", description: "Confidential telephone counselling, 24 hours." },

  { name: "SANCA Johannesburg", kind: "Rehab", province: "Gauteng", phone: "0118923829", description: "Outpatient treatment, support groups, family counselling in Johannesburg." },
  { name: "Houghton House Group", kind: "Rehab", province: "Gauteng", phone: "0114830933", description: "In-patient rehabilitation programmes in Johannesburg." },

  { name: "Cape Town Drug Counselling Centre", kind: "Counselling", province: "Western Cape", phone: "0214473811", description: "Free outpatient counselling for individuals and families." },
  { name: "Stepping Stones Addiction Centre", kind: "Rehab", province: "Western Cape", phone: "0287541255", description: "Long-term residential recovery programme in Kommetjie." },

  { name: "SANCA Durban", kind: "Rehab", province: "KwaZulu-Natal", phone: "0313031417", description: "Outpatient services, prevention and youth programmes." },
  { name: "Newlands Park Centre", kind: "Rehab", province: "KwaZulu-Natal", phone: "0315774545", description: "Residential treatment for substance dependency." },

  { name: "SANCA Eastern Cape", kind: "Counselling", province: "Eastern Cape", phone: "0413731091", description: "Counselling, education and outreach in Port Elizabeth and surrounds." },
  { name: "SANCA Free State", kind: "Counselling", province: "Free State", phone: "0514473059", description: "Bloemfontein-based prevention and treatment programmes." },
  { name: "SANCA Limpopo", kind: "Community", province: "Limpopo", phone: "0152915448", description: "Community outreach and substance abuse counselling in Polokwane." },
  { name: "SANCA Mpumalanga", kind: "Counselling", province: "Mpumalanga", phone: "0137524448", description: "Witbank and Nelspruit support services." },
  { name: "SANCA North West", kind: "Counselling", province: "North West", phone: "0184628211", description: "Klerksdorp and surrounding community programmes." },
  { name: "Northern Cape Substance Abuse Forum", kind: "Community", province: "Northern Cape", description: "Kimberley-based community support and education." },
];

const KIND_TONE: Record<Kind, string> = {
  Helpline: "bg-info/20 text-info border-info/30",
  Rehab: "bg-primary/20 text-primary border-primary/30",
  Counselling: "bg-accent/20 text-accent border-accent/30",
  Community: "bg-success/20 text-success border-success/30",
  Emergency: "bg-urgent/20 text-urgent border-urgent/30",
};

function FindHelp() {
  const [province, setProvince] = useState("All Provinces");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    return RESOURCES.filter((r) => {
      const provMatch = province === "All Provinces" || r.province === province;
      const queryMatch =
        !q ||
        r.name.toLowerCase().includes(q.toLowerCase()) ||
        r.description.toLowerCase().includes(q.toLowerCase());
      return provMatch && queryMatch;
    });
  }, [province, q]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Find help near you</h1>
        <p className="mt-2 text-muted-foreground">
          Trusted helplines, rehab centres and counsellors across all nine provinces. Most are free.
        </p>
      </header>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <label className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search a centre, service or city"
            className="h-11 w-full rounded-md border border-input bg-surface pl-10 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </label>
        <select
          value={province}
          onChange={(e) => setProvince(e.target.value)}
          className="h-11 cursor-pointer rounded-md border border-input bg-surface px-3 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring sm:w-64"
        >
          {PROVINCES.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>

      <div className="mt-2 text-xs text-muted-foreground">
        {filtered.length} {filtered.length === 1 ? "result" : "results"}
      </div>

      <ul className="mt-4 grid gap-3 md:grid-cols-2">
        {filtered.map((r) => (
          <li
            key={r.name}
            className="flex flex-col rounded-xl border border-border bg-surface p-5 transition-colors hover:bg-surface-elevated"
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-semibold text-foreground">{r.name}</h3>
              <span className={`shrink-0 rounded-md border px-2 py-0.5 text-[11px] font-medium ${KIND_TONE[r.kind]}`}>
                {r.kind}
              </span>
            </div>
            <div className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" /> {r.province}
            </div>
            <p className="mt-3 text-sm text-muted-foreground">{r.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {r.phone && (
                <a
                  href={`tel:${r.phone}`}
                  className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
                >
                  <Phone className="h-3.5 w-3.5" /> {formatPhone(r.phone)}
                </a>
              )}
              {r.url && (
                <a
                  href={r.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface-elevated px-3 py-1.5 text-xs font-medium text-foreground hover:bg-secondary"
                >
                  Website <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>

      {filtered.length === 0 && (
        <div className="mt-10 rounded-xl border border-dashed border-border bg-surface p-10 text-center text-sm text-muted-foreground">
          No results. Try a different province or clear the search.
        </div>
      )}
    </div>
  );
}

function formatPhone(p: string) {
  if (p.length === 5) return p;
  if (p.startsWith("0800") || p.startsWith("0861")) return `${p.slice(0, 4)} ${p.slice(4, 7)} ${p.slice(7)}`;
  return `${p.slice(0, 3)} ${p.slice(3, 6)} ${p.slice(6)}`;
}
