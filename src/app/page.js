import Hero from '../components/Hero';
import ServicesGrid from '../components/ServicesGrid';
import PortfolioGallery from '../components/PortfolioGallery';


export default function Home() {
  return (
    <>
      <Hero />
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">What we do</h2>
          <p className="mt-2 text-gray-600 max-w-2xl">We combine drone imagery, satellite and agronomy to give you practical recommendations — tailored for sugarcane and other crops.</p>
        </div>
      </section>

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
