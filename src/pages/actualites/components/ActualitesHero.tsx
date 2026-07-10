import { useTranslation } from 'react-i18next';

const ActualitesHero = () => {
  const { t } = useTranslation();

  return (
    <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 sm:min-h-[70vh]">
      <div className="absolute inset-0">
        <img
          src="https://readdy.ai/api/search-image?query=Modern%20African%20community%20gathering%20in%20bright%20welcoming%20space%20with%20people%20connecting%20and%20sharing%20information%2C%20vibrant%20colorful%20cultural%20elements%20and%20contemporary%20design%2C%20natural%20daylight%20creating%20warm%20inviting%20atmosphere%2C%20simple%20clean%20background%20highlighting%20community%20engagement%20and%20communication&width=1920&height=800&seq=actualites-hero-002&orientation=landscape"
          alt={t('public.news.hero.imageAlt')}
          className="h-full w-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/50"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
        <div className="mb-5 inline-block sm:mb-6">
          <span className="rounded-full border border-white/30 bg-white/90 px-5 py-2.5 text-sm font-semibold text-gray-900 backdrop-blur-md sm:px-6 sm:py-3">
            {t('public.news.hero.badge')}
          </span>
        </div>

        <h1 className="mx-auto mb-5 max-w-4xl text-balance break-words text-3xl font-bold leading-tight text-white drop-shadow-lg sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl">
          {t('public.news.hero.title')}
        </h1>

        <p className="mx-auto mb-8 max-w-3xl text-base leading-relaxed text-white drop-shadow-md sm:mb-12 sm:text-lg md:text-xl lg:text-2xl">
          {t('public.news.hero.subtitle')}
        </p>

        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
          <a
            href="#agenda"
            className="inline-flex items-center rounded-lg bg-emerald-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:bg-emerald-700 hover:shadow-xl sm:px-8 sm:py-4 sm:text-base"
          >
            <i className="ri-calendar-event-line mr-2" aria-hidden="true"></i>
            {t('public.news.hero.cta.events')}
          </a>
          <a
            href="#communiques"
            className="inline-flex items-center rounded-lg bg-white px-6 py-3.5 text-sm font-semibold text-gray-900 shadow-lg transition-all hover:bg-gray-100 sm:px-8 sm:py-4 sm:text-base"
          >
            <i className="ri-article-line mr-2" aria-hidden="true"></i>
            {t('public.news.hero.cta.announcements')}
          </a>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent sm:h-32"></div>
    </section>
  );
};

export default ActualitesHero;
