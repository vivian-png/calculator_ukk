import './globals.css';
import Link from 'next/link';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
          <Link href="/" style={{ margin: '0 1rem' }}>Home</Link>
          <Link href="/calculator" style={{ margin: '0 1rem' }}>Calculator</Link>
          <Link href="/conversion" style={{ margin: '0 1rem' }}>Conversion</Link>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}