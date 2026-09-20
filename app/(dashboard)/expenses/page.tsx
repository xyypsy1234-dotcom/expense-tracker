"use client";

import { useState, useMemo, useEffect } from "react";
import { categories } from "@/features/expenses/schemas/expenseSchema";
import { ExpenseTable } from "@/features/expenses/components/ExpenseTable";
import { useExpenseContext } from "@/features/expenses/context/ExpenseContext";
import { AddExpenseDialog } from "@/features/expenses/components/AddExpenseDialog";

type SortOption = "date-desc" | "date-asc" | "amount-desc" | "amount-asc";

export default function ExpensesPage() {
  const { expenses, isLoadingExpenses, error, retryFetchExpenses } =
    useExpenseContext();
  const [categoryFilter, setCategoryFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("date-desc");
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const visibleExpenses = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    const filtered = expenses.filter((expense) => {
      const searchMatch =
        !normalizedSearch ||
        expense.title.toLowerCase().includes(normalizedSearch) ||
        (expense.note ?? "").toLowerCase().includes(normalizedSearch);

      const categoryMatch =
        !categoryFilter || expense.category === categoryFilter;

      const dateMatch =
        !dateFilter || expense.date.toISOString().slice(0, 10) === dateFilter;
      return searchMatch && categoryMatch && dateMatch;
    });

    return [...filtered].sort((a, b) => {
      switch (sortOption) {
        case "date-asc":
          return a.date.getTime() - b.date.getTime();

        case "date-desc":
          return b.date.getTime() - a.date.getTime();

        case "amount-asc":
          return a.amount - b.amount;

        case "amount-desc":
          return b.amount - a.amount;
        default:
          return 0;
      }
    });
  }, [expenses, searchTerm, categoryFilter, dateFilter, sortOption]);

  const totalItems = visibleExpenses.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);

  const paginatedExpenses = visibleExpenses.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, categoryFilter, dateFilter, sortOption]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-2xl font-bold">Expenses Transactions</h1>
      <div className="flex items-center gap-3">
        <div>
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="rounded-md border p-2"
            placeholder="Search title or note"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="rounded-md border p-2"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="rounded-md border p-2"
        />
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value as SortOption)}
          className="rounded-md border p-2"
        >
          <option value="date-desc">Date: Descending</option>
          <option value="date-asc">Date: Ascending</option>
          <option value="amount-desc">Amount: Descending</option>
          <option value="amount-asc">Amount: Ascending</option>
        </select>
        <AddExpenseDialog />
      </div>
      {isLoadingExpenses ? (
        <p>Loading expenses...</p>
      ) : error ? (
        <div className="flex flex-col gap-1">
          <p className="text-black">{error}</p>
          <button
            type="button"
            onClick={retryFetchExpenses}
            className="w-fit rounded-md bg-gray-200 px-3 py-2 text-sm hover:bg-gray-300 "
          >
            Retry
          </button>
        </div>
      ) : visibleExpenses.length === 0 ? (
        <p>
          {expenses.length === 0
            ? "No expenses yet."
            : "No expenses match your filters."}
        </p>
      ) : (
        <ExpenseTable expenses={paginatedExpenses} />
      )}
      <div>
        {visibleExpenses.length > 0 && (
          <div className="flex items-center justify-start pt-1 text-sm text-gray-500">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className=" pr-3 text-gray-500 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>
            <p>
              {startIndex + 1} - {endIndex} of {totalItems} expenses
            </p>

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              className="  pl-4 text-gray-500 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
