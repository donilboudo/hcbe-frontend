import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { associationsApi } from '../../../../lib/api/associations';
import type { Association } from '../../../../lib/api/types';
import { AssociationForm, type AssociationFormValues } from '../AssociationForm';

export const EditAssociationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [association, setAssociation] = useState<Association | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
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
    isActive: true,
  });

  useEffect(() => {
    if (!id) return;

    const loadAssociation = async () => {
      try {
        setIsLoading(true);
        setError('');
        const response = await associationsApi.getAssociationForAdmin(id);
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
            isActive: assoc.isActive,
          });
        } else {
          setError(t('admin.associations.errorNotFound'));
        }
      } catch (err) {
        console.error('Error loading association:', err);
        setError(t('admin.associations.errorLoad'));
      } finally {
        setIsLoading(false);
      }
    };

    loadAssociation();
  }, [id, t]);

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

    if (!id) return;

    try {
      setIsSubmitting(true);
      setError('');

      let imageUrl = formData.imageUrl || undefined;
      if (imageFile) {
        const imageResponse = await associationsApi.uploadImage(id, imageFile);
        if (!imageResponse.success || !imageResponse.data) {
          setError(imageResponse.message || t('admin.associations.errorUpload'));
          return;
        }
        imageUrl = imageResponse.data.url;
      }

      const response = await associationsApi.updateAssociation(id, {
        ...formData,
        imageUrl,
      });
      if (response.success) {
        navigate(`/admin/associations/${id}`);
      } else {
        setError(response.errors?.join(', ') || response.message || t('admin.associations.errorUpdate'));
      }
    } catch (err) {
      console.error('Error updating association:', err);
      setError(t('admin.associations.errorUpdate'));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-emerald-600" />
      </div>
    );
  }

  if (error && !association) {
    return (
      <div className="mx-auto max-w-4xl">
        <div className="py-12 text-center">
          <div className="inline-block rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-800">
            {error}
          </div>
          <div className="mt-4">
            <Link to="/admin/associations" className="text-emerald-600 hover:text-emerald-800">
              {t('admin.common.backToList')}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6">
        <div className="mb-4 flex items-center space-x-4">
          <Link to={`/admin/associations/${id}`} className="text-gray-500 hover:text-gray-700">
            <i className="ri-arrow-left-line text-xl" aria-hidden="true"></i>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">{t('admin.associations.editTitle')}</h1>
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
        submitLabel={t('admin.common.save')}
        submittingLabel={t('admin.associations.saving')}
        onCancel={() => navigate(`/admin/associations/${id}`)}
        showActiveToggle
        imageFile={imageFile}
        onImageFileChange={setImageFile}
      />
    </div>
  );
};
