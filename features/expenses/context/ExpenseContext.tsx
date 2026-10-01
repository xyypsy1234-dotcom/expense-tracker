"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import {
  getExpenses,
  createExpense,
  updateExpense as updateExpenseApi,
  deleteExpense as deleteExpenseApi,
} from "../services/expenseApi";
import type { Expense } from "../types/expense";
import type { ExpenseFormData } from "../schemas/expenseSchema";
import { ApiError } from "@/features/shared/utils/ApiError";
import { useAuth } from "@/features/auth/context/AuthContext";

interface ExpenseContextType {
  expenses: Expense[];
  isLoadingExpenses: boolean;
  addExpense: (data: ExpenseFormData) => Promise<void>;
  updateExpense: (expense: Expense) => Promise<void>;
  deleteExpense: (id: string) => Promise<void>;
  error: string | null;
  retryFetchExpenses: () => void;
}

interface ExpenseProviderProps {
  children: ReactNode;
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export function ExpenseProvider({ children }: ExpenseProviderProps) {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoadingExpenses, setIsLoadingExpenses] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { clearUser } = useAuth();
  const fetchExpenses = useCallback(async () => {
    try {
      setIsLoadingExpenses(true);
      setError(null);
      const data = await getExpenses();
      setExpenses(data);
    } catch (error) {
      console.error("Failed to load expense:", error);
      if (error instanceof ApiError && error.status === 401) {
        clearUser();
        return;
      }
      setError("Failed to load expenses. Please try again.");
    } finally {
      setIsLoadingExpenses(false);
    }
  }, [clearUser]);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  const retryFetchExpenses = () => {
    fetchExpenses();
  };

  const addExpense = async (data: ExpenseFormData) => {
    try {
      const createdExpense = await createExpense(data);
      setExpenses((prev) => [...prev, createdExpense]);
    } catch (error) {
      console.error("Failed to add expense:", error);
      if (error instanceof ApiError && error.status === 401) {
        clearUser();
      }
      throw error;
    }
  };

  const updateExpense = async (updatedExpense: Expense) => {
    try {
      const updatedData = await updateExpenseApi(updatedExpense.id, {
        title: updatedExpense.title,
        category: updatedExpense.category,
        amount: updatedExpense.amount,
        date: updatedExpense.date,
        note: updatedExpense.note,
      });
      setExpenses((prev) =>
        prev.map((expense) =>
          expense.id === updatedData.id ? updatedData : expense,
        ),
      );
    } catch (error) {
      console.error("Failed to update expense:", error);
      if (error instanceof ApiError && error.status === 401) {
        clearUser();
      }
      throw error;
    }
  };

  const deleteExpense = async (id: string) => {
    try {
      await deleteExpenseApi(id);
      setExpenses((prev) => prev.filter((expense) => expense.id !== id));
    } catch (error) {
      console.error("Failed to delete expense:", error);
      if (error instanceof ApiError && error.status === 401) {
        clearUser();
      }
      throw error;
    }
  };

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        isLoadingExpenses,
        addExpense,
        updateExpense,
        deleteExpense,
        error,
        retryFetchExpenses,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
}

export function useExpenseContext() {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error("useExpenseContext must be used within an ExpenseProvider");
  }
  return context;
}
