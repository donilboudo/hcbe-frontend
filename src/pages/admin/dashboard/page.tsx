import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { eventsApi } from '../../../lib/api/events';
import type { Event } from '../../../lib/api/types';
import { translateEventStatus } from '../../../lib/i18n/adminStatus';

const statusBadgeClass = (status: string) => {
  if (status === 'Active' || status === 'À venir') {
    return 'bg-emerald-50 text-emerald-700 ring-emerald-200';
  }
  if (status === 'Completed' || status === 'Terminé') {
    return 'bg-gray-100 text-gray-700 ring-gray-200';
  }
  if (status === 'Cancelled' || status === 'Annulé') {
    return 'bg-red-50 text-red-700 ring-red-200';
  }
  return 'bg-amber-50 text-amber-700 ring-amber-200';
};

export const AdminDashboard = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const loadEvents = async () => {
      try {
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

    loadEvents();
  }, []);

  const upcomingEvents = events.filter((event) => new Date(event.date) > new Date());
  const totalEvents = events.length;
  const activeEvents = events.filter(
    (event) => event.status === 'Active' || event.status === 'À venir',
  ).length;

  const stats = [
    {
      name: t('admin.dashboard.totalEvents'),
      value: totalEvents,
      icon: 'ri-calendar-event-line',
      accent: 'from-slate-700 to-slate-900',
      link: '/admin/events',
    },
    {
      name: t('admin.dashboard.upcomingEvents'),
      value: upcomingEvents.length,
      icon: 'ri-time-line',
      accent: 'from-emerald-600 to-emerald-900',
      link: '/admin/events',
    },
    {
      name: t('admin.dashboard.activeEvents'),
      value: activeEvents,
      icon: 'ri-flashlight-line',
      accent: 'from-amber-500 to-orange-700',
      link: '/admin/events',
    },
  ];

  const quickActions = [
    {
      label: t('admin.dashboard.createEvent'),
      href: '/admin/events/create',
      icon: 'ri-add-circle-line',
      accent: 'bg-emerald-50 text-emerald-700',
    },
    {
      label: t('admin.nav.events'),
      href: '/admin/events',
      icon: 'ri-calendar-line',
      accent: 'bg-slate-100 text-slate-700',
    },
    {
      label: t('admin.nav.associations'),
      href: '/admin/associations',
      icon: 'ri-building-line',
      accent: 'bg-blue-50 text-blue-700',
    },
    {
      label: t('admin.nav.projects'),
      href: '/admin/projects',
      icon: 'ri-hammer-line',
      accent: 'bg-violet-50 text-violet-700',
    },
    {
      label: t('admin.nav.teamMembers'),
      href: '/admin/team-members',
      icon: 'ri-team-line',
      accent: 'bg-cyan-50 text-cyan-700',
    },
    {
      label: t('admin.nav.documents'),
      href: '/admin/documents',
      icon: 'ri-file-text-line',
      accent: 'bg-amber-50 text-amber-700',
    },
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <section className="relative overflow-hidden rounded-[2rem] border border-emerald-100 bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-950 p-7 text-white shadow-sm sm:p-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(16,185,129,0.25),transparent_35%)]" />
        <div className="relative">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-100">
            {t('admin.dashboard.badge')}
          </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          {t('admin.dashboard.title')}
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-emerald-50/90 sm:text-base sm:leading-7">
          {t('admin.dashboard.subtitle')}
        </p>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {stats.map((stat) => (
          <Link
            key={stat.name}
            to={stat.link}
            className="group rounded-[1.75rem] border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-md sm:rounded-[2rem]"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                <p className="mt-2 text-3xl font-bold text-gray-950">{stat.value}</p>
              </div>
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${stat.accent} text-white shadow-sm`}
              >
                <i className={`${stat.icon} text-xl`} aria-hidden="true"></i>
              </div>
            </div>
            <p className="mt-5 text-sm font-semibold text-emerald-700 transition group-hover:text-emerald-800">
              {t('admin.common.viewAll')}
              <i className="ri-arrow-right-line ml-1" aria-hidden="true"></i>
            </p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1.35fr_0.65fr]">
        <section className="rounded-[2rem] border border-gray-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5 sm:px-8">
            <div>
              <h2 className="text-xl font-bold text-gray-950">{t('admin.dashboard.recentEvents')}</h2>
              <p className="mt-1 text-sm text-gray-500">{t('admin.dashboard.recentEventsHint')}</p>
            </div>
            <Link
              to="/admin/events"
              className="rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-800"
            >
              {t('admin.common.viewAll')}
            </Link>
          </div>

          <div className="px-6 py-5 sm:px-8 sm:py-6">
            {isLoading ? (
              <div className="flex items-center justify-center py-14">
                <div className="h-9 w-9 animate-spin rounded-full border-2 border-emerald-200 border-t-emerald-700" />
              </div>
            ) : events.length === 0 ? (
              <div className="rounded-[1.5rem] border border-dashed border-gray-300 px-6 py-12 text-center">
                <i className="ri-calendar-todo-line text-4xl text-gray-300" aria-hidden="true"></i>
                <p className="mt-4 font-medium text-gray-700">{t('admin.dashboard.noEvents')}</p>
                <Link
                  to="/admin/events/create"
                  className="mt-5 inline-flex items-center rounded-full bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800"
                >
                  <i className="ri-add-line mr-1" aria-hidden="true"></i>
                  {t('admin.dashboard.createFirstEvent')}
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {events.slice(0, 5).map((event) => (
                  <div
                    key={event.id}
                    className="flex flex-col gap-3 rounded-2xl border border-gray-100 bg-gray-50/70 p-4 transition hover:border-emerald-100 hover:bg-white sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate font-semibold text-gray-950">{event.title}</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {new Date(event.date).toLocaleDateString()}
                        {event.location ? ` • ${event.location}` : ''}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ring-1 ${statusBadgeClass(event.status)}`}
                      >
                        {translateEventStatus(event.status, t)}
                      </span>
                      <Link
                        to={`/admin/events/${event.id}`}
                        className="inline-flex items-center text-sm font-semibold text-emerald-700 hover:text-emerald-800"
                      >
                        {t('admin.common.view')}
                        <i className="ri-arrow-right-line ml-1" aria-hidden="true"></i>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-sm sm:p-7">
          <h2 className="text-xl font-bold text-gray-950">{t('admin.dashboard.quickActions')}</h2>
          <p className="mt-1 text-sm text-gray-500">{t('admin.dashboard.quickActionsHint')}</p>
          <div className="mt-5 grid grid-cols-1 gap-3">
            {quickActions.map((action) => (
              <Link
                key={action.href}
                to={action.href}
                className="flex items-center gap-3 rounded-2xl border border-gray-100 px-4 py-3 transition hover:border-emerald-200 hover:bg-emerald-50/40"
              >
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${action.accent}`}
                >
                  <i className={`${action.icon} text-lg`} aria-hidden="true"></i>
                </span>
                <span className="font-semibold text-gray-800">{action.label}</span>
                <i className="ri-arrow-right-s-line ml-auto text-gray-400" aria-hidden="true"></i>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
