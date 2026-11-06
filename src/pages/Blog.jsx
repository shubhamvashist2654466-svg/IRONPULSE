import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, BookOpen, Clock, ArrowRight, User, ChevronRight, X } from 'lucide-react';
import { BLOG_POSTS, BLOG_CATEGORIES } from '../data/blogPosts';

export default function Blog() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      if (
        searchTerm &&
        !post.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !post.summary.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !post.category.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false;
      }
      if (selectedCategory !== 'All' && post.category !== selectedCategory) {
        return false;
      }
      return true;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen bg-dark-950 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs font-mono font-bold text-neon uppercase tracking-widest">
          EVIDENCE-BASED FITNESS JOURNAL
        </span>
        <h1 className="text-3xl sm:text-5xl font-black font-display text-white mt-1 uppercase">
          SCIENCE & TRAINING BLOG
        </h1>
        <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
          Deep dives into exercise physiology, molecular signaling, hyper-precise sports nutrition, and the dismantling of pervasive fitness myths.
        </p>
      </div>

      {/* Search & Category Filter Pills */}
      <div className="space-y-4 max-w-4xl mx-auto">
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-5 h-5 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search articles on hypertrophy, creatine, sleep, protein timing, deadlifts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-dark-900 border border-dark-700 rounded-2xl pl-12 pr-10 py-3.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-neon transition-colors"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-start sm:justify-center">
          {BLOG_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                selectedCategory === cat
                  ? 'bg-neon text-black font-bold border-neon shadow-neon-sm'
                  : 'bg-dark-900 text-zinc-300 border-dark-700 hover:border-dark-600 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Featured First Article Banner */}
      {filteredPosts.length > 0 && selectedCategory === 'All' && !searchTerm && (
        <div
          onClick={() => navigate(`/blog/${filteredPosts[0].id}`)}
          className="group relative rounded-3xl bg-dark-900 border border-dark-700/80 hover:border-neon/50 overflow-hidden cursor-pointer transition-all duration-300 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-6"
        >
          <div className="lg:col-span-7 relative h-72 sm:h-96 overflow-hidden">
            <img
              src={filteredPosts[0].image}
              alt={filteredPosts[0].title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent lg:hidden" />
          </div>

          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-neon text-black font-mono uppercase">
                  {filteredPosts[0].category}
                </span>
                <span className="text-xs text-zinc-500 font-mono">FEATURED PUBLICATION</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white group-hover:text-neon transition-colors leading-tight">
                {filteredPosts[0].title}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 mt-3 line-clamp-3 leading-relaxed">
                {filteredPosts[0].summary}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-dark-700/60 flex items-center justify-between">
              <div className="text-xs text-zinc-400 font-mono">
                <p className="text-white font-semibold">{filteredPosts[0].author}</p>
                <span>{filteredPosts[0].date} • {filteredPosts[0].readTime}</span>
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-neon group-hover:translate-x-1 transition-transform">
                <span>Read Article</span>
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Articles Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            onClick={() => navigate(`/blog/${post.id}`)}
            className="group rounded-2xl bg-dark-900 border border-dark-700/80 hover:border-neon/40 overflow-hidden cursor-pointer transition-all duration-300 flex flex-col justify-between shadow-card hover:-translate-y-1"
          >
            <div className="relative h-52 w-full overflow-hidden bg-dark-950">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-dark-950/80 backdrop-blur-md px-2.5 py-0.5 rounded text-[10px] font-bold text-neon border border-neon/30">
                {post.category}
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[11px] text-zinc-500 font-mono">{post.date} • {post.readTime}</span>
                <h3 className="text-base font-bold text-white group-hover:text-neon transition-colors mt-1 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-xs text-zinc-400 mt-2 line-clamp-3 leading-relaxed">
                  {post.summary}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-dark-800 flex items-center justify-between text-xs font-semibold text-neon">
                <span className="text-zinc-400 font-normal">{post.author.split(',')[0]}</span>
                <span className="inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Read More</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

