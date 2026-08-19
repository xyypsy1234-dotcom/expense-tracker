import { Sidebar } from "@/features/dashboard/components/Sidebar";
import { Header } from "@/features/dashboard/components/Header";
import { ExpenseProvider } from "@/features/expenses/context/ExpenseContext";
import { PreferencesProvider } from "@/features/setting/context/PreferencesContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PreferencesProvider>
      <ExpenseProvider>
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex flex-1 flex-col">
            <Header />
            <main className="flex-1 p-4">{children}</main>
          </div>
        </div>
      </ExpenseProvider>
    </PreferencesProvider>
  );
}
