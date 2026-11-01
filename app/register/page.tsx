"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "../../lib/auth-client";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name")).trim();
    const email = String(form.get("email")).trim();
    const photoURL = String(form.get("photoURL")).trim();
    const password = String(form.get("password"));

    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters long");
    }
    if (!/[A-Z]/.test(password)) {
      return toast.error("Password must contain an uppercase letter");
    }
    if (!/[a-z]/.test(password)) {
      return toast.error("Password must contain a lowercase letter");
    }

    setLoading(true);
    const { error } = await authClient.signUp.email({
      name,
      email,
      password,
      image: photoURL,
    });
    setLoading(false);

    if (error) {
      toast.error(error.message || "Registration failed");
      return;
    }
    toast.success("Registration successful! Welcome to EventHub.");
    router.push("/");
    router.refresh();
  }

  return (
    <section className="max-w-md mx-auto px-4 py-16">
      <div className="rounded-2xl bg-white/10 border border-white/10 p-8">
        <h1 className="text-3xl font-bold text-white text-center">Create Account</h1>
        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
          <input name="name" type="text" required placeholder="Full name" className="input input-bordered w-full text-slate-900" />
          <input name="email" type="email" required placeholder="Email address" className="input input-bordered w-full text-slate-900" />
          <input name="photoURL" type="url" required placeholder="Photo URL" className="input input-bordered w-full text-slate-900" />
          <input name="password" type="password" required placeholder="Password" className="input input-bordered w-full text-slate-900" />
          <button type="submit" disabled={loading} className="btn btn-primary w-full">
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>
        <p className="mt-6 text-center text-slate-200">
          Already have an account?{" "}
          <Link href="/login" className="text-sky-300 font-semibold">Login</Link>
        </p>
      </div>
    </section>
  );
}