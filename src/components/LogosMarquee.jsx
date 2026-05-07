"use client";
import React from 'react';
import { motion } from 'framer-motion';

const logos = [
    { src: '/images/dept of agric.jpg', alt: 'Dept of Agric' },
    { src: '/images/cropped-Cortac-LOGO.avif', alt: 'Cortac' },
    { src: '/images/seda-transparent.png', alt: 'Seda' },
    { src: '/images/Agriseta.png', alt: 'Agriseta' },
    { src: '/images/llamalogo.png', alt: 'Llama' },
    { src: '/images/irish tech challenge.jpg', alt: 'Irish Tech Challenge', className: 'h-28 md:h-40' },
    { src: '/images/Logo Everpix transparent.png', alt: 'Everpix' },
    { src: '/images/web_0002_Mlab-Grey.jpg', alt: 'Mlab' },
    { src: '/images/badger logo.png', alt: 'Badger', className: 'h-24 md:h-36' },
    { src: '/images/ADA-LOGO-.png', alt: 'ADA' },
    { src: '/images/Ngcebo consulting Logo.jpg', alt: 'Ngcebo Consulting' },
    { src: '/images/grainhills_logo_01.png', alt: 'Grainhills' },
    { src: '/images/tholowethu logo.png', alt: 'Tholowethu' },
    { src: '/images/fpnmsetalogo.jpeg', alt: 'FPNMSETA' },
];

export default function LogosMarquee() {
    return (
        <section className="py-12 md:py-24 bg-white overflow-hidden border-y border-gray-100 relative group">
            <div className="max-w-7xl mx-auto px-6 text-center mb-8">
                <h3 className="text-sm md:text-base font-semibold text-gray-500 uppercase tracking-wider">
                    Trusted by Industry Leaders
                </h3>
            </div>

            {/* Gradient overlays for smooth entry/exit */}
            <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none mt-20 md:mt-24"></div>
            <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none mt-20 md:mt-24"></div>

            <div className="flex overflow-hidden">
                <div
                    className="flex flex-nowrap items-center gap-16 md:gap-32 w-max animate-scroll group-hover:[animation-play-state:paused]"
                >
                    {/* We repeat the logos list enough times to ensure we fill the screen robustly on all sizes and shift enough to look infinite */}
                    {[...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos].map((logo, i) => (
                        <div key={i} className="flex-shrink-0 flex items-center justify-center">
                            <img
                                src={logo.src}
                                alt={logo.alt}
                                className={`${logo.className || 'h-16 md:h-20'} w-auto object-contain max-w-[150px] md:max-w-[200px] grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300 ease-in-out cursor-pointer`}
                                loading="lazy"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
