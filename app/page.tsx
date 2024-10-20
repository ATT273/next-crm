
import Link from 'next/link';

export default async function Home() {
  return (
    <>
      <div>Welcome to Next CRM</div>
      <Link href="/authenticate">Login</Link>
    </>
  );
}