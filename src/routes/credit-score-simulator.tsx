import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft, LineChart, TrendingUp, TrendingDown } from "lucide-react";

export const Route = createFileRoute("/credit-score-simulator")({
  head: () => ({
    meta: [
      { title: "Credit Score Simulator — PayReady" },
      {
        name: "description",
        content:
          "See how paying on time, missing payments or maxing out a card could affect your credit score — a safe simulation.",
      },
      { property: "og:title", content: "Credit Score Simulator — PayReady" },
      {
        property: "og:description",
        content:
          "See how paying on time, missing payments or maxing out a card could affect your credit score.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CreditScoreSimulator,
});

type Action = {
  label: string;
  delta: number;
  hint: string;
};

const actions: Action[] = [
  { label: "Pay bill on time", delta: +15, hint: "Consistent on-time payments build trust with lenders." },
  { label: "Pay off full balance", delta: +25, hint: "Clearing your balance lowers utilisation — great for your score." },
  { label: "Miss a payment", delta: -60, hint: "Missed payments hurt — and stay on your record for years." },
  { label: "Max out your card", delta: -40, hint: "Using 100% of your limit signals financial stress." },
  { label: "Apply for 3 new cards", delta: -20, hint: "Many applications at once look risky to lenders." },
];

function scoreBand(score: number) {
  if (score >= 740) return { label: "Excellent", tone: "text-chart-2" };
  if (score >= 670) return { label: "Good", tone: "text-chart-2" };
  if (score >= 580) return { label: "Fair", tone: "text-chart-4" };
  return { label: "Poor", tone: "text-destructive" };
}

function CreditScoreSimulator() {
  const [score, setScore] = useState(650);
  const [history, setHistory] = useState<{ label: string; delta: number }[]>([]);

  const band = useMemo(() => scoreBand(score), [score]);
  const pct = Math.round(((score - 300) / (850 - 300)) * 100);

  const apply = (action: Action) => {
    setScore((s) => Math.max(300, Math.min(850, s + action.delta)));
    setHistory((h) => [{ label: action.label, delta: action.delta }, ...h].slice(0, 6));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 py-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to all features
        </Link>

        <div className="mt-6 flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <LineChart className="h-6 w-6" />
          </span>
          <div>
            <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Credit Score Simulator</h1>
            <p className="text-sm text-muted-foreground">Practice mode — a safe simulation, not your real score.</p>
          </div>
        </div>

        {/* Score display */}
        <div className="mt-8 rounded-2xl border border-border bg-card p-6 text-center shadow-sm">
          <p className="text-sm font-medium text-muted-foreground">Your simulated score</p>
          <p className={`mt-2 text-6xl font-extrabold tracking-tight ${band.tone}`}>{score}</p>
          <p className={`mt-1 text-sm font-semibold ${band.tone}`}>{band.label}</p>
          <div className="mx-auto mt-4 h-3 max-w-md overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="mx-auto mt-1 flex max-w-md justify-between text-xs text-muted-foreground">
            <span>300</span>
            <span>850</span>
          </div>
          <button
            onClick={() => {
              setScore(650);
              setHistory([]);
            }}
            className="mt-4 cursor-pointer rounded-xl border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            Reset simulation
          </button>
        </div>

        {/* Actions */}
        <div className="mt-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-card-foreground">What happens if you…</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {actions.map((a) => (
              <button
                key={a.label}
                onClick={() => apply(a)}
                className="group cursor-pointer rounded-xl border border-border bg-secondary p-4 text-left transition-all hover:scale-105 hover:shadow-md"
              >
                <span className="flex items-center justify-between text-sm font-semibold text-secondary-foreground">
                  {a.label}
                  <span className={`flex items-center gap-1 text-xs font-bold ${a.delta > 0 ? "text-chart-2" : "text-destructive"}`}>
                    {a.delta > 0 ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
                    {a.delta > 0 ? `+${a.delta}` : a.delta}
                  </span>
                </span>
                <span className="mt-1 block text-xs text-muted-foreground">{a.hint}</span>
              </button>
            ))}
          </div>
        </div>

        {/* History */}
        {history.length > 0 && (
          <div className="mt-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h2 className="text-sm font-semibold text-card-foreground">Recent actions</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {history.map((h, i) => (
                <li key={i} className="flex items-center justify-between rounded-lg bg-secondary px-3 py-2">
                  <span className="text-muted-foreground">{h.label}</span>
                  <span className={`font-semibold ${h.delta > 0 ? "text-chart-2" : "text-destructive"}`}>
                    {h.delta > 0 ? `+${h.delta}` : h.delta}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
