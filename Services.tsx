import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  { name: 'Heren Knippen', desc: 'Een frisse knipbeurt met precisie en stijl.', price: '25' },
  { name: 'Fade', desc: 'Strakke fade met perfecte overgangen.', price: '30' },
  { name: 'Baard Trimmen', desc: 'Netjes bijwerken en shapen van je baard.', price: '15' },
  { name: 'Kinderen', desc: 'Knippen voor jongens en meisjes.', price: '20' },
  { name: 'Dames Knippen', desc: 'Trendy dameskapsels op maat.', price: '35' },
  { name: 'Baard & Haar', desc: 'Complete verzorging van haar en baard.', price: '40' },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: i * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="bg-[#0f0f0f] py-32 px-[5vw]"
    >
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <div className="text-center">
          <h2
            className="font-bebas text-white uppercase"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 0.95 }}
          >
            Onze Diensten
          </h2>
          <p className="font-inter text-[0.85rem] text-text-secondary mt-3">
            Kwaliteitskniptechnieken voor elke stijl
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {services.map((service, i) => (
            <div
              key={service.name}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="group relative bg-base-surface border-l-[3px] border-l-gold p-10 overflow-hidden transition-all duration-350 cursor-default"
              style={{
                transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <h3
                className="font-bebas text-white uppercase mb-3"
                style={{
                  fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                  lineHeight: 1,
                  letterSpacing: '0.02em',
                }}
              >
                {service.name}
              </h3>
              <p className="font-inter text-[0.85rem] text-text-secondary leading-relaxed mb-6">
                {service.desc}
              </p>
              <div className="flex items-baseline gap-1">
                <span
                  className="font-bebas text-gold"
                  style={{ fontSize: '2rem', letterSpacing: '0.02em' }}
                >
                  &euro;{service.price}
                </span>
              </div>

              {/* Hover shimmer line */}
              <div
                className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'linear-gradient(90deg, transparent, #c8a96b, transparent)',
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
