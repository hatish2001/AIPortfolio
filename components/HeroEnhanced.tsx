'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Play, Info, ChevronLeft, ChevronRight, Code2, Brain, Cpu, Database } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { TypewriterText } from './TypewriterText';
import { contentData } from '@/lib/data';
import type { AppItem } from '@/types/content';

interface HeroEnhancedProps {
  items: AppItem[];
  onViewDetails: (item: AppItem) => void;
}

const roles = [
  'AI/ML Engineer',
  'Full-Stack Developer', 
  'RAG Systems Architect',
  'Compliance Tech Specialist',
  'LLM Fine-tuning Expert'
];

const icons = [Brain, Code2, Cpu, Database, Brain];

export function HeroEnhanced({ items, onViewDetails }: HeroEnhancedProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentIconIndex, setCurrentIconIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const item = items[currentIndex];

  // Handle client-side mounting
  useEffect(() => {
    setMounted(true);
    
    // Generate particles on client side only
    const particleArray = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight
    }));
    setParticles(particleArray);
  }, []);

  useEffect(() => {
    if (items.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [items.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIconIndex((prev) => (prev + 1) % icons.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  if (!item) return null;

  const CurrentIcon = icons[currentIconIndex];

  return (
    <div className="relative min-h-[90vh] w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-background.png"
          alt="Hero background"
          fill
          className="object-cover"
          priority
          sizes="100vw"
          quality={90}
        />
        {/* Subtle static gradient overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-transparent to-blue-600" />
        </div>
      </div>
      
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 z-10">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/40" />
      </div>

      {/* Subtle floating dots - only render on client */}
      {mounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          {particles.slice(0, 5).map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute h-0.5 w-0.5 bg-white/30 rounded-full"
              initial={{ 
                x: particle.x, 
                y: particle.y 
              }}
              animate={{
                y: particle.y - 100,
              }}
              transition={{
                duration: 10 + particle.id * 2,
                repeat: Infinity,
                ease: 'linear'
              }}
            />
          ))}
        </div>
      )}

      {/* Content */}
      <div className="relative flex h-full min-h-[90vh] items-center z-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Text content */}
            <AnimatePresence mode="wait">
              <motion.div 
                key={currentIndex}
                className="space-y-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              >
                {/* Role badge with typewriter */}
                <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm px-6 py-2">
                  <CurrentIcon className="h-5 w-5 text-purple-400" />
                  <span className="text-sm font-semibold text-purple-400">
                    <TypewriterText texts={roles} />
                  </span>
                </div>

                {/* Name and Title */}
                <div>
                  <h1 className="text-5xl md:text-7xl font-black tracking-tight text-foreground mb-4">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
                      Harishraj Udaya Bhaskar
                    </span>
                  </h1>
                  <p className="text-2xl md:text-3xl font-bold text-foreground/80">
                    Engineering AI Solutions That Save Millions & Transform Industries
                  </p>
                </div>

                {/* Featured Project - Simplified */}
                <div className="border border-white/10 rounded-xl p-6 bg-white/5 backdrop-blur-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-1.5 w-1.5 rounded-full bg-green-400" />
                    <span className="text-xs font-medium text-green-400 uppercase tracking-wider">
                      Currently Working On
                    </span>
                  </div>
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground/70 line-clamp-2">{item.shortDescription}</p>
                </div>

                {/* CTA Buttons - Clean and simple */}
                <div className="flex flex-wrap gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onViewDetails(item)}
                    className="inline-flex items-center justify-center rounded-lg px-8 py-3 text-sm font-semibold transition-all bg-white text-black hover:bg-white/90"
                  >
                    View My Work
                  </motion.button>
                  <motion.a
                    href="/about"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center justify-center rounded-lg px-8 py-3 text-sm font-semibold transition-all border border-white/20 hover:bg-white/10"
                  >
                    Get In Touch
                  </motion.a>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Right side - Subtle background pattern */}
            <motion.div 
              className="relative hidden lg:block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.4 }}
            >
              {/* Subtle gradient mesh background */}
              <div className="relative w-full h-[500px] opacity-10">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-transparent to-blue-600/20 blur-3xl" />
              </div>
              
              {/* Key metrics showcase - Subtle */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="absolute bottom-0 right-0 grid grid-cols-2 gap-6 p-8"
              >
                <div className="text-right">
                  <p className="text-2xl font-bold text-white/60">$2M+</p>
                  <p className="text-xs text-muted-foreground">Annual Savings</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-white/60">Zero</p>
                  <p className="text-xs text-muted-foreground">Compliance Issues</p>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Navigation for multiple projects */}
          {items.length > 1 && (
            <>
              <div className="absolute bottom-8 right-8 flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handlePrevious}
                  className="rounded-full glass p-3 transition-all hover:bg-white/10"
                  aria-label="Previous app"
                >
                  <ChevronLeft className="h-5 w-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleNext}
                  className="rounded-full glass p-3 transition-all hover:bg-white/10"
                  aria-label="Next app"
                >
                  <ChevronRight className="h-5 w-5" />
                </motion.button>
              </div>

              {/* Indicators */}
              <div className="absolute bottom-8 left-8 flex gap-2">
                {items.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={cn(
                      'h-2 rounded-full transition-all duration-300',
                      index === currentIndex 
                        ? 'w-8 bg-gradient-to-r from-[var(--gradient-1)] to-[var(--gradient-2)]' 
                        : 'w-2 bg-white/50 hover:bg-white/70'
                    )}
                    aria-label={`Go to app ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
