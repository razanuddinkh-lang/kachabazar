
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { signIn, signUp } from "@/lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const name = String(formData.get("name") ?? "").trim();
      const email = String(formData.get("email") ?? "").trim();
      const password = String(formData.get("password") ?? "");

      if (name.length < 3) {
        setMessage("Name must be at least 3 characters.");
        return;
      }

      if (
        password.length < 8 ||
        !/[A-Z]/.test(password) ||
        !/[0-9]/.test(password)
      ) {
        setMessage(
          "Password needs 8 characters, an uppercase letter, and a number."
        );
        return;
      }

      const result = await signUp.email({
        name,
        email,
        password,
        callbackURL: "/profile",
      });

      if (result.error) {
        setMessage(result.error.message || "Sign-up failed.");
        return;
      }

      router.push("/profile");
      router.refresh();
    } catch (error: unknown) {
      setMessage(
        error instanceof Error ? error.message : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    setMessage("");
    setLoading(true);

    try {
      const result = await signIn.social({
        provider: "google",
        callbackURL: "/profile",
        errorCallbackURL: "/sign-up",
      });

      if (result.error) {
        setMessage(result.error.message || "Google sign-in failed.");
      }
    } catch (error: unknown) {
      setMessage(
        error instanceof Error ? error.message : "Google sign-in failed."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleGitHubSignIn() {
    setMessage("");
    setLoading(true);

    try {
      const result = await signIn.social({
        provider: "github",
        callbackURL: "/profile",
        errorCallbackURL: "/sign-up",
      });

      if (result.error) {
        setMessage(result.error.message || "GitHub sign-in failed.");
      }
    } catch (error: unknown) {
      setMessage(
        error instanceof Error ? error.message : "GitHub sign-in failed."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-[80vh] items-center justify-center px-4 py-10">
      <section className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-lg sm:p-8">
        <h1 className="mb-2 text-center text-3xl font-bold text-green-700">
          Create Account
        </h1>

        <p className="mb-6 text-center text-gray-500">
          Join BazaarDor today.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="mb-1 block text-sm font-medium"
            >
              Full name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              minLength={3}
              required
              placeholder="Your name"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium"
            >
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
              autoComplete="new-password"
              minLength={8}
              required
              placeholder="Create a password"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
            />
            <p className="mt-1 text-xs text-gray-500">
              At least 8 characters, one uppercase letter, and one number.
            </p>
          </div>

          {message && (
            <p role="alert" className="text-sm text-red-600">
              {message}
            </p>
          )}

          <Button
            type="submit"
            isDisabled={loading}
            className="w-full"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </Button>
        </form>

        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-sm text-gray-500">OR</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        <div className="space-y-3">
          <Button
            type="button"
            isDisabled={loading}
            onPress={handleGoogle}
            className="w-full"
          >
            Continue with Google
          </Button>

          <Button
            type="button"
            isDisabled={loading}
            onPress={handleGitHubSignIn}
            className="w-full"
          >
            Continue with GitHub
          </Button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="font-semibold text-green-700 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </section>
    </main>
  );
}
