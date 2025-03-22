"use client";
import Carousel from "@/components/Carousel";
import CastSection from "@/components/MovieDetails/CastSection";
import DetailsHeroSection from "@/components/MovieDetails/DetailsHeroSection";
import useFetch from "@/hooks/useFetch";
import { useParams } from "next/navigation";

export default function page() {
  const { id } = useParams();
  const { data: recommendations, loading: recomLoad } = useFetch<{ results: any[] }>(
    `/movie/${id}/recommendations`
  );
  const { data: similar, loading: similarLoad } = useFetch<{ results: any[] }>(
    `/movie/${id}/similar`
  );

  return (
    <div className="min-h-screen bg-black">
      <DetailsHeroSection id={id}/>
      <CastSection id={id}/>
      {recommendations && (
        <Carousel data={recommendations.results} title="Recommendations" loading={recomLoad}/>
      )}
      {similar && <Carousel data={similar.results} title="Similar" loading={similarLoad}/>}
    </div>
  );
}
