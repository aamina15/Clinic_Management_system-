"use client";

import { Mail, Phone, Plus, Search, Users2 } from "lucide-react";

import { patients } from "@/data/mock/clinic-data";
import { EmptyState, LoadingState } from "@/components/common/feedback-state";
import { formatDate, getInitials } from "@/lib/utils";
import { PageHeader } from "@/components/layout/page-header";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface PatientsViewProps {
  compact?: boolean;
}

export function PatientsView({ compact = false }: PatientsViewProps) {
  const displayPatients = compact ? patients.slice(0, 4) : patients;
  const isLoading = false;

  if (isLoading) {
    return (
      <LoadingState
        title="Loading patients"
        description="Preparing the patient directory and visit history."
      />
    );
  }

  if (compact) {
    return (
      <div className="grid gap-4 sm:grid-cols-2">
        {displayPatients.map((patient) => (
          <Card key={patient.id} className="transition-shadow hover:shadow-md">
            <CardContent className="flex items-start gap-4 p-4">
              <Avatar className="h-12 w-12">
                <AvatarFallback>{getInitials(patient.name)}</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-medium">{patient.name}</p>
                  <Badge variant={patient.status === "active" ? "success" : "secondary"}>
                    {patient.status}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  {patient.id} · {patient.bloodType}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Last visit: {formatDate(patient.lastVisit)}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="Patients" description="Manage patient records and profiles">
        <Button>
          <Plus className="h-4 w-4" />
          Add Patient
        </Button>
      </PageHeader>

      <div className="relative mb-4 max-w-full sm:max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by name, ID, or phone..."
          className="pl-9"
          aria-label="Search patients"
        />
      </div>

      {patients.length === 0 ? (
        <EmptyState
          title="No patients yet"
          description="Patient records will appear here once they’re added to the system."
          icon={Users2}
        />
      ) : (
        <div className="overflow-hidden rounded-xl border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Blood Type</TableHead>
                <TableHead>Insurance</TableHead>
                <TableHead>Last Visit</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback className="text-xs">
                          {getInitials(patient.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{patient.name}</p>
                        <p className="text-xs text-muted-foreground">{patient.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <p className="flex items-center gap-1 text-xs">
                        <Mail className="h-3 w-3" /> {patient.email}
                      </p>
                      <p className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Phone className="h-3 w-3" /> {patient.phone}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>{patient.bloodType}</TableCell>
                  <TableCell className="text-sm">{patient.insuranceProvider}</TableCell>
                  <TableCell>{formatDate(patient.lastVisit)}</TableCell>
                  <TableCell>
                    <Badge variant={patient.status === "active" ? "success" : "secondary"}>
                      {patient.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      View Profile
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
