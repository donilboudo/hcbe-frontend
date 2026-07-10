import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { eventsApi } from '../../../lib/api/events';
import { membersApi } from '../../../lib/api/members';
import { membershipApplicationsApi } from '../../../lib/api/membership-applications';
import { newsApi } from '../../../lib/api/news';
import { projectsApi } from '../../../lib/api/projects';
import type { Event, MembershipApplicationDto, NewsArticle } from '../../../lib/api/types';
import { translateEventLifecycle } from '../../../lib/i18n/adminStatus';
import { getEventLifecycle, isCurrentOrUpcomingEvent } from '../../../lib/events/lifecycle';

type DashboardStats = {
  upcomingEvents: number;
  pendingApplications: number;
  members: number;
  publishedNews: number;
  activeProjects: number;
};

const emptyStats: DashboardStats = {
  upcomingEvents: 0,
  pendingApplications: 0,
  members: 0,
  publishedNews: 0,
  activeProjects: 0,
};

const lifecycleBadgeClass = (event: Event) => {
  const lifecycle = getEventLifecycle(event);
  if (lifecycle === 'ongoing') return 'bg-red-50 text-red-700 ring-red-200';
  if (lifecycle === 'upcoming') return 'bg-emerald-50 text-emerald-700 ring-emerald-200';
  if (lifecycle === 'past') return 'bg-gray-100 text-gray-700 ring-gray-200';
  if (lifecycle === 'cancelled') return 'bg-red-50 text-red-700 ring-red-200';
  return 'bg-amber-50 text-amber-700 ring-amber-200';
};

const isActiveProjectStatus = (status?: string | null) => {
  const normalized = (status ?? '').toLowerCase();
  return (
    normalized === 'en cours' ||
    normalized === 'actif' ||
    normalized === 'active' ||
    normalized === 'in progress' ||
    normalized === 'planification' ||
    normalized === 'planning'
  );
};

const isPublishedNews = (article: NewsArticle) => {
  const normalized = (article.status ?? '').toLowerCase();
  return normalized === 'published' || normalized === 'publié' || normalized === 'publie';
};

