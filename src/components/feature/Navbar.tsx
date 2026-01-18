import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: 'Accueil' },
    { 
      path: '/services', 
      label: 'Services et Ressources',
      dropdown: [
        { path: '/services', label: 'Aperçu Général' },
        { path: '/services/documents-officiels', label: 'Documents Officiels' },
        { path: '/services/comites', label: 'Nos Comités Spécialisés' },
        { path: '/services/bourses', label: 'Bourses et Subventions' },
      ]
    },
    { 
      path: '/actualites', 
      label: 'Actualités et Événements',
      dropdown: [
        { path: '/actualites', label: 'Aperçu Général' },
        { path: '/actualites/evenements', label: 'Événements à Venir' },
        { path: '/actualites/annonces', label: 'Annonces et Communiqués' },
        { path: '/actualites/souvenirs', label: 'Souvenirs de nos Événements' },
      ]
    },
    { 
      path: '/engagement', 
      label: 'Engagement Communautaire',
      dropdown: [
        { path: '/engagement', label: 'Aperçu Général' },
        { path: '/engagement/annuaire', label: 'Annuaire des Associations' },
        { path: '/engagement/projets', label: 'Nos Projets' },
        { path: '/engagement/consultations', label: 'Votre Opinion Compte' },
      ]
    },
    { path: '/espace-membre', label: 'Espace Membre' },
    { path: '/contact', label: 'Contacts' },
  ];

  const handleDropdownToggle = (path: string) => {
    setOpenDropdown(openDropdown === path ? null : path);
  };

  const isActiveLink = (linkPath: string, hasDropdown = false) => {
    if (hasDropdown) {
      return location.pathname.startsWith(linkPath);
    }
    return location.pathname === linkPath;
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 via-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">HCBE</span>
            </div>
            <div className="hidden md:block">
              <div className={`font-bold text-lg ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
                HCBE Canada
              </div>
              <div className={`text-xs ${isScrolled ? 'text-gray-600' : 'text-white/90'}`}>
                Haut Conseil des Burkinabè de l'Extérieur
              </div>
            </div>
          </Link>

          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <div key={link.path} className="relative group">
                {link.dropdown ? (
                  <>
                    <Link
                      to={link.path}
                      className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                        isActiveLink(link.path, true)
                          ? 'bg-emerald-600 text-white'
                          : isScrolled
                          ? 'text-gray-700 hover:bg-gray-100'
                          : 'text-white hover:bg-white/10'
                      }`}
                      onMouseEnter={() => setOpenDropdown(link.path)}
                    >
                      {link.label}
                      <i className="ri-arrow-down-s-line ml-1"></i>
                    </Link>
                    
                    {/* Dropdown */}
                    <div 
                      className="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50"
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      <div className="py-2">
                        {link.dropdown.map((subLink) => (
                          <Link
                            key={subLink.path}
                            to={subLink.path}
                            className={`block px-4 py-3 text-sm transition-colors ${
                              location.pathname === subLink.path
                                ? 'bg-emerald-50 text-emerald-600 border-r-2 border-emerald-600'
                                : 'text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            {subLink.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    to={link.path}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                      isActiveLink(link.path)
                        ? 'bg-emerald-600 text-white'
                        : isScrolled
                        ? 'text-gray-700 hover:bg-gray-100'
                        : 'text-white hover:bg-white/10'
                    }`}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 rounded-lg ${
              isScrolled ? 'text-gray-900' : 'text-white'
            }`}
          >
            <i className={`ri-${isMobileMenuOpen ? 'close' : 'menu'}-line text-2xl`}></i>
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t shadow-lg">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <div key={link.path}>
                {link.dropdown ? (
                  <>
                    <button
                      onClick={() => handleDropdownToggle(link.path)}
                      className={`flex items-center justify-between w-full px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                        isActiveLink(link.path, true)
                          ? 'bg-emerald-600 text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {link.label}
                      <i className={`ri-arrow-${openDropdown === link.path ? 'up' : 'down'}-s-line`}></i>
                    </button>
                    
                    {openDropdown === link.path && (
                      <div className="ml-4 mt-2 space-y-1">
                        {link.dropdown.map((subLink) => (
                          <Link
                            key={subLink.path}
                            to={subLink.path}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`block px-4 py-2 rounded-lg text-sm transition-all ${
                              location.pathname === subLink.path
                                ? 'bg-emerald-50 text-emerald-600 border-l-2 border-emerald-600'
                                : 'text-gray-600 hover:bg-gray-50'
                            }`}
                          >
                            {subLink.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                      isActiveLink(link.path)
                        ? 'bg-emerald-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
