"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "../../../lib/auth-client";

type EventItem = {
  _id: string; title: string; description: string; location: string;
  eventType: string; eventDate: string; thumbnail: string; creatorName?: string;
};

export default function EventDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [event, setEvent] = useState<EventItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/events/${id}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => setEvent(d))
      .catch(() => setEvent(null))
      .finally(() => setLoading(false));
  }, [id]);

  async function handleJoin() {
    if (!session?.user) {
      toast.error("Please login to join this event");
      router.push("/login");
      return;
    }
    setJoining(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/join`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId: id, userEmail: session.user.email, userName: session.user.name }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || "Could not join");
      toast.success("You joined this event!");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setJoining(false);
    }
  }

  if (loading) return <div className="flex justify-center py-24"><span className="loading loading-spinner loading-lg text-white"></span></div>;
  if (!event) return <p className="text-center text-white py-24">Event not found.</p>;

  return (
    <section className="max-w-4xl mx-auto px-4 py-12">
      <div className="rounded-2xl bg-white/10 border border-white/10 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={event.thumbnail} alt={event.title} className="w-full h-72 object-cover" />
        <div className="p-8">
          <span className="badge badge-primary">{event.eventType}</span>
          <h1 className="mt-3 text-3xl font-bold text-white">{event.title}</h1>
          <p className="mt-2 text-slate-200">📍 {event.location}</p>
          <p className="text-slate-300">📅 {event.eventDate}</p>
          {event.creatorName && <p className="text-slate-300">Organized by {event.creatorName}</p>}
          <p className="mt-6 text-slate-100 leading-relaxed">{event.description}</p>
          <button onClick={handleJoin} disabled={joining} className="btn btn-primary mt-8">
            {joining ? "Joining..." : "Join Event"}
          </button>
        </div>
      </div>
    </section>
  );
}