import type { Metadata } from 'next';
import { Barlow_Condensed, Manrope } from 'next/font/google';
import './globals.css';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
});

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  variable: '--font-caption',
  weight: ['500', '600', '700'],
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
      <body className={`${manrope.variable} ${barlowCondensed.variable}`}>{children}</body>
    </html>
  );
}
