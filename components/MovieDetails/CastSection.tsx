"use client";
import { useGlobalContext } from "@/context/GlobalContextProvider";
import useFetch from "@/hooks/useFetch";
import Image from "next/image";
import { useState } from "react";
import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface CastSectionProps {
  id: any;
}

export default function CastSection({ id }: CastSectionProps) {
  const { data, loading, error } = useFetch<any>(`/movie/${id}/credits`);
  const { urls } = useGlobalContext();

  const Thumbnail = ({ src, alt }: { src?: string | null; alt: string }) => {
    const [hasError, setHasError] = useState(false);

    if (hasError || !src) {
      return (
        <div className="h-[200px] w-full bg-gray-800 rounded-xl flex items-center justify-center">
          <span className="text-gray-400 text-sm">Image not available</span>
        </div>
      );
    }

    return (
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        onError={() => setHasError(true)}
      />
    );
  };

  const renderSection = (title: string, items: any[], type: 'cast' | 'crew') => {
    if (error) {
      return (
        <div className="px-4 mb-6">
          <h1 className="text-2xl font-bold text-white">{title}</h1>
          <div className="relative w-full h-40 mt-4">
            <div className="h-full w-full bg-gray-800 rounded-xl flex items-center justify-center">
              <span className="text-gray-400 text-sm">Error loading data</span>
            </div>
          </div>
        </div>
      );
    }

    return (
      <>
        <div className="px-4 mb-6">
          <h1 className="text-2xl font-bold text-white">{title}</h1>
        </div>

        <Swiper
          slidesPerView="auto"
          spaceBetween={10}
          freeMode={{ enabled: true }}
          breakpoints={{
            320: { slidesPerView: 2.5, spaceBetween: 8 },
            480: { slidesPerView: 3.5, spaceBetween: 10 },
            640: { slidesPerView: 4.5, spaceBetween: 15 },
            1024: { slidesPerView: 5.5, spaceBetween: 20 },
            1280: { slidesPerView: 6.5, spaceBetween: 20 },
          }}
          modules={[FreeMode]}
          className="!px-4 !pb-10 !overflow-visible"
        >
          {loading ? (
            Array.from({ length: 15 }).map((_, index) => (
              <SwiperSlide key={index} className="!w-[140px] !h-[280px]">
                <div className="flex flex-col gap-2">
                  <div className="h-[200px] w-full bg-gray-800 rounded-xl animate-pulse" />
                  <div className="px-2">
                    <div className="h-4 bg-gray-700 rounded-lg animate-pulse w-3/4 mb-2" />
                    <div className="h-4 bg-gray-700 rounded-lg animate-pulse w-1/2" />
                  </div>
                </div>
              </SwiperSlide>
            ))
          ) : (
            items?.map((item, index) => (
              <SwiperSlide
                key={index}
                className="!w-[140px] !h-[280px] cursor-pointer"
              >
                <div className="flex flex-col gap-2">
                  <div className="group relative h-[200px] w-full bg-gray-800 rounded-xl overflow-hidden transition-all hover:transform hover:scale-105 hover:z-10 shadow-xl">
                    <Thumbnail
                      src={item.profile_path && `${urls?.profile}${item.profile_path}`}
                      alt={item.name}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  </div>
                  <div className="px-2">
                    <h3 className="text-white font-semibold truncate text-sm mt-1">
                      {item.name}
                    </h3>
                    <h3 className="text-gray-400 font-medium truncate text-sm mt-1">
                      {type === 'cast' ? item.character : item.job}
                    </h3>
                  </div>
                </div>
              </SwiperSlide>
            ))
          )}
        </Swiper>
      </>
    );
  };

  return (
    <div className="w-full py-8 bg-black">
      {renderSection("Cast", data?.cast, 'cast')}
      {renderSection("Crew", data?.crew, 'crew')}
    </div>
  );
}