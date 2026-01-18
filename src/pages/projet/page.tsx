import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { projectsApi } from '../../lib/api/projects';
import type { Project } from '../../lib/api/types';

const ProjectDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      navigate('/engagement/projets');
      return;
    }
    loadProject();
  }, [id, navigate]);

  const loadProject = async () => {
    try {
      setLoading(true);
      const response = await projectsApi.getProject(id!);
      setProject(response.data);
    } catch (err) {
      console.error('Error loading project:', err);
      setError('Projet introuvable');
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
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex items-center justify-center">
            <div className="text-gray-600">Chargement du projet...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="text-red-600 mb-4">{error}</div>
            <button
              onClick={() => navigate('/engagement/projets')}
              className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Retour aux projets
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-emerald-900 to-emerald-700 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url(${project.imageUrl || '/placeholder-project.jpg'})`,
            filter: 'brightness(0.3)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/80 to-emerald-700/80" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 h-full flex items-center">
          <div>
            <button
              onClick={() => navigate('/engagement/projets')}
              className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
            >
              <i className="ri-arrow-left-line mr-2"></i>
              Retour aux projets
            </button>
            
            <div className="flex items-center gap-3 mb-4">
              <span className={`px-4 py-2 rounded-full text-sm font-bold ${statutColors[project.status]}`}>
                {project.status}
              </span>
              <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-bold text-white border border-white/20">
                {project.type}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {project.title}
            </h1>
            
            <div className="flex items-center text-white/90 text-lg">
              <i className="ri-map-pin-line mr-2"></i>
              <span>{project.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Description du Projet</h2>
              <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
                {project.detailedDescription || project.description}
              </p>
            </div>

            {project.objectives && project.objectives.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Objectifs</h2>
                <ul className="space-y-4">
                  {project.objectives.map((objective, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center mt-1 mr-4">
                        <i className="ri-check-line text-white text-sm"></i>
                      </div>
                      <span className="text-gray-700 leading-relaxed">{objective}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {project.partners && project.partners.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Partenaires</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.partners.map((partner, index) => (
                    <div key={index} className="flex items-center p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                      <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center mr-4">
                        <i className="ri-building-line text-white"></i>
                      </div>
                      <span className="font-medium text-gray-900">{partner}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Progression</h3>
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Avancement</span>
                  <span className="text-lg font-bold text-emerald-600">{project.progress}%</span>
                </div>
                <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-600 rounded-full transition-all"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Projet {project.progress < 100 ? 'en cours' : 'terminé'}
              </p>
            </div>

            {/* Key Numbers */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Chiffres Clés</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
                  <span className="text-gray-600">Budget Total</span>
                  <span className="font-bold text-gray-900">{project.budget}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
                  <span className="text-gray-600">Fonds Collectés</span>
                  <span className="font-bold text-emerald-600">{project.fundsRaised}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
                  <span className="text-gray-600">Bénéficiaires</span>
                  <span className="font-bold text-gray-900">{project.beneficiaries}</span>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Calendrier</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-emerald-600 rounded-full mr-3"></div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">Début</div>
                    <div className="text-sm text-gray-600">{formatDate(project.startDate)}</div>
                  </div>
                </div>
                {project.endDate && (
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-gray-400 rounded-full mr-3"></div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">Fin prévue</div>
                      <div className="text-sm text-gray-600">{formatDate(project.endDate)}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Contact */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Contact</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <i className="ri-user-line text-emerald-600 mr-3"></i>
                  <span className="text-gray-700">{project.contactPerson}</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-mail-line text-emerald-600 mr-3"></i>
                  <a 
                    href={`mailto:${project.contactEmail}`}
                    className="text-emerald-600 hover:text-emerald-700 transition-colors"
                  >
                    {project.contactEmail}
                  </a>
                </div>
                {project.website && (
                  <div className="flex items-center">
                    <i className="ri-global-line text-emerald-600 mr-3"></i>
                    <a 
                      href={project.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-600 hover:text-emerald-700 transition-colors"
                    >
                      Site web
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Action Button */}
            <button className="w-full px-6 py-4 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-all shadow-lg">
              <i className="ri-hand-coin-line mr-2"></i>
              Contribuer au Projet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;