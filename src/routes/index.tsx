import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Wallet,
  Sparkles,
  ArrowRight,
  AlertTriangle,
  ScanLine,
  Coffee,
  CheckCircle2,
  X,
  Users,
  Gauge,
  QrCode,
  ShoppingBag,
  ShieldAlert,
  BarChart3,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PayReady — Practise Digital Payments Safely" },
      {
        name: "description",
        content:
          "PayReady is a safe playground for Malaysians to practise budgeting, QR payments and credit habits — no real money involved.",
      },
      { property: "og:title", content: "PayReady — Practise Digital Payments Safely" },
      {
        property: "og:description",
        content:
          "A safe playground to practise budgeting, QR payments and credit habits — no real money involved.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function MockQrCode() {
  const n = 21;
  const cells: boolean[] = [];
  let seed = 987654321;
  for (let i = 0; i < n * n; i++) {
    seed = (seed * 1103515245 + 12345) % 2147483648;
    cells.push(((seed >> 16) & 1) === 1);
  }
  const isFinder = (r: number, c: number) => {
    const corners: Array<readonly [number, number]> = [
      [0, 0],
      [0, n - 7],
      [n - 7, 0],
    ];
    for (const [fr, fc] of corners) {
      if (r >= fr && r < fr + 7 && c >= fc && c < fc + 7) {
        const rr = r - fr;
        const cc = c - fc;
        return (
          rr === 0 || rr === 6 || cc === 0 || cc === 6 || (rr >= 2 && rr <= 4 && cc >= 2 && cc <= 4)
        );
      }
    }
    return false;
  };
  return (
    <svg
      viewBox={`0 0 ${n} ${n}`}
      className="h-32 w-32 rounded-lg text-foreground"
      role="img"
      aria-label="Placeholder QR code"
    >
      {cells.map((on, i) => {
        const r = Math.floor(i / n);
        const c = i % n;
        const dark = isFinder(r, c) ? true : on;
        return dark ? <rect key={i} x={c} y={r} width={1} height={1} fill="currentColor" /> : null;
      })}
    </svg>
  );
}

