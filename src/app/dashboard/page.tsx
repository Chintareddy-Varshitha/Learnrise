"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  studentProfile,
  dashboardStats,
  courses,
  topicProgress,
  recommendations,
  weeklyActivity,
  getMasteryColor,
} from "@/lib/mockData";

export default function DashboardPage() {
  const [submittedTests, setSubmittedTests] = useState<Record<string, { score: number }>>({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("learnrise_submitted_tests");
        if (stored) {
          setSubmittedTests(JSON.parse(stored));
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const primaryRecommendation = recommendations[0];
  const weakTopics = topicProgress.filter((t) => t.mastery === "Needs Practice");

  return (
    <div className="space-y-8 animate-fade-in">
      {/* ── Welcome Banner ── */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-600 text-white p-6 md:p-8 shadow-xl shadow-teal-900/10">
        {/* Background decorative shapes */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white via-teal-200 to-transparent pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm text-xs font-semibold text-teal-100">
              <span>🎓</span> LearnRise Adaptive Learning
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Good Morning, {studentProfile.name.split(" ")[0]}! ☀️
            </h1>
            <p className="text-sm text-teal-100/90 leading-relaxed">
              You're on a <strong className="text-white">{studentProfile.streakDays}-day streak</strong>! Continue your problem-solving momentum today with personalized recommendations.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/dashboard/courses"
              className="px-6 py-3 rounded-2xl bg-white text-teal-800 font-bold text-sm shadow-lg shadow-black/10 hover:bg-teal-50 transition-all active:scale-95 flex items-center gap-2"
            >
              <span>📚</span> My Courses
            </Link>
          </div>
        </div>
      </div>

      {/* ── Key Metrics Overview ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Enrolled Courses */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Enrolled Courses
            </span>
            <span className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-sm font-bold">
              📚
            </span>
          </div>
          <div className="text-2xl md:text-3xl font-black text-slate-900 mb-1">
            {courses.length}
          </div>
          <div className="text-xs text-slate-500 flex items-center gap-1 font-medium">
            <span className="text-emerald-600 font-bold">68%</span> overall completion
          </div>
        </div>

        {/* 2. Questions Solved */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Questions Solved
            </span>
            <span className="w-8 h-8 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center text-sm font-bold">
              ✅
            </span>
          </div>
          <div className="text-2xl md:text-3xl font-black text-slate-900 mb-1">
            {dashboardStats.questionsSolved}{" "}
            <span className="text-sm font-medium text-slate-400">
              / {dashboardStats.questionsAttempted}
            </span>
          </div>
          <div className="text-xs text-slate-500 flex items-center gap-1 font-medium">
            <span className="text-teal-600 font-bold">
              {Math.round((dashboardStats.questionsSolved / dashboardStats.questionsAttempted) * 100)}%
            </span>{" "}
            accuracy rate
          </div>
        </div>

        {/* 3. Independent vs Assisted */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Independent Solutions
            </span>
            <span className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-sm font-bold">
              💡
            </span>
          </div>
          <div className="text-2xl md:text-3xl font-black text-slate-900 mb-1">
            {dashboardStats.solvedWithoutHints}
          </div>
          <div className="text-xs text-slate-500 font-medium">
            <span className="text-purple-600 font-bold">{dashboardStats.solvedWithHints}</span> solved with AI hints
          </div>
        </div>

        {/* 4. Total Study Time */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Total Study Time
            </span>
            <span className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-sm font-bold">
              ⏱️
            </span>
          </div>
          <div className="text-2xl md:text-3xl font-black text-slate-900 mb-1">
            {Math.floor(dashboardStats.totalTimeMins / 60)}h {dashboardStats.totalTimeMins % 60}m
          </div>
          <div className="text-xs text-slate-500 font-medium">
            Goal: <strong className="text-slate-700">{dashboardStats.weeklyCompleted}/{dashboardStats.weeklyGoal}</strong> completed this week
          </div>
        </div>
      </div>

      {/* ── Active Continue Learning Banner ── */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center text-2xl flex-shrink-0">
            🐍
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-600 bg-teal-50 px-2 py-0.5 rounded-md">
                Resume Course
              </span>
              <span className="text-xs text-slate-400">• Python Programming</span>
            </div>
            <h2 className="text-lg font-bold text-slate-900">
              Module 4: Problem Solving — Recursion Fundamentals
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Continue where you left off • 2 questions remaining in this section
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <Link
            href="/dashboard/workspace?courseId=c1"
            className="flex-1 md:flex-none px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm shadow-md transition-all active:scale-95 text-center flex items-center justify-center gap-2"
          >
            <span>▶</span> Start Test
          </Link>
          <Link
            href="/dashboard/courses"
            className="px-4 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-sm transition-colors text-center"
          >
            View Courses
          </Link>
        </div>
      </div>

      {/* ── Two Column Grid: My Courses & Recommendations / Weak Areas ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2 Cols): My Courses Overview + Weekly Chart */}
        <div className="lg:col-span-2 space-y-8">
          {/* Courses Carousel/List */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-lg font-bold text-slate-900">My Courses</h2>
                <p className="text-xs text-slate-500">Track and jump back into your active subjects</p>
              </div>
              <Link
                href="/dashboard/courses"
                className="text-xs font-semibold text-teal-600 hover:text-teal-700 hover:underline flex items-center gap-1"
              >
                View All Courses →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {courses.map((course) => {
                const isSubmitted = !!submittedTests[course.id];
                const res = submittedTests[course.id];

                return (
                  <div
                    key={course.id}
                    className="rounded-2xl border border-slate-200/90 p-4 hover:border-teal-300 hover:shadow-md transition-all flex flex-col justify-between group bg-slate-50/50"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-2xl">{course.icon}</span>
                        {isSubmitted ? (
                          <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                            ✓ {res.score}%
                          </span>
                        ) : (
                          <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full">
                            {course.progress}%
                          </span>
                        )}
                      </div>
                      <h3 className="font-bold text-sm text-slate-900 group-hover:text-teal-600 transition-colors line-clamp-1 mb-1">
                        {course.title}
                      </h3>
                      <p className="text-[11px] text-slate-500 line-clamp-2 mb-3">
                        {course.description}
                      </p>
                    </div>

                    <div>
                      <div className="w-full bg-slate-200 rounded-full h-1.5 mb-3 overflow-hidden">
                        <div
                          className="bg-teal-500 h-1.5 rounded-full"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                      <div className="flex gap-2">
                        <Link
                          href={`/dashboard/courses`}
                          className="flex-1 py-1.5 text-center text-xs font-semibold bg-white border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
                        >
                          Syllabus
                        </Link>
                        <Link
                          href={`/dashboard/workspace?courseId=${course.id}`}
                          className={`flex-1 py-1.5 text-center text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1 ${
                            isSubmitted
                              ? "bg-slate-800 text-white hover:bg-slate-900"
                              : "bg-teal-600 text-white hover:bg-teal-700"
                          }`}
                        >
                          <span>{isSubmitted ? "🔄" : "🤖"}</span>
                          <span>{isSubmitted ? "Retake" : "Test"}</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Weekly Learning Activity */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Weekly Learning Activity</h2>
                <p className="text-xs text-slate-500">Problems solved and study time distribution</p>
              </div>
              <span className="text-xs text-slate-400 font-medium">Last 7 Days</span>
            </div>

            <div className="grid grid-cols-7 gap-2 pt-4 border-t border-slate-100">
              {weeklyActivity.map((day, idx) => {
                const maxQuestions = 6;
                const heightPercent = Math.min(100, (day.questions / maxQuestions) * 100);
                return (
                  <div key={idx} className="flex flex-col items-center gap-2">
                    <span className="text-[11px] font-bold text-slate-700">
                      {day.questions} Qs
                    </span>
                    <div className="w-full max-w-[32px] h-28 bg-slate-100 rounded-xl relative flex items-end overflow-hidden">
                      <div
                        className="w-full bg-gradient-to-t from-teal-600 to-teal-400 rounded-xl transition-all duration-500"
                        style={{ height: `${heightPercent}%` }}
                      />
                    </div>
                    <span className="text-xs font-semibold text-slate-500">{day.day}</span>
                    <span className="text-[10px] text-slate-400 font-medium">
                      {day.timeMins}m
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column (1 Col): Adaptive Weak Areas & Recommendations */}
        <div className="space-y-6">
          {/* Spotlight Recommendation */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-6 border border-amber-200 shadow-sm relative overflow-hidden">
            <div className="flex items-center gap-2 mb-2 text-amber-800 text-xs font-bold uppercase tracking-wider">
              <span>🎯</span> AI Learning Recommendation • {primaryRecommendation.courseIcon} {primaryRecommendation.courseTitle.split(" ")[0]}
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">
              {primaryRecommendation.title}
            </h3>
            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              {primaryRecommendation.reason}
            </p>
            <div className="flex items-center justify-between text-xs font-medium text-amber-900 bg-white/70 p-3 rounded-xl border border-amber-100 mb-4">
              <span>Est. Time: {primaryRecommendation.estimatedMins} mins</span>
              <span className="text-slate-600 font-bold text-[11px]">
                {primaryRecommendation.topic}
              </span>
            </div>
            <Link
              href={`/dashboard/workspace?courseId=${primaryRecommendation.courseId}`}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold text-xs text-center block shadow-md transition-all active:scale-95"
            >
              Start {primaryRecommendation.courseTitle.split(" ")[0]} Test Activity
            </Link>
          </div>

          {/* Areas Needing Practice */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Areas Needing Practice
                </h3>
                <p className="text-[11px] text-slate-500">Grouped by course performance</p>
              </div>
              <Link
                href="/dashboard/progress"
                className="text-xs font-semibold text-teal-600 hover:underline"
              >
                Progress →
              </Link>
            </div>

            <div className="space-y-3">
              {weakTopics.map((topic, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-2xl border border-rose-100 bg-rose-50/40 flex flex-col justify-between gap-2"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-bold text-slate-500 flex items-center gap-1 mb-0.5">
                        <span>{topic.courseIcon}</span>
                        <span>{topic.courseTitle}</span>
                      </div>
                      <span className="font-bold text-xs text-slate-800">{topic.topic}</span>
                    </div>
                    <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full">
                      {topic.accuracy}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-rose-500 h-1.5 rounded-full"
                      style={{ width: `${topic.accuracy}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between pt-1 text-[11px] text-slate-500">
                    <span>Avg Hints: {topic.avgHints}</span>
                    <Link
                      href={`/dashboard/workspace?courseId=${topic.courseId}`}
                      className="text-teal-700 hover:text-teal-800 font-bold hover:underline"
                    >
                      Practice in Test →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Test Mode Banner with 3D Bot teaser */}
          <div className="bg-gradient-to-br from-teal-900 to-slate-900 text-white rounded-3xl p-6 border border-teal-800 shadow-md">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">🤖</span>
              <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">
                Official Test Mode
              </span>
            </div>
            <h3 className="font-bold text-sm mb-1 text-white">
              Take Python Assessment (10 Questions)
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Timed test environment with the 3D AI walking bot. Test your problem-solving skills independently!
            </p>
            <Link
              href="/dashboard/workspace?courseId=c1"
              className="w-full py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs text-center block shadow transition-all active:scale-95"
            >
              Launch Test Mode
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
