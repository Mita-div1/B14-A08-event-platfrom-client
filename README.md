# EventHub - Social Development Events Platform

EventHub is a community platform where people can discover, create, join and manage social development events such as cleanups, plantations, donations and health camps across Bangladesh.

## Links

- Live Site: https://b14-a08-event-platfrom-client.vercel.app
- Client Repo: https://github.com/Mita-div1/B14-A08-event-platfrom-client
- Server Repo: https://github.com/Mita-div1/B14-A08-event-platform-server
- Live API: https://b14-a08-event-platform-server.onrender.com

## Features

- Authentication with email and password (BetterAuth) and GitHub social login
- Password validation: at least 6 characters, one uppercase and one lowercase letter
- JWT protected API routes (create, update, delete, join and personal lists)
- Create events with form validation (title, description, future date)
- Browse upcoming events and view full event details
- Join events and see them in a Joined Events page
- Manage Events page to update or delete your own events (modal based, no browser alerts)
- Private routes: Create Event, Manage Events and Joined Events need login
- Light and dark theme toggle that changes the whole site
- Loading spinners while data is being fetched
- Fully responsive design with DaisyUI and Tailwind CSS

## Tech Stack

- Next.js (App Router) and TypeScript
- Tailwind CSS and DaisyUI
- BetterAuth with MongoDB adapter
- JWT (jose on the client, jsonwebtoken on the server)
- Express.js and MongoDB (server)
- react-hot-toast for notifications
- Deployed on Vercel (client) and Render (server)

## Getting Started

1. Install packages: npm install
2. Create a .env.local file with these variables (use your own values): NEXT_PUBLIC_API_URL, BETTER_AUTH_URL, BETTER_AUTH_SECRET, MONGODB_URI, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, JWT_SECRET
3. Start the development server: npm run dev

Open http://localhost:3000 in your browser.

## Notes

