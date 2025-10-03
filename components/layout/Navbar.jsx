"use client";

import Link from 'next/link';
import { FaVideo, FaChevronDown, FaBars, FaTimes, FaExclamationTriangle, FaFire, FaStar, FaPlayCircle } from 'react-icons/fa';
import { getMovieGenres, getTvSeriesGenres } from '../../lib/api';
import SearchBar from '../SearchBar';
import { useEffect, useState } from 'react';

// Reusable class for dropdown items for consistency
const dropdownItemClass = "block w-full text-left px-4 py-3 text-sm text-gray-200 hover:bg-gradient-to-r hover:from-red-600 hover:to-purple-700 hover:text-white transition-all duration-300 rounded-md";
const subDropdownItemClass = "block w-full text-left px-4 py-2.5 text-sm text-gray-200 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-700 hover:text-white transition-all duration-300 rounded";

// Reusable class for sub-dropdown triggers
const subDropdownTriggerClass = "flex justify-between items-center w-full px-4 py-3 text-sm text-gray-200 hover:bg-gradient-to-r hover:from-blue-700 hover:to-purple-800 cursor-pointer rounded-md";

// Utility function to create a slug from a genre name
const createSlug = (name) => {
  return name.toLowerCase().replace(/\s+/g, '-');
};

// Define DropdownMenu component outside of Navbar
const DropdownMenu = ({ title, categories, genres, genrePathPrefix, icon: Icon }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isGenresOpen, setIsGenresOpen] = useState(false);
  let timeoutId;

  const handleMouseEnter = () => {
    clearTimeout(timeoutId);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutId = setTimeout(() => {
      setIsOpen(false);
      setIsGenresOpen(false);
    }, 150);
  };

  const handleGenresMouseEnter = () => {
    setIsGenresOpen(true);
  };

  const handleGenresMouseLeave = () => {
    setIsGenresOpen(false);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className="flex items-center text-white hover:text-yellow-300 transition-all duration-300 font-semibold px-3 py-2 rounded-lg hover:bg-white/10 group"
      >
        {Icon && <Icon className="mr-1.5 text-lg group-hover:scale-110 transition-transform" />}
        {title} <FaChevronDown className={`ml-1.5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="absolute left-0 mt-3 w-56 bg-slate-800/95 dark:bg-gray-900/95 backdrop-blur-lg rounded-xl shadow-2xl border border-slate-700/50 z-20">
          <div className="p-2">
            {categories.map((category) => (
              <Link
                key={category.href}
                href={category.href}
                className={dropdownItemClass}
                onClick={() => setIsOpen(false)}
              >
                <span className="flex items-center">
                  {category.icon && <category.icon className="mr-2 text-yellow-400" />}
                  {category.label}
                </span>
              </Link>
            ))}
            {genres.length > 0 && (
              <div
                className="relative"
                onMouseEnter={handleGenresMouseEnter}
                onMouseLeave={handleGenresMouseLeave}
              >
                <button className={subDropdownTriggerClass}>
                  <span className="flex items-center">
                    <FaPlayCircle className="mr-2 text-blue-400" />
                    Genres
                  </span>
                  <FaChevronDown className={`ml1 transition-transform duration-200 ${isGenresOpen ? 'rotate-180' : ''}`} />
                </button>
                {isGenresOpen && (
                  <div className="absolute top-0 left-full mt-0 w-56 bg-slate-800/95 dark:bg-gray-900/95 backdrop-blur-lg rounded-xl shadow-2xl border border-slate-700/50 z-30 ml1">
                    <div className="p-2 max-h-72 overflow-y-auto custom-scrollbar">
                      {genres.map((genre) => (
                        <Link
                          key={genre.id}
                          href={`/${genrePathPrefix}/genre/${createSlug(genre.name)}`}
                          className={subDropdownItemClass}
                          onClick={() => { setIsOpen(false); setIsGenresOpen(false); }}
                        >
                          {genre.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default function Navbar() {
  const [movieGenres, setMovieGenres] = useState([]);
  const [tvGenres, setTvGenres] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAdultWarning, setShowAdultWarning] = useState(false);
  const [adultContentType, setAdultContentType] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const [fetchedMovieGenres, fetchedTvGenres] = await Promise.all([
          getMovieGenres(),
          getTvSeriesGenres()
        ]);
        setMovieGenres(fetchedMovieGenres);
        setTvGenres(fetchedTvGenres);
      } catch (error) {
        console.error("Error fetching genres in Navbar:", error);
      }
    };
    fetchGenres();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAdultContentClick = (type) => {
    setAdultContentType(type);
    setShowAdultWarning(true);
  };

  const confirmAdultContent = () => {
    if (adultContentType === 'erotic') {
      window.location.href = '/adult/erotic-movies';
    } else if (adultContentType === 'adult-list') {
      window.location.href = '/adult/adult-movies';
    }
    setShowAdultWarning(false);
  };

  // Movie categories with icons
  const movieCategories = [
    { href: "/movie/popular", label: "Popular", icon: FaFire },
    { href: "/movie/now_playing", label: "Now Playing", icon: FaPlayCircle },
    { href: "/movie/upcoming", label: "Upcoming", icon: FaStar },
    { href: "/movie/top_rated", label: "Top Rated", icon: FaStar },
  ];

  // TV Series categories with icons
  const tvCategories = [
    { href: "/tv-show/popular", label: "Popular", icon: FaFire },
    { href: "/tv-show/airing_today", label: "Airing Today", icon: FaPlayCircle },
    { href: "/tv-show/on_the_air", label: "On The Air", icon: FaStar },
    { href: "/tv-show/top_rated", label: "Top Rated", icon: FaStar },
  ];

  return (
    <nav className={`bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 dark:from-gray-900 dark:via-purple-900 dark:to-gray-900 p-4 sticky top-0 z-50 shadow-2xl transition-all duration-500 ${isScrolled ? 'py-3 shadow-2xl backdrop-blur-md bg-slate-900/95' : 'py-4'}`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-6">
          {/* Logo dengan efek glow */}
          <Link href="/" className="flex items-center text-3xl font-bold transition-all duration-500 group relative">
            <div className="relative">
              <FaVideo className="text-white mr-3 group-hover:text-yellow-300 transition-colors duration-300 group-hover:scale-110 drop-shadow-lg" />
              <div className="absolute inset-0 bg-yellow-400 rounded-full blur-sm group-hover:blur-md opacity-70 group-hover:opacity-90 transition-all duration-500"></div>
            </div>
            <span className="rainbow-text hover-glow transition-all duration-500 relative">
              Sflix
              <span className="absolute -inset-1 bg-gradient-to-r from-red-600 to-blue-600 rounded-lg blur opacity-30 group-hover:opacity-70 transition duration-1000 group-hover:duration-200"></span>
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {/* Trending dengan icon */}
            <Link href="/Trending" className="flex items-center text-white font-semibold hover:text-yellow-300 transition-all duration-300 px-4 py-2 rounded-lg hover:bg-white/10 group">
              <FaFire className="mr-2 text-orange-400 group-hover:scale-110 transition-transform" />
              Trending
            </Link>
            
            <DropdownMenu
              title="Movies"
              categories={movieCategories}
              genres={movieGenres}
              genrePathPrefix="movie"
              icon={FaPlayCircle}
            />
            
            <DropdownMenu
              title="TV Series"
              categories={tvCategories}
              genres={tvGenres}
              genrePathPrefix="tv-show"
              icon={FaPlayCircle}
            />
            
            {/* Tombol Erotic dengan efek khusus */}
            <button
              onClick={() => handleAdultContentClick('erotic')}
              className="flex items-center text-white font-semibold hover:text-blue-300 transition-all duration-300 px-4 py-2 rounded-lg hover:bg-gradient-to-r hover:from-blue-900/30 hover:to-purple-900/30 group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                <FaStar className="mr-2 text-blue-400 group-hover:scale-110 transition-transform" />
                Erotic
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
            </button>
            
            {/* Tombol Adult dengan efek khusus */}
            <button
              onClick={() => handleAdultContentClick('adult-list')}
              className="flex items-center text-white font-semibold hover:text-red-300 transition-all duration-300 px-4 py-2 rounded-lg hover:bg-gradient-to-r hover:from-red-900/30 hover:to-pink-900/30 group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                <FaExclamationTriangle className="mr-2 text-red-400 group-hover:scale-110 transition-transform" />
                Adult
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-pink-600/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
            </button>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Search Bar dengan width responsif */}
          <div className="w-64 xl:w-80 hidden md:block transition-all duration-300">
            <SearchBar />
          </div>
          
          {/* Mobile Menu Button dengan efek */}
          <button 
            className="lg:hidden text-white p-3 rounded-xl bg-slate-800/60 dark:bg-gray-700/60 hover:bg-slate-700/80 dark:hover:bg-gray-600/80 transition-all duration-300 backdrop-blur-sm border border-slate-700/50 hover:border-slate-600/50 hover:scale-105"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <FaTimes className="text-lg" /> : <FaBars className="text-lg" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu dengan backdrop blur */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-slate-900/95 dark:bg-gray-900/95 backdrop-blur-lg border-t border-slate-700/50 mt-3 p-6 rounded-b-2xl shadow-2xl">
          <div className="mb-6">
            <SearchBar />
          </div>
          <div className="flex flex-col space-y-4">
            <Link 
              href="/Trending" 
              className="flex items-center text-white font-semibold hover:text-yellow-300 transition-all duration-300 py-3 px-4 rounded-xl hover:bg-white/10 group"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <FaFire className="mr-3 text-orange-400" />
              Trending
            </Link>
            
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                handleAdultContentClick('erotic');
              }}
              className="flex items-center text-white font-semibold hover:text-blue-300 transition-all duration-300 py-3 px-4 rounded-xl hover:bg-gradient-to-r hover:from-blue-900/30 hover:to-purple-900/30 text-left"
            >
              <FaStar className="mr-3 text-blue-400" />
              Erotic Content
            </button>
            
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                handleAdultContentClick('adult-list');
              }}
              className="flex items-center text-white font-semibold hover:text-red-300 transition-all duration-300 py-3 px-4 rounded-xl hover:bg-gradient-to-r hover:from-red-900/30 hover:to-pink-900/30 text-left"
            >
              <FaExclamationTriangle className="mr-3 text-red-400" />
              Adult Movies
            </button>
            
            {/* Mobile Movie Section */}
            <div className="border-t border-slate-700/50 pt-4">
              <h3 className="text-white font-bold mb-3 text-lg flex items-center">
                <FaPlayCircle className="mr-2 text-yellow-400" />
                Movies
              </h3>
              <div className="grid grid-cols-2 gap-3 pl-2">
                {movieCategories.map((category) => (
                  <Link 
                    key={category.href}
                    href={category.href} 
                    className="text-gray-300 hover:text-white transition-all duration-300 py-2 px-3 rounded-lg hover:bg-white/10 text-sm flex items-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {category.icon && <category.icon className="mr-2 text-yellow-400 text-xs" />}
                    {category.label}
                  </Link>
                ))}
              </div>
              
              <div className="mt-4 pl-2">
                <h4 className="text-gray-400 text-sm font-bold mb-2 flex items-center">
                  <FaStar className="mr-1 text-blue-400" />
                  Movie Genres
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {movieGenres.map((genre) => (
                    <Link
                      key={genre.id}
                      href={`/movie/genre/${createSlug(genre.name)}`}
                      className="text-xs text-gray-300 hover:text-white transition-all duration-300 py-1.5 px-2 rounded-md hover:bg-white/10"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {genre.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Mobile TV Series Section */}
            <div className="border-t border-slate-700/50 pt-4">
              <h3 className="text-white font-bold mb-3 text-lg flex items-center">
                <FaPlayCircle className="mr-2 text-purple-400" />
                TV Series
              </h3>
              <div className="grid grid-cols-2 gap-3 pl-2">
                {tvCategories.map((category) => (
                  <Link 
                    key={category.href}
                    href={category.href} 
                    className="text-gray-300 hover:text-white transition-all duration-300 py-2 px-3 rounded-lg hover:bg-white/10 text-sm flex items-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {category.icon && <category.icon className="mr-2 text-purple-400 text-xs" />}
                    {category.label}
                  </Link>
                ))}
              </div>
              
              <div className="mt-4 pl-2">
                <h4 className="text-gray-400 text-sm font-bold mb-2 flex items-center">
                  <FaStar className="mr-1 text-purple-400" />
                  TV Genres
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {tvGenres.map((genre) => (
                    <Link
                      key={genre.id}
                      href={`/tv-show/genre/${createSlug(genre.name)}`}
                      className="text-xs text-gray-300 hover:text-white transition-all duration-300 py-1.5 px-2 rounded-md hover:bg-white/10"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {genre.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Modal Peringatan Konten Dewasa */}
      {showAdultWarning && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl max-w-md w-full border border-slate-700/50 shadow-2xl">
            <div className="flex items-center mb-6 text-red-400">
              <FaExclamationTriangle className="text-3xl mr-3" />
              <h3 className="text-2xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                Adult Content Warning
              </h3>
            </div>
            <p className="text-gray-300 mb-8 text-lg leading-relaxed">
              This content is intended for viewers aged 18 and over only.
              Are you sure you want to continue?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowAdultWarning(false)}
                className="px-6 py-3 bg-slate-700 text-white rounded-xl hover:bg-slate-600 transition-all duration-300 font-semibold hover:scale-105"
              >
                Cancel
              </button>
              <button
                onClick={confirmAdultContent}
                className="px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-xl hover:from-red-700 hover:to-orange-700 transition-all duration-300 font-semibold hover:scale-105 shadow-lg"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* CSS untuk efek tambahan */}
      <style jsx>{`
        .rainbow-text {
          font-size: 1.8rem;
          background-image: linear-gradient(
            to right,
            #ff6b6b, #ffa726, #ffeb3b, #4cd964, 
            #4fc3f7, #5d6df9, #ff6bc9
          );
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          background-size: 300% 300%;
          animation: rainbow 4s ease infinite;
          font-weight: 800;
          text-shadow: 0 2px 10px rgba(0,0,0,0.3);
        }
        
        .hover-glow:hover {
          text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #ff6b6b, #5d6df9);
          border-radius: 3px;
        }
        
        @keyframes rainbow {
          0% { background-position: 0% 50% }
          50% { background-position: 100% 50% }
          100% { background-position: 0% 50% }
        }
      `}</style>
    </nav>
  );
}