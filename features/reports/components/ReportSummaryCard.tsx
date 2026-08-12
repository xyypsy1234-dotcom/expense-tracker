interface ReportSummaryCardProps {
  title: string;
  value: string ;
  subtitle?: string;
}

export function ReportSummaryCard({
  title,
  value,
  subtitle,
}: ReportSummaryCardProps) {
  return (
    <div className="rounded-xl border bg-white p-1 shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="mt-1 text-sm font-semibold"> {value}</p>
      {subtitle && <p className="mt-1 text-sm text-gray=500">{subtitle}</p>}
    </div>
  );
}
