"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { getExpenses } from "../services/expense";
import type { Expense } from "../types/expense";
import type { ExpenseFormData } from "../schemas/expenseSchema";

interface ExpenseContextType {
  expenses: Expense[];
  isLoadingExpenses: boolean;
  addExpense: (data: ExpenseFormData) => void;
  updateExpense: (expense: Expense) => void;
  deleteExpense: (id: string) => void;
}

interface ExpenseProviderProps {
  children: ReactNode;
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export function ExpenseProvider({ children }: ExpenseProviderProps) {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoadingExpenses, setIsLoadingExpenses] = useState<boolean>(true);

  useEffect(() => {
    async function fetchExpenses() {
      const data = await getExpenses();
      setExpenses(data);
      setIsLoadingExpenses(false);
    }
    fetchExpenses();
  }, []);

  const addExpense = (data: ExpenseFormData) => {
    const newExpense: Expense = {
      id: crypto.randomUUID(),
      ...data,
    };
    setExpenses((prev) => [...prev, newExpense]);
  };

  const updateExpense = (updatedExpense: Expense) => {
    setExpenses((prev) =>
      prev.map((expense) =>
        expense.id === updatedExpense.id ? updatedExpense : expense,
      ),
    );
  };

  const deleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  };

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        isLoadingExpenses,
        addExpense,
        updateExpense,
        deleteExpense,
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
