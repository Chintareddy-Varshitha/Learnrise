"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { studentProfile, notifications } from "@/lib/mockData";

interface NavItem {
  name: string;
  href: string;
  icon: string;
  badge?: number;
}

const navItems: NavItem[] = [
  { name: "Dashboard", href: "/dashboard", icon: "📊" },
  { name: "My Courses", href: "/dashboard/courses", icon: "📚" },
  { name: "My Progress", href: "/dashboard/progress", icon: "📈" },
  { name: "Recommendations", href: "/dashboard/recommendations", icon: "🎯" },
  { name: "Notifications", href: "/dashboard/notifications", icon: "🔔", badge: 3 },
  { name: "Profile", href: "/dashboard/profile", icon: "👤" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleLogout = () => {
    // Clear any mock auth session if needed
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-ink flex flex-col md:flex-row antialiased">
      {/* ── Mobile Sidebar Backdrop ── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Sidebar ── */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-50 h-screen w-64 bg-white border-r border-slate-200/80 flex flex-col justify-between transition-transform duration-300 ease-in-out md:translate-x-0 ${
          sidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        }`}
      >
        {/* Top brand & nav */}
        <div className="p-5 flex flex-col h-full overflow-y-auto">
          {/* Logo & Close for Mobile */}
          <div className="flex items-center justify-between pb-6 border-b border-slate-100">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 group"
              onClick={() => setSidebarOpen(false)}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-teal-600 flex items-center justify-center text-white shadow-md shadow-teal-500/20 group-hover:scale-105 transition-transform">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c0 1.1 2.7 3 6 3s6-1.9 6-3v-5" />
                </svg>
              </div>
              <div>
                <span className="font-bold text-lg text-slate-900 tracking-tight block">
                  LearnRise
                </span>
                <span className="text-[11px] font-medium text-teal-600 uppercase tracking-wider block">
                  Student Portal
                </span>
              </div>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden text-slate-400 hover:text-slate-600 p-1"
            >
              ✕
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="mt-6 space-y-1 flex-1">
            <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 px-3 mb-2">
              Menu
            </div>
            {navItems.map((item) => {
              const isActive =
                item.href === "/dashboard"
                  ? pathname === "/dashboard"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-md shadow-teal-500/20"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-base">{item.icon}</span>
                    <span>{item.name}</span>
                  </div>
                  {item.badge && item.badge > 0 && (
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                        isActive
                          ? "bg-white text-teal-700"
                          : "bg-teal-100 text-teal-700"
                      }`}
                    >
                      {unreadCount}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Student Status Card */}
          <div className="mt-auto pt-4 border-t border-slate-100">
            <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-2xl p-3.5 border border-teal-100 mb-3">
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-9 h-9 rounded-full bg-teal-600 text-white font-bold text-xs flex items-center justify-center shadow-sm">
                  {studentProfile.initials}
                </div>
                <div className="overflow-hidden">
                  <div className="text-xs font-bold text-slate-800 truncate">
                    {studentProfile.name}
                  </div>
                  <div className="text-[11px] text-teal-700 font-medium truncate">
                    Level {studentProfile.level} • {studentProfile.totalXP} XP
                  </div>
                </div>
              </div>
              {/* Progress bar to next level */}
              <div className="w-full bg-teal-200/60 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-teal-600 h-1.5 rounded-full"
                  style={{ width: "70%" }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-slate-500 mt-1.5 font-medium">
                <span>🔥 {studentProfile.streakDays}-Day Streak</span>
                <span>Top 30%</span>
              </div>
            </div>

            {/* Logout button */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-medium text-rose-600 hover:bg-rose-50 transition-colors"
            >
              <span>🚪</span>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* ── Main Content Area ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 md:px-8 py-3.5 flex items-center justify-between gap-4">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 focus:outline-none"
            aria-label="Open sidebar"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          {/* Search bar */}
          <div className="relative flex-1 max-w-md hidden sm:block">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search topics, questions, courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-100/90 border border-transparent rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition-all"
            />
          </div>

          {/* Header Right Badges */}
          <div className="flex items-center gap-3 ml-auto">
            {/* Streak Counter */}
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold">
              <span>🔥</span>
              <span>{studentProfile.streakDays} Day Streak</span>
            </div>

            {/* XP Badge */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-700 text-xs font-semibold">
              <span>⚡</span>
              <span>{studentProfile.totalXP} XP</span>
            </div>

            {/* Notifications Shortcut */}
            <Link
              href="/dashboard/notifications"
              className="relative p-2 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
              title="Notifications"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white animate-pulse" />
              )}
            </Link>

            {/* Profile Avatar Pill */}
            <Link
              href="/dashboard/profile"
              className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200/80 transition-colors"
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-teal-500 to-teal-600 text-white font-bold text-xs flex items-center justify-center">
                {studentProfile.initials}
              </div>
              <span className="text-xs font-semibold text-slate-700 hidden sm:inline">
                Alex J.
              </span>
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
