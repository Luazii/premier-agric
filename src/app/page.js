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
          <h3 className="text-2xl font-semibold">Recent field work</h3>
          <PortfolioGallery />
        </div>
      </section>
    </>
  );
}
