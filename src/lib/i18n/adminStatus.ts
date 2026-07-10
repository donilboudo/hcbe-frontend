import type { TFunction } from 'i18next';
import {
  getEventLifecycle,
  getPublicationStatus,
  type EventLifecycle,
} from '../events/lifecycle';

const EVENT_STATUS_KEYS: Record<string, string> = {
  'À venir': 'admin.eventStatus.upcoming',
  Active: 'admin.eventStatus.active',
  Upcoming: 'admin.eventStatus.upcoming',
  Brouillon: 'admin.eventStatus.draft',
  Draft: 'admin.eventStatus.draft',
  Annulé: 'admin.eventStatus.cancelled',
  Cancelled: 'admin.eventStatus.cancelled',
  Canceled: 'admin.eventStatus.cancelled',
  Terminé: 'admin.eventStatus.completed',
  Completed: 'admin.eventStatus.completed',
};

/** Translates the raw publication status stored in the database. */
export const translateEventStatus = (status: string, t: TFunction): string => {
  const key = EVENT_STATUS_KEYS[status];
  return key ? t(key) : status;
};

const LIFECYCLE_KEYS: Record<EventLifecycle, string> = {
  upcoming: 'admin.eventLifecycle.upcoming',
  ongoing: 'admin.eventLifecycle.ongoing',
  past: 'admin.eventLifecycle.past',
  draft: 'admin.eventLifecycle.draft',
  cancelled: 'admin.eventLifecycle.cancelled',
};

/** Badge label for admin lists: publication + date-derived lifecycle. */
export const translateEventLifecycle = (
  event: { date: string; status: string },
  t: TFunction,
): string => {
  const lifecycle = getEventLifecycle(event);
  return t(LIFECYCLE_KEYS[lifecycle]);
};

export const getEventLifecycleStyle = (event: { date: string; status: string }) => {
  const lifecycle = getEventLifecycle(event);

  if (lifecycle === 'ongoing') {
    return {
      icon: 'ri-live-line',
      className: 'border-red-200 bg-red-50 text-red-800',
    };
  }
  if (lifecycle === 'upcoming') {
    return {
      icon: 'ri-calendar-check-line',
      className: 'border-emerald-200 bg-emerald-50 text-emerald-800',
    };
  }
  if (lifecycle === 'draft') {
    return {
      icon: 'ri-draft-line',
      className: 'border-amber-200 bg-amber-50 text-amber-800',
    };
  }
  if (lifecycle === 'cancelled') {
    return {
      icon: 'ri-close-circle-line',
      className: 'border-red-200 bg-red-50 text-red-800',
    };
  }
  return {
    icon: 'ri-checkbox-circle-line',
    className: 'border-slate-200 bg-slate-50 text-slate-700',
  };
};

export const getPublicationLabel = (status: string, t: TFunction): string => {
  const publication = getPublicationStatus(status);
  if (publication === 'draft') return t('admin.eventPublication.draft');
  if (publication === 'cancelled') return t('admin.eventPublication.cancelled');
  if (publication === 'completed') return t('admin.eventPublication.completed');
  return t('admin.eventPublication.published');
};
