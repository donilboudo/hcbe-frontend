import { useState } from 'react';
import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';

const ContactPage = () => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.message.length > 500) {
      alert('Le message ne peut pas dépasser 500 caractères.');
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
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqItems = [
    {
      question: 'Comment devenir membre du HCBE Canada ?',
      reponse: 'Pour devenir membre, vous devez remplir le formulaire d\'inscription disponible dans l\'Espace Membre. Votre demande sera examinée par notre comité et vous recevrez une réponse dans un délai de 2 semaines.',
    },
    {
      question: 'Quels sont les frais d\'adhésion ?',
      reponse: 'L\'adhésion au HCBE Canada est gratuite. Nous croyons en l\'accessibilité de nos services à tous les membres de la diaspora burkinabè au Canada.',
    },
    {
      question: 'Comment puis-je bénéficier des services des comités ?',
      reponse: 'Une fois membre, vous pouvez contacter directement les comités via leurs adresses courriels respectives. Certains services sont gratuits, d\'autres peuvent nécessiter des frais (notamment pour le Comité Juridique).',
    },
    {
      question: 'Comment puis-je contribuer aux projets communautaires ?',
      reponse: 'Vous pouvez contribuer de plusieurs façons : dons financiers, bénévolat, partage de compétences, ou participation aux événements de collecte de fonds. Consultez la section Engagement Communautaire pour plus de détails.',
    },
    {
      question: 'Le HCBE Canada organise-t-il des événements ?',
      reponse: 'Oui, nous organisons régulièrement des événements culturels, éducatifs et de réseautage. Consultez notre calendrier dans la section Actualités et Événements pour rester informé.',
    },
    {
      question: 'Comment puis-je renouveler mon passeport burkinabè ?',
      reponse: 'Pour le renouvellement de passeport, vous devez contacter l\'Ambassade du Burkina Faso au Canada. Nous pouvons vous orienter et vous fournir des informations, mais les démarches se font directement avec l\'Ambassade.',
    },
  ];

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://readdy.ai/api/search-image?query=Contact%20and%20communication%20concept%20with%20modern%20phone%20and%20email%20symbols%20in%20professional%20setting%2C%20minimalist%20design%20with%20welcoming%20elements%2C%20bright%20professional%20lighting%20creating%20accessible%20atmosphere%2C%20simple%20clean%20background&width=1920&height=800&seq=contact-hero-001&orientation=landscape')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
            <i className="ri-customer-service-line text-white"></i>
            <span className="text-white font-semibold text-sm">Nous Sommes à Votre Écoute</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Contactez-Nous
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Notre équipe est disponible pour répondre à toutes vos questions et vous accompagner dans vos démarches
          </p>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Envoyez-nous un Message</h2>
              
              <form id="contact-form" data-readdy-form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="prenom" className="block text-sm font-semibold text-gray-700 mb-2">
                      Prénom <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="prenom"
                      name="prenom"
                      value={formData.prenom}
                      onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
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
                      value={formData.nom}
                      onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
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
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="telephone" className="block text-sm font-semibold text-gray-700 mb-2">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      id="telephone"
                      name="telephone"
                      value={formData.telephone}
                      onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="sujet" className="block text-sm font-semibold text-gray-700 mb-2">
                    Sujet <span className="text-red-600">*</span>
                  </label>
                  <select
                    id="sujet"
                    name="sujet"
                    value={formData.sujet}
                    onChange={(e) => setFormData({ ...formData, sujet: e.target.value })}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-sm cursor-pointer"
                  >
                    <option value="">Sélectionnez un sujet</option>
                    <option value="Adhésion">Adhésion au HCBE</option>
                    <option value="Services">Services des comités</option>
                    <option value="Événements">Événements et activités</option>
                    <option value="Projets">Projets communautaires</option>
                    <option value="Bénévolat">Bénévolat</option>
                    <option value="Partenariat">Partenariat</option>
                    <option value="Autre">Autre</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Message <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={6}
                    maxLength={500}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-sm resize-none"
                    placeholder="Décrivez votre demande..."
                  ></textarea>
                  <p className="text-xs text-gray-500 mt-1">{formData.message.length}/500 caractères</p>
                </div>

                {submitStatus === 'success' && (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 flex items-start space-x-3">
                    <i className="ri-checkbox-circle-fill text-emerald-600 text-xl flex-shrink-0"></i>
                    <div>
                      <h4 className="font-semibold text-emerald-900 mb-1">Message envoyé !</h4>
                      <p className="text-sm text-emerald-700">
                        Nous avons bien reçu votre message et vous répondrons dans les plus brefs délais.
                      </p>
                    </div>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
                    <i className="ri-error-warning-fill text-red-600 text-xl flex-shrink-0"></i>
                    <div>
                      <h4 className="font-semibold text-red-900 mb-1">Erreur d'envoi</h4>
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
                      Envoyer le Message
                    </>
                  )}
                </button>
              </form>
            </div>

            <div className="space-y-8">
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Coordonnées</h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <i className="ri-mail-line text-2xl text-emerald-600"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Courriel</h4>
                      <a href="mailto:contact@hcbecanada.org" className="text-emerald-600 hover:text-emerald-700 cursor-pointer">
                        contact@hcbecanada.org
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <i className="ri-phone-line text-2xl text-amber-600"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Téléphone</h4>
                      <p className="text-gray-600">+1 (XXX) XXX-XXXX</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <i className="ri-map-pin-line text-2xl text-orange-600"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Adresse</h4>
                      <p className="text-gray-600">Canada</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Liens Utiles</h3>
                <ul className="space-y-3">
                  <li>
                    <a href="https://www.ambassadeburkina.ca" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-700 hover:text-emerald-600 transition-colors cursor-pointer">
                      <i className="ri-external-link-line mr-2"></i>
                      Ambassade du Burkina Faso au Canada
                    </a>
                  </li>
                  <li>
                    <a href="#" className="flex items-center text-gray-700 hover:text-emerald-600 transition-colors cursor-pointer">
                      <i className="ri-external-link-line mr-2"></i>
                      Consulat du Burkina Faso
                    </a>
                  </li>
                  <li>
                    <a href="https://www.canada.ca/fr/immigration-refugies-citoyennete.html" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-700 hover:text-emerald-600 transition-colors cursor-pointer">
                      <i className="ri-external-link-line mr-2"></i>
                      Immigration, Réfugiés et Citoyenneté Canada
                    </a>
                  </li>
                  <li>
                    <a href="https://www.canada.ca" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-700 hover:text-emerald-600 transition-colors cursor-pointer">
                      <i className="ri-external-link-line mr-2"></i>
                      Services gouvernementaux du Canada
                    </a>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Suivez-nous</h3>
                <div className="flex space-x-4">
                  <a href="#" className="w-12 h-12 bg-emerald-100 hover:bg-emerald-200 rounded-lg flex items-center justify-center transition-colors cursor-pointer">
                    <i className="ri-facebook-fill text-2xl text-emerald-600"></i>
                  </a>
                  <a href="#" className="w-12 h-12 bg-emerald-100 hover:bg-emerald-200 rounded-lg flex items-center justify-center transition-colors cursor-pointer">
                    <i className="ri-twitter-x-fill text-2xl text-emerald-600"></i>
                  </a>
                  <a href="#" className="w-12 h-12 bg-emerald-100 hover:bg-emerald-200 rounded-lg flex items-center justify-center transition-colors cursor-pointer">
                    <i className="ri-linkedin-fill text-2xl text-emerald-600"></i>
                  </a>
                  <a href="#" className="w-12 h-12 bg-emerald-100 hover:bg-emerald-200 rounded-lg flex items-center justify-center transition-colors cursor-pointer">
                    <i className="ri-youtube-fill text-2xl text-emerald-600"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Questions Fréquentes</h2>
              <p className="text-gray-600">Trouvez rapidement des réponses à vos questions</p>
            </div>

            <div className="max-w-4xl mx-auto space-y-4">
              {faqItems.map((item, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
                  <button
                    onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <span className="font-semibold text-gray-900 pr-4">{item.question}</span>
                    <i className={`ri-arrow-${openFaqIndex === index ? 'up' : 'down'}-s-line text-2xl text-emerald-600 flex-shrink-0`}></i>
                  </button>
                  {openFaqIndex === index && (
                    <div className="px-6 pb-5">
                      <p className="text-gray-600 leading-relaxed">{item.reponse}</p>
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
