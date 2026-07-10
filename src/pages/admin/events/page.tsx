import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { eventsApi } from '../../../lib/api/events';
import type { Event } from '../../../lib/api/types';
import {
  getEventLifecycleStyle,
  getPublicationLabel,
  translateEventLifecycle,
} from '../../../lib/i18n/adminStatus';
import { getEventLifecycle } from '../../../lib/events/lifecycle';

const EventLifecycleBadge: React.FC<{ event: Event }> = ({ event }) => {
  const { t } = useTranslation();
  const style = getEventLifecycleStyle(event);

  return (
    <div className="space-y-1">
      <span
        className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg border px-2.5 py-1.5 text-xs font-medium ${style.className}`}
      >
        <i className={`${style.icon} text-sm`} aria-hidden="true" />
        {translateEventLifecycle(event, t)}
      </span>
      <div className="text-[11px] text-gray-500">{getPublicationLabel(event.status, t)}</div>
    </div>
  );
};

export const AdminEventsList: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const { t, i18n } = useTranslation();

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      setIsLoading(true);
      const response = await eventsApi.getEvents();
      if (response.success && response.data) {
        setEvents(response.data);
      }
    } catch (error) {
      console.error('Error loading events:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteEvent = async (id: string, title: string) => {
    if (!window.confirm(t('admin.common.confirmDelete', { name: title }))) {
      return;
    }

    try {
      const response = await eventsApi.deleteEvent(id);
      if (response.success) {
        setEvents(events.filter((event) => event.id !== id));
      }
    } catch (error) {
      console.error('Error deleting event:', error);
      alert(t('admin.events.errorDelete'));
    }
  };

  const filterOptions = [
    { value: 'all', label: t('admin.events.filterAll') },
    { value: 'upcoming', label: t('admin.eventLifecycle.upcoming') },
    { value: 'ongoing', label: t('admin.eventLifecycle.ongoing') },
    { value: 'past', label: t('admin.eventLifecycle.past') },
    { value: 'draft', label: t('admin.eventLifecycle.draft') },
    { value: 'cancelled', label: t('admin.eventLifecycle.cancelled') },
  ];

  const filteredEvents = events.filter((event) => {
    if (filter === 'all') return true;
    return getEventLifecycle(event) === filter;
  });

  const sortedEvents = [...filteredEvents].sort((a, b) => {
    if (sortBy === 'title') return a.title.localeCompare(b.title);
    if (sortBy === 'created') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  const sortOptions = [
    { value: 'date', label: t('admin.events.sortDate') },
    { value: 'title', label: t('admin.events.sortTitle') },
    { value: 'created', label: t('admin.events.sortCreated') },
  ];

  const currentFilterLabel =
    filterOptions.find((option) => option.value === filter)?.label ?? filter;

  const locale = i18n.language.startsWith('fr') ? 'fr-CA' : 'en-CA';
  const formatListDate = (value: string) =>
    new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(new Date(value));

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-emerald-600" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-gray-600 sm:text-base">{t('admin.events.subtitle')}</p>
        <Link
          to="/admin/events/create"
          className="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-emerald-700 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-800 sm:w-auto"
        >
          <span className="mr-2">+</span>
          {t('admin.events.create')}
        </Link>
      </div>

      <div className="mb-6 rounded-lg bg-white p-6 shadow">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="flex-1">
            <label htmlFor="filter" className="mb-1 block text-sm font-medium text-gray-700">
              {t('admin.common.filterBy')}
            </label>
            <select
              id="filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-emerald-500"
            >
              {filterOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label htmlFor="sort" className="mb-1 block text-sm font-medium text-gray-700">
              {t('admin.common.sortBy')}
            </label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-emerald-500"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-white shadow">
        {sortedEvents.length === 0 ? (
          <div className="py-12 text-center">
            <h3 className="mt-4 text-lg font-medium text-gray-900">{t('admin.events.emptyTitle')}</h3>
            <p className="mt-2 text-gray-500">
              {filter === 'all'
                ? t('admin.events.emptyAll')
                : t('admin.events.emptyFilter', { filter: currentFilterLabel })}
            </p>
            <Link
              to="/admin/events/create"
              className="mt-6 inline-flex items-center rounded-md border border-transparent bg-emerald-700 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-800"
            >
              {t('admin.events.create')}
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    {t('admin.events.colEvent')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    {t('admin.events.colDateLocation')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    {t('admin.events.colLifecycle')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    {t('admin.events.colDetails')}
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                    {t('admin.common.actions')}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {sortedEvents.map((event) => (
                  <tr key={event.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{event.title}</div>
                      {event.description && (
                        <div className="mt-1 max-w-xs truncate text-sm text-gray-500">
                          {event.description}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{formatListDate(event.date)}</div>
                      {event.location && (
                        <div className="text-sm text-gray-500">{event.location}</div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <EventLifecycleBadge event={event} />
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {event.type && (
                        <div>
                          {t('admin.common.type')}: {event.type}
                        </div>
                      )}
                      {event.zone && (
                        <div>
                          {t('admin.common.zone')}: {event.zone}
                        </div>
                      )}
                      {event.capacity && (
                        <div>
                          {t('admin.common.capacity')}: {event.capacity}
                        </div>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right">
                      <div className="inline-flex items-center gap-1 rounded-xl border border-gray-200 bg-gray-50 p-1">
                        <Link
                          to={`/admin/events/${event.id}`}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition-all hover:bg-white hover:text-emerald-700 hover:shadow-sm"
                          title={t('admin.common.view')}
                        >
                          <i className="ri-eye-line text-lg" aria-hidden="true" />
                        </Link>
                        <Link
                          to={`/admin/events/${event.id}/edit`}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition-all hover:bg-white hover:text-amber-700 hover:shadow-sm"
                          title={t('admin.common.edit')}
                        >
                          <i className="ri-edit-line text-lg" aria-hidden="true" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDeleteEvent(event.id, event.title)}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition-all hover:bg-white hover:text-red-700 hover:shadow-sm"
                          title={t('admin.common.delete')}
                        >
                          <i className="ri-delete-bin-line text-lg" aria-hidden="true" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
