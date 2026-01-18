import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { projectsApi } from '../../../../lib/api/projects';
import type { Project } from '../../../../lib/api/types';

const ViewProjectPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    if (id) {
      loadProject();
    }
  }, [id]);

  const loadProject = async () => {
    if (!id) return;
    
    try {
      setLoading(true);
      const response = await projectsApi.getProject(id);
      setProject(response.data);
    } catch (err: any) {
      console.error('Error loading project:', err);
      setError(err.message || 'Failed to load project');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!project || !id) return;
    
    if (!confirm(`Are you sure you want to delete "${project.title}"?`)) return;

    try {
      await projectsApi.deleteProject(id);
      navigate('/admin/projects');
    } catch (err: any) {
      console.error('Error deleting project:', err);
      setError(err.message || 'Failed to delete project');
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'En cours': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Actif': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Planification': return 'bg-gray-50 text-gray-700 border-gray-200';
      case 'Terminé': return 'bg-blue-50 text-blue-700 border-blue-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-600">Loading project...</div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="text-red-600">{error || 'Project not found'}</div>
        <button
          onClick={() => navigate('/admin/projects')}
          className="mt-2 text-red-600 hover:text-red-800 underline"
        >
          Back to Projects
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center space-x-4 mb-2">
            <h1 className="text-2xl font-bold text-gray-900">{project.title}</h1>
            <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full border ${getStatusBadgeColor(project.status)}`}>
              {project.status}
            </span>
            {!project.isActive && (
              <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-red-50 text-red-700 border-red-200">
                Inactive
              </span>
            )}
          </div>
          <p className="text-gray-600">📍 {project.location} • {project.type}</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => navigate('/admin/projects')}
            className="text-gray-600 hover:text-gray-800"
          >
            <i className="ri-arrow-left-line mr-2"></i>
            Back
          </button>
          <Link
            to={`/admin/projects/${project.id}/edit`}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
          >
            <i className="ri-edit-line mr-2"></i>
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            <i className="ri-delete-bin-line mr-2"></i>
            Delete
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="text-red-600">{error}</div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Project Image */}
        <div className="lg:col-span-1">
          {project.imageUrl ? (
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-64 object-cover rounded-lg border border-gray-200"
            />
          ) : (
            <div className="w-full h-64 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center">
              <div className="text-gray-400">
                <i className="ri-image-line text-4xl mb-2 block"></i>
                <div className="text-sm">No image</div>
              </div>
            </div>
          )}

          {/* Progress */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-gray-700">Progress</span>
              <span className="text-sm font-bold text-emerald-600">{project.progress}%</span>
            </div>
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-600 rounded-full transition-all"
                style={{ width: `${project.progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Project Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Description</h2>
            <p className="text-gray-700 leading-relaxed">{project.description}</p>
          </div>

          {/* Key Information */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Key Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-xs text-gray-600 mb-1">Budget Total</div>
                <div className="text-lg font-bold text-gray-900">{project.budget}</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-xs text-gray-600 mb-1">Fonds Collectés</div>
                <div className="text-lg font-bold text-emerald-600">{project.fundsRaised}</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-xs text-gray-600 mb-1">Bénéficiaires</div>
                <div className="text-lg font-bold text-gray-900">{project.beneficiaries}</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-xs text-gray-600 mb-1">Type</div>
                <div className="text-sm font-bold text-gray-900">{project.type}</div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          {(project.startDate || project.endDate) && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Timeline</h2>
              <div className="grid grid-cols-2 gap-4">
                {project.startDate && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-xs text-gray-600 mb-1">Date de début</div>
                    <div className="text-sm font-bold text-gray-900">{formatDate(project.startDate)}</div>
                  </div>
                )}
                {project.endDate && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-xs text-gray-600 mb-1">Date de fin</div>
                    <div className="text-sm font-bold text-gray-900">{formatDate(project.endDate)}</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Partners */}
          {project.partners.length > 0 && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Partenaires</h2>
              <div className="flex flex-wrap gap-2">
                {project.partners.map((partner, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium border border-emerald-200"
                  >
                    {partner}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Metadata */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Metadata</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Created:</span>
                <span className="ml-2 font-medium">{formatDate(project.createdAt)}</span>
              </div>
              <div>
                <span className="text-gray-600">Updated:</span>
                <span className="ml-2 font-medium">{formatDate(project.updatedAt)}</span>
              </div>
              <div>
                <span className="text-gray-600">Status:</span>
                <span className="ml-2 font-medium">{project.isActive ? 'Active' : 'Inactive'}</span>
              </div>
              <div>
                <span className="text-gray-600">Project ID:</span>
                <span className="ml-2 font-mono text-xs">{project.id}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProjectPage;