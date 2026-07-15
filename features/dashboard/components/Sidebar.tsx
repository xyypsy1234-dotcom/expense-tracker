"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Expenses", href: "/expenses" },
  { label: "Reports", href: "/reports" },
  { label: "Settings", href: "/settings" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen border-r p-4 shrink-0 ">
      <h2 className="mb-4 text-xl font-bold"> Expense Tracker</h2>
      <nav className="flex flex-col gap-4">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-md px-3 py-2 text-sm ${isActive ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-200"}`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
