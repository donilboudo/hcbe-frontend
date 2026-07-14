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
  const [pendingAttachments, setPendingAttachments] = useState<File[]>([]);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (data: CreateEventRequest) => {
    setIsLoading(true);
    setError('');

    try {
      let imageUrl = data.imageUrl || undefined;
      if (coverFile) {
        const mediaResponse = await eventsApi.uploadMedia(coverFile);
        if (!mediaResponse.success || !mediaResponse.data) {
          setError(mediaResponse.message || t('admin.events.form.errorUploadCover'));
          return;
        }
        imageUrl = mediaResponse.data.url;
      }

      const response = await eventsApi.createEvent({
        ...data,
        imageUrl,
      });

      if (!response.success || !response.data) {
        setError(response.message || t('admin.events.errorCreate'));
        return;
      }

      const eventId = response.data.id;
      for (const file of pendingAttachments) {
        const attachmentResponse = await eventsApi.uploadAttachment(eventId, file);
        if (!attachmentResponse.success) {
          setError(attachmentResponse.message || t('admin.events.attachments.errorUpload'));
          navigate(`/admin/events/${eventId}/edit`, {
            replace: true,
            state: { messageKey: 'admin.events.success.createdPartialMedia' },
          });
          return;
        }
      }

      navigate(`/admin/events/${eventId}/edit`, {
        replace: true,
        state: { messageKey: 'admin.events.success.createdAddMedia' },
      });
    } catch (err) {
      console.error('Error creating event:', err);
      setError(t('admin.common.errorUnexpected'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full min-w-0 max-w-4xl">
      <div className="mb-6 sm:mb-8">
        <AdminBackButton to="/admin/events" label={t('admin.events.backToList')} />
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          {t('admin.events.createTitle')}
        </h1>
        <p className="mt-2 text-gray-600">{t('admin.events.createSubtitle')}</p>
      </div>

      {error && (
        <div className="mb-6 rounded border border-red-200 bg-red-50 px-4 py-3 text-red-800">{error}</div>
      )}

      <div className="min-w-0 overflow-hidden rounded-lg bg-white shadow">
        <div className="border-b border-gray-200 px-4 py-4 sm:px-6">
          <h3 className="text-lg font-medium text-gray-900">{t('admin.events.formSection')}</h3>
          <p className="mt-1 text-sm text-gray-500">{t('admin.events.formSectionCreateHint')}</p>
        </div>

        <div className="px-4 py-4 sm:px-6 sm:py-6">
          <EventForm
            onSubmit={handleSubmit}
            isLoading={isLoading}
            submitButtonText={t('admin.events.form.submitCreate')}
            pendingAttachments={pendingAttachments}
            onPendingAttachmentsChange={setPendingAttachments}
            coverFile={coverFile}
            onCoverFileChange={setCoverFile}
          />
        </div>
      </div>
    </div>
  );
};
