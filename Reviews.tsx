import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reviews = [
  {
    stars: 5,
    text: 'Goede sfeer en netjes geknipt. Een echte aanrader voor iedereen in de buurt!',
    author: 'Kevin de Vries',
  },
  {
    stars: 5,
    text: 'Nieuwe moderne zaak met vakmensen die weten wat ze doen. Mijn fade was perfect.',
    author: 'Mark Jansen',
  },
  {
    stars: 5,
    text: 'Strakke fade en top service. De sfeer is relaxed en de barbers zijn professioneel.',
    author: 'Luuk Bakker',
  },
  {
    stars: 5,
    text: 'Mijn zoon is hier altijd blij mee. Goed met kinderen en altijd een mooi resultaat.',
    author: 'Sophie van Dijk',
  },
];

export default function Reviews() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            delay: i * 0.15,
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
      id="reviews"
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
            Wat Klanten Zeggen
          </h2>
          <p className="font-inter text-[0.85rem] text-text-secondary mt-3">
            Echte reviews van onze klanten
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          {reviews.map((review, i) => (
            <div
              key={i}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="relative bg-base-surface border border-base-surface-light p-10 transition-colors duration-300 hover:border-[rgba(200,169,107,0.3)]"
            >
              {/* Decorative quote */}
              <span
                className="absolute top-4 left-6 font-bebas text-gold leading-none select-none"
                style={{ fontSize: '4rem', opacity: 0.4 }}
              >
                &ldquo;
              </span>

              {/* Stars */}
              <div className="mt-6 flex gap-1">
                {Array.from({ length: review.stars }).map((_, si) => (
                  <span key={si} className="text-gold text-base tracking-[0.1em]">
                    &#9733;
                  </span>
                ))}
              </div>

              {/* Quote */}
              <p className="font-inter text-base text-white italic leading-relaxed mt-4">
                &ldquo;{review.text}&rdquo;
              </p>

              {/* Author */}
              <p className="font-inter text-[0.85rem] font-semibold text-text-secondary mt-6">
                &mdash; {review.author}
              </p>

              {/* Badge */}
              <div className="mt-3 inline-block">
                <span
                  className="font-inter text-[0.7rem] font-medium text-gold px-3 py-1"
                  style={{ background: 'rgba(200, 169, 107, 0.15)' }}
                >
                  Google Review
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
