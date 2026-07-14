import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { eventsApi } from '../../../../lib/api/events';
import type { UpdateEventRequest, Event } from '../../../../lib/api/types';
import { EventForm } from '../../../../components/forms/EventForm';
import { AdminBackButton } from '../../../../components/admin/AdminBackButton';
import { EventGalleryManager } from '../../../../components/admin/EventGalleryManager';
import { EventAttachmentsManager } from '../../../../components/admin/EventAttachmentsManager';

export const EditEventPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const location = useLocation();
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingEvent, setIsLoadingEvent] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const state = location.state as { messageKey?: string } | null;
    if (state?.messageKey) {
      setSuccessMessage(t(state.messageKey));
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate, t]);

  useEffect(() => {
    if (id) {
      loadEvent(id);
    }
  }, [id]);

  const loadEvent = async (eventId: string) => {
    try {
      setIsLoadingEvent(true);
      const response = await eventsApi.getEvent(eventId);

      if (response.success && response.data) {
        setEvent(response.data);
      } else {
        setError(t('admin.events.errorNotFound'));
      }
    } catch (err) {
      console.error('Error loading event:', err);
      setError(t('admin.events.errorLoad'));
    } finally {
      setIsLoadingEvent(false);
    }
  };

  const handleSubmit = async (data: UpdateEventRequest) => {
    if (!id) return;

    setIsLoading(true);
    setError('');

    try {
      let imageUrl = data.imageUrl;
      if (coverFile) {
        const mediaResponse = await eventsApi.uploadMedia(coverFile);
        if (!mediaResponse.success || !mediaResponse.data) {
          setError(mediaResponse.message || t('admin.events.form.errorUploadCover'));
          return;
        }
        imageUrl = mediaResponse.data.url;
      }

      const response = await eventsApi.updateEvent(id, {
        ...data,
        imageUrl,
      });

      if (response.success && response.data) {
        navigate(`/admin/events/${id}`, {
          replace: true,
          state: { messageKey: 'admin.events.success.updated' },
        });
      } else {
        setError(response.message || t('admin.events.errorUpdate'));
      }
    } catch (err) {
      console.error('Error updating event:', err);
      setError(t('admin.common.errorUnexpected'));
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoadingEvent) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-emerald-600" />
      </div>
    );
  }

  if (error && !event) {
    return (
      <div className="mx-auto max-w-4xl">
        <div className="py-12 text-center">
          <h3 className="mt-4 text-lg font-medium text-gray-900">{t('admin.events.errorLoadTitle')}</h3>
          <p className="mt-2 text-gray-500">{error}</p>
          <button
            type="button"
            onClick={() => navigate('/admin/events')}
            className="mt-6 inline-flex items-center rounded-md border border-transparent bg-emerald-700 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-800"
          >
            {t('admin.events.backToList')}
          </button>
        </div>
      </div>
    );
  }

  if (!event) {
    return null;
  }

  return (
    <div className="mx-auto w-full min-w-0 max-w-4xl">
      <div className="mb-6 sm:mb-8">
        <AdminBackButton to="/admin/events" label={t('admin.events.backToList')} />
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              {t('admin.events.editTitle')}
            </h1>
            <p className="mt-2 break-words text-gray-600">
              {t('admin.events.editSubtitle', { title: event.title })}
            </p>
          </div>
          <Link
            to={`/admin/events/${id}`}
            className="shrink-0 text-sm font-medium text-emerald-700 hover:text-emerald-800"
          >
            {t('admin.events.view')}
          </Link>
        </div>
      </div>

      {successMessage && (
        <div className="mb-6 rounded border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-800">
          {successMessage}
        </div>
      )}

      {error && (
        <div className="mb-6 rounded border border-red-200 bg-red-50 px-4 py-3 text-red-800">{error}</div>
      )}

      <div className="min-w-0 overflow-hidden rounded-lg bg-white shadow">
        <div className="border-b border-gray-200 px-4 py-4 sm:px-6">
          <h3 className="text-lg font-medium text-gray-900">{t('admin.events.formSection')}</h3>
          <p className="mt-1 text-sm text-gray-500">{t('admin.events.formSectionEditHint')}</p>
        </div>

        <div className="px-4 py-4 sm:px-6 sm:py-6">
          <EventForm
            initialValues={event}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            submitButtonText={t('admin.events.form.submitUpdate')}
            coverFile={coverFile}
            onCoverFileChange={setCoverFile}
          />

          <EventAttachmentsManager
            eventId={event.id}
            attachments={event.attachments ?? []}
            onChange={(attachments) => setEvent({ ...event, attachments })}
          />

          <EventGalleryManager
            eventId={event.id}
            media={event.media ?? []}
            onChange={(media) => setEvent({ ...event, media })}
          />
        </div>
      </div>
    </div>
  );
};
