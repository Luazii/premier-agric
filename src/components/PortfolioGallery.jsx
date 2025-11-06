'use client'
import { useState } from 'react'
import { X, ArrowLeft, ArrowRight } from 'lucide-react'

export default function PortfolioGallery() {
  const [selectedMedia, setSelectedMedia] = useState(null)
  const [activeTab, setActiveTab] = useState('all')
  const [currentIndex, setCurrentIndex] = useState(0)

  const galleryItems = [
    // Case Study–style Projects
    {
      id: 1,
      type: 'image',
      category: 'projects',
      title: 'Community Farm Projects',
      description:
        'Challenge: Rural farmers lacked access to reliable water and productivity systems. \
        Solution: We designed sustainable irrigation and cooperative mentorship programs. \
        Result: Over 40 families improved yields by 30% in one season.',
      image: '/images/portfolio-1.jpg',
      tags: ['Empowerment', 'Irrigation', 'Mentorship'],
    },
    {
      id: 2,
      type: 'image',
      category: 'projects',
      title: 'Smart Farming',
      description:
        'Challenge: Farmers struggled to detect crop stress early. \
        Solution: Using precision drone mapping, we identified nutrient gaps and irrigation issues. \
        Result: Early intervention reduced input waste by 18% and boosted yield quality.',
      image: '/images/portfolio-4.jpg',
      tags: ['Drone', 'Innovation', 'Precision Mapping'],
    },
    {
      id: 3,
      type: 'image',
      category: 'projects',
      title: 'Youth in Agriculture Initiative',
      description:
        'Challenge: Many graduates lacked practical pathways into agriculture. \
        Solution: Premier Agric launched a youth mentorship program focused on agribusiness innovation. \
        Result: 120+ youth trained, 12 startups launched, and community impact expanding yearly.',
      image: '/images/pexels-gary-barnes-6231693.jpg',
      tags: ['Youth', 'Training', 'Innovation'],
    },

    // Social Media Highlights
    {
      id: 4,
      type: 'social',
      platform: 'Instagram',
      category: 'social',
      title: 'Hope Grows Here',
      description:
        'Snapshots from our outreach and farmer mentorships — where growth meets gratitude.',
      image: '/images/instagram.jpg',
      embed:
        'https://www.instagram.com/p/DPdwT-RjmbK/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
      tags: ['Community', 'Hope'],
    },
    {
      id: 5,
      type: 'social',
      platform: 'Facebook',
      category: 'social',
      title: 'Shade Net and Tunnel Systems',
      description:
        'Unlocking the Future of Farming — introducing affordable climate-smart infrastructure for smallholders.',
      image: '/images/facebook.jpg',
      embed: 'https://www.facebook.com/share/v/1CmGR2LjbX/',
      tags: ['Technology', 'Climate-smart', 'Innovation'],
    },
  ]

  const categories = [
    { id: 'all', name: 'All Items' },
    { id: 'projects', name: 'Case Studies' },
    { id: 'social', name: 'Social Media' },
  ]

  const filteredItems =
    activeTab === 'all'
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeTab)

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
    const nextIndex = (currentIndex + 1) % galleryItems.length
    setCurrentIndex(nextIndex)
    setSelectedMedia(galleryItems[nextIndex])
  }

  const prevSlide = () => {
    const prevIndex =
      (currentIndex - 1 + galleryItems.length) % galleryItems.length
    setCurrentIndex(prevIndex)
    setSelectedMedia(galleryItems[prevIndex])
  }

  return (
    <div className="py-20 bg-gray-50">
      {/* Header */}
      <div className="px-6 lg:px-12 text-center mb-16">
        <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
          Proven <span className="text-green-600">Impact in Action</span>
        </h1>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
          See how real farmers, cooperatives, and agribusinesses have achieved
          measurable growth through Premier Agric partnerships. Each story
          begins with a challenge — and ends with transformation.
        </p>

        {/* Category Buttons */}
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveTab(c.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeTab === c.id
                  ? 'bg-green-600 text-white shadow-lg'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-green-50'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 lg:px-12 mb-20">
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
              <h3 className="text-lg font-semibold text-green-700 mb-1">
                {item.title}
              </h3>
              <p className="text-sm text-gray-700 line-clamp-3">
                {item.description.split('Result:')[0]} {/* Tease before modal */}
              </p>
            </div>
          </article>
        ))}
      </div>

      {/* Modal */}
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
              <div className="aspect-video bg-gray-100 relative">
                <img
                  src={selectedMedia.image}
                  alt={selectedMedia.title}
                  className="w-full h-full object-cover"
                />
                <a
                  href={selectedMedia.embed}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-green-700 transition-all"
                >
                  View on {selectedMedia.platform}
                </a>
              </div>
            ) : (
              <img
                src={selectedMedia.image}
                alt={selectedMedia.title}
                className="w-full h-auto object-contain"
              />
            )}

            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 text-green-700">
                {selectedMedia.title}
              </h3>
              <p className="text-gray-600 mb-4">{selectedMedia.description}</p>
              <div className="flex flex-wrap gap-2">
                {selectedMedia.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="bg-[#688E3C] text-white text-center py-20 px-6">
        <h2 className="text-3xl lg:text-4xl font-bold mb-4">
          Let’s Turn Possibility Into Progress
        </h2>
        <p className="max-w-2xl mx-auto text-white/90 mb-8">
          Whether it’s precision farming, youth mentorship, or community
          development — we help you transform ideas into measurable results.
        </p>
        <a
          href="/contact"
          className="bg-[#FDE335] text-[#1B3A1A] px-8 py-3 rounded-md font-semibold hover:bg-yellow-400 transition"
        >
          Discuss Your Next Project →
        </a>
      </section>
    </div>
  )
}
