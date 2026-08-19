"use client";

import {
  usePreferences,
  type Currency,
  type DateFormat,
} from "../context/PreferencesContext";
import { useState } from "react";

export function PreferenceSettings() {
  const { currency, setCurrency, dateFormat, setDateFormat } = usePreferences();
  const [draftCurrency, setDraftCurrency] = useState<Currency>(currency);
  const [draftDateFormat, setDraftDateFormat] =
    useState<DateFormat>(dateFormat);
  const isDirty = draftCurrency !== currency || draftDateFormat !== dateFormat;

  const handleSave = () => {
    setCurrency(draftCurrency);
    setDateFormat(draftDateFormat);
    localStorage.setItem("currency", draftCurrency);
    localStorage.setItem("dateFormat", draftDateFormat);
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
            value={draftCurrency}
            onChange={(e) => setDraftCurrency(e.target.value as Currency)}
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
            value={draftDateFormat}
            onChange={(e) => setDraftDateFormat(e.target.value as DateFormat)}
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
            disabled={!isDirty}
            className="rounded-md  bg-green-600 text-white px-2 py-1 hover:bg-green-700 text-sm disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isDirty ? "Save Changes" : "Saved"}
          </button>
        </div>
      </div>
    </section>
  );
}
