"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Question } from "@/lib/mockData";

interface WalkingBot3DProps {
  question?: Question;
  onApplyHint?: (hint: string) => void;
  onApplyAnswer?: (answer: string) => void;
}

export default function WalkingBot3D({
  question,
  onApplyHint,
  onApplyAnswer,
}: WalkingBot3DProps) {
  // Roaming X position across the screen as percentage (min 8%, max 88%)
  const [posX, setPosX] = useState(30);
  const [targetPosX, setTargetPosX] = useState(30);
  const [direction, setDirection] = useState<"right" | "left">("right");
  const [isWalking, setIsWalking] = useState(false);
  const [stepCycle, setStepCycle] = useState(0);

  // Mouse tracking state for cursor-following look
  const [cursorLook, setCursorLook] = useState({
    faceRight: true,
    tiltAngle: 0,
    eyeOffsetX: 0,
    eyeOffsetY: 0,
  });

  // Dialog interaction state
  const [clickCount, setClickCount] = useState(0);
  const [dialogState, setDialogState] = useState<
    "none" | "ask_hint" | "show_hint" | "ask_answer" | "show_answer" | "already_answered"
  >("none");
  const [isHovered, setIsHovered] = useState(false);
  const [isCodeApplied, setIsCodeApplied] = useState(false);

  const botFigureRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(Date.now());
  const mousePosRef = useRef<{ x: number; y: number }>({ x: 400, y: 300 });

  // Boundaries
  const MIN_X = 8;
  const MAX_X = 86;
  const WALK_SPEED = 18; // smooth chasing speed (% of screen per second)

  // Reset code applied status when question changes
  useEffect(() => {
    setIsCodeApplied(false);
  }, [question?.id]);

  // Window mouse movement listener: follows cursor & updates target position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };

      // Calculate target X position along screen based on mouse
      const screenWidth = window.innerWidth || 1200;
      const targetPercent = Math.max(MIN_X, Math.min(MAX_X, (e.clientX / screenWidth) * 100));
      setTargetPosX(targetPercent);

      // Bot look-at calculation
      if (!botFigureRef.current) return;
      const rect = botFigureRef.current.getBoundingClientRect();
      const botCenterX = rect.left + rect.width / 2;
      const botCenterY = rect.top + rect.height / 2;

      const dx = e.clientX - botCenterX;
      const dy = e.clientY - botCenterY;

      // Face toward cursor
      const faceRight = dx >= 0;

      // Head tilt angle toward cursor
      const angle = Math.atan2(dy, Math.abs(dx)) * (180 / Math.PI);
      const clampedTilt = Math.max(-14, Math.min(14, angle * 0.35));

      // Visor eye offset
      const eyeOffsetX = Math.max(-4, Math.min(4, dx * 0.018));
      const eyeOffsetY = Math.max(-3, Math.min(3, dy * 0.018));

      setCursorLook({
        faceRight,
        tiltAngle: clampedTilt,
        eyeOffsetX,
        eyeOffsetY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Smooth, continuous roaming loop following cursor across screen
  useEffect(() => {
    let currentX = posX;

    const animate = () => {
      const now = Date.now();
      const dt = Math.min(0.05, (now - lastTimeRef.current) / 1000);
      lastTimeRef.current = now;

      // When dialog is open or hovered, pause in place
      if (dialogState === "none" && !isHovered) {
        const diffX = targetPosX - currentX;
        const absDiff = Math.abs(diffX);

        if (absDiff > 1.8) {
          // Bot needs to walk toward cursor!
          setIsWalking(true);
          setStepCycle((prev) => (prev + dt * 6.0) % (Math.PI * 2));

          const moveDir = diffX > 0 ? "right" : "left";
          setDirection(moveDir);

          const step = Math.sign(diffX) * Math.min(absDiff, WALK_SPEED * dt);
          currentX = Math.max(MIN_X, Math.min(MAX_X, currentX + step));
          setPosX(currentX);
        } else {
          // Close enough to cursor: stand still, look up at mouse
          setIsWalking(false);
        }
      } else {
        setIsWalking(false);
      }

      animRef.current = requestAnimationFrame(animate);
    };

    lastTimeRef.current = Date.now();
    animRef.current = requestAnimationFrame(animate);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [dialogState, isHovered, targetPosX]);

  const handleBotClick = () => {
    if (clickCount === 0) {
      setDialogState("ask_hint");
    } else if (clickCount === 1) {
      setDialogState("ask_answer");
    } else {
      setDialogState("already_answered");
    }
  };

  const handleAcceptHint = () => {
    const hintText =
      question?.hints?.[0] ||
      "Think about storing seen elements in a hash set to achieve fast O(1) lookups.";
    if (onApplyHint) onApplyHint(hintText);
    setClickCount(1);
    setDialogState("show_hint");
  };

  // Open answer dialog WITHOUT automatically pasting into editor!
  const handleOpenAnswerDialog = () => {
    setClickCount(2);
    setDialogState("show_answer");
  };

  // Only paste into code editor when user explicitly clicks "Apply to Code Editor"
  const handleApplyToEditor = () => {
    if (question?.answer && onApplyAnswer) {
      onApplyAnswer(question.answer);
      setIsCodeApplied(true);
    }
  };

  const closeDialog = () => {
    setDialogState("none");
  };

  // Walking bobbing motion
  const bobbing = isWalking ? Math.abs(Math.sin(stepCycle)) * 4.5 : 0;

  return (
    <div className="fixed bottom-3 sm:bottom-4 left-0 right-0 pointer-events-none z-40 select-none">
      {/* ═══════════════════════════════════════════════════
          FREE-ROAMING 3D BOT (NO BOX CONTAINER!)
          Walks smoothly following the mouse cursor across screen
          ═══════════════════════════════════════════════════ */}
      <div
        ref={botFigureRef}
        className="absolute bottom-0 pointer-events-auto transition-all duration-75 ease-out"
        style={{
          left: `${posX}%`,
          transform: `translateX(-50%)`,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* ═══════════════════════════════════════════════════
            SPEECH BUBBLE POPUP (Elevated z-50, Clean & Spacious)
            ═══════════════════════════════════════════════════ */}
        {dialogState !== "none" && (
          <div className="absolute bottom-[195px] left-1/2 -translate-x-1/2 w-80 sm:w-[440px] bg-white rounded-3xl p-6 shadow-[0_25px_60px_rgba(0,0,0,0.35)] border-2 border-teal-400 z-50 animate-scale-in text-slate-800">
            {/* Close button */}
            <button
              onClick={closeDialog}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center transition-colors text-xs font-bold"
            >
              ✕
            </button>

            {/* State 1: Ask Hint (Click 1) */}
            {dialogState === "ask_hint" && (
              <div>
                <div className="flex items-center gap-2 mb-2 text-teal-700 font-extrabold text-sm">
                  <span className="text-2xl">🤖</span>
                  <span>AI Proctor Bot</span>
                  <span className="text-[10px] uppercase tracking-wider bg-teal-100 text-teal-800 px-2.5 py-0.5 rounded-full ml-auto font-bold">
                    Hint 1 Ready
                  </span>
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-2">
                  Shall I give you a hint?
                </h4>
                <p className="text-xs text-slate-600 mb-5 leading-relaxed">
                  I can give you a conceptual hint to guide your problem-solving approach without giving away the full solution.
                </p>
                <div className="flex gap-2.5">
                  <button
                    onClick={handleAcceptHint}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-bold text-xs shadow-md shadow-teal-500/20 transition-all active:scale-95 flex items-center justify-center gap-1.5"
                  >
                    <span>💡</span> Yes, give me a hint
                  </button>
                  <button
                    onClick={closeDialog}
                    className="py-2.5 px-3.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 font-semibold text-xs transition-colors"
                  >
                    I'll solve it
                  </button>
                </div>
              </div>
            )}

            {/* State 2: Show Hint */}
            {dialogState === "show_hint" && (
              <div>
                <div className="flex items-center gap-2 mb-2 text-teal-700 font-extrabold text-sm">
                  <span className="text-2xl">💡</span>
                  <span>Conceptual Hint</span>
                  <span className="text-[10px] bg-teal-100 text-teal-800 px-2.5 py-0.5 rounded-full ml-auto font-bold">
                    Unlocked
                  </span>
                </div>
                <div className="bg-teal-50/90 border border-teal-200 rounded-2xl p-4 text-xs text-teal-950 leading-relaxed mb-4 font-medium">
                  {question?.hints?.[0] ||
                    "Think about tracking previously seen items in a hash set to achieve fast O(1) membership lookups."}
                </div>
                <p className="text-[11px] text-slate-500 mb-4 italic">
                  Tip: If you're still stuck, click me again and I can provide the full solution and step-by-step breakdown!
                </p>
                <button
                  onClick={closeDialog}
                  className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow transition-colors"
                >
                  Got it! Let me try coding
                </button>
              </div>
            )}

            {/* State 3: Ask Answer (Click 2) */}
            {dialogState === "ask_answer" && (
              <div>
                <div className="flex items-center gap-2 mb-2 text-amber-700 font-extrabold text-sm">
                  <span className="text-2xl">🤖</span>
                  <span>AI Proctor Bot</span>
                  <span className="text-[10px] uppercase tracking-wider bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full ml-auto font-bold">
                    Full Solution
                  </span>
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-2">
                  Shall I answer it?
                </h4>
                <p className="text-xs text-slate-600 mb-5 leading-relaxed">
                  I can reveal the complete working solution and step-by-step conceptual explanation. You can review the code and choose when to apply it into your code editor.
                </p>
                <div className="flex gap-2.5">
                  <button
                    onClick={handleOpenAnswerDialog}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold text-xs shadow-md shadow-orange-500/20 transition-all active:scale-95 flex items-center justify-center gap-1.5"
                  >
                    <span>✨</span> Yes, show solution
                  </button>
                  <button
                    onClick={closeDialog}
                    className="py-2.5 px-3.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 font-semibold text-xs transition-colors"
                  >
                    Not yet
                  </button>
                </div>
              </div>
            )}

            {/* State 4: Show Answer & Explanation (With Explicit "Apply to Code Editor" Button) */}
            {dialogState === "show_answer" && (
              <div className="max-h-[440px] overflow-y-auto pr-1">
                <div className="flex items-center gap-2 mb-2 text-emerald-700 font-extrabold text-sm">
                  <span className="text-2xl">🎯</span>
                  <span>Full Answer & Explanation</span>
                </div>
                <p className="text-xs font-bold text-slate-800 mb-2">
                  {question?.title}
                </p>

                {/* Solution code preview */}
                <div className="bg-slate-950 rounded-2xl p-3.5 mb-3 text-emerald-400 font-mono text-[11px] overflow-x-auto border border-slate-800">
                  <pre>{question?.answer}</pre>
                </div>

                {/* Explanation text */}
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3.5 text-xs text-amber-950 leading-relaxed mb-4">
                  <strong className="block font-bold text-amber-900 mb-1">
                    📖 Step-by-Step Explanation:
                  </strong>
                  {question?.explanation}
                </div>

                {/* Action buttons: Explicit Apply button as requested! */}
                <div className="flex gap-2.5">
                  <button
                    onClick={handleApplyToEditor}
                    disabled={isCodeApplied}
                    className={`flex-1 py-2.5 px-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow ${
                      isCodeApplied
                        ? "bg-emerald-600 text-white cursor-default"
                        : "bg-teal-600 hover:bg-teal-700 text-white active:scale-95 shadow-teal-600/20"
                    }`}
                  >
                    <span>{isCodeApplied ? "✓" : "📋"}</span>
                    <span>{isCodeApplied ? "Applied to Code Editor" : "Apply to Code Editor"}</span>
                  </button>
                  <button
                    onClick={closeDialog}
                    className="py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-semibold"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}

            {/* State 5: Already Answered */}
            {dialogState === "already_answered" && (
              <div>
                <div className="flex items-center gap-2 mb-2 text-teal-700 font-extrabold text-sm">
                  <span className="text-2xl">🤖</span>
                  <span>Solution Available</span>
                </div>
                <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                  You have already unlocked the answer for this question. You can review the explanation or apply it to the code editor.
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setDialogState("show_answer")}
                    className="flex-1 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs"
                  >
                    View Explanation
                  </button>
                  <button
                    onClick={closeDialog}
                    className="py-2 px-3 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}

            {/* Speech bubble pointer notch */}
            <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-5 h-5 bg-white border-r-2 border-b-2 border-teal-400 rotate-45" />
          </div>
        )}

        {/* ── Hover / Status Bubble ── */}
        {dialogState === "none" && (
          <div
            className={`absolute -top-9 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[11px] font-extrabold whitespace-nowrap pointer-events-none transition-all duration-200 ${
              isHovered
                ? "opacity-100 -translate-y-1 bg-teal-600 text-white shadow-lg shadow-teal-600/30 scale-105"
                : "opacity-90 bg-white/95 text-teal-900 border border-teal-300 shadow-md"
            }`}
          >
            {clickCount === 0
              ? "👋 Click me for a Hint!"
              : clickCount === 1
              ? "⚡ Click me for Answer!"
              : "🤖 Solution Unlocked"}
          </div>
        )}

        {/* ═══════════════════════════════════════════════════
            PERFECT 3D BOT BODY (No card / box around it!)
            Crisp, solid body, follows cursor and smoothly roams
            ═══════════════════════════════════════════════════ */}
        <div
          onClick={handleBotClick}
          className="relative cursor-pointer transition-transform duration-100 ease-out hover:scale-105 active:scale-95 flex flex-col items-center"
          title="Click the 3D Proctor Bot for help!"
          style={{
            transform: `scaleX(${
              isWalking
                ? direction === "right"
                  ? 1
                  : -1
                : cursorLook.faceRight
                ? 1
                : -1
            }) rotate(${
              isWalking
                ? direction === "right"
                  ? 3
                  : -3
                : cursorLook.faceRight
                ? cursorLook.tiltAngle
                : -cursorLook.tiltAngle
            }deg) translateY(${-bobbing}px)`,
          }}
        >
          {/* Ground Contact Soft Radial Shadow */}
          <div
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-teal-950/25 rounded-full blur-[4px] transition-all duration-150"
            style={{
              width: `${90 - bobbing * 4}px`,
              height: `${22 - bobbing * 2}px`,
              opacity: 0.85 - bobbing * 0.05,
            }}
          />

          {/* Full High-Resolution 3D Model Character Image */}
          <div className="relative w-36 h-44 flex items-center justify-center">
            <Image
              src={isWalking ? "/images/bot_perfect_walk.png" : "/images/bot_perfect_front.png"}
              alt="3D AI Test Proctor Bot"
              width={144}
              height={176}
              priority
              className="object-contain drop-shadow-[0_14px_28px_rgba(0,0,0,0.28)] transition-all duration-150"
            />

            {/* Glowing Eye Tracking Light (follows mouse cursor) */}
            <div
              className="absolute top-[28%] pointer-events-none transition-transform duration-75"
              style={{
                transform: `translate(${cursorLook.eyeOffsetX}px, ${cursorLook.eyeOffsetY}px)`,
              }}
            >
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-300 shadow-[0_0_12px_#22d3ee] animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
