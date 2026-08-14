interface ExportCsvButtonProps {
  data: Record<string, string>[];
  year: number;
}

export function ExportCsvButton({ data, year }: ExportCsvButtonProps) {
  const handleExport = () => {
    if (data.length === 0) {
      return;
    }

    const headers = Object.keys(data[0]);
    const rows = data.map((item) =>
      headers.map((header) => {
        const value = item[header] ?? "";
        return `"${String(value).replace(/"/g, '""')}"`;
      }),
    );

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob(["\uFEFF" + csvContent], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `expenses_${year}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button
      type="button"
      onClick={handleExport}
      disabled={data.length === 0}
      className="rounded-md bg-green-500 text-white px-4 py-1 hovser:bg-green-700"
    >
      Export CSV
    </button>
  );
}
