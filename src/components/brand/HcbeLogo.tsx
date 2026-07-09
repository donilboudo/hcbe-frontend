type HcbeLogoSize = 'sm' | 'md' | 'lg';

const markSizeClasses: Record<HcbeLogoSize, string> = {
  sm: 'h-9 px-2.5 text-[11px]',
  md: 'h-12 px-3 text-sm',
  lg: 'h-14 px-4 text-base',
};

interface HcbeLogoMarkProps {
  size?: HcbeLogoSize;
  className?: string;
}

export const HcbeLogoMark = ({ size = 'md', className = '' }: HcbeLogoMarkProps) => (
  <div
    className={`inline-flex shrink-0 items-center justify-center rounded-xl font-bold tracking-[0.14em] text-white shadow-sm ring-1 ring-white/35 bg-gradient-to-br from-red-600 via-amber-400 to-emerald-700 [text-shadow:0_1px_2px_rgba(0,0,0,0.35)] ${markSizeClasses[size]} ${className}`}
    aria-hidden="true"
  >
    HCBE
  </div>
);

interface HcbeLogoProps {
  size?: HcbeLogoSize;
  showWordmark?: boolean;
  titleClassName?: string;
  subtitle?: string;
  subtitleClassName?: string;
  className?: string;
}

export const HcbeLogo = ({
  size = 'md',
  showWordmark = true,
  titleClassName = 'font-bold text-lg text-gray-900',
  subtitle,
  subtitleClassName = 'text-xs text-gray-600',
  className = '',
}: HcbeLogoProps) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <HcbeLogoMark size={size} />
    {showWordmark && (
      <div className="min-w-0">
        <div className={titleClassName}>HCBE Canada</div>
        {subtitle && <div className={subtitleClassName}>{subtitle}</div>}
      </div>
    )}
  </div>
);
