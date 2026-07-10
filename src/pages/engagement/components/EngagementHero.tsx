import { useTranslation } from 'react-i18next';

const EngagementHero = () => {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://readdy.ai/api/search-image?query=Community%20engagement%20and%20unity%20concept%20with%20diverse%20African%20people%20joining%20hands%20together%20in%20bright%20modern%20setting%2C%20professional%20collaborative%20atmosphere%20with%20simple%20clean%20background%20highlighting%20togetherness%20and%20purpose%2C%20natural%20daylight%20creating%20sense%20of%20solidarity%20and%20collaboration&width=1920&height=800&seq=engagement-hero-001&orientation=landscape')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <div className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm sm:mb-6">
          <i className="ri-community-line shrink-0 text-white" aria-hidden="true"></i>
          <span className="text-sm font-semibold text-white">{t('public.engagement.hero.badge')}</span>
        </div>
        <h1 className="mx-auto max-w-4xl text-balance break-words text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
          {t('public.engagement.hero.title')}
        </h1>
        <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-white/90 sm:mt-6 sm:text-lg md:text-xl">
          {t('public.engagement.hero.subtitle')}
        </p>
      </div>
    </section>
  );
};

export default EngagementHero;
