export const getConsultationAccentClasses = (accentColor: string) => {
  if (accentColor === 'amber') {
    return {
      iconBg: 'bg-amber-50 text-amber-700',
      button: 'bg-amber-600 hover:bg-amber-700',
    };
  }

  return {
    iconBg: 'bg-emerald-50 text-emerald-700',
    button: 'bg-emerald-700 hover:bg-emerald-800',
  };
};
