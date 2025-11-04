import Image from 'next/image';
import { motion } from 'framer-motion';
import { Calendar, Building2, Code2, TrendingUp, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ExperienceItem } from '@/types/content';

interface ExperienceCardProps {
  item: ExperienceItem;
  onClick: () => void;
}

export function ExperienceCard({ item, onClick }: ExperienceCardProps) {
  return (
    <motion.div
      onClick={onClick}
      className={cn(
        'group relative w-full rounded-xl p-6 text-left overflow-hidden cursor-pointer',
        'bg-gradient-to-br from-purple-500/5 to-blue-500/5',
        'border border-white/10 transition-all duration-300',
        'hover:border-purple-500/30',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background'
      )}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick();
        }
      }}
      aria-label={`View details for ${item.company} ${item.role}`}
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        animate={{
          background: [
            'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, transparent 60%)',
            'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, transparent 60%)',
          ],
        }}
        transition={{ duration: 5, repeat: Infinity, repeatType: 'reverse' }}
      />

      <div className="flex flex-col h-full relative z-10">
        {/* Header with company info and thumbnail */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Building2 className="h-4 w-4 text-purple-400" />
              </motion.div>
              <h3 className="text-lg font-bold text-foreground group-hover:text-purple-400 transition-colors">
                {item.company}
              </h3>
            </div>
            <p className="text-foreground/80 font-medium">{item.role}</p>
            <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
              <Calendar className="h-3 w-3" />
              <span>{item.period}</span>
            </div>
          </div>
          
          {/* Company Logo and AI Summarize Button */}
          <div className="flex items-start gap-2 flex-shrink-0">
            <motion.button
              whileHover={{ scale: 1.15, y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="opacity-30 group-hover:opacity-100 transition-all duration-300 rounded-lg glass p-2 text-white hover:bg-white/20 hover:shadow-lg hover:shadow-orange-500/20 group/ai"
              onClick={(e) => {
                e.stopPropagation();
                const summaryPrompt = `Summarize my experience at ${item.company} as ${item.role} in a concise and engaging way.`;
                window.dispatchEvent(new CustomEvent('openChatWithMessage', { detail: { message: summaryPrompt } }));
              }}
              title="Summarize with AI"
            >
              <Sparkles className="h-4 w-4 group-hover/ai:text-orange-400 transition-colors" />
            </motion.button>
            
            <div className="relative h-12 w-12 rounded-lg overflow-hidden bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20">
              <Image
                src={item.thumbnail}
                alt={item.company}
                fill
                className="object-cover"
                sizes="48px"
              />
            </div>
          </div>
        </div>

        {/* Key Responsibilities */}
        {item.responsibilities && item.responsibilities.length > 0 && (
          <div className="mb-4 flex-1">
            <p className="text-xs font-medium text-muted-foreground mb-2">Key Responsibilities:</p>
            <ul className="space-y-1">
              {item.responsibilities.slice(0, 2).map((resp, index) => (
                <li key={index} className="text-sm text-foreground/70 flex items-start">
                  <span className="text-accent mr-2">•</span>
                  <span className="line-clamp-1">{resp}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tech Stack */}
        {item.stack && item.stack.length > 0 && (
          <div className="mt-auto">
            <div className="flex items-center gap-2 mb-2">
              <Code2 className="h-3 w-3 text-purple-400" />
              <p className="text-xs font-medium text-muted-foreground">Tech Stack:</p>
            </div>
            <div className="flex flex-wrap gap-1">
              {item.stack.slice(0, 4).map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.1 }}
                  className="rounded-full px-3 py-1 text-xs bg-purple-500/10 text-purple-300 border border-purple-500/20 hover:bg-purple-500/20 transition-all cursor-default"
                >
                  {tech}
                </motion.span>
              ))}
              {item.stack.length > 4 && (
                <span className="text-xs text-muted-foreground py-1">
                  +{item.stack.length - 4} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Impact Metrics */}
        {item.impact && Object.keys(item.impact).length > 0 && (
          <div className="mt-3 grid grid-cols-2 gap-2">
            {Object.entries(item.impact).slice(0, 2).map(([key, value]) => (
              <div key={key} className="bg-white/5 rounded-md p-2">
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-3 w-3 text-purple-400" />
                  <p className="text-lg font-bold text-purple-400">
                    {typeof value === 'number' ? value.toLocaleString() : value}
                  </p>
                </div>
                <p className="text-xs text-muted-foreground">{formatMetricKey(key)}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

// Helper function to format metric keys
function formatMetricKey(key: string): string {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/([0-9]+)/g, ' $1')
    .trim()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
