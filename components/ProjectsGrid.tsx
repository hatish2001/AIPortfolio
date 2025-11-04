'use client';

import { motion } from 'framer-motion';
import { ProjectCard } from './ProjectCard';
import type { AppItem } from '@/types/content';

interface ProjectsGridProps {
  items: AppItem[];
  onItemClick: (item: AppItem) => void;
}

export function ProjectsGrid({ items, onItemClick }: ProjectsGridProps) {
  if (items.length === 0) return null;

  return (
    <section className="relative py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold mb-2">Featured Projects</h2>
          <p className="text-muted-foreground">
            AI-powered solutions that transform industries and save millions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProjectCard
                project={item}
                onClick={() => onItemClick(item)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
