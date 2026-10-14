"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { STUDENT_CREDENTIALS } from "@/lib/mockData";

/* ═══════════════════════════════════════════════════
   LearnRise — Login Page
   • Student / Educator toggle (default: Student)
   • Illustrated backgrounds with parallax mouse effect
   • Crazy transition on toggle switch
   • Forgot Password OTP flow (OTP: 000000)
   • Hardcoded auth — student@gmail.com / 123456789
   ═══════════════════════════════════════════════════ */

type Role = "student" | "educator";
type ForgotStep = "email" | "otp" | "newpass" | "done";

interface FloatingItem {
  id: string;
  emoji: string;
  x: number;
  y: number;
  size: number;
  depth: number;
  rotate: number;
  delay: number;
}

const studentItems: FloatingItem[] = [
  { id: "s1", emoji: "🎓", x: 5, y: 8, size: 48, depth: 2.5, rotate: -15, delay: 0 },
  { id: "s2", emoji: "📚", x: 88, y: 12, size: 42, depth: 1.8, rotate: 10, delay: 0.2 },
  { id: "s3", emoji: "✏️", x: 8, y: 75, size: 36, depth: 3, rotate: 45, delay: 0.4 },
  { id: "s4", emoji: "💡", x: 92, y: 70, size: 40, depth: 2, rotate: -5, delay: 0.1 },
  { id: "s5", emoji: "🎒", x: 15, y: 40, size: 44, depth: 1.5, rotate: 8, delay: 0.3 },
  { id: "s6", emoji: "⭐", x: 82, y: 42, size: 30, depth: 3.5, rotate: 0, delay: 0.5 },
  { id: "s7", emoji: "📝", x: 10, y: 90, size: 34, depth: 2.2, rotate: -20, delay: 0.15 },
  { id: "s8", emoji: "🔬", x: 90, y: 88, size: 38, depth: 1.2, rotate: 15, delay: 0.35 },
  { id: "s9", emoji: "✈️", x: 25, y: 15, size: 32, depth: 2.8, rotate: 30, delay: 0.45 },
  { id: "s10", emoji: "🌟", x: 75, y: 25, size: 28, depth: 3.2, rotate: -10, delay: 0.25 },
];

