"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import PrivateGuard from "../../components/PrivateGuard";
import { authClient } from "../../lib/auth-client";


const types = ["Cleanup", "Plantation", "Donation", "Blood Donation", "Education", "Health Camp"];
const field = "w-full bg-white text-slate-900 placeholder:text-slate-500";


function CreateEventForm() {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const [loading, setLoading] = useState(false);

  const today = new Date().toISOString().slice(0, 10);


  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);

    const event = {

      title: String(f.get("title")).trim(),

      description: String(f.get("description")).trim(),

      eventType: String(f.get("eventType")),

      thumbnail: String(f.get("thumbnail")).trim(),


      location: String(f.get("location")).trim(),

      eventDate: String(f.get("eventDate")),

      creatorEmail: session?.user.email,

      creatorName: session?.user.name,

    };

    if (event.title.length < 5) return toast.error("Title must be at least 5 characters");

    if (event.description.length < 20) return toast.error("Description must be at least 20 characters");

    if (event.eventDate < today) return toast.error("Event date must be in the future");

    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },

        body: JSON.stringify(event),
      });


      if (!res.ok) {
        const data = await res.json().catch(() => ({}));

        throw new Error(data.message || "Failed to create event");
      }
      toast.success("Event created successfully!");
      router.push("/events");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="max-w-2xl mx-auto px-4 py-12">


      <div className="rounded-2xl bg-white/10 border border-white/10 p-8">


        <h1 className="text-3xl font-bold text-white text-center">Create Event</h1>


        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">


          <input name="title" required placeholder="Event title" className={`input input-bordered ${field}`} />



          <textarea name="description" required placeholder="Event description" rows={4} className={`textarea textarea-bordered ${field}`} />
          <select name="eventType" required defaultValue="" className={`select select-bordered ${field}`}>


            <option value="" disabled>Select event type</option>

            {types.map((t) => <option key={t} value={t}>{t}</option>)}

          </select>
          <input name="thumbnail" type="url" required placeholder="Thumbnail image URL" className={`input input-bordered ${field}`} />
          <input name="location" required placeholder="Location (e.g. Mirpur 10, Dhaka)" className={`input input-bordered ${field}`} />
          <input name="eventDate" type="date" required min={today} className={`input input-bordered ${field}`} />
          <button type="submit" disabled={loading} className="btn btn-primary w-full">


            {loading ? "Creating..." : "Create Event"}


          </button>


        </form>


      </div>


    </section>

  );
}

export default function CreateEventPage() {

  return (
    <PrivateGuard>

      <CreateEventForm />
    </PrivateGuard>



  );
}