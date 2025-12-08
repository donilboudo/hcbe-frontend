import { useState } from 'react';

const EquipeSection = () => {
  const [selectedMember, setSelectedMember] = useState<number | null>(null);

  const equipe = [
    {
      id: 1,
      nom: 'Mâ Ouédraogo Diallo',
      poste: 'Co-Présidente en exercice',
      region: 'National',
      zone: 'Zone 1',
      photo: 'https://readdy.ai/api/search-image?query=Professional%20African%20businesswoman%20in%20elegant%20formal%20attire%20with%20confident%20smile%2C%20modern%20office%20setting%20with%20natural%20lighting%2C%20representing%20leadership%20and%20community%20engagement%2C%20high%20quality%20portrait%20photography%20with%20professional%20composition%20and%20inspiring%20presence&width=400&height=500&seq=equipe-copresidente-001&orientation=portrait',
      bio: 'Co-Présidente en exercice du HCBE Canada et Déléguée Titulaire de la Zone 1, avec une expertise reconnue dans le développement communautaire et l\'accompagnement des diasporas africaines.',
      email: 'm.ouedraogo@hcbecanada.org',
    },
    {
      id: 2,
      nom: 'Ismaël Aziz Daboné',
      poste: 'Co-Président',
      region: 'National',
      zone: 'Zone 2',
      photo: 'https://readdy.ai/api/search-image?query=Professional%20African%20businessman%20in%20formal%20suit%20standing%20confidently%20with%20warm%20smile%2C%20modern%20office%20background%20with%20natural%20lighting%2C%20representing%20leadership%20and%20community%20service%2C%20high%20quality%20portrait%20photography%20with%20professional%20composition%20and%20dignified%20presence&width=400&height=500&seq=equipe-copresident-001&orientation=portrait',
      bio: 'Co-Président du HCBE Canada et Délégué Titulaire de la Zone 2, spécialiste en gestion de projets communautaires et en mobilisation de la diaspora pour le développement.',
      email: 'i.dabone@hcbecanada.org',
    },
    {
      id: 3,
      nom: 'Ahmed Arnaud Dao',
      poste: 'Responsable à la communication et à la mobilisation',
      region: 'National',
      zone: 'Zone 2',
      photo: 'https://readdy.ai/api/search-image?query=Professional%20African%20male%20communications%20specialist%20in%20business%20attire%20with%20friendly%20smile%2C%20modern%20media%20office%20background%20with%20natural%20lighting%2C%20representing%20communication%20expertise%20and%20community%20engagement%2C%20high%20quality%20portrait%20photography%20with%20dynamic%20presence&width=400&height=500&seq=equipe-communication-001&orientation=portrait',
      bio: 'Responsable à la communication et à la mobilisation, également Délégué Suppléant de la Zone 2, expert en stratégies de communication et engagement communautaire.',
      email: 'a.dao@hcbecanada.org',
    },
    {
      id: 4,
      nom: 'Désiré Kaboré',
      poste: 'Responsable adjoint à la communication et à la mobilisation',
      region: 'National',
      zone: 'Zone 1',
      photo: 'https://readdy.ai/api/search-image?query=Professional%20African%20male%20communications%20coordinator%20in%20business%20casual%20attire%20with%20approachable%20smile%2C%20modern%20office%20background%20with%20natural%20lighting%2C%20representing%20media%20relations%20and%20community%20outreach%2C%20high%20quality%20portrait%20photography%20with%20engaging%20presence&width=400&height=500&seq=equipe-communication-adj-001&orientation=portrait',
      bio: 'Responsable adjoint à la communication et à la mobilisation, passionné par le développement des relations communautaires et la diffusion de l\'information.',
      email: 'd.kabore@hcbecanada.org',
    },
    {
      id: 5,
      nom: 'Yves Cédric Nana',
      poste: 'Rapporteur Sompoudbnoma',
      region: 'National',
      zone: 'Zone 2',
      photo: 'https://readdy.ai/api/search-image?query=Professional%20African%20male%20secretary%20in%20business%20suit%20with%20professional%20smile%2C%20modern%20administrative%20office%20background%20with%20natural%20lighting%2C%20representing%20documentation%20expertise%20and%20organization%2C%20high%20quality%20portrait%20photography%20with%20efficient%20presence&width=400&height=500&seq=equipe-rapporteur-001&orientation=portrait',
      bio: 'Rapporteur Sompoudbnoma du HCBE Canada, expert en documentation et gestion administrative des activités du conseil.',
      email: 'y.nana@hcbecanada.org',
    },
    {
      id: 6,
      nom: 'Sory Sacko',
      poste: 'Rapporteur adjoint',
      region: 'National',
      zone: 'Zone 1',
      photo: 'https://readdy.ai/api/search-image?query=Professional%20African%20male%20assistant%20secretary%20in%20business%20attire%20with%20confident%20smile%2C%20modern%20office%20background%20with%20natural%20lighting%2C%20representing%20administrative%20support%20and%20record%20keeping%2C%20high%20quality%20portrait%20photography%20with%20reliable%20presence&width=400&height=500&seq=equipe-rapporteur-adj-001&orientation=portrait',
      bio: 'Rapporteur adjoint, spécialisé dans la gestion documentaire et le suivi des procès-verbaux des réunions du conseil.',
      email: 's.sacko@hcbecanada.org',
    },
    {
      id: 7,
      nom: 'Ghislain Darga',
      poste: 'Trésorier',
      region: 'National',
      zone: 'Zone 2',
      photo: 'https://readdy.ai/api/search-image?query=Professional%20African%20male%20treasurer%20in%20business%20suit%20with%20trustworthy%20smile%2C%20modern%20financial%20office%20background%20with%20natural%20lighting%2C%20representing%20financial%20management%20and%20integrity%2C%20high%20quality%20portrait%20photography%20with%20reliable%20presence&width=400&height=500&seq=equipe-tresorier-002&orientation=portrait',
      bio: 'Trésorier du HCBE Canada, expert en gestion financière d\'organisations à but non lucratif et en planification budgétaire.',
      email: 'g.darga@hcbecanada.org',
    },
    {
      id: 8,
      nom: 'Ismaël Zeba',
      poste: 'Trésorier adjoint',
      region: 'National',
      zone: 'Zone 1',
      photo: 'https://readdy.ai/api/search-image?query=Professional%20African%20male%20assistant%20treasurer%20in%20business%20attire%20with%20professional%20smile%2C%20modern%20accounting%20office%20background%20with%20natural%20lighting%2C%20representing%20financial%20support%20and%20budget%20management%2C%20high%20quality%20portrait%20photography%20with%20dependable%20presence&width=400&height=500&seq=equipe-tresorier-adj-001&orientation=portrait',
      bio: 'Trésorier adjoint et Délégué Suppléant de la Zone 1, spécialisé en comptabilité et contrôle financier.',
      email: 'i.zeba@hcbecanada.org',
    },
    {
      id: 9,
      nom: 'Kady Moné',
      poste: 'Représentante des femmes',
      region: 'National',
      zone: 'Zone 1',
      photo: 'https://readdy.ai/api/search-image?query=Professional%20African%20woman%20advocate%20in%20elegant%20business%20attire%20with%20inspiring%20smile%2C%20modern%20community%20office%20background%20with%20natural%20lighting%2C%20representing%20women%20empowerment%20and%20leadership%2C%20high%20quality%20portrait%20photography%20with%20empowering%20presence&width=400&height=500&seq=equipe-femmes-001&orientation=portrait',
      bio: 'Représentante des femmes au sein du HCBE Canada, engagée dans la promotion des droits et du leadership féminin.',
      email: 'k.mone@hcbecanada.org',
    },
    {
      id: 10,
      nom: 'Mamouna Kaboré',
      poste: 'Représentante adjointe des femmes',
      region: 'National',
      zone: 'Zone 2',
      photo: 'https://readdy.ai/api/search-image?query=Professional%20African%20woman%20community%20leader%20in%20business%20casual%20attire%20with%20warm%20smile%2C%20modern%20office%20background%20with%20natural%20lighting%2C%20representing%20women%20advocacy%20and%20support%2C%20high%20quality%20portrait%20photography%20with%20compassionate%20presence&width=400&height=500&seq=equipe-femmes-adj-001&orientation=portrait',
      bio: 'Représentante adjointe des femmes, dévouée au soutien et à l\'autonomisation des femmes burkinabè au Canada.',
      email: 'm.kabore@hcbecanada.org',
    },
    {
      id: 11,
      nom: 'Fawziah Sawadogo',
      poste: 'Représentante des jeunes',
      region: 'National',
      zone: 'Zone 1',
      photo: 'https://readdy.ai/api/search-image?query=Professional%20young%20African%20woman%20youth%20leader%20in%20modern%20business%20attire%20with%20energetic%20smile%2C%20contemporary%20office%20background%20with%20natural%20lighting%2C%20representing%20youth%20engagement%20and%20innovation%2C%20high%20quality%20portrait%20photography%20with%20vibrant%20presence&width=400&height=500&seq=equipe-jeunes-001&orientation=portrait',
      bio: 'Représentante des jeunes au HCBE Canada, passionnée par l\'engagement de la jeunesse et le développement des talents.',
      email: 'f.sawadogo@hcbecanada.org',
    },
    {
      id: 12,
      nom: 'Gérard Ouédraogo',
      poste: 'Représentant adjoint des jeunes',
      region: 'National',
      zone: 'Zone 2',
      photo: 'https://readdy.ai/api/search-image?query=Professional%20young%20African%20man%20youth%20coordinator%20in%20business%20casual%20attire%20with%20enthusiastic%20smile%2C%20modern%20office%20background%20with%20natural%20lighting%2C%20representing%20youth%20mentorship%20and%20community%20building%2C%20high%20quality%20portrait%20photography%20with%20dynamic%20presence&width=400&height=500&seq=equipe-jeunes-adj-001&orientation=portrait',
      bio: 'Représentant adjoint des jeunes, engagé dans la mobilisation et l\'accompagnement de la jeunesse burkinabè.',
      email: 'g.ouedraogo@hcbecanada.org',
    },
    {
      id: 13,
      nom: 'Julien Tougouri',
      poste: 'Représentant des personnes âgées',
      region: 'National',
      zone: 'Zone 1',
      photo: 'https://readdy.ai/api/search-image?query=Professional%20senior%20African%20man%20elder%20representative%20in%20formal%20attire%20with%20wise%20smile%2C%20modern%20office%20background%20with%20natural%20lighting%2C%20representing%20wisdom%20and%20community%20guidance%2C%20high%20quality%20portrait%20photography%20with%20dignified%20presence&width=400&height=500&seq=equipe-aines-001&orientation=portrait',
      bio: 'Représentant des personnes âgées, gardien des valeurs traditionnelles et conseiller auprès de la communauté.',
      email: 'j.tougouri@hcbecanada.org',
    },
    {
      id: 14,
      nom: 'Bamory Traoré',
      poste: 'Représentant adjoint des personnes âgées',
      region: 'National',
      zone: 'Zone 2',
      photo: 'https://readdy.ai/api/search-image?query=Professional%20senior%20African%20man%20elder%20advisor%20in%20business%20attire%20with%20gentle%20smile%2C%20modern%20office%20background%20with%20natural%20lighting%2C%20representing%20experience%20and%20mentorship%2C%20high%20quality%20portrait%20photography%20with%20respectful%20presence&width=400&height=500&seq=equipe-aines-adj-001&orientation=portrait',
      bio: 'Représentant adjoint des personnes âgées, engagé dans le soutien et la valorisation des aînés de la communauté.',
      email: 'b.traore@hcbecanada.org',
    },
    {
      id: 15,
      nom: 'Hamadou Désiré Salgo',
      poste: 'Commissaire aux comptes',
      region: 'National',
      zone: 'Zone 1',
      photo: 'https://readdy.ai/api/search-image?query=Professional%20African%20male%20auditor%20in%20business%20suit%20with%20trustworthy%20smile%2C%20modern%20accounting%20office%20background%20with%20natural%20lighting%2C%20representing%20financial%20oversight%20and%20transparency%2C%20high%20quality%20portrait%20photography%20with%20authoritative%20presence&width=400&height=500&seq=equipe-commissaire-001&orientation=portrait',
      bio: 'Commissaire aux comptes du HCBE Canada, expert en audit et contrôle de gestion financière.',
      email: 'h.salgo@hcbecanada.org',
    },
    {
      id: 16,
      nom: 'Imranou Yaone',
      poste: 'Commissaire aux comptes',
      region: 'National',
      zone: 'Zone 2',
      photo: 'https://readdy.ai/api/search-image?query=Professional%20African%20male%20financial%20auditor%20in%20business%20attire%20with%20professional%20smile%2C%20modern%20audit%20office%20background%20with%20natural%20lighting%2C%20representing%20financial%20control%20and%20compliance%2C%20high%20quality%20portrait%20photography%20with%20meticulous%20presence&width=400&height=500&seq=equipe-commissaire-002&orientation=portrait',
      bio: 'Commissaire aux comptes, spécialisé en vérification financière et conformité des opérations du conseil.',
      email: 'i.yaone@hcbecanada.org',
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-emerald-100 px-4 py-2 rounded-full mb-4">
            <i className="ri-team-line text-emerald-600"></i>
            <span className="text-emerald-600 font-semibold text-sm">Notre Équipe</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Les Membres du Bureau Exécutif
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Une équipe dévouée au service de la communauté burkinabè au Canada
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {equipe.map((membre) => (
            <div
              key={membre.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all cursor-pointer group border border-gray-200 relative"
              onClick={() => setSelectedMember(membre.id)}
            >
              <div className="absolute top-4 right-4 z-10 bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                {membre.zone}
              </div>
              
              <div className="relative h-64 overflow-hidden">
                <img
                  src={membre.photo}
                  alt={membre.nom}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{membre.nom}</h3>
                <p className="text-emerald-600 font-semibold text-sm mb-3">{membre.poste}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedMember && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedMember(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {equipe
              .filter((m) => m.id === selectedMember)
              .map((membre) => (
                <div key={membre.id}>
                  <div className="relative h-80">
                    <img
                      src={membre.photo}
                      alt={membre.nom}
                      className="w-full h-full object-cover object-top"
                    />
                    <button
                      onClick={() => setSelectedMember(null)}
                      className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                    >
                      <i className="ri-close-line text-xl text-gray-900"></i>
                    </button>
                  </div>
                  <div className="p-8">
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">{membre.nom}</h3>
                    <p className="text-emerald-600 font-semibold mb-4">{membre.poste}</p>
                    <div className="flex items-center text-gray-600 mb-6">
                      <i className="ri-map-pin-line mr-2"></i>
                      <span>{membre.zone}</span>
                    </div>
                    <p className="text-gray-600 leading-relaxed mb-6">{membre.bio}</p>
                    <a
                      href={`mailto:${membre.email}`}
                      className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors whitespace-nowrap"
                    >
                      <i className="ri-mail-line mr-2"></i>
                      {membre.email}
                    </a>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default EquipeSection;
