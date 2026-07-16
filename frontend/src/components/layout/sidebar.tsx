"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  BarChart3,
  Calendar,
  CheckCircle,
  Clock,
  CreditCard,
  DollarSign,
  FileText,
  LayoutDashboard,
  ListOrdered,
  Pill,
  Settings,
  Timer,
  UserCheck,
  UserRound,
  Users,
  type LucideIcon,
} from "lucide-react";

import { roleConfigs, type NavConfig } from "@/config/navigation";
import { cn, getInitials } from "@/lib/utils";
import type { UserRole } from "@/types/clinic";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const iconMap: Record<string, LucideIcon> = {
  LayoutDashboard,
  Calendar,
  Users,
  UserRound,
  FileText,
  CreditCard,
  BarChart3,
  Pill,
  Settings,
  Activity,
  CheckCircle,
  Clock,
  DollarSign,
  ListOrdered,
  Timer,
  UserCheck,
};

interface SidebarProps {
  role: UserRole;
  collapsed?: boolean;
}

export function Sidebar({ role, collapsed = false }: SidebarProps) {
  const pathname = usePathname();
  const config = roleConfigs[role];

  return (
    <aside
      className={cn(
        "hidden h-screen flex-col border-r bg-card/50 backdrop-blur-xl transition-all duration-300 lg:flex",
        collapsed ? "w-[72px]" : "w-[var(--sidebar-width)]",
      )}
    >
      <div
        className={cn("flex h-16 items-center border-b px-4", collapsed && "justify-center px-2")}
      >
        <Link href="/" className="flex items-center gap-2.5" aria-label="Go to home">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Activity className="h-4 w-4" />
          </div>
          {!collapsed && (
            <div>
              <span className="text-sm font-bold tracking-tight">ClinicFlow</span>
              <span className="ml-1 text-xs font-medium text-primary">AI</span>
            </div>
          )}
        </Link>
      </div>

      {!collapsed && (
        <div className="px-4 py-3">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {config.label} Portal
          </p>
        </div>
      )}

      <ScrollArea className="flex-1 px-3">
        <nav className="space-y-1 pb-4" aria-label="Sidebar navigation">
          {config.nav.map((item: NavConfig) => {
            const Icon = iconMap[item.icon] ?? LayoutDashboard;
            const isActive =
              pathname === item.href ||
              (item.href !== `/${role}` && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                  collapsed && "justify-center px-2",
                )}
                title={collapsed ? item.title : undefined}
              >
                <Icon className={cn("h-4 w-4 shrink-0", isActive && "text-primary")} />
                {!collapsed && (
                  <>
                    <span className="flex-1">{item.title}</span>
                    {item.badge && (
                      <Badge
                        variant="secondary"
                        className="h-5 min-w-5 justify-center px-1.5 text-[10px]"
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </>
                )}
              </Link>
            );
          })}
        </nav>
      </ScrollArea>

      <Separator />
      <div className={cn("p-4", collapsed && "flex justify-center p-2")}>
        <div className={cn("flex items-center gap-3", collapsed && "justify-center")}>
          <Avatar className="h-9 w-9">
            <AvatarFallback className="text-xs">{getInitials(config.user.name)}</AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{config.user.name}</p>
              <p className="truncate text-xs text-muted-foreground">{config.user.email}</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
