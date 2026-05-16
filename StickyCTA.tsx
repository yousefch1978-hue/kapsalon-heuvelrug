import { useState, useEffect } from 'react';
import { useBooking } from '@/contexts/BookingContext';

export default function StickyCTA() {
  const { openModal } = useBooking();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight;
      const contactSection = document.querySelector('#contact');
      const contactTop = contactSection
        ? contactSection.getBoundingClientRect().top + window.scrollY
        : Infinity;

      setVisible(
        scrollY > heroHeight * 0.5 &&
        scrollY < contactTop - window.innerHeight * 0.8 &&
        window.innerWidth < 768
      );
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={openModal}
      className="fixed bottom-0 left-0 right-0 z-[90] bg-gold text-[#0f0f0f] py-4 px-4 text-center font-inter text-[0.9rem] font-semibold uppercase tracking-[0.06em] cursor-pointer border-none transition-colors duration-300 hover:bg-gold-light"
      style={{ borderTop: '2px solid #d4b87a' }}
    >
      Maak Afspraak
    </button>
  );
}
