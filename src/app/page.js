import Hero from '../components/Hero';
import ServicesGrid from '../components/ServicesGrid';
import PortfolioGallery from '../components/PortfolioGallery';


export default function Home() {
  return (
    <>
      <Hero />
      <ServicesGrid />

      <section className="py-6 border-t">
        <div className="max-w-6xl mx-auto px-6">
          
          <PortfolioGallery />
        </div>
      </section>
    </>
  );
}
