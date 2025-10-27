import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Check,
  ChevronLeft,
  CircleHelp,
  Shield,
  Sparkles,
} from "lucide-react";

const brand = {
  bg: "bg-[#0b0f12]",
  panel: "bg-[#11181f]",
  ring: "ring-1 ring-white/10",
  text: "text-zinc-200",
  accent: "#10A37F",
};

const GOALS = [
  "Szybki start / podstawy",
  "Automatyzacje w pracy",
  "Rozwój kariery / awans",
  "Własny projekt / biznes",
  "Kreatywność / portfolio",
  "Inne",
];

const LEVELS = [
  "Startuję od zera",
  "Umiem podstawy",
  "Średniozaawansowany/a",
  "Zaawansowany/a",
];

const AREAS = [
  { id: "marketing", label: "Marketing i content" },
  { id: "automation", label: "Kodowanie i automatyzacje" },
  { id: "business", label: "Biznes i produktywność" },
  { id: "creative", label: "Kreatywne zastosowania" },
  { id: "data", label: "Analiza danych / research" },
  { id: "edu", label: "Edukacja / uczenie innych" },
];

const TOOLS = [
  "ChatGPT / Claude / Gemini",
  "Notion / Obsidian",
  "Zapier / Make",
  "Midjourney / Firefly",
  "GitHub Copilot / VS Code",
  "Excel/Sheets + AI",
  "Inne",
];

const ROLES = [
  "Specjalista/ka",
  "Senior",
  "Lead",
  "Manager",
  "Dyrektor/ka",
  "Właściciel/ka",
  "Freelancer",
  "Student/ka",
  "Inne",
];

const SENIORITY = [
  "Junior",
  "Mid",
  "Senior",
  "Lead",
  "Head/Director",
  "C‑level",
];

const INDUSTRIES = [
  "Marketing/Media",
  "IT/Software",
  "E‑commerce",
  "Finanse",
  "Edukacja",
  "HR/People",
  "Sprzedaż",
  "Design/Kreatywne",
  "Administracja",
  "Zdrowie/Med",
  "Produkcja",
  "Inne",
];

const COMPANY_SIZE = ["Solo", "2–10", "11–50", "51–200", "201–500", "501–1000", "1000+"];
const EMPLOYMENT = [
  "Na etacie",
  "B2B",
  "Freelance",
  "Właściciel/ka firmy",
  "Student/ka",
];
const AGE_RANGES = ["<18", "18–24", "25–34", "35–44", "45–54", "55+", "Wolę nie podawać"];
const LANG_PREF = ["Polski", "Angielski", "Oba"];

const USE_CASES = [
  { id: "content", label: "Tworzenie treści / social" },
  { id: "ads", label: "Reklamy / kampanie" },
  { id: "sales", label: "Sprzedaż / prospecting" },
  { id: "support", label: "Obsługa klienta / FAQ" },
  { id: "automation", label: "Automatyzacje procesów" },
  { id: "analysis", label: "Analiza danych / raporty" },
  { id: "research", label: "Research / analizy rynkowe" },
  { id: "coding", label: "Kodowanie / Copilot" },
  { id: "design", label: "Grafika / wideo / audio" },
  { id: "edu", label: "Edukacja / szkolenia" },
];

const TIME_PER_WEEK = ["<1h", "1–2h", "3–5h", "6–10h", "10h+"];
const DECISION_ROLE = [
  "Decydent/ka",
  "Współdecyduję",
  "Rekomenduję, ale nie decyduję",
  "Używam, ale nie decyduję",
];
const PURCHASE_INTENT = [
  "Natychmiast (0–2 tyg.)",
  "W tym kwartale",
  "W tym roku",
  "Tylko się rozglądam",
];
const BUDGET = [
  "0–199 zł",
  "200–499 zł",
  "500–999 zł",
  "1000–1999 zł",
  "2000+ zł",
  "Jeszcze nie wiem",
];

const COURSES = [
  { id: "mkt-1", title: "AI w marketingu: od researchu do treści", tag: "marketing" },
  { id: "mkt-2", title: "Strategie contentowe z AI", tag: "marketing" },
  { id: "aut-1", title: "Automatyzacje z Zapier/Make + LLM", tag: "automation" },
  { id: "dev-1", title: "GitHub Copilot w praktyce", tag: "automation" },
  { id: "biz-1", title: "AI dla produktywności i decyzji", tag: "business" },
  { id: "crt-1", title: "Generatywna grafika (Midjourney)", tag: "creative" },
  { id: "dat-1", title: "Analiza danych z ChatGPT i Sheets", tag: "data" },
  { id: "edu-1", title: "AI w edukacji: scenariusze i feedback", tag: "edu" },
];

function StepHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2" style={{ color: "var(--accent)" }}>
        <Sparkles size={18} />
        <span className="text-sm">Dopasujemy ścieżkę do Ciebie</span>
      </div>
      <h2 className="mt-2 text-2xl font-semibold text-white/95 md:text-3xl">{title}</h2>
      {description && <p className="mt-1 text-sm text-zinc-400">{description}</p>}
    </div>
  );
}

function Chip({
  selected,
  children,
  onClick,
}: {
  selected?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-2xl border px-3 py-2 text-sm transition",
        selected
          ? "border-[color:var(--accent)]/50 bg-[color:var(--accent)]/20 text-white"
          : "border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10"
      )}
    >
      {children}
    </button>
  );
}

function CourseCard({ title, picked, onToggle }: { title: string; picked: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        "group flex w-full cursor-pointer flex-col gap-2 rounded-2xl border p-4 text-left transition",
        picked
          ? "border-[color:var(--accent)]/60 bg-[color:var(--accent)]/10"
          : "border-white/10 bg-white/5 hover:bg-white/10"
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <h4 className="font-medium text-white/95">{title}</h4>
          <p className="mt-1 text-xs text-zinc-400">
            Kliknij, aby {picked ? "odznaczyć" : "zaznaczyć"}.
          </p>
        </div>
        <div
          className={cn(
            "flex h-6 w-6 items-center justify-center rounded-full border transition",
            picked ? "border-[color:var(--accent)] bg-[color:var(--accent)]/30" : "border-white/15"
          )}
        >
          {picked ? <Check size={16} className="text-white" /> : <div className="h-2 w-2 rounded-full bg-white/20" />}
        </div>
      </div>
    </button>
  );
}

function toggleArrayValue<T>(arr: T[], value: T, limit?: number) {
  const exists = arr.includes(value);
  if (exists) return arr.filter((v) => v !== value);
  const next = [...arr, value];
  if (limit && next.length > limit) next.shift();
  return next;
}

