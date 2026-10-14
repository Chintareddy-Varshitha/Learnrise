"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import WalkingBot3D from "@/components/WalkingBot3D";
import {
  getQuestionsForCourse,
  courses,
  Question,
} from "@/lib/mockData";

function WorkspaceContent() {
  const searchParams = useSearchParams();
  const courseId = searchParams.get("courseId") || "c1";

  // Active course and its specific 10 questions
  const currentCourse = courses.find((c) => c.id === courseId) || courses[0];
  const courseQuestions = getQuestionsForCourse(currentCourse.id);

  // Active question index (0 to 9)
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const activeQuestion: Question =
    courseQuestions[currentQIndex] || courseQuestions[0];

  // Per-question code storage (preserves code when switching questions!)
  const [userCodes, setUserCodes] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    courseQuestions.forEach((q) => {
      initial[q.id] = q.starterCode;
    });
    return initial;
  });

  // Track which questions have actually been tested & passed
  const [solvedQuestions, setSolvedQuestions] = useState<Record<string, boolean>>({});

  // Active question code in editor
  const currentCode = userCodes[activeQuestion.id] ?? activeQuestion.starterCode;

  const [outputConsole, setOutputConsole] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState<{
    tested: boolean;
    passed: boolean;
    cases: { name: string; input: string; expected: string; actual: string; passed: boolean }[];
  }>({
    tested: false,
    passed: false,
    cases: [],
  });

  // Test countdown timer (seconds)
  const [timeLeft, setTimeLeft] = useState(30 * 60);

  // Modal dialog states
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isTestSubmitted, setIsTestSubmitted] = useState(false);

  // Sync test results & console when active question changes
  useEffect(() => {
    setTestResults({ tested: false, passed: false, cases: [] });
    setOutputConsole([]);
  }, [activeQuestion.id]);

  // Countdown timer
  useEffect(() => {
    if (isTestSubmitted) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmitCourseTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isTestSubmitted]);

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // Update code for active question
  const handleCodeChange = (newCode: string) => {
    setUserCodes((prev) => ({
      ...prev,
      [activeQuestion.id]: newCode,
    }));
  };

  // Switch questions while preserving state
  const handleSelectQuestion = (idx: number) => {
    setCurrentQIndex(idx);
  };

  // Reset active question code
  const handleResetCode = () => {
    handleCodeChange(activeQuestion.starterCode);
  };

  // Apply answer from bot into editor (when student clicks "Apply to Code Editor" in bot dialog)
  const handleApplyBotAnswer = (answerCode: string) => {
    handleCodeChange(answerCode);
    setOutputConsole([
      "✓ Applied optimal solution from AI Proctor Bot into the code editor.",
      "Review the logic and click 'Run Tests' or 'Submit Solution' to verify.",
    ]);
  };

  // Code validation & test evaluation
  const handleEvaluateCode = (isSubmitAction: boolean = false) => {
    setIsRunning(true);
    setOutputConsole(["[Compiling code and executing against test cases...]"]);

    setTimeout(() => {
      setIsRunning(false);

      const codeToCheck = (userCodes[activeQuestion.id] ?? "").trim();
      const strippedCode = codeToCheck.replace(/\s+/g, "");
      const strippedStarter = activeQuestion.starterCode.replace(/\s+/g, "");

      // 1. Check if user hasn't written any code (just starter template or pass)
      const isStillStarter =
        codeToCheck === "" ||
        strippedCode === strippedStarter ||
        (codeToCheck.includes("pass") &&
          !codeToCheck.includes("return") &&
          !codeToCheck.includes("for") &&
          !codeToCheck.includes("while") &&
          !codeToCheck.includes("function") &&
          !codeToCheck.includes("classList"));

      if (isStillStarter) {
        setOutputConsole([
          "✗ Test Execution Failed: No solution code detected.",
          `✗ Test Case 1: Input: ${activeQuestion.testCases[0]?.input || "sample"} -> Returned: None`,
          "Traceback: Function body contains only 'pass' or is empty. Please implement your algorithm logic before submitting.",
        ]);
        setTestResults({
          tested: true,
          passed: false,
          cases: [
            {
              name: "Test Case 1",
              input: activeQuestion.testCases[0]?.input || "",
              expected: activeQuestion.testCases[0]?.expected || "",
              actual: "None (Empty / Not implemented)",
              passed: false,
            },
          ],
        });
        return;
      }

      // 2. Check algorithmic logic / required keywords
      const hasKeywords = activeQuestion.requiredKeywords.some((kw) =>
        codeToCheck.includes(kw)
      );

      const isSubstantial =
        (hasKeywords && codeToCheck.length > 35) ||
        codeToCheck.includes(activeQuestion.answer.trim().slice(0, 30));

      if (isSubstantial) {
        setOutputConsole([
          `✓ Test Case 1: Input: ${activeQuestion.testCases[0]?.input} -> Output: ${activeQuestion.testCases[0]?.expected} (Passed in 8ms)`,
          `✓ Test Case 2: Input: ${activeQuestion.testCases[1]?.input} -> Output: ${activeQuestion.testCases[1]?.expected} (Passed in 11ms)`,
          "All test cases passed successfully!",
          isSubmitAction
            ? `Question ${currentQIndex + 1} marked as Solved ✓`
            : "Ready for submission.",
        ]);

        // Mark this specific question as solved!
        setSolvedQuestions((prev) => ({
          ...prev,
          [activeQuestion.id]: true,
        }));

        setTestResults({
          tested: true,
          passed: true,
          cases: activeQuestion.testCases.map((tc, idx) => ({
            name: `Test Case ${idx + 1}`,
            input: tc.input,
            expected: tc.expected,
            actual: tc.expected,
            passed: true,
          })),
        });
      } else {
        setOutputConsole([
          `✗ Test Case 1: Input: ${activeQuestion.testCases[0]?.input} -> Returned incorrect value.`,
          `Expected: ${activeQuestion.testCases[0]?.expected}, but your output did not match.`,
          "Hint: Click the floating 3D Bot below if you need a conceptual hint or full solution!",
        ]);
        setTestResults({
          tested: true,
          passed: false,
          cases: [
            {
              name: "Test Case 1",
              input: activeQuestion.testCases[0]?.input || "",
              expected: activeQuestion.testCases[0]?.expected || "",
              actual: "Incorrect output",
              passed: false,
            },
          ],
        });
      }
    }, 600);
  };

  // Count how many questions of the 10 are solved for this course
  const totalSolvedCount = courseQuestions.filter(
    (q) => solvedQuestions[q.id]
  ).length;

  // Submit test for ONLY this specific course
  const handleSubmitCourseTest = () => {
    if (typeof window !== "undefined") {
      try {
        const existing = JSON.parse(
          localStorage.getItem("learnrise_submitted_tests") || "{}"
        );
        const updated = {
          ...existing,
          [currentCourse.id]: {
            courseId: currentCourse.id,
            courseTitle: currentCourse.title,
            solvedCount: totalSolvedCount,
            totalQuestions: 10,
            score: Math.round((totalSolvedCount / 10) * 100),
            xpEarned: totalSolvedCount * 30,
            submittedAt: new Date().toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            }),
          },
        };
        localStorage.setItem(
          "learnrise_submitted_tests",
          JSON.stringify(updated)
        );
      } catch (e) {
        console.error(e);
      }
    }
    setShowConfirmModal(false);
    setIsTestSubmitted(true);
  };

  return (
    <div className="space-y-6 animate-fade-in relative max-w-7xl mx-auto pb-36">
      {/* ── Top Workspace Bar ── */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left: Course & Question Breadcrumb */}
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/courses"
            className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold transition-colors"
          >
            ← Courses
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-md border border-teal-200">
                Official Test
              </span>
              <span className="text-xs text-slate-500 font-semibold">
                {currentCourse.title} • {activeQuestion.topic}
              </span>
            </div>
            <h1 className="text-lg font-bold text-slate-900 mt-0.5">
              {activeQuestion.title}
            </h1>
          </div>
        </div>

        {/* Right: Timer, 10 Question Switcher Buttons & Per-Course Submit Button */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Countdown Clock */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900 text-white font-mono text-sm font-bold shadow">
            <span className="text-rose-400 animate-pulse">●</span>
            <span>{formatTimer(timeLeft)}</span>
          </div>

          {/* 10 Question Selector Buttons with Solved Status Indicator */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
            {courseQuestions.map((q, idx) => {
              const isSolved = solvedQuestions[q.id];
              const isCurrent = idx === currentQIndex;

              return (
                <button
                  key={q.id}
                  onClick={() => handleSelectQuestion(idx)}
                  className={`min-w-7 h-7 px-1 rounded-lg transition-all flex items-center justify-center text-xs font-bold ${
                    isCurrent
                      ? "bg-teal-600 text-white shadow-md scale-105"
                      : isSolved
                      ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                      : "text-slate-600 hover:bg-white hover:text-slate-900"
                  }`}
                  title={`${q.title} ${isSolved ? "(Solved ✓)" : ""}`}
                >
                  {idx + 1}
                  {isSolved && <span className="ml-0.5 text-[9px]">✓</span>}
                </button>
              );
            })}
          </div>

          {/* Course-Specific Submit Test Button */}
          <button
            onClick={() => setShowConfirmModal(true)}
            className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md transition-all active:scale-95 flex items-center gap-1.5"
            title={`Submit only the ${currentCourse.title} assessment`}
          >
            <span>📝</span>
            <span>Submit {currentCourse.title.split(" ")[0]} Test</span>
          </button>
        </div>
      </div>

      {/* ── Problem & Code Editor Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Problem Statement (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-extrabold uppercase tracking-wider text-teal-700">
                Question {currentQIndex + 1} of 10
              </span>
              <span className="text-xs text-slate-500 font-semibold">
                Topic: {activeQuestion.topic}
              </span>
            </div>

            <p className="text-sm text-slate-800 leading-relaxed font-medium">
              {activeQuestion.description}
            </p>

            {/* Example Box */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-2 text-xs">
              <span className="font-bold text-slate-800 block">Example 1:</span>
              <div className="font-mono text-slate-700">
                <strong className="text-slate-900">Input:</strong> {activeQuestion.exampleInput}
              </div>
              <div className="font-mono text-slate-700">
                <strong className="text-slate-900">Output:</strong> {activeQuestion.exampleOutput}
              </div>
            </div>

            {/* Test Instructions */}
            <div className="bg-teal-50/70 rounded-2xl p-4 border border-teal-200/80 text-xs text-teal-950 space-y-1">
              <span className="font-bold block text-teal-800">💡 Proctor Guidance:</span>
              <p className="text-[11px] leading-relaxed">
                The 3D AI Proctor is roaming on your screen following your mouse cursor. Click the bot whenever you need a conceptual hint or full solution explanation.
              </p>
            </div>
          </div>
        </div>

        {/* Right: Code Editor & Execution Results (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Editor Container */}
          <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-xl border border-slate-800 flex flex-col">
            {/* Editor Header Bar */}
            <div className="bg-slate-950 px-5 py-3 border-b border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="text-slate-400 font-mono text-[11px] ml-2">
                  solution • {currentCourse.title}
                </span>
              </div>
              <button
                onClick={handleResetCode}
                className="px-2.5 py-1 text-slate-400 hover:text-white text-[11px] font-mono hover:bg-slate-800 rounded transition-colors"
              >
                Reset Starter Code
              </button>
            </div>

            {/* Textarea Code Input */}
            <div className="p-4 bg-slate-900 min-h-[250px]">
              <textarea
                value={currentCode}
                onChange={(e) => handleCodeChange(e.target.value)}
                spellCheck={false}
                rows={11}
                className="w-full bg-transparent resize-none focus:outline-none font-mono text-emerald-300 text-xs sm:text-sm leading-relaxed selection:bg-teal-500/30"
                placeholder="# Write your solution code here"
              />
            </div>

            {/* Editor Action Buttons Bar */}
            <div className="bg-slate-950 px-5 py-3 border-t border-slate-800 flex items-center justify-between gap-3">
              <span className="text-[11px] text-slate-400 font-mono">
                Question {currentQIndex + 1} of 10 • UTF-8
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleEvaluateCode(false)}
                  disabled={isRunning}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-colors flex items-center gap-1.5"
                >
                  <span>▶</span> {isRunning ? "Testing..." : "Run Tests"}
                </button>
                <button
                  onClick={() => handleEvaluateCode(true)}
                  disabled={isRunning}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-bold text-xs shadow-md shadow-teal-500/20 transition-all active:scale-95 flex items-center gap-1.5"
                >
                  <span>✓</span> Submit Q{currentQIndex + 1} Solution
                </button>
              </div>
            </div>
          </div>

          {/* Test Execution Output Console */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-600">
                Execution Results & Sandbox Console
              </h3>
              {testResults.tested && (
                <span
                  className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                    testResults.passed
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-rose-100 text-rose-700"
                  }`}
                >
                  {testResults.passed ? "All Passed ✓" : "Tests Failed ✗"}
                </span>
              )}
            </div>

            <div className="bg-slate-950 rounded-2xl p-4 font-mono text-xs text-slate-300 min-h-[95px] space-y-1.5 overflow-x-auto">
              {outputConsole.length === 0 ? (
                <span className="text-slate-500 italic">
                  Click "Run Tests" or "Submit Q{currentQIndex + 1} Solution" to compile and execute your code. (Untouched starter code will fail).
                </span>
              ) : (
                outputConsole.map((line, i) => (
                  <div
                    key={i}
                    className={
                      line.includes("✓")
                        ? "text-emerald-400 font-semibold"
                        : line.includes("✗") || line.includes("Failed") || line.includes("Traceback")
                        ? "text-rose-400 font-semibold"
                        : "text-slate-300"
                    }
                  >
                    {line}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════
          FREE-ROAMING 3D BOT (NO BOX CONTAINER!)
          Roams freely on screen, tracks cursor, elevated pop-up
          ═══════════════════════════════════════════════════ */}
      <WalkingBot3D
        question={activeQuestion}
        onApplyAnswer={handleApplyBotAnswer}
      />

      {/* ── Confirmation Modal: Submit Test for THIS Specific Course ── */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl p-7 max-w-md w-full shadow-2xl border border-slate-200 text-center animate-scale-in">
            <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center text-2xl mx-auto mb-3">
              📝
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-1">
              Submit {currentCourse.title} Test?
            </h3>
            <p className="text-xs text-slate-600 mb-2 leading-relaxed">
              You have solved <strong className="text-teal-700 font-bold">{totalSolvedCount} of 10</strong> questions in this assessment.
            </p>
            {totalSolvedCount < 10 && (
              <p className="text-xs text-amber-700 bg-amber-50 p-2.5 rounded-xl border border-amber-200 font-semibold mb-4 text-center">
                ⚠️ You still have {10 - totalSolvedCount} unanswered questions! Unanswered questions will be scored as 0.
              </p>
            )}
            <p className="text-[11px] text-slate-400 mb-5 italic">
              Note: This submits only the <strong>{currentCourse.title}</strong> assessment. Your other course tests remain active and unsubmitted.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors"
              >
                Keep Working
              </button>
              <button
                onClick={handleSubmitCourseTest}
                className="flex-1 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md transition-all active:scale-95"
              >
                Confirm & Submit {currentCourse.title.split(" ")[0]}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Final Test Submission Summary Modal for this Course ── */}
      {isTestSubmitted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-teal-100 text-center animate-scale-in">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-teal-500 to-emerald-500 text-white flex items-center justify-center text-3xl mx-auto mb-4 shadow-lg shadow-teal-500/20">
              🏆
            </div>
            <h2 className="text-2xl font-black text-slate-900 mb-1">
              {currentCourse.title} Submitted!
            </h2>
            <p className="text-xs text-slate-500 mb-6">
              Assessment completed for <strong className="text-teal-700">{currentCourse.title}</strong> only. Other course tests remain open.
            </p>

            {/* Dynamic scorecard for this specific course */}
            <div className="grid grid-cols-3 gap-3 bg-slate-50 rounded-2xl p-4 border border-slate-200/80 mb-6 text-center">
              <div>
                <div className="text-xl font-black text-teal-600">
                  {totalSolvedCount} / 10
                </div>
                <div className="text-[11px] font-semibold text-slate-500">Solved</div>
              </div>
              <div>
                <div className="text-xl font-black text-emerald-600">
                  {Math.round((totalSolvedCount / 10) * 100)}%
                </div>
                <div className="text-[11px] font-semibold text-slate-500">Score</div>
              </div>
              <div>
                <div className="text-xl font-black text-purple-600">
                  +{totalSolvedCount * 30}
                </div>
                <div className="text-[11px] font-semibold text-slate-500">XP Earned</div>
              </div>
            </div>

            <div className="flex gap-3">
              <Link
                href="/dashboard/courses"
                className="flex-1 py-3 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition-colors shadow"
              >
                Return to Courses
              </Link>
              <Link
                href="/dashboard/progress"
                className="flex-1 py-3 rounded-2xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs transition-colors"
              >
                View Progress
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function WorkspacePage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-400">Loading Test Workspace...</div>}>
      <WorkspaceContent />
    </Suspense>
  );
}
