"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  topicProgress,
  attemptHistory,
  dashboardStats,
  courses,
  getMasteryColor,
} from "@/lib/mockData";

export default function ProgressPage() {
  const [selectedCourseId, setSelectedCourseId] = useState<string>("all");
  const [filterHistoryCourse, setFilterHistoryCourse] = useState<string>("all");

  // Filtered topics by course
  const activeCourses =
    selectedCourseId === "all"
      ? courses
      : courses.filter((c) => c.id === selectedCourseId);

  // Filtered attempt history by course
  const filteredHistory =
    filterHistoryCourse === "all"
      ? attemptHistory
      : attemptHistory.filter((a) => a.courseId === filterHistoryCourse);

  return (
    <div className="space-y-8 animate-fade-in max-w-7xl mx-auto">
      {/* ── Page Header ── */}
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
          My Learning Progress
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Detailed breakdown of concept mastery, AI hint dependency, and question attempt history sorted by course
        </p>
      </div>

      {/* ── Summary Cards ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Course Completion
          </div>
          <div className="text-3xl font-black text-teal-600 mb-1">68%</div>
          <div className="text-xs text-slate-500">Across 3 enrolled courses</div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Questions Solved
          </div>
          <div className="text-3xl font-black text-slate-900 mb-1">
            {dashboardStats.questionsSolved}
          </div>
          <div className="text-xs text-slate-500">Out of {dashboardStats.questionsAttempted} attempts</div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Independent Solutions
          </div>
          <div className="text-3xl font-black text-emerald-600 mb-1">
            {dashboardStats.solvedWithoutHints}
          </div>
          <div className="text-xs text-slate-500">Solved without requesting hints</div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Assisted Solutions
          </div>
          <div className="text-3xl font-black text-purple-600 mb-1">
            {dashboardStats.solvedWithHints}
          </div>
          <div className="text-xs text-slate-500">Solved with AI progressive hints</div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════
          COURSE-SORTED CONCEPT & TOPIC PROGRESS BARS
          Grouped accordingly to Courses, not raw topics!
          ═══════════════════════════════════════════════════ */}
      <div className="space-y-6">
        {/* Section Header & Course Selector Filter */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Concept & Topic Progress by Course
            </h2>
            <p className="text-xs text-slate-500">
              Evaluated based on problem accuracy, independent solve rate, and test results
            </p>
          </div>

          {/* Course Tabs */}
          <div className="flex flex-wrap gap-1.5 bg-slate-100 p-1.5 rounded-2xl text-xs font-semibold">
            <button
              onClick={() => setSelectedCourseId("all")}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                selectedCourseId === "all"
                  ? "bg-white text-teal-800 shadow-sm font-bold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              All Courses ({courses.length})
            </button>
            {courses.map((course) => (
              <button
                key={course.id}
                onClick={() => setSelectedCourseId(course.id)}
                className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                  selectedCourseId === course.id
                    ? "bg-white text-teal-800 shadow-sm font-bold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <span>{course.icon}</span>
                <span>{course.title.split(" ")[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Course Groups */}
        <div className="space-y-6">
          {activeCourses.map((course) => {
            const courseTopics = topicProgress.filter((t) => t.courseId === course.id);

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
                      <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                        {course.title} Topic Mastery
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl">
                      Overall: <strong className="text-teal-700">{course.progress}%</strong>
                    </span>
                    <Link
                      href={`/dashboard/workspace?courseId=${course.id}`}
                      className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md transition-all active:scale-95 flex items-center gap-1.5"
                    >
                      <span>🤖</span>
                      <span>Take Test</span>
                    </Link>
                  </div>
                </div>

                {/* Topic Progress Bars Grid for this Course */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {courseTopics.map((t, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl border border-slate-200/90 bg-slate-50/60 hover:bg-white hover:border-teal-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                    >
                      <div>
                        {/* Topic Header & Mastery Badge */}
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h4 className="font-bold text-sm text-slate-900 leading-snug">
                            {t.topic}
                          </h4>
                          <span
                            className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full text-white flex-shrink-0"
                            style={{ background: getMasteryColor(t.mastery) }}
                          >
                            {t.mastery}
                          </span>
                        </div>

                        <div className="text-[11px] text-slate-500 font-medium mb-3">
                          {t.solved} / {t.attempted} problems solved • Avg hints: {t.avgHints}
                        </div>

                        {/* Visual Progress Bar */}
                        <div className="space-y-1.5">
                          <div className="flex justify-between text-xs font-bold text-slate-700">
                            <span>Accuracy</span>
                            <span style={{ color: getMasteryColor(t.mastery) }}>
                              {t.accuracy}%
                            </span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                            <div
                              className="h-2.5 rounded-full transition-all duration-500"
                              style={{
                                width: `${t.accuracy}%`,
                                background: getMasteryColor(t.mastery),
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Action Link to Workspace Test */}
                      <div className="pt-2 border-t border-slate-200/70 flex justify-end">
                        <Link
                          href={`/dashboard/workspace?courseId=${course.id}`}
                          className="text-xs font-bold text-teal-700 hover:text-teal-800 hover:underline flex items-center gap-1"
                        >
                          <span>Practice in Test</span>
                          <span>→</span>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Attempt History Table ── */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/90 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Recent Attempt History</h2>
            <p className="text-xs text-slate-500">
              Audit trail of every submitted problem, hints requested, and time spent
            </p>
          </div>

          {/* Course filter pills for history */}
          <div className="flex flex-wrap gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setFilterHistoryCourse("all")}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                filterHistoryCourse === "all"
                  ? "bg-white text-teal-700 shadow-sm font-bold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              All Courses
            </button>
            {courses.map((course) => (
              <button
                key={course.id}
                onClick={() => setFilterHistoryCourse(course.id)}
                className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 ${
                  filterHistoryCourse === course.id
                    ? "bg-white text-teal-700 shadow-sm font-bold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <span>{course.icon}</span>
                <span>{course.title.split(" ")[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="text-[11px] uppercase tracking-wider text-slate-500 bg-slate-50/70 border-b border-slate-200">
              <tr>
                <th className="py-3 px-4 font-bold">Course</th>
                <th className="py-3 px-4 font-bold">Question</th>
                <th className="py-3 px-4 font-bold">Topic</th>
                <th className="py-3 px-4 font-bold">Date</th>
                <th className="py-3 px-4 font-bold text-center">Attempts</th>
                <th className="py-3 px-4 font-bold text-center">Hints Used</th>
                <th className="py-3 px-4 font-bold text-center">Status</th>
                <th className="py-3 px-4 font-bold text-right">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredHistory.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-slate-900 flex items-center gap-1.5">
                    <span className="text-xs px-2 py-0.5 rounded-md bg-teal-50 text-teal-800 border border-teal-200 font-bold">
                      {item.courseTitle.split(" ")[0]}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-900">
                    {item.questionTitle}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 font-medium">{item.topic}</td>
                  <td className="py-3.5 px-4 text-slate-500 font-mono text-xs">{item.date}</td>
                  <td className="py-3.5 px-4 text-center font-bold text-slate-700">
                    {item.attempts}
                  </td>
                  <td className="py-3.5 px-4 text-center font-bold text-purple-700">
                    {item.hintsUsed}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span
                      className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        item.solved
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-rose-100 text-rose-800"
                      }`}
                    >
                      {item.solved ? "Solved ✓" : "Unsolved ✗"}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right text-slate-600 font-mono text-xs">
                    {item.timeMins}m
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
