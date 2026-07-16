"use client";

import Link from "next/link";
import { Activity, ArrowLeft } from "lucide-react";

import { demoRoles } from "@/config/navigation";
import { ThemeSwitcher } from "@/components/layout/theme-switcher";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <div className="hidden flex-col justify-between bg-primary p-12 text-primary-foreground lg:flex lg:w-1/2">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/20">
            <Activity className="h-5 w-5" />
          </div>
          <span className="text-lg font-bold">ClinicFlow AI</span>
        </Link>
        <div>
          <h1 className="text-4xl font-bold leading-tight">Welcome back</h1>
          <p className="mt-4 text-lg text-primary-foreground/80">
            Sign in to access your clinic dashboard and manage patient care seamlessly.
          </p>
        </div>
        <p className="text-sm text-primary-foreground/60">
          Trusted by 500+ healthcare providers worldwide
        </p>
      </div>

      {/* Right panel */}
      <div className="flex flex-1 flex-col">
        <div className="flex items-center justify-between p-4 lg:p-6">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="lg:hidden"
            aria-label="Return to home"
          >
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>
          </Button>
          <div className="ml-auto">
            <ThemeSwitcher />
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center p-4 sm:p-8">
          <Card className="w-full max-w-md border-0 shadow-none sm:border sm:shadow-sm">
            <CardHeader className="text-center lg:text-left">
              <div className="mb-4 flex justify-center lg:hidden">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <Activity className="h-6 w-6" />
                </div>
              </div>
              <CardTitle className="text-2xl">Sign in</CardTitle>
              <CardDescription>Enter your credentials to access your portal</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="you@clinic.com" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="#" className="text-xs text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input id="password" type="password" placeholder="••••••••" />
              </div>
              <Button className="w-full" asChild>
                <Link href="/admin">Sign in</Link>
              </Button>

              <div className="relative">
                <Separator />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">
                  or try a demo portal
                </span>
              </div>

              <div className="grid gap-2 sm:grid-cols-2">
                {demoRoles.map(({ role, href }) => (
                  <Button key={role} variant="outline" size="sm" asChild className="capitalize">
                    <Link href={href}>{role}</Link>
                  </Button>
                ))}
              </div>

              <p className="text-center text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="font-medium text-primary hover:underline">
                  Sign up
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
