import { useState, useMemo, useCallback, useEffect } from 'react';
import { useBooking } from '@/contexts/BookingContext';

const openingHours: Record<number, { open: number; close: number }> = {
  1: { open: 12, close: 18.5 },   // Maandag
  2: { open: 9, close: 18.5 },    // Dinsdag
  3: { open: 9, close: 18.5 },    // Woensdag
  4: { open: 9, close: 18.5 },    // Donderdag
  5: { open: 9, close: 19 },      // Vrijdag
  6: { open: 9, close: 18 },      // Zaterdag
};

const dayNames = ['Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag'];
const monthNames = ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'];

interface TimeSlot {
  time: string;
  hour: number;
  minute: number;
}

interface DayOption {
  date: Date;
  dayName: string;
  dateStr: string;
  dayOfWeek: number;
  isOpen: boolean;
}

function generateTimeSlots(openHour: number, closeHour: number): TimeSlot[] {
  const slots: TimeSlot[] = [];
  let current = openHour;
  while (current < closeHour) {
    const h = Math.floor(current);
    const m = (current - h) * 60;
    slots.push({
      time: `${String(h).padStart(2, '0')}:${String(Math.round(m)).padStart(2, '0')}`,
      hour: h,
      minute: Math.round(m),
    });
    current += 0.5;
  }
  return slots;
}

function generateNextDays(count: number): DayOption[] {
  const days: DayOption[] = [];
  const today = new Date();
  
  for (let i = 0; i < count; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const dayOfWeek = date.getDay();
    const isOpen = dayOfWeek !== 0; // Sunday = closed
    
    days.push({
      date,
      dayName: dayNames[dayOfWeek],
      dateStr: `${date.getDate()} ${monthNames[date.getMonth()]}`,
      dayOfWeek,
      isOpen,
    });
  }
  
  return days;
}

