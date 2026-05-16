import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Only real salon photos from the owner — NO AI content
const images = [
  { src: '/images/real-2.png', alt: 'Highlighted curly hair, Kapsalon Heuvelrug Leersum' },
  { src: '/images/real-4.png', alt: 'Dames highlights, Kapsalon Heuvelrug Leersum' },
  { src: '/images/real-1.png', alt: 'Heren textured crop, Kapsalon Heuvelrug Leersum' },
  { src: '/images/real-3.png', alt: 'Kinderen fade, Kapsalon Heuvelrug Leersum' },
];

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [lightbox, setLightbox] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      itemsRef.current.forEach((item, i) => {
        if (!item) return;
        gsap.fromTo(
          item,
          { scale: 0.9, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            delay: i * 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const openLightbox = useCallback((index: number) => {
    setLightbox(index);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
    setLightbox(null);
    document.body.style.overflow = '';
  }, []);

  const navigateLightbox = useCallback((direction: 'prev' | 'next') => {
    if (lightbox === null) return;
    if (direction === 'prev') {
      setLightbox(lightbox === 0 ? images.length - 1 : lightbox - 1);
    } else {
      setLightbox(lightbox === images.length - 1 ? 0 : lightbox + 1);
    }
  }, [lightbox]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightbox === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigateLightbox('prev');
      if (e.key === 'ArrowRight') navigateLightbox('next');
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightbox, closeLightbox, navigateLightbox]);

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="bg-[#0f0f0f] py-32 px-[5vw]"
    >
      {/* Header */}
      <div className="text-center mb-16">
        <h2
          className="font-bebas text-white uppercase"
          style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', lineHeight: 0.95 }}
        >
          Ons Werk
        </h2>
        <p className="font-inter text-[0.85rem] text-text-secondary mt-2">
          Bekijk onze laatste creaties
        </p>
      </div>

      {/* Photo Grid — 2x2 layout for 4 real photos */}
      <div className="grid grid-cols-2 gap-4 max-w-[900px] mx-auto">
        {images.map((img, i) => (
          <div
            key={i}
            ref={(el) => { itemsRef.current[i] = el; }}
            className="relative rounded-lg overflow-hidden cursor-pointer group"
            onClick={() => openLightbox(i)}
          >
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)', aspectRatio: '1 / 1' }}
            />
            <div className="absolute inset-0 bg-[rgba(15,15,15,0.3)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="1.5"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
                <path d="M11 8v6M8 11h6" />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center"
          style={{ background: 'rgba(15, 15, 15, 0.95)' }}
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            className="absolute top-6 right-6 font-inter text-3xl text-white bg-transparent border-none cursor-pointer z-[201] hover:text-gold transition-colors"
            onClick={closeLightbox}
          >
            &times;
          </button>

          {/* Prev */}
          <button
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 font-inter text-3xl text-text-secondary bg-transparent border-none cursor-pointer z-[201] hover:text-white transition-colors"
            onClick={(e) => { e.stopPropagation(); navigateLightbox('prev'); }}
          >
            &lsaquo;
          </button>

          {/* Next */}
          <button
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 font-inter text-3xl text-text-secondary bg-transparent border-none cursor-pointer z-[201] hover:text-white transition-colors"
            onClick={(e) => { e.stopPropagation(); navigateLightbox('next'); }}
          >
            &rsaquo;
          </button>

          {/* Image */}
          <img
            src={images[lightbox].src}
            alt={images[lightbox].alt}
            className="max-w-[90vw] max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
