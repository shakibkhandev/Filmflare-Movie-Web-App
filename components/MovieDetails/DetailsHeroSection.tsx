"use client";
import { useGlobalContext } from '@/context/GlobalContextProvider';
import useFetch from '@/hooks/useFetch';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface DetailsHeroSectionProps {
  id: any;
}

export default function DetailsHeroSection({ id }: DetailsHeroSectionProps) {
  const { data, loading, error } = useFetch<any>(`/movie/${id}`);
  const { urls } = useGlobalContext();

  // Handle loading state
  if (loading) {
    return (
      <div className="min-h-[500px] flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-2xl text-gray-300"
        >
          Loading...
        </motion.div>
      </div>
    );
  }

  // Handle error state
  if (error || !data) {
    return (
      <div className="min-h-[500px] flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
        <p className="text-2xl text-red-500">Failed to load movie details.</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-[600px] flex items-center justify-center text-white overflow-hidden"
    >
      {/* Backdrop Image */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <Image
          src={`${urls?.backdrop}${data.backdrop_path}`}
          alt={data.title}
          fill
          priority
          className="object-cover"
        />
      </motion.div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent z-1" />

      {/* Content Container */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="relative z-10 container mx-auto px-4 py-12 flex flex-col md:flex-row gap-8 items-center"
      >
        {/* Poster with Hover Effect */}
        <motion.div
          whileHover={{ y: -10 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="w-56 md:w-72 lg:w-80 relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
          <Image
            src={`${urls?.poster}${data.poster_path}`}
            alt={data.title}
            width={400}
            height={600}
            className="rounded-xl shadow-2xl transform group-hover:shadow-2xl transition-all"
          />
        </motion.div>

        {/* Details Container */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex-1 space-y-6 backdrop-blur-lg bg-white/5 p-6 rounded-xl border border-white/10"
        >
          <div className="space-y-2">
            <h1 className="text-3xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text">
              {data.title}
            </h1>
            <div className="flex items-center gap-4 text-lg text-gray-300">
              <span className="flex items-center gap-1">
                <span className="text-primary">★</span>
                {data.vote_average.toFixed(1)}
              </span>
              <span>•</span>
              <span>{new Date(data.release_date).toLocaleDateString()}</span>
              <span>•</span>
              <span>{Math.floor(data.runtime / 60)}h {data.runtime % 60}m</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {data.genres?.map((genre: any) => (
              <motion.span
                key={genre.id}
                whileHover={{ scale: 1.05 }}
                className="px-3 py-1 rounded-full bg-white/10 text-sm backdrop-blur-sm"
              >
                {genre.name}
              </motion.span>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl"
          >
            {data.overview}
          </motion.p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}