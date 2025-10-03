"use client";

import React from 'react';
import Head from 'next/head';

export default function About() {
  return (
    <>
      <Head>
        <title>Sflix - Watch Free HD Movies & TV Series Online</title>
        <meta name="description" content="Sflix - Ultimate free streaming platform with HD movies, TV series, and comprehensive entertainment database. No registration required. Watch anytime, anywhere." />
        <meta name="keywords" content="free movies online, HD streaming, TV series free, watch movies free, no registration movies, latest films, TV shows online, movie database, entertainment platform" />
        <meta property="og:title" content="Sflix - Premium Free Streaming Experience" />
        <meta property="og:description" content="Experience unlimited HD movies and TV series streaming completely free. Advanced features, curated content, and seamless viewing on any device." />
        <meta property="og:image" content="https://live.staticflickr.com/65535/54812286746_f853554453_b.jpg" />
        <meta property="og:url" content="https://sflix-hd.netlify.app/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-slate-800/80 to-purple-900/80 backdrop-blur-lg rounded-2xl p-8 mb-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Sflix
              </h1>
              <p className="text-xl text-gray-300 mb-6 font-light">
                Your Ultimate Destination for Free HD Entertainment
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                <div className="text-center p-4 bg-slate-800/50 rounded-lg backdrop-blur-sm">
                  <div className="text-2xl font-bold text-orange-400">10K+</div>
                  <div className="text-sm text-gray-400">Movies</div>
                </div>
                <div className="text-center p-4 bg-slate-800/50 rounded-lg backdrop-blur-sm">
                  <div className="text-2xl font-bold text-purple-400">5K+</div>
                  <div className="text-sm text-gray-400">TV Series</div>
                </div>
                <div className="text-center p-4 bg-slate-800/50 rounded-lg backdrop-blur-sm">
                  <div className="text-2xl font-bold text-blue-400">HD</div>
                  <div className="text-sm text-gray-400">Quality</div>
                </div>
                <div className="text-center p-4 bg-slate-800/50 rounded-lg backdrop-blur-sm">
                  <div className="text-2xl font-bold text-green-400">Free</div>
                  <div className="text-sm text-gray-400">Forever</div>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="mb-8 flex justify-center">
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-orange-600 to-purple-600 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition duration-1000"></div>
                <img
                  src="https://live.staticflickr.com/65535/54812286746_f853554453_b.jpg"
                  alt="Premium movie streaming experience with film reels and cinematic elements"
                  width={1024}
                  height={416}
                  className="relative rounded-xl shadow-2xl transform group-hover:scale-[1.02] transition duration-500"
                  loading="eager"
                />
              </div>
            </div>
          </div>

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center space-x-2 text-sm">
              <li>
                <a href="/" className="text-gray-400 hover:text-orange-400 transition-colors duration-200 flex items-center">
                  <span className="hover:scale-110 transition-transform">🏠</span>
                  <span className="ml-2">Home</span>
                </a>
              </li>
              <li className="text-gray-600">❯</li>
              <li className="text-orange-400 font-semibold">About Sflix</li>
            </ol>
          </nav>

          {/* Main Content */}
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700">
                <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
                <div className="space-y-3">
                  {[
                    { href: "/movie/genre/crime", label: "🎬 Browse Movies", color: "orange" },
                    { href: "/tv-show/genre/mystery", label: "📺 TV Series", color: "purple" },
                    { href: "/Trending", label: "🔥 Trending", color: "red" },
                    { href: "/tv-show/genre/animation", label: "🎭 Genres", color: "blue" }
                  ].map((link, index) => (
                    <a
                      key={index}
                      href={link.href}
                      className={`block p-3 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-all duration-200 transform hover:scale-105 hover:border-l-4 hover:border-${link.color}-400`}
                    >
                      <span className="text-white font-medium">{link.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-3 space-y-8">
              {/* What is Sflix */}
              <section className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-slate-700 hover:border-orange-500/30 transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-2 h-8 bg-orange-500 rounded-full mr-4"></div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                    What is Sflix?
                  </h2>
                </div>
                <div className="space-y-4 text-gray-300 leading-relaxed">
                  <p className="text-lg">
                    Sflix is a revolutionary free streaming platform that provides the most complete, accessible, and always up-to-date movie and TV series database. Established with the mission to provide accurate entertainment information, we offer more than just streaming - we provide detailed titles, posters, cast information, and user reviews.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 mt-6">
                    <div className="flex items-start space-x-3 p-4 bg-slate-700/30 rounded-lg">
                      <span className="text-2xl">🎯</span>
                      <div>
                        <h4 className="font-semibold text-white">Curated Content</h4>
                        <p className="text-sm text-gray-400">Handpicked selections for every taste</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-4 bg-slate-700/30 rounded-lg">
                      <span className="text-2xl">⚡</span>
                      <div>
                        <h4 className="font-semibold text-white">Instant Access</h4>
                        <p className="text-sm text-gray-400">No registration, start watching immediately</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Features */}
              <section className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-slate-700 hover:border-purple-500/30 transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-2 h-8 bg-purple-500 rounded-full mr-4"></div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Premium Features
                  </h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      icon: "🎭",
                      title: "Comprehensive Database",
                      description: "Thousands of movies and TV series across all genres",
                      link: "/adult/adult-movies"
                    },
                    {
                      icon: "🔍",
                      title: "Smart Search",
                      description: "Advanced search with filters and recommendations",
                      link: "/search?query=avengers"
                    },
                    {
                      icon: "💎",
                      title: "HD Streaming",
                      description: "Crystal clear HD quality without buffering",
                      link: "/Trending"
                    },
                    {
                      icon: "🌟",
                      title: "User Reviews",
                      description: "Real ratings and reviews from our community",
                      link: "/tv-show/breaking-bad-2008"
                    },
                    {
                      icon: "🎬",
                      title: "Trailers & Clips",
                      description: "Watch previews before streaming",
                      link: "/tv-show/marvel-zombies-2025"
                    },
                    {
                      icon: "📱",
                      title: "Multi-Device",
                      description: "Seamless experience on all devices",
                      link: "/"
                    }
                  ].map((feature, index) => (
                    <div key={index} className="group p-6 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-all duration-300 transform hover:scale-105">
                      <div className="text-3xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                      <p className="text-gray-400 mb-3">{feature.description}</p>
                      <a href={feature.link} className="text-orange-400 hover:text-orange-300 font-medium text-sm inline-flex items-center group/link">
                        Explore
                        <span className="ml-1 transform group-hover/link:translate-x-1 transition-transform">→</span>
                      </a>
                    </div>
                  ))}
                </div>
              </section>

              {/* Mission & Vision */}
              <section className="bg-gradient-to-r from-slate-800/50 to-blue-900/50 backdrop-blur-lg rounded-2xl p-8 border border-blue-500/30">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-4">
                    Our Mission & Vision
                  </h2>
                  <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                    Creating a world where premium entertainment is accessible to everyone, without barriers
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="text-center p-6">
                    <div className="text-4xl mb-4">🎯</div>
                    <h3 className="text-xl font-bold text-white mb-3">Mission</h3>
                    <p className="text-gray-400">
                      To be the most trusted and easily accessible free streaming source of film and TV series information globally.
                    </p>
                  </div>
                  <div className="text-center p-6">
                    <div className="text-4xl mb-4">👁️</div>
                    <h3 className="text-xl font-bold text-white mb-3">Vision</h3>
                    <p className="text-gray-400">
                      Building a digital ecosystem where quality entertainment is available to everyone without financial barriers.
                    </p>
                  </div>
                </div>
              </section>

              {/* CTA Section */}
              <section className="text-center bg-gradient-to-r from-orange-500/20 to-purple-500/20 backdrop-blur-lg rounded-2xl p-12 border border-orange-500/30">
                <h2 className="text-4xl font-black text-white mb-4">
                  Ready to Start Streaming?
                </h2>
                <p className="text-gray-300 text-xl mb-8 max-w-2xl mx-auto">
                  Join millions of users enjoying free HD movies and TV series
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <a 
                    href="/movie/popular" 
                    className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    🎬 Browse Movies
                  </a>
                  <a 
                    href="/tv-show/popular" 
                    className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    📺 Explore TV Series
                  </a>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Sflix",
            "url": "https://sflix-hd.netlify.app//",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://sflix-hd.netlify.app//search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            },
            "description": "Free HD movie and TV series streaming platform with comprehensive database and advanced features",
            "publisher": {
              "@type": "Organization",
              "name": "Sflix",
              "url": "https://sflix-hd.netlify.app//"
            }
          })
        }}
      />
    </>
  );
}