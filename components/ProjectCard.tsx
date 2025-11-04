'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github, TrendingUp, Users, Clock, DollarSign, Sparkles } from 'lucide-react';
import type { AppItem } from '@/types/content';

interface ProjectCardProps {
  project: AppItem;
  onClick: () => void;
}

// Format metric keys into readable labels
function formatMetricLabel(key: string): string {
  const labels: Record<string, string> = {
    complianceIssuesPrevented: 'Compliance Issues Prevented',
    productsMonitored: 'Products Monitored',
    finesAvoided: 'Fines Avoided',
    costReduction: 'Cost Reduction',
    dailyUsers: 'Daily Users',
    responseSpeedVsHuman: 'Faster Than Human',
    systemsIntegrated: 'Enterprise Systems',
    accuracyVsIndustry: 'Accuracy vs Industry',
    documentsProcessed: 'Documents Processed'
  };
  return labels[key] || key.replace(/([A-Z])/g, ' $1').trim();
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <motion.div
      className="group relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-purple-500/5 to-blue-500/5 backdrop-blur-sm transition-all hover:border-purple-500/30"
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      onClick={onClick}
    >
      {/* Project Image/Preview */}
      <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-purple-600/10 to-blue-600/10">
        {/* Placeholder with project initial */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <div className="text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-purple-400 to-blue-400">
              {project.title.split(' ').map(word => word[0]).join('').slice(0, 2)}
            </div>
            <div className="absolute inset-0 blur-2xl bg-gradient-to-br from-purple-400/20 to-blue-400/20" />
          </div>
        </div>
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
          {project.liveUrl && (
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20"
            >
              <ExternalLink className="h-5 w-5" />
            </motion.a>
          )}
          {project.repoUrl && (
            <motion.a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20"
            >
              <Github className="h-5 w-5" />
            </motion.a>
          )}
        </div>
      </div>

      {/* Project Content */}
      <div className="p-6 space-y-4">
        {/* Header */}
        <div>
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-xl font-bold group-hover:text-purple-400 transition-colors">
              {project.title}
            </h3>
            {project.status && (
              <span className="px-2 py-1 text-xs rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                {project.status}
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {project.shortDescription}
          </p>
        </div>

        {/* Impact Metrics */}
        {project.metrics && Object.keys(project.metrics).length > 0 && (
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(project.metrics).slice(0, 2).map(([key, value]) => (
              <div key={key} className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-purple-500/10">
                  {key.toLowerCase().includes('cost') || key.toLowerCase().includes('saving') || key.toLowerCase().includes('fine') || key.toLowerCase().includes('prevented') ? (
                    <DollarSign className="h-3.5 w-3.5 text-purple-400" />
                  ) : key.toLowerCase().includes('time') || key.toLowerCase().includes('reduction') ? (
                    <Clock className="h-3.5 w-3.5 text-purple-400" />
                  ) : key.toLowerCase().includes('user') || key.toLowerCase().includes('monitor') || key.toLowerCase().includes('processed') || key.toLowerCase().includes('integrated') ? (
                    <Users className="h-3.5 w-3.5 text-purple-400" />
                  ) : (
                    <TrendingUp className="h-3.5 w-3.5 text-purple-400" />
                  )}
                </div>
                <div>
                  <div className="text-sm font-semibold">
                    {key.toLowerCase().includes('fine') || key.toLowerCase().includes('cost') ? '$' : ''}
                    {typeof value === 'number' ? 
                      (value >= 1000000 ? `${(value / 1000000).toFixed(0)}M` : 
                       value >= 1000 ? `${(value / 1000).toFixed(0)}K` : 
                       value.toLocaleString()) 
                      : value}
                    {key.toLowerCase().includes('percent') || key.toLowerCase().includes('reduction') || key.toLowerCase().includes('accuracy') || key.toLowerCase().includes('vsIndustry') ? '%' : 
                     key.toLowerCase().includes('speed') || key.toLowerCase().includes('vsHuman') ? 'x' : 
                     key.toLowerCase().includes('fine') || key.toLowerCase().includes('cost') ? '+' : ''}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {formatMetricLabel(key)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {project.tech.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-xs rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20"
            >
              {tech}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span className="px-3 py-1 text-xs rounded-full bg-white/5 text-muted-foreground">
              +{project.tech.length - 4} more
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button 
            className="text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1 group/link"
            onClick={onClick}
          >
            View Details
            <motion.span
              initial={{ x: 0 }}
              whileHover={{ x: 3 }}
              transition={{ duration: 0.2 }}
            >
              →
            </motion.span>
          </button>
          
          <motion.button
            whileHover={{ scale: 1.15, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="opacity-30 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center rounded-lg glass p-2 text-white hover:bg-white/20 hover:shadow-lg hover:shadow-orange-500/20 group/ai"
            onClick={(e) => {
              e.stopPropagation();
              const summaryPrompt = `Summarize ${project.title} in a concise and engaging way.`;
              window.dispatchEvent(new CustomEvent('openChatWithMessage', { detail: { message: summaryPrompt } }));
            }}
            title="Summarize with AI"
          >
            <Sparkles className="h-4 w-4 group-hover/ai:text-orange-400 transition-colors" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
