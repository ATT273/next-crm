import Link from "next/link";
import { getSession } from "@/app/actions";
import { Button } from "@heroui/button";

export default async function Home() {
  const session = await getSession();

  return (
    <div className="w-dvw h-dvh items-center relative">
      <div className="absolute top-1/2 -translate-y-1/2 w-full">
        <h1 className="font-bold text-3xl text-center mb-3">
          Welcome to Next CRM, {session ? session.name : "Guest"}
        </h1>
        <div className="w-full flex justify-center">
          {session && session.id ? (
            <Button color="primary">
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
          ) : (
            <Button>
              <Link href="/authenticate">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
