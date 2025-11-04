'use client';

import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, Award, Calendar } from 'lucide-react';
import type { EducationItem } from '@/types/content';

interface EducationSectionProps {
  items: EducationItem[];
  onItemClick: (item: EducationItem) => void;
}

export function EducationSection({ items, onItemClick }: EducationSectionProps) {
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
          <h2 className="text-3xl font-bold mb-2">Education</h2>
          <p className="text-muted-foreground">
            Academic foundation in AI and Computer Science
          </p>
        </motion.div>

        <div className="space-y-6">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => onItemClick(item)}
              className="group cursor-pointer"
            >
              <div className="relative rounded-xl border border-white/10 bg-gradient-to-r from-purple-500/5 to-blue-500/5 backdrop-blur-sm p-6 hover:border-purple-500/30 transition-all">
                {/* Accent border */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-blue-500 rounded-l-xl" />
                
                <div className="grid md:grid-cols-[1fr,auto] gap-6 items-start">
                  {/* Main Content */}
                  <div className="space-y-4">
                    {/* Header */}
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-purple-500/10">
                          <GraduationCap className="h-5 w-5 text-purple-400" />
                        </div>
                        <h3 className="text-2xl font-bold group-hover:text-purple-400 transition-colors">
                          {item.institution}
                        </h3>
                      </div>
                      <p className="text-lg font-medium text-muted-foreground">
                        {item.program} • {item.degreeLevel}
                      </p>
                      <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>{item.period}</span>
                        {item.gpa && (
                          <>
                            <span className="mx-2">•</span>
                            <span>GPA: {item.gpa}/4.0</span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Relevant Coursework */}
                    {item.courses && item.courses.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <BookOpen className="h-4 w-4 text-purple-400" />
                          <h4 className="text-sm font-semibold text-purple-400">Relevant Coursework</h4>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {item.courses.map((course) => (
                            <span
                              key={course}
                              className="px-3 py-1 text-xs rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20"
                            >
                              {course}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Projects & Achievements */}
                    {item.projects && item.projects.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Award className="h-4 w-4 text-purple-400" />
                          <h4 className="text-sm font-semibold text-purple-400">Projects & Research</h4>
                        </div>
                        <ul className="space-y-1">
                          {item.projects.map((project) => (
                            <li key={project} className="text-sm text-muted-foreground flex items-start">
                              <span className="text-purple-400 mr-2">•</span>
                              <span>{project}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Institution Logo/Initial */}
                  <div className="hidden md:block">
                    <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
                      <span className="text-2xl font-bold text-purple-400">
                        {item.institution.split(' ').map(word => word[0]).join('')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
