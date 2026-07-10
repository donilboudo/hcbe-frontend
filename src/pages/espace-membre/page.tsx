import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';
import { features } from '../../config/features';
import MemberLoginForm from './components/MemberLoginForm';

const fieldClassName =
  'w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm focus:border-transparent focus:ring-2 focus:ring-emerald-600';

const memberAdvantageKeys = [
  'public.member.advantages.items.events',
  'public.member.advantages.items.networking',
  'public.member.advantages.items.mentoring',
  'public.member.advantages.items.documents',
  'public.member.advantages.items.decisions',
  'public.member.advantages.items.support',
  'public.member.advantages.items.discounts',
  'public.member.advantages.items.newsletter',
] as const;

const provinces = [
  'Alberta',
  'Colombie-Britannique',
  'Manitoba',
  'Nouveau-Brunswick',
  'Terre-Neuve-et-Labrador',
  'Nouvelle-Écosse',
  'Ontario',
  'Île-du-Prince-Édouard',
  'Québec',
  'Saskatchewan',
];

const domainesProfessionnels = [
  "Technologies de l'information",
  'Santé et services sociaux',
  'Éducation et formation',
  'Finance et comptabilité',
  'Droit et services juridiques',
  'Ingénierie et sciences',
  'Commerce et gestion',
  'Arts et culture',
  'Construction et métiers',
  'Transport et logistique',
  'Autre',
];

