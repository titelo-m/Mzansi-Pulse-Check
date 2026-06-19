import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { SA_LANGUAGES, type LangCode } from "@/lib/languages";

type Dict = Record<string, string>;

// Core UI strings translated across all 11 SA official languages.
// Long-form content (stories, articles) remains in English; UI chrome and hero translate.
const TRANSLATIONS: Record<LangCode, Dict> = {
  en: {
    "nav.pulseCheck": "Pulse Check",
    "nav.findHelp": "Find Help",
    "nav.stories": "Stories",
    "nav.learn": "Learn the Signs",
    "nav.pulseAI": "Pulse AI",
    "hero.tagline": "Anonymous • Free • 11 SA languages",
    "hero.title1": "Hear the signs",
    "hero.title2": "before the crisis.",
    "hero.subtitle":
      "MzansiPulse helps families, teachers and friends recognise early warning signs of substance abuse — and take supportive action before things escalate.",
    "hero.cta1": "I'm worried about someone",
    "hero.cta2": "Find help near me",
    "hero.ai": "Chat with Pulse AI",
    "footer.crisis": "In a crisis right now?",
    "footer.tagline":
      "Hearing the signs before the crisis. Anonymous, multilingual, community-driven support for South African families.",
    "footer.notMedical": "Not a medical service.",
    "lang.label": "Choose language",
    "common.start": "Start a Pulse Check",
    "common.open": "Open",
  },
  zu: {
    "nav.pulseCheck": "Hlola iPulse",
    "nav.findHelp": "Thola Usizo",
    "nav.stories": "Izindaba",
    "nav.learn": "Funda Izimpawu",
    "nav.pulseAI": "I-Pulse AI",
    "hero.tagline": "Akudingi gama • Mahhala • Izilimi ezi-11",
    "hero.title1": "Yizwa izimpawu",
    "hero.title2": "ngaphambi kwenkinga.",
    "hero.subtitle":
      "I-MzansiPulse isiza imindeni, othisha nabangani ukubona izimpawu zokuqala zokusebenzisa kabi izidakamizwa — futhi bathathe isinyathelo ngaphambi kokuthi izinto zibe zimbi.",
    "hero.cta1": "Ngikhathazekile ngomuntu",
    "hero.cta2": "Thola usizo eduze",
    "hero.ai": "Xoxa ne-Pulse AI",
    "footer.crisis": "Usenkingeni manje?",
    "footer.tagline":
      "Sizwa izimpawu ngaphambi kwenkinga. Akudingi gama, izilimi eziningi, usizo lomphakathi.",
    "footer.notMedical": "Akuyona inkonzo yezokwelapha.",
    "lang.label": "Khetha ulimi",
    "common.start": "Qala uHlolo lwePulse",
    "common.open": "Vula",
  },
  xh: {
    "nav.pulseCheck": "Khangela iPulse",
    "nav.findHelp": "Fumana Uncedo",
    "nav.stories": "Amabali",
    "nav.learn": "Funda Iimpawu",
    "nav.pulseAI": "I-Pulse AI",
    "hero.tagline": "Ngaphandle kwegama • Simahla • Iilwimi ezili-11",
    "hero.title1": "Yiva iimpawu",
    "hero.title2": "phambi kwengxaki.",
    "hero.subtitle":
      "I-MzansiPulse inceda iintsapho, ootitshala kunye nabahlobo babone iimpawu zokuqala zokusebenzisa kakubi iziyobisi.",
    "hero.cta1": "Ndixhalabile ngomntu",
    "hero.cta2": "Fumana uncedo kufuphi",
    "hero.ai": "Ncokola ne-Pulse AI",
    "footer.crisis": "Usengxakini ngoku?",
    "footer.tagline":
      "Siva iimpawu phambi kwengxaki. Inkxaso yoluntu, iilwimi ezininzi.",
    "footer.notMedical": "Ayiyonkonzo yonyango.",
    "lang.label": "Khetha ulwimi",
    "common.start": "Qala uKhangelo lwePulse",
    "common.open": "Vula",
  },
  af: {
    "nav.pulseCheck": "Pols-toets",
    "nav.findHelp": "Vind Hulp",
    "nav.stories": "Stories",
    "nav.learn": "Leer die Tekens",
    "nav.pulseAI": "Pulse KI",
    "hero.tagline": "Anoniem • Gratis • 11 SA tale",
    "hero.title1": "Hoor die tekens",
    "hero.title2": "voor die krisis.",
    "hero.subtitle":
      "MzansiPulse help families, onderwysers en vriende om vroeë tekens van dwelmmisbruik te herken — en op te tree voordat dinge erger word.",
    "hero.cta1": "Ek is bekommerd oor iemand",
    "hero.cta2": "Vind hulp naby my",
    "hero.ai": "Gesels met Pulse KI",
    "footer.crisis": "In 'n krisis nou?",
    "footer.tagline":
      "Hoor die tekens voor die krisis. Anoniem, veeltalig, gemeenskapsgedrewe.",
    "footer.notMedical": "Nie 'n mediese diens nie.",
    "lang.label": "Kies taal",
    "common.start": "Begin 'n Pols-toets",
    "common.open": "Maak oop",
  },
  st: {
    "nav.pulseCheck": "Tlhahlobo ya Pulse",
    "nav.findHelp": "Fumana Thuso",
    "nav.stories": "Dipale",
    "nav.learn": "Ithute Matshwao",
    "nav.pulseAI": "Pulse AI",
    "hero.tagline": "Ka sephiri • Mahala • Dipuo tse 11",
    "hero.title1": "Utlwa matshwao",
    "hero.title2": "pele ho tsietsi.",
    "hero.subtitle":
      "MzansiPulse e thusa malapa, matichere le metswalle ho lemoha matshwao a pele a tshebediso e mpe ya dithethefatsi.",
    "hero.cta1": "Ke tshwenyehile ka motho",
    "hero.cta2": "Fumana thuso haufi",
    "hero.ai": "Buisana le Pulse AI",
    "footer.crisis": "O tsietsing hona jwale?",
    "footer.tagline":
      "Utlwa matshwao pele ho tsietsi. Ka sephiri, dipuo tse ngata.",
    "footer.notMedical": "Hase tshebeletso ya bongaka.",
    "lang.label": "Kgetha puo",
    "common.start": "Qala Tlhahlobo",
    "common.open": "Bula",
  },
  tn: {
    "nav.pulseCheck": "Tlhatlhobo ya Pulse",
    "nav.findHelp": "Bona Thuso",
    "nav.stories": "Dipolelo",
    "nav.learn": "Ithute Matshwao",
    "nav.pulseAI": "Pulse AI",
    "hero.tagline": "Ka sephiri • Mahala • Dipuo tse 11",
    "hero.title1": "Utlwa matshwao",
    "hero.title2": "pele ga mathata.",
    "hero.subtitle":
      "MzansiPulse e thusa malwapa le ditsala go lemoga matshwao a ntlha a tirisobotlhaswa ya diokobatsi.",
    "hero.cta1": "Ke tshwenyegile ka mongwe",
    "hero.cta2": "Bona thuso gaufi",
    "hero.ai": "Bua le Pulse AI",
    "footer.crisis": "O mo mathateng jaanong?",
    "footer.tagline": "Utlwa matshwao pele ga mathata.",
    "footer.notMedical": "Ga se tirelo ya bongaka.",
    "lang.label": "Tlhopha puo",
    "common.start": "Simolola Tlhatlhobo",
    "common.open": "Bula",
  },
  ts: {
    "nav.pulseCheck": "Kambela Pulse",
    "nav.findHelp": "Kuma Mpfuno",
    "nav.stories": "Mintsheketo",
    "nav.learn": "Dyondza Swikombiso",
    "nav.pulseAI": "Pulse AI",
    "hero.tagline": "Hi xihundla • Mahala • Tindzimi ta 11",
    "hero.title1": "Twa swikombiso",
    "hero.title2": "emahlweni ka khombo.",
    "hero.subtitle":
      "MzansiPulse yi pfuna mindyangu na vatirhi va swikolo ku vona swikombiso swo sungula swa ku tirhisiwa ka swidzidziharisi.",
    "hero.cta1": "Ndzi karhateka hi munhu",
    "hero.cta2": "Kuma mpfuno ekusuhi",
    "hero.ai": "Vulavula na Pulse AI",
    "footer.crisis": "U le khombyeni sweswi?",
    "footer.tagline": "Twa swikombiso emahlweni ka khombo.",
    "footer.notMedical": "A hi ntirho wa vutshunguri.",
    "lang.label": "Hlawula ririmi",
    "common.start": "Sungula Kukambela",
    "common.open": "Pfula",
  },
  ss: {
    "nav.pulseCheck": "Hlola iPulse",
    "nav.findHelp": "Thola Lusito",
    "nav.stories": "Tindzaba",
    "nav.learn": "Fundza Timphawu",
    "nav.pulseAI": "Pulse AI",
    "hero.tagline": "Ngephasi • Mahhala • Tilwimi letili-11",
    "hero.title1": "Viva timphawu",
    "hero.title2": "ngembi kwenkinga.",
    "hero.subtitle":
      "MzansiPulse usita imindeni, bothishela nebangani kubona timphawu tekucala tekusebentisa kabi tidzakamiti.",
    "hero.cta1": "Ngikhatsatekile ngemuntfu",
    "hero.cta2": "Thola lusito edvute",
    "hero.ai": "Khuluma ne-Pulse AI",
    "footer.crisis": "Usenkingeni nyalo?",
    "footer.tagline": "Viva timphawu ngembi kwenkinga.",
    "footer.notMedical": "Akusiyo inkonzo yetekwelapha.",
    "lang.label": "Khetsa lulwimi",
    "common.start": "Cala Kuhlola",
    "common.open": "Vula",
  },
  ve: {
    "nav.pulseCheck": "Ṱola Pulse",
    "nav.findHelp": "Wana Thuso",
    "nav.stories": "Zwiitea",
    "nav.learn": "Guda Zwisumbedzo",
    "nav.pulseAI": "Pulse AI",
    "hero.tagline": "Nga vhukati • Mahala • Nyambo dza 11",
    "hero.title1": "Pfa zwisumbedzo",
    "hero.title2": "phanḓa ha khombo.",
    "hero.subtitle":
      "MzansiPulse i thusa miṱa na vhadededzi u ṱhogomela zwisumbedzo zwa u thoma zwa u shumisa zwidzidzivhadzi.",
    "hero.cta1": "Ndi vhilaedza nga muthu",
    "hero.cta2": "Wana thuso tsini",
    "hero.ai": "Amba na Pulse AI",
    "footer.crisis": "Ni khomboni zwino?",
    "footer.tagline": "Pfa zwisumbedzo phanḓa ha khombo.",
    "footer.notMedical": "A si tshumelo ya vhulafhi.",
    "lang.label": "Khetha luambo",
    "common.start": "Thoma u Ṱola",
    "common.open": "Vula",
  },
  nr: {
    "nav.pulseCheck": "Hlola iPulse",
    "nav.findHelp": "Fumana Isizo",
    "nav.stories": "Iindaba",
    "nav.learn": "Funda Imitlhala",
    "nav.pulseAI": "Pulse AI",
    "hero.tagline": "Ngokuyihlobo • Simahla • Iinlimi ezili-11",
    "hero.title1": "Zwa imitlhala",
    "hero.title2": "ngaphambi kwetjhuguluko.",
    "hero.subtitle":
      "MzansiPulse usiza imindeni, abotitjhere nabangani babone imitlhala yokuthoma yokusetjenziswa kombi kweendakamizwa.",
    "hero.cta1": "Ngitshwenyekile ngomuntu",
    "hero.cta2": "Fumana isizo eduze",
    "hero.ai": "Khuluma ne-Pulse AI",
    "footer.crisis": "Ubujamweni manje?",
    "footer.tagline": "Zwa imitlhala ngaphambi kwetjhuguluko.",
    "footer.notMedical": "Akusiyo ikonzo yokwelapha.",
    "lang.label": "Khetha ilimi",
    "common.start": "Thoma Ihlolo",
    "common.open": "Vula",
  },
  nso: {
    "nav.pulseCheck": "Hlahloba Pulse",
    "nav.findHelp": "Hwetša Thušo",
    "nav.stories": "Dikanegelo",
    "nav.learn": "Ithute Maswao",
    "nav.pulseAI": "Pulse AI",
    "hero.tagline": "Ka sephiring • Mahala • Maleme a 11",
    "hero.title1": "Kwa maswao",
    "hero.title2": "pele ga mathata.",
    "hero.subtitle":
      "MzansiPulse e thuša malapa, baithuti le bagwera go lemoga maswao a mathomo a tšhomišo ye mpe ya diokobatši.",
    "hero.cta1": "Ke tshwenyegile ka motho",
    "hero.cta2": "Hwetša thušo kgauswi",
    "hero.ai": "Boledišana le Pulse AI",
    "footer.crisis": "O mathateng bjale?",
    "footer.tagline": "Kwa maswao pele ga mathata.",
    "footer.notMedical": "Ga se tirelo ya kalafo.",
    "lang.label": "Kgetha leleme",
    "common.start": "Thoma Tlhahlobo",
    "common.open": "Bula",
  },
};

type I18nContextValue = {
  lang: LangCode;
  setLang: (l: LangCode) => void;
  t: (key: string) => string;
  languages: typeof SA_LANGUAGES;
};

const I18nContext = createContext<I18nContextValue | null>(null);
const STORAGE_KEY = "mzansipulse.lang";

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LangCode>("en");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as LangCode | null;
      if (stored && TRANSLATIONS[stored]) setLangState(stored);
    } catch {}
  }, []);

  const setLang = (l: LangCode) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {}
    if (typeof document !== "undefined") {
      document.documentElement.lang = l;
    }
  };

  const t = (key: string) =>
    TRANSLATIONS[lang]?.[key] ?? TRANSLATIONS.en[key] ?? key;

  return (
    <I18nContext.Provider value={{ lang, setLang, t, languages: SA_LANGUAGES }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
