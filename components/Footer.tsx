export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white border-t border-white/10 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12 grid gap-8 md:grid-cols-3">
        <div>
          <h3 className="text-2xl font-bold">EventHub</h3>
          <p className="mt-3 text-slate-300">
            A community platform to create, join and track social service
            events across Bangladesh.
          </p>
        </div>
        <div>
          <h4 className="text-lg font-semibold">Contact</h4>
          <p className="mt-3 text-slate-300">Mirpur 10, Dhaka, Bangladesh</p>
          <p className="text-slate-300">support@eventhub.com</p>
          <p className="text-slate-300">+880 1700 000000</p>
        </div>
        <div>
          <h4 className="text-lg font-semibold">Follow Us</h4>
          <div className="mt-3 flex gap-3">
            <a href="https://x.com" target="_blank" aria-label="X" className="btn btn-circle btn-sm btn-outline text-white">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a href="https://facebook.com" target="_blank" aria-label="Facebook" className="btn btn-circle btn-sm btn-outline text-white">f</a>
            <a href="https://github.com" target="_blank" aria-label="GitHub" className="btn btn-circle btn-sm btn-outline text-white">G</a>
          </div>
        </div>
      </div>
      <p className="text-center text-sm text-slate-400 pb-6">
        © 2026 EventHub. All rights reserved.
      </p>
    </footer>
  );
}