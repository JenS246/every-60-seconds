import type { Metadata } from 'next';
import { Outfit, Space_Mono } from 'next/font/google';
import './globals.css';

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
});

const spaceMono = Space_Mono({
  variable: '--font-space-mono',
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: 'Every 60 Seconds',
  description: 'A one-minute game that reveals how much digital data the world produces.',
  openGraph: {
    title: 'Every 60 Seconds',
    description: 'Tap through one astonishing minute of global digital activity.',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Every 60 Seconds',
    description: 'Tap through one astonishing minute of global digital activity.',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${spaceMono.variable}`}>{children}</body>
    </html>
  );
}
