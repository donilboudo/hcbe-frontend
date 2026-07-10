import { useTranslation } from 'react-i18next';

const ServicesHero = () => {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://readdy.ai/api/search-image?query=Modern%20professional%20services%20concept%20with%20abstract%20geometric%20shapes%20in%20green%20yellow%20red%20colors%2C%20representing%20community%20support%20and%20assistance%2C%20minimalist%20design%20with%20flowing%20lines%20and%20helpful%20symbols%2C%20warm%20lighting%20creating%20sense%20of%20trust%20and%20reliability&width=1920&height=800&seq=services-hero-001&orientation=landscape')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <div className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm sm:mb-6">
          <i className="ri-service-line shrink-0 text-white" aria-hidden="true"></i>
          <span className="text-sm font-semibold text-white">{t('public.services.hero.badge')}</span>
        </div>
        <h1 className="mx-auto max-w-4xl text-balance break-words text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
          {t('public.services.hero.title')}
        </h1>
        <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-white/90 sm:mt-6 sm:text-lg md:text-xl">
          {t('public.services.hero.subtitle')}
        </p>
      </div>
    </section>
  );
};

export default ServicesHero;
