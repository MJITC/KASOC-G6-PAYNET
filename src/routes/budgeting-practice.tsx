import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft, Wallet, AlertTriangle, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/budgeting-practice")({
  head: () => ({
    meta: [
      { title: "Smart Budget Warning — PayReady" },
      {
        name: "description",
        content:
          "Practise setting a monthly budget and see friendly warnings before you overspend — no real money involved.",
      },
      { property: "og:title", content: "Smart Budget Warning — PayReady" },
      {
        property: "og:description",
        content:
          "Practise setting a monthly budget and see friendly warnings before you overspend.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BudgetingPractice,
});

const expenses = [
  { label: "Nasi lemak breakfast", amount: 4 },
  { label: "LRT fare", amount: 3 },
  { label: "Bubble tea", amount: 12 },
  { label: "Groceries", amount: 85 },
  { label: "Movie night", amount: 45 },
  { label: "New sneakers", amount: 180 },
];

function BudgetingPractice() {
  const [budget, setBudget] = useState(300);
  const [spent, setSpent] = useState(0);
  const [log, setLog] = useState<string[]>([]);

  const remaining = budget - spent;
  const pct = useMemo(
    () => (budget > 0 ? Math.min(100, Math.round((spent / budget) * 100)) : 0),
    [spent, budget],
  );

  const status =
    pct >= 100
      ? { icon: AlertTriangle, text: "Over budget! Time to pause spending.", tone: "text-destructive" }
      : pct >= 80
        ? { icon: AlertTriangle, text: "Careful — you've used over 80% of your budget.", tone: "text-chart-4" }
        : { icon: CheckCircle2, text: "You're within budget. Nice pacing!", tone: "text-chart-2" };

  const addExpense = (label: string, amount: number) => {
    setSpent((s) => s + amount);
    setLog((l) => [`${label} — RM${amount}`, ...l].slice(0, 6));
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
            <Wallet className="h-6 w-6" />
          </span>
          <div>
            <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Smart Budget Warning</h1>
            <p className="text-sm text-muted-foreground">Practice mode — no real money involved.</p>
          </div>
        </div>

        {/* Budget setter */}
        <div className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <label className="text-sm font-semibold text-card-foreground">
            Monthly budget: <span className="text-primary">RM{budget}</span>
          </label>
          <input
            type="range"
            min={100}
            max={1000}
            step={50}
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            className="mt-3 w-full accent-primary"
          />

          <div className="mt-6">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Spent: RM{spent}</span>
              <span className="font-semibold text-card-foreground">Remaining: RM{remaining}</span>
            </div>
            <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className={`h-full rounded-full transition-all duration-500 ${pct >= 100 ? "bg-destructive" : pct >= 80 ? "bg-chart-4" : "bg-chart-2"}`}
                style={{ width: `${pct}%` }}
              />
            </div>
            <p className={`mt-3 flex items-center gap-2 text-sm font-medium ${status.tone}`}>
              <status.icon className="h-4 w-4" />
              {status.text}
            </p>
          </div>
        </div>

        {/* Expense buttons */}
        <div className="mt-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-card-foreground">Add a practice expense</h2>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {expenses.map((e) => (
              <button
                key={e.label}
                onClick={() => addExpense(e.label, e.amount)}
                className="cursor-pointer rounded-xl border border-border bg-secondary px-3 py-3 text-sm font-medium text-secondary-foreground transition-all hover:scale-105 hover:shadow-md"
              >
                {e.label}
                <span className="block text-xs text-muted-foreground">RM{e.amount}</span>
              </button>
            ))}
          </div>
          <button
            onClick={() => {
              setSpent(0);
              setLog([]);
            }}
            className="mt-4 cursor-pointer rounded-xl border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            Reset month
          </button>
        </div>

        {/* Log */}
        {log.length > 0 && (
          <div className="mt-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h2 className="text-sm font-semibold text-card-foreground">Recent practice spending</h2>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {log.map((item, i) => (
                <li key={i} className="rounded-lg bg-secondary px-3 py-2">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
