import { useState, useEffect, useCallback } from 'react';
import { useBooking } from '@/contexts/BookingContext';

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'Over Ons', href: '#about' },
  { label: 'Diensten', href: '#services' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const { openModal } = useBooking();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-50% 0px -50% 0px' }
    );

    navLinks.forEach((link) => {
      const section = document.querySelector(link.href);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = useCallback((href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      const offset = 72;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, []);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-[100] transition-all duration-400"
        style={{
          background: scrolled ? 'rgba(15, 15, 15, 0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
        }}
      >
        <div className="flex items-center justify-between h-[72px] px-[5vw]">
          {/* Logo */}
          <button
            onClick={() => scrollTo('#hero')}
            className="flex items-center gap-2 cursor-pointer bg-transparent border-none"
          >
            <span className="text-gold text-[0.6rem]">&#9670;</span>
            <span className="font-bebas text-xl tracking-[0.15em] text-white">
              HEUVELRUG
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="font-inter text-[0.8rem] font-medium tracking-[0.1em] uppercase bg-transparent border-none cursor-pointer transition-colors duration-300"
                style={{
                  color: activeSection === link.href.slice(1) ? '#c8a96b' : '#a0a0a0',
                }}
                onMouseEnter={(e) => {
                  if (activeSection !== link.href.slice(1)) {
                    e.currentTarget.style.color = '#ffffff';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeSection !== link.href.slice(1)) {
                    e.currentTarget.style.color = '#a0a0a0';
                  }
                }}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={openModal}
              className="font-inter text-[0.8rem] font-semibold tracking-[0.06em] uppercase bg-gold text-[#0f0f0f] px-6 py-2.5 border-none cursor-pointer transition-colors duration-300 hover:bg-[#d4b87a]"
            >
              Afspraak Maken
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 bg-transparent border-none cursor-pointer p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            <span
              className="block w-6 h-0.5 bg-white transition-all duration-300"
              style={{
                transform: mobileOpen ? 'rotate(45deg) translate(4px, 4px)' : 'none',
              }}
            />
            <span
              className="block w-6 h-0.5 bg-white transition-all duration-300"
              style={{
                opacity: mobileOpen ? 0 : 1,
              }}
            />
            <span
              className="block w-6 h-0.5 bg-white transition-all duration-300"
              style={{
                transform: mobileOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'none',
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className="fixed inset-0 z-[99] bg-[#0f0f0f] flex flex-col items-center justify-center gap-8 transition-all duration-400 md:hidden"
        style={{
          transform: mobileOpen ? 'translateX(0)' : 'translateX(100%)',
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? 'auto' : 'none',
        }}
      >
        {navLinks.map((link) => (
          <button
            key={link.href}
            onClick={() => scrollTo(link.href)}
            className="font-bebas text-4xl uppercase bg-transparent border-none cursor-pointer transition-colors duration-300"
            style={{
              color: activeSection === link.href.slice(1) ? '#c8a96b' : '#ffffff',
            }}
          >
            {link.label}
          </button>
        ))}
        <button
          onClick={() => { setMobileOpen(false); openModal(); }}
          className="font-inter text-sm font-semibold tracking-[0.06em] uppercase bg-gold text-[#0f0f0f] px-8 py-3 border-none cursor-pointer mt-4"
        >
          Afspraak Maken
        </button>
      </div>
    </>
  );
}
