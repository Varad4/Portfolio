import type { Metadata } from 'next';
import { Geist } from 'next/font/google'; // Using Geist Sans as the primary font
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Varad Mishra - Portfolio powered by Prototype',
  description: "Portfolio of Varad Mishra, showcasing projects in AI, web development, and cloud technologies. Explore skills in Java, Python, React, AWS, and more. Built with Prototype.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} font-sans antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
