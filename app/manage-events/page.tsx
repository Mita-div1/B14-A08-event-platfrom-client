"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import PrivateGuard from "../../components/PrivateGuard";
import { authClient } from "../../lib/auth-client";

type EventItem = {
  _id: string; title: string; description: string; location: string;
  eventType: string; eventDate: string; thumbnail: string;
};
const types = ["Cleanup", "Plantation", "Donation", "Blood Donation", "Education", "Health Camp"];

function ManageList() {
  const { data: session } = authClient.useSession();
  const email = session?.user.email;
  const api = process.env.NEXT_PUBLIC_API_URL;
  const [list, setList] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<EventItem | null>(null);
  const today = new Date().toISOString().slice(0, 10);

  async function load() {
    if (!email) return;
    const r = await fetch(`${api}/my-events?email=${encodeURIComponent(email)}`);
    setList(await r.json());
    setLoading(false);
  }
  useEffect(() => { load(); /* eslint-disable-next-line */ }, [email]);

  async function handleDelete(id: string) {
    if (!confirm("Delete this event?")) return;
    const r = await fetch(`${api}/events/${id}?email=${encodeURIComponent(email!)}`, { method: "DELETE" });
    const d = await r.json();
    if (d.deletedCount) { toast.success("Event deleted"); load(); } else toast.error("Could not delete");
  }

  async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!editing) return;
    const f = new FormData(e.currentTarget);
    const data = {
      title: String(f.get("title")).trim(),
      description: String(f.get("description")).trim(),
      eventType: String(f.get("eventType")),
      thumbnail: String(f.get("thumbnail")).trim(),
      location: String(f.get("location")).trim(),
      eventDate: String(f.get("eventDate")),
    };
    if (data.title.length < 5) return toast.error("Title must be at least 5 characters");
    if (data.description.length < 20) return toast.error("Description must be at least 20 characters");
    if (data.eventDate < today) return toast.error("Event date must be in the future");
    const r = await fetch(`${api}/events/${editing._id}?email=${encodeURIComponent(email!)}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (r.ok) { toast.success("Event updated"); setEditing(null); load(); }
    else toast.error("Update failed");
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-white text-center">Manage Events</h1>
      {loading ? (
        <div className="flex justify-center mt-10"><span className="loading loading-spinner loading-lg text-white"></span></div>
      ) : list.length === 0 ? (
        <p className="mt-10 text-center text-slate-200">You have not created any event yet.</p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((e) => (
            <div key={e._id} className="rounded-xl bg-white/10 border border-white/10 overflow-hidden flex flex-col h-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={e.thumbnail} alt={e.title} className="w-full h-48 object-cover" />
              <div className="p-5 flex flex-col flex-1">
                <span className="badge badge-primary">{e.eventType}</span>
                <h2 className="mt-3 text-xl font-semibold text-white">{e.title}</h2>
                <p className="mt-2 text-slate-200">{e.location}</p>
                <p className="text-slate-300 text-sm">{e.eventDate}</p>
                <div className="mt-auto pt-4 flex gap-2">
                  <button onClick={() => setEditing(e)} className="btn btn-primary btn-sm flex-1">Update</button>
                  <button onClick={() => handleDelete(e._id)} className="btn btn-error btn-sm flex-1">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <div className="modal modal-open">
          <div className="modal-box bg-slate-900 text-white">
            <h3 className="font-bold text-xl">Update Event</h3>
            <form onSubmit={handleUpdate} className="mt-4 flex flex-col gap-3">
              <input name="title" defaultValue={editing.title} required className="input input-bordered w-full text-slate-900" />
              <textarea name="description" defaultValue={editing.description} required rows={4} className="textarea textarea-bordered w-full text-slate-900" />
              <select name="eventType" defaultValue={editing.eventType} className="select select-bordered w-full text-slate-900">
                {types.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
              <input name="thumbnail" type="url" defaultValue={editing.thumbnail} required className="input input-bordered w-full text-slate-900" />
              <input name="location" defaultValue={editing.location} required className="input input-bordered w-full text-slate-900" />
              <input name="eventDate" type="date" defaultValue={editing.eventDate} min={today} required className="input input-bordered w-full text-slate-900" />
              <div className="modal-action">
                <button type="button" onClick={() => setEditing(null)} className="btn">Cancel</button>
                <button type="submit" className="btn btn-primary">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

export default function ManageEventsPage() {
  return <PrivateGuard><ManageList /></PrivateGuard>;
}