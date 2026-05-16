export default function Footer() {
  return (
    <footer className="bg-base-surface border-t border-base-surface-light py-12 px-[5vw]">
      <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="font-inter text-[0.75rem] text-text-tertiary text-center md:text-left">
          &copy; 2025 Kapsalon Heuvelrug. Alle rechten voorbehouden.
        </p>
        <div className="flex gap-8">
          <a
            href="#"
            className="font-inter text-[0.75rem] text-text-secondary hover:text-white transition-colors duration-300 no-underline"
          >
            Privacy
          </a>
          <a
            href="#"
            className="font-inter text-[0.75rem] text-text-secondary hover:text-white transition-colors duration-300 no-underline"
          >
            Algemene Voorwaarden
          </a>
        </div>
      </div>
    </footer>
  );
}
