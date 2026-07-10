import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { associationsApi } from '../../../../lib/api/associations';
import { AssociationForm, type AssociationFormValues } from '../AssociationForm';

export const CreateAssociationPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<AssociationFormValues>({
    name: '',
    description: '',
    province: '',
    city: '',
    contact: '',
    phone: '',
    president: '',
    memberCount: '',
    foundedYear: undefined,
    imageUrl: '',
    website: '',
    domains: [],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.province || !formData.city.trim()) {
      setError(t('admin.associations.errorRequired'));
      return;
    }

    if (formData.domains.length === 0) {
      setError(t('admin.associations.errorDomains'));
      return;
    }

    try {
      setIsSubmitting(true);
      setError('');

      const response = await associationsApi.createAssociation(formData);
      if (response.success) {
        navigate('/admin/associations');
      } else {
        setError(response.errors?.join(', ') || response.message || t('admin.associations.errorCreate'));
      }
    } catch (err) {
      console.error('Error creating association:', err);
      setError(t('admin.associations.errorCreate'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6">
        <div className="mb-4 flex items-center space-x-4">
          <Link to="/admin/associations" className="text-gray-500 hover:text-gray-700">
            <i className="ri-arrow-left-line text-xl" aria-hidden="true"></i>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">{t('admin.associations.createTitle')}</h1>
        </div>
      </div>

      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-800">{error}</div>
      )}

      <AssociationForm
        formData={formData}
        onChange={setFormData}
        onSubmit={handleSubmit}
        submitting={isSubmitting}
        submitLabel={t('admin.associations.create')}
        submittingLabel={t('admin.associations.creating')}
        onCancel={() => navigate('/admin/associations')}
      />
    </div>
  );
};
