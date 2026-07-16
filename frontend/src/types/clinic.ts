export type UserRole = "admin" | "doctor" | "reception" | "patient";

export type AppointmentStatus = "scheduled" | "confirmed" | "in-progress" | "completed" | "cancelled" | "no-show";

export type QueueStatus = "waiting" | "called" | "in-consultation" | "completed";

export type InvoiceStatus = "paid" | "pending" | "overdue" | "partial";

export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: "male" | "female" | "other";
  bloodType: string;
  avatar?: string;
  lastVisit: string;
  status: "active" | "inactive";
  insuranceProvider?: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  email: string;
  phone: string;
  avatar?: string;
  patientsToday: number;
  rating: number;
  status: "available" | "busy" | "off-duty";
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  duration: number;
  type: string;
  status: AppointmentStatus;
  notes?: string;
}

export interface QueueEntry {
  id: string;
  token: string;
  patientName: string;
  doctorName: string;
  checkInTime: string;
  waitTime: number;
  status: QueueStatus;
  priority: "normal" | "urgent";
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  patientName: string;
  date: string;
  doctorName: string;
  diagnosis: string;
  symptoms: string;
  prescription: string;
  vitals: {
    bloodPressure: string;
    heartRate: number;
    temperature: number;
    weight: number;
  };
}

export interface Invoice {
  id: string;
  patientName: string;
  date: string;
  amount: number;
  status: InvoiceStatus;
  items: { description: string; amount: number }[];
  paymentMethod?: string;
}

export interface PharmacyItem {
  id: string;
  name: string;
  category: string;
  stock: number;
  unit: string;
  price: number;
  expiryDate: string;
  supplier: string;
  status: "in-stock" | "low-stock" | "out-of-stock";
}

export interface NavItem {
  title: string;
  href: string;
  icon: string;
  badge?: number;
}

export interface DashboardStat {
  title: string;
  value: string | number;
  change: number;
  trend: "up" | "down" | "neutral";
  icon: string;
}
