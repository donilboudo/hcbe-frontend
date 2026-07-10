import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { eventsApi } from '../../../../lib/api/events';
import type { CreateEventRequest } from '../../../../lib/api/types';
import { EventForm } from '../../../../components/forms/EventForm';
import { AdminBackButton } from '../../../../components/admin/AdminBackButton';

export const CreateEventPage: React.FC = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (data: CreateEventRequest) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await eventsApi.createEvent(data);

      if (response.success && response.data) {
        navigate(`/admin/events/${response.data.id}`, {
          replace: true,
          state: { messageKey: 'admin.events.success.created' },
        });
      } else {
        setError(response.message || t('admin.events.errorCreate'));
      }
    } catch (err) {
      console.error('Error creating event:', err);
      setError(t('admin.common.errorUnexpected'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8">
        <AdminBackButton to="/admin/events" label={t('admin.events.backToList')} />
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          {t('admin.events.createTitle')}
        </h1>
        <p className="mt-2 text-gray-600">{t('admin.events.createSubtitle')}</p>
      </div>

      {error && (
        <div className="mb-6 rounded border border-red-200 bg-red-50 px-4 py-3 text-red-800">{error}</div>
      )}

      <div className="rounded-lg bg-white shadow">
        <div className="border-b border-gray-200 px-6 py-4">
          <h3 className="text-lg font-medium text-gray-900">{t('admin.events.formSection')}</h3>
          <p className="mt-1 text-sm text-gray-500">{t('admin.events.formSectionCreateHint')}</p>
        </div>

        <div className="px-6 py-6">
          <EventForm
            onSubmit={handleSubmit}
            isLoading={isLoading}
            submitButtonText={t('admin.events.form.submitCreate')}
          />
        </div>
      </div>
    </div>
  );
};
