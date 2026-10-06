import type { Expense } from "@/features/expenses/types/expense";
import { EditExpenseDialog } from "@/features/expenses/components/EditExpenseDialog";
import { useExpenseContext } from "../context/ExpenseContext";
import { usePreferences } from "@/features/setting/context/PreferencesContext";
import { useState } from "react";

interface ExpenseRowProps {
  expense: Expense;
}

const tdClass =
  "border border-gray-300 px-4 py-3 font-normal text-left text-sm";

export function ExpenseRow({ expense }: ExpenseRowProps) {
  const { deleteExpense } = useExpenseContext();
  const { formatCurrency, formatDate } = usePreferences();
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      setDeleteError(null);
      await deleteExpense(expense.id);
    } catch (error) {
      console.error("Failed to delete expense:", error);
      setDeleteError("Failed to delete expense. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

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
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
            className="rounded-md text-gray-700 bg-red-300 px-2 py-1 hover:bg-red-400 
            disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
        {deleteError && <p className="text-sm text-red-500">{deleteError}</p>}
      </td>
    </tr>
  );
}
