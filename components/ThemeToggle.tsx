"use client";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const isDark = saved ? saved === "dark" : true;
    setDark(isDark);
    document.documentElement.setAttribute("data-theme", isDark ? "eventdark" : "eventlight");
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    localStorage.setItem("theme", next ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", next ? "eventdark" : "eventlight");
  }

  return (
    <button onClick={toggle} aria-label="Toggle theme" className="btn btn-ghost btn-circle text-xl">
      {dark ? "☀️" : "🌙"}
    </button>
  );
}