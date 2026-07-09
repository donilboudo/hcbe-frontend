import type { TFunction } from 'i18next';

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

export const translateEventStatus = (status: string, t: TFunction): string => {
  const key = EVENT_STATUS_KEYS[status];
  return key ? t(key) : status;
};
