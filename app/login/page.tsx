"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "../../lib/auth-client";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email")).trim();
    const password = String(form.get("password"));

    setLoading(true);
    const { error } = await authClient.signIn.email({ email, password });
    setLoading(false);

    if (error) {
      toast.error(error.message || "Invalid email or password");
      return;
    }
    toast.success("Login successful!");
    router.push("/");
    router.refresh();
  }

  return (
    <section className="max-w-md mx-auto px-4 py-16">
      <div className="rounded-2xl bg-white/10 border border-white/10 p-8">
        <h1 className="text-3xl font-bold text-white text-center">Welcome Back</h1>
        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
          <input name="email" type="email" required placeholder="Email address" className="input input-bordered w-full text-slate-900" />
          <input name="password" type="password" required placeholder="Password" className="input input-bordered w-full text-slate-900" />
          <button type="submit" disabled={loading} className="btn btn-primary w-full">
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="mt-6 text-center text-slate-200">
          New to EventHub?{" "}
          <Link href="/register" className="text-sky-300 font-semibold">Register</Link>
        </p>
      </div>
    </section>
  );
}