export default function Navbar() {
  return (
    <div className="navbar bg-slate-950/80 backdrop-blur text-white px-4 sticky top-0 z-50 border-b border-white/10">
      <div className="flex-1">
        <a className="text-xl font-bold">EventHub</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a>Upcoming Events</a>
          </li>
        </ul>
        <button className="btn btn-primary ml-2">Login</button>
      </div>
    </div>
  );
}