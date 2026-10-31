const features = [
  { title: "Create Events", text: "Organise a donation drive, plantation or cleanup in minutes." },
  { title: "Join Easily", text: "Find events in your area and join with a single click." },
  { title: "Track Your Impact", text: "See every event you joined, sorted by date." },
  { title: "Manage Your Events", text: "Update or delete the events you created anytime." },
];

export default function Features() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-white text-center">Why EventHub</h2>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f) => (
          <div key={f.title} className="rounded-xl bg-white/10 border border-white/10 p-6 h-full">
            <h3 className="text-xl font-semibold text-white">{f.title}</h3>
            <p className="mt-2 text-slate-200">{f.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}