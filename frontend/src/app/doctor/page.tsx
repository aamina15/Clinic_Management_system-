import { doctorStats } from "@/data/mock/clinic-data";
import { DashboardOverview } from "@/components/dashboard/dashboard-overview";
import { PatientsView } from "@/components/modules/patients-view";
import { PageHeader } from "@/components/layout/page-header";

export default function DoctorDashboardPage() {
  return (
    <div className="space-y-8">
      <DashboardOverview stats={doctorStats} showActivity={false} />
      <div>
        <PageHeader title="My Patients" description="Patients under your care today" />
        <PatientsView compact />
      </div>
    </div>
  );
}
