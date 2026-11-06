import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, User, CheckCircle2, Share2, BookOpen } from 'lucide-react';
import { BLOG_POSTS } from '../data/blogPosts';
import { useToast } from '../context/ToastContext';

export default function BlogDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const post = BLOG_POSTS.find((b) => b.id === id) || BLOG_POSTS[0];

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast({
        type: 'success',
        title: 'Article Link Copied!',
        message: 'Share this evidence-based study with your training partners.'
      });
    }
  };

  const relatedPosts = BLOG_POSTS.filter((b) => b.id !== post.id).slice(0, 3);

  return (
    <article className="min-h-screen bg-dark-950 py-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
      {/* Back button */}
      <div className="flex items-center justify-between">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-neon transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Articles</span>
        </Link>

        <button
          onClick={handleShare}
          className="p-2 rounded-xl bg-dark-900 border border-dark-700 hover:border-neon text-zinc-300 hover:text-neon transition-all flex items-center gap-1.5 text-xs font-semibold"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Share</span>
        </button>
      </div>

      {/* Header Info */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-neon text-black uppercase font-mono">
            {post.category}
          </span>
          <span className="text-xs text-zinc-400 font-mono flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-zinc-500" />
            {post.readTime}
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black font-display text-white leading-tight">
          {post.title}
        </h1>

        <div className="flex items-center gap-4 text-xs text-zinc-400 pt-2 border-t border-dark-700/60 font-mono">
          <span className="text-white font-semibold flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-neon" />
            {post.author}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-zinc-500" />
            {post.date}
          </span>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative h-72 sm:h-96 w-full rounded-3xl overflow-hidden shadow-2xl border border-dark-700">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
      </div>

      {/* Key Takeaways Box */}
      {post.takeaways && post.takeaways.length > 0 && (
        <div className="p-6 rounded-2xl bg-dark-900 border border-neon/40 shadow-neon-sm space-y-3">
          <h3 className="text-xs font-mono font-bold text-neon uppercase tracking-wider flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-neon" />
            <span>Key Scientific Takeaways</span>
          </h3>
          <ul className="space-y-2 text-sm text-zinc-200">
            {post.takeaways.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="text-neon font-bold">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Main Body Content */}
      <div className="space-y-8 text-zinc-300 leading-relaxed text-base pt-4">
        {post.content ? (
          post.content.map((sec, idx) => (
            <div key={idx} className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
                {sec.heading}
              </h2>
              <p className="whitespace-pre-line text-sm sm:text-base text-zinc-300 leading-relaxed">
                {sec.text}
              </p>
            </div>
          ))
        ) : (
          <p>{post.summary}</p>
        )}
      </div>

      {/* Related Articles */}
      <div className="pt-12 border-t border-dark-700/80 space-y-6">
        <h3 className="text-xl font-bold font-display text-white">Related Research Articles</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {relatedPosts.map((rel) => (
            <div
              key={rel.id}
              onClick={() => navigate(`/blog/${rel.id}`)}
              className="p-4 rounded-2xl bg-dark-900 border border-dark-700 hover:border-neon cursor-pointer transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] text-neon font-bold font-mono uppercase">{rel.category}</span>
                <h4 className="text-sm font-bold text-white mt-1 line-clamp-2">{rel.title}</h4>
              </div>
              <span className="text-[11px] text-zinc-500 font-mono mt-3">{rel.readTime}</span>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

