import type { Expense } from "../types/expense";
import { ExpenseRow } from "./ExpenseRow";

interface ExpenseTableProps {
  expenses: Expense[];
}
const thClass =
  "border border-gray-300 px-4 py-3 font-medium text-center text-sm  bg-gray-200  text-gray-600";

export function ExpenseTable({ expenses }: ExpenseTableProps) {
  return (
    <table className="w-full  border-collapse ">
      <thead>
        <tr>
          <th className={thClass}>Title</th>
          <th className={thClass}>Category</th>
          <th className={thClass}>Amount</th>
          <th className={thClass}>Date</th>
          <th className={thClass}>Note</th>
          <th className={thClass}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((expense) => (
          <ExpenseRow key={expense.id} expense={expense} />
        ))}
      </tbody>
    </table>
  );
}
