import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Newspaper,
  Calendar,
  Clock,
  MapPin,
  Users,
  ArrowRight,
  Sparkles,
  Trophy,
  BookOpen
} from 'lucide-react';
import { BLOG_POSTS, BlogPost } from '../data/blogData';
import { BlogModal } from './BlogModal';
import { BlurImage } from './BlurImage';

interface BlogSectionProps {
  onSelectPost?: (slug: string) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ onSelectPost }) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const handlePostClick = (e: React.MouseEvent, post: BlogPost) => {
    if (onSelectPost) {
      e.preventDefault();
      onSelectPost(post.slug);
    } else {
      setSelectedPost(post);
    }
  };

  return (
    <section id="blog" className="py-20 bg-white relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-blue bg-blue-50 px-4 py-1.5 rounded-full border border-blue-200 shadow-sm mb-3">
            <Newspaper className="w-3.5 h-3.5 text-brand-blue" />
            <span>Event Recaps & Articles</span>
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-brand-navy">
            Official Chapter Blog
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-3 leading-relaxed">
            In-depth event reports, technical competition breakdowns, and workshop highlights from the IETE Student Forum at RIT.
          </p>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {BLOG_POSTS.map((post, idx) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.5 }}
              className="group bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-soft hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Card Banner Image */}
                <a
                  href={`/blog/${post.slug}`}
                  onClick={(e) => handlePostClick(e, post)}
                  className="block relative h-64 sm:h-72 w-full overflow-hidden bg-slate-900 cursor-pointer"
                >
                  <BlurImage
                    src={post.image}
                    blurHash={post.blurHash}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />
                  
                  {/* Category & Read Time Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                    <span className="px-3 py-1 rounded-full bg-brand-blue/90 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider shadow-sm">
                      {post.category}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-slate-200 text-xs font-medium border border-slate-700">
                      {post.readTime}
                    </span>
                  </div>

                  {/* Date & Location Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 text-white z-10 flex flex-wrap items-center justify-between gap-2 text-xs font-medium">
                    <span className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-lg">
                      <Calendar className="w-3.5 h-3.5 text-brand-accent shrink-0" />
                      {post.formattedDate}
                    </span>
                    <span className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-lg">
                      <MapPin className="w-3.5 h-3.5 text-brand-accent shrink-0" />
                      {post.venue.split(',')[0]}
                    </span>
                  </div>
                </a>

                {/* Card Body */}
                <div className="p-6 sm:p-8 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-brand-blue uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>IETE ISF & Department of ECE</span>
                  </div>

                  <a
                    href={`/blog/${post.slug}`}
                    onClick={(e) => handlePostClick(e, post)}
                    className="block"
                  >
                    <h3 className="font-heading font-black text-xl sm:text-2xl text-brand-navy group-hover:text-brand-blue transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                  </a>

                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-3">
                    {post.summary}
                  </p>

                  {/* Highlights Pill Badges */}
                  <div className="pt-2 flex flex-wrap gap-2 text-xs">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-blue-50 text-brand-blue font-semibold border border-blue-100">
                      <Users className="w-3.5 h-3.5" />
                      {post.participation.participants}
                    </span>
                    {post.participation.teams && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-purple-50 text-purple-700 font-semibold border border-purple-100">
                        <Trophy className="w-3.5 h-3.5" />
                        {post.participation.teams}
                      </span>
                    )}
                    {post.keyTopics && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-50 text-emerald-700 font-semibold border border-emerald-100">
                        <BookOpen className="w-3.5 h-3.5" />
                        {post.keyTopics.length} Core Modules
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Footer Action */}
              <div className="p-6 sm:p-8 pt-0">
                <a
                  href={`/blog/${post.slug}`}
                  onClick={(e) => handlePostClick(e, post)}
                  className="w-full inline-flex items-center justify-between px-5 py-3.5 rounded-2xl bg-slate-100 group-hover:bg-gradient-to-r group-hover:from-brand-blue group-hover:to-brand-navy text-slate-700 group-hover:text-white font-bold text-xs transition-all duration-300 shadow-sm cursor-pointer"
                >
                  <span>Read Full Event Report</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Fallback Reader Modal */}
      {!onSelectPost && (
        <BlogModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
        />
      )}
    </section>
  );
};
