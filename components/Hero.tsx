'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Play, Info, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { AppItem } from '@/types/content';

interface HeroProps {
  items: AppItem[];
  onViewDetails: (item: AppItem) => void;
}

export function Hero({ items, onViewDetails }: HeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const item = items[currentIndex];

  useEffect(() => {
    if (items.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 8000); // Change every 8 seconds

    return () => clearInterval(interval);
  }, [items.length]);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  if (!item) return null;
  return (
    <div className="relative h-[80vh] min-h-[500px] w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={item.thumbnail}
          alt={item.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative flex h-full items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentIndex}
              className="max-w-2xl space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
            {/* Badge */}
            {item.featured && (
              <div className="inline-flex items-center rounded-full bg-accent px-3 py-1 text-xs font-medium text-white">
                Featured Project
              </div>
            )}

            {/* Title */}
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {item.title}
            </h1>

            {/* Description */}
            <p className="text-lg text-foreground/80 sm:text-xl">
              {item.shortDescription}
            </p>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2">
              {item.tech.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md bg-white/10 px-2 py-1 text-sm font-medium text-foreground backdrop-blur"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
              {item.liveUrl && (
                <a
                  href={item.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'inline-flex items-center justify-center rounded-md px-6 py-3 text-sm font-medium transition-colors',
                    'bg-white text-black hover:bg-white/90'
                  )}
                >
                  <Play className="mr-2 h-5 w-5" />
                  Visit Live App
                </a>
              )}
              <button
                onClick={() => onViewDetails(item)}
                className={cn(
                  'inline-flex items-center justify-center rounded-md px-6 py-3 text-sm font-medium transition-colors',
                  'bg-white/20 text-white backdrop-blur hover:bg-white/30'
                )}
              >
                <Info className="mr-2 h-5 w-5" />
                More Info
              </button>
            </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          {items.length > 1 && (
            <div className="absolute bottom-8 right-8 flex gap-2">
              <button
                onClick={handlePrevious}
                className="rounded-full bg-white/20 p-2 backdrop-blur transition-colors hover:bg-white/30"
                aria-label="Previous app"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={handleNext}
                className="rounded-full bg-white/20 p-2 backdrop-blur transition-colors hover:bg-white/30"
                aria-label="Next app"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          )}

          {/* Indicators */}
          {items.length > 1 && (
            <div className="absolute bottom-8 left-8 flex gap-2">
              {items.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={cn(
                    'h-2 rounded-full transition-all duration-300',
                    index === currentIndex 
                      ? 'w-8 bg-white' 
                      : 'w-2 bg-white/50 hover:bg-white/70'
                  )}
                  aria-label={`Go to app ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
