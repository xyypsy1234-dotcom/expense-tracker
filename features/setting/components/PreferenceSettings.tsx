"use client";

import { useEffect, useState } from "react";

type Currency = "EUR" | "GBP" | "USD";

type DateFormat = "DD/MM/YYYY" | "MM/DD/YYYY";

export function PreferenceSettings() {
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

  const handleSave = () => {
    localStorage.setItem("currency", currency);
    localStorage.setItem("dateFormat", dateFormat);
  };
  return (
    <section className="rounded-lg border bg-white p-3 shadow-sm">
      <div className="mb-1">
        <h2 className="text-lg ">Preferences</h2>
        <p className="text-sm text-gray-500">
          Customize how expenses are displayed.
        </p>
      </div>
      <div className="grid max-w-xl ">
        <div>
          <label htmlFor="currency" className=" pr-3">
            Currency
          </label>
          <select
            id="currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value as Currency)}
            className="rounded-md border p-1"
          >
            <option value="EUR">EUR(€)</option>
            <option value="GBP">British Pound(£)</option>
            <option value="USD">US Dollar($)</option>
          </select>
        </div>
        <div className="mt-4">
          <label htmlFor="dateFormat" className="pr-3">
            Date Format
          </label>
          <select
            id="dateFormat"
            value={dateFormat}
            onChange={(e) => setDateFormat(e.target.value as DateFormat)}
            className="rounded-md border p-2"
          >
            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
          </select>
        </div>
        <div className="mt-4">
          <button
            type="button"
            onClick={handleSave}
            className="rounded-md  bg-green-600 text-white px-2 py-1 hover:bg-green-700 text-sm"
          >
            Save Changes
          </button>
        </div>
      </div>
    </section>
  );
}
