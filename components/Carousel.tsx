"use client";
import { useGlobalContext } from "@/context/GlobalContextProvider";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FiStar } from "react-icons/fi";
import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Carousel({
  title,
  data,
  loading,
}: {
  title: string;
  data: any[];
  loading: any;
}) {
  const { urls } = useGlobalContext();
  const router = useRouter();

  // Skeleton Loading UI
  const renderSkeleton = () => {
    return Array.from({ length: 15 }).map((_, index) => (
      <SwiperSlide key={index} className="!w-[176px] !h-[320px]">
        <div className="flex flex-col gap-2">
          {/* Image Skeleton */}
          <div className="h-[264px] w-full bg-gray-800 rounded-xl animate-pulse" />
          {/* Text Skeleton */}
          <div className="px-2">
            <div className="h-4 bg-gray-700 rounded-lg animate-pulse w-3/4 mb-2" />
            <div className="h-4 bg-gray-700 rounded-lg animate-pulse w-1/2" />
          </div>
        </div>
      </SwiperSlide>
    ));
  };

  // Not Found UI
  const renderNotFound = () => {
    return (
      <div className="w-full flex items-center justify-center py-10">
        <span className="text-gray-400 text-lg">No data found</span>
      </div>
    );
  };

  return (
    <div className="w-full py-8 bg-black">
      <div className="px-4 mb-6">
        <h1 className="text-2xl font-bold text-white">{title}</h1>
      </div>

      <Swiper
        slidesPerView={"auto"}
        spaceBetween={10}
        freeMode={{
          enabled: true,
          momentum: true,
          momentumRatio: 0.5,
          momentumBounceRatio: 0.5,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        breakpoints={{
          320: {
            slidesPerView: 3.5,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 4.5,
            spaceBetween: 15,
          },
          1024: {
            slidesPerView: 5.5,
            spaceBetween: 20,
          },
          1280: {
            slidesPerView: 6.5,
            spaceBetween: 20,
          },
        }}
        modules={[FreeMode]}
        className="!px-4 !pb-10 !overflow-visible"
      >
        {loading ? (
          renderSkeleton()
        ) : data?.length === 0 ? (
          <SwiperSlide className="!w-full !h-auto">
            {renderNotFound()}
          </SwiperSlide>
        ) : (
          data.map((item, index) => (
            <SwiperSlide
              key={index}
              className="!w-[176px] !h-[320px]" // Increased height to accommodate external info
            >
              <div
                className="flex flex-col gap-2"
                onClick={() => router.push(`/movie/${item.id}`)}
              >
                {/* Image Container */}
                <div className="group relative h-[264px] w-full bg-gray-800 rounded-xl overflow-hidden transition-all hover:transform hover:scale-105 hover:z-10 shadow-xl">
                  {item.poster_path && (
                    <Image
                      src={`${urls?.poster}${item.poster_path}`}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                </div>

                {/* External Info Container */}
                <div className="px-2">
                  {/* Title */}
                  <h3 className="text-white font-semibold truncate text-sm mt-1">
                    {item.title}
                  </h3>

                  {/* Rating and Year */}
                  <div className="flex">
                    <div className="flex items-center gap-1 text-yellow-400 grow">
                      <FiStar className="text-xs" />
                      <span className="text-xs font-light">
                        {item.vote_average?.toFixed(1)}
                      </span>
                    </div>
                    <span className="text-xs text-white pr-4">
                      {new Date(item.release_date).getFullYear()}
                    </span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </div>
  );
}