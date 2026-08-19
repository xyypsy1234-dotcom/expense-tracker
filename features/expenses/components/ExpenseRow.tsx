import type { Expense } from "@/features/expenses/types/expense";
import { EditExpenseDialog } from "@/features/expenses/components/EditExpenseDialog";
import { useExpenseContext } from "../context/ExpenseContext";
import { usePreferences } from "@/features/setting/context/PreferencesContext";

interface ExpenseRowProps {
  expense: Expense;
}

const tdClass =
  "border border-gray-300 px-4 py-3 font-normal text-left text-sm";

export function ExpenseRow({ expense }: ExpenseRowProps) {
  const { deleteExpense } = useExpenseContext();
  const { formatCurrency, formatDate } = usePreferences();

  return (
    <tr>
      <td className={tdClass}>{expense.title}</td>

      <td className={tdClass}>{expense.category}</td>

      <td className={`text-right ${tdClass}`}>
        {formatCurrency(expense.amount)}
      </td>

      <td className={tdClass}>{formatDate(expense.date)}</td>
      <td className={tdClass}>{expense.note}</td>

      <td className={tdClass}>
        <div className="flex justify-center gap-3">
          <EditExpenseDialog expense={expense} />
          <button
            onClick={() => deleteExpense(expense.id)}
            className="rounded-md text-gray-700 bg-red-300 px-2 py-1 hover:bg-red-400"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}
