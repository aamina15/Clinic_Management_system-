"use client";

import { ArrowRight, Clock, UserPlus } from "lucide-react";

import { queueEntries } from "@/data/mock/clinic-data";
import { EmptyState, LoadingState } from "@/components/common/feedback-state";
import { PageHeader } from "@/components/layout/page-header";
import { PriorityBadge, StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function QueueView() {
  const waiting = queueEntries.filter((q) => q.status === "waiting" || q.status === "called");
  const active = queueEntries.filter((q) => q.status === "in-consultation");
  const completed = queueEntries.filter((q) => q.status === "completed");
  const isLoading = false;

  if (isLoading) {
    return (
      <LoadingState
        title="Loading queue"
        description="Preparing the live patient flow and current wait times."
      />
    );
  }

  return (
    <div>
      <PageHeader title="Patient Queue" description="Real-time queue management and patient flow">
        <Button>
          <UserPlus className="h-4 w-4" />
          Check In Patient
        </Button>
      </PageHeader>

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30">
              <Clock className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">{waiting.length}</p>
              <p className="text-sm text-muted-foreground">Waiting</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
              <ArrowRight className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">{active.length}</p>
              <p className="text-sm text-muted-foreground">In Consultation</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
              <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">8 min</p>
              <p className="text-sm text-muted-foreground">Avg. Wait Time</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <QueueColumn
          title="Waiting"
          entries={waiting}
          color="border-amber-200 dark:border-amber-800"
        />
        <QueueColumn
          title="In Consultation"
          entries={active}
          color="border-emerald-200 dark:border-emerald-800"
        />
        <QueueColumn
          title="Completed"
          entries={completed}
          color="border-blue-200 dark:border-blue-800"
        />
      </div>
    </div>
  );
}

function QueueColumn({
  title,
  entries,
  color,
}: {
  title: string;
  entries: typeof queueEntries;
  color: string;
}) {
  return (
    <Card className={cn("border-t-4", color)}>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">
          {title} <span className="text-muted-foreground">({entries.length})</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {entries.length === 0 ? (
          <EmptyState
            title={`No ${title.toLowerCase()} patients`}
            description="This queue stage is clear right now."
          />
        ) : (
          entries.map((entry) => (
            <div key={entry.id} className="rounded-lg border p-4 transition-shadow hover:shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-lg font-bold text-primary">{entry.token}</span>
                  <p className="mt-1 font-medium">{entry.patientName}</p>
                  <p className="text-xs text-muted-foreground">{entry.doctorName}</p>
                </div>
                <PriorityBadge priority={entry.priority} />
              </div>
              <div className="mt-3 flex items-center justify-between">
                <StatusBadge status={entry.status} type="queue" />
                <span className="text-xs text-muted-foreground">
                  {entry.waitTime > 0
                    ? `${entry.waitTime} min wait`
                    : "Checked in " + entry.checkInTime}
                </span>
              </div>
              {entry.status === "waiting" && (
                <Button size="sm" className="mt-3 w-full" variant="outline">
                  Call Patient
                </Button>
              )}
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}

export function QueueSummary() {
  const waiting = queueEntries.filter((q) => q.status === "waiting").length;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Live Queue</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {queueEntries
            .filter((q) => q.status !== "completed")
            .slice(0, 4)
            .map((entry) => (
              <div
                key={entry.id}
                className="flex items-center justify-between rounded-lg bg-muted/50 px-3 py-2"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm font-bold text-primary">{entry.token}</span>
                  <span className="text-sm">{entry.patientName}</span>
                </div>
                <StatusBadge status={entry.status} type="queue" />
              </div>
            ))}
        </div>
        <p className="mt-3 text-xs text-muted-foreground">{waiting} patients waiting</p>
      </CardContent>
    </Card>
  );
}
