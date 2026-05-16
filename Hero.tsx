import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useBooking } from '@/contexts/BookingContext';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const { openModal } = useBooking();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const locationRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 60, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'power3.out', delay: 0.3 }
      );
      gsap.fromTo(
        sublineRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.7 }
      );
      gsap.fromTo(
        locationRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.9 }
      );
      gsap.fromTo(
        buttonsRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 1.1 }
      );
      gsap.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0 },
        { opacity: 0.5, duration: 1, ease: 'power2.out', delay: 1.5 }
      );

      gsap.to(titleRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
        opacity: 0,
        scale: 1.15,
        y: -80,
        filter: 'blur(8px)',
        ease: 'none',
      });

      gsap.to(sublineRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '50% top',
          scrub: 1,
        },
        opacity: 0,
        y: -40,
        ease: 'none',
      });

      gsap.to(locationRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '50% top',
          scrub: 1,
        },
        opacity: 0,
        y: -40,
        ease: 'none',
      });

      gsap.to(buttonsRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '40% top',
          scrub: 1,
        },
        opacity: 0,
        y: -30,
        ease: 'none',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      const offset = 72;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative w-full min-h-[100dvh] overflow-hidden flex items-center justify-center"
    >
      {/* Video Background — keep the hero barbershop video as ambient background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover"
        aria-label="Barbershop ambiance video"
      >
        <source src="/videos/hero-barbershop.mp4" type="video/mp4" />
      </video>

      {/* Dark gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(15, 15, 15, 0.3) 0%, rgba(15, 15, 15, 0.7) 100%)',
        }}
      />

      {/* Logo Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[1]">
        <img
          src="/images/logo-watermark.png"
          alt=""
          className="logo-pulse"
          style={{
            width: 'min(35vw, 400px)',
            opacity: 0.15,
            filter: 'brightness(1.2)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-[2] text-center px-4 max-w-[90vw]">
        <div ref={titleRef}>
          <h1 className="font-bebas text-white uppercase leading-[0.88] tracking-[-0.02em]"
            style={{ fontSize: 'clamp(3.5rem, 12vw, 10rem)' }}>
            KAPSALON
          </h1>
          <h1 className="font-bebas text-white uppercase leading-[0.88] tracking-[-0.02em]"
            style={{ fontSize: 'clamp(3.5rem, 12vw, 10rem)' }}>
            HEUVELRUG
          </h1>
        </div>

        <p
          ref={sublineRef}
          className="font-inter text-gold uppercase mt-6"
          style={{
            fontSize: 'clamp(0.8rem, 1.8vw, 1.1rem)',
            letterSpacing: '0.15em',
            fontWeight: 400,
          }}
        >
          DAMES &amp; HEREN — SINDS 2026
        </p>

        <p
          ref={locationRef}
          className="font-inter text-text-secondary mt-3"
          style={{
            fontSize: '0.75rem',
            letterSpacing: '0.1em',
            fontWeight: 400,
          }}
        >
          Leersum, Utrecht
        </p>

        <div ref={buttonsRef} className="flex flex-wrap items-center justify-center gap-4 mt-12">
          <button
            onClick={openModal}
            className="font-inter text-[0.85rem] font-semibold uppercase tracking-[0.06em] bg-gold text-[#0f0f0f] px-8 py-4 border-2 border-gold cursor-pointer transition-all duration-300 hover:bg-transparent hover:text-gold"
          >
            Maak Afspraak
          </button>
          <button
            onClick={() => scrollTo('#services')}
            className="font-inter text-[0.85rem] font-semibold uppercase tracking-[0.06em] bg-transparent text-white px-8 py-4 border-2 cursor-pointer transition-all duration-300 hover:border-white"
            style={{ borderColor: 'rgba(255, 255, 255, 0.3)' }}
          >
            Bekijk Prijzen
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[2] flex flex-col items-center scroll-indicator"
      >
        <div className="w-px h-10 bg-gold opacity-50" />
        <div className="w-1.5 h-1.5 rounded-full bg-gold opacity-50 -mt-0.5" />
      </div>
    </section>
  );
}
