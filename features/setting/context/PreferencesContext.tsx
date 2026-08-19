"use client";

import {
  createContext,
  useState,
  useEffect,
  useContext,
  type ReactNode,
} from "react";

export type Currency = "USD" | "EUR" | "GBP";
export type DateFormat = "DD/MM/YYYY" | "MM/DD/YYYY";

interface PreferencesContextType {
  currency: Currency;
  dateFormat: DateFormat;
  setCurrency: (currency: Currency) => void;
  setDateFormat: (dateFormat: DateFormat) => void;
  formatCurrency: (amount: number) => string;
  formatDate: (date: Date) => string;
}

const PreferencesContext = createContext<PreferencesContextType | undefined>(
  undefined,
);

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<Currency>("EUR");
  const [dateFormat, setDateFormat] = useState<DateFormat>("DD/MM/YYYY");

  useEffect(() => {
    const savedCurrency = localStorage.getItem("currency") as Currency | null;
    const savedDateFormat = localStorage.getItem(
      "dateFormat",
    ) as DateFormat | null;
    if (savedCurrency) {
      setCurrency(savedCurrency);
    }
    if (savedDateFormat) {
      setDateFormat(savedDateFormat);
    }
  }, []);
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IE", {
      style: "currency",
      currency,
      currencyDisplay:"narrowSymbol",
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    if (dateFormat === "DD/MM/YYYY") {
      return date.toLocaleDateString("en-IE");
    } else {
      return date.toLocaleDateString("en-US");
    }
  };

  return (
    <PreferencesContext.Provider
      value={{
        currency,
        dateFormat,
        setCurrency,
        setDateFormat,
        formatCurrency,
        formatDate,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error("usePreferences must be used within a PreferencesProvider");
  }
  return context;
}
