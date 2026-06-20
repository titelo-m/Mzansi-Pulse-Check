// src/routes/pulse-check.tsx
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { 
  ArrowLeft, 
  ArrowRight, 
  RotateCcw, 
  ShieldAlert, 
  Phone, 
  MapPin,
  AlertTriangle,
  CheckCircle2,
  Eye,
  Brain,
  Users,
  DollarSign,
  Moon,
  Sun,
  Activity,
  Users as UsersIcon,
  Clock,
  Heart,
  XCircle,
  AlertCircle,
  Info,
  Calendar,
  Home,
  User,
  MessageCircle,
  ThumbsUp,
  Sparkles,
  Shield,
  Target,
  Building,
  Church,
  School,
  Briefcase,
} from "lucide-react";

export const Route = createFileRoute("/pulse-check")({
  head: () => ({
    meta: [
      { title: "Pulse Check — Break the Cycle" },
      {
        name: "description",
        content:
          "An anonymous check to help you spot the early signs of substance abuse in your child in Tshwane.",
      },
    ],
  }),
  component: PulseCheck,
});

// Real early warning signs with categories - focused on youth/children
const WARNING_SIGNS = [
  { 
    id: "withdrawal", 
    label: "Withdrawn & Secretive", 
    icon: Eye,
    category: "Behavioral",
    description: "Suddenly distant from family. Spending hours locked in their room. Avoiding eye contact." 
  },
  { 
    id: "money", 
    label: "Money or Valuables Missing", 
    icon: DollarSign,
    category: "Financial",
    description: "Cash disappearing from your wallet. Jewellery or electronics going missing. Always broke." 
  },
  { 
    id: "sleep", 
    label: "Sleep Pattern Changes", 
    icon: Moon,
    category: "Physical",
    description: "Awake all night, sleeping all day. Or barely sleeping at all. Always exhausted." 
  },
  { 
    id: "friends", 
    label: "New Group of Friends", 
    icon: Users,
    category: "Social",
    description: "A new crowd you've never met. Avoiding old friends. Secretive about who they're with." 
  },
  { 
    id: "physical", 
    label: "Physical Changes", 
    icon: Activity,
    category: "Physical",
    description: "Bloodshot eyes, sudden weight loss, poor hygiene, unusual smells on clothes." 
  },
  { 
    id: "mood", 
    label: "Extreme Mood Swings", 
    icon: Brain,
    category: "Emotional",
    description: "Snapping over nothing. Emotionally numb. Extreme irritability or aggression." 
  },
  { 
    id: "neglect", 
    label: "Neglecting Responsibilities", 
    icon: UsersIcon,
    category: "Behavioral",
    description: "Skipping school, failing grades, ignoring chores. No interest in anything they used to love." 
  },
  { 
    id: "deception", 
    label: "Lying & Making Excuses", 
    icon: XCircle,
    category: "Behavioral",
    description: "Constantly lying about where they've been. Making excuses. Getting defensive when questioned." 
  },
  { 
    id: "appetite", 
    label: "Appetite Changes", 
    icon: Activity,
    category: "Physical",
    description: "Not eating properly. Noticeable weight changes in a short time." 
  },
  { 
    id: "isolation", 
    label: "Isolation from Family", 
    icon: Home,
    category: "Social",
    description: "Avoiding family meals. Not joining family activities. Spending all time alone." 
  },
];

// Tshwane locations with specific support centres
const TSHWANE_LOCATIONS = [
  "Mamelodi",
  "Atteridgeville",
  "Hammanskraal",
  "Ga-Rankuwa",
  "Soshanguve",
  "Pretoria CBD",
  "Pretoria West",
  "Centurion",
  "Bronkhorstspruit",
  "Cullinan",
  "Other"
];

// Relationships
const RELATIONSHIPS = [
  "Parent",
  "Guardian",
  "Teacher",
  "Friend",
  "Sibling",
  "Grandparent",
  "Child",
  "Community Member",
  "Church Leader",
  "Other"
];

// Age ranges - focused on youth
const AGE_RANGES = [
  "10-13",
  "14-17",
  "18-21",
  "22-25",
  "26-30",
  "Over 30"
];

// Duration of concern
const DURATIONS = [
  "Less than a month",
  "1-3 months",
  "3-6 months",
  "6-12 months",
  "Over a year"
];

