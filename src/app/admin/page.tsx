import type { Metadata } from 'next';
import AdminClient from './AdminClient';

export const metadata: Metadata = {
  title: 'Admin Panel',
  description: 'Skin Medic Skin Care administration dashboard for Roslyn Bolton.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return <AdminClient />;
}
