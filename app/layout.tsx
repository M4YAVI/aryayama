import type { Metadata } from 'next';
import { GeistMono } from 'geist/font/mono';
import { GeistPixelSquare } from 'geist/font/pixel';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'Combined UI',
  description: 'Minimalist Profile and Survival UI',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistMono.variable} ${GeistPixelSquare.variable}`}>
      <body className="antialiased bg-[#050505] text-white font-[family-name:var(--font-geist-pixel-square)]" suppressHydrationWarning>{children}</body>
    </html>
  );
}