function BudgetGuardDemo() {
  const [alertOpen, setAlertOpen] = useState(false);
  const [overrideUsed, setOverrideUsed] = useState(false);

  return (
    <div className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
          <AlertTriangle className="h-6 w-6" />
        </span>
        <div>
          <h3 className="text-lg font-semibold text-card-foreground">Smart Budget Control</h3>
          <p className="text-sm text-muted-foreground">
            We don't just process payments; we give students financial control.
          </p>
        </div>
      </div>

      {/* Mock checkout interface */}
      <div className="mt-6 flex-1 rounded-xl border border-border bg-secondary p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Coffee className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-semibold text-secondary-foreground">
              Premium Campus Cafe
            </span>
          </div>
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
            Mock checkout
          </span>
        </div>

        <div className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between text-muted-foreground">
            <span>Iced Latte ×1</span>
            <span>RM 15.00</span>
          </div>
          <div className="flex justify-between border-t border-border pt-2 font-semibold text-card-foreground">
            <span>Total</span>
            <span>RM 15.00</span>
          </div>
        </div>

        <button
          onClick={() => setAlertOpen(true)}
          className="mt-4 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:bg-primary/90"
        >
          <ScanLine className="h-4 w-4" />
          Scan & Pay
        </button>

        {overrideUsed && (
          <p className="mt-3 flex items-center gap-2 rounded-lg bg-secondary px-3 py-2 text-xs font-medium text-muted-foreground">
            <CheckCircle2 className="h-4 w-4 text-chart-2" />
            Override logged for this one payment — PayReady keeps watching the rest of your week.
          </p>
        )}
      </div>

      {/* Budget warning modal */}
      {alertOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 p-4 backdrop-blur-sm animate-in fade-in duration-300 ease-in-out"
          role="dialog"
          aria-modal="true"
          aria-labelledby="budget-alert-title"
          onClick={() => setAlertOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl border border-border bg-card/90 p-6 shadow-2xl backdrop-blur-md animate-in zoom-in-95 fade-in duration-300 ease-in-out"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                <AlertTriangle className="h-5 w-5" />
              </span>
              <div>
                <h4 id="budget-alert-title" className="text-lg font-bold text-card-foreground">
                  Wait!
                </h4>
                <p className="mt-1 text-sm text-muted-foreground">
                  This RM 15.00 coffee will push you over your RM 100.00 weekly food budget. Are you
                  sure?
                </p>
              </div>
              <button
                aria-label="Close"
                onClick={() => setAlertOpen(false)}
                className="ml-auto cursor-pointer rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  setAlertOpen(false);
                  setOverrideUsed(true);
                }}
                className="cursor-pointer rounded-xl border border-border bg-secondary px-4 py-3 text-sm font-semibold text-secondary-foreground transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-md"
              >
                Proceed Anyway
              </button>
              <button
                onClick={() => setAlertOpen(false)}
                className="cursor-pointer rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-all duration-300 ease-in-out hover:scale-105 hover:bg-primary/90"
              >
                Cancel & Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function BillSplitterDemo() {
  const [splitOpen, setSplitOpen] = useState(false);

  const friends = [
    { name: "Ee Vonne", amount: "RM 10.00", initials: "EV" },
    { name: "Loo Lok Yi", amount: "RM 10.00", initials: "LY" },
    { name: "Chan Rui Qi", amount: "RM 10.00", initials: "CQ" },
  ];

  return (
    <div className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
          <Users className="h-6 w-6" />
        </span>
        <div>
          <h3 className="text-lg font-semibold text-card-foreground">Seamless Social Splitter</h3>
          <p className="text-sm text-muted-foreground">
            Turn a 5-minute headache into a 3-second scan.
          </p>
        </div>
      </div>

      {/* Mock payment success screen */}
      <div className="mt-6 flex-1 rounded-xl border border-border bg-secondary p-5 text-center">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-chart-2/15 text-chart-2">
          <CheckCircle2 className="h-6 w-6" />
        </span>
        <h4 className="mt-3 text-lg font-bold text-secondary-foreground">Payment Successful</h4>
        <p className="text-sm text-muted-foreground">UUM Cafeteria · Total: RM 40.00</p>

        <button
          onClick={() => setSplitOpen((o) => !o)}
          className="mt-4 inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:bg-primary/90"
        >
          <Users className="h-4 w-4" />
          Split with Group
        </button>
      </div>

      {/* Animated split breakdown */}
      {splitOpen && (
        <div className="mt-4">
          <ul className="space-y-2">
            {friends.map((f, i) => (
              <li
                key={f.name}
                style={{ animationDelay: `${i * 120}ms` }}
                className="flex items-center justify-between rounded-xl border border-border bg-secondary px-4 py-3 animate-in fade-in slide-in-from-bottom-2 duration-500 ease-in-out"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {f.initials}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-secondary-foreground">{f.name}</p>
                    <p className="text-xs text-muted-foreground">Owes you</p>
                  </div>
                </div>
                <span className="text-sm font-semibold text-primary">{f.amount}</span>
              </li>
            ))}
          </ul>

          <div
            style={{ animationDelay: "360ms" }}
            className="mt-4 flex flex-col items-center rounded-xl border border-border bg-background p-5 animate-in fade-in zoom-in-95 duration-500 ease-in-out"
          >
            <MockQrCode />
            <p className="mt-3 text-sm font-semibold text-card-foreground">Scan to Pay Me Back</p>
          </div>
        </div>
      )}
    </div>
  );
}

type MoreFeature = {
  title: string;
  desc: string;
  icon: typeof Wallet;
  to?: "/budgeting-practice" | "/credit-score-simulator";
};

const moreFeatures: MoreFeature[] = [
  { title: "Smart Budget Warning", desc: "Set a monthly budget and get warned before overspending.", icon: Wallet, to: "/budgeting-practice" },
  { title: "Credit Score Simulator", desc: "See how good and bad habits move your credit score.", icon: Gauge, to: "/credit-score-simulator" },
  { title: "QR Payment Practice", desc: "Practise scanning DuitNow QR codes safely.", icon: QrCode },
  { title: "Pasar Malam Scenarios", desc: "Real-life night market payment role-play.", icon: ShoppingBag },
  { title: "Scam Spotter", desc: "Learn to spot fake payment links and scams.", icon: ShieldAlert },
  { title: "Learning Progress", desc: "Track the money skills you've mastered.", icon: BarChart3 },
];

function MoreFeatures() {
  const [open, setOpen] = useState(false);
  return (
    <section className="mx-auto max-w-6xl px-4 pb-24">
      <div className="text-center">
        <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          More Ways to Practise
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          Supporting tools around our two core features — budget control and social splitting.
        </p>
      </div>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {moreFeatures.map((f) => {
          const inner = (
            <>
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
                <f.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-semibold text-card-foreground">{f.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
              <span className="mt-3 inline-block text-xs font-medium text-primary">
                {f.to ? "Try it now →" : "Coming soon"}
              </span>
            </>
          );
          const cls =
            "block cursor-pointer rounded-2xl border border-border bg-card p-6 text-left shadow-sm transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl";
          return f.to ? (
            <Link key={f.title} to={f.to} className={cls}>
              {inner}
            </Link>
          ) : (
            <button key={f.title} onClick={() => setOpen(true)} className={cls}>
              {inner}
            </button>
          );
        })}
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 p-4 backdrop-blur-sm animate-in fade-in duration-300"
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl border border-border bg-card/90 p-6 text-center shadow-2xl backdrop-blur-md animate-in zoom-in-95 fade-in duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <h4 className="text-xl font-bold text-card-foreground">🚀 Feature in Development</h4>
            <p className="mt-3 text-sm text-muted-foreground">
              Due to hackathon time constraints, this feature is on our future roadmap. Stay tuned!
            </p>
            <button
              onClick={() => setOpen(false)}
              className="mt-6 w-full cursor-pointer rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-all hover:scale-105 hover:bg-primary/90"
            >
              Got it!
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link to="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Wallet className="h-5 w-5" />
            </span>
            <span className="text-xl font-bold text-foreground">PayReady</span>
          </Link>
          <a
            href="#features"
            className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all hover:scale-105 hover:bg-primary/90"
          >
            Explore Features
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 py-16 text-center sm:py-24">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5 text-sm font-medium text-secondary-foreground">
          <Sparkles className="h-4 w-4" />
          Group6 KASOC 2026
        </span>
        <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl">
          Practise digital payments.{" "}
          <span className="text-primary">Zero real money.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          PayReady is a secure sandbox designed exclusively for UUM students to build trust in digital banking—mastering campus budgets, QR payments, and credit with absolute zero risk.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#features"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:scale-105 hover:bg-primary/90"
          >
            Start Practising
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      {/* Killer Features */}
      <section id="features" className="mx-auto max-w-6xl px-4 pb-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Our Killer Features
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Live, interactive demos — click through both flows exactly as students would.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <BudgetGuardDemo />
          <BillSplitterDemo />
        </div>
      </section>

      <MoreFeatures />

      {/* Footer */}
      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        PayReady — a hackathon prototype. No real money, no real risk.
      </footer>
    </div>
  );
}
