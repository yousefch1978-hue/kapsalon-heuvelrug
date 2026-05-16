import { useLenis } from './hooks/useLenis';
import { BookingProvider } from './contexts/BookingContext';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import About from './sections/About';
import Services from './sections/Services';
import Gallery from './sections/Gallery';
import Reviews from './sections/Reviews';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import StickyCTA from './sections/StickyCTA';
import BookingModal from './components/BookingModal';

function App() {
  useLenis();

  return (
    <BookingProvider>
      <div className="bg-[#0f0f0f] min-h-screen">
        <Navigation />
        <Hero />
        <About />
        <Services />
        <Gallery />
        <Reviews />
        <Contact />
        <Footer />
        <StickyCTA />
        <BookingModal />
      </div>
    </BookingProvider>
  );
}

export default App;
