import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';
import ActualitesHero from './components/ActualitesHero';

const ActualitesPage = () => {
  const { t } = useTranslation();

  const sections = [
    {
      titleKey: 'public.news.page.cards.events.title',
      descriptionKey: 'public.news.page.cards.events.description',
      icon: 'ri-calendar-event-line',
      path: '/actualites/evenements',
      color: 'from-emerald-600 to-emerald-800',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop',
    },
    {
      titleKey: 'public.news.page.cards.announcements.title',
      descriptionKey: 'public.news.page.cards.announcements.description',
      icon: 'ri-newspaper-line',
      path: '/actualites/annonces',
      color: 'from-blue-600 to-blue-800',
      image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=600&fit=crop',
    },
    {
      titleKey: 'public.news.page.cards.memories.title',
      descriptionKey: 'public.news.page.cards.memories.description',
      icon: 'ri-image-line',
      path: '/actualites/souvenirs',
      color: 'from-amber-600 to-orange-700',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <ActualitesHero />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {t('public.news.page.section.title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t('public.news.page.section.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {sections.map((section) => (
            <Link
              key={section.path}
              to={section.path}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="absolute inset-0">
                <img
                  src={section.image}
                  alt={t(section.titleKey)}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${section.color} opacity-90 group-hover:opacity-80 transition-opacity`}
                ></div>
              </div>

              <div className="relative p-8 h-80 flex flex-col justify-between text-white">
                <div>
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <i className={`${section.icon} text-4xl`}></i>
                  </div>

                  <h3 className="text-2xl font-bold mb-3">{t(section.titleKey)}</h3>

                  <p className="text-white/90 text-sm leading-relaxed">{t(section.descriptionKey)}</p>
                </div>

                <div className="flex items-center text-sm font-semibold group-hover:translate-x-2 transition-transform">
                  {t('public.common.discover')}
                  <i className="ri-arrow-right-line ml-2"></i>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ActualitesPage;
