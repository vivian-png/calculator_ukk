import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Simple Scientific Calculator & Converter</h1>
      <div>
        <Link href="/calculator" style={{ margin: '0 1rem' }}>
          Calculator
        </Link>
        <Link href="/conversion" style={{ margin: '0 1rem' }}>
          Converter
        </Link>
      </div>
    </div>
  );
}