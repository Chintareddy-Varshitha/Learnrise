"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { courses, Course } from "@/lib/mockData";

interface SubmittedTestRecord {
  courseId: string;
  courseTitle: string;
  solvedCount: number;
  totalQuestions: number;
  score: number;
  xpEarned: number;
  submittedAt: string;
}

export default function CoursesPage() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [search, setSearch] = useState("");
  const [submittedTests, setSubmittedTests] = useState<Record<string, SubmittedTestRecord>>({});

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

  const filteredCourses = courses.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase()) ||
      c.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchesSearch;
  });

  return (
    <div className="space-y-8 animate-fade-in max-w-7xl mx-auto">
      {/* ═══════════════════════════════════════════════════
          VIEW 1: ALL COURSE CARDS (Clean, Standalone Grid)
          Only shown when no course is actively opened
          ═══════════════════════════════════════════════════ */}
      {!selectedCourse ? (
        <div className="space-y-6">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                My Courses
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Select a course to view its syllabus or start your official 10-question assessment
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                placeholder="Search courses..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 shadow-sm transition-all"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">
                🔍
              </span>
            </div>
          </div>

          {/* Standalone Course Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {filteredCourses.map((course) => {
              const testResult = submittedTests[course.id];
              const isSubmitted = !!testResult;

              return (
                <div
                  key={course.id}
                  className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-teal-300 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Top Icon & Progress */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center text-3xl shadow-inner group-hover:scale-105 transition-transform">
                        {course.icon}
                      </div>
                      {isSubmitted ? (
                        <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                          <span>✓</span> Test: {testResult.score}%
                        </span>
                      ) : (
                        <span className="text-xs font-black text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-100">
                          {course.progress}% Completed
                        </span>
                      )}
                    </div>

                    {/* Title & Instructor */}
                    <h2 className="text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors mb-1">
                      {course.title}
                    </h2>
                    <p className="text-xs font-medium text-slate-400 mb-3">
                      {course.instructor} • {course.totalStudents} Students
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed mb-5 line-clamp-3">
                      {course.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {course.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-lg"
                        >
                          {tag}
                        </span>
                      ))}
                      <span className="text-[10px] font-bold bg-teal-100 text-teal-800 px-2.5 py-0.5 rounded-lg">
                        10 Questions
                      </span>
                    </div>
                  </div>

                  {/* Progress bar and Single Action Buttons */}
                  <div className="space-y-4 pt-4 border-t border-slate-100">
                    <div>
                      <div className="flex justify-between text-xs font-semibold text-slate-500 mb-1.5">
                        <span>Curriculum Progress</span>
                        <span className="text-slate-800 font-bold">{course.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-teal-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Clean Action Buttons */}
                    <div className="flex items-center gap-2.5 pt-1">
                      {/* Primary Action: Take Test or Retake Test */}
                      <Link
                        href={`/dashboard/workspace?courseId=${course.id}`}
                        className={`flex-1 py-3 rounded-2xl font-bold text-xs text-center shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5 ${
                          isSubmitted
                            ? "bg-slate-800 hover:bg-slate-900 text-white shadow-slate-800/20"
                            : "bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white shadow-teal-500/20"
                        }`}
                      >
                        <span>{isSubmitted ? "🔄" : "🤖"}</span>
                        <span>{isSubmitted ? "Retake Test" : "Take Test"}</span>
                      </Link>

                      {/* Secondary Action: View Syllabus Details */}
                      <button
                        onClick={() => setSelectedCourse(course)}
                        className="px-4 py-3 rounded-2xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs transition-colors"
                      >
                        Syllabus
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* ═══════════════════════════════════════════════════
           VIEW 2: DEDICATED SYLLABUS & MODULES VIEW
           Completely separated — never combined with cards!
           ═══════════════════════════════════════════════════ */
        <div className="space-y-6">
          {/* Back Button to return to all course cards */}
          <button
            onClick={() => setSelectedCourse(null)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-50 text-xs font-bold transition-all shadow-sm"
          >
            <span>←</span> Back to All Courses
          </button>

          {/* Standalone Course Syllabus Header */}
          <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 rounded-3xl text-white p-6 md:p-8 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-3 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="text-3xl">{selectedCourse.icon}</span>
                  <span className="text-xs uppercase tracking-wider text-teal-300 font-extrabold bg-teal-900/60 px-3 py-1 rounded-full border border-teal-700">
                    Course Syllabus
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    • {selectedCourse.instructor}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                  {selectedCourse.title}
                </h2>
                <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                  {selectedCourse.description}
                </p>
                <div className="flex items-center gap-4 text-xs font-semibold text-teal-200 pt-1">
                  <span>📚 {selectedCourse.modules.length} Modules</span>
                  <span>
                    ⏱️ {selectedCourse.modules.reduce((a, b) => a + b.lessons.length, 0)} Total Lessons
                  </span>
                  <span>📝 10 Assessment Questions</span>
                </div>
              </div>

              {/* Single Action: Take Test */}
              <Link
                href={`/dashboard/workspace?courseId=${selectedCourse.id}`}
                className="px-7 py-4 rounded-2xl bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 text-slate-950 font-black text-sm shadow-xl shadow-teal-400/25 transition-all active:scale-95 text-center flex items-center justify-center gap-2 flex-shrink-0"
              >
                <span className="text-xl">🤖</span>
                <span>
                  {submittedTests[selectedCourse.id] ? "Retake Test" : "Start Test (10 Questions)"}
                </span>
              </Link>
            </div>
          </div>

          {/* Modules List */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/90 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Course Modules & Curriculum
                </h3>
                <p className="text-xs text-slate-500">
                  Complete lessons and review topics before taking the test
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {selectedCourse.modules.map((mod, mIdx) => (
                <div
                  key={mod.id}
                  className="border border-slate-200 rounded-2xl p-5 hover:border-teal-200 transition-colors bg-slate-50/40"
                >
                  <h4 className="font-bold text-sm text-slate-900 mb-3 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-teal-100 text-teal-800 text-xs flex items-center justify-center font-extrabold">
                      {mIdx + 1}
                    </span>
                    <span>{mod.title}</span>
                  </h4>

                  <div className="space-y-2 pl-8">
                    {mod.lessons.map((lesson) => (
                      <div
                        key={lesson.id}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-100 text-xs"
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                              lesson.completed
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-slate-100 text-slate-400"
                            }`}
                          >
                            {lesson.completed ? "✓" : "○"}
                          </span>
                          <span
                            className={
                              lesson.completed
                                ? "text-slate-800 font-medium"
                                : "text-slate-600"
                            }
                          >
                            {lesson.title}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-400 font-mono">
                          {lesson.durationMins}m
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
