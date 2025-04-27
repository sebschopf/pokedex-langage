'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface TechnologyNavigationProps {
  categories: string[];
  languageName: string;
}

export default function TechnologyNavigation({
  categories,
  languageName,
}: TechnologyNavigationProps) {
  const [isSticky, setIsSticky] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Commencer à coller après avoir défilé de 300px
      setIsSticky(window.scrollY > 300);

      // Déterminer la catégorie active en fonction de la position de défilement
      const categoryElements = categories
        .map(category => {
          const element = document.getElementById(
            `category-${category.replace(/\s+/g, '-').toLowerCase()}`,
          );
          return { category, element };
        })
        .filter(item => item.element);

      // Trouver l'élément le plus proche du haut de la fenêtre
      const activeElement = categoryElements.reduce(
        (closest, current) => {
          if (!current.element) return closest;

          const rect = current.element.getBoundingClientRect();
          // Considérer l'élément comme actif s'il est à moins de 200px du haut
          if (rect.top <= 200 && rect.top > -rect.height) {
            if (!closest.element) return current;

            const closestRect = closest.element.getBoundingClientRect();
            return Math.abs(rect.top) < Math.abs(closestRect.top) ? current : closest;
          }
          return closest;
        },
        { category: '', element: null as HTMLElement | null },
      );

      setActiveCategory(activeElement.category || null);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [categories]);

  if (categories.length <= 1) return null;

  return (
    <div
      className={`${
        isSticky
          ? 'sticky top-0 z-40 border-4 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
          : 'relative bg-gray-100 border-4 border-black'
      } transition-all duration-300`}
    >
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-lg">Frameworks {languageName} par catégorie</h3>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 bg-black text-white hover:bg-gray-800 transition-colors"
            aria-expanded={isExpanded}
            aria-label={isExpanded ? 'Réduire la navigation' : 'Développer la navigation'}
          >
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>

        <div
          className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-96' : 'max-h-0'}`}
        >
          <nav className="mt-4">
            <ul className="space-y-2">
              {categories.map(category => (
                <li key={category}>
                  <a
                    href={`#category-${category.replace(/\s+/g, '-').toLowerCase()}`}
                    className={`block px-3 py-2 border-2 border-black hover:bg-yellow-300 transition-colors ${
                      activeCategory === category ? 'bg-yellow-300 font-bold' : 'bg-white'
                    }`}
                    onClick={() => setIsExpanded(false)}
                  >
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
