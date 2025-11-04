'use client';

import { ExperienceCard } from './ExperienceCard';
import type { ExperienceItem } from '@/types/content';

interface ExperienceRowProps {
  items: ExperienceItem[];
  onItemClick: (item: ExperienceItem) => void;
}

export function ExperienceRow({ items, onItemClick }: ExperienceRowProps) {
  if (items.length === 0) return null;

  return (
    <section className="relative py-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="mb-4 text-2xl font-bold text-foreground">Experience</h2>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <ExperienceCard
              key={item.id}
              item={item}
              onClick={() => onItemClick(item)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
