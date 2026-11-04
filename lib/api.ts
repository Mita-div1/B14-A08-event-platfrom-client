export async function authFetch(path: string, options: RequestInit = {}) {
  const t = await fetch("/api/token");

  if (!t.ok) throw new Error("Please login first");
  const { token } = await t.json();

  return fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
    ...options,

    headers: { ...(options.headers || {}), Authorization: `Bearer ${token}` },
  });
  
}