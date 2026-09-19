"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
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

interface ExpenseContextType {
  expenses: Expense[];
  isLoadingExpenses: boolean;
  addExpense: (data: ExpenseFormData) => Promise<void>;
  updateExpense: (expense: Expense) => Promise<void>;
  deleteExpense: (id: string) => Promise<void>;
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
      try {
        const data = await getExpenses();
        setExpenses(data);
      } catch (error) {
        console.error("Failed to load expense:", error);
      } finally {
        setIsLoadingExpenses(false);
      }
    }
    fetchExpenses();
  }, []);

  const addExpense = async (data: ExpenseFormData) => {
    const createdExpense = await createExpense(data);
    setExpenses((prev) => [...prev, createdExpense]);
  };

  const updateExpense = async (updatedExpense: Expense) => {
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
  };

  const deleteExpense = async (id: string) => {
    await deleteExpenseApi(id);
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
