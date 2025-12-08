import { useState } from 'react';

const ComitesSection = () => {
  const [activeComite, setActiveComite] = useState<number | null>(null);

  const comites = [
    {
      id: 1,
      nom: 'Comité Juridique',
      icon: 'ri-scales-3-line',
      color: 'emerald',
      image: 'https://readdy.ai/api/search-image?query=Professional%20Canadian%20law%20office%20interior%20with%20legal%20books%20and%20Canadian%20flag%2C%20modern%20immigration%20lawyer%20consultation%20room%20with%20maple%20leaf%20decorations%2C%20warm%20professional%20lighting%20creating%20trust%20and%20expertise%2C%20representing%20Canadian%20immigration%20legal%20services%20and%20community%20support%20in%20Toronto%20or%20Montreal&width=800&height=600&seq=comite-juridique-canada-001&orientation=landscape',
      description: 'Accompagnement juridique complet pour tous vos besoins en matière d\'immigration et de démarches administratives au Canada.',
      services: [
        'Conseils juridiques en droit de l\'immigration',
        'Accompagnement pour les demandes de résidence permanente',
        'Assistance pour les demandes de citoyenneté canadienne',
        'Conseils pour les permis de travail et d\'études',
        'Orientation pour les démarches de parrainage familial',
        'Représentation lors de procédures administratives',
      ],
      note: 'Services offerts moyennant des frais d\'honoraires professionnels',
      contact: 'juridique@hcbecanada.org',
    },
    {
      id: 2,
      nom: 'Comité Ressources Humaines',
      icon: 'ri-user-settings-line',
      color: 'amber',
      image: 'https://readdy.ai/api/search-image?query=Professional%20career%20counseling%20session%20with%20mentor%20and%20mentee%20in%20modern%20office%2C%20diverse%20professionals%20networking%20and%20discussing%20career%20development%2C%20bright%20natural%20lighting%20creating%20positive%20atmosphere%2C%20representing%20professional%20guidance%20and%20mentorship&width=800&height=600&seq=comite-rh-001&orientation=landscape',
      description: 'Soutien professionnel pour votre développement de carrière et votre intégration dans le marché du travail canadien.',
      services: [
        'Orientation et conseils professionnels personnalisés',
        'Révision et optimisation de CV et lettres de motivation',
        'Préparation aux entrevues d\'embauche',
        'Accompagnement pour la recherche d\'emploi',
        'Programme de mentorat professionnel',
        'Réseautage et mise en contact avec des employeurs',
        'Ateliers de développement des compétences',
        'Conseils pour l\'équivalence des diplômes',
      ],
      note: 'Services gratuits pour tous les membres',
      contact: 'rh@hcbecanada.org',
    },
    {
      id: 3,
      nom: 'Comité SONGRÉ',
      icon: 'ri-hand-heart-line',
      color: 'orange',
      image: 'https://readdy.ai/api/search-image?query=Community%20support%20and%20solidarity%20concept%20with%20people%20helping%20each%20other%2C%20warm%20compassionate%20atmosphere%20with%20diverse%20African%20community%20members%2C%20soft%20lighting%20creating%20sense%20of%20care%20and%20mutual%20aid%2C%20representing%20social%20support%20and%20emergency%20assistance&width=800&height=600&seq=comite-songre-001&orientation=landscape',
      description: 'Soutien social et solidarité communautaire pour faire face aux situations difficiles et aux urgences.',
      services: [
        'Aide d\'urgence en cas de détresse',
        'Soutien financier et matériel en cas de décès',
        'Accompagnement lors de situations de crise',
        'Mobilisation communautaire pour les membres en difficulté',
        'Soutien psychosocial et écoute',
        'Coordination des funérailles et rapatriement',
        'Assistance pour les familles endeuillées',
        'Réseau de solidarité et d\'entraide',
      ],
      note: 'Services de solidarité communautaire',
      contact: 'songre@hcbecanada.org',
    },
    {
      id: 4,
      nom: 'Comité Finance',
      icon: 'ri-money-dollar-circle-line',
      color: 'emerald',
      image: 'https://readdy.ai/api/search-image?query=Financial%20planning%20consultation%20with%20professional%20advisor%20and%20client%20reviewing%20documents%2C%20modern%20financial%20office%20with%20charts%20and%20planning%20materials%2C%20professional%20lighting%20creating%20trust%20and%20expertise%2C%20representing%20financial%20education%20and%20personal%20finance%20guidance&width=800&height=600&seq=comite-finance-001&orientation=landscape',
      description: 'Éducation financière et accompagnement pour une gestion saine de vos finances personnelles au Canada.',
      services: [
        'Ateliers d\'éducation financière',
        'Conseils pour la gestion budgétaire',
        'Orientation pour l\'épargne et les investissements',
        'Accompagnement pour l\'accès au crédit',
        'Conseils pour l\'achat d\'une première maison',
        'Planification financière personnelle',
        'Information sur les produits financiers canadiens',
        'Conseils pour la déclaration d\'impôts',
      ],
      note: 'Services gratuits et ateliers réguliers',
      contact: 'finance@hcbecanada.org',
    },
  ];

  const colorClasses = {
    emerald: {
      bg: 'bg-gray-50',
      text: 'text-emerald-600',
      button: 'bg-emerald-600 hover:bg-emerald-700',
      border: 'border-emerald-600',
      iconBg: 'bg-gray-100',
    },
    amber: {
      bg: 'bg-white',
      text: 'text-emerald-600',
      button: 'bg-emerald-600 hover:bg-emerald-700',
      border: 'border-emerald-600',
      iconBg: 'bg-gray-100',
    },
    orange: {
      bg: 'bg-gray-50',
      text: 'text-emerald-600',
      button: 'bg-emerald-600 hover:bg-emerald-700',
      border: 'border-emerald-600',
      iconBg: 'bg-gray-100',
    },
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Nos Comités Spécialisés
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Quatre comités dédiés pour répondre à tous vos besoins d'accompagnement
          </p>
        </div>

        <div className="space-y-8">
          {comites.map((comite) => (
            <div
              key={comite.id}
              className={`${
                colorClasses[comite.color as keyof typeof colorClasses].bg
              } rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all border border-gray-200`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="relative h-80 lg:h-auto w-full">
                  <img
                    src={comite.image}
                    alt={comite.nom}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-6 left-6">
                    <div
                      className={`inline-flex items-center space-x-3 bg-white rounded-xl px-6 py-3 shadow-lg`}
                    >
                      <div
                        className={`w-12 h-12 ${
                          colorClasses[comite.color as keyof typeof colorClasses].iconBg
                        } rounded-lg flex items-center justify-center`}
                      >
                        <i
                          className={`${comite.icon} text-2xl ${
                            colorClasses[comite.color as keyof typeof colorClasses].text
                          }`}
                        ></i>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">{comite.nom}</h3>
                    </div>
                  </div>
                </div>

                <div className="p-8 lg:p-10">
                  <p className="text-gray-700 text-base leading-relaxed mb-6">
                    {comite.description}
                  </p>

                  <div className="mb-6">
                    <button
                      onClick={() => setActiveComite(activeComite === comite.id ? null : comite.id)}
                      className={`flex items-center justify-between w-full px-6 py-4 ${
                        colorClasses[comite.color as keyof typeof colorClasses].button
                      } text-white rounded-lg font-semibold transition-colors whitespace-nowrap`}
                    >
                      <span>
                        <i className="ri-list-check mr-2"></i>
                        {activeComite === comite.id ? 'Masquer les services' : 'Voir tous les services'}
                      </span>
                      <i
                        className={`ri-arrow-${
                          activeComite === comite.id ? 'up' : 'down'
                        }-s-line text-xl`}
                      ></i>
                    </button>
                  </div>

                  {activeComite === comite.id && (
                    <div className="bg-white rounded-xl p-6 mb-6 border-2 border-gray-100">
                      <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                        <i className="ri-checkbox-circle-line mr-2 text-emerald-600"></i>
                        Services disponibles
                      </h4>
                      <ul className="space-y-3">
                        {comite.services.map((service, idx) => (
                          <li key={idx} className="flex items-start space-x-3">
                            <i
                              className={`ri-arrow-right-s-line text-lg ${
                                colorClasses[comite.color as keyof typeof colorClasses].text
                              } flex-shrink-0 mt-0.5`}
                            ></i>
                            <span className="text-gray-700 text-sm">{service}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="bg-white rounded-xl p-4 mb-6 border-l-4 border-gray-300">
                    <p className="text-sm text-gray-600">
                      <i className="ri-information-line mr-2"></i>
                      <strong>Note :</strong> {comite.note}
                    </p>
                  </div>

                  <a
                    href={`mailto:${comite.contact}`}
                    className="inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors whitespace-nowrap cursor-pointer"
                  >
                    <i className="ri-mail-line mr-2"></i>
                    Contacter le comité
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComitesSection;
