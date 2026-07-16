import type { UserRole } from "@/types/clinic";
import { Navbar } from "@/components/layout/navbar";
import { Sidebar } from "@/components/layout/sidebar";

interface DashboardLayoutProps {
  role: UserRole;
  title?: string;
  children: React.ReactNode;
}

export function DashboardShell({ role, title, children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar role={role} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar role={role} title={title} />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
