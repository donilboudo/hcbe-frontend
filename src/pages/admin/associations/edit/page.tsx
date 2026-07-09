import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { associationsApi } from '../../../../lib/api/associations';
import type { Association, UpdateAssociationRequest } from '../../../../lib/api/types';

export const EditAssociationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [association, setAssociation] = useState<Association | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<UpdateAssociationRequest>({});
  const [domainInput, setDomainInput] = useState('');

  const provinces = [
    'Alberta',
    'Colombie-Britannique', 
    'Manitoba',
    'Nouveau-Brunswick',
    'Terre-Neuve-et-Labrador',
    'Territoires du Nord-Ouest',
    'Nouvelle-Écosse',
    'Nunavut',
    'Ontario',
    'Île-du-Prince-Édouard',
    'Québec',
    'Saskatchewan',
    'Yukon'
  ];

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
        const assoc = response.data;
        setAssociation(assoc);
        setFormData({
          name: assoc.name,
          description: assoc.description || '',
          province: assoc.province,
          city: assoc.city,
          contact: assoc.contact || '',
          phone: assoc.phone || '',
          president: assoc.president || '',
          memberCount: assoc.memberCount || '',
          foundedYear: assoc.foundedYear,
          imageUrl: assoc.imageUrl || '',
          website: assoc.website || '',
          domains: [...assoc.domains],
          isActive: assoc.isActive
        });
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' 
        ? (e.target as HTMLInputElement).checked
        : name === 'foundedYear' 
          ? (value ? parseInt(value) : undefined) 
          : value
    }));
  };

  const handleAddDomain = () => {
    if (domainInput.trim() && formData.domains && !formData.domains.includes(domainInput.trim())) {
      setFormData(prev => ({
        ...prev,
        domains: [...(prev.domains || []), domainInput.trim()]
      }));
      setDomainInput('');
    }
  };

  const handleRemoveDomain = (domain: string) => {
    setFormData(prev => ({
      ...prev,
      domains: (prev.domains || []).filter(d => d !== domain)
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.currentTarget.getAttribute('name') === 'domainInput') {
      e.preventDefault();
      handleAddDomain();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name?.trim() || !formData.province || !formData.city?.trim()) {
      setError('Please fill in all required fields (Name, Province, City)');
      return;
    }

    if (!formData.domains || formData.domains.length === 0) {
      setError('Please add at least one domain of activity');
      return;
    }

    if (!id) return;

    try {
      setIsSubmitting(true);
      setError('');
      
      const response = await associationsApi.updateAssociation(id, formData);
      if (response.success) {
        navigate(`/admin/associations/${id}`);
      } else {
        setError(response.errors?.join(', ') || 'Failed to update association');
      }
    } catch (error) {
      console.error('Error updating association:', error);
      setError('Error updating association');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (error && !association) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-12">
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg inline-block">
            {error}
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
      <div className="mb-6">
        <div className="flex items-center space-x-4 mb-4">
          <Link
            to={`/admin/associations/${id}`}
            className="text-gray-500 hover:text-gray-700"
          >
            <i className="ri-arrow-left-line text-xl"></i>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Edit Association</h1>
        </div>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Association Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name || ''}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="e.g., Association Yam Taaba"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description || ''}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Brief description of the association's mission and activities"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Province *
              </label>
              <select
                name="province"
                value={formData.province || ''}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="">Select a province</option>
                {provinces.map(province => (
                  <option key={province} value={province}>{province}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City *
              </label>
              <input
                type="text"
                name="city"
                value={formData.city || ''}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="e.g., Calgary"
              />
            </div>

            <div className="md:col-span-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive || false}
                  onChange={handleInputChange}
                  className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                />
                <span className="ml-2 text-sm text-gray-700">Association is active</span>
              </label>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Email
              </label>
              <input
                type="email"
                name="contact"
                value={formData.contact || ''}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="contact@association.ca"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone || ''}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="+1 (XXX) XXX-XXXX"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Website
              </label>
              <input
                type="url"
                name="website"
                value={formData.website || ''}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="https://www.association.ca"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Leadership & Members</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                President/Leader
              </label>
              <input
                type="text"
                name="president"
                value={formData.president || ''}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="e.g., M. Souleymane Ouédraogo"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Member Count
              </label>
              <input
                type="text"
                name="memberCount"
                value={formData.memberCount || ''}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="e.g., 85+ or 100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Founded Year
              </label>
              <input
                type="number"
                name="foundedYear"
                value={formData.foundedYear || ''}
                onChange={handleInputChange}
                min="1900"
                max={new Date().getFullYear()}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="e.g., 2015"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Domains of Activity *</h2>
          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                name="domainInput"
                value={domainInput}
                onChange={(e) => setDomainInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="e.g., Culture, Education, Social"
              />
              <button
                type="button"
                onClick={handleAddDomain}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
              >
                Add
              </button>
            </div>
            {formData.domains && formData.domains.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.domains.map((domain) => (
                  <span
                    key={domain}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-emerald-100 text-emerald-800"
                  >
                    {domain}
                    <button
                      type="button"
                      onClick={() => handleRemoveDomain(domain)}
                      className="ml-2 text-emerald-600 hover:text-emerald-800"
                    >
                      <i className="ri-close-line"></i>
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Image</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image URL
            </label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl || ''}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="https://example.com/image.jpg"
            />
            <p className="text-sm text-gray-500 mt-1">
              Optional: URL to an image representing the association
            </p>
            {formData.imageUrl && (
              <div className="mt-4">
                <img
                  src={formData.imageUrl}
                  alt="Preview"
                  className="h-32 w-32 object-cover rounded-lg border border-gray-300"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <Link
            to={`/admin/associations/${id}`}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};