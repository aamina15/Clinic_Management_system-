import {
  adminStats,
  appointmentStatusData,
  revenueChartData,
} from "@/data/mock/clinic-data";
import { DashboardOverview } from "@/components/dashboard/dashboard-overview";
import {
  AppointmentStatusChart,
  RevenueChart,
} from "@/components/charts/clinic-charts";

export default function AdminDashboardPage() {
  return (
    <DashboardOverview stats={adminStats} showDoctors showActivity>
      <div className="grid gap-6 lg:grid-cols-3">
        <RevenueChart data={revenueChartData} />
        <AppointmentStatusChart data={appointmentStatusData} />
      </div>
    </DashboardOverview>
  );
}
