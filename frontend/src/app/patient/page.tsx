import { patientStats } from "@/data/mock/clinic-data";
import { StatCards } from "@/components/dashboard/stat-cards";
import { AppointmentsSummary } from "@/components/modules/appointments-view";
import { EmrSummary } from "@/components/modules/emr-view";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Pill } from "lucide-react";

const prescriptions = [
  { name: "Lisinopril 10mg", dosage: "Once daily", refills: 2 },
  { name: "Aspirin 81mg", dosage: "Once daily", refills: 5 },
  { name: "Vitamin D3 2000IU", dosage: "Once daily", refills: 3 },
];

export default function PatientDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Welcome back, Michael</h2>
        <p className="text-muted-foreground">Here&apos;s an overview of your health portal</p>
      </div>
      <StatCards stats={patientStats} />
      <div className="grid gap-6 lg:grid-cols-2">
        <AppointmentsSummary />
        <EmrSummary />
      </div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="text-base">Active Prescriptions</CardTitle>
          <Pill className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="space-y-3">
          {prescriptions.map((rx) => (
            <div key={rx.name} className="flex items-center justify-between rounded-lg border p-3">
              <div>
                <p className="font-medium">{rx.name}</p>
                <p className="text-xs text-muted-foreground">{rx.dosage}</p>
              </div>
              <Badge variant="secondary">{rx.refills} refills left</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="font-semibold">Need to see your doctor?</p>
              <p className="text-sm text-muted-foreground">Book your next appointment in seconds</p>
            </div>
          </div>
          <Button>Book Appointment</Button>
        </CardContent>
      </Card>
    </div>
  );
}
