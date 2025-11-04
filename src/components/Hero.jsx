'use client'
import { ChevronDown, Phone, Mail, MapPin, ArrowRight, Play } from 'lucide-react'
import Header from './Header'

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-fixed bg-cover bg-center"
      style={{
        backgroundImage: 'url(/images/hero.jpg)',
      }}
    >
      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.6) 30%, rgba(0,0,0,0.3) 60%, rgba(255,255,255,0.8) 90%, white 100%)',
        }}
      />


      {/* Content */}
      <div className="relative z-10 text-center px-6 mt-32">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
            <span className="text-white drop-shadow-md">Premier Agric</span>
            <br />
            {/* <span className="text-white drop-shadow-md">
              Cultivating Growth, Nurturing Hope
            </span> */}
          </h1>

          <p className="text-lg md:text-xl lg:text-2xl font-medium text-white/90 mb-8 max-w-2xl mx-auto">
            Sustainable agriculture • Drone & remote sensing • Data-driven insights — helping farmers make smarter, greener decisions.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <a
              href="/services"
              className="group px-8 py-4 bg-yellow-400 text-white text-lg font-medium rounded-xl shadow-lg hover:bg-green-700 hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center"
            >
              Explore Services
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="/portfolio"
              className="group px-8 py-4  bg-[#688E3C] text-white text-lg font-medium rounded-xl shadow-lg hover:bg-lime-400 hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center"
            >
              <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              See Our Work
            </a>
          </div>

          {/* Quick Contact Bar */}
          <div className="bg-white/90 backdrop-blur-md border border-green-100 rounded-2xl p-6 max-w-4xl mx-auto shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <a
                href="tel:+27 73 561 3851"
                className="flex items-center justify-center space-x-3 text-gray-800 hover:text-green-600 transition-colors duration-300"
              >
                <Phone className="w-5 h-5" />
                <span className="font-semibold">+27 73 561 3851</span>
              </a>
              <a
                href="mailto:info@premieragric.co.za"
                className="flex items-center justify-center space-x-3 text-gray-800 hover:text-green-600 transition-colors duration-300"
              >
                <Mail className="w-5 h-5" />
                <span className="font-semibold">info@premieragric.co.za</span>
              </a>
              <a
                href="/contact"
                className="flex items-center justify-center space-x-3 text-gray-800 hover:text-green-600 transition-colors duration-300"
              >
                <MapPin className="w-5 h-5" />
                <span className="font-semibold">Visit Our Offices</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <a
        href="/about"
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20"
      >
        <ChevronDown className="w-8 h-8 text-white hover:text-green-300 transition-colors" />
      </a>
    </section>
  )
}
