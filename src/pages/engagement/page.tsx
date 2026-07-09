import { useTranslation } from 'react-i18next';
import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';
import EngagementHero from './components/EngagementHero';
import { Link } from 'react-router-dom';

const EngagementPage = () => {
  const { t } = useTranslation();

  const engagementSections = [
    {
      titleKey: 'public.engagement.page.cards.associations.title',
      descriptionKey: 'public.engagement.page.cards.associations.description',
      statsKey: 'public.engagement.page.cards.associations.stats',
      featureKeys: [
        'public.engagement.page.cards.associations.features.search',
        'public.engagement.page.cards.associations.features.details',
        'public.engagement.page.cards.associations.features.contacts',
      ],
      icon: 'ri-group-line',
      colorClasses: {
        bg: 'bg-gradient-to-r from-emerald-500 to-emerald-600',
        text: 'text-emerald-600',
        textHover: 'group-hover:text-emerald-700',
      },
      link: '/engagement/annuaire',
    },
    {
      titleKey: 'public.engagement.page.cards.projects.title',
      descriptionKey: 'public.engagement.page.cards.projects.description',
      statsKey: 'public.engagement.page.cards.projects.stats',
      featureKeys: [
        'public.engagement.page.cards.projects.features.burkina',
        'public.engagement.page.cards.projects.features.local',
        'public.engagement.page.cards.projects.features.tracking',
      ],
      icon: 'ri-building-line',
      colorClasses: {
        bg: 'bg-gradient-to-r from-blue-500 to-blue-600',
        text: 'text-blue-600',
        textHover: 'group-hover:text-blue-700',
      },
      link: '/engagement/projets',
    },
    {
      titleKey: 'public.engagement.page.cards.consultations.title',
      descriptionKey: 'public.engagement.page.cards.consultations.description',
      statsKey: 'public.engagement.page.cards.consultations.stats',
      featureKeys: [
        'public.engagement.page.cards.consultations.features.surveys',
        'public.engagement.page.cards.consultations.features.public',
        'public.engagement.page.cards.consultations.features.feedback',
      ],
      icon: 'ri-chat-poll-line',
      colorClasses: {
        bg: 'bg-gradient-to-r from-purple-500 to-purple-600',
        text: 'text-purple-600',
        textHover: 'group-hover:text-purple-700',
      },
      link: '/engagement/consultations',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <EngagementHero />

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t('public.engagement.page.section.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('public.engagement.page.section.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {engagementSections.map((section) => (
              <div key={section.link} className="group relative">
                <Link
                  to={section.link}
                  className="block h-full bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1"
                >
                  <div className={`${section.colorClasses.bg} p-6 text-white`}>
                    <div className="flex items-center justify-between mb-4">
                      <i className={`${section.icon} text-3xl`}></i>
                      <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">
                        {t(section.statsKey)}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{t(section.titleKey)}</h3>
                  </div>

                  <div className="p-6">
                    <p className="text-gray-600 mb-6 leading-relaxed">{t(section.descriptionKey)}</p>

                    <ul className="space-y-2 mb-6">
                      {section.featureKeys.map((featureKey) => (
                        <li key={featureKey} className="flex items-center text-sm text-gray-700">
                          <i className="ri-check-line text-green-500 mr-2"></i>
                          {t(featureKey)}
                        </li>
                      ))}
                    </ul>

                    <div className="flex items-center justify-between">
                      <span
                        className={`${section.colorClasses.text} ${section.colorClasses.textHover} font-semibold transition-colors`}
                      >
                        {t('public.engagement.page.cards.explore')}
                      </span>
                      <i
                        className={`ri-arrow-right-line ${section.colorClasses.text} ${section.colorClasses.textHover} group-hover:translate-x-1 transition-all`}
                      ></i>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-emerald-600 to-emerald-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">{t('public.engagement.page.cta.title')}</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">{t('public.engagement.page.cta.subtitle')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4 bg-white text-emerald-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
            >
              <i className="ri-mail-line mr-2"></i>
              {t('public.engagement.page.cta.contact')}
            </Link>
            <Link
              to="/espace-membre"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
            >
              <i className="ri-user-line mr-2"></i>
              {t('public.engagement.page.cta.member')}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EngagementPage;
