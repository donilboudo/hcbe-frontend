import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { newsletterApi } from '../../lib/api/newsletter';
import type { SubscribeNewsletterRequest } from '../../lib/api/types';

const NewsletterSignup = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const source: SubscribeNewsletterRequest['source'] = location.pathname === '/' ? 'home' : 'footer';
  const preferredLanguage: SubscribeNewsletterRequest['preferredLanguage'] =
    i18n.language.startsWith('en') ? 'en' : 'fr';

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [consentAccepted, setConsentAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);

    if (!consentAccepted) {
      setError(t('public.newsletter.errorConsent'));
      return;
    }

    const payload: SubscribeNewsletterRequest = {
      fullName: fullName.trim(),
      email: email.trim(),
      preferredLanguage,
      consentAccepted: true,
      source,
    };

    try {
      setIsSubmitting(true);
      const response = await newsletterApi.subscribe(payload);
      if (response.success) {
        setIsSuccess(true);
        setFullName('');
        setEmail('');
        setConsentAccepted(false);
        return;
      }
      setError(response.message || t('public.newsletter.errorGeneric'));
    } catch (err) {
      console.error('Newsletter subscribe failed:', err);
      setError(t('public.newsletter.errorGeneric'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-emerald-950 py-16 text-white sm:py-20">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-800 text-2xl">
          <i className="ri-mail-send-line" aria-hidden="true"></i>
        </div>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {t('public.newsletter.homeTitle')}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-emerald-50/90 sm:text-lg sm:leading-8">
          {t('public.newsletter.homeSubtitle')}
        </p>

        {isSuccess ? (
          <div className="mx-auto mt-10 max-w-lg rounded-2xl border border-emerald-500/40 bg-emerald-900/50 px-6 py-5 text-emerald-100">
            <i className="ri-check-line mr-2" aria-hidden="true"></i>
            {t('public.newsletter.success')}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mx-auto mt-10 max-w-2xl text-left">
            <div className="grid gap-4 sm:grid-cols-[1fr_1fr_auto]">
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                placeholder={t('public.newsletter.fullName')}
                className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-emerald-100/50 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder={t('public.newsletter.email')}
                className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-emerald-100/50 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-emerald-950 transition hover:bg-emerald-50 disabled:opacity-60"
              >
                {isSubmitting ? t('public.newsletter.submitting') : t('public.newsletter.submit')}
              </button>
            </div>
            <label className="mt-4 flex items-start gap-3 text-sm leading-6 text-emerald-50/90">
              <input
                type="checkbox"
                checked={consentAccepted}
                onChange={(e) => setConsentAccepted(e.target.checked)}
                className="mt-1"
              />
              <span>
                {t('public.newsletter.consent')}{' '}
                <Link to="/confidentialite" className="font-semibold text-white underline-offset-2 hover:underline">
                  {t('public.newsletter.privacyLink')}
                </Link>
              </span>
            </label>
            {error && (
              <p className="mt-3 rounded-xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-100">
                {error}
              </p>
            )}
          </form>
        )}
      </div>
    </section>
  );
};

export default NewsletterSignup;
