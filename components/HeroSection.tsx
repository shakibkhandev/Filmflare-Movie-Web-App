"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FiCalendar, FiClock, FiPlayCircle, FiStar } from "react-icons/fi";



// Import required modules
import { useGlobalContext } from "@/context/GlobalContextProvider";
import useFetch from "@/hooks/useFetch";
import { EffectCoverflow } from "swiper/modules";

const slideUp = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

const staggerItems = {
  visible: { 
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    }
  }
};

export default function HeroSection() {
  const { data } = useFetch<{ results: any[] }>("/movie/upcoming");
  const { urls } = useGlobalContext();
  const [bgImage, setBgImage] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (data?.results?.length) {
      setBgImage(urls?.backdrop + data.results[0].backdrop_path);
    }
  }, [data, urls]);

  if (!data?.results) return <SkeletonHero />;

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Dynamic Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={bgImage || ''}
          className="object-cover w-full h-full"
          alt="Hero Background"
          width={1920}
          height={720}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        </div>
      </div>

      {/* Content Details Section */}
      <div className="relative z-20 pt-20 pb-8 min-h-[70vh] flex items-center">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerItems}
          className="container mx-auto px-4"
        >
          <div className="max-w-4xl space-y-6">
            <motion.h1
              variants={slideUp}
              className="text-4xl md:text-6xl font-bold text-white leading-tight drop-shadow-2xl"
            >
              {data.results[currentSlide]?.title}
            </motion.h1>

            <motion.p
              variants={slideUp}
              className="text-base md:text-lg text-gray-200 line-clamp-3 drop-shadow-lg"
            >
              {data.results[currentSlide]?.overview}
            </motion.p>

            <motion.div
              variants={slideUp}
              className="flex flex-wrap gap-4"
            >
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <FiStar className="text-yellow-400 text-xl" />
                <span className="text-white font-medium">
                  {data.results[currentSlide]?.vote_average?.toFixed(1)}
                </span>
              </div>

              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <FiCalendar className="text-emerald-400 text-xl" />
                <span className="text-white font-medium">
                  {new Date(data.results[currentSlide]?.release_date).getFullYear()}
                </span>
              </div>

              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <FiClock className="text-purple-400 text-xl" />
                <span className="text-white font-medium">142m</span>
              </div>
            </motion.div>

            <motion.div 
              variants={slideUp}
              className="flex gap-4 mt-4"
            >
              <button className="flex items-center gap-2 bg-gradient-to-r from-red-400 to-rose-500 px-6 py-3 rounded-full hover:scale-105 transition-transform cursor-pointer">
                <FiPlayCircle className="text-xl text-white" />
                <span className="font-semibold text-white">Watch Trailer</span>
              </button>
              
              <button className="flex items-center gap-2 border-2 border-white/30 text-white px-6 py-3 rounded-full backdrop-blur-sm hover:bg-white/10 transition-colors cursor-pointer">
                <span className="font-semibold">Add to List</span>
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Swiper Carousel */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-[80%] max-w-3xl h-[250px] z-10">
        <Swiper
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={3}
          spaceBetween={10}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false,
          }}
          modules={[EffectCoverflow]}
          className="h-full"
          onSlideChange={(swiper) => {
            const activeSlide = data?.results?.[swiper.realIndex];
            if (activeSlide) {
              setBgImage(urls?.backdrop + activeSlide.backdrop_path);
              setCurrentSlide(swiper.realIndex);
            }
          }}
        >
          {data.results.map((item, index) => (
            <SwiperSlide
              key={index}
              className="flex items-center justify-center"
            >
              <Image
                src={`${urls?.poster}${item.poster_path}`}
                className="h-[270px] w-auto rounded-lg shadow-2xl bg-transparent"
                alt={`${item.title} poster`}
                width={270}
                height={270}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}


const SkeletonHero = () => {
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-gray-900">
      {/* Background Skeleton */}
      <div className="absolute inset-0 z-0 bg-gray-800 animate-pulse" />
      
      {/* Content Skeleton */}
      <div className="relative z-20 pt-20 pb-8 min-h-[70vh] flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl space-y-6">
            {/* Title Skeleton */}
            <div className="h-12 bg-gray-700 rounded-full animate-pulse w-3/4 mb-6" />
            
            {/* Description Skeleton */}
            <div className="space-y-2">
              <div className="h-4 bg-gray-700 rounded-full animate-pulse w-full" />
              <div className="h-4 bg-gray-700 rounded-full animate-pulse w-5/6" />
              <div className="h-4 bg-gray-700 rounded-full animate-pulse w-2/3" />
            </div>

            {/* Metadata Skeleton */}
            <div className="flex flex-wrap gap-4">
              {[1, 2, 3].map((i) => (
                <div 
                  key={i}
                  className="h-10 bg-gray-700 rounded-lg animate-pulse w-24"
                />
              ))}
            </div>

            {/* Buttons Skeleton */}
            <div className="flex gap-4 mt-4">
              <div className="h-12 bg-gray-700 rounded-full animate-pulse w-36" />
              <div className="h-12 bg-gray-700 rounded-full animate-pulse w-36" />
            </div>
          </div>
        </div>
      </div>

      {/* Carousel Skeleton */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-[80%] max-w-3xl h-[250px] z-10">
        <Swiper
          effect="coverflow"
          slidesPerView={3}
          spaceBetween={10}
          modules={[EffectCoverflow]}
          className="h-full"
        >
          {[1, 2, 3, 4, 5].map((i) => (
            <SwiperSlide key={i}>
              <div className="h-[270px] w-full bg-gray-700 rounded-lg animate-pulse" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};