import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { eventsApi } from '../../../lib/api/events';
import type { Event } from '../../../lib/api/types';
import { translateEventStatus } from '../../../lib/i18n/adminStatus';

const getEventStatusStyle = (status: string) => {
  const normalized = status.toLowerCase();

  if (status === 'À venir' || normalized === 'active' || normalized === 'upcoming') {
    return {
      icon: 'ri-calendar-check-line',
      className: 'border-emerald-200 bg-emerald-50 text-emerald-800',
    };
  }
  if (status === 'Brouillon' || normalized === 'draft') {
    return {
      icon: 'ri-draft-line',
      className: 'border-amber-200 bg-amber-50 text-amber-800',
    };
  }
  if (status === 'Annulé' || normalized === 'cancelled' || normalized === 'canceled') {
    return {
      icon: 'ri-close-circle-line',
      className: 'border-red-200 bg-red-50 text-red-800',
    };
  }
  if (status === 'Terminé' || normalized === 'completed' || normalized === 'past') {
    return {
      icon: 'ri-checkbox-circle-line',
      className: 'border-slate-200 bg-slate-50 text-slate-700',
    };
  }

  return {
    icon: 'ri-information-line',
    className: 'border-gray-200 bg-gray-50 text-gray-700',
  };
};

const EventStatusBadge: React.FC<{ status: string; label: string }> = ({ status, label }) => {
  const style = getEventStatusStyle(status);

  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg border px-2.5 py-1.5 text-xs font-medium ${style.className}`}
    >
      <i className={`${style.icon} text-sm`} />
      {label}
    </span>
  );
};

export const AdminEventsList: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const { t } = useTranslation();

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

  const uniqueStatuses = [...new Set(events.map((event) => event.status))];

  const filteredEvents = events.filter((event) => {
    if (filter === 'all') return true;
    if (filter === 'upcoming') return new Date(event.date) > new Date();
    if (filter === 'past') return new Date(event.date) <= new Date();
    return event.status === filter;
  });

  const sortedEvents = [...filteredEvents].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    }
    if (sortBy === 'created') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    return 0;
  });

  const filterOptions = [
    { value: 'all', label: t('admin.events.filterAll') },
    { value: 'upcoming', label: t('admin.events.filterUpcoming') },
    { value: 'past', label: t('admin.events.filterPast') },
    ...uniqueStatuses.map((status) => ({
      value: status,
      label: translateEventStatus(status, t),
    })),
  ];

  const sortOptions = [
    { value: 'date', label: t('admin.events.sortDate') },
    { value: 'title', label: t('admin.events.sortTitle') },
    { value: 'created', label: t('admin.events.sortCreated') },
  ];

  const currentFilterLabel =
    filterOptions.find((option) => option.value === filter)?.label ?? filter;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t('admin.events.title')}</h1>
          <p className="mt-2 text-gray-600">{t('admin.events.subtitle')}</p>
        </div>
        <Link
          to="/admin/events/create"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          <span className="mr-2">+</span>
          {t('admin.events.create')}
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow mb-6 p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="filter" className="block text-sm font-medium text-gray-700 mb-1">
              {t('admin.common.filterBy')}
            </label>
            <select
              id="filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              {filterOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-1">
              {t('admin.common.sortBy')}
            </label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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

      <div className="bg-white rounded-lg shadow">
        {sortedEvents.length === 0 ? (
          <div className="text-center py-12">
            <span className="text-6xl">📭</span>
            <h3 className="mt-4 text-lg font-medium text-gray-900">{t('admin.events.emptyTitle')}</h3>
            <p className="mt-2 text-gray-500">
              {filter === 'all'
                ? t('admin.events.emptyAll')
                : t('admin.events.emptyFilter', { filter: currentFilterLabel })}
            </p>
            <Link
              to="/admin/events/create"
              className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              {t('admin.events.create')}
            </Link>
          </div>
        ) : (
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('admin.events.colEvent')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('admin.events.colDateLocation')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('admin.common.status')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('admin.events.colDetails')}
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('admin.common.actions')}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedEvents.map((event) => (
                  <tr key={event.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{event.title}</div>
                        {event.description && (
                          <div className="text-sm text-gray-500 truncate max-w-xs">
                            {event.description}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {new Date(event.date).toLocaleDateString()}
                      </div>
                      {event.location && (
                        <div className="text-sm text-gray-500">{event.location}</div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <EventStatusBadge
                        status={event.status}
                        label={translateEventStatus(event.status, t)}
                      />
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
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="inline-flex items-center gap-1 rounded-xl border border-gray-200 bg-gray-50 p-1">
                        <Link
                          to={`/admin/events/${event.id}`}
                          className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-gray-500 hover:text-emerald-700 hover:bg-white hover:shadow-sm transition-all"
                          title={t('admin.common.view')}
                        >
                          <i className="ri-eye-line text-lg" />
                        </Link>
                        <Link
                          to={`/admin/events/${event.id}/edit`}
                          className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-gray-500 hover:text-amber-700 hover:bg-white hover:shadow-sm transition-all"
                          title={t('admin.common.edit')}
                        >
                          <i className="ri-edit-line text-lg" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDeleteEvent(event.id, event.title)}
                          className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-gray-500 hover:text-red-700 hover:bg-white hover:shadow-sm transition-all"
                          title={t('admin.common.delete')}
                        >
                          <i className="ri-delete-bin-line text-lg" />
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