export default function SurveyOpenAIStyle() {
  useEffect(() => {
    document.documentElement.style.setProperty("--accent", brand.accent);
  }, []);

  const [step, setStep] = useState(0);
  const totalSteps = 7;

  const [goal, setGoal] = useState<string | null>(null);
  const [level, setLevel] = useState<string | null>(null);
  const [areas, setAreas] = useState<string[]>([]);
  const [tools, setTools] = useState<string[]>([]);
  const [pickedCourses, setPickedCourses] = useState<string[]>([]);
  const [why, setWhy] = useState("");
  const [emailOptIn, setEmailOptIn] = useState(false);
  const [email, setEmail] = useState("");
  const [extraGoal, setExtraGoal] = useState("");

  const [role, setRole] = useState<string | null>(null);
  const [seniority, setSeniority] = useState<string | null>(null);
  const [industry, setIndustry] = useState<string | null>(null);
  const [companySize, setCompanySize] = useState<string | null>(null);
  const [employment, setEmployment] = useState<string | null>(null);

  const [ageRange, setAgeRange] = useState<string | null>(null);
  const [country, setCountry] = useState("");
  const [langPref, setLangPref] = useState<string | null>("Polski");

  const [useCases, setUseCases] = useState<string[]>([]);
  const [timePerWeek, setTimePerWeek] = useState<string | null>(null);
  const [decisionRole, setDecisionRole] = useState<string | null>(null);
  const [purchaseIntent, setPurchaseIntent] = useState<string | null>(null);
  const [budget, setBudget] = useState<string | null>(null);

  const progress = Math.round(((step + 1) / totalSteps) * 100);

  const filteredCourses = useMemo(() => {
    if (!areas.length) return COURSES.slice(0, 6);
    const tags = new Set(areas);
    const filtered = COURSES.filter((c) => tags.has(c.tag));
    return filtered.length ? filtered : COURSES.slice(0, 6);
  }, [areas]);

  const canNext = useMemo(() => {
    if (step === 0) return Boolean(goal && level);
    if (step === 1) return areas.length > 0 || tools.length > 0;
    if (step === 2) return Boolean(role && seniority && industry);
    if (step === 3) return true;
    if (step === 4) return Boolean(useCases.length > 0 && timePerWeek && decisionRole);
    if (step === 5) return pickedCourses.length > 0 || why.length > 0;
    if (step === 6) return true;
    return true;
  }, [step, goal, level, areas, tools, role, seniority, industry, useCases, timePerWeek, decisionRole, pickedCourses, why]);

  function next() {
    if (step < totalSteps - 1) setStep((s) => s + 1);
    else setStep(totalSteps);
  }

  function back() {
    if (step > 0) setStep((s) => s - 1);
  }

  const recommendations = useMemo(() => {
    const recs: Array<{ title: string; blurb: string }> = [];
    if (goal?.includes("Automatyzacje") || areas.includes("automation") || useCases.includes("automation")) {
      recs.push({
        title: "Ścieżka: Automatyzacje + LLM",
        blurb: "Zapier/Make, gotowe przepływy i prompt‑packi do zadań.",
      });
    }
    if (areas.includes("marketing") || useCases.includes("content") || useCases.includes("ads")) {
      recs.push({
        title: "AI w marketingu od podstaw",
        blurb: "Research, content, kampanie 10× szybciej.",
      });
    }
    if (areas.includes("data") || useCases.includes("analysis")) {
      recs.push({
        title: "Analiza danych z LLM",
        blurb: "Sheets + ChatGPT: od czyszczenia do insightów.",
      });
    }
    if (areas.includes("creative") || useCases.includes("design")) {
      recs.push({
        title: "Generatywna grafika i wideo",
        blurb: "Midjourney/Firefly: workflow i jakość.",
      });
    }
    if (areas.includes("edu") || useCases.includes("edu")) {
      recs.push({
        title: "AI w edukacji",
        blurb: "Scenariusze, karty pracy, feedback.",
      });
    }
    if (areas.includes("business")) {
      recs.push({
        title: "AI dla produktywności",
        blurb: "Priorytety, asystenci i sprint 7‑dniowy.",
      });
    }
    return (
      recs.length
        ? recs
        : [
            { title: "Start z AI w praktyce", blurb: "Fundamenty i szybkie efekty w 7 dni." },
            { title: "Mini‑plan: 3 zadania tyg.", blurb: "30–45 min/tydzień, konkretne kroki." },
            { title: "Checklisty i szablony", blurb: "Gotowe prompt‑packi i listy kontroli." },
          ]
    ).slice(0, 3);
  }, [goal, areas, useCases]);

  function resetAll() {
    setStep(0);
    setGoal(null);
    setLevel(null);
    setAreas([]);
    setTools([]);
    setPickedCourses([]);
    setWhy("");
    setEmailOptIn(false);
    setEmail("");
    setExtraGoal("");
    setRole(null);
    setSeniority(null);
    setIndustry(null);
    setCompanySize(null);
    setEmployment(null);
    setAgeRange(null);
    setCountry("");
    setLangPref("Polski");
    setUseCases([]);
    setTimePerWeek(null);
    setDecisionRole(null);
    setPurchaseIntent(null);
    setBudget(null);
  }

  return (
    <div className={cn("min-h-screen w-full", brand.bg, brand.text)}>
      <div className="mx-auto max-w-3xl px-4 py-6 md:py-10">
        <div className="mb-6 flex items-center justify-between md:mb-10">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl" style={{ background: brand.accent }} />
            <div>
              <p className="text-sm tracking-wide text-zinc-400">Personalizacja kursów</p>
              <h1 className="text-xl font-semibold text-white/95 md:text-2xl">Ankieta (≈4–5 min)</h1>
            </div>
          </div>
          <div className="hidden items-center gap-2 text-sm text-zinc-400 md:flex">
            <Shield size={16} />
            <span>Prywatność: tylko do dopasowania treści</span>
          </div>
        </div>

        <Card className={cn("mb-6 border-0", brand.panel, brand.ring)}>
          <CardContent className="pt-6">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm text-zinc-400">Postęp</span>
              <span className="text-sm text-zinc-300">
                {step < totalSteps ? `${Math.min(progress, 100)}%` : "100%"}
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full"
                style={{ width: `${step < totalSteps ? Math.min(progress, 100) : 100}%`, background: brand.accent }}
              />
            </div>
          </CardContent>
        </Card>

        <Card className={cn("border-0", brand.panel, brand.ring)}>
          <CardHeader>
            <CardTitle className="text-white/95">Pomóż nam dopasować plan do Ciebie</CardTitle>
            <CardDescription className="text-zinc-400">Możesz pominąć dowolne pytanie.</CardDescription>
          </CardHeader>

          <CardContent>
            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div
                  key="e1"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                >
                  <StepHeader
                    title="Cel i poziom"
                    description="Na czym zależy Ci najbardziej i z jakiego poziomu startujemy?"
                  />
                  <div className="space-y-6">
                    <div>
                      <p className="mb-3 text-sm text-zinc-300">Twój główny cel (najbliższy kwartał)</p>
                      <div className="flex flex-wrap gap-2">
                        {GOALS.map((g) => (
                          <Chip key={g} selected={goal === g} onClick={() => setGoal(g)}>
                            {g}
                          </Chip>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="mb-3 text-sm text-zinc-300">Poziom startowy</p>
                      <div className="flex flex-wrap gap-2">
                        {LEVELS.map((lv) => (
                          <Chip key={lv} selected={level === lv} onClick={() => setLevel(lv)}>
                            {lv}
                          </Chip>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 1 && (
                <motion.div
                  key="e2"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                >
                  <StepHeader title="Tematy i narzędzia" description="Wybierz do 3 obszarów i dowolne narzędzia." />
                  <div className="space-y-6">
                    <div>
                      <div className="mb-3 flex items-center gap-2">
                        <p className="text-sm text-zinc-300">Obszary (≤3)</p>
                        <Badge className="border-white/10 bg-white/10 text-zinc-300">opcjonalne</Badge>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {AREAS.map((a) => (
                          <Chip
                            key={a.id}
                            selected={areas.includes(a.id)}
                            onClick={() => setAreas((arr) => toggleArrayValue(arr, a.id, 3))}
                          >
                            {a.label}
                          </Chip>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="mb-3 text-sm text-zinc-300">Narzędzia (dowolna liczba)</p>
                      <div className="flex flex-wrap gap-2">
                        {TOOLS.map((t) => (
                          <Chip key={t} selected={tools.includes(t)} onClick={() => setTools((arr) => toggleArrayValue(arr, t))}>
                            {t}
                          </Chip>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="e3"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                >
                  <StepHeader title="Profil zawodowy" description="Ułatwi to dopasowanie case'ów i ćwiczeń." />
                  <div className="space-y-6">
                    <div>
                      <p className="mb-2 text-sm text-zinc-300">Rola / stanowisko</p>
                      <div className="flex flex-wrap gap-2">
                        {ROLES.map((r) => (
                          <Chip key={r} selected={role === r} onClick={() => setRole(r)}>
                            {r}
                          </Chip>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="mb-2 text-sm text-zinc-300">Seniority</p>
                      <div className="flex flex-wrap gap-2">
                        {SENIORITY.map((s) => (
                          <Chip key={s} selected={seniority === s} onClick={() => setSeniority(s)}>
                            {s}
                          </Chip>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="mb-2 text-sm text-zinc-300">Branża / specjalizacja</p>
                      <div className="flex flex-wrap gap-2">
                        {INDUSTRIES.map((i) => (
                          <Chip key={i} selected={industry === i} onClick={() => setIndustry(i)}>
                            {i}
                          </Chip>
                        ))}
                      </div>
                    </div>
                    <div className="grid gap-3 md:grid-cols-2">
                      <div>
                        <p className="mb-2 text-sm text-zinc-300">Wielkość firmy</p>
                        <div className="flex flex-wrap gap-2">
                          {COMPANY_SIZE.map((c) => (
                            <Chip key={c} selected={companySize === c} onClick={() => setCompanySize(c)}>
                              {c}
                            </Chip>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="mb-2 text-sm text-zinc-300">Forma zatrudnienia</p>
                        <div className="flex flex-wrap gap-2">
                          {EMPLOYMENT.map((e) => (
                            <Chip key={e} selected={employment === e} onClick={() => setEmployment(e)}>
                              {e}
                            </Chip>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="e4"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                >
                  <StepHeader
                    title="Kilka informacji o Tobie"
                    description="Pytania opcjonalne — pomagają nam dobrać tempo i przykłady."
                  />
                  <div className="space-y-6">
                    <div className="grid gap-3 md:grid-cols-3">
                      <div>
                        <p className="mb-2 text-sm text-zinc-300">Wiek (opcjonalnie)</p>
                        <div className="flex flex-wrap gap-2">
                          {AGE_RANGES.map((a) => (
                            <Chip key={a} selected={ageRange === a} onClick={() => setAgeRange(a)}>
                              {a}
                            </Chip>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="mb-2 text-sm text-zinc-300">Kraj/region (opcjonalnie)</p>
                        <Input
                          value={country}
                          onChange={(event) => setCountry(event.target.value)}
                          placeholder="np. Polska"
                          className="bg-white/5 text-zinc-200 placeholder:text-zinc-500"
                        />
                      </div>
                      <div>
                        <p className="mb-2 text-sm text-zinc-300">Język kursu</p>
                        <div className="flex flex-wrap gap-2">
                          {LANG_PREF.map((l) => (
                            <Chip key={l} selected={langPref === l} onClick={() => setLangPref(l)}>
                              {l}
                            </Chip>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div
                  key="e5"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                >
                  <StepHeader
                    title="Zastosowania i kontekst"
                    description="Jak chcesz wykorzystywać AI i jaki masz kontekst decyzyjny?"
                  />
                  <div className="space-y-6">
                    <div>
                      <p className="mb-2 text-sm text-zinc-300">Główne zastosowania (≤3)</p>
                      <div className="flex flex-wrap gap-2">
                        {USE_CASES.map((u) => (
                          <Chip
                            key={u.id}
                            selected={useCases.includes(u.id)}
                            onClick={() => setUseCases((arr) => toggleArrayValue(arr, u.id, 3))}
                          >
                            {u.label}
                          </Chip>
                        ))}
                      </div>
                    </div>
                    <div className="grid gap-3 md:grid-cols-2">
                      <div>
                        <p className="mb-2 text-sm text-zinc-300">Czas na naukę tygodniowo</p>
                        <div className="flex flex-wrap gap-2">
                          {TIME_PER_WEEK.map((t) => (
                            <Chip key={t} selected={timePerWeek === t} onClick={() => setTimePerWeek(t)}>
                              {t}
                            </Chip>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="mb-2 text-sm text-zinc-300">Twoja rola w decyzji zakupowej</p>
                        <div className="flex flex-wrap gap-2">
                          {DECISION_ROLE.map((d) => (
                            <Chip key={d} selected={decisionRole === d} onClick={() => setDecisionRole(d)}>
                              {d}
                            </Chip>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="grid gap-3 md:grid-cols-2">
                      <div>
                        <p className="mb-2 text-sm text-zinc-300">Intencja zakupu</p>
                        <div className="flex flex-wrap gap-2">
                          {PURCHASE_INTENT.map((p) => (
                            <Chip key={p} selected={purchaseIntent === p} onClick={() => setPurchaseIntent(p)}>
                              {p}
                            </Chip>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="mb-2 text-sm text-zinc-300">Budżet (na osobę/firmę)</p>
                        <div className="flex flex-wrap gap-2">
                          {BUDGET.map((b) => (
                            <Chip key={b} selected={budget === b} onClick={() => setBudget(b)}>
                              {b}
                            </Chip>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 5 && (
                <motion.div
                  key="e6"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                >
                  <StepHeader
                    title="Które kursy Cię przyciągają?"
                    description="Pokazujemy propozycje dopasowane do poprzednich odpowiedzi."
                  />
                  <div className="grid gap-3 md:grid-cols-2">
                    {filteredCourses.map((c) => (
                      <CourseCard
                        key={c.id}
                        title={c.title}
                        picked={pickedCourses.includes(c.id)}
                        onToggle={() =>
                          setPickedCourses((arr) =>
                            arr.includes(c.id) ? arr.filter((x) => x !== c.id) : [...arr, c.id]
                          )
                        }
                      />
                    ))}
                  </div>
                  <div className="mt-6">
                    <p className="mb-2 text-sm text-zinc-300">
                      Co Cię w nich przekonuje? <span className="text-zinc-500">(opcjonalne)</span>
                    </p>
                    <Textarea
                      value={why}
                      onChange={(event) => setWhy(event.target.value)}
                      placeholder="Np. praktyczne case'y, krótkie lekcje, portfolio..."
                      className="bg-white/5 text-zinc-200 placeholder:text-zinc-500"
                    />
                  </div>
                </motion.div>
              )}

              {step === 6 && (
                <motion.div
                  key="e7"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                >
                  <StepHeader
                    title="Ostatni krok"
                    description="(opcjonalnie) doprecyzuj cel i zostaw e‑mail, by dostać spersonalizowany plan."
                  />
                  <div className="space-y-6">
                    <div>
                      <p className="mb-2 text-sm text-zinc-300">Doprecyzuj cel (1–2 zdania)</p>
                      <Textarea
                        value={extraGoal}
                        onChange={(event) => setExtraGoal(event.target.value)}
                        placeholder="Chcę zautomatyzować raporty i usprawnić proces publikacji treści..."
                        className="bg-white/5 text-zinc-200 placeholder:text-zinc-500"
                      />
                    </div>
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="optin"
                        checked={emailOptIn}
                        onChange={(event) => setEmailOptIn(event.target.checked)}
                      />
                      <label htmlFor="optin" className="cursor-pointer text-sm text-zinc-300">
                        Chcę otrzymać plan i rekomendacje na e‑mail.
                      </label>
                    </div>
                    {emailOptIn && (
                      <div className="grid gap-3 md:grid-cols-2">
                        <Input
                          type="email"
                          value={email}
                          onChange={(event) => setEmail(event.target.value)}
                          placeholder="twoj@email.com"
                          className="bg-white/5 text-zinc-200 placeholder:text-zinc-500"
                        />
                        <div className="flex items-center gap-2 text-xs text-zinc-500">
                          <Shield size={14} /> Tylko do personalizacji. Możesz w każdej chwili zrezygnować.
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {step === totalSteps && (
                <motion.div
                  key="summary"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                >
                  <StepHeader
                    title="Dziękujemy! ✨ Oto Twoje propozycje"
                    description="Na bazie odpowiedzi przygotowaliśmy trzy ścieżki startu."
                  />
                  <div className="grid gap-3">
                    {recommendations.map((r, i) => (
                      <div key={r.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <div className="mb-1 flex items-center gap-2">
                          <Badge className="border-[color:var(--accent)]/40 bg-[color:var(--accent)]/20 text-white">
                            Propozycja {i + 1}
                          </Badge>
                          <span className="text-sm text-zinc-400">dopasowana</span>
                        </div>
                        <h4 className="font-medium text-white/95">{r.title}</h4>
                        <p className="mt-1 text-sm text-zinc-400">{r.blurb}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="mb-2 text-sm text-zinc-300">Mini‑plan na 7 dni:</p>
                    <ul className="ml-5 list-disc space-y-1 text-sm text-zinc-400">
                      <li>Dzień 1–2: konfiguracja narzędzi i skróty pracy.</li>
                      <li>Dzień 3–5: 2 mikro‑projekty zgodne z celem.</li>
                      <li>Dzień 6–7: automatyzacja 1 procesu + retro.</li>
                    </ul>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    <Button
                      type="button"
                      onClick={resetAll}
                      className="border border-white/15 bg-white/10 text-white hover:bg-white/15"
                    >
                      Wypełnij ponownie
                    </Button>
                    <Button
                      type="button"
                      onClick={() => window.alert("Dzięki! (Tu podepnij wysyłkę danych do backendu)")}
                      className="text-white"
                      style={{ background: brand.accent }}
                    >
                      Zapisz i zamknij
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>

          {step < totalSteps && (
            <CardFooter className="items-center justify-between border-t border-white/10">
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <CircleHelp size={16} /> Możesz pominąć dowolne pytanie
              </div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={back}
                  disabled={step === 0}
                  className="text-zinc-300 hover:bg-white/10"
                >
                  <ChevronLeft className="mr-1 h-4 w-4" /> Wstecz
                </Button>
                <Button
                  type="button"
                  onClick={next}
                  disabled={!canNext}
                  className={cn("text-white", canNext ? "" : "cursor-not-allowed opacity-50")}
                  style={{ background: brand.accent }}
                >
                  Dalej <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          )}
        </Card>

        <div className="mt-6 text-center text-xs text-zinc-500">
          © {new Date().getFullYear()} — UI inspirowane estetyką OpenAI. Dane służą wyłącznie do personalizacji.
        </div>
      </div>
    </div>
  );
}
