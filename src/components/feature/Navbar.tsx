import { useState, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PublicLanguageSwitcher from './PublicLanguageSwitcher';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();
  const { t } = useTranslation();

  const navLinks = useMemo(
    () => [
      { path: '/', labelKey: 'public.nav.home' },
      {
        path: '/services',
        labelKey: 'public.nav.services',
        dropdown: [
          { path: '/services/documents-officiels', labelKey: 'public.nav.documents' },
          { path: '/services/comites', labelKey: 'public.nav.committees' },
          { path: '/services/bourses', labelKey: 'public.nav.grants' },
        ],
      },
      {
        path: '/actualites',
        labelKey: 'public.nav.news',
        dropdown: [
          { path: '/actualites/evenements', labelKey: 'public.nav.events' },
          { path: '/actualites/annonces', labelKey: 'public.nav.announcements' },
          // { path: '/actualites/souvenirs', labelKey: 'public.nav.memories' },
        ],
      },
      {
        path: '/engagement',
        labelKey: 'public.nav.engagement',
        dropdown: [
          { path: '/engagement/annuaire', labelKey: 'public.nav.associations' },
          { path: '/engagement/projets', labelKey: 'public.nav.projects' },
          { path: '/engagement/consultations', labelKey: 'public.nav.consultations' },
        ],
      },
      { path: '/espace-membre', labelKey: 'public.nav.members' },
      { path: '/contact', labelKey: 'public.nav.contact' },
    ],
    [],
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleDropdownToggle = (path: string) => {
    setOpenDropdown(openDropdown === path ? null : path);
  };

  const isActiveLink = (linkPath: string, hasDropdown = false) => {
    if (hasDropdown) {
      return location.pathname.startsWith(linkPath);
    }
    return location.pathname === linkPath;
  };

  const navTone = isScrolled ? 'light' : 'dark';

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
                {t('public.nav.brandSubtitle')}
              </div>
            </div>
          </Link>

          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const label = t(link.labelKey);
              return (
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
                        {label}
                        <i className="ri-arrow-down-s-line ml-1" aria-hidden="true"></i>
                      </Link>

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
                              {t(subLink.labelKey)}
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
                      {label}
                    </Link>
                  )}
                </div>
              );
            })}
            <div className={`ml-2 pl-2 ${isScrolled ? 'border-gray-200' : 'border-white/20'} border-l`}>
              <PublicLanguageSwitcher tone={navTone} />
            </div>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <PublicLanguageSwitcher tone={isMobileMenuOpen || isScrolled ? 'light' : 'dark'} />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? t('public.nav.closeMenu') : t('public.nav.openMenu')}
              className={`p-2 rounded-lg ${isScrolled || isMobileMenuOpen ? 'text-gray-900' : 'text-white'}`}
            >
              <i className={`ri-${isMobileMenuOpen ? 'close' : 'menu'}-line text-2xl`} aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t shadow-lg">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => {
              const label = t(link.labelKey);
              return (
                <div key={link.path}>
                  {link.dropdown ? (
                    <>
                      <div
                        className={`flex items-center rounded-lg text-sm font-medium transition-all ${
                          isActiveLink(link.path, true)
                            ? 'bg-emerald-600 text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <Link
                          to={link.path}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex-1 px-4 py-3"
                        >
                          {label}
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDropdownToggle(link.path)}
                          aria-label={
                            openDropdown === link.path
                              ? t('public.nav.closeSubmenu', { label })
                              : t('public.nav.openSubmenu', { label })
                          }
                          aria-expanded={openDropdown === link.path}
                          className="px-4 py-3"
                        >
                          <i
                            className={`ri-arrow-${openDropdown === link.path ? 'up' : 'down'}-s-line`}
                            aria-hidden="true"
                          ></i>
                        </button>
                      </div>

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
                              {t(subLink.labelKey)}
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
                      {label}
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
