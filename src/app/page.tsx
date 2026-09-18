import { HeroSection } from '@/components/home/HeroSection';
import { AgeCuration } from '@/components/home/AgeCuration';
import { FeaturedCollections } from '@/components/home/FeaturedCollections';
import { WatchFinderBanner } from '@/components/home/WatchFinderBanner';
import { CraftsmanshipSection } from '@/components/home/CraftsmanshipSection';
import { Testimonials } from '@/components/home/Testimonials';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-obsidian-950 text-white">
      <HeroSection />
      <AgeCuration />
      <FeaturedCollections />
      <WatchFinderBanner />
      <CraftsmanshipSection />
      <Testimonials />
    </main>
  );
}
