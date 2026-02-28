import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'WealthSignal',
  description: 'Compliant HNW opportunity intelligence for financial advisors.'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
