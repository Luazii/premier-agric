import Hero from '../components/Hero';
import ServicesGrid from '../components/ServicesGrid';
import PortfolioGallery from '../components/PortfolioGallery';
import EngagementPrompt from '../components/EngagementPrompt';


export default function Home() {
  return (
    <>
      <Hero />
      <ServicesGrid />
      <EngagementPrompt />

      <section className="py-6 border-t">
        <div className="max-w-6xl mx-auto px-6">

          <PortfolioGallery />
        </div>
      </section>
    </>
  );
}
