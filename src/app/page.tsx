"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

/* ═══════════════════════════════════════════
   LearnRise — Public Landing Page
   Simple, light, elegant introduction
   ═══════════════════════════════════════════ */

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-surface">
      {/* ── Navbar ── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-lg shadow-sm border-b border-border-light"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c0 1.1 2.7 3 6 3s6-1.9 6-3v-5" />
              </svg>
            </div>
            <span className="text-xl font-semibold text-ink">LearnRise</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm text-ink-muted">
            <a href="#features" className="hover:text-brand-600 transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="hover:text-brand-600 transition-colors">
              How It Works
            </a>
            <a href="#roles" className="hover:text-brand-600 transition-colors">
              Who It's For
            </a>
          </div>

          <Link
            href="/login"
            className="px-5 py-2 rounded-full text-sm font-medium bg-ink text-white hover:bg-ink/90 transition-all hover:shadow-md active:scale-95"
          >
            Sign In
          </Link>
        </div>
      </nav>

      {/* ── Hero Section ── */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-brand-100/40 rounded-full blur-3xl -z-1" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-coral-100/30 rounded-full blur-3xl -z-1" />

        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-medium mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse-gentle" />
            AI-Powered Learning Platform
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-ink leading-tight mb-6 animate-fade-in-up">
            Learn Smarter,{" "}
            <span className="bg-gradient-to-r from-brand-500 to-brand-700 bg-clip-text text-transparent">
              Not Harder
            </span>
          </h1>

          <p className="text-lg md:text-xl text-ink-muted max-w-2xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
            Practice independently, receive intelligent hints, and track your
            growth. LearnRise helps you develop real problem-solving skills
            without giving away the answers.
          </p>

          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            <Link
              href="/login"
              className="px-8 py-3.5 rounded-full text-sm font-semibold bg-gradient-to-r from-brand-500 to-brand-600 text-white hover:from-brand-600 hover:to-brand-700 transition-all shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 hover:-translate-y-0.5 active:translate-y-0"
            >
              Get Started — It's Free
            </Link>
            <a
              href="#how-it-works"
              className="px-8 py-3.5 rounded-full text-sm font-medium text-ink-muted border border-border-light hover:border-ink-faint hover:text-ink transition-all"
            >
              See How It Works ↓
            </a>
          </div>
        </div>

        {/* Floating elements */}
        <div className="hidden lg:block absolute top-40 left-16 animate-float text-3xl opacity-50">
          🎓
        </div>
        <div
          className="hidden lg:block absolute top-60 right-20 animate-float-slow text-2xl opacity-40"
          style={{ animationDelay: "1s" }}
        >
          ✨
        </div>
        <div
          className="hidden lg:block absolute bottom-20 left-1/4 animate-float-fast text-xl opacity-40"
          style={{ animationDelay: "2s" }}
        >
          📚
        </div>
      </section>

      {/* ── Features Section ── */}
      <section id="features" className="py-24 px-6 bg-white/60">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-ink mb-4">
              Why Choose LearnRise?
            </h2>
            <p className="text-ink-muted max-w-xl mx-auto">
              A learning platform built around understanding, not memorization.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🧠",
                title: "Adaptive AI Hints",
                description:
                  "Get progressive hints that guide your thinking without revealing the answer. Build real understanding.",
                accent: "brand",
              },
              {
                icon: "📊",
                title: "Deep Progress Tracking",
                description:
                  "Know exactly where you stand. Topic-level mastery, attempt history, and personalized weak-area detection.",
                accent: "coral",
              },
              {
                icon: "🎯",
                title: "Personalized Paths",
                description:
                  "AI recommends what to study next based on your performance, learning speed, and knowledge gaps.",
                accent: "brand",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="group p-8 rounded-2xl bg-white border border-border-light hover:border-transparent hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-5 transition-transform duration-300 group-hover:scale-110 ${
                    feature.accent === "brand"
                      ? "bg-brand-50"
                      : "bg-coral-50"
                  }`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-ink mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-ink-muted leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how-it-works" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-ink mb-4">
              How LearnRise Works
            </h2>
            <p className="text-ink-muted max-w-xl mx-auto">
              A structured approach that builds genuine mastery.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-4 items-start">
            {[
              { step: "1", label: "Learn", desc: "Study the concept", icon: "📖" },
              { step: "2", label: "Attempt", desc: "Try the problem", icon: "✏️" },
              { step: "3", label: "Hint", desc: "Get AI guidance", icon: "💡" },
              { step: "4", label: "Retry", desc: "Try again smarter", icon: "🔄" },
              { step: "5", label: "Improve", desc: "Track your growth", icon: "📈" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center group">
                <div className="relative mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-50 to-brand-100 border border-brand-200 flex items-center justify-center text-2xl group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-brand-200/50 transition-all duration-300">
                    {item.icon}
                  </div>
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-brand-500 text-white text-xs font-bold flex items-center justify-center">
                    {item.step}
                  </span>
                </div>
                <h3 className="font-semibold text-ink text-sm mb-1">
                  {item.label}
                </h3>
                <p className="text-xs text-ink-muted">{item.desc}</p>

                {/* Connector arrow (hidden on last item) */}
                {i < 4 && (
                  <div className="hidden md:block absolute translate-x-[calc(50%+1.5rem)] text-brand-300">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Who It's For ── */}
      <section id="roles" className="py-24 px-6 bg-white/60">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-ink mb-4">
              Built for Everyone in Education
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Student Card */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-brand-50 to-white border border-brand-100 hover:shadow-lg transition-all duration-300">
              <div className="text-4xl mb-4">🎓</div>
              <h3 className="text-xl font-bold text-ink mb-3">For Students</h3>
              <ul className="space-y-2.5 text-sm text-ink-muted">
                {[
                  "Identify your weak areas with AI analysis",
                  "Practice at your own pace and difficulty",
                  "Get hints that guide — not answers that spoil",
                  "Track mastery across every concept",
                  "Receive personalized study recommendations",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-brand-500 mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Educator Card */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-coral-50 to-white border border-coral-100 hover:shadow-lg transition-all duration-300">
              <div className="text-4xl mb-4">📋</div>
              <h3 className="text-xl font-bold text-ink mb-3">For Educators</h3>
              <ul className="space-y-2.5 text-sm text-ink-muted">
                {[
                  "Monitor individual & class-level progress",
                  "See which concepts students struggle with",
                  "Review attempts, hint usage, and AI reliance",
                  "Create courses, modules, and assessments",
                  "Make data-driven teaching decisions",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-coral-500 mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-ink mb-4">
            Ready to Rise?
          </h2>
          <p className="text-ink-muted mb-8 max-w-lg mx-auto">
            Join LearnRise and start building real understanding through
            AI-guided practice.
          </p>
          <Link
            href="/login"
            className="inline-block px-10 py-4 rounded-full text-sm font-semibold bg-gradient-to-r from-brand-500 to-brand-600 text-white hover:from-brand-600 hover:to-brand-700 transition-all shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 hover:-translate-y-0.5 active:translate-y-0"
          >
            Get Started Now
          </Link>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-8 px-6 border-t border-border-light">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-ink-faint">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center">
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c0 1.1 2.7 3 6 3s6-1.9 6-3v-5" />
              </svg>
            </div>
            <span>© 2026 LearnRise. All rights reserved.</span>
          </div>
          <div className="flex gap-6">
            <span>Privacy</span>
            <span>Terms</span>
            <span>Contact</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
