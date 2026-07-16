"use client";

import { Download, Plus, Receipt } from "lucide-react";

import { invoices } from "@/data/mock/clinic-data";
import { EmptyState, LoadingState } from "@/components/common/feedback-state";
import { formatCurrency, formatDate } from "@/lib/utils";
import { PageHeader } from "@/components/layout/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface BillingViewProps {
  filterPatient?: string;
}

export function BillingView({ filterPatient }: BillingViewProps) {
  const data = filterPatient ? invoices.filter((i) => i.patientName === filterPatient) : invoices;
  const totalRevenue = data
    .filter((i) => i.status === "paid")
    .reduce((sum, i) => sum + i.amount, 0);
  const pending = data
    .filter((i) => i.status === "pending" || i.status === "overdue")
    .reduce((sum, i) => sum + i.amount, 0);
  const isLoading = false;

  if (isLoading) {
    return (
      <LoadingState
        title="Loading billing"
        description="Preparing recent invoices and payment status."
      />
    );
  }

  return (
    <div>
      <PageHeader
        title="Billing & Invoices"
        description="Manage payments, invoices, and financial records"
      >
        <Button>
          <Plus className="h-4 w-4" />
          Create Invoice
        </Button>
      </PageHeader>

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Collected
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{formatCurrency(totalRevenue)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-amber-600">{formatCurrency(pending)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Invoices</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{data.length}</p>
          </CardContent>
        </Card>
      </div>

      {data.length === 0 ? (
        <EmptyState
          title="No invoices found"
          description="Outstanding invoices and payment activity will appear here."
          icon={Receipt}
        />
      ) : (
        <div className="overflow-hidden rounded-xl border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-mono text-sm">{invoice.id}</TableCell>
                  <TableCell className="font-medium">{invoice.patientName}</TableCell>
                  <TableCell>{formatDate(invoice.date)}</TableCell>
                  <TableCell className="font-semibold">{formatCurrency(invoice.amount)}</TableCell>
                  <TableCell>
                    <StatusBadge status={invoice.status} type="invoice" />
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {invoice.paymentMethod ?? "—"}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
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
