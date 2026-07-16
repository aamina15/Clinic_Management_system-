import { doctors, recentActivity } from "@/data/mock/clinic-data";
import type { DashboardStat } from "@/types/clinic";
import { StatCards } from "@/components/dashboard/stat-cards";
import { AppointmentsSummary } from "@/components/modules/appointments-view";
import { QueueSummary } from "@/components/modules/queue-view";
import { EmrSummary } from "@/components/modules/emr-view";
import { ActivityIcon } from "@/components/shared/status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { getInitials } from "@/lib/utils";

interface DashboardOverviewProps {
  stats: DashboardStat[];
  showCharts?: boolean;
  showDoctors?: boolean;
  showActivity?: boolean;
  children?: React.ReactNode;
}

export function DashboardOverview({
  stats,
  showDoctors = false,
  showActivity = true,
  children,
}: DashboardOverviewProps) {
  return (
    <div className="space-y-6">
      <StatCards stats={stats} />
      {children}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <AppointmentsSummary />
          {showDoctors && <DoctorsOnDuty />}
        </div>
        <div className="space-y-6">
          <QueueSummary />
          <EmrSummary />
        </div>
      </div>
      {showActivity && <RecentActivityFeed />}
    </div>
  );
}

function DoctorsOnDuty() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Doctors on Duty</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2">
          {doctors.map((doctor) => (
            <div key={doctor.id} className="flex items-center gap-3 rounded-lg border p-3">
              <Avatar>
                <AvatarFallback>{getInitials(doctor.name)}</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{doctor.name}</p>
                <p className="text-xs text-muted-foreground">{doctor.specialty}</p>
              </div>
              <Badge
                variant={
                  doctor.status === "available" ? "success" : doctor.status === "busy" ? "warning" : "secondary"
                }
              >
                {doctor.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function RecentActivityFeed() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentActivity.map((item) => (
            <div key={item.id} className="flex items-start gap-3">
              <div className="mt-1.5">
                <ActivityIcon type={item.type} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm">
                  <span className="font-medium">{item.action}</span>
                  <span className="text-muted-foreground"> — {item.user}</span>
                </p>
                <p className="text-xs text-muted-foreground">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
