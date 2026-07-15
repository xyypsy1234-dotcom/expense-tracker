"use client";
import Link from "next/link";

export function Sidebar() {
  return (
    <aside className="w-64 min-h-screen border-r p-4 shrink-0 ">
      <h2 className="mb-4 text-xl font-bold"> Expense Tracker</h2>
      <nav className="flex flex-col gap-4">
        <Link href="/dashboard"> Dashboard</Link>
        <Link href="/expenses"> Expenses</Link>
        <Link href="/reports"> Reports</Link>
        <Link href="/settings"> Settings</Link>
      </nav>
    </aside>
  );
}
