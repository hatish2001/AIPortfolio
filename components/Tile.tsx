'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { Play, Info, Volume2, VolumeX, Github, ExternalLink, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { getItemTitle, getItemSubtitle } from '@/lib/utils';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';
import type { ContentItem } from '@/types/content';

interface TileProps {
  item: ContentItem;
  onClick: () => void;
  aspectRatio?: '2:3' | '16:9';
}

export function Tile({ item, onClick, aspectRatio = '16:9' }: TileProps) {
  const [isHovered, setIsHovered] = useState(false);
  const tileRef = useRef<HTMLDivElement>(null);

  const title = getItemTitle(item);
  const subtitle = getItemSubtitle(item);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={tileRef}
      className={cn(
        'group relative overflow-hidden rounded-xl cursor-pointer',
        'bg-gradient-to-br from-purple-500/5 to-blue-500/5 backdrop-blur-sm',
        'border border-white/10 transition-all duration-300',
        'hover:border-purple-500/30 hover:z-10',
        aspectRatio === '2:3' ? 'aspect-[2/3]' : 'aspect-video',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background'
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick();
        }
      }}
      aria-label={`View details for ${title}`}
      whileHover={{ 
        scale: 1.05,
        boxShadow: '0 0 30px rgba(102, 126, 234, 0.4)'
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Aspect Ratio Container */}
      <div
        className={cn(
          'relative w-full overflow-hidden bg-card',
          aspectRatio === '2:3' ? 'aspect-[2/3]' : 'aspect-video'
        )}
      >
        {/* Thumbnail */}
        <Image
          src={item.thumbnail}
          alt={title}
          fill
          className={cn(
            'object-cover transition-opacity duration-300',
            isHovered && 'opacity-0'
          )}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Preview Video */}
        {'previewVideo' in item && item.previewVideo && (
          <video
            src={item.previewVideo}
            className={cn(
              'absolute inset-0 h-full w-full object-cover transition-opacity duration-300',
              isHovered ? 'opacity-100' : 'opacity-0'
            )}
            muted
            loop
            playsInline
            aria-hidden="true"
          />
        )}

        {/* Gradient overlay with enhanced blur */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-sm" />

        {/* Animated gradient border */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          animate={isHovered ? {
            background: [
              'linear-gradient(0deg, rgba(139, 92, 246, 0.3), rgba(59, 130, 246, 0.3))',
              'linear-gradient(180deg, rgba(59, 130, 246, 0.3), rgba(139, 92, 246, 0.3))'
            ]
          } : {}}
          transition={{ duration: 3, repeat: Infinity }}
          style={{ padding: '1px', borderRadius: '0.75rem' }}
        />

        {/* Content overlay */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute inset-x-0 bottom-0 p-4 space-y-3"
            >
              <div>
                <h3 className="text-lg font-bold text-white mb-1 glow-text">
                  {title}
                </h3>
                {subtitle && (
                  <p className="text-sm text-white/90 line-clamp-2">
                    {subtitle}
                  </p>
                )}
              </div>
              
              {/* Tech stack pills */}
              {'tech' in item && item.tech && (
                <div className="flex flex-wrap gap-1">
                  {item.tech.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs font-medium rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 hover:bg-purple-500/20 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                  {item.tech.length > 3 && (
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-white/10 text-white/70">
                      +{item.tech.length - 3}
                    </span>
                  )}
                </div>
              )}
              
              <div className="flex items-center gap-2 pt-1">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-1 rounded-lg bg-white text-black px-4 py-2 text-xs font-bold transition hover:bg-white/90"
                  onClick={(e) => {
                    e.stopPropagation();
                    onClick();
                  }}
                >
                  <Play className="h-3 w-3" />
                  View Details
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center rounded-lg glass p-2 text-white hover:bg-white/20 hover:shadow-lg hover:shadow-orange-500/20 group/ai transition-all"
                  onClick={(e) => {
                    e.stopPropagation();
                    const title = getItemTitle(item);
                    const subtitle = getItemSubtitle(item);
                    const summaryPrompt = `Summarize ${title}${subtitle ? ` (${subtitle})` : ''} in a concise and engaging way.`;
                    window.dispatchEvent(new CustomEvent('openChatWithMessage', { detail: { message: summaryPrompt } }));
                  }}
                  title="Summarize with AI"
                >
                  <Sparkles className="h-4 w-4 group-hover/ai:text-orange-400 transition-colors" />
                </motion.button>
                
                {'repoUrl' in item && item.repoUrl && (
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={item.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center rounded-lg glass p-2 text-white hover:bg-white/20"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Github className="h-4 w-4" />
                  </motion.a>
                )}
                
                {'liveUrl' in item && item.liveUrl && (
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={item.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center rounded-lg glass p-2 text-white hover:bg-white/20"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </motion.a>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
