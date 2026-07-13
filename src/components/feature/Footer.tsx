import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { HcbeLogo } from '../brand/HcbeLogo';
import { InstitutionalFlags } from '../brand/InstitutionalFlags';
import NewsletterSignup from './NewsletterSignup';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <>
      <NewsletterSignup />
      <footer className="bg-gray-50 text-gray-800 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <HcbeLogo
                size="md"
                showWordmark
                titleClassName="font-bold text-lg text-gray-900"
                subtitle={t('public.footer.tagline')}
                subtitleClassName="text-sm text-gray-600"
                className="mb-4"
              />
              <p className="text-sm text-gray-600 leading-relaxed">{t('public.footer.description')}</p>
              <InstitutionalFlags variant="footer" />
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4 text-gray-900">{t('public.footer.navigation')}</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-sm text-gray-600 hover:text-emerald-600 transition-colors">
                    {t('public.nav.home')}
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="text-sm text-gray-600 hover:text-emerald-600 transition-colors">
                    {t('public.footer.services')}
                  </Link>
                </li>
                <li>
                  <Link to="/actualites" className="text-sm text-gray-600 hover:text-emerald-600 transition-colors">
                    {t('public.footer.news')}
                  </Link>
                </li>
                <li>
                  <Link to="/engagement" className="text-sm text-gray-600 hover:text-emerald-600 transition-colors">
                    {t('public.footer.engagement')}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4 text-gray-900">{t('public.footer.contacts')}</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-2">
                  <i className="ri-mail-line text-lg mt-0.5 text-gray-500" aria-hidden="true"></i>
                  <span className="text-sm text-gray-600">contact@hcbecanada.org</span>
                </li>
                <li className="flex items-start space-x-2">
                  <i className="ri-phone-line text-lg mt-0.5 text-gray-500" aria-hidden="true"></i>
                  <span className="text-sm text-gray-600">+1 (XXX) XXX-XXXX</span>
                </li>
                <li className="flex items-start space-x-2">
                  <i className="ri-map-pin-line text-lg mt-0.5 text-gray-500" aria-hidden="true"></i>
                  <span className="text-sm text-gray-600">{t('public.footer.country')}</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4 text-gray-900">{t('public.footer.follow')}</h3>
              <div className="flex space-x-3 mb-4">
                {['facebook', 'twitter-x', 'linkedin', 'youtube'].map((network) => (
                  <a
                    key={network}
                    href="#"
                    className="w-10 h-10 bg-gray-200 hover:bg-emerald-600 hover:text-white rounded-lg flex items-center justify-center transition-all"
                    aria-label={network}
                  >
                    <i className={`ri-${network}-fill text-xl text-gray-700 hover:text-white`} aria-hidden="true"></i>
                  </a>
                ))}
              </div>
              <p className="text-sm text-gray-600">{t('public.footer.followHint')}</p>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8">
            <p className="text-sm text-gray-600 text-center md:text-left">
              {t('public.footer.copyright', { year: currentYear })}
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
