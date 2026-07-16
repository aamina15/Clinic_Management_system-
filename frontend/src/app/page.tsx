import type { Metadata } from "next";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  BarChart3,
  Calendar,
  CheckCircle2,
  FileText,
  Shield,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";

import { demoRoles } from "@/config/navigation";
import { ThemeSwitcher } from "@/components/layout/theme-switcher";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "ClinicFlow AI — Modern Healthcare Management",
  description: "AI-powered clinic management platform for appointments, EMR, billing, and more.",
};

const features = [
  {
    icon: Calendar,
    title: "Smart Scheduling",
    description: "AI-optimized appointment booking with automated reminders and conflict detection.",
  },
  {
    icon: FileText,
    title: "Electronic Medical Records",
    description: "Secure, HIPAA-ready EMR with clinical notes, vitals tracking, and prescription management.",
  },
  {
    icon: Users,
    title: "Patient Queue",
    description: "Real-time queue management with token system and wait time analytics.",
  },
  {
    icon: BarChart3,
    title: "Analytics & Reports",
    description: "Comprehensive dashboards with revenue tracking, department metrics, and KPIs.",
  },
  {
    icon: Shield,
    title: "Role-Based Access",
    description: "Dedicated portals for admins, doctors, reception staff, and patients.",
  },
  {
    icon: Zap,
    title: "AI-Powered Insights",
    description: "Intelligent suggestions for scheduling, inventory, and patient care workflows.",
  },
];

const stats = [
  { value: "2,800+", label: "Patients Managed" },
  { value: "99.9%", label: "Uptime SLA" },
  { value: "40%", label: "Reduced Wait Times" },
  { value: "4.9/5", label: "User Rating" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Activity className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold">
              ClinicFlow<span className="text-primary">AI</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-8 md:flex">
            <a href="#features" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Features
            </a>
            <a href="#portals" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Portals
            </a>
            <a href="#stats" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Impact
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <ThemeSwitcher />
            <Button variant="ghost" asChild className="hidden sm:inline-flex">
              <Link href="/login">Sign in</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-card px-4 py-1.5 text-sm">
              <Sparkles className="h-4 w-4 text-primary" />
              <span>AI-Powered Healthcare Platform</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Modern clinic management,{" "}
              <span className="gradient-text">reimagined</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
              Streamline appointments, EMR, billing, and pharmacy operations with an intuitive platform
              built for healthcare teams and their patients.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" asChild>
                <Link href="/register">
                  Start Free Trial
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/admin">View Demo</Link>
              </Button>
            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="relative mx-auto mt-16 max-w-5xl">
            <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-primary/20 via-teal-500/20 to-blue-500/20 blur-2xl" />
            <div className="relative overflow-hidden rounded-xl border bg-card shadow-2xl">
              <div className="flex items-center gap-2 border-b bg-muted/50 px-4 py-3">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-400" />
                  <div className="h-3 w-3 rounded-full bg-amber-400" />
                  <div className="h-3 w-3 rounded-full bg-emerald-400" />
                </div>
                <span className="mx-auto text-xs text-muted-foreground">app.clinicflow.ai/admin</span>
              </div>
              <div className="grid grid-cols-4 gap-4 p-6">
                {["2,847 Patients", "47 Today", "$48.9K MTD", "8 min Wait"].map((stat) => (
                  <div key={stat} className="rounded-lg border bg-background p-4">
                    <p className="text-lg font-bold">{stat.split(" ")[0]}</p>
                    <p className="text-xs text-muted-foreground">{stat.split(" ").slice(1).join(" ")}</p>
                  </div>
                ))}
              </div>
              <div className="h-48 bg-gradient-to-t from-primary/5 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section id="stats" className="border-y bg-muted/30 py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold tracking-tight sm:text-4xl">{stat.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Everything you need to run your clinic</h2>
            <p className="mt-4 text-muted-foreground">
              From front desk to pharmacy, ClinicFlow AI unifies your entire healthcare workflow.
            </p>
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title} className="group transition-all hover:shadow-lg hover:border-primary/20">
                <CardHeader>
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Portals */}
      <section id="portals" className="border-t bg-muted/30 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Role-based portals</h2>
            <p className="mt-4 text-muted-foreground">
              Each team member gets a tailored experience. Explore the demo dashboards.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {demoRoles.map(({ role, href }) => (
              <Link key={role} href={href}>
                <Card className="h-full transition-all hover:shadow-lg hover:border-primary/30 hover:-translate-y-1">
                  <CardContent className="flex flex-col items-center p-6 text-center">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                      <CheckCircle2 className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold capitalize">{role}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">Explore the {role} dashboard</p>
                    <ArrowRight className="mt-4 h-4 w-4 text-primary" />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl bg-primary px-8 py-16 text-center sm:px-16">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRoLTJWMGg2djM0aC00ek0zNiA2MGgtMnY2aDZ2LTZoLTR6TTAgMzRoMnY2aDZ2LTZIMHpNMCAwVjZoNlYwaC00ek0wIDM0aDJ2Nkgwdi02ek0zNiAwaC00djZoNlYwaC00ek0wIDM0aDJ2Nmg2di02SDB6TTM2IDYwaC00djZoNlY2MGgtNHpNMCAzNGgydjZoNlY2MEgwdjZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20" />
            <h2 className="relative text-3xl font-bold text-primary-foreground sm:text-4xl">
              Ready to transform your clinic?
            </h2>
            <p className="relative mt-4 text-primary-foreground/80">
              Join healthcare providers who trust ClinicFlow AI for smarter operations.
            </p>
            <Button size="lg" variant="secondary" className="relative mt-8" asChild>
              <Link href="/register">
                Get Started Free
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            <span className="font-semibold">ClinicFlow AI</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 ClinicFlow AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
