
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

type AuthFormProps = {
  mode: "signin" | "signup";
  callbackURL?: string;
};

export default function AuthForm({
  mode,
  callbackURL = "/",
}: AuthFormProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const isSignup = mode === "signup";

  const safeCallback =
    callbackURL.startsWith("/") && !callbackURL.startsWith("//")
      ? callbackURL
      : "/";

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (isSignup && !name.trim()) {
      toast.error("আপনার নাম লিখুন");
      return;
    }

    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
      return;
    }

    setLoading(true);

    try {
      if (isSignup) {
        const result = await authClient.signUp.email({
          name: name.trim(),
          email,
          password,
        });

        if (result.error) {
          throw new Error(result.error.message || "Registration failed");
        }

        toast.success("রেজিস্ট্রেশন সফল হয়েছে। এখন লগইন করুন।");
        router.push("/signin");
      } else {
        const result = await authClient.signIn.email({
          email,
          password,
        });

        if (result.error) {
          throw new Error(result.error.message || "Login failed");
        }

        toast.success("লগইন সফল হয়েছে!");
        router.push(safeCallback);
        router.refresh();
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "অনুরোধ সফল হয়নি",
      );
    } finally {
      setLoading(false);
    }
  }

  async function social(provider: "google" | "github") {
    setLoading(true);

    try {
      const result = await authClient.signIn.social({
        provider,
        callbackURL: isSignup ? "/" : safeCallback,
      });

      if (result.error) {
        throw new Error(result.error.message || "Social login failed");
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Social login failed",
      );
      setLoading(false);
    }
  }

  return (
    <main className="market-container flex min-h-[75vh] items-center justify-center py-12">
      <div className="card w-full max-w-md border border-base-300 bg-base-100 shadow-xl">
        <div className="card-body">
          <Link href="/" className="text-sm text-[#38724e]">
            ← বাজারদরে ফিরে যান
          </Link>

          <h1 className="mt-3 text-3xl font-bold text-[#163e32]">
            {isSignup ? "নতুন অ্যাকাউন্ট তৈরি করুন" : "লগইন করুন"}
          </h1>

          <p className="text-sm text-gray-500">
            {isSignup
              ? "আপনার তথ্য দিয়ে নিবন্ধন করুন।"
              : "আপনার ইমেইল ও পাসওয়ার্ড দিয়ে প্রবেশ করুন।"}
          </p>

          <form onSubmit={submit} className="mt-4 space-y-4">
            {isSignup && (
              <label className="form-control w-full">
                <span className="label-text mb-2">নাম</span>
                <input
                  className="input input-bordered w-full"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  required
                />
              </label>
            )}

            <label className="form-control w-full">
              <span className="label-text mb-2">ইমেইল</span>
              <input
                className="input input-bordered w-full"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </label>

            <label className="form-control w-full">
              <span className="label-text mb-2">পাসওয়ার্ড</span>
              <input
                className="input input-bordered w-full"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete={isSignup ? "new-password" : "current-password"}
                minLength={8}
                required
              />
            </label>

            <button
              className="btn w-full border-0 bg-[#163e32] text-white"
              disabled={loading}
              type="submit"
            >
              {loading
                ? "অপেক্ষা করুন..."
                : isSignup ? "Register" : "Login"}
            </button>
          </form>

          <div className="divider">অথবা</div>

          <button
            className="btn btn-outline w-full"
            disabled={loading}
            onClick={() => social("google")}
          >
            Continue with Google
          </button>

          <button
            className="btn btn-outline w-full"
            disabled={loading}
            onClick={() => social("github")}
          >
            Continue with GitHub
          </button>

          <p className="mt-3 text-center text-sm">
            {isSignup ? "আগে থেকেই অ্যাকাউন্ট আছে? " : "অ্যাকাউন্ট নেই? "}
            <Link
              className="font-semibold text-[#38724e] underline"
              href={isSignup ? "/signin" : "/signup"}
            >
              {isSignup ? "Sign in" : "Sign up"}
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
