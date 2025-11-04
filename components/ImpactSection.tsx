'use client';

import { useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { TrendingUp, DollarSign, Clock, FileSearch, Users, Cpu } from 'lucide-react';
import { useRef } from 'react';

interface ImpactMetric {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const metrics: ImpactMetric[] = [
  { 
    icon: DollarSign, 
    value: 2000000, 
    label: "Cost Savings",
    color: "from-green-400 to-green-600",
    prefix: "$",
    suffix: "+"
  },
  { 
    icon: Users, 
    value: 50000, 
    label: "Daily Active Users",
    color: "from-blue-400 to-blue-600",
    prefix: "",
    suffix: "+"
  },
  { 
    icon: FileSearch, 
    value: 90, 
    label: "Accuracy (Industry: 70%)",
    color: "from-purple-600 to-purple-800",
    prefix: "",
    suffix: "%"
  },
  { 
    icon: TrendingUp, 
    value: 50, 
    label: "Faster Processing",
    color: "from-pink-400 to-pink-600",
    prefix: "",
    suffix: "x"
  }
];

function AnimatedCounter({ 
  value, 
  duration = 2, 
  prefix = '', 
  suffix = '' 
}: { 
  value: number; 
  duration?: number; 
  prefix?: string; 
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * value));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(value);
      }
    };

    window.requestAnimationFrame(step);
  }, [value, duration, isInView]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(0) + 'K';
    }
    return num.toLocaleString();
  };

  return (
    <span ref={ref} className="font-black">
      {prefix}{formatNumber(count)}{suffix}
    </span>
  );
}

export function ImpactSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
            Quantified Impact
          </h2>
          <p className="text-lg text-muted-foreground">
            Enterprise-scale AI solutions with zero compliance violations
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="relative group"
              >
                <div className="glass rounded-2xl p-8 h-full border border-glass-border hover:border-white/20 transition-all">
                  {/* Gradient background on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${metric.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity`} />
                  
                  {/* Icon */}
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${metric.color} mb-4`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>

                  {/* Number */}
                  <div className="text-4xl md:text-5xl mb-2">
                    <AnimatedCounter 
                      value={metric.value} 
                      prefix={metric.prefix} 
                      suffix={metric.suffix} 
                    />
                  </div>

                  {/* Label */}
                  <p className="text-sm text-muted-foreground font-medium">
                    {metric.label}
                  </p>

                  {/* Animated border gradient */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity">
                    <div 
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${metric.color} opacity-20 blur-xl`}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom row with additional metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-400">⚡ 50x</p>
            <p className="text-sm text-muted-foreground mt-1">Faster Processing<br/>(vs manual)</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-400">🏢 Fortune 500</p>
            <p className="text-sm text-muted-foreground mt-1">Clients Served</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-400">✅ Zero</p>
            <p className="text-sm text-muted-foreground mt-1">Compliance Violations<br/>Since Launch</p>
          </div>
        </motion.div>
      </div>

      {/* Floating particles in background - only render on client */}
      {mounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-32 w-32 rounded-full"
              style={{
                background: `radial-gradient(circle, rgba(${i % 2 ? '102,126,234' : '118,75,162'},0.1) 0%, transparent 70%)`,
                left: `${i * 10}%`,
                top: `${i * 10}%`,
              }}
              animate={{
                x: [0, 30, 0],
                y: [0, -30, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
}
