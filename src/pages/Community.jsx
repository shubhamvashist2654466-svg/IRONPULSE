import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Heart,
  MessageSquare,
  Share2,
  Award,
  Trophy,
  Flame,
  Plus,
  Dumbbell,
  CheckCircle2,
  Send,
  Sparkles,
  Target
} from 'lucide-react';
import { COMMUNITY_POSTS, FITNESS_CHALLENGES, LEADERBOARD, BADGES } from '../data/communityPosts';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function Community() {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [posts, setPosts] = useState(COMMUNITY_POSTS);
  const [activeFilter, setActiveFilter] = useState('All');
  const [commentInputs, setCommentInputs] = useState({});
  const [newPostModalOpen, setNewPostModalOpen] = useState(false);
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [postTag, setPostTag] = useState('PR Alert');

  const toggleLike = (postId) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const newHasLiked = !p.hasLiked;
          return {
            ...p,
            hasLiked: newHasLiked,
            likes: newHasLiked ? p.likes + 1 : p.likes - 1,
          };
        }
        return p;
      })
    );
  };

  const handleAddComment = (postId) => {
    const text = commentInputs[postId];
    if (!text || !text.trim()) return;

    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const newComment = {
            id: 'c_' + Date.now(),
            author: user?.name || 'Alex Mercer',
            avatar: user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
            text: text.trim(),
            timestamp: 'Just now'
          };
          return {
            ...p,
            comments: [...(p.comments || []), newComment]
          };
        }
        return p;
      })
    );

    setCommentInputs({ ...commentInputs, [postId]: '' });
    showToast({
      type: 'success',
      title: 'Comment Posted!',
      message: 'Your reply has been added to the athlete discussion.'
    });
  };

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!postTitle || !postContent) return;

    const newPost = {
      id: 'post_' + Date.now(),
      author: {
        name: user?.name || 'Alex Mercer',
        handle: `@${(user?.name || 'athlete').toLowerCase().replace(' ', '_')}`,
        avatar: user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        badge: user?.membership || 'PRO ATHLETE',
        badgeColor: 'bg-neon/20 text-neon border-neon/40'
      },
      timestamp: 'Just now',
      tag: postTag,
      title: postTitle,
      content: postContent,
      image: null,
      likes: 1,
      hasLiked: true,
      workoutShare: null,
      comments: []
    };

    setPosts([newPost, ...posts]);
    setNewPostModalOpen(false);
    setPostTitle('');
    setPostContent('');

    showToast({
      type: 'success',
      title: 'Post Published!',
      message: 'Your milestone has been shared with the IronPulse community.'
    });
  };

  const filteredPosts = activeFilter === 'All'
    ? posts
    : posts.filter((p) => p.tag === activeFilter);

  return (
    <div className="min-h-screen bg-dark-950 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-dark-700/60">
        <div>
          <span className="text-xs font-mono font-bold text-neon uppercase tracking-widest">
            ATHLETE NETWORK & LEADERBOARDS
          </span>
          <h1 className="text-3xl sm:text-5xl font-black font-display text-white mt-1 uppercase">
            IRONPULSE COMMUNITY
          </h1>
          <p className="text-sm text-zinc-400 mt-2 max-w-2xl leading-relaxed">
            Connect with dedicated lifters, share personal records (PRs), join community challenges, and track your rank on the weekly leaderboard.
          </p>
        </div>

        <button
          onClick={() => setNewPostModalOpen(true)}
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-neon text-black font-extrabold text-xs hover:bg-neon-hover shadow-neon-sm transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Share Milestone / PR</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Feed Column */}
        <div className="lg:col-span-8 space-y-6">
          {/* Feed Filter Tags */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {['All', 'Transformation', 'PR Alert', 'Nutrition', 'Questions'].map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveFilter(tag)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                  activeFilter === tag
                    ? 'bg-neon text-black border-neon shadow-neon-sm'
                    : 'bg-dark-900 border-dark-700 text-zinc-400 hover:text-white'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Posts List */}
          <div className="space-y-6">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="p-6 rounded-3xl bg-dark-900 border border-dark-700/80 shadow-xl space-y-4"
              >
                {/* Author Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-10 h-10 rounded-xl object-cover border border-dark-600"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-white">{post.author.name}</h4>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${post.author.badgeColor}`}>
                          {post.author.badge}
                        </span>
                      </div>
                      <span className="text-xs text-zinc-500 font-mono">
                        {post.author.handle} • {post.timestamp}
                      </span>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold bg-dark-800 text-neon border border-neon/30">
                    {post.tag}
                  </span>
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-base font-bold text-white mb-1.5">{post.title}</h3>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed whitespace-pre-line">
                    {post.content}
                  </p>
                </div>

                {/* Workout Share Card if present */}
                {post.workoutShare && (
                  <div className="p-4 rounded-2xl bg-dark-850 border border-neon/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] text-neon uppercase font-mono font-bold">
                        VERIFIED WORKOUT LOG
                      </span>
                      <h4 className="text-xs font-bold text-white mt-0.5">{post.workoutShare.name}</h4>
                      <p className="text-[11px] text-zinc-400 mt-0.5">{post.workoutShare.exercises}</p>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-mono text-zinc-300 shrink-0">
                      <span>{post.workoutShare.duration}</span>
                      <span className="text-neon font-bold">{post.workoutShare.volume}</span>
                    </div>
                  </div>
                )}

                {/* Post Image */}
                {post.image && (
                  <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden border border-dark-700">
                    <img src={post.image} alt="Post attachment" className="w-full h-full object-cover" />
                  </div>
                )}

                {/* Actions: Likes & Comments count */}
                <div className="pt-3 border-t border-dark-700/60 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => toggleLike(post.id)}
                      className={`flex items-center gap-1.5 text-xs font-bold transition-colors ${
                        post.hasLiked ? 'text-red-500' : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${post.hasLiked ? 'fill-current' : ''}`} />
                      <span>{post.likes}</span>
                    </button>

                    <span className="flex items-center gap-1.5 text-xs text-zinc-400">
                      <MessageSquare className="w-4 h-4 text-zinc-500" />
                      <span>{post.comments?.length || 0}</span>
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      showToast({ type: 'success', title: 'Post Link Copied', message: 'Ready to share.' });
                    }}
                    className="text-zinc-500 hover:text-white p-1"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Comments Thread */}
                {post.comments && post.comments.length > 0 && (
                  <div className="pt-3 border-t border-dark-800 space-y-2.5">
                    {post.comments.map((c) => (
                      <div key={c.id} className="flex items-start gap-2.5 text-xs p-2 rounded-xl bg-dark-850">
                        <img src={c.avatar} alt={c.author} className="w-6 h-6 rounded-lg object-cover mt-0.5" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-white">{c.author}</span>
                            <span className="text-[10px] text-zinc-500">{c.timestamp}</span>
                          </div>
                          <p className="text-zinc-300 mt-0.5 leading-relaxed">{c.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add Comment Input */}
                <div className="pt-2 flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Write a comment..."
                    value={commentInputs[post.id] || ''}
                    onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleAddComment(post.id);
                    }}
                    className="flex-1 bg-dark-800 border border-dark-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-neon"
                  />
                  <button
                    onClick={() => handleAddComment(post.id)}
                    className="p-2 rounded-xl bg-neon text-black font-bold hover:bg-neon-hover text-xs transition-colors shrink-0"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar: Challenges, Leaderboard & Badges */}
        <div className="lg:col-span-4 space-y-6">
          {/* Community Challenges */}
          <div className="p-6 rounded-3xl bg-dark-900 border border-dark-700/80 shadow-xl space-y-4">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-400" />
              <h3 className="text-base font-bold text-white">Active Challenges</h3>
            </div>

            <div className="space-y-4">
              {FITNESS_CHALLENGES.map((ch) => (
                <div key={ch.id} className="p-4 rounded-2xl bg-dark-850 border border-dark-750 space-y-2">
                  <div className="flex justify-between items-start">
                    <h4 className="text-xs font-bold text-white leading-tight">{ch.title}</h4>
                    <span className="text-[10px] font-mono text-neon font-bold shrink-0 ml-2">
                      {ch.daysLeft}d left
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 leading-relaxed">{ch.description}</p>
                  <div className="w-full bg-dark-700 h-1.5 rounded-full overflow-hidden mt-2">
                    <div className="bg-neon h-full rounded-full" style={{ width: `${ch.progress}%` }} />
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-zinc-500 pt-1">
                    <span>{ch.participants.toLocaleString()} Athletes joined</span>
                    <span className="text-neon font-bold">Reward: {ch.rewardBadge}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Leaderboard */}
          <div className="p-6 rounded-3xl bg-dark-900 border border-dark-700/80 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                <h3 className="text-base font-bold text-white">Weekly Leaderboard</h3>
              </div>
              <span className="text-[11px] text-zinc-500 font-mono">TOP LIFTERS</span>
            </div>

            <div className="space-y-2">
              {LEADERBOARD.map((userRow) => (
                <div
                  key={userRow.rank}
                  className={`p-3 rounded-2xl border flex items-center justify-between text-xs ${
                    userRow.rank === 4
                      ? 'bg-neon/10 border-neon/30 text-white'
                      : 'bg-dark-850 border-dark-750 text-zinc-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0 pr-2">
                    <span
                      className={`w-5 h-5 rounded-full font-mono text-[10px] font-bold flex items-center justify-center shrink-0 ${
                        userRow.rank === 1
                          ? 'bg-yellow-400 text-black'
                          : userRow.rank === 2
                          ? 'bg-zinc-300 text-black'
                          : userRow.rank === 3
                          ? 'bg-amber-600 text-white'
                          : 'bg-dark-700 text-zinc-400'
                      }`}
                    >
                      {userRow.rank}
                    </span>
                    <img src={userRow.avatar} alt={userRow.name} className="w-8 h-8 rounded-lg object-cover" />
                    <div className="min-w-0">
                      <p className="font-bold text-white truncate text-xs">{userRow.name}</p>
                      <span className="text-[10px] text-zinc-500">{userRow.workoutsLogged} workouts</span>
                    </div>
                  </div>
                  <span className="font-mono font-bold text-neon shrink-0">{userRow.points} pts</span>
                </div>
              ))}
            </div>
          </div>

          {/* Achievement Badges */}
          <div className="p-6 rounded-3xl bg-dark-900 border border-dark-700/80 shadow-xl space-y-4">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-neon" />
              <h3 className="text-base font-bold text-white">Achievement Badges</h3>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {BADGES.map((b) => (
                <div
                  key={b.id}
                  className={`p-3 rounded-xl border flex flex-col justify-between text-xs ${
                    b.unlocked
                      ? 'bg-dark-850 border-neon/30 text-white'
                      : 'bg-dark-950 border-dark-800 text-zinc-600 opacity-50'
                  }`}
                >
                  <div>
                    <span className="text-[10px] font-mono font-bold text-neon">{b.unlocked ? 'UNLOCKED' : 'LOCKED'}</span>
                    <h5 className="font-bold text-xs mt-0.5">{b.name}</h5>
                    <p className="text-[10px] text-zinc-400 mt-1 line-clamp-2">{b.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* New Post Modal */}
      {newPostModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="w-full max-w-lg bg-dark-900 border border-dark-600 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-white">Create Community Post</h3>
            <form onSubmit={handleCreatePost} className="space-y-4">
              <div>
                <label className="text-xs text-zinc-400 font-semibold block mb-1">Category Tag</label>
                <select
                  value={postTag}
                  onChange={(e) => setPostTag(e.target.value)}
                  className="w-full bg-dark-800 border border-dark-600 rounded-xl px-3 py-2 text-xs text-neon font-bold"
                >
                  <option value="PR Alert">PR Alert 🏋️</option>
                  <option value="Transformation">Transformation 🔥</option>
                  <option value="Nutrition">Nutrition Insight 🥗</option>
                  <option value="Questions">Lifter Question ❓</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-zinc-400 font-semibold block mb-1">Milestone Headline</label>
                <input
                  type="text"
                  placeholder="e.g. Finally hit a 100kg Bench Press clean paused!"
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                  required
                  className="w-full bg-dark-800 border border-dark-600 rounded-xl px-4 py-2.5 text-xs text-white font-bold focus:outline-none focus:border-neon"
                />
              </div>

              <div>
                <label className="text-xs text-zinc-400 font-semibold block mb-1">Details & Training Experience</label>
                <textarea
                  rows="4"
                  placeholder="Share your sets, reps, caloric strategy, and tips for fellow athletes..."
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  required
                  className="w-full bg-dark-800 border border-dark-600 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-neon leading-relaxed"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setNewPostModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl bg-dark-800 text-zinc-400 text-xs font-semibold hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-neon text-black text-xs font-bold hover:bg-neon-hover shadow-neon-sm"
                >
                  Publish Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

