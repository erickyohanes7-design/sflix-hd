// components/MediaCard.jsx
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { generateSlug, checkForDuplicateTitleYear } from '../lib/api';

export default function MediaCard({ mediaItem }) {
  const [isHovered, setIsHovered] = useState(false);
  const [mediaSlug, setMediaSlug] = useState('');

  // ✅ PERBAIKAN: Generate slug setelah component mount
  useEffect(() => {
    const slug = generateSlug(mediaItem);
    setMediaSlug(slug);
    
    // ✅ DEBUG: Log untuk memastikan slug benar
    console.log('🎬 MediaCard Slug Generation:', {
      title: mediaItem.title || mediaItem.name,
      year: mediaItem.release_date?.split('-')[0] || mediaItem.first_air_date?.split('-')[0],
      id: mediaItem.id,
      generatedSlug: slug
    });
  }, [mediaItem]);

  const posterPath = mediaItem.poster_path;
  const imageUrl = posterPath
    ? `https://image.tmdb.org/t/p/w500${posterPath}`
    : 'https://via.placeholder.com/500x750.png?text=No+Image';

  const isMovie = mediaItem.title !== undefined;
  const title = isMovie ? mediaItem.title : mediaItem.name;
  const mediaType = isMovie ? 'movie' : 'tv-show';

  let year = '';
  if (mediaItem.release_date) {
    year = new Date(mediaItem.release_date).getFullYear();
  } else if (mediaItem.first_air_date) {
    year = new Date(mediaItem.first_air_date).getFullYear();
  } else {
    year = 'N/A';
  }

  const linkHref = `/${mediaType}/${mediaSlug}`;

  return (
    <div
      className="relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={linkHref} className="block rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="relative w-full h-80 bg-gray-800">
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 600px) 50vw, (max-width: 1200px) 25vw, 15vw"
            style={{ objectFit: 'cover' }}
            className="transition-transform duration-300 transform group-hover:scale-110"
            priority={false}
          />

          {/* Overlay dan Teks yang Muncul Saat Hover */}
          <div className={`absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-end p-4 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <h3 className="text-white text-lg font-bold line-clamp-2">
              {title}
            </h3>
            <p className="text-gray-300 text-sm font-light">
              ({year})
            </p>
            {/* ✅ DEBUG: Tampilkan ID untuk troubleshooting */}
            <p className="text-gray-400 text-xs mt-1">ID: {mediaItem.id}</p>
          </div>
        </div>
      </Link>

      {/* Tampilan Judul di Bawah Poster */}
      <div className="mt-2 text-center px-1">
        <h3 className="text-white text-sm font-semibold truncate">
          {title}
        </h3>
        <p className="text-gray-400 text-xs font-light">
          ({year})
        </p>
      </div>
    </div>
  );
}