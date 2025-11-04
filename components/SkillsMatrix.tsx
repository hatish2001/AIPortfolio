'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code2, Brain, Cloud, Database, Wrench, GitBranch } from 'lucide-react';
import { contentData } from '@/lib/data';

interface SkillCategory {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  skills: string[];
  color: string;
}

const skillCategories: SkillCategory[] = [
  {
    name: 'Languages',
    icon: Code2,
    skills: contentData.about.skills['Languages'] || [],
    color: 'from-blue-400 to-blue-600'
  },
  {
    name: 'ML/AI Frameworks',
    icon: Brain,
    skills: contentData.about.skills['ML/AI Frameworks'] || [],
    color: 'from-purple-400 to-purple-600'
  },
  {
    name: 'LLMs & NLP',
    icon: Brain,
    skills: contentData.about.skills['LLMs & NLP'] || [],
    color: 'from-pink-400 to-pink-600'
  },
  {
    name: 'Agent Frameworks',
    icon: GitBranch,
    skills: contentData.about.skills['Agent Frameworks'] || [],
    color: 'from-orange-400 to-orange-600'
  },
  {
    name: 'Cloud & Infra',
    icon: Cloud,
    skills: contentData.about.skills['Cloud & Infra'] || [],
    color: 'from-cyan-400 to-cyan-600'
  },
  {
    name: 'MLOps',
    icon: Wrench,
    skills: contentData.about.skills['MLOps'] || [],
    color: 'from-green-400 to-green-600'
  }
];

export function SkillsMatrix() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background mesh gradient - only animate on client */}
      <div className="absolute inset-0 opacity-30">
        {mounted ? (
          <>
            <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
            <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
          </>
        ) : (
          <>
            <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl" />
            <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl" />
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl" />
          </>
        )}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--gradient-1)] to-[var(--gradient-2)]">
              Technical Arsenal
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Full-stack expertise spanning AI/ML, cloud infrastructure, and modern development
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, categoryIndex) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                className="group relative"
              >
                <div className="glass rounded-2xl p-6 h-full hover:bg-white/5 transition-all">
                  {/* Category header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`inline-flex p-2 rounded-lg bg-gradient-to-br ${category.color}`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold">{category.name}</h3>
                  </div>

                  {/* Skills grid */}
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ 
                          duration: 0.3, 
                          delay: categoryIndex * 0.1 + skillIndex * 0.05 
                        }}
                        whileHover={{ 
                          scale: 1.1,
                          boxShadow: '0 0 20px rgba(102, 126, 234, 0.4)'
                        }}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium glass border border-white/10 hover:border-white/30 transition-all cursor-default`}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>

                  {/* Hover glow effect */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none`} />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Interactive 3D skill sphere placeholder */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="glass rounded-2xl p-8 max-w-2xl mx-auto">
            <p className="text-sm text-muted-foreground mb-4">
              🚀 Pro tip: Hover over skills to see related projects
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {['AI/ML', 'Full-Stack', 'Cloud', 'DevOps', 'Data Engineering'].map((area) => (
                <motion.button
                  key={area}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-[var(--gradient-1)] to-[var(--gradient-2)] text-white font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all"
                >
                  {area}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
