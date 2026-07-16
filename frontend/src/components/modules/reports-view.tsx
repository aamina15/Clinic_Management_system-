"use client";

import { Download } from "lucide-react";

import {
  appointmentStatusData,
  departmentStats,
  revenueChartData,
} from "@/data/mock/clinic-data";
import { PageHeader } from "@/components/layout/page-header";
import {
  AppointmentStatusChart,
  DepartmentChart,
  RevenueChart,
} from "@/components/charts/clinic-charts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ReportsView() {
  return (
    <div>
      <PageHeader title="Reports & Analytics" description="Comprehensive clinic performance insights">
        <Button variant="outline">
          <Download className="h-4 w-4" />
          Export Report
        </Button>
      </PageHeader>

      <div className="grid gap-6">
        <div className="grid gap-6 lg:grid-cols-3">
          <RevenueChart data={revenueChartData} />
          <AppointmentStatusChart data={appointmentStatusData} />
        </div>
        <DepartmentChart data={departmentStats} />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard title="Patient Satisfaction" value="4.8/5" change="+0.2" />
          <MetricCard title="No-show Rate" value="3.2%" change="-1.1%" positive />
          <MetricCard title="Avg. Wait Time" value="8 min" change="-2 min" positive />
          <MetricCard title="Staff Utilization" value="87%" change="+5%" />
        </div>
      </div>
    </div>
  );
}

function MetricCard({
  title,
  value,
  change,
  positive = false,
}: {
  title: string;
  value: string;
  change: string;
  positive?: boolean;
}) {
  const isPositive = positive || change.startsWith("+") || change.startsWith("-") && title.includes("Wait");

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{value}</p>
        <p className={`mt-1 text-xs font-medium ${isPositive ? "text-emerald-600" : "text-muted-foreground"}`}>
          {change} vs last month
        </p>
      </CardContent>
    </Card>
  );
}
