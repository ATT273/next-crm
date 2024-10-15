
import Link from 'next/link';
import { redirect } from 'next/navigation'

export default async function Home() {
  // const accessDenied = true
  // if (accessDenied) {
  //   redirect('/login')
  // }
  return (
    <>
      <div>Welcome to Next CRM</div>
      <Link href="/login">Login</Link>
    </>
  );
}

// export async function getSessionData(req) {
//   const encryptedSessionData = cookies().get('session')?.value
//   return encryptedSessionData ? JSON.parse(decrypt(encryptedSessionData)) : null
// }