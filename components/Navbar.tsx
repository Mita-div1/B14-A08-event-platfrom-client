"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "../lib/auth-client";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  async function handleLogout() {
    await authClient.signOut();
    toast.success("Logged out successfully");
    router.push("/");
    router.refresh();
  }

  return (
    <div className="navbar bg-slate-950/80 backdrop-blur text-white px-4 sticky top-0 z-50 border-b border-white/10">
      <div className="flex-1">
        <Link href="/" className="text-xl font-bold">EventHub</Link>
      </div>
      <div className="flex-none flex items-center gap-2">
        <ThemeToggle />
        <ul className="menu menu-horizontal px-1">
          <li><Link href="/events">Upcoming Events</Link></li>
        </ul>

        {isPending ? null : user ? (
          <>
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="tooltip tooltip-bottom" data-tip={user.name}>
                {user.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={user.image} alt={user.name} className="w-10 h-10 rounded-full object-cover border border-white/30" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center font-bold">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <ul tabIndex={0} className="dropdown-content menu bg-slate-900 text-white rounded-box z-50 mt-3 w-52 p-2 shadow border border-white/10">
                <li><Link href="/create-event">Create Event</Link></li>
                <li><Link href="/manage-events">Manage Events</Link></li>
                <li><Link href="/joined-events">Joined Events</Link></li>
              </ul>
            </div>
            <button onClick={handleLogout} className="btn btn-primary">Logout</button>
          </>
        ) : (
          <Link href="/login" className="btn btn-primary">Login</Link>
        )}
      </div>
    </div>
  );
}