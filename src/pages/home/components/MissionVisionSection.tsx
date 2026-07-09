import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const MissionVisionSection = () => {
  const { t } = useTranslation();

  const priorities = [
    {
      icon: 'ri-hand-heart-line',
      titleKey: 'public.home.mission.welcome.title',
      descriptionKey: 'public.home.mission.welcome.description',
      link: '/services',
      linkKey: 'public.home.mission.welcome.link',
    },
    {
      icon: 'ri-team-line',
      titleKey: 'public.home.mission.connect.title',
      descriptionKey: 'public.home.mission.connect.description',
      link: '/engagement/annuaire',
      linkKey: 'public.home.mission.connect.link',
    },
    {
      icon: 'ri-megaphone-line',
      titleKey: 'public.home.mission.represent.title',
      descriptionKey: 'public.home.mission.represent.description',
      link: '/contact',
      linkKey: 'public.home.mission.represent.link',
    },
  ];

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
              <i className="ri-leaf-line" aria-hidden="true"></i>
              {t('public.home.mission.badge')}
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-gray-950 md:text-5xl">
              {t('public.home.mission.title')}
            </h2>
          </div>

          <p className="text-lg leading-8 text-gray-600">{t('public.home.mission.subtitle')}</p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {priorities.map((priority) => (
            <article
              key={priority.titleKey}
              className="group rounded-[1.75rem] border border-gray-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-3xl text-emerald-700">
                <i className={priority.icon} aria-hidden="true"></i>
              </div>
              <h3 className="mt-7 text-2xl font-bold text-gray-950">{t(priority.titleKey)}</h3>
              <p className="mt-4 min-h-24 text-base leading-7 text-gray-600">
                {t(priority.descriptionKey)}
              </p>
              <Link
                to={priority.link}
                className="mt-6 inline-flex items-center font-semibold text-emerald-700 transition group-hover:text-emerald-800"
              >
                {t(priority.linkKey)}
                <i
                  className="ri-arrow-right-line ml-2 transition group-hover:translate-x-1"
                  aria-hidden="true"
                ></i>
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-16 overflow-hidden rounded-[2rem] bg-gray-950 text-white">
          <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
            <div className="bg-gradient-to-br from-emerald-700 to-emerald-950 p-8 md:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-100">
                {t('public.home.mission.compass.label')}
              </p>
              <h3 className="mt-4 text-3xl font-bold">{t('public.home.mission.compass.title')}</h3>
            </div>
            <div className="p-8 md:p-10">
              <p className="text-lg leading-8 text-gray-200">{t('public.home.mission.compass.text')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVisionSection;
