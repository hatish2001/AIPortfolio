'use client';

import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Tile } from './Tile';
import type { ContentItem } from '@/types/content';

interface RowProps {
  title: string;
  items: ContentItem[];
  onItemClick: (item: ContentItem) => void;
  aspectRatio?: '2:3' | '16:9';
}

export function Row({ title, items, onItemClick, aspectRatio = '16:9' }: RowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    checkScroll();
    scrollContainer.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);

    return () => {
      scrollContainer.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    
    const scrollAmount = window.innerWidth - 160;
    const currentScroll = scrollRef.current.scrollLeft;
    const targetScroll = direction === 'left' 
      ? currentScroll - scrollAmount 
      : currentScroll + scrollAmount;

    scrollRef.current.scrollTo({
      left: targetScroll,
      behavior: 'smooth',
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      scroll('left');
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      scroll('right');
    }
  };

  if (items.length === 0) return null;

  return (
    <section className="relative py-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="mb-4 text-2xl font-bold text-foreground">{title}</h2>
        
        <div className="group relative">
          {/* Left Arrow */}
          <AnimatePresence>
            {showLeftArrow && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => scroll('left')}
                className="absolute left-0 top-1/2 z-20 -translate-y-1/2 rounded-md bg-background/80 p-2 backdrop-blur hover:bg-background/90 group-hover:opacity-100 opacity-0 transition-opacity"
                aria-label="Scroll left"
              >
                <ChevronLeft className="h-6 w-6" />
              </motion.button>
            )}
          </AnimatePresence>

          {/* Right Arrow */}
          <AnimatePresence>
            {showRightArrow && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => scroll('right')}
                className="absolute right-0 top-1/2 z-20 -translate-y-1/2 rounded-md bg-background/80 p-2 backdrop-blur hover:bg-background/90 group-hover:opacity-100 opacity-0 transition-opacity"
                aria-label="Scroll right"
              >
                <ChevronRight className="h-6 w-6" />
              </motion.button>
            )}
          </AnimatePresence>

          {/* Carousel Container */}
          <div
            ref={scrollRef}
            className="scrollbar-hide overflow-x-auto"
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="region"
            aria-label={`${title} carousel`}
          >
            <div className="flex space-x-4 pb-2">
              {items.map((item) => (
                <div
                  key={item.id}
                  className={cn(
                    'flex-shrink-0',
                    aspectRatio === '2:3' ? 'w-48' : 'w-64'
                  )}
                >
                  <Tile
                    item={item}
                    onClick={() => onItemClick(item)}
                    aspectRatio={aspectRatio}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
