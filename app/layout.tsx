import "./globals.css";
import type { Metadata } from "next";
import { AuthProvider } from "@/features/auth/context/AuthContext";

export const metadata: Metadata = {
  title: "Expense Tracker",
  description: "Track your expenses",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
