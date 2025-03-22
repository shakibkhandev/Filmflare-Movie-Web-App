"use client";
import Carousel from "@/components/Carousel";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import { useGlobalContext } from "@/context/GlobalContextProvider";
import useFetch from "@/hooks/useFetch";

export default function Home() {
  const { data: topRated, loading: topLoad } = useFetch<{ results: any[] }>("/movie/top_rated");
  const { data: popular, loading: popularLoad } = useFetch<{ results: any[] }>("/movie/popular");
  const { data: nowPlaying, loading: nowLoad } = useFetch<{ results: any[] }>(
    "/movie/now_playing"
  );
  const { data: upcoming, loading: upcomingLoad } = useFetch<{ results: any[] }>("/movie/upcoming");
  const { urls } = useGlobalContext();

  if (!urls) return <div></div>;

  return (
    <main className="min-h-screen bg-black" id="home">
      <Header />
      <HeroSection />
      {topRated && <section className="w-full h-full" id="top-rated"><Carousel title="Top Rated" data={topRated.results} loading={topLoad}/></section>}
      {popular && <section className="w-full h-full" id="popular"><Carousel title="Popular" data={popular.results} loading={popularLoad}/></section>}
      {nowPlaying && <section className="w-full h-full" id="now-playing"><Carousel title="Now Playing" data={nowPlaying.results} loading={nowLoad}/></section>}
      {upcoming && <section className="w-full h-full" id="upcoming"><Carousel title="Upcoming" data={upcoming.results} loading={upcomingLoad}/></section>}
      <Footer />
    </main>
  );
}
