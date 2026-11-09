import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Nav from './nav';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'GXBank · GX.AI',
  description: 'GXBank personal account with GX.AI nudges that build financial resilience.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-dvh font-sans antialiased">
        <Nav />
        <main className="mx-auto max-w-6xl px-4 pt-6 pb-28 sm:px-8 md:pb-12">{children}</main>
      </body>
    </html>
  );
}
