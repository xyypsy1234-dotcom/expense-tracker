"use client";

import { useState, useEffect } from "react";
import { getExpenses } from "../services/expense";
import type { Expense } from "../types/expense";

export function useExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoadingExpenses, setIsLoadingExpenses] = useState(true);

  useEffect(() => {
    async function loadExpenses() {
      const data = await getExpenses();
      setExpenses(data);
      setIsLoadingExpenses(false);
    }
    loadExpenses();
  }, []);

  return { expenses, isLoadingExpenses };
}
