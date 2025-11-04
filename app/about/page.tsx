import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { contentData } from '@/lib/data';
import AboutPageClient from './AboutPageClient';

export default function AboutPage() {
  const { about, experience } = contentData;

  // Calculate key metrics from experience
  const totalSavings = 2000000; // Approximate from all projects
  const dailyQueries = 10000; // From Mistral system
  const productionSystems = 4; // Number of live systems

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      {/* Animated background effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 animate-gradient-shift opacity-30" style={{
          background: `
            radial-gradient(circle at 20% 50%, rgba(102, 126, 234, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(118, 75, 162, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 40% 20%, rgba(102, 126, 234, 0.05) 0%, transparent 50%)
          `,
          backgroundSize: '150% 150%',
        }} />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `
            linear-gradient(rgba(102, 126, 234, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(102, 126, 234, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="max-w-5xl mx-auto">
          <AboutPageClient 
            about={about}
            metrics={{
              totalSavings,
              dailyQueries,
              productionSystems
            }}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
