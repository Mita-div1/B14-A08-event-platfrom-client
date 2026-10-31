export default function Hero() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-24 text-center">
      <h1 className="text-4xl md:text-6xl font-bold text-white">
        Be the change in your community
      </h1>
      <p className="mt-6 text-lg text-slate-200 max-w-2xl mx-auto">
        Join winter clothes drives, tree plantations and cleanup campaigns
        near you, or start your own event and bring neighbours together.
      </p>
      <div className="mt-8 flex flex-wrap gap-4 justify-center">
        <a href="/events" className="btn btn-primary">Explore Events</a>
        <a href="/create-event" className="btn btn-outline text-white">Create Event</a>
      </div>
    </section>
  );
}