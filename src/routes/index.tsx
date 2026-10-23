import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  Wallet,
  QrCode,
  Store,
  ShieldAlert,
  TrendingUp,
  LineChart,
  Sparkles,
  ArrowRight,
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

type Feature = {
  icon: typeof Wallet;
  title: string;
  description: string;
  route?: string;
};

const features: Feature[] = [
  {
    icon: Wallet,
    title: "Smart Budget Warning",
    description:
      "Get a friendly nudge before you overspend. Set a monthly budget and see alerts as you approach your limit.",
    route: "/budgeting-practice",
  },
  {
    icon: QrCode,
    title: "QR Payment Practice",
    description:
      "Scan, confirm and pay with simulated QR codes — learn the exact flow of DuitNow QR without risking a sen.",
  },
  {
    icon: Store,
    title: "Pasar Malam Scenarios",
    description:
      "Practise real-life situations: splitting bills, paying hawkers, and checking change at the night market.",
  },
  {
    icon: ShieldAlert,
    title: "Scam Spotter",
    description:
      "Learn to recognise fake payment pages, phishing links and too-good-to-be-true offers before they catch you.",
  },
  {
    icon: TrendingUp,
    title: "Learning Progress",
    description:
      "Track your journey from first-timer to confident payer with badges, streaks and skill milestones.",
  },
  {
    icon: LineChart,
    title: "Credit Score Simulator",
    description:
      "See how paying on time, missing payments or maxing out a card could affect your credit score over time.",
    route: "/credit-score-simulator",
  },
];

function FeatureModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 p-4 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="feature-modal-title"
    >
      <div
        className="w-full max-w-md rounded-2xl border border-border bg-card/90 p-8 text-center shadow-2xl backdrop-blur-md animate-in zoom-in-95 fade-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="feature-modal-title" className="text-2xl font-bold text-card-foreground">
          🚀 Feature in Development
        </h2>
        <p className="mt-3 text-muted-foreground">
          Due to hackathon time constraints, this feature is on our future roadmap. Stay tuned!
        </p>
        <button
          onClick={onClose}
          className="mt-6 inline-flex items-center justify-center rounded-xl bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:scale-105 hover:bg-primary/90"
        >
          Got it!
        </button>
      </div>
    </div>
  );
}

function Index() {
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleFeatureClick = (feature: Feature) => {
    if (feature.route) {
      navigate({ to: feature.route });
    } else {
      setModalOpen(true);
    }
  };

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

      {/* Features */}
      <section id="features" className="mx-auto max-w-6xl px-4 pb-24">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            What You Can Practise in PayReady
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Six hands-on modules designed to make your first real payment feel
            like your hundredth.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <button
              key={feature.title}
              onClick={() => handleFeatureClick(feature)}
              className="group cursor-pointer rounded-2xl border border-border bg-card p-6 text-left shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-secondary-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <feature.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-4 text-lg font-semibold text-card-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                Try it
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        PayReady — a hackathon prototype. No real money, no real risk.
      </footer>

      <FeatureModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
