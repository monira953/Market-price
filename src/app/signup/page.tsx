
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaChrome, FaGithub } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa6";
import { LoaderCircle, UserPlus } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function SignUpPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (name.trim().length < 2) {
      toast.error("Please enter your name.");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);

    try {
      const { error } = await authClient.signUp.email({
        name: name.trim(),
        email: email.trim(),
        password,
      });

      if (error) {
        toast.error(error.message || "Registration failed.");
        return;
      }

      toast.success("Account created successfully! Please sign in.");
      router.push("/signin");
      router.refresh();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSocialSignUp(provider: "google" | "github") {
    setSocialLoading(provider);

    try {
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || `${provider} sign-up failed.`);
      }
    } catch {
      toast.error(`${provider} sign-up failed. Please try again.`);
    } finally {
      setSocialLoading("");
    }
  }

    return (
      <div className="flex min-h-screen flex-col bg-[#f0f5f0] text-[#202a23]">
    <Navbar />
    <main className="flex min-h-screen items-center justify-center bg-[#f0f5f0] px-4 py-10 text-[#202a23]">
      <section className="w-full max-w-md rounded-3xl border border-[#e0e9e1] bg-white p-6 shadow-sm sm:p-9">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-lg font-bold text-green-800"
        >
          <span className="text-2xl">🌿</span>
          BazarDor
        </Link>

        <div className="mb-7">
          <div className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-green-50 text-green-700">
            <UserPlus size={24} />
          </div>

          <h1 className="text-3xl font-bold">Create an account</h1>
          <p className="mt-2 text-sm text-gray-500">
            Sign up to explore BazarDor and compare market prices.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <fieldset disabled={loading || !!socialLoading} className="space-y-4">
            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
                Full name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Enter your name"
                className="input input-bordered w-full bg-white"
                value={name}
                onChange={(event) => setName(event.target.value)}
                minLength={2}
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                className="input input-bordered w-full bg-white"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                placeholder="At least 8 characters"
                className="input input-bordered w-full bg-white"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                minLength={8}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-success w-full text-white"
              disabled={loading || !!socialLoading}
            >
              {loading ? (
                <>
                  <LoaderCircle size={18} className="animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create account"
              )}
            </button>
          </fieldset>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-xs text-gray-400">OR CONTINUE WITH</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            className="btn btn-outline"
            disabled={loading || !!socialLoading}
            onClick={() => handleSocialSignUp("google")}
          >
            {socialLoading === "google" ? (
              <LoaderCircle size={17} className="animate-spin" />
            ) : (
              <FaGoogle size={17} />
            )}
            Google
          </button>

          <button
            type="button"
            className="btn btn-outline"
            disabled={loading || !!socialLoading}
            onClick={() => handleSocialSignUp("github")}
          >
            {socialLoading === "github" ? (
              <LoaderCircle size={17} className="animate-spin" />
            ) : (
              <FaGithub size={17} />
            )}
            GitHub
          </button>
        </div>

        <p className="mt-7 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="font-semibold text-green-700 hover:underline"
          >
            Sign in
          </Link>
        </p>

        <p className="mt-6 text-center text-xs leading-5 text-gray-400">
          By creating an account, you agree to use BazarDor responsibly.
        </p>
      </section>
            </main>
            <Footer />
  </div>
  );
}