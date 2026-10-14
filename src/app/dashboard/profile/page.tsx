"use client";

import React, { useState } from "react";
import { studentProfile, STUDENT_CREDENTIALS } from "@/lib/mockData";

export default function ProfilePage() {
  // Profile form state
  const [name, setName] = useState(studentProfile.name);
  const [department, setDepartment] = useState(studentProfile.department);
  const [grade, setGrade] = useState(studentProfile.grade);
  const [bio, setBio] = useState(
    "Aspiring software engineer passionate about algorithms, Python, and data structures. Learning with LearnRise AI tutor!"
  );
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Password change state
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [passError, setPassError] = useState("");
  const [passSuccess, setPassSuccess] = useState(false);

  // Preference toggles
  const [emailNotify, setEmailNotify] = useState(true);
  const [hintReminders, setHintReminders] = useState(true);

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    setPassError("");
    setPassSuccess(false);

    if (currentPass !== STUDENT_CREDENTIALS.password) {
      setPassError("Current password is incorrect (Default: 123456789).");
      return;
    }
    if (newPass.length < 6) {
      setPassError("New password must be at least 6 characters long.");
      return;
    }
    if (newPass !== confirmPass) {
      setPassError("New passwords do not match.");
      return;
    }

    setPassSuccess(true);
    setCurrentPass("");
    setNewPass("");
    setConfirmPass("");
    setTimeout(() => setPassSuccess(false), 4000);
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl">
      {/* ── Page Header ── */}
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
          Student Profile & Settings
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage your student credentials, academic details, and account preferences
        </p>
      </div>

      {/* ── Top Profile Overview Card ── */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/90 shadow-sm flex flex-col md:flex-row items-center gap-6">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-teal-500 via-teal-600 to-emerald-600 text-white font-extrabold text-2xl flex items-center justify-center shadow-lg shadow-teal-500/20">
          {studentProfile.initials}
        </div>
        <div className="space-y-1 text-center md:text-left flex-1">
          <div className="flex flex-col md:flex-row md:items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900">{name}</h2>
            <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-100 w-fit mx-auto md:mx-0">
              Verified Student
            </span>
          </div>
          <p className="text-xs text-slate-500">{studentProfile.email}</p>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-slate-600 pt-2 font-medium">
            <span>🏫 {department}</span>
            <span>🎓 {grade}</span>
            <span>🔥 {studentProfile.streakDays}-Day Streak</span>
            <span>⚡ Level {studentProfile.level}</span>
          </div>
        </div>
      </div>

      {/* ── Profile Edit Form ── */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/90 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h3 className="text-lg font-bold text-slate-900">Personal Information</h3>
          <p className="text-xs text-slate-500">Update your student name, department, and learning bio</p>
        </div>

        {saveSuccess && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-semibold text-emerald-800">
            ✓ Profile information saved successfully!
          </div>
        )}

        <form onSubmit={handleProfileSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Email Address (Managed by Educator)
              </label>
              <input
                type="email"
                value={studentProfile.email}
                disabled
                className="w-full px-4 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-500 cursor-not-allowed"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Department
              </label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Academic Year
              </label>
              <input
                type="text"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Learning Bio
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md transition-all active:scale-95"
            >
              Save Profile Changes
            </button>
          </div>
        </form>
      </div>

      {/* ── Security & Password Change ── */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/90 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h3 className="text-lg font-bold text-slate-900">Security & Password</h3>
          <p className="text-xs text-slate-500">Update your login password</p>
        </div>

        {passError && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs font-semibold text-rose-800">
            {passError}
          </div>
        )}

        {passSuccess && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-semibold text-emerald-800">
            ✓ Password updated successfully! Use your new password on next login.
          </div>
        )}

        <form onSubmit={handlePasswordChange} className="space-y-4 max-w-md">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Current Password (Default: 123456789)
            </label>
            <input
              type="password"
              value={currentPass}
              onChange={(e) => setCurrentPass(e.target.value)}
              required
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              New Password
            </label>
            <input
              type="password"
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              required
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              required
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-all active:scale-95"
          >
            Update Password
          </button>
        </form>
      </div>

      {/* ── Notification Preferences ── */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/90 shadow-sm space-y-4">
        <div className="border-b border-slate-100 pb-4">
          <h3 className="text-lg font-bold text-slate-900">Learning Preferences</h3>
          <p className="text-xs text-slate-500">Configure how you receive guidance and reminders</p>
        </div>

        <div className="space-y-3">
          <label className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200/70 cursor-pointer">
            <div>
              <span className="font-bold text-xs text-slate-800 block">
                Educator Feedback & Comments
              </span>
              <span className="text-[11px] text-slate-500">
                Receive notifications when educators grade or leave feedback on your problem attempts
              </span>
            </div>
            <input
              type="checkbox"
              checked={emailNotify}
              onChange={(e) => setEmailNotify(e.target.checked)}
              className="w-4 h-4 accent-teal-600 rounded"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200/70 cursor-pointer">
            <div>
              <span className="font-bold text-xs text-slate-800 block">
                AI Hint Assistance In Test Mode
              </span>
              <span className="text-[11px] text-slate-500">
                Enable the 3D Proctor Bot to roam and answer questions during timed tests
              </span>
            </div>
            <input
              type="checkbox"
              checked={hintReminders}
              onChange={(e) => setHintReminders(e.target.checked)}
              className="w-4 h-4 accent-teal-600 rounded"
            />
          </label>
        </div>
      </div>
    </div>
  );
}
