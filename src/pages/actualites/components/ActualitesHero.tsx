import { useTranslation } from 'react-i18next';

const ActualitesHero = () => {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="absolute inset-0">
        <img
          src="https://readdy.ai/api/search-image?query=Modern%20African%20community%20gathering%20in%20bright%20welcoming%20space%20with%20people%20connecting%20and%20sharing%20information%2C%20vibrant%20colorful%20cultural%20elements%20and%20contemporary%20design%2C%20natural%20daylight%20creating%20warm%20inviting%20atmosphere%2C%20simple%20clean%20background%20highlighting%20community%20engagement%20and%20communication&width=1920&height=800&seq=actualites-hero-002&orientation=landscape"
          alt={t('public.news.hero.imageAlt')}
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/50"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
        <div className="inline-block mb-6">
          <span className="px-6 py-3 bg-white/90 backdrop-blur-md border border-white/30 rounded-full text-gray-900 font-semibold text-sm">
            {t('public.news.hero.badge')}
          </span>
        </div>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
          {t('public.news.hero.title')}
        </h1>

        <p className="text-xl md:text-2xl text-white max-w-4xl mx-auto mb-12 leading-relaxed drop-shadow-md">
          {t('public.news.hero.subtitle')}
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="#agenda"
            className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl whitespace-nowrap cursor-pointer"
          >
            <i className="ri-calendar-event-line mr-2"></i>
            {t('public.news.hero.cta.events')}
          </a>
          <a
            href="#communiques"
            className="px-8 py-4 bg-white hover:bg-gray-100 text-gray-900 rounded-lg font-semibold transition-all shadow-lg whitespace-nowrap cursor-pointer"
          >
            <i className="ri-article-line mr-2"></i>
            {t('public.news.hero.cta.announcements')}
          </a>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};

export default ActualitesHero;
