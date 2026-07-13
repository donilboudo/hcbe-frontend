export const NEWS_CATEGORIES = [
  'Communiqué Officiel',
  'Éducation',
  'Événement',
  'Service',
  'Solidarité',
  'Formation',
  'Annonce',
  'Partenariat',
] as const;

export type NewsCategory = (typeof NEWS_CATEGORIES)[number];

const NEWS_CATEGORY_LABEL_KEYS: Record<string, string> = {
  'Communiqué Officiel': 'public.news.categories.official.label',
  Éducation: 'public.news.categories.education.label',
  Événement: 'public.news.categories.event.label',
  Service: 'public.news.categories.service.label',
  Solidarité: 'public.news.categories.solidarity.label',
  Formation: 'public.news.categories.training.label',
  Annonce: 'public.news.categories.announcement.label',
  Partenariat: 'public.news.categories.partnership.label',
};

export const getNewsCategoryLabelKey = (category?: string): string | undefined => {
  if (!category) return undefined;
  return NEWS_CATEGORY_LABEL_KEYS[category];
};

export const getNewsCategoryStyle = (category?: string) => {
  const styles: Record<string, { accent: string; icon: string }> = {
    'Communiqué Officiel': { accent: 'from-slate-700 to-emerald-900', icon: 'ri-passport-line' },
    'Éducation': { accent: 'from-indigo-600 to-blue-800', icon: 'ri-graduation-cap-line' },
    'Événement': { accent: 'from-amber-500 to-orange-700', icon: 'ri-calendar-event-line' },
    Service: { accent: 'from-emerald-600 to-teal-800', icon: 'ri-file-shield-line' },
    Solidarité: { accent: 'from-red-600 to-orange-700', icon: 'ri-hand-heart-line' },
    Formation: { accent: 'from-violet-600 to-indigo-800', icon: 'ri-presentation-line' },
    Annonce: { accent: 'from-gray-700 to-slate-900', icon: 'ri-group-line' },
    Partenariat: { accent: 'from-cyan-600 to-emerald-800', icon: 'ri-handshake-line' },
  };

  return styles[category ?? ''] ?? { accent: 'from-emerald-700 to-emerald-950', icon: 'ri-newspaper-line' };
};

const EVENT_TYPE_LABEL_KEYS: Record<string, string> = {
  workshop: 'admin.events.type.workshop',
  conference: 'admin.events.type.conference',
  networking: 'admin.events.type.networking',
  training: 'admin.events.type.training',
  social: 'admin.events.type.social',
  other: 'admin.events.type.other',
};

export const getEventTypeLabelKey = (type?: string): string | undefined => {
  if (!type) return undefined;
  return EVENT_TYPE_LABEL_KEYS[type.toLowerCase()];
};

