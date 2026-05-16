import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useBooking } from '@/contexts/BookingContext';

gsap.registerPlugin(ScrollTrigger);

const hours = [
  { day: 'Maandag', hours: '12:00 – 18:30' },
  { day: 'Dinsdag', hours: '09:00 – 18:30' },
  { day: 'Woensdag', hours: '09:00 – 18:30' },
  { day: 'Donderdag', hours: '09:00 – 18:30' },
  { day: 'Vrijdag', hours: '09:00 – 19:00' },
  { day: 'Zaterdag', hours: '09:00 – 18:00' },
  { day: 'Zondag', hours: 'Gesloten' },
];

function getCurrentDayIndex(): number {
  const day = new Date().getDay();
  return day === 0 ? 6 : day - 1;
}

export default function Contact() {
  const { openModal } = useBooking();
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const [currentDay] = useState(getCurrentDayIndex);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftRef.current,
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        rightRef.current,
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="bg-[#0f0f0f] pt-32 pb-16 px-[5vw]"
    >
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
        {/* Left Column - Contact Info */}
        <div ref={leftRef}>
          <h2
            className="font-bebas text-white uppercase"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 0.95 }}
          >
            Kom Langs
          </h2>

          {/* Address */}
          <div className="mt-8">
            <span className="font-inter text-[0.7rem] font-medium tracking-[0.15em] uppercase text-gold">
              ADRES
            </span>
            <p className="font-inter text-[1.1rem] text-white mt-2">
              Rijksstraatweg 151a, Leersum
            </p>
          </div>

          {/* Phone */}
          <div className="mt-8">
            <span className="font-inter text-[0.7rem] font-medium tracking-[0.15em] uppercase text-gold">
              TELEFOON
            </span>
            <a
              href="tel:+31685199904"
              className="block font-inter text-[1.1rem] text-white mt-2 hover:text-gold transition-colors no-underline"
            >
              +31 6 85199904
            </a>
          </div>

          {/* Hours */}
          <div className="mt-8">
            <span className="font-inter text-[0.7rem] font-medium tracking-[0.15em] uppercase text-gold">
              OPENINGSTIJDEN
            </span>
            <div className="mt-3 space-y-0">
              {hours.map((h, i) => (
                <div
                  key={h.day}
                  className="flex justify-between py-2 border-b border-base-surface-light"
                  style={{
                    background: i === currentDay ? 'rgba(200, 169, 107, 0.1)' : 'transparent',
                    margin: '0 -0.5rem',
                    padding: '0.4rem 0.5rem',
                  }}
                >
                  <span className="font-inter text-[0.9rem] text-text-secondary">
                    {h.day}
                  </span>
                  <span
                    className="font-inter text-[0.9rem]"
                    style={{
                      color: i === currentDay ? '#c8a96b' : '#ffffff',
                    }}
                  >
                    {h.hours}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="mt-10 flex gap-4">
            <a
              href="https://wa.me/31685199904"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center transition-opacity hover:opacity-85"
              style={{ background: '#25D366' }}
              aria-label="WhatsApp"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </a>
            <a
              href="https://www.tiktok.com/@kapsalonheuvelrug"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center bg-black border border-[#333] transition-opacity hover:opacity-85"
              aria-label="TikTok"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.88-2.88 2.89 2.89 0 012.88-2.88c.28 0 .54.04.79.09v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.34 4.91v-7.18a8.28 8.28 0 004.83 1.55v-3.5c-.01 0-.01 0 0 0z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/kapsalonheuvelrug"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center transition-opacity hover:opacity-85"
              style={{
                background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
              }}
              aria-label="Instagram"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
          </div>

          {/* CTA Button — opens booking modal */}
          <button
            onClick={openModal}
            className="mt-8 font-inter text-[0.85rem] font-semibold uppercase tracking-[0.06em] bg-gold text-[#0f0f0f] px-8 py-4 border-2 border-gold cursor-pointer transition-all duration-300 hover:bg-transparent hover:text-gold"
          >
            Maak Afspraak
          </button>
        </div>

        {/* Right Column - Map */}
        <div ref={rightRef} className="min-h-[400px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2451.0!2d5.423!3d52.011!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sRijksstraatweg+151a%2C+Leersum!5e0!3m2!1snl!2snl!4v1"
            width="100%"
            height="100%"
            style={{
              border: '1px solid #222',
              filter: 'grayscale(100%) contrast(1.1)',
              minHeight: '400px',
            }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Kapsalon Heuvelrug locatie"
          />
        </div>
      </div>
    </section>
  );
}
