import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const fieldClassName =
  'w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm focus:border-transparent focus:ring-2 focus:ring-emerald-600';

const MemberLoginForm = () => {
  const { t } = useTranslation();
  const [loginData, setLoginData] = useState({ email: '', password: '' });

  return (
    <div className="rounded-[2rem] border border-gray-200 bg-white p-7 shadow-sm md:p-8">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
          {t('public.member.login.badge')}
        </p>
        <h2 className="mt-3 text-2xl font-bold text-gray-950">{t('public.member.login.title')}</h2>
        <p className="mt-2 text-sm text-gray-600">{t('public.member.login.subtitle')}</p>
      </div>

      <form className="space-y-5">
        <div>
          <label htmlFor="login-email" className="mb-2 block text-sm font-semibold text-gray-700">
            {t('public.member.login.email')}
          </label>
          <input
            type="email"
            id="login-email"
            value={loginData.email}
            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
            className={fieldClassName}
            placeholder="votre.email@exemple.com"
          />
        </div>

        <div>
          <label htmlFor="login-password" className="mb-2 block text-sm font-semibold text-gray-700">
            {t('public.member.login.password')}
          </label>
          <input
            type="password"
            id="login-password"
            value={loginData.password}
            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            className={fieldClassName}
            placeholder="••••••••"
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              className="h-4 w-4 cursor-pointer rounded border-gray-300 text-emerald-600 focus:ring-emerald-600"
            />
            <span className="text-sm text-gray-700">{t('public.member.login.remember')}</span>
          </label>
          <button
            type="button"
            className="text-left text-sm font-semibold text-emerald-700 hover:text-emerald-800 sm:text-right"
          >
            {t('public.member.login.forgot')}
          </button>
        </div>

        <button
          type="submit"
          className="inline-flex w-full items-center justify-center rounded-full bg-gray-950 px-6 py-3 font-semibold text-white transition hover:bg-gray-800"
        >
          <i className="ri-login-circle-line mr-2" aria-hidden="true"></i>
          {t('public.member.login.submit')}
        </button>
      </form>
    </div>
  );
};

export default MemberLoginForm;
