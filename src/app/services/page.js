import Header from '../../components/Header';
import ServicesGrid from '../../components/ServicesGrid';

export default function Services(){
  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold">Services</h1>
        <p className="mt-2 text-gray-700">Detailed services content → expand each tile into subpages or modals as needed.</p>
      </div>
      <ServicesGrid />
    </>
  );
}
