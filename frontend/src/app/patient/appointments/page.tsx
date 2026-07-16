import { AppointmentsView } from "@/components/modules/appointments-view";

export default function PatientAppointmentsPage() {
  return <AppointmentsView showActions={false} filterPatient="Michael Thompson" />;
}
