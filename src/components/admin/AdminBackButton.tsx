import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface AdminBackButtonProps {
  to: string;
  label?: string;
}

export const AdminBackButton = ({ to, label }: AdminBackButtonProps) => {
  const { t } = useTranslation();

  return (
    <Link
      to={to}
      className="group mb-5 inline-flex items-center gap-2.5 text-sm font-semibold text-gray-500 transition hover:text-emerald-800"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm transition group-hover:border-emerald-200 group-hover:bg-emerald-50 group-hover:text-emerald-700">
        <i className="ri-arrow-left-line text-lg" aria-hidden="true"></i>
      </span>
      {label ?? t('admin.common.backToList')}
    </Link>
  );
};
