'use client';

import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          aria-label="Remonter en haut de la page"
          className="fixed bottom-6 right-6 p-3 bg-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-50 border-4 border-black hover:bg-yellow-300 hover:-rotate-2 transition-all duration-300"
        >
          <ChevronUp size={24} className="text-white hover:text-black" aria-hidden="true" />
        </button>
      )}
    </>
  );
}