const loadList = async <T,>(
  request: Promise<{ success: boolean; data?: T[] | null; message?: string }>,
  label: string,
): Promise<{ data: T[]; ok: boolean; error?: string }> => {
  try {
    const response = await request;

    if (!response.success || !Array.isArray(response.data)) {
      console.error(`Dashboard load incomplete (${label}):`, response.message ?? response);
      return { data: [], ok: false, error: response.message ?? 'Invalid response' };
    }

    return { data: response.data, ok: true };
  } catch (error) {
    console.error(`Dashboard load failed (${label}):`, error);
    return {
      data: [],
      ok: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
};

export const AdminDashboard = () => {
  const { t, i18n } = useTranslation();
  const [stats, setStats] = useState<DashboardStats>(emptyStats);
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [pendingApplications, setPendingApplications] = useState<MembershipApplicationDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [failedSources, setFailedSources] = useState<string[]>([]);
  const [dashboardError, setDashboardError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const loadDashboard = async () => {
      setIsLoading(true);
      setFailedSources([]);
      setDashboardError(null);

      try {
        const loads = await Promise.all([
          loadList(eventsApi.getEvents(), 'events').then((load) => ({ key: 'events', ...load })),
          loadList(membershipApplicationsApi.getAll('Pending'), 'membership-applications').then(
            (load) => ({ key: 'applications', ...load }),
          ),
          loadList(membersApi.getAllMembers(), 'members').then((load) => ({ key: 'members', ...load })),
          loadList(newsApi.getNewsForAdmin(), 'news').then((load) => ({ key: 'news', ...load })),
          loadList(projectsApi.getProjectsForAdmin(), 'projects').then((load) => ({
            key: 'projects',
            ...load,
          })),
        ]);

        if (cancelled) return;

        const [eventsLoad, applicationsLoad, membersLoad, newsLoad, projectsLoad] = loads;

        const upcoming = eventsLoad.data
          .filter(isCurrentOrUpcomingEvent)
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        const pending = [...applicationsLoad.data].sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );

        setFailedSources(loads.filter((load) => !load.ok).map((load) => load.key));
        setUpcomingEvents(upcoming.slice(0, 5));
        setPendingApplications(pending.slice(0, 5));
        setStats({
          upcomingEvents: upcoming.length,
          pendingApplications: applicationsLoad.data.length,
          members: membersLoad.data.length,
          publishedNews: newsLoad.data.filter(isPublishedNews).length,
          activeProjects: projectsLoad.data.filter(
            (project) => project.isActive && isActiveProjectStatus(project.status),
          ).length,
        });
      } catch (error) {
        console.error('Error rendering admin dashboard data:', error);
        if (!cancelled) {
          setFailedSources(['dashboard']);
          setDashboardError(error instanceof Error ? error.message : String(error));
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    loadDashboard();
    return () => {
      cancelled = true;
    };
  }, [reloadKey]);

  const hasPartialError = failedSources.length > 0;

  const locale = i18n.language.startsWith('fr') ? 'fr-CA' : 'en-CA';

  const formatShortDate = (value: string) =>
    new Intl.DateTimeFormat(locale, {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(new Date(value));

  const statCards = [
    {
      name: t('admin.dashboard.stats.upcomingEvents'),
      value: stats.upcomingEvents,
      icon: 'ri-calendar-event-line',
      accent: 'from-emerald-600 to-emerald-900',
      link: '/admin/events',
    },
    {
      name: t('admin.dashboard.stats.pendingApplications'),
      value: stats.pendingApplications,
      icon: 'ri-user-add-line',
      accent: 'from-amber-500 to-orange-700',
      link: '/admin/membership-applications',
      highlight: stats.pendingApplications > 0,
    },
    {
      name: t('admin.dashboard.stats.members'),
      value: stats.members,
      icon: 'ri-group-line',
      accent: 'from-slate-700 to-slate-900',
      link: '/admin/members',
    },
    {
      name: t('admin.dashboard.stats.publishedNews'),
      value: stats.publishedNews,
      icon: 'ri-article-line',
      accent: 'from-blue-600 to-blue-900',
      link: '/admin/news',
    },
    {
      name: t('admin.dashboard.stats.activeProjects'),
      value: stats.activeProjects,
      icon: 'ri-hammer-line',
      accent: 'from-violet-600 to-violet-900',
      link: '/admin/projects',
    },
  ];

  const quickActions = [
    {
      label: t('admin.dashboard.createEvent'),
      href: '/admin/events/create',
      icon: 'ri-calendar-event-line',
      accent: 'bg-emerald-50 text-emerald-700',
    },
    {
      label: t('admin.dashboard.createNews'),
      href: '/admin/news/create',
      icon: 'ri-article-line',
      accent: 'bg-blue-50 text-blue-700',
    },
    {
      label: t('admin.dashboard.createProject'),
      href: '/admin/projects/create',
      icon: 'ri-hammer-line',
      accent: 'bg-violet-50 text-violet-700',
    },
    {
      label: t('admin.dashboard.createDocument'),
      href: '/admin/documents/create',
      icon: 'ri-file-text-line',
      accent: 'bg-amber-50 text-amber-700',
    },
    {
      label: t('admin.dashboard.reviewApplications'),
      href: '/admin/membership-applications',
      icon: 'ri-user-add-line',
      accent: 'bg-orange-50 text-orange-700',
    },
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <section className="relative overflow-hidden rounded-[1.75rem] border border-emerald-100 bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-950 p-5 text-white shadow-sm sm:rounded-[2rem] sm:p-6">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(16,185,129,0.25),transparent_35%)]" />
        <div className="relative">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-100">
            {t('admin.dashboard.badge')}
          </p>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-emerald-50/90 sm:text-base sm:leading-7">
            {t('admin.dashboard.subtitle')}
          </p>
        </div>
      </section>

      {hasPartialError && (
        <div className="flex flex-col gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p>{t('admin.dashboard.partialError')}</p>
            <p className="mt-1 text-xs text-amber-800/80">
              {t('admin.dashboard.partialErrorSources', {
                sources: failedSources
                  .map((source) => t(`admin.dashboard.source.${source}`))
                  .join(', '),
              })}
            </p>
            {dashboardError && (
              <p className="mt-1 font-mono text-xs text-amber-950">{dashboardError}</p>
            )}
          </div>
          <button
            type="button"
            onClick={() => setReloadKey((value) => value + 1)}
            className="inline-flex shrink-0 items-center justify-center rounded-full border border-amber-300 bg-white px-4 py-2 text-sm font-semibold text-amber-900 transition hover:bg-amber-100"
          >
            {t('admin.common.tryAgain')}
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {statCards.map((stat) => (
          <Link
            key={stat.name}
            to={stat.link}
            className={`group rounded-[1.5rem] border bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:rounded-[1.75rem] ${
              stat.highlight
                ? 'border-amber-200 ring-1 ring-amber-100'
                : 'border-gray-200 hover:border-emerald-200'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                <p className="mt-2 text-3xl font-bold text-gray-950">
                  {isLoading ? '—' : stat.value}
                </p>
              </div>
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${stat.accent} text-white shadow-sm`}
              >
                <i className={`${stat.icon} text-lg`} aria-hidden="true"></i>
              </div>
            </div>
            <p className="mt-4 text-sm font-semibold text-emerald-700 transition group-hover:text-emerald-800">
              {t('admin.common.viewAll')}
              <i className="ri-arrow-right-line ml-1" aria-hidden="true"></i>
            </p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1.2fr_1fr_0.85fr]">
        <section className="rounded-[2rem] border border-gray-200 bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b border-gray-100 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-gray-950">
                  {t('admin.dashboard.inbox.title')}
                </h2>
                {!isLoading && stats.pendingApplications > 0 && (
                  <span className="inline-flex min-w-6 items-center justify-center rounded-full bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-800">
                    {stats.pendingApplications}
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm text-gray-500">{t('admin.dashboard.inbox.hint')}</p>
            </div>
            <Link
              to="/admin/membership-applications"
              className="inline-flex w-full items-center justify-center rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-800 sm:w-auto"
            >
              {t('admin.common.viewAll')}
            </Link>
          </div>

          <div className="px-4 py-5 sm:px-6">
            {isLoading ? (
              <div className="flex items-center justify-center py-14">
                <div className="h-9 w-9 animate-spin rounded-full border-2 border-emerald-200 border-t-emerald-700" />
              </div>
            ) : pendingApplications.length === 0 ? (
              <div className="rounded-[1.5rem] border border-dashed border-gray-300 px-6 py-10 text-center">
                <i className="ri-checkbox-circle-line text-4xl text-emerald-400" aria-hidden="true"></i>
                <p className="mt-3 font-medium text-gray-700">{t('admin.dashboard.inbox.empty')}</p>
              </div>
            ) : (
              <div className="space-y-3">
                {pendingApplications.map((application) => (
                  <div
                    key={application.id}
                    className="flex flex-col gap-3 rounded-2xl border border-amber-100 bg-amber-50/40 p-4 transition hover:border-amber-200 hover:bg-white sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate font-semibold text-gray-950">
                        {application.firstName} {application.lastName}
                      </h3>
                      <p className="mt-1 truncate text-sm text-gray-500">
                        {application.email}
                        {application.city || application.province
                          ? ` • ${[application.city, application.province].filter(Boolean).join(', ')}`
                          : ''}
                      </p>
                      <p className="mt-1 text-xs text-gray-400">
                        {formatShortDate(application.createdAt)}
                      </p>
                    </div>
                    <Link
                      to={`/admin/membership-applications/${application.id}`}
                      className="inline-flex items-center justify-center rounded-full bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800"
                    >
                      {t('admin.dashboard.inbox.review')}
                      <i className="ri-arrow-right-line ml-1" aria-hidden="true"></i>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="rounded-[2rem] border border-gray-200 bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b border-gray-100 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div className="min-w-0">
              <h2 className="text-xl font-bold text-gray-950">
                {t('admin.dashboard.upcomingEventsTitle')}
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                {t('admin.dashboard.upcomingEventsHint')}
              </p>
            </div>
            <Link
              to="/admin/events"
              className="inline-flex w-full items-center justify-center rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-800 sm:w-auto"
            >
              {t('admin.common.viewAll')}
            </Link>
          </div>

          <div className="px-4 py-5 sm:px-6">
            {isLoading ? (
              <div className="flex items-center justify-center py-14">
                <div className="h-9 w-9 animate-spin rounded-full border-2 border-emerald-200 border-t-emerald-700" />
              </div>
            ) : upcomingEvents.length === 0 ? (
              <div className="rounded-[1.5rem] border border-dashed border-gray-300 px-6 py-10 text-center">
                <i className="ri-calendar-todo-line text-4xl text-gray-300" aria-hidden="true"></i>
                <p className="mt-3 font-medium text-gray-700">{t('admin.dashboard.noUpcomingEvents')}</p>
                <Link
                  to="/admin/events/create"
                  className="mt-4 inline-flex items-center rounded-full bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800"
                >
                  <i className="ri-add-line mr-1" aria-hidden="true"></i>
                  {t('admin.dashboard.createFirstEvent')}
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {upcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex flex-col gap-3 rounded-2xl border border-gray-100 bg-gray-50/70 p-4 transition hover:border-emerald-100 hover:bg-white sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate font-semibold text-gray-950">{event.title}</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {formatShortDate(event.date)}
                        {event.location ? ` • ${event.location}` : ''}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ring-1 ${lifecycleBadgeClass(event)}`}
                      >
                        {translateEventLifecycle(event, t)}
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

        <section className="rounded-[2rem] border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
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
