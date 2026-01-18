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
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-gray-600">Chargement des projets...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-red-600">{error}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-emerald-50 px-4 py-2 rounded-full mb-4">
            <i className="ri-lightbulb-line text-emerald-600"></i>
            <span className="text-emerald-600 font-semibold text-sm">Nos Projets</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Projets Communautaires
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Découvrez nos initiatives de développement au Burkina Faso et au Canada
          </p>
        </div>

        <div className="space-y-8">
          {projets.map((projet) => (
            <div
              key={projet.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all border border-gray-200"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="relative h-80 lg:h-auto w-full">
                  <img
                    src={projet.imageUrl || '/placeholder-project.jpg'}
                    alt={projet.title}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className={`px-4 py-2 rounded-full text-sm font-bold ${statutColors[projet.status]}`}>
                      {projet.status}
                    </span>
                    <span className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-bold text-gray-900 border border-gray-200">
                      {projet.type}
                    </span>
                  </div>
                </div>

                <div className="p-8 lg:p-10">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{projet.title}</h3>
                  <div className="flex items-center text-gray-600 text-sm mb-6">
                    <i className="ri-map-pin-line mr-2 text-emerald-600"></i>
                    <span>{projet.location}</span>
                  </div>

                  <p className="text-gray-700 leading-relaxed mb-6">{projet.description}</p>

                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold text-gray-700">Progression</span>
                      <span className="text-sm font-bold text-emerald-600">{projet.progress}%</span>
                    </div>
                    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-600 rounded-full transition-all"
                        style={{ width: `${projet.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="text-xs text-gray-600 mb-1">Budget Total</div>
                      <div className="text-lg font-bold text-gray-900">{projet.budget}</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="text-xs text-gray-600 mb-1">Fonds Collectés</div>
                      <div className="text-lg font-bold text-emerald-600">{projet.fundsRaised}</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="text-xs text-gray-600 mb-1">Bénéficiaires</div>
                      <div className="text-lg font-bold text-gray-900">{projet.beneficiaries}</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="text-xs text-gray-600 mb-1">Période</div>
                      <div className="text-sm font-bold text-gray-900">
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
                    <button className="flex-1 px-6 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-all whitespace-nowrap cursor-pointer">
                      <i className="ri-hand-coin-line mr-2"></i>
                      Contribuer
                    </button>
                    <Link
                      to={`/projet/${projet.id}`}
                      className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors whitespace-nowrap cursor-pointer inline-flex items-center"
                    >
                      <i className="ri-information-line mr-2"></i>
                      Détails
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjetsSection;
