import { redirect } from "next/navigation";

// This page is never reached in practice.
// The middleware always redirects / to /en or /ar.
export default function RootPage() {
  redirect("/en");
}
