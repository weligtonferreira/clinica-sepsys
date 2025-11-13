import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AppProvider } from '@/contexts';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Clínica SEPSys',
  description: 'Clínica SEPSys',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='pt-BR' className={inter.variable}>
      <body className='antialiased'>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
