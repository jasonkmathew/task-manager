// ══════════════════════════════════════════════════════════════
// FILE: page.js (Home Page — Server Component)
// PURPOSE:  This is the root page of the application (route: /).
//           As a Server Component, it contains no state or
//           interactivity — its only job is to import and render
//           the TaskBoard client component, which handles all
//           the task management logic.
// TYPE:     Server Component (default in Next.js App Router).
//           Server Components are rendered on the server and
//           sent as HTML to the browser. They cannot use hooks
//           like useState or useEffect, but they produce faster
//           initial page loads because no JavaScript is shipped
//           for them. The actual interactive logic is delegated
//           to TaskBoard, which is marked 'use client'.
// PROPS:    None — this is a top-level page, not a reusable
//           component. Next.js renders it automatically when
//           the user navigates to the "/" route.
// ══════════════════════════════════════════════════════════════

import TaskBoard from "@/components/TaskBoard";

export default function Home() {
  return (
    // The outer container uses min-h-screen to fill the viewport
    // and centers the TaskBoard both horizontally and vertically.
    // relative + z-10 ensures content sits above the decorative
    // gradient background defined in globals.css (::before pseudo).
    <main className="min-h-screen flex flex-col items-center justify-start px-4 py-8 md:py-12 relative z-10">

      {/* ── APP HEADER ────────────────────────────────────
          The header is outside TaskBoard because it's purely
          presentational — no state or interactivity needed.
          Keeping it here in the Server Component means zero
          extra JavaScript is sent to the client for it. */}
      <div className="text-center mb-8 md:mb-12 animate-fade-in-up">

        {/* App icon — a simple emoji used as a visual anchor.
            The gradient background creates a glowing badge effect */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-secondary/20 border border-accent/30 mb-4 text-3xl shadow-lg shadow-accent-glow">
          ⚡
        </div>

        {/* App title — uses the Outfit heading font for personality.
            The gradient text effect (bg-clip-text + text-transparent)
            makes the title visually striking without using an image */}
        <h1 className="text-4xl md:text-5xl font-extrabold font-heading bg-gradient-to-r from-accent via-emerald-300 to-secondary bg-clip-text text-transparent tracking-tight">
          TaskFlow
        </h1>

        {/* Subtitle — muted color keeps visual hierarchy clear.
            The user's eye goes to the title first, then this */}
        <p className="text-muted text-sm md:text-base mt-2 tracking-wide">
          Organize your day. Get things done.
        </p>
      </div>

      {/* ── TASK BOARD ────────────────────────────────────
          This is the main interactive area. TaskBoard is a
          Client Component that owns all task state and passes
          data/callbacks down to its children. */}
      <TaskBoard />
    </main>
  );
}
