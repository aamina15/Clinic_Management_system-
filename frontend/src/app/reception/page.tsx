import { receptionStats } from "@/data/mock/clinic-data";
import { DashboardOverview } from "@/components/dashboard/dashboard-overview";

export default function ReceptionDashboardPage() {
  return <DashboardOverview stats={receptionStats} showActivity />;
}
