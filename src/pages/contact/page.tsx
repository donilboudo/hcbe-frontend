import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';
import { SOCIAL_LINKS } from '../../lib/social-links';

const ContactPage = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    sujet: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const subjectOptions = useMemo(
    () => [
      { value: 'Adhésion', labelKey: 'public.contact.form.subject.membership' },
      { value: 'Services', labelKey: 'public.contact.form.subject.services' },
      { value: 'Événements', labelKey: 'public.contact.form.subject.events' },
      { value: 'Projets', labelKey: 'public.contact.form.subject.projects' },
      { value: 'Bénévolat', labelKey: 'public.contact.form.subject.volunteer' },
      { value: 'Partenariat', labelKey: 'public.contact.form.subject.partnership' },
      { value: 'Autre', labelKey: 'public.contact.form.subject.other' },
    ],
    [],
  );

  const faqItems = useMemo(
    () => [
      { questionKey: 'public.contact.faq.items.membership.q', answerKey: 'public.contact.faq.items.membership.a' },
      { questionKey: 'public.contact.faq.items.fees.q', answerKey: 'public.contact.faq.items.fees.a' },
      { questionKey: 'public.contact.faq.items.committees.q', answerKey: 'public.contact.faq.items.committees.a' },
      { questionKey: 'public.contact.faq.items.projects.q', answerKey: 'public.contact.faq.items.projects.a' },
      { questionKey: 'public.contact.faq.items.events.q', answerKey: 'public.contact.faq.items.events.a' },
      { questionKey: 'public.contact.faq.items.passport.q', answerKey: 'public.contact.faq.items.passport.a' },
    ],
    [],
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.message.length > 500) {
      alert(t('public.contact.form.validation.messageTooLong'));
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const formBody = new URLSearchParams();
      Object.entries(formData).forEach(([key, value]) => {
        formBody.append(key, value);
      });

      const response = await fetch('https://readdy.ai/api/form/d4m93jbifile0aqbfmn0', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody.toString(),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          nom: '',
          prenom: '',
          email: '',
          telephone: '',
          sujet: '',
          message: '',
        });
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-950">
      <Navbar />

      <section className="relative isolate overflow-hidden bg-emerald-950 pt-32 text-white">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_15%,rgba(252,209,22,0.18),transparent_28%),radial-gradient(circle_at_85%_10%,rgba(16,185,129,0.22),transparent_32%),linear-gradient(135deg,#022c22_0%,#064e3b_48%,#0f172a_100%)]" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-28 bg-gradient-to-t from-gray-50 to-transparent" />
        <div className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:items-end">
            <div>
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-emerald-50 backdrop-blur">
                <i className="ri-customer-service-line" aria-hidden="true"></i>
                {t('public.contact.hero.badge')}
              </div>
              <h1 className="max-w-4xl text-balance break-words text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
                {t('public.contact.hero.title')}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-emerald-50/90 sm:mt-7 sm:text-lg sm:leading-8">
                {t('public.contact.hero.subtitle')}
              </p>
            </div>
            <div className="rounded-[2rem] border border-white/15 bg-white/[0.08] p-6 shadow-2xl shadow-black/20 backdrop-blur-xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-100">
                {t('public.contact.hero.card.label')}
              </p>
              <p className="mt-4 text-2xl font-bold">{t('public.contact.hero.card.title')}</p>
              <p className="mt-4 leading-7 text-white/75">{t('public.contact.hero.card.description')}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-20 grid grid-cols-1 gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-[2rem] border border-gray-200 bg-white p-7 shadow-sm md:p-8">
              <h2 className="mb-8 text-3xl font-bold text-gray-950">{t('public.contact.form.title')}</h2>

              <form id="contact-form" data-readdy-form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="prenom" className="mb-2 block text-sm font-semibold text-gray-700">
                      {t('public.contact.form.fields.firstName')} <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="prenom"
                      name="prenom"
                      value={formData.prenom}
                      onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                      required
                      className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm focus:border-transparent focus:ring-2 focus:ring-emerald-600"
                    />
                  </div>
                  <div>
                    <label htmlFor="nom" className="mb-2 block text-sm font-semibold text-gray-700">
                      {t('public.contact.form.fields.lastName')} <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="nom"
                      name="nom"
                      value={formData.nom}
                      onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                      required
                      className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm focus:border-transparent focus:ring-2 focus:ring-emerald-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-semibold text-gray-700">
                      {t('public.contact.form.fields.email')} <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm focus:border-transparent focus:ring-2 focus:ring-emerald-600"
                    />
                  </div>
                  <div>
                    <label htmlFor="telephone" className="mb-2 block text-sm font-semibold text-gray-700">
                      {t('public.contact.form.fields.phone')}
                    </label>
                    <input
                      type="tel"
                      id="telephone"
                      name="telephone"
                      value={formData.telephone}
                      onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                      className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm focus:border-transparent focus:ring-2 focus:ring-emerald-600"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="sujet" className="mb-2 block text-sm font-semibold text-gray-700">
                    {t('public.contact.form.fields.subject')} <span className="text-red-600">*</span>
                  </label>
                  <select
                    id="sujet"
                    name="sujet"
                    value={formData.sujet}
                    onChange={(e) => setFormData({ ...formData, sujet: e.target.value })}
                    required
                    className="w-full cursor-pointer rounded-2xl border border-gray-300 px-4 py-3 text-sm focus:border-transparent focus:ring-2 focus:ring-emerald-600"
                  >
                    <option value="">{t('public.contact.form.subject.placeholder')}</option>
                    {subjectOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {t(option.labelKey)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-semibold text-gray-700">
                    {t('public.contact.form.fields.message')} <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={6}
                    maxLength={500}
                    className="w-full resize-none rounded-2xl border border-gray-300 px-4 py-3 text-sm focus:border-transparent focus:ring-2 focus:ring-emerald-600"
                    placeholder={t('public.contact.form.message.placeholder')}
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    {t('public.contact.form.charCount', { count: formData.message.length })}
                  </p>
                </div>

                {submitStatus === 'success' && (
                  <div className="flex items-start space-x-3 rounded-lg border border-emerald-200 bg-emerald-50 p-4">
                    <i className="ri-checkbox-circle-fill flex-shrink-0 text-xl text-emerald-600" aria-hidden="true"></i>
                    <div>
                      <h4 className="mb-1 font-semibold text-emerald-900">{t('public.contact.form.success.title')}</h4>
                      <p className="text-sm text-emerald-700">{t('public.contact.form.success.message')}</p>
                    </div>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="flex items-start space-x-3 rounded-lg border border-red-200 bg-red-50 p-4">
                    <i className="ri-error-warning-fill flex-shrink-0 text-xl text-red-600" aria-hidden="true"></i>
                    <div>
                      <h4 className="mb-1 font-semibold text-red-900">{t('public.contact.form.error.title')}</h4>
                      <p className="text-sm text-red-700">{t('public.contact.form.error.message')}</p>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full cursor-pointer rounded-full bg-emerald-700 px-8 py-4 font-semibold text-white shadow-lg transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <i className="ri-loader-4-line mr-2 animate-spin" aria-hidden="true"></i>
                      {t('public.contact.form.submit.loading')}
                    </>
                  ) : (
                    <>
                      <i className="ri-send-plane-fill mr-2" aria-hidden="true"></i>
                      {t('public.contact.form.submit.label')}
                    </>
                  )}
                </button>
              </form>
            </div>

            <div className="space-y-8">
              <div className="rounded-[2rem] border border-gray-200 bg-white p-8 shadow-sm">
                <h3 className="mb-6 text-2xl font-bold text-gray-950">{t('public.contact.coordinates.title')}</h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-100">
                      <i className="ri-mail-line text-2xl text-emerald-600" aria-hidden="true"></i>
                    </div>
                    <div>
                      <h4 className="mb-1 font-semibold text-gray-900">{t('public.contact.coordinates.email')}</h4>
                      <a href="mailto:contact@hcbecanada.org" className="cursor-pointer text-emerald-600 hover:text-emerald-700">
                        contact@hcbecanada.org
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-orange-100">
                      <i className="ri-map-pin-line text-2xl text-orange-600" aria-hidden="true"></i>
                    </div>
                    <div>
                      <h4 className="mb-1 font-semibold text-gray-900">{t('public.contact.coordinates.address')}</h4>
                      <p className="text-gray-600">{t('public.contact.coordinates.country')}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-[2rem] border border-gray-200 bg-white p-8 shadow-sm">
                <h3 className="mb-4 text-xl font-bold text-gray-900">{t('public.contact.links.title')}</h3>
                <ul className="space-y-3">
                  <li>
                    <a href="https://ambabf-ca.org/home-en/" target="_blank" rel="noopener noreferrer" className="flex cursor-pointer items-center text-gray-700 transition-colors hover:text-emerald-600">
                      <i className="ri-external-link-line mr-2" aria-hidden="true"></i>
                      {t('public.contact.links.embassy')}
                    </a>
                  </li>
                  <li>
                    <a href="https://www.canada.ca/fr/immigration-refugies-citoyennete.html" target="_blank" rel="noopener noreferrer" className="flex cursor-pointer items-center text-gray-700 transition-colors hover:text-emerald-600">
                      <i className="ri-external-link-line mr-2" aria-hidden="true"></i>
                      {t('public.contact.links.ircc')}
                    </a>
                  </li>
                  <li>
                    <a href="https://www.canada.ca" target="_blank" rel="noopener noreferrer" className="flex cursor-pointer items-center text-gray-700 transition-colors hover:text-emerald-600">
                      <i className="ri-external-link-line mr-2" aria-hidden="true"></i>
                      {t('public.contact.links.govCanada')}
                    </a>
                  </li>
                </ul>
              </div>

              <div className="rounded-[2rem] border border-gray-200 bg-white p-8 shadow-sm">
                <h3 className="mb-4 text-xl font-bold text-gray-900">{t('public.contact.social.title')}</h3>
                <p className="mb-5 text-sm leading-6 text-gray-600">{t('public.contact.social.intro')}</p>
                <ul className="space-y-3">
                  {SOCIAL_LINKS.map((network) => (
                    <li key={network.id}>
                      <a
                        href={network.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex cursor-pointer items-center text-gray-700 transition-colors hover:text-emerald-600"
                      >
                        <i className={`${network.iconClass} mr-2 text-xl`} aria-hidden="true"></i>
                        {network.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div>
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900">{t('public.contact.faq.title')}</h2>
              <p className="text-gray-600">{t('public.contact.faq.subtitle')}</p>
            </div>

            <div className="mx-auto max-w-4xl space-y-4">
              {faqItems.map((item, index) => (
                <div key={item.questionKey} className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                    className="flex w-full cursor-pointer items-center justify-between px-6 py-5 text-left transition-colors hover:bg-gray-50"
                  >
                    <span className="pr-4 font-semibold text-gray-900">{t(item.questionKey)}</span>
                    <i
                      className={`ri-arrow-${openFaqIndex === index ? 'up' : 'down'}-s-line flex-shrink-0 text-2xl text-emerald-600`}
                      aria-hidden="true"
                    ></i>
                  </button>
                  {openFaqIndex === index && (
                    <div className="px-6 pb-5">
                      <p className="leading-relaxed text-gray-600">{t(item.answerKey)}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
