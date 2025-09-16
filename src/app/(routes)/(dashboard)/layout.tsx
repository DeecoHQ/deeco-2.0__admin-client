import MainLayout from '@/app/(routes)/(dashboard)/components/layout/MainLayout';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <MainLayout>{children}</MainLayout>;
}
