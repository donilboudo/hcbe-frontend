import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { projectsApi } from '../../../lib/api/projects';
import type { Project } from '../../../lib/api/types';

const ProjetsSection = () => {
  const [projets, setProjets] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const response = await projectsApi.getProjects();
      setProjets(response.data);
    } catch (err) {
      console.error('Error loading projects:', err);
      setError('Erreur lors du chargement des projets');
    } finally {
      setLoading(false);
    }
  };

  const statutColors: { [key: string]: string } = {
    'En cours': 'bg-amber-50 text-amber-700 border border-amber-200',
    'Actif': 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    'Planification': 'bg-gray-100 text-gray-700 border border-gray-300',
    'Terminé': 'bg-blue-50 text-blue-700 border border-blue-200',
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('fr-FR', { 
      year: 'numeric', 
      month: '2-digit' 
    });
  };

  if (loading) {
    return (
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            {[1, 2].map((item) => (
              <div key={item} className="rounded-[2rem] border border-gray-200 bg-gray-50 p-7">
                <div className="h-52 animate-pulse rounded-3xl bg-gray-200" />
                <div className="mt-6 h-5 w-2/3 animate-pulse rounded-full bg-gray-200" />
                <div className="mt-4 h-4 w-full animate-pulse rounded-full bg-gray-200" />
                <div className="mt-2 h-4 w-4/5 animate-pulse rounded-full bg-gray-200" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="rounded-[2rem] border border-red-200 bg-red-50 p-8 text-red-800">{error}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
              <i className="ri-lightbulb-line" aria-hidden="true"></i>
              Projets actifs
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-gray-950 md:text-5xl">
              Projets communautaires
            </h2>
          </div>
          <p className="text-lg leading-8 text-gray-600">
            Découvrez nos initiatives de développement au Burkina Faso et au Canada
          </p>
        </div>

        <div className="grid gap-8">
          {projets.map((projet) => (
            <article
              key={projet.id}
              className="overflow-hidden rounded-[2rem] border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl"
            >
              <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
                <div className="relative min-h-80 bg-gradient-to-br from-emerald-800 via-emerald-700 to-slate-900">
                  {projet.imageUrl ? (
                    <img
                      src={projet.imageUrl}
                      alt={projet.title}
                      className="h-full w-full object-cover object-top"
                    />
                  ) : (
                    <div className="flex h-full min-h-80 items-center justify-center p-10 text-white">
                      <div>
                        <i className="ri-building-4-line text-6xl text-white/80" aria-hidden="true"></i>
                        <p className="mt-5 max-w-sm text-2xl font-bold">{projet.title}</p>
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                  <div className="absolute left-5 top-5 flex flex-wrap gap-2">
                    <span className={`px-4 py-2 rounded-full text-sm font-bold ${statutColors[projet.status]}`}>
                      {projet.status}
                    </span>
                    <span className="rounded-full border border-white/20 bg-white/90 px-4 py-2 text-sm font-bold text-gray-900 backdrop-blur-sm">
                      {projet.type}
                    </span>
                  </div>
                </div>

                <div className="p-7 lg:p-10">
                  <h3 className="text-3xl font-bold text-gray-950">{projet.title}</h3>
                  <div className="mt-3 flex items-center text-sm text-gray-600">
                    <i className="ri-map-pin-line mr-2 text-emerald-700" aria-hidden="true"></i>
                    <span>{projet.location}</span>
                  </div>

                  <p className="mt-6 leading-7 text-gray-700">{projet.description}</p>

                  <div className="my-7">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-700">Progression</span>
                      <span className="text-sm font-bold text-emerald-700">{projet.progress}%</span>
                    </div>
                    <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200">
                      <div
                        className="h-full rounded-full bg-emerald-700 transition-all"
                        style={{ width: `${projet.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="mb-6 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                      <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500">Budget</div>
                      <div className="text-lg font-bold text-gray-950">{projet.budget}</div>
                    </div>
                    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                      <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500">Collecté</div>
                      <div className="text-lg font-bold text-emerald-700">{projet.fundsRaised}</div>
                    </div>
                    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                      <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500">Bénéficiaires</div>
                      <div className="text-lg font-bold text-gray-950">{projet.beneficiaries}</div>
                    </div>
                    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                      <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500">Période</div>
                      <div className="text-sm font-bold text-gray-950">
                        {formatDate(projet.startDate)} - {projet.endDate ? formatDate(projet.endDate) : 'En continu'}
                      </div>
                    </div>
                  </div>

                  {projet.partners.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-700 mb-3">Partenaires</h4>
                      <div className="flex flex-wrap gap-2">
                        {projet.partners.map((partenaire, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-medium border border-emerald-200"
                          >
                            {partenaire}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <Link to="/contact" className="flex-1 rounded-full bg-emerald-700 px-6 py-3 text-center font-semibold text-white transition hover:bg-emerald-800">
                      <i className="ri-hand-coin-line mr-2"></i>
                      Contribuer
                    </Link>
                    <Link
                      to={`/projet/${projet.id}`}
                      className="inline-flex items-center rounded-full bg-gray-100 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-200"
                    >
                      <i className="ri-information-line mr-2"></i>
                      Détails
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjetsSection;
