'use client'
import { useState } from 'react'
import { Play, X, Instagram, Linkedin, Facebook, Twitter, ArrowLeft, ArrowRight } from 'lucide-react'

export default function PortfolioGallery() {
  const [selectedMedia, setSelectedMedia] = useState(null)
  const [activeTab, setActiveTab] = useState('all')
  const [currentIndex, setCurrentIndex] = useState(0)

  const galleryItems = [
    // Projects
    {
      id: 1,
      type: 'image',
      category: 'projects',
      title: 'Community Farm Projects',
      description: 'Empowering rural farmers with sustainable systems.',
      image: '/images/portfolio-1.jpg',
      tags: ['Empowerment', 'Farming']
    },
    {
      id: 2,
      type: 'image',
      category: 'projects',
      title: 'Smart Farming ',
      description: 'Precision mapping to monitor and optimize crop health.',
      image: '/images/portfolio-4.jpg',
      tags: ['Drone', 'Innovation']
    },
    {
      id: 3,
      type: 'image',
      category: 'projects',
      title: 'Youth in Agriculture Initiative',
      description: 'Training and inspiring the next generation of agripreneurs.',
      image: '/images/portfolio-5.jpg',
      tags: ['Youth', 'Training']
    },

    // Social Media Posts (static previews)
    {
      id: 4,
      type: 'social',
      platform: 'Instagram',
      category: 'social',
      title: 'Hope Grows Here',
      description: 'Moments from our community outreach.',
      image: '/images/social-instagram-thumb.jpg',
      embed: 'https://www.instagram.com/p/Cxyz12345/',
      tags: ['Community', 'Hope']
    },
    {
      id: 5,
      type: 'social',
      platform: 'Facebook',
      category: 'social',
      title: 'Empowering Farmers',
      description: 'Snapshots from a farmer training workshop.',
      image: '/images/social-facebook-thumb.jpg',
      embed: 'https://www.facebook.com/share/v/19qsmo2tqZ/',
      tags: ['Training', 'Empowerment']
    }
  ]

  const categoryList = [
    { id: 'all', name: 'All Items' },
    { id: 'projects', name: 'Projects' },
    { id: 'social', name: 'Social Media' }
  ]

  const categories = categoryList.map((c) => ({
    ...c,
    count: c.id === 'all' ? galleryItems.length : galleryItems.filter(item => item.category === c.id).length
  }))

  const filteredItems = activeTab === 'all' ? galleryItems : galleryItems.filter(item => item.category === activeTab)

  const openModal = (item) => {
    setSelectedMedia(item)
    setCurrentIndex(galleryItems.indexOf(item))
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setSelectedMedia(null)
    document.body.style.overflow = 'unset'
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryItems.length)
    setSelectedMedia(galleryItems[(currentIndex + 1) % galleryItems.length])
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length)
    setSelectedMedia(galleryItems[(currentIndex - 1 + galleryItems.length) % galleryItems.length])
  }

  return (
    <div className="py-20 bg-gray-50">
      {/* Gallery Section */}
      <div className="px-6 lg:px-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
            Our <span className="text-green-600">Impact in Action</span>
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
            Step into the fields of change — where innovation, empowerment, and purpose take root. 
            Every project, every farmer, every seed tells a story of hope.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeTab === category.id
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-green-50'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {filteredItems.map((item) => (
            <article
              key={item.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all cursor-pointer"
              onClick={() => openModal(item)}
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              <div className="p-5">
                <h3 className="text-lg font-semibold text-green-700 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-700 line-clamp-2">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Modal with Carousel */}
      {selectedMedia && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <button
            onClick={closeModal}
            className="absolute top-6 right-6 p-2 text-white hover:text-green-400 transition-colors"
          >
            <X className="w-8 h-8" />
          </button>

          <button
            onClick={prevSlide}
            className="absolute left-6 text-white hover:text-green-400"
          >
            <ArrowLeft className="w-8 h-8" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-6 text-white hover:text-green-400"
          >
            <ArrowRight className="w-8 h-8" />
          </button>

          <div className="bg-white rounded-2xl max-w-4xl w-full mx-4 overflow-hidden">
            {selectedMedia.type === 'social' ? (
              <div className="aspect-video bg-gray-100 flex items-center justify-center">
                <iframe
                  src={selectedMedia.embed}
                  className="w-full h-full border-0"
                  allowFullScreen
                  title={selectedMedia.title}
                ></iframe>
              </div>
            ) : (
              <img
                src={selectedMedia.image}
                alt={selectedMedia.title}
                className="w-full h-auto object-contain"
              />
            )}

            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 text-green-700">{selectedMedia.title}</h3>
              <p className="text-gray-600 mb-4">{selectedMedia.description}</p>
              <div className="flex flex-wrap gap-2">
                {selectedMedia.tags?.map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Heartwarming Section */}
      <section className="bg-white text-center py-20 px-6 lg:px-16">
        <h2 className="text-3xl lg:text-4xl font-bold text-green-700 mb-6">Hope Grows Beyond the Fields</h2>
        <p className="max-w-3xl mx-auto text-gray-700 leading-relaxed mb-10">
          At Premier Agric, every seed we plant, every farmer we empower, and every partnership we forge 
          is a step toward a more sustainable and equitable future. Together, we cultivate not only crops 
          but nurture dreams, resilience, and self-sufficiency for generations to come.
        </p>

        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto text-left">
          <div className="bg-green-50 rounded-2xl p-8 shadow-sm">
            <h3 className="text-2xl font-semibold text-green-700 mb-3">Training & Development</h3>
            <p className="text-gray-700">
              Our training programs are designed to empower farmers with hands-on knowledge — 
              from sustainable farming to agribusiness management. We believe education is the 
              first step toward long-term transformation.
            </p>
            <a href="/contact" className="inline-block mt-5 text-green-700 font-semibold hover:underline">
              Visit Gallery →
            </a>
          </div>

          <div className="bg-green-50 rounded-2xl p-8 shadow-sm">
            <h3 className="text-2xl font-semibold text-green-700 mb-3">Farmer Mentorships</h3>
            <p className="text-gray-700">
              Through mentorship, we bridge the gap between generations of farmers — blending 
              experience with innovation. Our goal is to inspire and equip a new wave of 
              agricultural leaders to grow not just produce, but to prosper.
            </p>
            <a href="/contact" className="inline-block mt-5 text-green-700 font-semibold hover:underline">
              Visit Gallery →
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
