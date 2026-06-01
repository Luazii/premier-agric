import Hero from '../components/Hero';
import LogosMarquee from '../components/LogosMarquee';
import ServicesGrid from '../components/ServicesGrid';
import PortfolioGallery from '../components/PortfolioGallery';

// Force Next.js HMR recompile

export default function Home() {
  return (
    <>
      <Hero />
      <LogosMarquee />
      <ServicesGrid />
      <PortfolioGallery />
    </>
  );
}
