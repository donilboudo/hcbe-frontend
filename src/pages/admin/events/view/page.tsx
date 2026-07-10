import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { eventsApi } from '../../../../lib/api/events';
import type { Event } from '../../../../lib/api/types';
import {
  getEventLifecycleStyle,
  getPublicationLabel,
  translateEventLifecycle,
} from '../../../../lib/i18n/adminStatus';
import { AdminBackButton } from '../../../../components/admin/AdminBackButton';

export const ViewEventPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t, i18n } = useTranslation();
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (id) {
      loadEvent(id);
    }
  }, [id]);

  useEffect(() => {
    const messageKey = (location.state as { messageKey?: string } | null)?.messageKey;
    if (!messageKey) return;

    setSuccessMessage(t(messageKey));
    navigate(location.pathname, { replace: true, state: {} });
  }, [location.state, location.pathname, navigate, t]);

  const loadEvent = async (eventId: string) => {
    try {
      setIsLoading(true);
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
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!event || !id) return;

    if (!window.confirm(t('admin.events.confirmDelete', { title: event.title }))) {
      return;
    }

    try {
      const response = await eventsApi.deleteEvent(id);
      if (response.success) {
        navigate('/admin/events', {
          state: { messageKey: 'admin.events.success.deleted' },
        });
      } else {
        setError(t('admin.events.errorDelete'));
      }
    } catch (err) {
      console.error('Error deleting event:', err);
      setError(t('admin.events.errorDelete'));
    }
  };

  const locale = i18n.language.startsWith('fr') ? 'fr-CA' : 'en-CA';

  const formatDate = (dateString: string) =>
    new Intl.DateTimeFormat(locale, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(dateString));

  const formatShortDate = (dateString: string) =>
    new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(new Date(dateString));

  if (isLoading) {
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
          <Link
            to="/admin/events"
            className="mt-6 inline-flex items-center rounded-md border border-transparent bg-emerald-700 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-800"
          >
            {t('admin.events.backToList')}
          </Link>
        </div>
      </div>
    );
  }

  if (!event) {
    return null;
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8">
        <AdminBackButton to="/admin/events" label={t('admin.events.backToList')} />
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{event.title}</h1>
          <div className="flex flex-wrap gap-2">
            <Link
              to={`/admin/events/${id}/edit`}
              className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              {t('admin.events.edit')}
            </Link>
            <button
              type="button"
              onClick={handleDelete}
              className="inline-flex items-center rounded-md border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-50"
            >
              {t('admin.events.delete')}
            </button>
          </div>
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

      <div className="rounded-lg bg-white shadow">
        <div className="px-6 py-6">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-semibold ${getEventLifecycleStyle(event).className}`}
            >
              <i className={getEventLifecycleStyle(event).icon} aria-hidden="true" />
              {translateEventLifecycle(event, t)}
            </span>
            <span className="text-sm text-gray-500">{getPublicationLabel(event.status, t)}</span>
          </div>

          {event.imageUrl && (
            <div className="mb-6">
              <img
                src={event.imageUrl}
                alt={event.title}
                className="h-64 w-full rounded-lg border object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          )}

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="space-y-6">
              <div>
                <h3 className="mb-2 text-lg font-medium text-gray-900">
                  {t('admin.events.detailsSection')}
                </h3>

                <div className="space-y-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">{t('admin.events.dateTime')}</dt>
                    <dd className="text-sm text-gray-900">{formatDate(event.date)}</dd>
                  </div>

                  {event.location && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">{t('admin.common.location')}</dt>
                      <dd className="text-sm text-gray-900">{event.location}</dd>
                    </div>
                  )}

                  {event.type && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">{t('admin.common.type')}</dt>
                      <dd className="text-sm text-gray-900">{event.type}</dd>
                    </div>
                  )}

                  {event.zone && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">{t('admin.common.zone')}</dt>
                      <dd className="text-sm text-gray-900">{event.zone}</dd>
                    </div>
                  )}

                  {event.capacity && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">{t('admin.common.capacity')}</dt>
                      <dd className="text-sm text-gray-900">
                        {t('admin.events.attendees', { count: event.capacity })}
                      </dd>
                    </div>
                  )}
                </div>
              </div>

              {event.meetingLink && (
                <div>
                  <h3 className="mb-2 text-lg font-medium text-gray-900">
                    {t('admin.events.meetingLink')}
                  </h3>
                  <a
                    href={event.meetingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="break-all text-emerald-700 hover:text-emerald-800"
                  >
                    {event.meetingLink}
                  </a>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="mb-2 text-lg font-medium text-gray-900">
                  {t('admin.events.additionalSection')}
                </h3>

                <div className="space-y-4">
                  {event.registrationDeadline && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">
                        {t('admin.events.registrationDeadline')}
                      </dt>
                      <dd className="text-sm text-gray-900">
                        {formatDate(event.registrationDeadline)}
                      </dd>
                    </div>
                  )}

                  <div>
                    <dt className="text-sm font-medium text-gray-500">{t('admin.events.createdAt')}</dt>
                    <dd className="text-sm text-gray-900">{formatShortDate(event.createdAt)}</dd>
                  </div>

                  <div>
                    <dt className="text-sm font-medium text-gray-500">{t('admin.events.updatedAt')}</dt>
                    <dd className="text-sm text-gray-900">{formatShortDate(event.updatedAt)}</dd>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {event.description && (
            <div className="mt-8 border-t border-gray-200 pt-8">
              <h3 className="mb-4 text-lg font-medium text-gray-900">
                {t('admin.common.description')}
              </h3>
              <p className="whitespace-pre-wrap text-gray-700">{event.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
