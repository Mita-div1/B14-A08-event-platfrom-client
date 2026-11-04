"use client";
import { useEffect, useState } from "react";

import Link from "next/link";


type EventItem = { _id: string; title: string; location: string; eventType: string; eventDate: string; thumbnail: string };

export default function RecentEvents() {

  const [events, setEvents] = useState<EventItem[] | null>(null);

  const [failed, setFailed] = useState(false);


  useEffect(() => {
    let cancelled = false;
    async function load() {

      for (let i = 0; i < 4; i++) {

        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events?limit=6`);
          if (res.ok) {
            const data = await res.json();
            if (Array.isArray(data)) {
              if (!cancelled) setEvents(data);
              return;
            }
          }
        } catch {
          // server may be waking up, try again
        }
        await new Promise((r) => setTimeout(r, 4000));
      }
      if (!cancelled) setFailed(true);
    }
    load();
    return () => { cancelled = true; };
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-4 py-16">

      <h2 className="text-3xl font-bold text-white text-center">Upcoming Events</h2>

      {events === null && !failed && (

        <div className="flex justify-center mt-10"><span className="loading loading-spinner loading-lg text-white"></span></div>
      )}

      {failed && (

        <p className="mt-10 text-center text-slate-200">Could not load events right now. Please refresh in a moment.</p>
      )}

      {events !== null && events.length === 0 && (

        <p className="mt-10 text-center text-slate-200">No upcoming events yet.</p>
      )}

      {events !== null && events.length > 0 && (

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((e) => (
            <div key={e._id} className="rounded-xl bg-white/10 border border-white/10 overflow-hidden flex flex-col h-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={e.thumbnail} alt={e.title} className="w-full h-48 object-cover" />
              <div className="p-5 flex flex-col flex-1">

                <span className="badge badge-primary">{e.eventType}</span>
                <h3 className="mt-3 text-xl font-semibold text-white">{e.title}</h3>
                <p className="mt-2 text-slate-200">{e.location}</p>
                <p className="text-slate-300 text-sm">{e.eventDate}</p>
                <Link href={`/events/${e._id}`} className="btn btn-primary mt-auto">View Event</Link>
              </div>

            </div>

          ))}

        </div>

      )}

    </section>

  );

  
}