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
      <body className="antialiased bg-[#faf8f5] text-[#14241c] selection:bg-[#166236] selection:text-white">
        <main>{children}</main>
      </body>
    </html>
  );
}