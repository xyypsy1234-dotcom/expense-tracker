"use client";
interface ReportFiltersProps {
  selectedYear: number;
  setSelectedYear: (year: number) => void;
  years: number[];
}

export function ReportFilters({
  selectedYear,
  setSelectedYear,
  years,
}: ReportFiltersProps) {
  return (
    <select
      value={selectedYear}
      onChange={(e) => setSelectedYear(Number(e.target.value))}
      className="rounded-md border-2 border-gray-300 px-8 py-1"
    >
      {years.map((year) => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    </select>
  );
}
