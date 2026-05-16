import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const features = [
  'Moderne stijl',
  'Strakke fades',
  'Persoonlijke service',
  'Relaxte sfeer',
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

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
      id="about"
      ref={sectionRef}
      className="bg-[#0f0f0f] py-32 px-[5vw]"
    >
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
        {/* Left Column - Statement */}
        <div ref={leftRef}>
          <h2
            className="font-bebas text-white uppercase leading-[1.05]"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
          >
            WIJ ZIJN HEUVELRUG — UW ADRES VOOR{' '}
            <span
              className="inline"
              style={{
                background: 'rgba(200, 169, 107, 0.2)',
                padding: '0.1em 0.2em',
              }}
            >
              MODERNE
            </span>{' '}
            KAPSELS IN LEERSUM.
          </h2>
        </div>

        {/* Right Column - Content */}
        <div ref={rightRef}>
          <p className="font-inter text-base text-text-secondary leading-relaxed">
            Een moderne kapsalon in het hart van Leersum. Gespecialiseerd in fades,
            trims en frisse kapsels met persoonlijke service en een relaxte sfeer.
            Ook voor dames en kinderen.
          </p>

          <div className="mt-10 space-y-4">
            {features.map((feature) => (
              <div key={feature} className="flex items-center gap-4">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="flex-shrink-0"
                >
                  <path
                    d="M3 8L6.5 11.5L13 4.5"
                    stroke="#c8a96b"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="font-inter text-[0.95rem] text-white">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
