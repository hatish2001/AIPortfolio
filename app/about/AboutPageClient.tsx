'use client';

import { useEffect, useRef, useState } from 'react';
import { Download, Mail, Github, Linkedin } from 'lucide-react';

interface AboutPageClientProps {
  about: {
    headline: string;
    bio: string;
    photo: string;
    skills: Record<string, string[]>;
    contact: {
      email: string;
      github: string;
      linkedin: string;
      phone?: string;
    };
    resumeUrl?: string;
  };
  metrics: {
    totalSavings: number;
    dailyQueries: number;
    productionSystems: number;
  };
}

const roles = ["RAG Architect", "AI/ML Engineer", "Full-Stack Developer", "Automation Expert"];

export default function AboutPageClient({ about, metrics }: AboutPageClientProps) {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect for rotating roles
  useEffect(() => {
    const currentWord = roles[currentRole];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayedText.length < currentWord.length) {
          setDisplayedText(currentWord.substring(0, displayedText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayedText.length > 0) {
          setDisplayedText(displayedText.substring(0, displayedText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentRole((prev) => (prev + 1) % roles.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentRole]);


  // Counter animation
  const useCounter = (end: number, duration: number = 2000) => {
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
      if (hasAnimated) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setHasAnimated(true);
            const startTime = Date.now();
            const animate = () => {
              const now = Date.now();
              const progress = Math.min((now - startTime) / duration, 1);
              const easeOutQuart = 1 - Math.pow(1 - progress, 4);
              setCount(Math.floor(easeOutQuart * end));
              
              if (progress < 1) {
                requestAnimationFrame(animate);
              }
            };
            animate();
          }
        },
        { threshold: 0.5 }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return () => observer.disconnect();
    }, [end, duration, hasAnimated]);

    return { count, ref };
  };


  return (
    <>
      {/* Hero Section */}
      <div className="flex flex-col items-center text-center space-y-8 mb-16">
        {/* Animated Initials Avatar */}
        <div className="relative h-52 w-52 mb-4">
          {/* Glow effect */}
          <div className="absolute inset-0 -m-8 rounded-full opacity-50 blur-2xl animate-pulse-slow" 
               style={{
                 background: 'radial-gradient(circle, rgba(102, 126, 234, 0.4), transparent)'
               }} />
          
          {/* Rotating ring */}
          <div className="absolute inset-0 -m-1 rounded-full animate-spin-slow"
               style={{
                 background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
               }}>
            <div className="absolute inset-1 rounded-full bg-background" />
          </div>

          {/* Avatar inner */}
          <div className="relative h-full w-full rounded-full flex items-center justify-center z-10 animate-float"
               style={{
                 background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
               }}>
            <span className="text-6xl font-bold text-white tracking-wider">HB</span>
          </div>
        </div>

        {/* Name & Title */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
            <span className="bg-gradient-to-r from-[#667eea] to-[#764ba2] text-transparent bg-clip-text">
              Harishraj Udaya Bhaskar
            </span>
          </h1>

          <div className="flex items-center justify-center text-xl sm:text-2xl">
            <span className="text-[#764ba2] font-semibold">
              {displayedText}
              <span className="animate-blink">|</span>
            </span>
          </div>
        </div>

        {/* Enhanced CTA Buttons */}
        <div className="flex flex-wrap justify-center gap-4 pt-6">
          <a
            href={`mailto:${about.contact.email}`}
            className="btn-primary group"
          >
            <Mail className="w-5 h-5" />
            <span>Email Me</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
          {about.resumeUrl && (
            <a
              href={about.resumeUrl}
              download
              className="btn-secondary group"
            >
              <Download className="w-5 h-5" />
              <span>Download Resume</span>
              <span className="group-hover:translate-y-0.5 transition-transform">↓</span>
            </a>
          )}
        </div>

        {/* Enhanced Social Links */}
        <div className="flex gap-4 pt-4">
          <a
            href={about.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link group"
            aria-label="GitHub"
          >
            <Github className="w-6 h-6" />
          </a>
          <a
            href={about.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link social-linkedin group"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-6 h-6" />
          </a>
        </div>
      </div>


      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }

        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }

        .animate-gradient-shift {
          animation: gradient-shift 20s ease-in-out infinite;
        }

        .animate-blink {
          animation: blink 1s step-end infinite;
        }

        .btn-primary {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.875rem 2rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 0.5rem;
          font-weight: 500;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 40px rgba(102, 126, 234, 0.4);
        }

        .btn-primary::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
        }

        .btn-primary:hover::before {
          width: 300px;
          height: 300px;
        }

        .btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.875rem 2rem;
          background: transparent;
          color: #667eea;
          border: 2px solid rgba(102, 126, 234, 0.5);
          border-radius: 0.5rem;
          font-weight: 500;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .btn-secondary:hover {
          background: rgba(102, 126, 234, 0.1);
          border-color: rgba(102, 126, 234, 0.8);
          transform: translateY(-2px);
        }

        .social-link {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          color: rgba(255, 255, 255, 0.6);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .social-link:hover {
          background: rgba(102, 126, 234, 0.1);
          border-color: rgba(102, 126, 234, 0.4);
          color: #667eea;
          transform: translateY(-3px) rotate(5deg);
          box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
        }

        .social-linkedin:hover {
          background: rgba(0, 119, 181, 0.1);
          border-color: #0077b5;
          color: #0077b5;
        }


        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </>
  );
}

