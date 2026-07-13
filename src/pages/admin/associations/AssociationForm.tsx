import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const CANADA_PROVINCES = [
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
  'Yukon',
] as const;

export interface AssociationFormValues {
  name: string;
  description: string;
  province: string;
  city: string;
  contact: string;
  phone: string;
  president: string;
  memberCount: string;
  foundedYear?: number;
  imageUrl: string;
  website: string;
  domains: string[];
  isActive?: boolean;
}

interface AssociationFormProps {
  formData: AssociationFormValues;
  onChange: (data: AssociationFormValues) => void;
  onSubmit: (e: React.FormEvent) => void;
  submitting: boolean;
  submitLabel: string;
  submittingLabel: string;
  onCancel: () => void;
  showActiveToggle?: boolean;
}

export const AssociationForm: React.FC<AssociationFormProps> = ({
  formData,
  onChange,
  onSubmit,
  submitting,
  submitLabel,
  submittingLabel,
  onCancel,
  showActiveToggle = false,
}) => {
  const { t } = useTranslation();
  const [domainInput, setDomainInput] = useState('');

  const updateField = <K extends keyof AssociationFormValues>(
    field: K,
    value: AssociationFormValues[K],
  ) => {
    onChange({ ...formData, [field]: value });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      updateField('isActive', (e.target as HTMLInputElement).checked);
      return;
    }
    if (name === 'foundedYear') {
      updateField('foundedYear', value ? parseInt(value, 10) : undefined);
      return;
    }
    updateField(name as keyof AssociationFormValues, value as never);
  };

  const handleAddDomain = () => {
    const domain = domainInput.trim();
    if (!domain || formData.domains.includes(domain)) return;
    updateField('domains', [...formData.domains, domain]);
    setDomainInput('');
  };

  const handleRemoveDomain = (domain: string) => {
    updateField(
      'domains',
      formData.domains.filter((item) => item !== domain),
    );
  };

  const handleDomainKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddDomain();
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">{t('admin.associations.sectionBasic')}</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              {t('admin.associations.name')} *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
              placeholder={t('admin.associations.namePlaceholder')}
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              {t('admin.associations.description')}
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
              placeholder={t('admin.associations.descriptionPlaceholder')}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              {t('admin.associations.province')} *
            </label>
            <select
              name="province"
              value={formData.province}
              onChange={handleInputChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">{t('admin.associations.selectProvince')}</option>
              {CANADA_PROVINCES.map((province) => (
                <option key={province} value={province}>
                  {province}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              {t('admin.associations.city')} *
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
              placeholder={t('admin.associations.cityPlaceholder')}
            />
          </div>

          {showActiveToggle && (
            <div className="md:col-span-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive ?? false}
                  onChange={handleInputChange}
                  className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                />
                <span className="ml-2 text-sm text-gray-700">{t('admin.associations.isActive')}</span>
              </label>
            </div>
          )}
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">{t('admin.associations.sectionContact')}</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              {t('admin.associations.contactEmail')}
            </label>
            <input
              type="email"
              name="contact"
              value={formData.contact}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
              placeholder="contact@association.ca"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              {t('admin.associations.website')}
            </label>
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
              placeholder="https://www.association.ca"
            />
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">{t('admin.associations.sectionLeadership')}</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              {t('admin.associations.president')}
            </label>
            <input
              type="text"
              name="president"
              value={formData.president}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
              placeholder={t('admin.associations.presidentPlaceholder')}
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              {t('admin.associations.memberCount')}
            </label>
            <input
              type="text"
              name="memberCount"
              value={formData.memberCount}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
              placeholder={t('admin.associations.memberCountPlaceholder')}
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              {t('admin.associations.foundedYear')}
            </label>
            <input
              type="number"
              name="foundedYear"
              value={formData.foundedYear ?? ''}
              onChange={handleInputChange}
              min={1900}
              max={new Date().getFullYear()}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
              placeholder={t('admin.associations.foundedYearPlaceholder')}
            />
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          {t('admin.associations.sectionDomains')} *
        </h2>
        <div className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              name="domainInput"
              value={domainInput}
              onChange={(e) => setDomainInput(e.target.value)}
              onKeyDown={handleDomainKeyDown}
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
              placeholder={t('admin.associations.domainPlaceholder')}
            />
            <button
              type="button"
              onClick={handleAddDomain}
              className="rounded-lg bg-emerald-600 px-4 py-2 text-white transition hover:bg-emerald-700"
            >
              {t('admin.associations.addDomain')}
            </button>
          </div>
          {formData.domains.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {formData.domains.map((domain) => (
                <span
                  key={domain}
                  className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-sm text-emerald-800"
                >
                  {domain}
                  <button
                    type="button"
                    onClick={() => handleRemoveDomain(domain)}
                    className="ml-2 text-emerald-600 hover:text-emerald-800"
                    aria-label={t('admin.common.delete')}
                  >
                    <i className="ri-close-line" aria-hidden="true"></i>
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">{t('admin.associations.sectionImage')}</h2>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            {t('admin.associations.imageUrl')}
          </label>
          <input
            type="url"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleInputChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
            placeholder="https://example.com/image.jpg"
          />
          <p className="mt-1 text-sm text-gray-500">{t('admin.associations.imageUrlHint')}</p>
          {formData.imageUrl && (
            <div className="mt-4">
              <img
                src={formData.imageUrl}
                alt={t('admin.associations.imagePreview')}
                className="h-32 w-32 rounded-lg border border-gray-300 object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-gray-300 px-6 py-2 text-gray-700 transition hover:bg-gray-50"
          disabled={submitting}
        >
          {t('admin.common.cancel')}
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="rounded-lg bg-emerald-600 px-6 py-2 text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting ? submittingLabel : submitLabel}
        </button>
      </div>
    </form>
  );
};
