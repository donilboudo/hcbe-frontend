import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../contexts/AuthContext';
import { LanguageSwitcher } from '../../../components/admin/LanguageSwitcher';
import { HcbeLogoMark } from '../../../components/brand/HcbeLogo';

const fieldClassName =
  'w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm text-gray-900 focus:border-transparent focus:ring-2 focus:ring-emerald-600';

export const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const { login, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/admin/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await login(email, password);

      if (result.success) {
        const storedUser = localStorage.getItem('hcbe_user');
        const loggedInUser = storedUser ? JSON.parse(storedUser) : null;

        if (!loggedInUser?.isAdmin) {
          logout();
          setError(t('admin.login.notAdmin'));
          return;
        }

        navigate(from, { replace: true });
      } else {
        setError(result.message || t('admin.login.failed'));
      }
    } catch {
      setError(t('admin.common.errorUnexpected'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-950 lg:grid lg:grid-cols-2">
      <section className="relative hidden overflow-hidden bg-emerald-950 text-white lg:flex lg:flex-col lg:justify-between lg:px-12 lg:py-10 xl:px-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(252,209,22,0.14),transparent_28%),radial-gradient(circle_at_85%_12%,rgba(16,185,129,0.22),transparent_32%),linear-gradient(135deg,#022c22_0%,#064e3b_48%,#0f172a_100%)]" />

        <div className="relative flex items-center justify-between gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-50/90 transition hover:text-white"
          >
            <i className="ri-arrow-left-line" aria-hidden="true"></i>
            {t('admin.login.backToSite')}
          </Link>
          <LanguageSwitcher variant="onDark" />
        </div>

        <div className="relative max-w-lg">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-100">
            {t('admin.login.badge')}
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight xl:text-5xl">
            {t('admin.login.title')}
          </h1>
          <p className="mt-5 text-base leading-7 text-emerald-50/90">
            {t('admin.login.subtitle')}
          </p>

          <div className="mt-8 rounded-[1.75rem] border border-white/15 bg-white/[0.08] p-5 backdrop-blur-xl">
            <p className="text-sm font-semibold text-white">{t('admin.login.secureAccess')}</p>
            <p className="mt-2 text-sm leading-6 text-white/75">{t('admin.login.secureAccessHint')}</p>
          </div>
        </div>

        <p className="relative text-xs text-emerald-100/70">
          HCBE Canada — {t('admin.login.badge')}
        </p>
      </section>

      <section className="flex min-h-screen flex-col justify-center px-4 py-10 sm:px-8 lg:px-10 xl:px-16">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-6 flex items-center justify-between lg:hidden">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800"
            >
              <i className="ri-arrow-left-line" aria-hidden="true"></i>
              {t('admin.login.backToSite')}
            </Link>
            <LanguageSwitcher />
          </div>

          <div className="mb-6 rounded-[1.75rem] bg-gradient-to-br from-emerald-950 to-emerald-800 p-6 text-white lg:hidden">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-100">
              {t('admin.login.badge')}
            </p>
            <h1 className="mt-3 text-2xl font-bold">{t('admin.login.title')}</h1>
            <p className="mt-2 text-sm leading-6 text-emerald-50/90">{t('admin.login.subtitle')}</p>
          </div>

          <div className="rounded-[2rem] border border-gray-200 bg-white p-7 shadow-sm sm:p-8">
            <div className="mb-8">
              <HcbeLogoMark size="lg" className="mb-4" />
              <h2 className="text-2xl font-bold text-gray-950">{t('admin.login.signIn')}</h2>
              <p className="mt-2 text-sm text-gray-600">{t('admin.login.formHint')}</p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              {error && (
                <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
                  <i className="ri-error-warning-line mt-0.5 shrink-0 text-lg" aria-hidden="true"></i>
                  <span>{error}</span>
                </div>
              )}

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-semibold text-gray-700">
                  {t('admin.common.email')}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={fieldClassName}
                  placeholder={t('admin.login.emailPlaceholder')}
                />
              </div>

              <div>
                <label htmlFor="password" className="mb-2 block text-sm font-semibold text-gray-700">
                  {t('admin.common.password')}
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={fieldClassName}
                  placeholder={t('admin.login.passwordPlaceholder')}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex w-full items-center justify-center rounded-full bg-emerald-700 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    {t('admin.login.signingIn')}
                  </>
                ) : (
                  <>
                    <i className="ri-login-circle-line mr-2 text-lg" aria-hidden="true"></i>
                    {t('admin.login.signIn')}
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};
