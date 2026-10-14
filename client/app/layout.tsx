import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Addinu Yusr // Classical & Contemporary Islamic Scholarship',
  description:
    'A disciplined institutional portal delivering structured classical and contemporary Islamic curricula.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-[#c5ea31] selection:text-[#090c0a]">
        <main>{children}</main>
      </body>
    </html>
  );
}