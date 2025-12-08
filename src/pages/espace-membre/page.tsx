import { useState } from 'react';
import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';

const EspaceMembrePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [inscriptionData, setInscriptionData] = useState({
    prenom: '',
    nom: '',
    email: '',
    telephone: '',
    dateNaissance: '',
    ville: '',
    province: '',
    profession: '',
    domaineProfessionnel: '',
    competences: '',
    diplomes: '',
    experienceProfessionnelle: '',
    motivationAdhesion: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

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
          dateNaissance: '',
          ville: '',
          province: '',
          profession: '',
          domaineProfessionnel: '',
          competences: '',
          diplomes: '',
          experienceProfessionnelle: '',
          motivationAdhesion: '',
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

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
    'Technologies de l\'information',
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

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://readdy.ai/api/search-image?query=Professional%20member%20portal%20concept%20with%20secure%20login%20and%20community%20access%20in%20modern%20digital%20interface%2C%20clean%20minimalist%20design%20with%20user%20profile%20symbols%20and%20connection%20elements%2C%20bright%20professional%20lighting%20creating%20sense%20of%20security%20and%20belonging%2C%20simple%20clean%20background&width=1920&height=800&seq=espace-membre-hero-001&orientation=landscape')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
            <i className="ri-shield-user-line text-white"></i>
            <span className="text-white font-semibold text-sm">Espace Sécurisé</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Espace Membre
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Accédez à votre espace personnel et profitez de tous les avantages réservés aux membres du HCBE Canada
          </p>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-login-circle-line text-3xl text-emerald-600"></i>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Connexion</h2>
                <p className="text-gray-600">Accédez à votre espace membre</p>
              </div>

              <form className="space-y-6">
                <div>
                  <label htmlFor="login-email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Adresse courriel
                  </label>
                  <input
                    type="email"
                    id="login-email"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-sm"
                    placeholder="votre.email@exemple.com"
                  />
                </div>

                <div>
                  <label htmlFor="login-password" className="block text-sm font-semibold text-gray-700 mb-2">
                    Mot de passe
                  </label>
                  <input
                    type="password"
                    id="login-password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-sm"
                    placeholder="••••••••"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-600 cursor-pointer"
                    />
                    <span className="text-sm text-gray-700">Se souvenir de moi</span>
                  </label>
                  <button type="button" className="text-sm text-emerald-600 hover:text-emerald-700 font-semibold cursor-pointer">
                    Mot de passe oublié ?
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-all shadow-lg whitespace-nowrap cursor-pointer"
                >
                  <i className="ri-login-circle-line mr-2"></i>
                  Se Connecter
                </button>
              </form>

              <div className="mt-8 pt-8 border-t border-gray-200 text-center">
                <p className="text-sm text-gray-600 mb-4">Pas encore membre ?</p>
                <button
                  onClick={() => setShowLoginForm(false)}
                  className="text-emerald-600 hover:text-emerald-700 font-semibold text-sm cursor-pointer"
                >
                  Créer un compte →
                </button>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Avantages Membres</h3>
                <ul className="space-y-4">
                  {[
                    'Accès prioritaire aux événements et formations',
                    'Réseautage avec des professionnels burkinabè',
                    'Opportunités de mentorat et d\'accompagnement',
                    'Accès aux documents et ressources exclusives',
                    'Participation aux décisions communautaires',
                    'Soutien dans vos projets personnels et professionnels',
                    'Réductions sur les services des comités',
                    'Newsletter et actualités en avant-première',
                  ].map((avantage, idx) => (
                    <li key={idx} className="flex items-start space-x-3">
                      <i className="ri-checkbox-circle-fill text-emerald-600 text-xl flex-shrink-0 mt-0.5"></i>
                      <span className="text-gray-700">{avantage}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <i className="ri-information-line text-2xl text-amber-600"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Besoin d'aide ?</h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Si vous rencontrez des difficultés pour vous connecter ou vous inscrire, notre équipe est là pour vous aider.
                    </p>
                    <button className="text-sm text-emerald-600 hover:text-emerald-700 font-semibold cursor-pointer">
                      Contacter le support →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-gray-200">
            <div className="text-center mb-12">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-user-add-line text-3xl text-emerald-600"></i>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Formulaire d'Inscription</h2>
              <p className="text-gray-600">Rejoignez la communauté HCBE Canada et bénéficiez de tous nos services</p>
            </div>

            <form id="inscription-membre-form" data-readdy-form onSubmit={handleInscriptionSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="prenom" className="block text-sm font-semibold text-gray-700 mb-2">
                    Prénom <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="prenom"
                    name="prenom"
                    value={inscriptionData.prenom}
                    onChange={(e) => setInscriptionData({ ...inscriptionData, prenom: e.target.value })}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="nom" className="block text-sm font-semibold text-gray-700 mb-2">
                    Nom <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="nom"
                    name="nom"
                    value={inscriptionData.nom}
                    onChange={(e) => setInscriptionData({ ...inscriptionData, nom: e.target.value })}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Courriel <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={inscriptionData.email}
                    onChange={(e) => setInscriptionData({ ...inscriptionData, email: e.target.value })}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="telephone" className="block text-sm font-semibold text-gray-700 mb-2">
                    Téléphone <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="tel"
                    id="telephone"
                    name="telephone"
                    value={inscriptionData.telephone}
                    onChange={(e) => setInscriptionData({ ...inscriptionData, telephone: e.target.value })}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="dateNaissance" className="block text-sm font-semibold text-gray-700 mb-2">
                    Date de naissance <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="date"
                    id="dateNaissance"
                    name="dateNaissance"
                    value={inscriptionData.dateNaissance}
                    onChange={(e) => setInscriptionData({ ...inscriptionData, dateNaissance: e.target.value })}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="ville" className="block text-sm font-semibold text-gray-700 mb-2">
                    Ville <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="ville"
                    name="ville"
                    value={inscriptionData.ville}
                    onChange={(e) => setInscriptionData({ ...inscriptionData, ville: e.target.value })}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="province" className="block text-sm font-semibold text-gray-700 mb-2">
                    Province <span className="text-red-600">*</span>
                  </label>
                  <select
                    id="province"
                    name="province"
                    value={inscriptionData.province}
                    onChange={(e) => setInscriptionData({ ...inscriptionData, province: e.target.value })}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-sm cursor-pointer"
                  >
                    <option value="">Sélectionnez</option>
                    {provinces.map(prov => (
                      <option key={prov} value={prov}>{prov}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Profil Professionnel</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="profession" className="block text-sm font-semibold text-gray-700 mb-2">
                      Profession actuelle <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="profession"
                      name="profession"
                      value={inscriptionData.profession}
                      onChange={(e) => setInscriptionData({ ...inscriptionData, profession: e.target.value })}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="domaineProfessionnel" className="block text-sm font-semibold text-gray-700 mb-2">
                      Domaine professionnel <span className="text-red-600">*</span>
                    </label>
                    <select
                      id="domaineProfessionnel"
                      name="domaineProfessionnel"
                      value={inscriptionData.domaineProfessionnel}
                      onChange={(e) => setInscriptionData({ ...inscriptionData, domaineProfessionnel: e.target.value })}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-sm cursor-pointer"
                    >
                      <option value="">Sélectionnez</option>
                      {domainesProfessionnels.map(domaine => (
                        <option key={domaine} value={domaine}>{domaine}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="competences" className="block text-sm font-semibold text-gray-700 mb-2">
                    Compétences principales
                  </label>
                  <input
                    type="text"
                    id="competences"
                    name="competences"
                    value={inscriptionData.competences}
                    onChange={(e) => setInscriptionData({ ...inscriptionData, competences: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-sm"
                    placeholder="Ex: Gestion de projet, Analyse de données, Marketing digital..."
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="diplomes" className="block text-sm font-semibold text-gray-700 mb-2">
                    Diplômes et certifications
                  </label>
                  <textarea
                    id="diplomes"
                    name="diplomes"
                    value={inscriptionData.diplomes}
                    onChange={(e) => setInscriptionData({ ...inscriptionData, diplomes: e.target.value })}
                    rows={3}
                    maxLength={500}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-sm resize-none"
                    placeholder="Listez vos diplômes et certifications..."
                  ></textarea>
                  <p className="text-xs text-gray-500 mt-1">{inscriptionData.diplomes.length}/500 caractères</p>
                </div>

                <div className="mb-6">
                  <label htmlFor="experienceProfessionnelle" className="block text-sm font-semibold text-gray-700 mb-2">
                    Expérience professionnelle
                  </label>
                  <textarea
                    id="experienceProfessionnelle"
                    name="experienceProfessionnelle"
                    value={inscriptionData.experienceProfessionnelle}
                    onChange={(e) => setInscriptionData({ ...inscriptionData, experienceProfessionnelle: e.target.value })}
                    rows={4}
                    maxLength={500}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-sm resize-none"
                    placeholder="Décrivez brièvement votre parcours professionnel..."
                  ></textarea>
                  <p className="text-xs text-gray-500 mt-1">{inscriptionData.experienceProfessionnelle.length}/500 caractères</p>
                </div>

                <div>
                  <label htmlFor="motivationAdhesion" className="block text-sm font-semibold text-gray-700 mb-2">
                    Motivation pour l'adhésion <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    id="motivationAdhesion"
                    name="motivationAdhesion"
                    value={inscriptionData.motivationAdhesion}
                    onChange={(e) => setInscriptionData({ ...inscriptionData, motivationAdhesion: e.target.value })}
                    required
                    rows={4}
                    maxLength={500}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-sm resize-none"
                    placeholder="Pourquoi souhaitez-vous devenir membre du HCBE Canada ?"
                  ></textarea>
                  <p className="text-xs text-gray-500 mt-1">{inscriptionData.motivationAdhesion.length}/500 caractères</p>
                </div>
              </div>

              {submitStatus === 'success' && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 flex items-start space-x-3">
                  <i className="ri-checkbox-circle-fill text-emerald-600 text-xl flex-shrink-0"></i>
                  <div>
                    <h4 className="font-semibold text-emerald-900 mb-1">Inscription réussie !</h4>
                    <p className="text-sm text-emerald-700">
                      Votre demande d'adhésion a été envoyée avec succès. Nous examinerons votre dossier et vous contacterons bientôt.
                    </p>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
                  <i className="ri-error-warning-fill text-red-600 text-xl flex-shrink-0"></i>
                  <div>
                    <h4 className="font-semibold text-red-900 mb-1">Erreur d'inscription</h4>
                    <p className="text-sm text-red-700">
                      Une erreur s'est produite. Veuillez réessayer plus tard.
                    </p>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <i className="ri-loader-4-line mr-2 animate-spin"></i>
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <i className="ri-send-plane-fill mr-2"></i>
                    Soumettre ma Demande d'Adhésion
                  </>
                )}
              </button>

              <p className="text-xs text-gray-500 text-center">
                En soumettant ce formulaire, vous acceptez que vos informations soient utilisées dans le cadre de votre adhésion au HCBE Canada.
              </p>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EspaceMembrePage;
