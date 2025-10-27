import Header from '../../components/Header';
import ContactForm from '../../components/ContactForm';

export default function Contact(){
  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold">Contact Us</h1>
        <p className="mt-2 text-gray-600">Send us a message or request a quote for drone mapping.</p>

        <div className="mt-6">
          <ContactForm />
        </div>
      </div>
    </>
  );
}
