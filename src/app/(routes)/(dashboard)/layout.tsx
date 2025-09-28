import MainLayout from '@/app/global-components/layout/MainLayout';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <MainLayout>{children}</MainLayout>;
}
