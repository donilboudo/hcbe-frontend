import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import zone1DelegatePhoto from '../../../assets/delegates/zone1-delegate.png';
import zone1DeputyPhoto from '../../../assets/delegates/zone1-deputy.png';
import zone2DelegatePhoto from '../../../assets/delegates/zone2-delegate.png';
import zone2DeputyPhoto from '../../../assets/delegates/zone2-deputy.png';

const ZonesSection = () => {
  const { t, i18n } = useTranslation();
  const isEnglish = i18n.language.startsWith('en');

  const zones = [
    {
      name: 'Zone 1',
      welcomeKey: 'public.home.zones.zone1.welcome',
      delegate: {
        name: 'Mâ Ouédraogo Diallo',
        photo: zone1DelegatePhoto,
      },
      deputy: {
        name: 'Ismaël Ratouissanmda Zeba',
        photo: zone1DeputyPhoto,
      },
      accent: 'from-emerald-600 to-emerald-800',
      regions: isEnglish
        ? ['Ontario', 'Manitoba', 'Saskatchewan', 'Alberta', 'British Columbia', 'Northwest Territories']
        : ['Ontario', 'Manitoba', 'Saskatchewan', 'Alberta', 'Colombie-Britannique', 'Territoires du Nord'],
    },
    {
      name: 'Zone 2',
      welcomeKey: 'public.home.zones.zone2.welcome',
      delegate: {
        name: 'Aziz Ismaël Daboné',
        photo: zone2DelegatePhoto,
      },
      deputy: {
        name: 'Ahmed Arnaud Dao',
        photo: zone2DeputyPhoto,
      },
      accent: 'from-amber-500 to-orange-600',
      regions: isEnglish
        ? ['Quebec', 'New Brunswick', 'Nova Scotia', 'Prince Edward Island', 'Newfoundland and Labrador']
        : ['Québec', 'Nouveau-Brunswick', 'Nouvelle-Écosse', 'Île-du-Prince-Édouard', 'Terre-Neuve-et-Labrador'],
    },
  ];

  return (
    <section className="bg-gray-50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-emerald-700 shadow-sm">
              <i className="ri-map-pin-line" aria-hidden="true"></i>
              {t('public.home.zones.badge')}
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-gray-950 md:text-5xl">
              {t('public.home.zones.title')}
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">{t('public.home.zones.subtitle')}</p>
            <Link
              to="/contact"
              className="mt-8 inline-flex items-center rounded-full bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800"
            >
              {t('public.home.zones.cta')}
              <i className="ri-arrow-right-line ml-2" aria-hidden="true"></i>
            </Link>
          </div>

          <div className="grid gap-6">
            {zones.map((zone) => (
              <article
                key={zone.name}
                className="overflow-hidden rounded-[2rem] border border-gray-200 bg-white shadow-sm"
              >
                <div className={`bg-gradient-to-r ${zone.accent} p-7 text-white`}>
                  <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm font-medium text-white/75">{t('public.home.zones.district')}</p>
                      <h3 className="mt-1 text-3xl font-bold">{zone.name}</h3>
                    </div>
                    <div className="rounded-2xl bg-white/15 px-4 py-3 text-sm backdrop-blur">
                      {t('public.home.zones.territories', { count: zone.regions.length })}
                    </div>
                  </div>
                </div>

                <div className="grid gap-8 p-7 lg:grid-cols-[1.15fr_0.85fr]">
                  <div className="space-y-6">
                    <div className="flex gap-4 sm:gap-6">
                      <img
                        src={zone.delegate.photo}
                        alt={zone.delegate.name}
                        className="h-32 w-32 flex-shrink-0 rounded-2xl object-cover object-top shadow-sm sm:h-40 sm:w-40"
                      />
                      <div className="min-w-0 self-center">
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gray-500">
                          {t('public.home.zones.representation')}
                        </p>
                        <h4 className="mt-2 text-xl font-bold text-gray-950 sm:text-2xl">
                          {zone.delegate.name}
                        </h4>
                        <p className="mt-1 font-semibold text-emerald-700">
                          {t('public.home.zones.delegate')}
                        </p>
                      </div>
                    </div>

                    <blockquote className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
                        {t('public.home.zones.welcomeLabel')}
                      </p>
                      <p className="mt-3 text-sm leading-7 text-gray-700 sm:text-base sm:leading-7">
                        {t(zone.welcomeKey)}
                      </p>
                    </blockquote>

                    <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-gray-50 p-4 sm:gap-5 sm:p-5">
                      <img
                        src={zone.deputy.photo}
                        alt={zone.deputy.name}
                        className="h-24 w-24 flex-shrink-0 rounded-2xl object-cover object-top sm:h-28 sm:w-28"
                      />
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-500">
                          {t('public.home.zones.deputy')}
                        </p>
                        <p className="mt-0.5 text-base font-bold text-gray-950 sm:text-lg">{zone.deputy.name}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h5 className="mb-4 flex items-center font-bold text-gray-950">
                      <i className="ri-map-pin-2-fill mr-2 text-emerald-700" aria-hidden="true"></i>
                      {t('public.home.zones.regions')}
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {zone.regions.map((region) => (
                        <div
                          key={region}
                          className="rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700"
                        >
                          {region}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ZonesSection;
