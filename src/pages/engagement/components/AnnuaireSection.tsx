import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { associationsApi } from '../../../lib/api/associations';
import type { Association } from '../../../lib/api/types';
import associationDefaultImage from '../../../assets/association-default.jpg';

const AnnuaireSection = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('all');
  const [associations, setAssociations] = useState<Association[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [brokenImages, setBrokenImages] = useState<Record<string, boolean>>({});

  useEffect(() => {
    loadAssociations();
  }, []);

  const loadAssociations = async () => {
    try {
      setIsLoading(true);
      const response = await associationsApi.getAssociations();
      if (response.success && response.data) {
        setAssociations(response.data);
      } else {
        setError(t('public.engagement.annuaire.errorLoad'));
      }
    } catch (err) {
      console.error('Error loading associations:', err);
      setError(t('public.engagement.annuaire.errorLoad'));
    } finally {
      setIsLoading(false);
    }
  };

  const provinces = [
    'all',
    ...Array.from(new Set(associations.map((association) => association.province))).sort(),
  ];

  const filteredAssociations = associations.filter((assoc) => {
    const haystack = [
      assoc.name,
      assoc.city,
      assoc.province,
      ...assoc.domains,
    ]
      .join(' ')
      .toLowerCase();
    const matchesSearch = haystack.includes(searchTerm.toLowerCase());
    const matchesProvince = selectedProvince === 'all' || assoc.province === selectedProvince;
    return matchesSearch && matchesProvince;
  });

  const getImageSrc = (assoc: Association) => {
    if (!assoc.imageUrl || brokenImages[assoc.id]) {
      return associationDefaultImage;
    }
    return assoc.imageUrl;
  };

  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center space-x-2 rounded-full bg-emerald-50 px-4 py-2">
            <i className="ri-building-line text-emerald-600" aria-hidden="true"></i>
            <span className="text-sm font-semibold text-emerald-600">
              {t('public.engagement.annuaire.badge')}
            </span>
          </div>
          <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
            {t('public.engagement.annuaire.title')}
          </h2>
          <p className="mx-auto mb-8 max-w-3xl text-lg text-gray-600">
            {t('public.engagement.annuaire.subtitle')}
          </p>

          <div className="mx-auto flex max-w-4xl flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-lg text-gray-400" aria-hidden="true"></i>
              <input
                type="text"
                placeholder={t('public.engagement.annuaire.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border border-gray-300 py-3 pl-12 pr-4 text-sm focus:border-transparent focus:ring-2 focus:ring-emerald-600"
              />
            </div>
            <select
              value={selectedProvince}
              onChange={(e) => setSelectedProvince(e.target.value)}
              className="cursor-pointer rounded-lg border border-gray-300 px-6 py-3 text-sm font-medium focus:border-transparent focus:ring-2 focus:ring-emerald-600"
            >
              {provinces.map((prov) => (
                <option key={prov} value={prov}>
                  {prov === 'all' ? t('public.engagement.annuaire.filterAllProvinces') : prov}
                </option>
              ))}
            </select>
          </div>
        </div>

        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-emerald-600" />
          </div>
        )}

        {error && (
          <div className="py-12 text-center">
            <div className="inline-block rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-800">
              {error}
            </div>
          </div>
        )}

        {!isLoading && !error && filteredAssociations.length === 0 && (
          <div className="py-12 text-center">
            <i className="ri-building-line text-5xl text-gray-300" aria-hidden="true"></i>
            <h3 className="mt-4 text-lg font-medium text-gray-900">
              {t('public.engagement.annuaire.emptyTitle')}
            </h3>
            <p className="mt-2 text-gray-500">
              {selectedProvince === 'all'
                ? t('public.engagement.annuaire.emptyAll')
                : t('public.engagement.annuaire.emptyFilter')}
            </p>
          </div>
        )}

        {!isLoading && !error && filteredAssociations.length > 0 && (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredAssociations.map((assoc) => {
              const imageSrc = getImageSrc(assoc);
              const hasContactEmail = Boolean(assoc.contact?.trim());

              return (
                <article
                  key={assoc.id}
                  className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg transition-all hover:shadow-xl"
                >
                  <div className="relative h-56 w-full bg-gray-100">
                    <img
                      src={imageSrc}
                      alt={assoc.name}
                      className="h-full w-full object-cover object-center"
                      onError={() =>
                        setBrokenImages((prev) => ({
                          ...prev,
                          [assoc.id]: true,
                        }))
                      }
                    />
                    <div className="absolute left-4 top-4">
                      <span className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-bold text-white">
                        {assoc.province}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="mb-2 text-xl font-bold text-gray-900">{assoc.name}</h3>
                    <div className="mb-4 flex items-center text-sm text-gray-600">
                      <i className="ri-map-pin-line mr-2 text-emerald-600" aria-hidden="true"></i>
                      <span>
                        {assoc.city}, {assoc.province}
                      </span>
                    </div>

                    {assoc.description?.trim() && (
                      <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-gray-600">
                        {assoc.description}
                      </p>
                    )}

                    {assoc.domains.length > 0 && (
                      <div className="mb-4 flex flex-wrap gap-2">
                        {assoc.domains.map((domaine) => (
                          <span
                            key={domaine}
                            className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
                          >
                            {domaine}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="mb-6 space-y-2 text-sm">
                      {assoc.president?.trim() && (
                        <div className="flex items-center text-gray-600">
                          <i className="ri-user-line mr-2 flex h-5 w-5 items-center justify-center text-emerald-600" aria-hidden="true"></i>
                          <span>{assoc.president}</span>
                        </div>
                      )}
                      {assoc.memberCount?.trim() && (
                        <div className="flex items-center text-gray-600">
                          <i className="ri-team-line mr-2 flex h-5 w-5 items-center justify-center text-emerald-600" aria-hidden="true"></i>
                          <span>
                            {t('public.engagement.annuaire.members', { count: assoc.memberCount })}
                          </span>
                        </div>
                      )}
                      {assoc.foundedYear != null && (
                        <div className="flex items-center text-gray-600">
                          <i className="ri-calendar-line mr-2 flex h-5 w-5 items-center justify-center text-emerald-600" aria-hidden="true"></i>
                          <span>
                            {t('public.engagement.annuaire.founded', { year: assoc.foundedYear })}
                          </span>
                        </div>
                      )}
                    </div>

                    {hasContactEmail && (
                      <a
                        href={`mailto:${assoc.contact}`}
                        className="inline-flex w-full items-center justify-center rounded-lg bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
                      >
                        <i className="ri-mail-line mr-2" aria-hidden="true"></i>
                        {t('public.engagement.annuaire.contact')}
                      </a>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default AnnuaireSection;