const EspaceMembrePage = () => {
  const { t } = useTranslation();
  const [inscriptionData, setInscriptionData] = useState({
    prenom: '',
    nom: '',
    email: '',
    telephone: '',
    ville: '',
    province: '',
    profession: '',
    domaineProfessionnel: '',
    motivationAdhesion: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const updateField = (field: keyof typeof inscriptionData, value: string) => {
    setInscriptionData((current) => ({ ...current, [field]: value }));
  };

  const handleInscriptionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (inscriptionData.motivationAdhesion.length > 500) {
      alert('La motivation ne peut pas dépasser 500 caractères.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const formBody = new URLSearchParams();
      Object.entries(inscriptionData).forEach(([key, value]) => {
        formBody.append(key, value);
      });

      const response = await fetch('https://readdy.ai/api/form/d4m93jbifile0aqbfmmg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody.toString(),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setInscriptionData({
          prenom: '',
          nom: '',
          email: '',
          telephone: '',
          ville: '',
          province: '',
          profession: '',
          domaineProfessionnel: '',
          motivationAdhesion: '',
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

      <section className="relative isolate overflow-hidden bg-emerald-950 pt-24 text-white lg:pt-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_18%,rgba(252,209,22,0.16),transparent_28%),radial-gradient(circle_at_88%_12%,rgba(16,185,129,0.22),transparent_32%),linear-gradient(135deg,#022c22_0%,#064e3b_48%,#0f172a_100%)]" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-20 bg-gradient-to-t from-gray-50 to-transparent lg:h-28" />
        <div className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.85fr] lg:items-end lg:gap-12">
            <div>
              <div className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-emerald-50 backdrop-blur">
                <i className="ri-shield-user-line shrink-0" aria-hidden="true"></i>
                <span className="truncate">{t('public.member.hero.badge')}</span>
              </div>
              <h1 className="max-w-3xl text-balance break-words text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
                {t('public.member.hero.title')}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-emerald-50/90 sm:mt-7 sm:text-lg sm:leading-8">
                {t('public.member.hero.subtitle')}
              </p>
            </div>
            <div className="rounded-[1.75rem] border border-white/15 bg-white/[0.08] p-5 shadow-2xl shadow-black/20 backdrop-blur-xl sm:rounded-[2rem] sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-100 sm:text-sm">
                {t('public.member.hero.card.label')}
              </p>
              <p className="mt-4 text-lg font-bold sm:text-xl">{t('public.member.hero.card.title')}</p>
              <p className="mt-3 text-sm leading-6 text-white/75 sm:text-base sm:leading-7">
                {t('public.member.hero.card.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
            <aside className="space-y-6">
              {features.memberLoginEnabled && <MemberLoginForm />}

              <div className="rounded-[2rem] border border-gray-200 bg-white p-7 shadow-sm md:p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
                  {t('public.member.advantages.label')}
                </p>
                <h2 className="mt-3 text-2xl font-bold text-gray-950 sm:text-3xl">
                  {t('public.member.advantages.title')}
                </h2>
                <ul className="mt-6 space-y-4">
                  {memberAdvantageKeys.map((key) => (
                    <li key={key} className="flex items-start gap-3">
                      <i
                        className="ri-checkbox-circle-fill mt-0.5 shrink-0 text-lg text-emerald-600"
                        aria-hidden="true"
                      ></i>
                      <span className="text-sm leading-6 text-gray-700 sm:text-base">{t(key)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[2rem] border border-amber-200 bg-amber-50 p-7 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white">
                    <i className="ri-information-line text-2xl text-amber-600" aria-hidden="true"></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-950">{t('public.member.help.title')}</h3>
                    <p className="mt-2 text-sm leading-6 text-gray-700 sm:text-base">
                      {t('public.member.help.description')}
                    </p>
                    <Link
                      to="/contact"
                      className="mt-4 inline-flex items-center text-sm font-semibold text-emerald-700 hover:text-emerald-800"
                    >
                      {t('public.member.help.cta')}
                      <i className="ri-arrow-right-line ml-1" aria-hidden="true"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </aside>

            <div className="rounded-[2rem] border border-gray-200 bg-white p-7 shadow-sm md:p-8 lg:p-10">
              <div className="mb-8 border-b border-gray-100 pb-8">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
                  {t('public.member.form.label')}
                </p>
                <h2 className="mt-3 text-3xl font-bold text-gray-950">{t('public.member.form.title')}</h2>
                <p className="mt-3 text-sm leading-6 text-gray-600 sm:text-base">
                  {t('public.member.form.intro')}
                </p>
              </div>

              <form
                id="inscription-membre-form"
                data-readdy-form
                onSubmit={handleInscriptionSubmit}
                className="space-y-8"
              >
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-gray-950">{t('public.member.form.sections.contact')}</h3>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <label htmlFor="prenom" className="mb-2 block text-sm font-semibold text-gray-700">
                        {t('public.member.form.fields.firstName')} <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        id="prenom"
                        name="prenom"
                        value={inscriptionData.prenom}
                        onChange={(e) => updateField('prenom', e.target.value)}
                        required
                        className={fieldClassName}
                      />
                    </div>
                    <div>
                      <label htmlFor="nom" className="mb-2 block text-sm font-semibold text-gray-700">
                        {t('public.member.form.fields.lastName')} <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        id="nom"
                        name="nom"
                        value={inscriptionData.nom}
                        onChange={(e) => updateField('nom', e.target.value)}
                        required
                        className={fieldClassName}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <label htmlFor="email" className="mb-2 block text-sm font-semibold text-gray-700">
                        {t('public.member.form.fields.email')} <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={inscriptionData.email}
                        onChange={(e) => updateField('email', e.target.value)}
                        required
                        className={fieldClassName}
                      />
                    </div>
                    <div>
                      <label htmlFor="telephone" className="mb-2 block text-sm font-semibold text-gray-700">
                        {t('public.member.form.fields.phone')} <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="tel"
                        id="telephone"
                        name="telephone"
                        value={inscriptionData.telephone}
                        onChange={(e) => updateField('telephone', e.target.value)}
                        required
                        className={fieldClassName}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <label htmlFor="ville" className="mb-2 block text-sm font-semibold text-gray-700">
                        {t('public.member.form.fields.city')} <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        id="ville"
                        name="ville"
                        value={inscriptionData.ville}
                        onChange={(e) => updateField('ville', e.target.value)}
                        required
                        className={fieldClassName}
                      />
                    </div>
                    <div>
                      <label htmlFor="province" className="mb-2 block text-sm font-semibold text-gray-700">
                        {t('public.member.form.fields.province')} <span className="text-red-600">*</span>
                      </label>
                      <select
                        id="province"
                        name="province"
                        value={inscriptionData.province}
                        onChange={(e) => updateField('province', e.target.value)}
                        required
                        className={`${fieldClassName} cursor-pointer`}
                      >
                        <option value="">{t('public.member.form.select')}</option>
                        {provinces.map((prov) => (
                          <option key={prov} value={prov}>
                            {prov}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="space-y-6 border-t border-gray-100 pt-8">
                  <h3 className="text-lg font-bold text-gray-950">
                    {t('public.member.form.sections.professional')}
                  </h3>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <label htmlFor="profession" className="mb-2 block text-sm font-semibold text-gray-700">
                        {t('public.member.form.fields.profession')} <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        id="profession"
                        name="profession"
                        value={inscriptionData.profession}
                        onChange={(e) => updateField('profession', e.target.value)}
                        required
                        className={fieldClassName}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="domaineProfessionnel"
                        className="mb-2 block text-sm font-semibold text-gray-700"
                      >
                        {t('public.member.form.fields.domain')} <span className="text-red-600">*</span>
                      </label>
                      <select
                        id="domaineProfessionnel"
                        name="domaineProfessionnel"
                        value={inscriptionData.domaineProfessionnel}
                        onChange={(e) => updateField('domaineProfessionnel', e.target.value)}
                        required
                        className={`${fieldClassName} cursor-pointer`}
                      >
                        <option value="">{t('public.member.form.select')}</option>
                        {domainesProfessionnels.map((domaine) => (
                          <option key={domaine} value={domaine}>
                            {domaine}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="motivationAdhesion" className="mb-2 block text-sm font-semibold text-gray-700">
                      {t('public.member.form.fields.motivation')} <span className="text-red-600">*</span>
                    </label>
                    <textarea
                      id="motivationAdhesion"
                      name="motivationAdhesion"
                      value={inscriptionData.motivationAdhesion}
                      onChange={(e) => updateField('motivationAdhesion', e.target.value)}
                      required
                      rows={5}
                      maxLength={500}
                      className={`${fieldClassName} resize-none`}
                      placeholder={t('public.member.form.motivation.placeholder')}
                    />
                    <p className="mt-2 text-xs text-gray-500">
                      {t('public.member.form.charCount', { count: inscriptionData.motivationAdhesion.length })}
                    </p>
                  </div>
                </div>

                {submitStatus === 'success' && (
                  <div className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                    <i className="ri-checkbox-circle-fill shrink-0 text-xl text-emerald-600" aria-hidden="true"></i>
                    <div>
                      <h4 className="font-semibold text-emerald-900">{t('public.member.form.success.title')}</h4>
                      <p className="mt-1 text-sm text-emerald-700">{t('public.member.form.success.message')}</p>
                    </div>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4">
                    <i className="ri-error-warning-fill shrink-0 text-xl text-red-600" aria-hidden="true"></i>
                    <div>
                      <h4 className="font-semibold text-red-900">{t('public.member.form.error.title')}</h4>
                      <p className="mt-1 text-sm text-red-700">{t('public.member.form.error.message')}</p>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex w-full items-center justify-center rounded-full bg-emerald-700 px-8 py-4 font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                >
                  {isSubmitting ? (
                    <>
                      <i className="ri-loader-4-line mr-2 animate-spin" aria-hidden="true"></i>
                      {t('public.member.form.submit.loading')}
                    </>
                  ) : (
                    <>
                      <i className="ri-send-plane-fill mr-2" aria-hidden="true"></i>
                      {t('public.member.form.submit.label')}
                    </>
                  )}
                </button>

                <p className="text-center text-xs leading-5 text-gray-500 sm:text-left">
                  {t('public.member.form.consent')}
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EspaceMembrePage;
