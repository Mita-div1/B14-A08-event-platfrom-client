import { Suspense } from "react";
import Hero from "../components/Hero";
import Features from "../components/Features";
import RecentEvents from "../components/RecentEvents";
import Gallery from "../components/Gallery";
import Newsletter from "../components/Newsletter";

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <Suspense fallback={<div className="flex justify-center py-16"><span className="loading loading-spinner loading-lg text-white"></span></div>}>
        <RecentEvents />
      </Suspense>
      <Gallery />
      <Newsletter />
    </main>
  );
}