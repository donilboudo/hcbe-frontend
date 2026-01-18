import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { projectsApi } from '../../../lib/api/projects';
import type { Project } from '../../../lib/api/types';

const AdminProjectsList = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await projectsApi.getProjectsForAdmin();
      setProjects(response.data);
    } catch (err) {
      console.error('Error loading projects:', err);
      setError('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      await projectsApi.deleteProject(id);
      setProjects(projects.filter(p => p.id !== id));
    } catch (err) {
      console.error('Error deleting project:', err);
      setError('Failed to delete project');
    }
  };

  const filteredProjects = projects.filter(project => {
    if (statusFilter !== 'all' && project.status !== statusFilter) return false;
    if (typeFilter !== 'all' && project.type !== typeFilter) return false;
    return true;
  });

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
        <div className="text-gray-600">Loading projects...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="text-red-600">{error}</div>
        <button
          onClick={loadProjects}
          className="mt-2 text-red-600 hover:text-red-800 underline"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
          <p className="text-gray-600">Manage community projects and initiatives</p>
        </div>
        <Link
          to="/admin/projects/create"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <i className="ri-add-line mr-2"></i>
          Add Project
        </Link>
      </div>

      {/* Filters */}
      <div className="flex gap-4 items-center">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Status</option>
          <option value="En cours">En cours</option>
          <option value="Actif">Actif</option>
          <option value="Planification">Planification</option>
          <option value="Terminé">Terminé</option>
        </select>

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Types</option>
          <option value="Développement au Burkina">Développement au Burkina</option>
          <option value="Initiative Locale">Initiative Locale</option>
        </select>

        <div className="ml-auto text-sm text-gray-600">
          {filteredProjects.length} of {projects.length} projects
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Project
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Progress
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Budget
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredProjects.map((project) => (
              <tr key={project.id} className={!project.isActive ? 'opacity-50' : ''}>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    {project.imageUrl && (
                      <img 
                        src={project.imageUrl} 
                        alt={project.title}
                        className="w-12 h-12 rounded-lg object-cover mr-4"
                      />
                    )}
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {project.title}
                      </div>
                      <div className="text-sm text-gray-500">
                        📍 {project.location}
                      </div>
                      <div className="text-xs text-gray-400">
                        🎯 {project.beneficiaries}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusBadgeColor(project.status)}`}>
                    {project.status}
                  </span>
                  {!project.isActive && (
                    <span className="block text-xs text-red-500 mt-1">Inactive</span>
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {project.type}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="flex-1">
                      <div className="text-xs text-gray-600 mb-1">{project.progress}%</div>
                      <div className="w-16 h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-2 bg-emerald-600 rounded-full transition-all"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{project.budget}</div>
                  <div className="text-xs text-emerald-600">{project.fundsRaised} raised</div>
                </td>
                <td className="px-6 py-4 text-sm font-medium">
                  <div className="flex space-x-2">
                    <Link
                      to={`/admin/projects/${project.id}`}
                      className="text-blue-600 hover:text-blue-900"
                      title="View"
                    >
                      <i className="ri-eye-line"></i>
                    </Link>
                    <Link
                      to={`/admin/projects/${project.id}/edit`}
                      className="text-emerald-600 hover:text-emerald-900"
                      title="Edit"
                    >
                      <i className="ri-edit-line"></i>
                    </Link>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="text-red-600 hover:text-red-900"
                      title="Delete"
                    >
                      <i className="ri-delete-bin-line"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">
              <i className="ri-folder-open-line text-4xl"></i>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
            <p className="text-gray-600 mb-4">
              {statusFilter !== 'all' || typeFilter !== 'all' 
                ? 'Try adjusting your filters.' 
                : 'Get started by creating a new project.'
              }
            </p>
            {statusFilter === 'all' && typeFilter === 'all' && (
              <Link
                to="/admin/projects/create"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create your first project
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProjectsList;