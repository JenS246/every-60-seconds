import type { Metadata } from 'next';
import './globals.css';

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
      <body>{children}</body>
    </html>
  );
}