const educatorItems: FloatingItem[] = [
  { id: "e1", emoji: "📋", x: 6, y: 10, size: 46, depth: 2.5, rotate: -10, delay: 0 },
  { id: "e2", emoji: "🌍", x: 90, y: 15, size: 44, depth: 1.8, rotate: 5, delay: 0.2 },
  { id: "e3", emoji: "🍎", x: 7, y: 72, size: 38, depth: 3, rotate: 15, delay: 0.4 },
  { id: "e4", emoji: "📊", x: 88, y: 68, size: 40, depth: 2, rotate: -8, delay: 0.1 },
  { id: "e5", emoji: "☕", x: 12, y: 38, size: 42, depth: 1.5, rotate: 12, delay: 0.3 },
  { id: "e6", emoji: "🏆", x: 85, y: 40, size: 34, depth: 3.5, rotate: -3, delay: 0.5 },
  { id: "e7", emoji: "📐", x: 8, y: 88, size: 36, depth: 2.2, rotate: 25, delay: 0.15 },
  { id: "e8", emoji: "🎨", x: 92, y: 85, size: 40, depth: 1.2, rotate: -20, delay: 0.35 },
  { id: "e9", emoji: "✈️", x: 22, y: 18, size: 30, depth: 2.8, rotate: -35, delay: 0.45 },
  { id: "e10", emoji: "💫", x: 78, y: 22, size: 26, depth: 3.2, rotate: 0, delay: 0.25 },
];

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<Role>("student");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Forgot password modal state
  const [showForgot, setShowForgot] = useState(false);
  const [forgotStep, setForgotStep] = useState<ForgotStep>("email");
  const [forgotEmail, setForgotEmail] = useState("");
  const [otpInput, setOtpInput] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [forgotError, setForgotError] = useState("");

  // Mouse move handler for parallax
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("mousemove", handleMouseMove);
    return () => el.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  // Handle toggle with transition
  const handleToggle = (newRole: Role) => {
    if (newRole === role || isTransitioning) return;
    setIsTransitioning(true);
    setLoginError("");
    setTimeout(() => {
      setRole(newRole);
      setEmail("");
      setPassword("");
      setShowPassword(false);
      setTimeout(() => setIsTransitioning(false), 800);
    }, 300);
  };

  // Login handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    if (!email.trim() && !password.trim()) {
      setLoginError("Please enter your email and password.");
      return;
    }
    if (!email.trim()) {
      setLoginError("Please enter your email address.");
      return;
    }
    if (!password.trim()) {
      setLoginError("Please enter your password.");
      return;
    }

    if (role === "student") {
      if (email.trim() === STUDENT_CREDENTIALS.email && password === STUDENT_CREDENTIALS.password) {
        router.push("/dashboard");
      } else {
        setLoginError("Incorrect email or password. Please try again.");
      }
    } else {
      // Educator — placeholder
      setLoginError("Educator portal is coming soon. Please sign in as student.");
    }
  };

  // Forgot password steps
  const handleForgotEmail = () => {
    setForgotError("");
    if (!forgotEmail) { setForgotError("Please enter your email."); return; }
    if (forgotEmail !== STUDENT_CREDENTIALS.email) { setForgotError("Email not found in system."); return; }
    setForgotStep("otp");
  };

  const handleForgotOtp = () => {
    setForgotError("");
    if (otpInput !== STUDENT_CREDENTIALS.otp) { setForgotError("Invalid OTP. Check the OTP sent to your educator."); return; }
    setForgotStep("newpass");
  };

  const handleNewPassword = () => {
    setForgotError("");
    if (!newPass || newPass.length < 6) { setForgotError("Password must be at least 6 characters."); return; }
    if (newPass !== confirmPass) { setForgotError("Passwords do not match."); return; }
    setForgotStep("done");
  };

  const closeForgot = () => {
    setShowForgot(false);
    setForgotStep("email");
    setForgotEmail("");
    setOtpInput("");
    setNewPass("");
    setConfirmPass("");
    setForgotError("");
  };

  const isStudent = role === "student";
  const items = isStudent ? studentItems : educatorItems;
  const accent = isStudent ? "#0d9488" : "#ea580c";
  const accentGrad = isStudent
    ? "linear-gradient(135deg, #2dd4bf, #0d9488)"
    : "linear-gradient(135deg, #fb923c, #ea580c)";

  return (
    <div ref={containerRef} className="relative min-h-screen w-full overflow-hidden flex items-center justify-center">
      {/* ── Backgrounds ── */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 transition-opacity duration-700 ease-in-out" style={{ opacity: isStudent ? 1 : 0 }}>
          <Image src="/images/student-bg.jpg" alt="Student study environment" fill className="object-cover" priority sizes="100vw" />
        </div>
        <div className="absolute inset-0 transition-opacity duration-700 ease-in-out" style={{ opacity: isStudent ? 0 : 1 }}>
          <Image src="/images/educator-bg.jpg" alt="Educator classroom environment" fill className="object-cover" sizes="100vw" />
        </div>
        <div className="absolute inset-0 transition-all duration-700" style={{ background: isStudent ? "linear-gradient(135deg,rgba(240,253,251,0.3),rgba(94,234,212,0.15))" : "linear-gradient(135deg,rgba(255,247,237,0.3),rgba(251,146,60,0.15))" }} />
        <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]" />
      </div>

      {/* ── Parallax Items ── */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {items.map((item) => {
          const ox = mousePos.x * item.depth * 30;
          const oy = mousePos.y * item.depth * 30;
          return (
            <div key={item.id} className="absolute parallax-item" style={{ left: `${item.x}%`, top: `${item.y}%`, fontSize: `${item.size}px`, transform: `translate(${ox}px,${oy}px) rotate(${item.rotate + mousePos.x * item.depth * 5}deg)`, opacity: isTransitioning ? 0 : 1, transition: isTransitioning ? "opacity 0.3s ease-out,transform 0.3s ease-out" : "transform 0.15s ease-out,opacity 0.6s ease-out", filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.15))" }}>
              {item.emoji}
            </div>
          );
        })}
      </div>

      {/* ── Transition Particles ── */}
      {isTransitioning && (
        <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => {
            const angle = (i / 20) * Math.PI * 2;
            const distance = 200 + Math.random() * 300;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;
            const size = 4 + Math.random() * 8;
            return (
              <div key={`p-${i}`} className="absolute rounded-full" style={{ left: "50%", top: "50%", width: size, height: size, background: isStudent ? `hsl(${160 + Math.random() * 30},70%,60%)` : `hsl(${20 + Math.random() * 20},80%,60%)`, animation: `particle-burst 0.8s cubic-bezier(0.25,0.46,0.45,0.94) forwards`, animationDelay: `${i * 0.02}s`, ["--tx" as string]: `${tx}px`, ["--ty" as string]: `${ty}px` }} />
            );
          })}
        </div>
      )}

      {/* ── Back to Home ── */}
      <Link href="/" className="absolute top-6 left-6 z-30 flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm text-ink-muted hover:text-ink transition-colors">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
        Home
      </Link>

      {/* ── Login Card ── */}
      <div className="relative z-20 w-full max-w-md mx-4">
        <div className={`glass-card-strong rounded-3xl p-8 md:p-10 transition-all duration-500 ${isTransitioning ? "scale-95 rotate-1" : "scale-100 rotate-0"}`}>
          {/* Logo */}
          <div className="flex items-center justify-center gap-2.5 mb-2">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500" style={{ background: accentGrad }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c0 1.1 2.7 3 6 3s6-1.9 6-3v-5" />
              </svg>
            </div>
            <span className="text-xl font-semibold text-ink">LearnRise</span>
          </div>

          {/* Welcome text */}
          <div className="text-center mb-8">
            <h1 className={`text-2xl font-bold text-ink mb-1 transition-all duration-500 ${isTransitioning ? "opacity-0 -translate-y-4" : "opacity-100 translate-y-0"}`}>
              Welcome back, {isStudent ? "Student" : "Educator"}!
            </h1>
            <p className={`text-sm transition-all duration-500 ${isTransitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}`} style={{ color: accent }}>
              {isStudent ? "Ready to elevate your journey?" : "Empower the minds of tomorrow."}
            </p>
          </div>

          {/* Toggle */}
          <div className="relative flex bg-gray-100 rounded-xl p-1 mb-8">
            <div className="absolute top-1 bottom-1 rounded-lg shadow-md transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]" style={{ left: isStudent ? "4px" : "calc(50% + 0px)", width: "calc(50% - 4px)", background: accentGrad }} />
            <button onClick={() => handleToggle("student")} className={`relative z-10 flex-1 py-2.5 rounded-lg text-sm font-semibold transition-colors duration-300 flex items-center justify-center gap-2 ${isStudent ? "text-white" : "text-ink-muted hover:text-ink"}`}>
              <span>🎓</span> Student
            </button>
            <button onClick={() => handleToggle("educator")} className={`relative z-10 flex-1 py-2.5 rounded-lg text-sm font-semibold transition-colors duration-300 flex items-center justify-center gap-2 ${!isStudent ? "text-white" : "text-ink-muted hover:text-ink"}`}>
              <span>📋</span> Educator
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} noValidate className={`space-y-5 transition-all duration-400 ${isTransitioning ? "opacity-50 scale-[0.98]" : "opacity-100 scale-100"}`}>
            {loginError && (
              <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm font-medium animate-fade-in flex items-center gap-2">
                <span>⚠️</span>
                <span>{loginError}</span>
              </div>
            )}
            {/* Email */}
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-faint">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
              </div>
              <input type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/80 border border-gray-200 text-ink placeholder-ink-faint focus:outline-none transition-all text-sm"
                onFocus={e => { e.target.style.boxShadow = `0 0 0 2px ${isStudent ? "#2dd4bf50" : "#fb923c50"}`; e.target.style.borderColor = accent; }}
                onBlur={e => { e.target.style.boxShadow = "none"; e.target.style.borderColor = "#e5e7eb"; }} />
            </div>
            {/* Password */}
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-faint">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
              </div>
              <input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full pl-12 pr-12 py-3.5 rounded-xl bg-white/80 border border-gray-200 text-ink placeholder-ink-faint focus:outline-none transition-all text-sm"
                onFocus={e => { e.target.style.boxShadow = `0 0 0 2px ${isStudent ? "#2dd4bf50" : "#fb923c50"}`; e.target.style.borderColor = accent; }}
                onBlur={e => { e.target.style.boxShadow = "none"; e.target.style.borderColor = "#e5e7eb"; }} />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-faint hover:text-ink transition-colors">
                {showPassword
                  ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
                  : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                }
              </button>
            </div>
            {/* Remember + Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-ink-muted cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300" style={{ accentColor: accent }} />
                Remember me
              </label>
              <button type="button" onClick={() => { setShowForgot(true); setForgotStep("email"); }} className="font-medium transition-colors hover:underline" style={{ color: accent }}>
                Forgot Password?
              </button>
            </div>
            {/* Login Button */}
            <button type="submit" className="w-full py-3.5 rounded-xl text-white font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2" style={{ background: accentGrad, boxShadow: isStudent ? "0 4px 15px rgba(13,148,136,0.3)" : "0 4px 15px rgba(234,88,12,0.3)" }}>
              Sign In
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </button>
          </form>

          {/* Student note */}
          {isStudent && (
            <p className="text-center text-xs text-ink-faint mt-5">
              New students are added by your educator. Contact your course instructor to get access.
            </p>
          )}
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          FORGOT PASSWORD MODAL
          ══════════════════════════════════════════════ */}
      {showForgot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={closeForgot} />
          {/* Modal */}
          <div className="relative bg-white rounded-2xl p-8 w-full max-w-sm shadow-2xl">
            {/* Close */}
            <button onClick={closeForgot} className="absolute top-4 right-4 text-ink-faint hover:text-ink transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            </button>

            {/* Step: Email */}
            {forgotStep === "email" && (
              <div>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ background: "linear-gradient(135deg,#2dd4bf,#0d9488)" }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                </div>
                <h2 className="text-xl font-bold text-ink mb-1">Forgot Password?</h2>
                <p className="text-sm text-ink-muted mb-6">Enter your email. An OTP will be sent via your educator.</p>
                {forgotError && <p className="text-sm text-red-500 mb-3 bg-red-50 px-3 py-2 rounded-lg">{forgotError}</p>}
                <input type="email" placeholder="Your email address" value={forgotEmail} onChange={e => setForgotEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-ink focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 mb-4" />
                <button onClick={handleForgotEmail} className="w-full py-3 rounded-xl text-white font-semibold text-sm" style={{ background: "linear-gradient(135deg,#2dd4bf,#0d9488)" }}>
                  Send OTP
                </button>
              </div>
            )}

            {/* Step: OTP */}
            {forgotStep === "otp" && (
              <div>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ background: "linear-gradient(135deg,#2dd4bf,#0d9488)" }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                </div>
                <h2 className="text-xl font-bold text-ink mb-1">Enter OTP</h2>
                <p className="text-sm text-ink-muted mb-6">Enter the OTP sent to your educator's contact. <span className="font-medium text-teal-600">(Hint: 000000)</span></p>
                {forgotError && <p className="text-sm text-red-500 mb-3 bg-red-50 px-3 py-2 rounded-lg">{forgotError}</p>}
                <input type="text" placeholder="6-digit OTP" value={otpInput} onChange={e => setOtpInput(e.target.value)} maxLength={6} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-ink focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 mb-4 text-center tracking-widest text-lg font-bold" />
                <button onClick={handleForgotOtp} className="w-full py-3 rounded-xl text-white font-semibold text-sm" style={{ background: "linear-gradient(135deg,#2dd4bf,#0d9488)" }}>
                  Verify OTP
                </button>
                <button onClick={() => setForgotStep("email")} className="w-full mt-2 py-2 text-sm text-ink-muted hover:text-ink transition-colors">← Back</button>
              </div>
            )}

            {/* Step: New Password */}
            {forgotStep === "newpass" && (
              <div>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ background: "linear-gradient(135deg,#2dd4bf,#0d9488)" }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                </div>
                <h2 className="text-xl font-bold text-ink mb-1">Set New Password</h2>
                <p className="text-sm text-ink-muted mb-6">Choose a strong new password for your account.</p>
                {forgotError && <p className="text-sm text-red-500 mb-3 bg-red-50 px-3 py-2 rounded-lg">{forgotError}</p>}
                <input type="password" placeholder="New password" value={newPass} onChange={e => setNewPass(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-ink focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 mb-3" />
                <input type="password" placeholder="Confirm new password" value={confirmPass} onChange={e => setConfirmPass(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-ink focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 mb-4" />
                <button onClick={handleNewPassword} className="w-full py-3 rounded-xl text-white font-semibold text-sm" style={{ background: "linear-gradient(135deg,#2dd4bf,#0d9488)" }}>
                  Reset Password
                </button>
              </div>
            )}

            {/* Step: Done */}
            {forgotStep === "done" && (
              <div className="text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "linear-gradient(135deg,#2dd4bf,#0d9488)" }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                </div>
                <h2 className="text-xl font-bold text-ink mb-2">Password Reset!</h2>
                <p className="text-sm text-ink-muted mb-6">Your password has been updated. You can now sign in with your new password.</p>
                <button onClick={closeForgot} className="w-full py-3 rounded-xl text-white font-semibold text-sm" style={{ background: "linear-gradient(135deg,#2dd4bf,#0d9488)" }}>
                  Back to Login
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
