"use client";

import React, { useState } from "react";
import { notifications as initialNotifications, Notification } from "@/lib/mockData";

export default function NotificationsPage() {
  const [items, setItems] = useState<Notification[]>(initialNotifications);
  const [filter, setFilter] = useState<"all" | "unread" | "feedback">("all");

  const unreadCount = items.filter((n) => !n.read).length;

  const handleMarkAllRead = () => {
    setItems(items.map((n) => ({ ...n, read: true })));
  };

  const handleToggleRead = (id: string) => {
    setItems(
      items.map((n) => (n.id === id ? { ...n, read: !n.read } : n))
    );
  };

  const handleDelete = (id: string) => {
    setItems(items.filter((n) => n.id !== id));
  };

  const filteredItems = items.filter((n) => {
    if (filter === "unread") return !n.read;
    if (filter === "feedback") return n.type === "feedback";
    return true;
  });

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl">
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            Notifications
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Stay updated with educator feedback, assignment deadlines, and milestones
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllRead}
            className="px-4 py-2 rounded-xl text-xs font-bold text-teal-700 bg-teal-50 hover:bg-teal-100 border border-teal-200 transition-colors"
          >
            Mark All as Read ({unreadCount})
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-semibold w-fit">
        <button
          onClick={() => setFilter("all")}
          className={`px-3.5 py-1.5 rounded-lg transition-colors ${
            filter === "all" ? "bg-white text-teal-700 shadow-sm" : "text-slate-600 hover:text-slate-900"
          }`}
        >
          All ({items.length})
        </button>
        <button
          onClick={() => setFilter("unread")}
          className={`px-3.5 py-1.5 rounded-lg transition-colors ${
            filter === "unread" ? "bg-white text-teal-700 shadow-sm" : "text-slate-600 hover:text-slate-900"
          }`}
        >
          Unread ({unreadCount})
        </button>
        <button
          onClick={() => setFilter("feedback")}
          className={`px-3.5 py-1.5 rounded-lg transition-colors ${
            filter === "feedback" ? "bg-white text-teal-700 shadow-sm" : "text-slate-600 hover:text-slate-900"
          }`}
        >
          Feedback
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredItems.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80">
            <span className="text-4xl block mb-2">🎉</span>
            <h3 className="font-bold text-slate-800 text-base mb-1">All Caught Up!</h3>
            <p className="text-xs text-slate-500">You have no unread notifications in this filter.</p>
          </div>
        ) : (
          filteredItems.map((n) => (
            <div
              key={n.id}
              className={`rounded-2xl p-5 border transition-all flex items-start justify-between gap-4 ${
                !n.read
                  ? "bg-white border-teal-200/90 shadow-sm ring-1 ring-teal-100"
                  : "bg-slate-50/60 border-slate-200/70 opacity-80 hover:opacity-100"
              }`}
            >
              <div className="flex items-start gap-4">
                <span className="text-2xl mt-0.5">{n.icon}</span>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm text-slate-900">{n.title}</h3>
                    {!n.read && (
                      <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                    )}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed max-w-xl">
                    {n.message}
                  </p>
                  <span className="text-[11px] text-slate-400 font-medium block pt-1">
                    {n.time}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => handleToggleRead(n.id)}
                  className="text-xs font-semibold text-slate-500 hover:text-teal-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                  title={n.read ? "Mark unread" : "Mark read"}
                >
                  {n.read ? "Mark unread" : "Mark read ✓"}
                </button>
                <button
                  onClick={() => handleDelete(n.id)}
                  className="text-xs text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors"
                  title="Dismiss notification"
                >
                  ✕
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
