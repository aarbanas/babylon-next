import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Dežurstva.com',
  description:
    'Aplikacija za medicinske usluge na sportskim natjecanjima te pretragu kvalificiranog medicinskog osoblja i spasilaca s licencom Crvenog Križa',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