// Helping Centres in Tshwane
const HELPING_CENTRES: Record<string, { name: string; phone: string; address: string; services: string[] }[]> = {
  "Mamelodi": [
    { name: "Mamelodi Community Health Centre", phone: "012 841 2000", address: "Tsamaya Road, Mamelodi", services: ["Counselling", "Medical", "Youth Support"] },
    { name: "Mamelodi Substance Abuse Support Group", phone: "012 841 3000", address: "Mamelodi Community Hall", services: ["Support Groups", "Family Counselling"] },
    { name: "Lentswe La Bophelo Clinic", phone: "012 841 2500", address: "Stand 123, Mamelodi East", services: ["Medical", "Counselling", "Youth"] },
  ],
  "Atteridgeville": [
    { name: "Atteridgeville Community Clinic", phone: "012 373 8000", address: "Corner Dube and Mampuru, Atteridgeville", services: ["Medical", "Counselling", "Youth"] },
    { name: "Atteridgeville Youth Development Centre", phone: "012 373 9000", address: "Saulsville Road, Atteridgeville", services: ["Youth Support", "Counselling", "Education"] },
    { name: "Kgosi Mampuru Hospital", phone: "012 356 9000", address: "Kgosi Mampuru Street, Pretoria", services: ["Medical", "Rehab", "Psychiatric"] },
  ],
  "Hammanskraal": [
    { name: "Hammanskraal Community Health Centre", phone: "012 711 1000", address: "Hammanskraal, Tshwane", services: ["Medical", "Counselling", "Youth"] },
    { name: "Hammanskraal Substance Abuse Forum", phone: "012 711 2000", address: "Hammanskraal Community Hall", services: ["Support Groups", "Awareness"] },
    { name: "Temba Hospital", phone: "012 725 1111", address: "Temba, Hammanskraal", services: ["Medical", "Rehab", "Psychiatric"] },
  ],
  "Ga-Rankuwa": [
    { name: "Ga-Rankuwa Community Health Centre", phone: "012 702 1111", address: "Ga-Rankuwa, Tshwane", services: ["Medical", "Counselling", "Youth"] },
    { name: "Ga-Rankuwa Youth Development Forum", phone: "012 702 2000", address: "Ga-Rankuwa Community Hall", services: ["Youth Support", "Counselling"] },
    { name: "Dr. George Mukhari Academic Hospital", phone: "012 529 3000", address: "Ga-Rankuwa, Tshwane", services: ["Medical", "Rehab", "Psychiatric", "Research"] },
  ],
  "Soshanguve": [
    { name: "Soshanguve Community Health Centre", phone: "012 731 8000", address: "Soshanguve, Tshwane", services: ["Medical", "Counselling", "Youth"] },
    { name: "Soshanguve Youth Support Centre", phone: "012 731 9000", address: "Soshanguve Community Hall", services: ["Youth Support", "Education", "Counselling"] },
    { name: "Soshanguve Substance Abuse Outreach", phone: "012 731 9500", address: "Soshanguve, Tshwane", services: ["Outreach", "Support Groups"] },
  ],
  "Pretoria CBD": [
    { name: "Pretoria West Hospital", phone: "012 380 6000", address: "Corner Soutpansberg and Paul Kruger, Pretoria", services: ["Medical", "Rehab", "Psychiatric"] },
    { name: "SANCA Pretoria", phone: "011 892 3829", address: "Pretoria CBD", services: ["Counselling", "Rehab", "Family Support"] },
    { name: "SADAG Pretoria Office", phone: "0800 567 567", address: "Pretoria CBD", services: ["Counselling", "Helpline", "Family Support"] },
    { name: "Tshwane Youth Counselling Centre", phone: "012 358 8600", address: "Pretoria CBD", services: ["Youth Counselling", "Family Support"] },
    { name: "Lifeline Pretoria", phone: "0861 322 322", address: "Pretoria CBD", services: ["Counselling", "Helpline", "Support"] },
  ],
  "Pretoria West": [
    { name: "Pretoria West Hospital", phone: "012 380 6000", address: "Pretoria West, Tshwane", services: ["Medical", "Rehab", "Psychiatric"] },
    { name: "Pretoria West Community Clinic", phone: "012 380 7000", address: "Pretoria West, Tshwane", services: ["Medical", "Counselling"] },
  ],
  "Centurion": [
    { name: "Unitas Hospital", phone: "012 481 2000", address: "Lynnwood Road, Centurion", services: ["Medical", "Rehab", "Psychiatric"] },
    { name: "Centurion Community Health Centre", phone: "012 358 8600", address: "Centurion, Tshwane", services: ["Medical", "Counselling", "Youth"] },
    { name: "Netcare Unitas Rehabilitation", phone: "012 481 2000", address: "Lynnwood Road, Centurion", services: ["Rehab", "Counseling"] },
  ],
  "Bronkhorstspruit": [
    { name: "Bronkhorstspruit Clinic", phone: "013 932 9000", address: "Bronkhorstspruit, Tshwane", services: ["Medical", "Counselling"] },
    { name: "Bronkhorstspruit Community Forum", phone: "013 932 9500", address: "Bronkhorstspruit Community Hall", services: ["Support Groups", "Awareness"] },
  ],
  "Cullinan": [
    { name: "Cullinan Clinic", phone: "012 734 0000", address: "Cullinan, Tshwane", services: ["Medical", "Counselling"] },
    { name: "Cullinan Community Support Centre", phone: "012 734 1000", address: "Cullinan Community Hall", services: ["Support Groups", "Counselling"] },
  ],
  "Other": [
    { name: "Tshwane Health Department", phone: "012 358 8600", address: "Tshwane, Gauteng", services: ["Information", "Referrals", "Support"] },
    { name: "SADAG National", phone: "0800 567 567", address: "Nationwide", services: ["Helpline", "Counselling", "Support"] },
    { name: "SANCA National", phone: "011 892 3829", address: "Nationwide", services: ["Counselling", "Rehab", "Support"] },
  ],
};

