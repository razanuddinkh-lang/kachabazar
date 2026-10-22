
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { signIn } from "@/lib/auth-client";

export default function SignInPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    try {
      const result = await signIn.email({
        email,
        password,
        callbackURL: "/profile",
      });

      if (result.error) {
        setMessage(result.error.message || "Invalid email or password.");
        return;
      }

      router.push("/profile");
      router.refresh();
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Sign-in failed."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    setLoading(true);
    setMessage("");

    try {
      const result = await signIn.social({
        provider: "google",
        callbackURL: "/profile",
        errorCallbackURL: "/sign-in",
      });

      if (result.error) {
        setMessage(result.error.message || "Google sign-in failed.");
      }
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Google sign-in failed."
      );
    } finally {
      setLoading(false);
    }
  }


  
async function handleGitHubSignIn() {
  try {
    const result = await signIn.social({
      provider: "github",
      callbackURL: "/profile",
      errorCallbackURL: "/sign-in",
    });

    if (result.error) {
      console.error("GitHub sign-in failed:", result.error);
    }
  } catch (error: unknown) {
    console.error("GitHub sign-in error:", error);
  }
}


  return (
    <main className="flex min-h-[80vh] items-center justify-center px-4 py-10">
      <section className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-lg sm:p-8">
        <h1 className="mb-2 text-center text-3xl font-bold text-green-700">
          Welcome Back
        </h1>

        <p className="mb-6 text-center text-gray-500">
          Sign in to your BazaarDor account.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="you@example.com"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="Your password"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
            />
          </div>

          {message && (
            <p role="alert" className="text-sm text-red-600">
              {message}
            </p>
          )}

          <Button type="submit" isDisabled={loading} className="w-full">
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-sm text-gray-500">OR</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        <Button
          type="button"
          isDisabled={loading}
          onPress={handleGoogle}
          className="w-full"
        >
          Continue with Google
        </Button>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            href="/sign-up"
            className="font-semibold text-green-700 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </section>
    </main>
  );
}
