import { useState } from 'react';
import { Link } from 'react-router-dom';

const ComitesSection = () => {
  const [activeComite, setActiveComite] = useState<number | null>(null);

  const comites = [
    {
      id: 1,
      nom: 'Comité Juridique',
      icon: 'ri-scales-3-line',
      color: 'emerald',
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
    },
    {
      id: 2,
      nom: 'Comité Ressources Humaines',
      icon: 'ri-user-settings-line',
      color: 'amber',
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
    },
    {
      id: 3,
      nom: 'Comité SONGRÉ',
      icon: 'ri-hand-heart-line',
      color: 'orange',
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
    },
    {
      id: 4,
      nom: 'Comité Finance',
      icon: 'ri-money-dollar-circle-line',
      color: 'emerald',
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
    },
  ];

  const colorClasses = {
    emerald: {
      gradient: 'from-emerald-700 to-emerald-950',
      text: 'text-emerald-700',
      ring: 'ring-emerald-100',
      iconBg: 'bg-emerald-50',
    },
    amber: {
      gradient: 'from-amber-500 to-orange-700',
      text: 'text-amber-700',
      ring: 'ring-amber-100',
      iconBg: 'bg-amber-50',
    },
    orange: {
      gradient: 'from-orange-600 to-red-700',
      text: 'text-orange-700',
      ring: 'ring-orange-100',
      iconBg: 'bg-orange-50',
    },
  };

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
              <i className="ri-service-line" aria-hidden="true"></i>
              Accompagnement structuré
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-gray-950 md:text-5xl">
              Quatre comités pour orienter les demandes au bon endroit.
            </h2>
          </div>
          <p className="text-lg leading-8 text-gray-600">
            Chaque comité répond à un besoin précis: démarches, carrière, solidarité ou finances.
            L'objectif est d'éviter les détours et de vous mettre rapidement en relation.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {comites.map((comite) => (
            <article
              key={comite.id}
              className="overflow-hidden rounded-[2rem] border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl"
            >
              <div className={`h-2 bg-gradient-to-r ${colorClasses[comite.color as keyof typeof colorClasses].gradient}`} />
              <div className="p-7 lg:p-8">
                <div className="flex items-start gap-5">
                  <div
                    className={`flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl ${
                      colorClasses[comite.color as keyof typeof colorClasses].iconBg
                    } text-3xl ${colorClasses[comite.color as keyof typeof colorClasses].text} ring-1 ${
                      colorClasses[comite.color as keyof typeof colorClasses].ring
                    }`}
                  >
                    <i className={comite.icon} aria-hidden="true"></i>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-950">{comite.nom}</h3>
                    <p className="mt-3 text-sm leading-6 text-gray-600">{comite.description}</p>
                  </div>
                </div>

                <div className="mt-7 rounded-2xl bg-gray-50 p-4 text-sm leading-6 text-gray-700">
                  <i className="ri-information-line mr-2 text-emerald-700" aria-hidden="true"></i>
                  <span className="font-semibold text-gray-950">Note:</span> {comite.note}
                </div>

                <button
                  onClick={() => setActiveComite(activeComite === comite.id ? null : comite.id)}
                  aria-expanded={activeComite === comite.id}
                  className="mt-6 flex w-full items-center justify-between rounded-full bg-gray-950 px-6 py-3 font-semibold text-white transition hover:bg-gray-800"
                >
                  {activeComite === comite.id ? 'Masquer les services' : 'Voir les services'}
                  <i className={`ri-arrow-${activeComite === comite.id ? 'up' : 'down'}-s-line text-xl`} aria-hidden="true"></i>
                </button>

                {activeComite === comite.id && (
                  <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-5">
                    <h4 className="mb-4 font-bold text-gray-950">Services disponibles</h4>
                    <ul className="grid gap-3 sm:grid-cols-2">
                      {comite.services.map((service) => (
                        <li key={service} className="flex items-start gap-3 text-sm leading-6 text-gray-700">
                          <i className="ri-checkbox-circle-line mt-0.5 flex-shrink-0 text-emerald-700" aria-hidden="true"></i>
                          {service}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <Link
                  to="/contact"
                  className="mt-6 inline-flex items-center rounded-full border border-gray-200 px-6 py-3 font-semibold text-gray-800 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-800"
                >
                  Contacter le comité
                  <i className="ri-mail-line ml-2" aria-hidden="true"></i>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComitesSection;
