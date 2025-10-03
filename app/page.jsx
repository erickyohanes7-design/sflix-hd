"use client";

import React from 'react';
import Link from 'next/link';
import { FaHome, FaFilm, FaTv, FaSearch, FaStar, FaUsers, FaGlobe, FaPlay, FaAward, FaCalendarAlt, FaHeart, FaRocket } from 'react-icons/fa';

export default function About() {
  return (
    <div className="min-h-screen bg-slate-900 text-gray-300">
      {/* Enhanced Hero Section dengan gradient yang lebih dramatis */}
      <div className="relative bg-gradient-to-br from-orange-900/80 via-purple-900/60 to-slate-900 py-24 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1489599809519-364a47ae3cde?ixlib=rb-4.0.3')] bg-cover bg-center mix-blend-overlay opacity-10"></div>
        
        {/* Animated elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-orange-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-bounce"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-orange-500/20 px-4 py-2 rounded-full mb-6 border border-orange-500/30">
            <FaAward className="text-orange-400" />
            <span className="text-orange-300 font-semibold">United States of America's #1 Movie Database</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-400 bg-clip-text text-transparent">
            Sflix
          </h1>
          <p className="text-2xl md:text-3xl font-light mb-4 text-gray-200">
            Ultimate Movie & TV Series Database
          </p>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
            Your comprehensive guide to <span className="text-orange-400 font-semibold">10,000+ movies</span>, <span className="text-purple-400 font-semibold">5,000+ TV series</span>, reviews, and streaming information. Discover, explore, and enjoy cinematic excellence.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Link href="/" className="group bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-orange-500/25 hover:scale-105">
              <FaHome className="group-hover:scale-110 transition-transform" /> Home
            </Link>
            <Link href="/movie/genre/action" className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-blue-500/25 hover:scale-105">
              <FaFilm className="group-hover:scale-110 transition-transform" /> Browse Movies
            </Link>
            <Link href="/tv-show/genre/crime" className="group bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-purple-500/25 hover:scale-105">
              <FaTv className="group-hover:scale-110 transition-transform" /> Browse TV Series
            </Link>
          </div>
          
          <div className="flex justify-center items-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <FaPlay className="text-green-400" />
              <span>Latest Updates Daily</span>
            </div>
            <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
            <div className="flex items-center gap-2">
              <FaHeart className="text-red-400" />
              <span>Community Driven</span>
            </div>
            <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
            <div className="flex items-center gap-2">
              <FaRocket className="text-yellow-400" />
              <span>Fast & Responsive</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Enhanced Main Content */}
        <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/80 p-8 rounded-2xl shadow-2xl backdrop-blur-sm border border-gray-700/50">
          {/* Introduction dengan gambar yang lebih menarik */}
          <section className="mb-20">
            <div className="text-center mb-16">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-10 group">
                <img
                  src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=600"
                  alt="Sflix - Ultimate movie database platform"
                  width={1920}
                  height={600}
                  className="rounded-2xl transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-left">
                  <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                    Discover the World of Cinema with <span className="text-orange-400">Sflix</span>
                  </h2>
                  <p className="text-xl text-gray-300 max-w-3xl">
                    United States of America's most complete movie and TV series information platform with real-time updates and community insights.
                  </p>
                </div>
              </div>
              
              <div className="max-w-4xl mx-auto">
                <p className="text-lg text-gray-400 mb-6 leading-relaxed">
                  <strong className="text-orange-400">Sflix</strong> stands as United States of America's premier destination for comprehensive movie and TV series information, offering an unparalleled database that caters to both casual viewers and dedicated cinephiles. Our platform represents the culmination of years of development and community feedback, creating a space where entertainment enthusiasts can discover, explore, and engage with cinematic content like never before.
                </p>
                
                <p className="text-lg text-gray-400 leading-relaxed">
                  In today's rapidly evolving digital landscape, finding accurate, up-to-date information about movies and television shows can be challenging. <strong>Sflix solves this problem</strong> by providing a centralized hub that combines detailed metadata, user-generated content, and intelligent recommendations to enhance your entertainment experience.
                </p>
              </div>
            </div>
          </section>

          {/* Enhanced Features Grid dengan animasi */}
          <section className="mb-20">
            <div className="text-center mb-16">
              <div className="inline-block bg-orange-500/10 px-6 py-3 rounded-full border border-orange-500/20 mb-6">
                <span className="text-orange-400 font-semibold">WHY CHOOSE Sflix</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-300 to-yellow-300 bg-clip-text text-transparent">
                Premium Features for Movie Lovers
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Experience the difference with our comprehensive suite of features designed specifically for entertainment enthusiasts.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: FaFilm, title: "10,000+ Movies", desc: "Comprehensive database from classic to latest releases", color: "orange" },
                { icon: FaTv, title: "5,000+ TV Series", desc: "Complete TV show information with seasons and episodes", color: "purple" },
                { icon: FaSearch, title: "Smart Search", desc: "Advanced search with filters for genre, year, rating and more", color: "blue" },
                { icon: FaStar, title: "User Reviews", desc: "Real ratings and reviews from our active community", color: "yellow" },
                { icon: FaUsers, title: "Community Driven", desc: "Join thousands of movie enthusiasts sharing their passion", color: "green" },
                { icon: FaGlobe, title: "Global Content", desc: "Movies and TV series from around the world with subtitles", color: "red" }
              ].map((feature, index) => (
                <div key={index} className="group bg-gradient-to-br from-gray-700/40 to-gray-800/60 p-8 rounded-2xl border border-gray-600/30 hover:border-orange-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                  <div className={`text-5xl mb-6 text-${feature.color}-400 group-hover:scale-110 transition-transform duration-300 inline-flex p-4 bg-gray-700/50 rounded-2xl`}>
                    <feature.icon />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Enhanced Detailed Sections dengan konten SEO yang diperkaya */}
          <section className="mb-16 bg-gradient-to-r from-gray-800/40 to-gray-900/60 p-10 rounded-2xl border border-gray-700/50">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-orange-500/20 p-3 rounded-2xl">
                <FaFilm className="text-3xl text-orange-400" />
              </div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-300 to-yellow-300 bg-clip-text text-transparent">
                Complete Movie Database United States of America
              </h2>
            </div>
            
            <div className="space-y-8 text-justify">
              <p className="text-lg text-gray-300 leading-relaxed">
                <strong className="text-orange-400">Sflix</strong> has established itself as United States of America's most trusted source for comprehensive movie and television information. Our platform serves as an extensive <strong>movie database United States of America</strong> that goes beyond basic listings to provide deep insights into every aspect of film and television production. With meticulous attention to detail, we've built a resource that film students, critics, and casual viewers alike can rely on for accurate, up-to-date information.
              </p>
              
              <p className="text-lg text-gray-300 leading-relaxed">
                What sets Sflix apart in the crowded space of <strong>movie information United States of America</strong> platforms is our commitment to depth and accuracy. Each title in our database includes comprehensive details such as complete cast and crew information, production notes, filming locations, box office performance, critical reception, and multiple trailer versions. Our <strong>TV series database</strong> is equally detailed, featuring episode guides, season overviews, character arcs, and behind-the-scenes information that enhances the viewing experience.
              </p>
              
              <p className="text-lg text-gray-300 leading-relaxed">
                For those seeking information on <strong>latest movies</strong>, our platform provides real-time updates on new releases, including limited theatrical runs, streaming exclusives, and international films making their debut in United States of American markets. Our team of dedicated editors works around the clock to ensure that information about <strong>popular TV shows</strong> is updated within hours of broadcast, complete with spoiler warnings and episode summaries that respect viewing preferences.
              </p>
              
              <p className="text-lg text-gray-300 leading-relaxed">
                The <strong>movie reviews</strong> section on Sflix represents a perfect blend of professional criticism and community sentiment. Each review is carefully categorized, allowing users to filter by critic reviews, user ratings, or in-depth analysis from our featured contributors. Our <strong>streaming guides</strong> provide practical information about where content is available, including regional availability, subscription requirements, and quality ratings for different streaming platforms.
              </p>
              
              <p className="text-lg text-gray-300 leading-relaxed">
                As the <strong>best movie website United States of America</strong> has to offer, we understand the unique preferences of United States of American viewers. Our platform features specialized sections for local content, including United States of American films, regional cinema, and locally produced television series. This focus on local content, combined with our global perspective, creates a balanced entertainment resource that celebrates both domestic creativity and international offerings.
              </p>
            </div>
          </section>

          <section className="mb-16 bg-gradient-to-r from-gray-800/40 to-gray-900/60 p-10 rounded-2xl border border-gray-700/50">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-blue-500/20 p-3 rounded-2xl">
                <FaPlay className="text-3xl text-blue-400" />
              </div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
                Streaming Guide & Watch Recommendations
              </h2>
            </div>
            
            <div className="space-y-8 text-justify">
              <p className="text-lg text-gray-300 leading-relaxed">
                In today's fragmented streaming landscape, finding <strong>where to watch movies online</strong> can be a frustrating experience. Sflix simplifies this process with our comprehensive streaming guide that aggregates availability across dozens of platforms. Whether you're looking for <strong>TV series streaming platforms</strong> that carry a specific show or trying to find which service offers the best quality for your favorite films, our platform provides clear, actionable information updated daily.
              </p>
              
              <p className="text-lg text-gray-300 leading-relaxed">
                Our recommendation engine goes beyond simple algorithms to provide genuinely useful suggestions for <strong>best movies to watch</strong> based on multiple factors. We consider your viewing history, ratings you've given similar titles, current trends among users with similar tastes, and seasonal appropriateness. For <strong>top-rated TV shows</strong>, our system tracks episode-by-episode quality, helping you identify when a series hits its stride or when it might be time to jump ship.
              </p>
              
              <p className="text-lg text-gray-300 leading-relaxed">
                The heart of our platform lies in our sophisticated <strong>movie recommendations</strong> system, which combines machine learning with human curation. While algorithms identify patterns and similarities, our editorial team creates themed collections, director spotlights, and genre deep-dives that introduce viewers to content they might otherwise overlook. This balanced approach ensures that our <strong>genre exploration</strong> features are both data-driven and creatively inspired.
              </p>
              
              <p className="text-lg text-gray-300 leading-relaxed">
                <strong>Personalized suggestions</strong> on Sflix extend beyond simple "if you liked this, you'll like that" recommendations. Our system understands nuanced preferences—whether you prefer character-driven narratives over plot-heavy stories, specific directorial styles, or particular historical periods. This deep understanding allows us to suggest <strong>action movies</strong> that match not just your tolerance for excitement but your preference for practical effects over CGI, or your interest in specific martial arts styles.
              </p>
              
              <p className="text-lg text-gray-300 leading-relaxed">
                For television enthusiasts, our platform offers unparalleled insights into <strong>drama series</strong> from around the world. We track character development across seasons, narrative arcs, and critical reception patterns to help you identify shows that maintain quality over time. Our coverage of <strong>comedy films</strong> and <strong>thriller TV shows</strong> includes specialized subgenre classifications that help you find exactly what you're in the mood for, whether it's dark comedy, romantic comedy, political thriller, or psychological horror.
              </p>
            </div>
          </section>

          <section className="mb-16 bg-gradient-to-r from-gray-800/40 to-gray-900/60 p-10 rounded-2xl border border-gray-700/50">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-green-500/20 p-3 rounded-2xl">
                <FaSearch className="text-3xl text-green-400" />
              </div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text text-transparent">
                SEO Optimized Movie Content
              </h2>
            </div>
            
            <div className="space-y-8 text-justify">
              <p className="text-lg text-gray-300 leading-relaxed">
                Sflix is engineered for discoverability, with sophisticated SEO optimization that ensures our content reaches the audiences who need it most. Whether you're searching for information on how to <strong>watch movies online free</strong> (legally, of course), researching <strong>latest movie releases 2024</strong>, or looking for the <strong>best TV series to binge-watch</strong> this weekend, our content is structured to appear prominently in search results while maintaining readability and user engagement.
              </p>
              
              <p className="text-lg text-gray-300 leading-relaxed">
                Our comprehensive coverage of <strong>movie streaming sites</strong> includes detailed comparisons of video quality, subscription costs, device compatibility, and content libraries. This information is regularly updated and presented in formats that are easily indexed by search engines while remaining accessible to human readers. We understand that today's viewers want straightforward answers about where to find content, and we deliver this information with clarity and precision.
              </p>
              
              <p className="text-lg text-gray-300 leading-relaxed">
                The strategic implementation of keywords including <strong>"movie database"</strong>, <strong>"TV series information"</strong>, <strong>"film reviews"</strong>, and <strong>"where to watch movies"</strong> is handled with sophistication. Rather than awkward keyword stuffing, we integrate these terms naturally into content that provides genuine value. Our articles about <strong>"movie genres"</strong> explore the history and characteristics of each classification, while our guides to <strong>"entertainment guide United States of America"</strong> help local viewers navigate the unique aspects of United States of America's media landscape.
              </p>
              
              <p className="text-lg text-gray-300 leading-relaxed">
                Beyond basic keyword optimization, Sflix employs structured data markup that helps search engines understand the context of our content. This technical SEO approach means that when you search for a specific actor's filmography, or want to know which movies share a particular cinematographer, our pages are more likely to provide the precise information you're seeking. This attention to technical detail complements our commitment to creating genuinely useful content for movie and television enthusiasts.
              </p>
              
              <p className="text-lg text-gray-300 leading-relaxed">
                Our platform's content strategy also includes comprehensive coverage of seasonal trends, award seasons, and cultural events that influence viewing habits. This proactive approach to content creation ensures that we're always providing relevant, timely information that addresses what viewers are actually searching for throughout the year. From summer blockbuster previews to Oscar season predictions, Sflix positions itself as an authoritative source that anticipates and fulfills the information needs of the entertainment community.
              </p>
            </div>
          </section>

          {/* Enhanced Quick Stats */}
          <section className="bg-gradient-to-r from-orange-900/40 to-purple-900/40 rounded-2xl p-10 text-center mb-16 border border-orange-500/20">
            <h3 className="text-3xl font-bold mb-10 bg-gradient-to-r from-orange-300 to-yellow-300 bg-clip-text text-transparent">
              Sflix by Numbers
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: "10,000+", label: "Movies", icon: FaFilm },
                { number: "5,000+", label: "TV Series", icon: FaTv },
                { number: "50,000+", label: "Active Users", icon: FaUsers },
                { number: "100,000+", label: "Reviews", icon: FaStar }
              ].map((stat, index) => (
                <div key={index} className="group">
                  <stat.icon className="text-4xl text-orange-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-gray-300 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Enhanced Call to Action */}
          <section className="text-center py-16 bg-gradient-to-br from-gray-800/60 to-gray-900/80 rounded-2xl border border-gray-700/50">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-300 to-yellow-300 bg-clip-text text-transparent">
              Start Your Cinematic Journey Today!
            </h2>
            <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              Join our community of <span className="text-orange-400">50,000+ movie lovers</span> who trust Sflix for accurate information, genuine reviews, and personalized recommendations. Discover hidden gems, revisit classics, and stay updated with the latest releases—all in one place.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link href="/" className="group bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white px-10 py-5 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-orange-500/25 hover:scale-105">
                <FaHome className="text-xl group-hover:scale-110 transition-transform" /> Explore Homepage
              </Link>
              <Link href="/movie/genre/action" className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-10 py-5 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-blue-500/25 hover:scale-105">
                <FaFilm className="text-xl group-hover:scale-110 transition-transform" /> Browse Movies
              </Link>
              <Link href="/tv-show/genre/crime" className="group bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-10 py-5 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-purple-500/25 hover:scale-105">
                <FaTv className="text-xl group-hover:scale-110 transition-transform" /> Discover TV Series
              </Link>
            </div>
            
            <div className="mt-12 flex flex-wrap justify-center gap-8 text-gray-400">
              <div className="flex items-center gap-3">
                <FaCalendarAlt className="text-green-400" />
                <span>Daily Content Updates</span>
              </div>
              <div className="flex items-center gap-3">
                <FaHeart className="text-red-400" />
                <span>Community Powered</span>
              </div>
              <div className="flex items-center gap-3">
                <FaGlobe className="text-blue-400" />
                <span>Global & Local Content</span>
              </div>
              <div className="flex items-center gap-3">
                <FaRocket className="text-yellow-400" />
                <span>Lightning Fast</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}