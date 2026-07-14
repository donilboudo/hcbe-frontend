import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { projectsApi } from '../../lib/api/projects';
import type { Project } from '../../lib/api/types';
import { localized } from '../../lib/i18n/localized';

const ProjectDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
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
      setError(t('public.engagement.projets.notFound'));
    } finally {
      setLoading(false);
    }
  };

  const statutColors: { [key: string]: string } = {
    'En cours': 'bg-amber-50 text-amber-700 border border-amber-200',
    Actif: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    Planification: 'bg-gray-100 text-gray-700 border border-gray-300',
    Terminé: 'bg-blue-50 text-blue-700 border border-blue-200',
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const locale = i18n.language.toLowerCase().startsWith('en') ? 'en-CA' : 'fr-CA';
    return new Date(dateString).toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const statusLabel = (status: string) =>
    t(`public.engagement.projets.status.${status}`, { defaultValue: status });
  const typeLabel = (type: string) =>
    t(`public.engagement.projets.type.${type}`, { defaultValue: type });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <div className="text-gray-600">{t('public.engagement.projets.loading')}</div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-4 text-red-600">{error}</div>
            <button
              onClick={() => navigate('/engagement/projets')}
              className="rounded-lg bg-emerald-600 px-6 py-3 text-white transition-colors hover:bg-emerald-700"
            >
              {t('public.engagement.projets.back')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const title = localized(project.title, project.titleEn, i18n.language);
  const description = localized(project.description, project.descriptionEn, i18n.language);
  const location = localized(project.location, project.locationEn, i18n.language);
  const beneficiaries = localized(project.beneficiaries, project.beneficiariesEn, i18n.language);

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
              {t('public.engagement.projets.back')}
            </button>
            
            <div className="flex items-center gap-3 mb-4">
              <span className={`px-4 py-2 rounded-full text-sm font-bold ${statutColors[project.status]}`}>
                {statusLabel(project.status)}
              </span>
              <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-bold text-white border border-white/20">
                {typeLabel(project.type)}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {title}
            </h1>
            
            <div className="flex items-center text-white/90 text-lg">
              <i className="ri-map-pin-line mr-2"></i>
              <span>{location}</span>
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
              <h2 className="mb-6 text-2xl font-bold text-gray-900">
                {t('public.engagement.projets.descriptionTitle')}
              </h2>
              <p className="whitespace-pre-line text-lg leading-relaxed text-gray-700">
                {description}
              </p>
            </div>

            {project.partners && project.partners.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="mb-6 text-2xl font-bold text-gray-900">
                  {t('public.engagement.projets.partners')}
                </h2>
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
              <h3 className="mb-4 text-lg font-bold text-gray-900">
                {t('public.engagement.projets.progress')}
              </h3>
              <div className="mb-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    {t('public.engagement.projets.progress')}
                  </span>
                  <span className="text-lg font-bold text-emerald-600">{project.progress}%</span>
                </div>
                <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-600 rounded-full transition-all"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Key Numbers */}
            <div className="rounded-2xl bg-white p-6 shadow-lg">
              <h3 className="mb-6 text-lg font-bold text-gray-900">
                {t('public.engagement.projets.keyFigures')}
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-gray-100 py-3 last:border-0">
                  <span className="text-gray-600">{t('public.engagement.projets.budget')}</span>
                  <span className="font-bold text-gray-900">{project.budget}</span>
                </div>
                <div className="flex items-center justify-between border-b border-gray-100 py-3 last:border-0">
                  <span className="text-gray-600">{t('public.engagement.projets.raised')}</span>
                  <span className="font-bold text-emerald-600">{project.fundsRaised}</span>
                </div>
                <div className="flex items-center justify-between border-b border-gray-100 py-3 last:border-0">
                  <span className="text-gray-600">{t('public.engagement.projets.beneficiaries')}</span>
                  <span className="font-bold text-gray-900">{beneficiaries}</span>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="rounded-2xl bg-white p-6 shadow-lg">
              <h3 className="mb-6 text-lg font-bold text-gray-900">
                {t('public.engagement.projets.timeline')}
              </h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="mr-3 h-3 w-3 rounded-full bg-emerald-600"></div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {t('public.engagement.projets.start')}
                    </div>
                    <div className="text-sm text-gray-600">{formatDate(project.startDate)}</div>
                  </div>
                </div>
                {project.endDate && (
                  <div className="flex items-center">
                    <div className="mr-3 h-3 w-3 rounded-full bg-gray-400"></div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {t('public.engagement.projets.end')}
                      </div>
                      <div className="text-sm text-gray-600">{formatDate(project.endDate)}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Button */}
            <button className="w-full rounded-xl bg-emerald-600 px-6 py-4 font-semibold text-white shadow-lg transition-all hover:bg-emerald-700">
              <i className="ri-hand-coin-line mr-2"></i>
              {t('public.engagement.projets.contributeCta')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;