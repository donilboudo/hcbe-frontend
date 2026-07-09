const parseBooleanEnv = (value: string | undefined, defaultValue: boolean): boolean => {
  if (value === undefined || value === '') {
    return defaultValue;
  }

  return value === 'true' || value === '1';
};

export const features = {
  /** Affiche le formulaire de connexion sur la page Espace Membre */
  memberLoginEnabled: parseBooleanEnv(import.meta.env.VITE_ENABLE_MEMBER_LOGIN, false),
} as const;
