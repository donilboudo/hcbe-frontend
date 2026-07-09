import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { associationsApi } from '../../../../lib/api/associations';
import type { Association } from '../../../../lib/api/types';

export const ViewAssociationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [association, setAssociation] = useState<Association | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      loadAssociation(id);
    }
  }, [id]);

  const loadAssociation = async (associationId: string) => {
    try {
      setIsLoading(true);
      setError('');
      const response = await associationsApi.getAssociationForAdmin(associationId);
      if (response.success && response.data) {
        setAssociation(response.data);
      } else {
        setError('Association not found');
      }
    } catch (error) {
      console.error('Error loading association:', error);
      setError('Error loading association');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!association || !confirm(`Are you sure you want to delete "${association.name}"?`)) {
      return;
    }

    try {
      const response = await associationsApi.deleteAssociation(association.id);
      if (response.success) {
        navigate('/admin/associations');
      } else {
        setError('Failed to delete association');
      }
    } catch (error) {
      console.error('Error deleting association:', error);
      setError('Error deleting association');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (error || !association) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-12">
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg inline-block">
            {error || 'Association not found'}
          </div>
          <div className="mt-4">
            <Link
              to="/admin/associations"
              className="text-emerald-600 hover:text-emerald-800"
            >
              ← Back to associations
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              to="/admin/associations"
              className="text-gray-500 hover:text-gray-700"
            >
              <i className="ri-arrow-left-line text-xl"></i>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{association.name}</h1>
              <p className="text-gray-500">{association.city}, {association.province}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Link
              to={`/admin/associations/${association.id}/edit`}
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
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="space-y-6">
        {/* Main Information */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6">
            <div className="flex items-start space-x-6">
              {association.imageUrl && (
                <div className="flex-shrink-0">
                  <img
                    src={association.imageUrl}
                    alt={association.name}
                    className="h-32 w-32 object-cover rounded-lg border border-gray-300"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              )}
              <div className="flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Basic Information</h3>
                    <dl className="space-y-1">
                      <div className="flex">
                        <dt className="text-sm font-medium text-gray-500 w-24">Status:</dt>
                        <dd className="text-sm text-gray-900">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            association.isActive
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {association.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </dd>
                      </div>
                      {association.foundedYear && (
                        <div className="flex">
                          <dt className="text-sm font-medium text-gray-500 w-24">Founded:</dt>
                          <dd className="text-sm text-gray-900">{association.foundedYear}</dd>
                        </div>
                      )}
                      {association.memberCount && (
                        <div className="flex">
                          <dt className="text-sm font-medium text-gray-500 w-24">Members:</dt>
                          <dd className="text-sm text-gray-900">{association.memberCount}</dd>
                        </div>
                      )}
                    </dl>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Leadership</h3>
                    <dl className="space-y-1">
                      {association.president && (
                        <div className="flex">
                          <dt className="text-sm font-medium text-gray-500 w-24">President:</dt>
                          <dd className="text-sm text-gray-900">{association.president}</dd>
                        </div>
                      )}
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            {association.description && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-700">{association.description}</p>
              </div>
            )}
          </div>
        </div>

        {/* Domains */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Domains of Activity</h3>
          <div className="flex flex-wrap gap-2">
            {association.domains.map((domain) => (
              <span
                key={domain}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-emerald-100 text-emerald-800"
              >
                {domain}
              </span>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Location</h4>
              <p className="text-gray-900">{association.city}, {association.province}</p>
            </div>
            {association.contact && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Email</h4>
                <a
                  href={`mailto:${association.contact}`}
                  className="text-emerald-600 hover:text-emerald-800"
                >
                  {association.contact}
                </a>
              </div>
            )}
            {association.phone && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Phone</h4>
                <a
                  href={`tel:${association.phone}`}
                  className="text-emerald-600 hover:text-emerald-800"
                >
                  {association.phone}
                </a>
              </div>
            )}
            {association.website && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Website</h4>
                <a
                  href={association.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 hover:text-emerald-800"
                >
                  {association.website}
                  <i className="ri-external-link-line ml-1"></i>
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Metadata */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">System Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-1">Association ID</h4>
              <p className="text-gray-600 font-mono text-xs">{association.id}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-1">Created</h4>
              <p className="text-gray-600">
                {new Date(association.createdAt).toLocaleDateString('en-CA', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-1">Last Updated</h4>
              <p className="text-gray-600">
                {new Date(association.updatedAt).toLocaleDateString('en-CA', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};