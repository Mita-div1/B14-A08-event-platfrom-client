"use client";
import { useEffect, useState } from "react";

import PrivateGuard from "../../components/PrivateGuard";

import { authClient } from "../../lib/auth-client";

import { authFetch } from "../../lib/api";


type Joined = { _id: string; eventTitle: string; thumbnail: string; location: string; eventType: string; eventDate: string };

function JoinedList() {

  const { data: session } = authClient.useSession();


  const [list, setList] = useState<Joined[]>([]);


  const [loading, setLoading] = useState(true);

  useEffect(() => {

    if (!session?.user.email) return;

    authFetch("/joined")


      .then((r) => r.json())


      .then((d) => setList(Array.isArray(d) ? d : []))

      .catch(() => setList([]))

      .finally(() => setLoading(false));


  }, [session]);


  return (
    <section className="max-w-6xl mx-auto px-4 py-12">


      <h1 className="text-3xl font-bold text-white text-center">Joined Events</h1>


      {loading ? (

        <div className="flex justify-center mt-10"><span className="loading loading-spinner loading-lg text-white"></span></div>
      ) : list.length === 0 ? (
        <p className="mt-10 text-center text-slate-200">You have not joined any event yet.</p>


      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {list.map((e) => (

            <div key={e._id} className="rounded-xl bg-white/10 border border-white/10 overflow-hidden flex flex-col h-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}

              <img src={e.thumbnail} alt={e.eventTitle} className="w-full h-48 object-cover" />
              <div className="p-5">

                <span className="badge badge-primary">{e.eventType}</span>

                <h2 className="mt-3 text-xl font-semibold text-white">{e.eventTitle}</h2>

                <p className="mt-2 text-slate-200">{e.location}</p>

                <p className="text-slate-300 text-sm">{e.eventDate}</p>

              </div>


            </div>


          ))}
        </div>
      )}

    </section>
  );
}

export default function JoinedEventsPage() {

  return <PrivateGuard><JoinedList /></PrivateGuard>;

  
}