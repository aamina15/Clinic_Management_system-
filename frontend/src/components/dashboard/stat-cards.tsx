import {
  Activity,
  Calendar,
  CheckCircle,
  Clock,
  CreditCard,
  DollarSign,
  ListOrdered,
  Pill,
  Timer,
  UserCheck,
  Users,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import type { DashboardStat } from "@/types/clinic";
import { Card, CardContent } from "@/components/ui/card";

const iconMap: Record<string, LucideIcon> = {
  Users,
  Calendar,
  DollarSign,
  Clock,
  ListOrdered,
  CheckCircle,
  Timer,
  UserCheck,
  CreditCard,
  Pill,
  Activity,
};

interface StatCardsProps {
  stats: DashboardStat[];
}

export function StatCards({ stats }: StatCardsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = iconMap[stat.icon] ?? Activity;
        const trendColor =
          stat.trend === "up" ? "text-emerald-600 dark:text-emerald-400" : stat.trend === "down" ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground";

        return (
          <Card key={stat.title} className="relative overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold tracking-tight">{stat.value}</p>
                  {stat.change !== 0 && (
                    <p className={cn("text-xs font-medium", trendColor)}>
                      {stat.change > 0 ? "+" : ""}
                      {stat.change}% from last week
                    </p>
                  )}
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
