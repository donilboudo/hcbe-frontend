import { useTranslation } from 'react-i18next';
import canadaFlag from '../../assets/flags/canada.png';

type InstitutionalFlagsVariant = 'hero' | 'footer';

interface InstitutionalFlagsProps {
  variant?: InstitutionalFlagsVariant;
  className?: string;
  showLabel?: boolean;
}

const BurkinaFasoFlag = ({ className = '' }: { className?: string }) => (
  <svg
    viewBox="0 0 36 24"
    className={className}
    role="img"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="36" height="12" fill="#EF2B2D" />
    <rect y="12" width="36" height="12" fill="#009E49" />
    <polygon
      points="18,7.2 19.3,11.2 23.5,11.2 20.1,13.7 21.4,17.7 18,15.2 14.6,17.7 15.9,13.7 12.5,11.2 16.7,11.2"
      fill="#FCD116"
    />
  </svg>
);

const CanadaFlag = ({ className = '' }: { className?: string }) => (
  <img
    src={canadaFlag}
    alt=""
    aria-hidden="true"
    className={`object-cover ${className}`}
  />
);

const variantClasses: Record<
  InstitutionalFlagsVariant,
  { wrap: string; burkina: string; canada: string; label: string; divider: string }
> = {
  hero: {
    wrap: 'mb-5 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-3.5 py-2 backdrop-blur',
    burkina: 'h-5 w-[30px] overflow-hidden rounded-sm shadow-sm ring-1 ring-white/25',
    canada: 'h-5 w-10 overflow-hidden rounded-sm shadow-sm ring-1 ring-white/25',
    label: 'text-xs font-medium tracking-wide text-emerald-50/90 sm:text-sm',
    divider: 'h-4 w-px bg-white/25',
  },
  footer: {
    wrap: 'mt-5 inline-flex items-center gap-3',
    burkina: 'h-5 w-[30px] overflow-hidden rounded-sm shadow-sm ring-1 ring-gray-200',
    canada: 'h-5 w-10 overflow-hidden rounded-sm shadow-sm ring-1 ring-gray-200',
    label: 'text-xs font-medium text-gray-600',
    divider: 'h-4 w-px bg-gray-300',
  },
};

export const InstitutionalFlags = ({
  variant = 'hero',
  className = '',
  showLabel = true,
}: InstitutionalFlagsProps) => {
  const { t } = useTranslation();
  const styles = variantClasses[variant];

  return (
    <div
      className={`${styles.wrap} ${className}`}
      role="group"
      aria-label={t('public.brand.flags.aria')}
    >
      <BurkinaFasoFlag className={styles.burkina} />
      <span className={styles.divider} aria-hidden="true" />
      <CanadaFlag className={styles.canada} />
      {showLabel && <span className={styles.label}>{t('public.brand.flags.label')}</span>}
    </div>
  );
};
