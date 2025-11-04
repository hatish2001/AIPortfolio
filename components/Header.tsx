'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Home, User, Github, Linkedin, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { contentData } from '@/lib/data';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
      
      // Calculate scroll progress
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        scrolled ? "glass border-b border-glass-border" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="font-black text-xl relative group">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--gradient-1)] to-[var(--gradient-2)] group-hover:from-[var(--gradient-2)] group-hover:to-[var(--gradient-3)] transition-all duration-500">
              WORKFLIX
            </span>
            <motion.span 
              className="absolute -inset-1 rounded-lg bg-gradient-to-r from-[var(--gradient-1)] to-[var(--gradient-2)] opacity-0 group-hover:opacity-20 blur-lg transition-opacity"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </Link>

          {/* Navigation */}
          <nav className="flex items-center space-x-6">
            <Link
              href="/"
              className="group flex items-center space-x-2 text-sm font-medium transition-all text-muted-foreground hover:text-foreground"
            >
              <Home className="h-4 w-4 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline relative">
                Home
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-[var(--gradient-1)] to-[var(--gradient-2)] scale-x-0 group-hover:scale-x-100 transition-transform" />
              </span>
            </Link>
            <Link
              href="/about"
              className="group flex items-center space-x-2 text-sm font-medium transition-all text-muted-foreground hover:text-foreground"
            >
              <User className="h-4 w-4 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline relative">
                About
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-[var(--gradient-1)] to-[var(--gradient-2)] scale-x-0 group-hover:scale-x-100 transition-transform" />
              </span>
            </Link>
          </nav>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            {contentData.about.contact.github && (
              <motion.a
                href={contentData.about.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-[var(--gradient-1)] transition-colors"
                aria-label="GitHub"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Github className="h-5 w-5" />
              </motion.a>
            )}
            {contentData.about.contact.linkedin && (
              <motion.a
                href={contentData.about.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-[var(--gradient-2)] transition-colors"
                aria-label="LinkedIn"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Linkedin className="h-5 w-5" />
              </motion.a>
            )}
            {contentData.about.contact.email && (
              <motion.a
                href={`mailto:${contentData.about.contact.email}`}
                className="text-muted-foreground hover:text-[var(--electric-blue)] transition-colors"
                aria-label="Email"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Mail className="h-5 w-5" />
              </motion.a>
            )}
          </div>
        </div>
      </div>
      
      {/* Scroll progress bar */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[var(--gradient-1)] via-[var(--gradient-2)] to-[var(--gradient-3)]"
        style={{ width: `${scrollProgress}%` }}
      />
    </motion.header>
  );
}
