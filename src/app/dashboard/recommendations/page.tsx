"use client";

import React, { useState } from "react";
import Link from "next/link";
import { recommendations, Recommendation, courses } from "@/lib/mockData";

export default function RecommendationsPage() {
  const [selectedCourseId, setSelectedCourseId] = useState<string>("all");
  const [filterType, setFilterType] = useState<string>("all");

  // Filter recommendations by selected course AND type
  const filteredRecs = recommendations.filter((r) => {
    const matchesCourse =
      selectedCourseId === "all" || r.courseId === selectedCourseId;
    const matchesType = filterType === "all" || r.type === filterType;
    return matchesCourse && matchesType;
  });

  // Active courses to display sections for
  const activeCourses =
    selectedCourseId === "all"
      ? courses
      : courses.filter((c) => c.id === selectedCourseId);

  return (
    <div className="space-y-8 animate-fade-in max-w-7xl mx-auto">
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            Personalized Recommendations
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            AI-tailored learning activities and test challenges sorted accordingly by enrolled course
          </p>
        </div>

        {/* Secondary Type Filter pills */}
        <div className="flex bg-slate-100 p-1.5 rounded-2xl text-xs font-semibold">
          <button
            onClick={() => setFilterType("all")}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              filterType === "all"
                ? "bg-white text-teal-800 shadow-sm font-bold"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            All Types
          </button>
          <button
            onClick={() => setFilterType("practice")}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              filterType === "practice"
                ? "bg-white text-teal-800 shadow-sm font-bold"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Practice
          </button>
          <button
            onClick={() => setFilterType("review")}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              filterType === "review"
                ? "bg-white text-teal-800 shadow-sm font-bold"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Review
          </button>
          <button
            onClick={() => setFilterType("challenge")}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              filterType === "challenge"
                ? "bg-white text-teal-800 shadow-sm font-bold"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Challenges
          </button>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════
          COURSE SELECTOR FILTER BAR
          Enables quick switching across courses
          ═══════════════════════════════════════════════════ */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
          Filter by Course:
        </span>
        <div className="flex flex-wrap gap-2 text-xs font-semibold">
          <button
            onClick={() => setSelectedCourseId("all")}
            className={`px-4 py-2 rounded-xl transition-all ${
              selectedCourseId === "all"
                ? "bg-teal-600 text-white shadow-md font-bold"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            All Courses ({recommendations.length})
          </button>
          {courses.map((c) => {
            const count = recommendations.filter((r) => r.courseId === c.id).length;
            const isSelected = selectedCourseId === c.id;

            return (
              <button
                key={c.id}
                onClick={() => setSelectedCourseId(c.id)}
                className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-teal-600 text-white shadow-md font-bold"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <span>{c.icon}</span>
                <span>{c.title}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ml-1 ${
                    isSelected ? "bg-white/20 text-white" : "bg-slate-200 text-slate-700"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════
          RECOMMENDATIONS SORTED & GROUPED ACCORDING TO COURSES
          ═══════════════════════════════════════════════════ */}
      <div className="space-y-8">
        {activeCourses.map((course) => {
          const courseRecs = filteredRecs.filter((r) => r.courseId === course.id);

          if (courseRecs.length === 0) return null;

          return (
            <div
              key={course.id}
              className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/90 shadow-sm space-y-6"
            >
              {/* Course Header Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center text-2xl shadow-inner">
                    {course.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-extrabold text-teal-700 uppercase tracking-wider bg-teal-50 px-2.5 py-0.5 rounded-md border border-teal-200">
                        {course.title}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">
                        • {course.instructor}
                      </span>
                    </div>
                    <h2 className="text-lg font-bold text-slate-900 mt-0.5">
                      Recommended Practice for {course.title}
                    </h2>
                  </div>
                </div>

                <Link
                  href={`/dashboard/workspace?courseId=${course.id}`}
                  className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs transition-colors flex items-center gap-1.5 self-start sm:self-auto"
                >
                  <span>🤖</span>
                  <span>Open Full Course Test</span>
                </Link>
              </div>

              {/* Recommendation Cards for this Course */}
              <div className="space-y-4">
                {courseRecs.map((rec) => {
                  const urgencyBadge =
                    rec.urgency === "high"
                      ? "bg-rose-100 text-rose-800 border-rose-200"
                      : rec.urgency === "medium"
                      ? "bg-amber-100 text-amber-800 border-amber-200"
                      : "bg-teal-100 text-teal-800 border-teal-200";

                  return (
                    <div
                      key={rec.id}
                      className="rounded-2xl p-6 border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-teal-300 hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
                    >
                      <div className="space-y-2.5 max-w-2xl">
                        {/* Meta tags */}
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${urgencyBadge}`}
                          >
                            {rec.urgency} Priority
                          </span>
                          <span className="text-xs font-bold text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-md border border-teal-100 uppercase tracking-wider">
                            {rec.type}
                          </span>
                          <span className="text-xs text-slate-500 font-semibold">
                            Topic: {rec.topic}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-base font-bold text-slate-900">
                          {rec.title}
                        </h3>

                        {/* Why recommended explanation */}
                        <div className="bg-white border border-slate-200/80 rounded-2xl p-3.5 text-xs text-slate-700 leading-relaxed">
                          <strong className="text-teal-900 font-semibold block mb-0.5">
                            💡 Why LearnRise recommends this:
                          </strong>
                          {rec.reason}
                        </div>
                      </div>

                      {/* Right side CTA button */}
                      <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end justify-between gap-4 flex-shrink-0">
                        <div className="text-xs text-slate-500 font-medium">
                          ⏱️ Est. Time: <strong className="text-slate-800">{rec.estimatedMins} mins</strong>
                        </div>
                        <Link
                          href={`/dashboard/workspace?courseId=${rec.courseId}`}
                          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-bold text-xs shadow-md shadow-teal-500/20 transition-all active:scale-95 text-center flex items-center justify-center gap-2"
                        >
                          <span>Start {course.title.split(" ")[0]} Activity</span>
                          <span>→</span>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
