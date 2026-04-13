# ⚡ TaskFlow — Smart Task Manager

A modern, dark-themed task manager built with **Next.js 16**, **React 19**, and **Tailwind CSS v4**. Features a sleek glassmorphism design with neon accent colors and smooth micro-animations.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=flat-square&logo=tailwind-css)

---

## 🚀 Features

| # | Feature | Description |
|---|---------|-------------|
| 1 | **Add Tasks** | Controlled form with input validation — blank tasks are rejected |
| 2 | **Toggle Done** | Click the circle to mark tasks complete; completed tasks show a checkmark and strikethrough |
| 3 | **Delete Tasks** | Hover over a task to reveal the delete button — removes the task permanently |
| 4 | **Filter View** | Three filter buttons (All / Active / Done) with live count badges |
| 5 | **Stats Bar** | Real-time display of total, active, and completed task counts |
| 6 | **Clear Completed** | One-click removal of all done tasks (button appears only when relevant) |
| 7 | **Persist on Refresh** | Tasks are saved to `localStorage` and survive browser refreshes |

---

## 🎨 Design Direction: Dark Mode + Neon Accents

This project uses a **dark mode** design with **vibrant neon accent colors** and **glassmorphism** effects:

- **Color Palette**: Deep navy backgrounds (`#0b0e17`, `#121829`) with neon green (`#06d6a0`) and violet (`#8b5cf6`) accents
- **Typography**: Google Fonts — **Outfit** (headings) and **Inter** (body text) for a modern, clean look
- **Spacing**: Generous padding and rounded corners (`rounded-2xl`, `rounded-3xl`) for a friendly feel
- **Layout**: Centered single-column layout with a frosted glass card container
- **Animations**: Fade-in-up entrance animations, hover glow effects, and staggered list reveals
- **Interactive Elements**: Hover-reveal delete buttons, glowing toggle circles, gradient submit button

---

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css        # Tailwind v4 import + custom design tokens + animations
│   ├── layout.js          # Root layout — Server Component (fonts, metadata, HTML shell)
│   └── page.js            # Home page — Server Component (renders header + TaskBoard)
├── components/
│   ├── TaskBoard.js       # Client Component — owns all state, the "brain" of the app
│   ├── AddTaskForm.js     # Client Component — controlled form for adding tasks
│   ├── FilterBar.js       # Client Component — All/Active/Done filter buttons
│   ├── TaskList.js        # Client Component — renders filtered tasks as TaskCards
│   ├── TaskCard.js        # Client Component — single task row (toggle + delete)
│   └── TaskStats.js       # Client Component — live counts + "Clear Done" button
└── README.md              # This file
```

---

## 🛠️ Setup & Installation

### Prerequisites

- **Node.js** version 20.9 or later
- **npm** (comes with Node.js)

### Running on Mac

If you don't have Node.js installed, the easiest way is with Homebrew:

```bash
# Install Homebrew if you don't have it
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js
brew install node
```

Then clone and run the project:

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/task-manager.git
cd task-manager

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser and you're good to go.

> **Note for Mac users:** If you get a permissions error on `npm install`, don't use `sudo`. Instead, fix your npm permissions or use a Node version manager like `nvm`.

### Running on Windows / Linux

```bash
git clone https://github.com/YOUR_USERNAME/task-manager.git
cd task-manager
npm install
npm run dev
```

### Build for Production

```bash
npm run build
npm start
```

---

## 🧠 Key React Concepts Demonstrated

| Concept | Where Used |
|---------|-----------|
| **useState** (lazy initializer) | `TaskBoard.js` — loads tasks from localStorage on first render |
| **useEffect** (sync with external system) | `TaskBoard.js` — persists tasks to localStorage |
| **Controlled Components** | `AddTaskForm.js` — input value driven by React state |
| **Immutable State Updates** | `TaskBoard.js` — `.map()`, `.filter()`, spread operator |
| **Derived Values** | `TaskBoard.js` — counts and filtered list computed from state |
| **Callback Props** (lifting state up) | All child components fire callbacks to TaskBoard |
| **Conditional Rendering** | `TaskCard.js` (done styling), `TaskStats.js` (clear button), `TaskBoard.js` (empty state) |
| **e.preventDefault()** | `AddTaskForm.js` — prevents browser form reload |
| **typeof window guard** | `TaskBoard.js` — prevents SSR errors with localStorage |
| **key prop in lists** | `TaskList.js` — UUID keys for efficient reconciliation |

---

## 🤖 AI Usage Log

- **Scaffolding & component structure**: Asked AI to generate the initial file structure and component boilerplate following the assignment spec. Reviewed each component to ensure correct React patterns (controlled inputs, immutable updates, proper useEffect dependencies). Changed the design direction to dark mode with neon accents after comparing multiple palette options.

- **Tailwind v4 theme tokens**: Asked AI about Tailwind CSS v4's `@theme inline` syntax since it differs from v3's `tailwind.config.js` approach. Learned that v4 uses CSS-native custom properties registered via `@theme` blocks, which become available as utility classes automatically.

- **Comment depth & accuracy**: Wrote initial comments in plain English, then asked AI to verify technical accuracy — particularly around React's reconciliation algorithm, referential equality checks for state updates, and why derived values shouldn't be stored as state (duplicate state anti-pattern).

---

## 📝 License

This project was created for educational purposes as part of a college course assignment.
