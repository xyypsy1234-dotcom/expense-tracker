import type { Expense } from "@/features/expenses/types/expense";
import { EditExpenseDialog } from "@/features/expenses/components/EditExpenseDialog";

interface ExpenseRowProps {
  expense: Expense;
}

const tdClass =
  "border border-gray-300 px-4 py-3 font-normal text-left text-sm";

export function ExpenseRow({ expense }: ExpenseRowProps) {
  return (
    <tr>
      <td className={tdClass}>{expense.title}</td>

      <td className={tdClass}>{expense.category}</td>

      <td className={`text-right ${tdClass}`}>€{expense.amount.toFixed(2)}</td>

      <td className={tdClass}>{expense.date.toLocaleDateString("en-IE")}</td>
      <td className={tdClass}>{expense.note}</td>

      <td className={tdClass}>
        <div className="flex justify-center gap-3">
          <EditExpenseDialog expense={expense} />
          <button className="rounded-md bg-red-300 px-2 py-1 hover:bg-red-500">
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}
