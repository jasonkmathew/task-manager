// ══════════════════════════════════════════════════════════════
// COMPONENT: AddTaskForm
// PURPOSE:   A controlled form that lets the user type a new
//            task title and submit it. This component does NOT
//            own the task list — it only manages its own local
//            input state and signals upward via the onAdd
//            callback when the user submits a valid task.
// PATTERN:   Controlled Component — the input's value is always
//            driven by React state. This means React is the
//            "source of truth" for what the input displays,
//            rather than the DOM. This gives us full control
//            over validation, formatting, and submission logic.
// TYPE:      Client Component ('use client') — needs useState
//            for the controlled input and event handlers for
//            form submission.
// PROPS:
//   onAdd    — callback function provided by TaskBoard. Called
//              with the trimmed task title string when the user
//              submits a valid (non-empty) task. TaskBoard uses
//              this to add the task to its state array.
// ══════════════════════════════════════════════════════════════
'use client';

import { useState } from 'react';

export default function AddTaskForm({ onAdd }) {

  // ── LOCAL STATE: title ─────────────────────────────────────
  // Tracks what the user is currently typing in the input field.
  //
  // WHY is this in state? Because the input is "controlled" —
  // its displayed value must always match this state variable.
  // On every keystroke, onChange updates state, which triggers
  // a re-render, which updates the input's value attribute.
  // This round-trip happens so fast the user doesn't notice.
  //
  // WHY NOT lift this to TaskBoard? Because only this component
  // needs to know the in-progress text. TaskBoard only cares
  // about the final submitted title, not every keystroke.
  // Keeping state as local as possible reduces unnecessary
  // re-renders in other components (performance + simplicity).
  const [title, setTitle] = useState('');

  // handleSubmit is called when the form fires its 'submit'
  // event — either by clicking the button or pressing Enter.
  function handleSubmit(e) {
    // e.preventDefault() stops the browser's DEFAULT form
    // submission behavior, which would cause a full page
    // reload (sending a GET/POST request to the server).
    // In a React SPA, we handle everything in JavaScript —
    // we don't want the browser to navigate away or reload.
    e.preventDefault();

    // Validation: trim() removes whitespace from both ends.
    // If the result is empty, we reject the submission.
    // This prevents adding tasks that are just spaces.
    if (!title.trim()) return;

    // Signal the parent (TaskBoard) with the cleaned title.
    // TaskBoard's handleAdd function will create the task
    // object with an ID and add it to the tasks array.
    onAdd(title.trim());

    // Reset the input field so it's ready for the next task.
    // Because this is a controlled input, clearing the state
    // immediately clears what the user sees in the input.
    setTitle('');
  }

  return (
    // onSubmit on the <form> element is better than onClick
    // on the button because it also handles keyboard submission
    // (pressing Enter). This is an accessibility best practice —
    // users who navigate with keyboards can submit without
    // needing to tab to and click the button.
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex gap-3">

        {/* CONTROLLED INPUT: value={title} ensures the input
            always displays whatever is in state. onChange fires
            on every keystroke and updates state with the new
            value. Without onChange, the input would appear
            "frozen" because React would keep resetting it
            to the (unchanged) state value. */}
        <input
          id="task-input"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs to be done?"
          className="flex-1 bg-surface border border-border rounded-xl px-4 py-3 text-foreground placeholder-muted/60 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 text-sm md:text-base"
          autoComplete="off"
        />

        {/* type="submit" ties this button to the form's onSubmit.
            When clicked (or when Enter is pressed in the input),
            the form's submit event fires and handleSubmit runs.
            The gradient + glow effect on hover makes the primary
            action visually prominent and satisfying to click. */}
        <button
          id="add-task-btn"
          type="submit"
          className="bg-gradient-to-r from-accent to-emerald-400 text-background font-semibold px-6 py-3 rounded-xl hover:shadow-lg hover:shadow-accent-glow hover:scale-[1.02] active:scale-[0.98] text-sm md:text-base whitespace-nowrap"
        >
          + Add
        </button>
      </div>
    </form>
  );
}
