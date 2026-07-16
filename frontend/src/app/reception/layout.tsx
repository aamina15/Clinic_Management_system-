import { DashboardShell } from "@/components/layout/dashboard-shell";

export default function ReceptionLayout({ children }: { children: React.ReactNode }) {
  return <DashboardShell role="reception">{children}</DashboardShell>;
}
