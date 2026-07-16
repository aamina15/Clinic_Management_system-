import type { UserRole } from "@/types/clinic";

export interface NavConfig {
  title: string;
  href: string;
  icon: string;
  badge?: number;
}

export interface RoleConfig {
  label: string;
  description: string;
  user: { name: string; email: string; avatar?: string };
  nav: NavConfig[];
}

export const roleConfigs: Record<UserRole, RoleConfig> = {
  admin: {
    label: "Admin",
    description: "Clinic administration & analytics",
    user: { name: "Sarah Chen", email: "sarah.chen@clinicflow.ai" },
    nav: [
      { title: "Dashboard", href: "/admin", icon: "LayoutDashboard" },
      { title: "Appointments", href: "/admin/appointments", icon: "Calendar", badge: 12 },
      { title: "Queue", href: "/admin/queue", icon: "Users", badge: 8 },
      { title: "Patients", href: "/admin/patients", icon: "UserRound" },
      { title: "EMR", href: "/admin/emr", icon: "FileText" },
      { title: "Billing", href: "/admin/billing", icon: "CreditCard" },
      { title: "Reports", href: "/admin/reports", icon: "BarChart3" },
      { title: "Pharmacy", href: "/admin/pharmacy", icon: "Pill" },
      { title: "Settings", href: "/admin/settings", icon: "Settings" },
    ],
  },
  doctor: {
    label: "Doctor",
    description: "Patient care & consultations",
    user: { name: "Dr. James Wilson", email: "j.wilson@clinicflow.ai" },
    nav: [
      { title: "Dashboard", href: "/doctor", icon: "LayoutDashboard" },
      { title: "Appointments", href: "/doctor/appointments", icon: "Calendar", badge: 6 },
      { title: "Queue", href: "/doctor/queue", icon: "Users", badge: 4 },
      { title: "Patients", href: "/doctor/patients", icon: "UserRound" },
      { title: "EMR", href: "/doctor/emr", icon: "FileText" },
      { title: "Pharmacy", href: "/doctor/pharmacy", icon: "Pill" },
      { title: "Settings", href: "/doctor/settings", icon: "Settings" },
    ],
  },
  reception: {
    label: "Reception",
    description: "Front desk operations",
    user: { name: "Emily Rodriguez", email: "e.rodriguez@clinicflow.ai" },
    nav: [
      { title: "Dashboard", href: "/reception", icon: "LayoutDashboard" },
      { title: "Appointments", href: "/reception/appointments", icon: "Calendar", badge: 18 },
      { title: "Queue", href: "/reception/queue", icon: "Users", badge: 11 },
      { title: "Patients", href: "/reception/patients", icon: "UserRound" },
      { title: "Billing", href: "/reception/billing", icon: "CreditCard" },
      { title: "Settings", href: "/reception/settings", icon: "Settings" },
    ],
  },
  patient: {
    label: "Patient",
    description: "Your health portal",
    user: { name: "Michael Thompson", email: "m.thompson@email.com" },
    nav: [
      { title: "Dashboard", href: "/patient", icon: "LayoutDashboard" },
      { title: "Appointments", href: "/patient/appointments", icon: "Calendar" },
      { title: "EMR", href: "/patient/emr", icon: "FileText" },
      { title: "Billing", href: "/patient/billing", icon: "CreditCard" },
      { title: "Settings", href: "/patient/settings", icon: "Settings" },
    ],
  },
};

export const demoRoles: { role: UserRole; href: string }[] = [
  { role: "admin", href: "/admin" },
  { role: "doctor", href: "/doctor" },
  { role: "reception", href: "/reception" },
  { role: "patient", href: "/patient" },
];
