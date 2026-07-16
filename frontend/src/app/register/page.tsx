"use client";

import Link from "next/link";
import { Activity, ArrowLeft } from "lucide-react";

import { ThemeSwitcher } from "@/components/layout/theme-switcher";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <div className="hidden flex-col justify-between bg-gradient-to-br from-primary to-teal-600 p-12 text-primary-foreground lg:flex lg:w-1/2">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/20">
            <Activity className="h-5 w-5" />
          </div>
          <span className="text-lg font-bold">ClinicFlow AI</span>
        </Link>
        <div>
          <h1 className="text-4xl font-bold leading-tight">Start your free trial</h1>
          <p className="mt-4 text-lg text-primary-foreground/80">
            Set up your clinic in minutes. No credit card required.
          </p>
          <ul className="mt-8 space-y-3">
            {[
              "14-day free trial",
              "Unlimited patients",
              "HIPAA-ready infrastructure",
              "24/7 support",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm">
                <div className="h-1.5 w-1.5 rounded-full bg-white" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <p className="text-sm text-primary-foreground/60">
          Join 500+ clinics already using ClinicFlow AI
        </p>
      </div>

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
              <CardTitle className="text-2xl">Create account</CardTitle>
              <CardDescription>Get started with ClinicFlow AI today</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="you@clinic.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="clinic">Clinic Name</Label>
                <Input id="clinic" placeholder="Sunrise Medical Center" />
              </div>
              <div className="space-y-2">
                <Label>Role</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Clinic Administrator</SelectItem>
                    <SelectItem value="doctor">Doctor</SelectItem>
                    <SelectItem value="reception">Reception Staff</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="••••••••" />
              </div>
              <Button className="w-full" asChild>
                <Link href="/admin">Create Account</Link>
              </Button>
              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="font-medium text-primary hover:underline">
                  Sign in
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
