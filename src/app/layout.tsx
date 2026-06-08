import type { ReactNode } from "react";

// Root layout: minimal pass-through.
// All actual html/body/lang/dir is set in app/[locale]/layout.tsx.
// Middleware redirects every request to /en or /ar before Next.js renders.
export default function RootLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
