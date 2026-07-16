import { cn } from "@/lib/utils";
import type { AppointmentStatus, InvoiceStatus, QueueStatus } from "@/types/clinic";
import { Badge } from "@/components/ui/badge";

const appointmentVariants: Record<
  AppointmentStatus,
  "success" | "info" | "warning" | "secondary" | "destructive"
> = {
  scheduled: "secondary",
  confirmed: "info",
  "in-progress": "warning",
  completed: "success",
  cancelled: "destructive",
  "no-show": "destructive",
};

const queueVariants: Record<QueueStatus, "warning" | "info" | "success" | "secondary"> = {
  waiting: "warning",
  called: "info",
  "in-consultation": "success",
  completed: "secondary",
};

const invoiceVariants: Record<InvoiceStatus, "success" | "warning" | "destructive" | "info"> = {
  paid: "success",
  pending: "warning",
  overdue: "destructive",
  partial: "info",
};

export function StatusBadge({
  status,
  type,
}: {
  status: string;
  type: "appointment" | "queue" | "invoice" | "stock";
}) {
  const normalizedStatus = status.replace(/-/g, " ");

  if (type === "appointment") {
    const variant = appointmentVariants[status as AppointmentStatus] ?? "secondary";
    return (
      <Badge variant={variant} className="capitalize">
        {normalizedStatus}
      </Badge>
    );
  }

  if (type === "queue") {
    const variant = queueVariants[status as QueueStatus] ?? "secondary";
    return (
      <Badge variant={variant} className="capitalize">
        {normalizedStatus}
      </Badge>
    );
  }

  if (type === "invoice") {
    const variant = invoiceVariants[status as InvoiceStatus] ?? "secondary";
    return (
      <Badge variant={variant} className="capitalize">
        {normalizedStatus}
      </Badge>
    );
  }

  const stockVariant =
    status === "in-stock" ? "success" : status === "low-stock" ? "warning" : "destructive";
  return (
    <Badge variant={stockVariant} className="capitalize">
      {normalizedStatus}
    </Badge>
  );
}

export function PriorityBadge({ priority }: { priority: "normal" | "urgent" }) {
  return (
    <Badge variant={priority === "urgent" ? "destructive" : "secondary"} className="capitalize">
      {priority}
    </Badge>
  );
}

export function ActivityIcon({ type }: { type: string }) {
  const colors: Record<string, string> = {
    appointment: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
    billing: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
    queue: "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
    emr: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
    pharmacy: "bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400",
  };

  return <div className={cn("h-2 w-2 rounded-full", colors[type]?.split(" ")[0] ?? "bg-muted")} />;
}
