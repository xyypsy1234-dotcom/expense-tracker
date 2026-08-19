import Link from "next/link";
import type { Expense } from "@/features/expenses/types/expense";
import { usePreferences } from "@/features/setting/context/PreferencesContext";

interface RecentTransactionsProps {
  expenses: Expense[];
}

export function RecentTransactions({ expenses }: RecentTransactionsProps) {
  const { formatCurrency, formatDate } = usePreferences();
  return (
    <section className="rounded-xl border bg-white p-2 shadow-sm">
      <div className="mb-1 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Recent Transactions</h2>
        <Link
          href="/expenses"
          className="text-sm font-medium text-green-500 hover:underline"
        >
          View All
        </Link>
      </div>
      {expenses.length === 0 ? (
        <p className="text-sm text-gray-500"> No transactions yet.</p>
      ) : (
        <div className="divide-y">
          {expenses.map((expense) => (
            <div
              key={expense.id}
              className="flex items-center justify-between py-2 first:pt-0 last:pb-0"
            >
              <div>
                <p> {expense.title}</p>
                <div>
                  <span> {expense.category}</span>
                  <span> .</span>
                  <span>{formatDate(expense.date)}</span>
                </div>
              </div>
              <p className="font-semibold"> {formatCurrency(expense.amount)}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
