"use client";

import { CalendarDays, Plus, Search } from "lucide-react";

import { appointments } from "@/data/mock/clinic-data";
import { formatDate } from "@/lib/utils";
import { PageHeader } from "@/components/layout/page-header";
import { EmptyState, LoadingState } from "@/components/common/feedback-state";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AppointmentsViewProps {
  showActions?: boolean;
  filterPatient?: string;
}

export function AppointmentsView({ showActions = true, filterPatient }: AppointmentsViewProps) {
  const data = filterPatient
    ? appointments.filter((a) => a.patientName === filterPatient)
    : appointments;
  const today = data.filter((a) => a.date === "2026-07-16");
  const upcoming = data.filter((a) => a.date > "2026-07-16");
  const past = data.filter((a) => a.date < "2026-07-16");
  const isLoading = false;

  const renderTable = (items: typeof appointments) => {
    if (isLoading) {
      return (
        <LoadingState
          title="Loading appointments"
          description="Fetching the latest schedule and availability."
        />
      );
    }

    if (items.length === 0) {
      return (
        <EmptyState
          title="No appointments found"
          description="There are no appointments in this view right now. New bookings will appear here automatically."
          icon={CalendarDays}
        />
      );
    }

    return (
      <div className="overflow-hidden rounded-xl border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient</TableHead>
              <TableHead>Doctor</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Status</TableHead>
              {showActions && <TableHead className="text-right">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((apt) => (
              <TableRow key={apt.id}>
                <TableCell className="font-medium">{apt.patientName}</TableCell>
                <TableCell>{apt.doctorName}</TableCell>
                <TableCell>
                  {formatDate(apt.date)} at {apt.time}
                </TableCell>
                <TableCell>{apt.type}</TableCell>
                <TableCell>{apt.duration} min</TableCell>
                <TableCell>
                  <StatusBadge status={apt.status} type="appointment" />
                </TableCell>
                {showActions && (
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  };

  return (
    <div>
      <PageHeader title="Appointments" description="Manage and schedule patient appointments">
        {showActions && (
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4" />
                New Appointment
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Schedule Appointment</DialogTitle>
                <DialogDescription>Create a new appointment for a patient.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label>Patient</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select patient" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="p1">Michael Thompson</SelectItem>
                      <SelectItem value="p2">Emma Johnson</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Doctor</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select doctor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="d1">Dr. James Wilson</SelectItem>
                      <SelectItem value="d2">Dr. Lisa Park</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>Date</Label>
                    <Input type="date" />
                  </div>
                  <div className="grid gap-2">
                    <Label>Time</Label>
                    <Input type="time" />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Schedule</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </PageHeader>

      <div className="relative mb-4 max-w-full sm:max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search appointments..."
          className="pl-9"
          aria-label="Search appointments"
        />
      </div>

      <Tabs defaultValue="today" className="w-full">
        <TabsList>
          <TabsTrigger value="today">Today ({today.length})</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming ({upcoming.length})</TabsTrigger>
          <TabsTrigger value="past">Past ({past.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="today" className="mt-4">
          {renderTable(today)}
        </TabsContent>
        <TabsContent value="upcoming" className="mt-4">
          {renderTable(upcoming)}
        </TabsContent>
        <TabsContent value="past" className="mt-4">
          {renderTable(past)}
        </TabsContent>
      </Tabs>
    </div>
  );
}

export function AppointmentsSummary() {
  const todayCount = appointments.filter((a) => a.date === "2026-07-16").length;
  const inProgress = appointments.filter((a) => a.status === "in-progress").length;

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Today&apos;s Schedule</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {appointments
            .filter((a) => a.date === "2026-07-16")
            .slice(0, 4)
            .map((apt) => (
              <div key={apt.id} className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <p className="text-sm font-medium">{apt.patientName}</p>
                  <p className="text-xs text-muted-foreground">
                    {apt.time} · {apt.doctorName}
                  </p>
                </div>
                <StatusBadge status={apt.status} type="appointment" />
              </div>
            ))}
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          {todayCount} total today · {inProgress} in progress
        </p>
      </CardContent>
    </Card>
  );
}