export default function BookingModal() {
  const { isOpen, closeModal } = useBooking();
  const [selectedDay, setSelectedDay] = useState<DayOption | null>(null);
  const [selectedTime, setSelectedTime] = useState<TimeSlot | null>(null);
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const days = useMemo(() => generateNextDays(14), []);
  
  const timeSlots = useMemo(() => {
    if (!selectedDay || !selectedDay.isOpen) return [];
    const hours = openingHours[selectedDay.dayOfWeek];
    if (!hours) return [];
    return generateTimeSlots(hours.open, hours.close);
  }, [selectedDay]);

  const handleClose = useCallback(() => {
    closeModal();
    setTimeout(() => {
      setStep(1);
      setSelectedDay(null);
      setSelectedTime(null);
    }, 300);
  }, [closeModal]);

  const handleDaySelect = (day: DayOption) => {
    if (!day.isOpen) return;
    setSelectedDay(day);
    setStep(2);
  };

  const handleTimeSelect = (slot: TimeSlot) => {
    setSelectedTime(slot);
    setStep(3);
  };

  const handleWhatsApp = () => {
    if (!selectedDay || !selectedTime) return;
    const message = `Hey, ik wil graag een afspraak maken bij Kapsalon Heuvelrug. Ik wil graag komen op ${selectedDay.dayName} ${selectedDay.dateStr} om ${selectedTime.time}.`;
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/31685199904?text=${encoded}`, '_blank');
    handleClose();
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Close on escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) handleClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, handleClose]);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{
        background: 'rgba(15, 15, 15, 0.95)',
        opacity: isOpen ? 1 : 0,
        pointerEvents: isOpen ? 'auto' : 'none',
        transition: 'opacity 0.3s ease',
      }}
      onClick={handleClose}
    >
      <div
        className="bg-[#181818] border border-[#222] w-full max-w-[500px] max-h-[85vh] overflow-y-auto relative"
        style={{
          transform: isOpen ? 'translateY(0)' : 'translateY(20px)',
          transition: 'transform 0.3s ease',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 font-inter text-2xl text-[#a0a0a0] bg-transparent border-none cursor-pointer hover:text-white transition-colors z-10"
        >
          &times;
        </button>

        {/* Header */}
        <div className="p-8 pb-4">
          <h3 className="font-bebas text-white uppercase text-3xl tracking-wide">
            {step === 1 && 'Kies een Dag'}
            {step === 2 && 'Kies een Tijd'}
            {step === 3 && 'Bevestig Afspraak'}
          </h3>
          <p className="font-inter text-[0.8rem] text-[#a0a0a0] mt-1">
            {step === 1 && 'Selecteer wanneer je wilt komen'}
            {step === 2 && selectedDay && `${selectedDay.dayName} ${selectedDay.dateStr}`}
            {step === 3 && selectedDay && selectedTime && `${selectedDay.dayName} ${selectedDay.dateStr} om ${selectedTime.time}`}
          </p>
        </div>

        {/* Step indicator */}
        <div className="px-8 flex gap-2 mb-6">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className="h-0.5 flex-1 transition-colors duration-300"
              style={{ background: s <= step ? '#c8a96b' : '#333' }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="px-8 pb-8">
          {/* Step 1: Day Selection */}
          {step === 1 && (
            <div className="grid grid-cols-2 gap-2">
              {days.map((day, i) => (
                <button
                  key={i}
                  onClick={() => handleDaySelect(day)}
                  disabled={!day.isOpen}
                  className="p-4 text-left border transition-all duration-200 cursor-pointer font-inter"
                  style={{
                    borderColor: selectedDay === day ? '#c8a96b' : '#222',
                    background: selectedDay === day ? 'rgba(200, 169, 107, 0.1)' : day.isOpen ? 'transparent' : 'rgba(30, 30, 30, 0.5)',
                    opacity: day.isOpen ? 1 : 0.4,
                  }}
                  onMouseEnter={(e) => {
                    if (day.isOpen) e.currentTarget.style.borderColor = '#c8a96b';
                  }}
                  onMouseLeave={(e) => {
                    if (selectedDay !== day) e.currentTarget.style.borderColor = '#222';
                  }}
                >
                  <span className="block text-[0.7rem] text-[#a0a0a0] uppercase tracking-wider">{day.dayName}</span>
                  <span className="block text-white text-sm mt-1">{day.dateStr}</span>
                  {!day.isOpen && <span className="block text-[#666] text-[0.7rem] mt-1">Gesloten</span>}
                </button>
              ))}
            </div>
          )}

          {/* Step 2: Time Selection */}
          {step === 2 && (
            <>
              <button
                onClick={() => setStep(1)}
                className="font-inter text-[0.75rem] text-gold bg-transparent border-none cursor-pointer mb-4 hover:underline"
              >
                &larr; Terug naar dag selectie
              </button>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((slot, i) => (
                  <button
                    key={i}
                    onClick={() => handleTimeSelect(slot)}
                    className="py-3 px-2 text-center border transition-all duration-200 cursor-pointer font-inter text-sm"
                    style={{
                      borderColor: selectedTime === slot ? '#c8a96b' : '#222',
                      background: selectedTime === slot ? 'rgba(200, 169, 107, 0.1)' : 'transparent',
                      color: selectedTime === slot ? '#c8a96b' : '#ffffff',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#c8a96b';
                    }}
                    onMouseLeave={(e) => {
                      if (selectedTime !== slot) e.currentTarget.style.borderColor = '#222';
                    }}
                  >
                    {slot.time}
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Step 3: Confirm */}
          {step === 3 && (
            <>
              <button
                onClick={() => setStep(2)}
                className="font-inter text-[0.75rem] text-gold bg-transparent border-none cursor-pointer mb-4 hover:underline"
              >
                &larr; Terug naar tijd selectie
              </button>
              
              <div className="bg-[#0f0f0f] border border-[#222] p-6 mb-6">
                <div className="flex justify-between items-center py-2 border-b border-[#222]">
                  <span className="font-inter text-[0.8rem] text-[#a0a0a0]">Dag</span>
                  <span className="font-inter text-sm text-white">{selectedDay?.dayName} {selectedDay?.dateStr}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-[#222]">
                  <span className="font-inter text-[0.8rem] text-[#a0a0a0]">Tijd</span>
                  <span className="font-inter text-sm text-white">{selectedTime?.time}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-inter text-[0.8rem] text-[#a0a0a0]">Locatie</span>
                  <span className="font-inter text-sm text-white">Kapsalon Heuvelrug, Leersum</span>
                </div>
              </div>

              <button
                onClick={handleWhatsApp}
                className="w-full font-inter text-[0.85rem] font-semibold uppercase tracking-[0.06em] bg-gold text-[#0f0f0f] py-4 border-2 border-gold cursor-pointer transition-all duration-300 hover:bg-transparent hover:text-gold flex items-center justify-center gap-3"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Bevestig via WhatsApp
              </button>

              <p className="font-inter text-[0.75rem] text-[#666] text-center mt-4">
                Je wordt doorgestuurd naar WhatsApp om je afspraak te bevestigen.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
