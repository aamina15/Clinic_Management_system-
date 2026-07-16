"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  BarChart3,
  Bell,
  Calendar,
  CreditCard,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  Pill,
  Search,
  Settings,
  UserRound,
  Users,
  type LucideIcon,
} from "lucide-react";

import { roleConfigs, type NavConfig } from "@/config/navigation";
import { cn, getInitials } from "@/lib/utils";
import type { UserRole } from "@/types/clinic";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ThemeSwitcher } from "@/components/layout/theme-switcher";

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
};

interface NavbarProps {
  role: UserRole;
  title?: string;
}

export function Navbar({ role, title }: NavbarProps) {
  const pathname = usePathname();
  const config = roleConfigs[role];

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-3 border-b bg-background/80 px-3 backdrop-blur-xl sm:gap-4 sm:px-4 lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 p-0">
          <SheetHeader className="border-b p-4">
            <SheetTitle className="flex items-center gap-2 text-left">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Activity className="h-4 w-4" />
              </div>
              ClinicFlow AI
            </SheetTitle>
          </SheetHeader>
          <nav className="space-y-1 p-3" aria-label="Mobile navigation">
            {config.nav.map((item: NavConfig) => {
              const Icon = iconMap[item.icon] ?? LayoutDashboard;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-accent",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span className="flex-1">{item.title}</span>
                  {item.badge && <Badge variant="secondary">{item.badge}</Badge>}
                </Link>
              );
            })}
          </nav>
        </SheetContent>
      </Sheet>

      <div className="min-w-0 flex-1">
        {title ? (
          <h1 className="truncate text-base font-semibold tracking-tight sm:text-lg lg:text-xl">
            {title}
          </h1>
        ) : (
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-muted-foreground">Welcome back</p>
          </div>
        )}
      </div>

      <div className="relative hidden max-w-sm flex-1 md:flex">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search patients, appointments..."
          className="border-0 bg-muted/50 pl-9"
          aria-label="Search the workspace"
        />
      </div>

      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" className="relative h-9 w-9" aria-label="Notifications">
          <Bell className="h-4 w-4" />
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
            3
          </span>
        </Button>
        <ThemeSwitcher />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-9 w-9 rounded-full"
              aria-label="Open user menu"
            >
              <Avatar className="h-9 w-9">
                <AvatarFallback className="text-xs">{getInitials(config.user.name)}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">{config.user.name}</p>
                <p className="text-xs text-muted-foreground">{config.user.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={`/${role}/settings`}>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/login">
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
