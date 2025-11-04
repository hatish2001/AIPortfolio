'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { X, ExternalLink, Github, Download, Calendar } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { getItemTitle, getItemSubtitle } from '@/lib/utils';
import type { ContentItem, AppItem, EducationItem, HobbyItem, ExperienceItem } from '@/types/content';

interface DetailModalProps {
  item: ContentItem | null;
  open: boolean;
  onClose: () => void;
}

export function DetailModal({ item, open, onClose }: DetailModalProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && contentRef.current) {
      contentRef.current.focus();
    }
  }, [open]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open, onClose]);

  if (!item) return null;

  const title = getItemTitle(item);
  const subtitle = getItemSubtitle(item);

  return (
    <AnimatePresence>
      {open && (
        <Dialog.Root open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
          <Dialog.Portal>
            <Dialog.Overlay asChild>
              <motion.div
                className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
              />
            </Dialog.Overlay>
        
            <Dialog.Content asChild aria-describedby={undefined}>
              <motion.div
                className="fixed inset-x-4 top-[5vh] bottom-[5vh] z-50 mx-auto max-w-5xl overflow-hidden rounded-2xl bg-modal"
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: 10 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
              >
          <div ref={contentRef} className="relative h-full overflow-y-auto" tabIndex={-1}>
            {/* Header with Banner */}
            <div className="relative h-[40vh] min-h-[300px] w-full">
              <Image
                src={item.thumbnail}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 1280px) 100vw, 1280px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-modal via-modal/60 to-transparent" />
              
              {/* Close Button */}
              <Dialog.Close asChild>
                <button
                  className="absolute right-4 top-4 rounded-full bg-modal/80 p-2 text-foreground backdrop-blur transition-colors hover:bg-modal"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </Dialog.Close>

              {/* Title Section */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <Dialog.Title asChild>
                  <h2 className="text-3xl font-bold text-foreground sm:text-4xl">{title}</h2>
                </Dialog.Title>
                {subtitle && (
                  <p className="mt-2 text-lg text-foreground/80">{subtitle}</p>
                )}
                
                {/* Action Buttons */}
                <div className="mt-4 flex flex-wrap gap-3">
                  {isAppItem(item) && (
                    <>
                      {item.liveUrl && (
                        <a
                          href={item.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center rounded-md bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-white/90"
                        >
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Visit App
                        </a>
                      )}
                      {item.repoUrl && (
                        <a
                          href={item.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center rounded-md bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur transition-colors hover:bg-white/30"
                        >
                          <Github className="mr-2 h-4 w-4" />
                          View Code
                        </a>
                      )}
                    </>
                  )}
                  
                  {isExperienceItem(item) && item.links && item.links[0] && (
                    <a
                      href={item.links[0]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center rounded-md bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur transition-colors hover:bg-white/30"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Learn More
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-8">
              {/* Tags */}
              {item.tags && item.tags.length > 0 && (
                <div className="mb-6 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-white/10 px-2 py-1 text-sm font-medium text-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Type-specific Content */}
              {isAppItem(item) && <AppDetails item={item} />}
              {isEducationItem(item) && <EducationDetails item={item} />}
              {isHobbyItem(item) && <HobbyDetails item={item} />}
              {isExperienceItem(item) && <ExperienceDetails item={item} />}
            </div>
          </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      )}
    </AnimatePresence>
  );
}

// Type guards
function isAppItem(item: ContentItem): item is AppItem {
  return 'tech' in item;
}

function isEducationItem(item: ContentItem): item is EducationItem {
  return 'institution' in item;
}

function isHobbyItem(item: ContentItem): item is HobbyItem {
  return 'story' in item;
}

function isExperienceItem(item: ContentItem): item is ExperienceItem {
  return 'company' in item;
}

// Detail Components
function AppDetails({ item }: { item: AppItem }) {
  return (
    <div className="space-y-6">
      {item.problem && (
        <div>
          <h3 className="mb-2 text-lg font-semibold text-foreground">Problem</h3>
          <p className="text-foreground/80">{item.problem}</p>
        </div>
      )}
      
      {item.solution && (
        <div>
          <h3 className="mb-2 text-lg font-semibold text-foreground">Solution</h3>
          <p className="text-foreground/80">{item.solution}</p>
        </div>
      )}
      
      {item.features && item.features.length > 0 && (
        <div>
          <h3 className="mb-2 text-lg font-semibold text-foreground">Key Features</h3>
          <ul className="list-disc list-inside space-y-1 text-foreground/80">
            {item.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
      )}
      
      {item.tech && item.tech.length > 0 && (
        <div>
          <h3 className="mb-2 text-lg font-semibold text-foreground">Tech Stack</h3>
          <div className="flex flex-wrap gap-2">
            {item.tech.map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-accent/20 px-3 py-1 text-sm font-medium text-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}
      
      {item.metrics && Object.keys(item.metrics).length > 0 && (
        <div>
          <h3 className="mb-2 text-lg font-semibold text-foreground">Impact</h3>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {Object.entries(item.metrics).map(([key, value]) => (
              <div key={key} className="rounded-lg bg-white/5 p-4">
                <p className="text-2xl font-bold text-accent">{value.toLocaleString()}</p>
                <p className="text-sm text-foreground/60">{key}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function EducationDetails({ item }: { item: EducationItem }) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <h3 className="mb-2 text-lg font-semibold text-foreground">Program</h3>
          <p className="text-foreground/80">{item.program}</p>
          <p className="text-sm text-foreground/60">{item.degreeLevel}</p>
        </div>
        
        {item.gpa && (
          <div>
            <h3 className="mb-2 text-lg font-semibold text-foreground">GPA</h3>
            <p className="text-foreground/80">{item.gpa}/4.0</p>
          </div>
        )}
      </div>
      
      {item.courses && item.courses.length > 0 && (
        <div>
          <h3 className="mb-2 text-lg font-semibold text-foreground">Key Courses</h3>
          <div className="flex flex-wrap gap-2">
            {item.courses.map((course) => (
              <span
                key={course}
                className="rounded-md bg-white/10 px-2 py-1 text-sm text-foreground/80"
              >
                {course}
              </span>
            ))}
          </div>
        </div>
      )}
      
      {item.projects && item.projects.length > 0 && (
        <div>
          <h3 className="mb-2 text-lg font-semibold text-foreground">Projects</h3>
          <ul className="list-disc list-inside space-y-1 text-foreground/80">
            {item.projects.map((project, index) => (
              <li key={index}>{project}</li>
            ))}
          </ul>
        </div>
      )}
      
      {item.honors && item.honors.length > 0 && (
        <div>
          <h3 className="mb-2 text-lg font-semibold text-foreground">Honors & Awards</h3>
          <ul className="list-disc list-inside space-y-1 text-foreground/80">
            {item.honors.map((honor, index) => (
              <li key={index}>{honor}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function HobbyDetails({ item }: { item: HobbyItem }) {
  return (
    <div className="space-y-6">
      {item.story && (
        <div>
          <h3 className="mb-2 text-lg font-semibold text-foreground">Story</h3>
          <p className="text-foreground/80">{item.story}</p>
        </div>
      )}
      
      {item.gallery && item.gallery.length > 0 && (
        <div>
          <h3 className="mb-2 text-lg font-semibold text-foreground">Gallery</h3>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {item.gallery.map((image, index) => (
              <div key={index} className="relative aspect-video overflow-hidden rounded-lg">
                <Image
                  src={image}
                  alt={`${item.title} gallery ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ExperienceDetails({ item }: { item: ExperienceItem }) {
  return (
    <div className="space-y-6">
      {item.responsibilities && item.responsibilities.length > 0 && (
        <div>
          <h3 className="mb-2 text-lg font-semibold text-foreground">Key Responsibilities</h3>
          <ul className="list-disc list-inside space-y-1 text-foreground/80">
            {item.responsibilities.map((resp, index) => (
              <li key={index}>{resp}</li>
            ))}
          </ul>
        </div>
      )}
      
      {item.stack && item.stack.length > 0 && (
        <div>
          <h3 className="mb-2 text-lg font-semibold text-foreground">Tech Stack</h3>
          <div className="flex flex-wrap gap-2">
            {item.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-accent/20 px-3 py-1 text-sm font-medium text-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}
      
      {item.impact && Object.keys(item.impact).length > 0 && (
        <div>
          <h3 className="mb-2 text-lg font-semibold text-foreground">Impact</h3>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {Object.entries(item.impact).map(([key, value]) => (
              <div key={key} className="rounded-lg bg-white/5 p-4">
                <p className="text-2xl font-bold text-accent">{value.toLocaleString()}</p>
                <p className="text-sm text-foreground/60">{key}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
