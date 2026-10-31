export default function Newsletter() {
  return (
    <section className="max-w-3xl mx-auto px-4 py-16 text-center">
      <h2 className="text-3xl font-bold text-white">Stay in the loop</h2>
      <p className="mt-3 text-slate-200">Get updates about new community events near you.</p>
      <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
        <input type="email" placeholder="Your email address" className="input input-bordered w-full sm:w-80 text-slate-900" />
        <button className="btn btn-primary">Subscribe</button>
      </div>
    </section>
  );
}