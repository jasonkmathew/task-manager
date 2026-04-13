// ══════════════════════════════════════════════════════════════
// FILE: layout.js (Root Layout)
// PURPOSE:  The root layout wraps every page in the application.
//           It sets up the HTML document structure, applies global
//           fonts via next/font/google (which optimizes loading by
//           self-hosting the font files), imports global CSS, and 
//           defines SEO metadata that appears in search results and
//           browser tabs.
// TYPE:     Server Component — this file has no interactivity; it
//           only defines the static HTML shell. Server Components
//           are the default in Next.js App Router and run only on
//           the server, reducing the JavaScript sent to the client.
// ══════════════════════════════════════════════════════════════

import { Inter, Outfit } from "next/font/google";
import "./globals.css";

// next/font/google automatically downloads and self-hosts these
// fonts at build time. This avoids layout shift (CLS) because
// the fonts are available immediately, and it avoids sending
// requests to Google's CDN at runtime (better privacy + speed).
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

// metadata is a special Next.js export that sets <title> and
// <meta> tags. This improves SEO and tells browsers/social media
// what the page is about without any client-side JavaScript.
export const metadata = {
  title: "TaskFlow — Smart Task Manager",
  description: "A modern, dark-themed task manager built with Next.js 16, React 19, and Tailwind CSS v4. Manage your tasks with style.",
};

// RootLayout receives { children } which is whatever page
// component Next.js is currently rendering for the active route.
// Every page automatically gets wrapped in this layout.
export default function RootLayout({ children }) {
  return (
    // lang="en" is important for accessibility — screen readers
    // use it to determine pronunciation. The font CSS variables
    // are applied to <html> so every descendant can use them.
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} h-full antialiased`}
    >
      {/* min-h-screen ensures the body fills the viewport even
          when content is short. The background color comes from
          our custom Tailwind theme token defined in globals.css */}
      <body className="min-h-screen bg-background text-foreground font-sans">
        {children}
      </body>
    </html>
  );
}