function PulseCheck() {
  const { t } = useI18n();
  const [step, setStep] = useState(0);
  const [location, setLocation] = useState("");
  const [relationship, setRelationship] = useState("");
  const [ageRange, setAgeRange] = useState("");
  const [duration, setDuration] = useState("");
  const [signs, setSigns] = useState(WARNING_SIGNS.map(s => ({ ...s, checked: false })));
  const [concernLevel, setConcernLevel] = useState(50);
  const [previousAttempts, setPreviousAttempts] = useState("");
  const [willingToTalk, setWillingToTalk] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [done, setDone] = useState(false);

  const totalSteps = 8;

  const toggleSign = (id: string) => {
    setSigns(signs.map(s => s.id === id ? { ...s, checked: !s.checked } : s));
  };

  const reset = () => {
    setStep(0);
    setLocation("");
    setRelationship("");
    setAgeRange("");
    setDuration("");
    setSigns(WARNING_SIGNS.map(s => ({ ...s, checked: false })));
    setConcernLevel(50);
    setPreviousAttempts("");
    setWillingToTalk("");
    setAdditionalNotes("");
    setDone(false);
  };

  const nextStep = () => {
    if (step < totalSteps - 1) setStep(step + 1);
    else setDone(true);
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  const canProceed = () => {
    if (step === 0) return location !== "";
    if (step === 1) return relationship !== "";
    if (step === 2) return ageRange !== "";
    if (step === 3) return duration !== "";
    if (step === 4) return signs.some(s => s.checked);
    if (step === 5) return concernLevel > 0;
    return true;
  };

  const renderStep = () => {
    switch(step) {
      case 0:
        return <LocationStep location={location} setLocation={setLocation} />;
      case 1:
        return <RelationshipStep relationship={relationship} setRelationship={setRelationship} />;
      case 2:
        return <AgeStep ageRange={ageRange} setAgeRange={setAgeRange} />;
      case 3:
        return <DurationStep duration={duration} setDuration={setDuration} />;
      case 4:
        return <SignsStep signs={signs} toggleSign={toggleSign} />;
      case 5:
        return <ConcernStep concernLevel={concernLevel} setConcernLevel={setConcernLevel} signs={signs} />;
      case 6:
        return <InterventionStep previousAttempts={previousAttempts} setPreviousAttempts={setPreviousAttempts} willingToTalk={willingToTalk} setWillingToTalk={setWillingToTalk} />;
      case 7:
        return <NotesStep additionalNotes={additionalNotes} setAdditionalNotes={setAdditionalNotes} />;
      default:
        return null;
    }
  };

  if (done) {
    const checkedSigns = signs.filter(s => s.checked);
    const signCount = checkedSigns.length;
    
    // AI-like risk assessment based on multiple factors
    let riskScore = 0;
    riskScore += signCount * 2;
    if (concernLevel >= 70) riskScore += 3;
    if (concernLevel >= 50 && concernLevel < 70) riskScore += 1;
    if (duration === "6-12 months" || duration === "Over a year") riskScore += 2;
    if (duration === "3-6 months") riskScore += 1;
    if (willingToTalk === "Refuses to talk" || willingToTalk === "Becomes defensive") riskScore += 2;
    if (willingToTalk === "Sometimes opens up") riskScore += 0.5;
    if (previousAttempts === "Yes, multiple times" || previousAttempts === "Yes, they refused help") riskScore += 2;
    if (ageRange === "10-13" || ageRange === "14-17") riskScore += 1;
    
    // Normalize risk score to out of 10
    const maxScore = 10 * 2 + 3 + 2 + 2 + 2 + 1; // maximum possible
    const normalizedScore = Math.min(Math.round((riskScore / 20) * 10), 10);
    
    let riskLevel = "low";
    if (riskScore >= 15) riskLevel = "immediate";
    else if (riskScore >= 8) riskLevel = "early";
    
    return <ResultScreen 
      riskLevel={riskLevel} 
      riskScore={normalizedScore}
      checkedSigns={checkedSigns} 
      signCount={signCount}
      concernLevel={concernLevel}
      location={location}
      relationship={relationship}
      ageRange={ageRange}
      duration={duration}
      willingToTalk={willingToTalk}
      previousAttempts={previousAttempts}
      additionalNotes={additionalNotes}
      onReset={reset}
    />;
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-6">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> {t("pulseCheck.back")}
        </Link>
      </div>

      <div className="rounded-2xl border border-border bg-surface p-6 md:p-8">
        {/* Progress */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{t("pulseCheck.step")} {step + 1} {t("pulseCheck.of")} {totalSteps}</span>
          <span>{t("pulseCheck.time")}</span>
        </div>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
          <div className="h-full bg-primary transition-all" style={{ width: `${((step + 1) / totalSteps) * 100}%` }} />
        </div>

        {/* Step Content */}
        <div className="mt-6">
          {renderStep()}
        </div>

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between">
          <button
            onClick={prevStep}
            disabled={step === 0}
            className="inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground disabled:opacity-40 disabled:hover:bg-transparent"
          >
            <ArrowLeft className="h-4 w-4" /> {t("pulseCheck.previous")}
          </button>
          <button
            onClick={reset}
            className="inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <RotateCcw className="h-4 w-4" /> Restart
          </button>
          <button
            onClick={nextStep}
            disabled={!canProceed()}
            className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {step === totalSteps - 1 ? t("pulseCheck.getResults") : t("pulseCheck.next")} <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <p className="mt-4 text-center text-xs text-muted-foreground">{t("pulseCheck.privacy")}</p>
    </div>
  );
}

// STEP 1: Location
function LocationStep({ location, setLocation }: any) {
  const { t } = useI18n();
  return (
    <div>
      <div className="flex items-center gap-3 mb-2">
        <MapPin className="h-6 w-6 text-primary" />
        <h2 className="text-xl font-semibold text-foreground">{t("pulseCheck.location.title")}</h2>
      </div>
      <p className="text-sm text-muted-foreground">{t("pulseCheck.location.subtitle")}</p>
      <div className="mt-6 grid grid-cols-2 gap-3">
        {TSHWANE_LOCATIONS.map((loc) => (
          <button
            key={loc}
            onClick={() => setLocation(loc)}
            className={`rounded-lg border p-4 text-sm font-medium transition-all ${
              location === loc 
                ? 'border-primary bg-primary/10 text-primary' 
                : 'border-border bg-surface-elevated text-muted-foreground hover:border-primary/30'
            }`}
          >
            {loc}
          </button>
        ))}
      </div>
    </div>
  );
}

// STEP 2: Relationship
function RelationshipStep({ relationship, setRelationship }: any) {
  const { t } = useI18n();
  return (
    <div>
      <div className="flex items-center gap-3 mb-2">
        <Users className="h-6 w-6 text-primary" />
        <h2 className="text-xl font-semibold text-foreground">{t("pulseCheck.relationship.title")}</h2>
      </div>
      <p className="text-sm text-muted-foreground">{t("pulseCheck.relationship.subtitle")}</p>
      <div className="mt-6 grid grid-cols-2 gap-3">
        {RELATIONSHIPS.map((rel) => (
          <button
            key={rel}
            onClick={() => setRelationship(rel)}
            className={`rounded-lg border p-4 text-sm font-medium transition-all ${
              relationship === rel 
                ? 'border-primary bg-primary/10 text-primary' 
                : 'border-border bg-surface-elevated text-muted-foreground hover:border-primary/30'
            }`}
          >
            {rel}
          </button>
        ))}
      </div>
    </div>
  );
}

// STEP 3: Age
function AgeStep({ ageRange, setAgeRange }: any) {
  const { t } = useI18n();
  return (
    <div>
      <div className="flex items-center gap-3 mb-2">
        <User className="h-6 w-6 text-primary" />
        <h2 className="text-xl font-semibold text-foreground">{t("pulseCheck.age.title")}</h2>
      </div>
      <p className="text-sm text-muted-foreground">{t("pulseCheck.age.subtitle")}</p>
      <div className="mt-6 grid grid-cols-2 gap-3">
        {AGE_RANGES.map((age) => (
          <button
            key={age}
            onClick={() => setAgeRange(age)}
            className={`rounded-lg border p-4 text-sm font-medium transition-all ${
              ageRange === age 
                ? 'border-primary bg-primary/10 text-primary' 
                : 'border-border bg-surface-elevated text-muted-foreground hover:border-primary/30'
            }`}
          >
            {age}
          </button>
        ))}
      </div>
    </div>
  );
}

// STEP 4: Duration
function DurationStep({ duration, setDuration }: any) {
  const { t } = useI18n();
  return (
    <div>
      <div className="flex items-center gap-3 mb-2">
        <Calendar className="h-6 w-6 text-primary" />
        <h2 className="text-xl font-semibold text-foreground">{t("pulseCheck.duration.title")}</h2>
      </div>
      <p className="text-sm text-muted-foreground">{t("pulseCheck.duration.subtitle")}</p>
      <div className="mt-6 grid grid-cols-2 gap-3">
        {DURATIONS.map((dur) => (
          <button
            key={dur}
            onClick={() => setDuration(dur)}
            className={`rounded-lg border p-4 text-sm font-medium transition-all ${
              duration === dur 
                ? 'border-primary bg-primary/10 text-primary' 
                : 'border-border bg-surface-elevated text-muted-foreground hover:border-primary/30'
            }`}
          >
            {dur}
          </button>
        ))}
      </div>
    </div>
  );
}

// STEP 5: Warning Signs
function SignsStep({ signs, toggleSign }: any) {
  const { t } = useI18n();
  const checkedCount = signs.filter((s: any) => s.checked).length;
  const categories = [...new Set(signs.map((s: any) => s.category))];
  
  return (
    <div>
      <div className="flex items-center gap-3 mb-2">
        <AlertTriangle className="h-6 w-6 text-warning" />
        <h2 className="text-xl font-semibold text-foreground">{t("pulseCheck.signs.title")}</h2>
      </div>
      <p className="text-sm text-muted-foreground">{t("pulseCheck.signs.subtitle")}</p>
      
      <div className="mt-6 space-y-4">
        {categories.map((category) => (
          <div key={category}>
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              {category}
            </div>
            <div className="space-y-2">
              {signs.filter((s: any) => s.category === category).map((sign: any) => {
                const Icon = sign.icon;
                return (
                  <button
                    key={sign.id}
                    onClick={() => toggleSign(sign.id)}
                    className={`w-full flex items-start gap-4 rounded-lg border p-4 text-left transition-all ${
                      sign.checked 
                        ? 'border-primary bg-primary/10' 
                        : 'border-border bg-surface-elevated hover:bg-surface'
                    }`}
                  >
                    <div className={`mt-0.5 rounded-full p-2 ${sign.checked ? 'bg-primary/20 text-primary' : 'bg-secondary text-muted-foreground'}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className={`text-sm font-medium ${sign.checked ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {sign.label}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {sign.description}
                      </div>
                    </div>
                    {sign.checked && <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-1" />}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-center text-sm text-muted-foreground">
        {checkedCount === 0 ? t("pulseCheck.signs.selectAny") : `${checkedCount} ${t("pulseCheck.signs.selected")}`}
      </div>
    </div>
  );
}

// STEP 6: Concern Level
function ConcernStep({ concernLevel, setConcernLevel, signs }: any) {
  const { t } = useI18n();
  const checkedCount = signs.filter((s: any) => s.checked).length;
  
  return (
    <div>
      <div className="flex items-center gap-3 mb-2">
        <Heart className="h-6 w-6 text-red-400" />
        <h2 className="text-xl font-semibold text-foreground">{t("pulseCheck.concern.title")}</h2>
      </div>
      <p className="text-sm text-muted-foreground">{checkedCount} {t("pulseCheck.signs.selected")}</p>
      
      <div className="mt-8">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{t("pulseCheck.concern.mild")}</span>
          <span className="font-semibold text-foreground">{concernLevel}%</span>
          <span>{t("pulseCheck.concern.extreme")}</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={concernLevel}
          onChange={(e) => setConcernLevel(parseInt(e.target.value))}
          className="mt-2 w-full cursor-pointer accent-primary"
        />
        
        <div className="mt-6 rounded-lg border border-border bg-surface-elevated p-4">
          <div className="text-sm text-muted-foreground">
            {concernLevel <= 30 && t("pulseCheck.concern.level1")}
            {concernLevel > 30 && concernLevel <= 60 && t("pulseCheck.concern.level2")}
            {concernLevel > 60 && concernLevel <= 80 && t("pulseCheck.concern.level3")}
            {concernLevel > 80 && t("pulseCheck.concern.level4")}
          </div>
        </div>
      </div>
    </div>
  );
}

// STEP 7: Intervention History
function InterventionStep({ previousAttempts, setPreviousAttempts, willingToTalk, setWillingToTalk }: any) {
  const { t } = useI18n();
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <MessageCircle className="h-6 w-6 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">{t("pulseCheck.intervention.talk.title")}</h2>
        </div>
        <p className="text-sm text-muted-foreground">{t("pulseCheck.intervention.talk.subtitle")}</p>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {[t("pulseCheck.intervention.talk.no"), t("pulseCheck.intervention.talk.once"), t("pulseCheck.intervention.talk.multiple"), t("pulseCheck.intervention.talk.refused")].map((opt) => (
            <button
              key={opt}
              onClick={() => setPreviousAttempts(opt)}
              className={`rounded-lg border p-4 text-sm font-medium transition-all ${
                previousAttempts === opt 
                  ? 'border-primary bg-primary/10 text-primary' 
                  : 'border-border bg-surface-elevated text-muted-foreground hover:border-primary/30'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center gap-3 mb-2">
          <Users className="h-6 w-6 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">{t("pulseCheck.intervention.respond.title")}</h2>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {[t("pulseCheck.intervention.respond.open"), t("pulseCheck.intervention.respond.sometimes"), t("pulseCheck.intervention.respond.defensive"), t("pulseCheck.intervention.respond.refuses")].map((opt) => (
            <button
              key={opt}
              onClick={() => setWillingToTalk(opt)}
              className={`rounded-lg border p-4 text-sm font-medium transition-all ${
                willingToTalk === opt 
                  ? 'border-primary bg-primary/10 text-primary' 
                  : 'border-border bg-surface-elevated text-muted-foreground hover:border-primary/30'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// STEP 8: Additional Notes
function NotesStep({ additionalNotes, setAdditionalNotes }: any) {
  const { t } = useI18n();
  return (
    <div>
      <div className="flex items-center gap-3 mb-2">
        <Info className="h-6 w-6 text-primary" />
        <h2 className="text-xl font-semibold text-foreground">{t("pulseCheck.notes.title")}</h2>
      </div>
      <p className="text-sm text-muted-foreground">{t("pulseCheck.notes.subtitle")}</p>
      
      <div className="mt-4">
        <textarea
          value={additionalNotes}
          onChange={(e) => setAdditionalNotes(e.target.value)}
          placeholder={t("pulseCheck.notes.placeholder")}
          className="min-h-[150px] w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
        />
        <div className="mt-2 text-right text-xs text-muted-foreground">
          {additionalNotes.length} {t("pulseCheck.notes.characters")}
        </div>
      </div>
    </div>
  );
}

// RESULT SCREEN
function ResultScreen({ 
  riskLevel, 
  riskScore,
  checkedSigns, 
  signCount,
  concernLevel,
  location,
  relationship,
  ageRange,
  duration,
  willingToTalk,
  previousAttempts,
  additionalNotes,
  onReset 
}: any) {
  const { t } = useI18n();
  
  const resultData = {
    low: {
      icon: CheckCircle2,
      title: "Low Risk — Stay Aware",
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/15",
      borderColor: "border-emerald-500/30",
      tagline: "Stay aware, stay connected. You're doing the right thing by paying attention.",
      summary: "Based on your answers, there are no strong indicators of substance abuse right now. Continue to stay connected with your child and watch for changes. Early awareness is the best prevention.",
      actions: [
        "Keep checking in with your child — ask how their day was every day.",
        "Spend quality time together without distractions.",
        "Learn the signs so you can spot changes early.",
        "Save these numbers in your phone: SADAG 0800 567 567, SANCA 011 892 3829",
        "Check in again in a few weeks if you're still concerned."
      ]
    },
    early: {
      icon: AlertTriangle,
      title: "Early Warning Signs — Act Now",
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/15",
      borderColor: "border-yellow-500/30",
      tagline: "You've spotted the signs. Now is the time to act — gently but firmly.",
      summary: "The signs you've noticed are worth taking seriously. Acting now — calmly and supportively — can change everything before it gets worse. You're not alone in this.",
      actions: [
        "Find a quiet moment today and ask how they're really doing.",
        "Listen more than you talk. Don't accuse, don't lecture.",
        "Contact one of the support centres near you in Tshwane.",
        "Find a counsellor near you in Tshwane.",
        "Call SADAG on 0800 567 567 for advice on how to approach the conversation.",
        "Check in with other family members who might have noticed the same signs."
      ]
    },
    immediate: {
      icon: ShieldAlert,
      title: "Immediate Support Recommended",
      color: "text-red-400",
      bgColor: "bg-red-500/15",
      borderColor: "border-red-500/30",
      tagline: "Please don't wait. Help is available right now.",
      summary: "The signs you've described are serious. You don't have to handle this alone — trained counsellors in Tshwane are ready to help you right now. Every minute counts.",
      actions: [
        "Call SADAG's 24-hour line now: 0800 567 567.",
        "If they are in physical danger, call 10111 immediately.",
        "Reach out to a trusted family member or friend today for support.",
        "Find the nearest clinic or rehab centre in Tshwane from the list below.",
        "Don't wait for things to get worse. The earlier you intervene, the better the outcome.",
        "You are not alone — help is available. Make the call today."
      ]
    }
  };

  const result = resultData[riskLevel as keyof typeof resultData];
  const Icon = result.icon;

  // Get helping centres for the selected location
  const getHelpingCentres = () => {
    const centres = HELPING_CENTRES[location] || HELPING_CENTRES["Other"];
    return centres;
  };

  const isYouth = ageRange === "10-13" || ageRange === "14-17" || ageRange === "18-21";

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="rounded-2xl border border-border bg-surface p-6 md:p-8">
        {/* Risk Score Circle */}
        <div className="flex items-center gap-6">
          <div className="relative">
            <svg className="h-20 w-20 -rotate-90">
              <circle
                cx="40"
                cy="40"
                r="32"
                className="text-secondary"
                strokeWidth="6"
                stroke="currentColor"
                fill="none"
              />
              <circle
                cx="40"
                cy="40"
                r="32"
                className={`${riskLevel === 'low' ? 'text-emerald-400' : riskLevel === 'early' ? 'text-yellow-400' : 'text-red-400'}`}
                strokeWidth="6"
                strokeDasharray="201"
                strokeDashoffset={201 - (riskScore / 10) * 201}
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl font-bold text-foreground">{riskScore}/10</span>
            </div>
          </div>
          <div>
            <div className={`text-lg font-semibold ${result.color}`}>{result.title}</div>
            <div className="text-sm text-muted-foreground">Risk Score: {riskScore}/10</div>
          </div>
        </div>

        <h1 className="mt-4 text-2xl font-semibold tracking-tight md:text-3xl">{result.tagline}</h1>
        <p className="mt-3 text-muted-foreground">{result.summary}</p>

        {/* Summary Box */}
        <div className="mt-6 rounded-xl border border-border bg-surface-elevated p-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Location</span>
              <div className="font-medium text-foreground">{location}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Relationship</span>
              <div className="font-medium text-foreground">{relationship}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Age</span>
              <div className="font-medium text-foreground">{ageRange}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Duration</span>
              <div className="font-medium text-foreground">{duration}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Warning signs</span>
              <div className="font-medium text-foreground">{signCount} identified</div>
            </div>
            <div>
              <span className="text-muted-foreground">Your concern</span>
              <div className="font-medium text-foreground">{concernLevel}%</div>
            </div>
          </div>
        </div>

        {/* Youth-Specific Alert */}
        {isYouth && riskLevel !== "low" && (
          <div className="mt-4 rounded-xl border border-orange-500/30 bg-orange-500/10 p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-orange-400 shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-semibold text-orange-400">Youth Alert</div>
                <div className="text-sm text-muted-foreground">
                  You're worried about a young person. Early intervention in youth is critical — the brain is still developing, and early help leads to better outcomes. Don't wait.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Helping Centres in Tshwane */}
        <div className="mt-4 rounded-xl border border-primary/20 bg-primary/5 p-4">
          <div className="flex items-center gap-2 text-sm font-medium text-primary">
              <Building className="h-4 w-4" />
              {t("pulseCheck.result.helpCentres")} in {location}
            </div>
          <div className="mt-3 space-y-3">
            {getHelpingCentres().map((centre, index) => (
              <div key={index} className="rounded-lg border border-border bg-surface p-3">
                <div className="font-medium text-foreground text-sm">{centre.name}</div>
                <div className="text-xs text-muted-foreground">{centre.address}</div>
                <div className="text-xs text-primary font-medium">{centre.phone}</div>
                <div className="mt-1 flex flex-wrap gap-1">
                  {centre.services.map((service, i) => (
                    <span key={i} className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] text-primary">
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Warning Signs Selected */}
        {checkedSigns.length > 0 && (
          <div className="mt-4 rounded-xl border border-border bg-surface-elevated p-4">
            <div className="text-sm font-medium text-foreground">{t("pulseCheck.result.signsIdentified")}</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {checkedSigns.map((sign: any) => (
                <span key={sign.id} className="rounded-full bg-destructive/15 px-3 py-1 text-xs text-destructive">
                  {sign.label}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Previous Attempts */}
        {previousAttempts && previousAttempts !== "No, not yet" && (
          <div className="mt-4 rounded-xl border border-border bg-surface-elevated p-4">
            <div className="text-sm text-muted-foreground">
              <span className="font-medium">You've tried before:</span> {previousAttempts}
            </div>
            {willingToTalk && (
              <div className="text-sm text-muted-foreground">
                <span className="font-medium">They are:</span> {willingToTalk}
              </div>
            )}
          </div>
        )}

        {/* Additional Notes */}
        {additionalNotes && (
          <div className="mt-4 rounded-xl border border-border bg-surface-elevated p-4">
            <div className="text-sm font-medium text-foreground">{t("pulseCheck.result.yourNotes")}</div>
            <p className="mt-1 text-sm text-muted-foreground">{additionalNotes}</p>
          </div>
        )}

        {/* Action Plan */}
        <div className="mt-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            {t("pulseCheck.result.actionPlan")}
          </h2>
          <ol className="mt-3 space-y-2.5">
            {result.actions.map((action: string, i: number) => (
              <li
                key={i}
                className="flex gap-3 rounded-lg border border-border bg-surface-elevated px-4 py-3 text-sm text-foreground"
              >
                <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-semibold text-primary">
                  {i + 1}
                </span>
                <span>{action}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Emergency Contacts - Always Visible */}
        <div className="mt-6 rounded-xl border border-urgent/30 bg-urgent/5 p-4">
          <div className="text-sm font-semibold text-urgent">{t("pulseCheck.result.emergencyContacts")}</div>
          <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-muted-foreground">SADAG (24h)</span>
              <div className="font-medium text-foreground">0800 567 567</div>
            </div>
            <div>
              <span className="text-muted-foreground">Emergency</span>
              <div className="font-medium text-foreground">10111</div>
            </div>
            <div>
              <span className="text-muted-foreground">SANCA</span>
              <div className="font-medium text-foreground">011 892 3829</div>
            </div>
            <div>
              <span className="text-muted-foreground">Tshwane Health</span>
              <div className="font-medium text-foreground">012 358 8600</div>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            to="/find-help"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            <MapPin className="h-4 w-4" /> {t("pulseCheck.result.findHelp")}
          </Link>
          <a
            href="tel:0800567567"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-surface-elevated px-4 py-2.5 text-sm font-medium text-foreground hover:bg-secondary"
          >
            <Phone className="h-4 w-4" /> {t("pulseCheck.result.callSADAG")}
          </a>
          <button
            onClick={onReset}
            className="inline-flex items-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            <RotateCcw className="h-4 w-4" /> {t("pulseCheck.result.startOver")}
          </button>
        </div>

        {/* Share/Save Results */}
        <div className="mt-6 border-t border-border pt-6">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{t("pulseCheck.result.disclaimer")}</span>
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1 hover:text-foreground"
            >
              <span>📄</span> Save results
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}