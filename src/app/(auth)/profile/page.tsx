
"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { signOut, useSession } from "@/lib/auth-client";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/sign-in");
    }
  }, [isPending, session, router]);

  async function handleSignOut() {
    const result = await signOut();

    if (result.error) {
      console.error("Sign-out failed:", result.error);
      return;
    }

    router.replace("/sign-in");
    router.refresh();
  }

  if (isPending || !session) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p>Checking your session...</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow">
        <h1 className="mb-6 text-3xl font-bold text-green-700">
          My Profile
        </h1>

        <div className="space-y-3">
          <p>
            <strong>Name:</strong> {session.user.name}
          </p>

          <p>
            <strong>Email:</strong> {session.user.email}
          </p>

          <p>
            <strong>Email verified:</strong>{" "}
            {session.user.emailVerified ? "Yes" : "No"}
          </p>
        </div>

        {session.user.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={session.user.image}
            alt="Profile"
            className="mt-5 h-16 w-16 rounded-full"
          />
        )}

        <div className="mt-6 flex gap-3">
          <Button onPress={handleSignOut}>Sign Out</Button>
          <Button
            onPress={() => router.push("/")}
          >
            Back to Home
          </Button>
        </div>
      </section>
    </main>
  );
}
