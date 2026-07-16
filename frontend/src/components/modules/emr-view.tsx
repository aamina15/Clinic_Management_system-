"use client";

import { FileText, Heart, Thermometer, Weight } from "lucide-react";

import { medicalRecords } from "@/data/mock/clinic-data";
import { EmptyState, LoadingState } from "@/components/common/feedback-state";
import { formatDate } from "@/lib/utils";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface EmrViewProps {
  filterPatient?: string;
}

export function EmrView({ filterPatient }: EmrViewProps) {
  const records = filterPatient
    ? medicalRecords.filter((r) => r.patientName === filterPatient)
    : medicalRecords;
  const isLoading = false;

  if (isLoading) {
    return (
      <LoadingState
        title="Loading medical records"
        description="Preparing the latest clinical notes and vitals."
      />
    );
  }

  if (records.length === 0) {
    return (
      <div>
        <PageHeader
          title="Electronic Medical Records"
          description="Patient health records and clinical documentation"
        />
        <EmptyState
          title="No records found"
          description="Clinical records for this patient will appear here once they are created."
        />
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Electronic Medical Records"
        description="Patient health records and clinical documentation"
      >
        <Button>
          <FileText className="h-4 w-4" />
          New Record
        </Button>
      </PageHeader>

      <div className="grid gap-4">
        {records.map((record) => (
          <Card key={record.id} className="overflow-hidden">
            <CardHeader className="border-b bg-muted/30">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle className="text-lg">{record.patientName}</CardTitle>
                  <CardDescription>
                    {formatDate(record.date)} · {record.doctorName}
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  View Full Record
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs defaultValue="summary" className="w-full">
                <TabsList className="w-full justify-start rounded-none border-b bg-transparent px-6">
                  <TabsTrigger value="summary">Summary</TabsTrigger>
                  <TabsTrigger value="vitals">Vitals</TabsTrigger>
                  <TabsTrigger value="prescription">Prescription</TabsTrigger>
                </TabsList>
                <TabsContent value="summary" className="p-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <h4 className="mb-2 text-sm font-semibold">Diagnosis</h4>
                      <p className="text-sm text-muted-foreground">{record.diagnosis}</p>
                    </div>
                    <div>
                      <h4 className="mb-2 text-sm font-semibold">Symptoms</h4>
                      <p className="text-sm text-muted-foreground">{record.symptoms}</p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="vitals" className="p-6">
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    <VitalCard
                      icon={Heart}
                      label="Blood Pressure"
                      value={record.vitals.bloodPressure}
                    />
                    <VitalCard
                      icon={Heart}
                      label="Heart Rate"
                      value={`${record.vitals.heartRate} bpm`}
                    />
                    <VitalCard
                      icon={Thermometer}
                      label="Temperature"
                      value={`${record.vitals.temperature}°F`}
                    />
                    <VitalCard icon={Weight} label="Weight" value={`${record.vitals.weight} lbs`} />
                  </div>
                </TabsContent>
                <TabsContent value="prescription" className="p-6">
                  <p className="text-sm">{record.prescription}</p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function VitalCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border p-4 text-center">
      <Icon className="mx-auto mb-2 h-5 w-5 text-primary" />
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 text-lg font-semibold">{value}</p>
    </div>
  );
}

export function EmrSummary() {
  const latest = medicalRecords[0];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Latest Record</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="font-medium">{latest.diagnosis}</p>
        <p className="mt-1 text-sm text-muted-foreground">{latest.patientName}</p>
        <p className="mt-2 text-xs text-muted-foreground">
          {formatDate(latest.date)} · {latest.doctorName}
        </p>
      </CardContent>
    </Card>
  );
}
