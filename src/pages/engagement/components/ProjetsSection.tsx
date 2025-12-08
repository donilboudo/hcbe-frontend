const ProjetsSection = () => {
  const projets = [
    {
      id: 1,
      titre: 'Construction d\'une École Primaire à Ouagadougou',
      localisation: 'Ouagadougou, Burkina Faso',
      type: 'Développement au Burkina',
      statut: 'En cours',
      progression: 65,
      description: 'Construction d\'une école primaire de 6 classes pour accueillir 300 élèves dans le quartier périphérique de Tanghin. Le projet inclut également la construction de latrines, un point d\'eau et l\'équipement en mobilier scolaire.',
      image: 'https://readdy.ai/api/search-image?query=School%20construction%20project%20in%20African%20village%20with%20workers%20building%20classrooms%20in%20rural%20Burkina%20Faso%20setting%20with%20children%20watching%20excitedly%2C%20bright%20hopeful%20lighting%20creating%20sense%20of%20progress%20and%20education%20development%2C%20simple%20clean%20background&width=800&height=600&seq=projet-ecole-001&orientation=landscape',
      budget: '150 000 $ CAD',
      collecte: '97 500 $ CAD',
      beneficiaires: '300 élèves',
      debut: '2023-09',
      fin: '2024-06',
      partenaires: ['HCBE Canada', 'Ministère de l\'Éducation BF', 'Mairie de Ouagadougou'],
    },
    {
      id: 2,
      titre: 'Programme de Mentorat Professionnel',
      localisation: 'Canada (National)',
      type: 'Initiative Locale',
      statut: 'Actif',
      progression: 100,
      description: 'Programme de mentorat connectant des professionnels burkinabè établis avec de nouveaux arrivants pour faciliter leur intégration professionnelle au Canada. Plus de 50 paires mentor-mentoré ont été formées avec un taux de réussite de 85%.',
      image: 'https://readdy.ai/api/search-image?query=Professional%20mentorship%20program%20with%20African%20mentor%20and%20mentee%20in%20modern%20office%20discussing%20career%20development%2C%20bright%20professional%20lighting%20creating%20supportive%20collaborative%20atmosphere%2C%20simple%20clean%20background&width=800&height=600&seq=projet-mentorat-001&orientation=landscape',
      budget: '25 000 $ CAD',
      collecte: '25 000 $ CAD',
      beneficiaires: '100+ personnes',
      debut: '2023-01',
      fin: 'En continu',
      partenaires: ['HCBE Canada', 'Comité RH', 'Employeurs partenaires'],
    },
    {
      id: 3,
      titre: 'Centre de Santé Communautaire à Bobo-Dioulasso',
      localisation: 'Bobo-Dioulasso, Burkina Faso',
      type: 'Développement au Burkina',
      statut: 'Planification',
      progression: 20,
      description: 'Projet de construction d\'un centre de santé communautaire équipé pour offrir des soins de base, des consultations prénatales et des services de vaccination. Le centre desservira une population de plus de 5 000 personnes.',
      image: 'https://readdy.ai/api/search-image?query=Community%20health%20center%20project%20in%20African%20village%20with%20medical%20staff%20and%20patients%20at%20rural%20healthcare%20facility%20with%20basic%20medical%20equipment%2C%20warm%20caring%20lighting%20creating%20sense%20of%20health%20and%20wellbeing%2C%20simple%20clean%20background&width=800&height=600&seq=projet-sante-001&orientation=landscape',
      budget: '200 000 $ CAD',
      collecte: '40 000 $ CAD',
      beneficiaires: '5 000+ personnes',
      debut: '2024-06',
      fin: '2025-12',
      partenaires: ['HCBE Canada', 'Ministère de la Santé BF', 'ONG partenaires'],
    },
    {
      id: 4,
      titre: 'Fonds d\'Urgence Communautaire',
      localisation: 'Canada (National)',
      type: 'Initiative Locale',
      statut: 'Actif',
      progression: 100,
      description: 'Fonds de solidarité pour venir en aide aux membres de la communauté burkinabè en situation d\'urgence (décès, maladie grave, catastrophe). Le fonds a déjà aidé 25 familles en difficulté.',
      image: 'https://readdy.ai/api/search-image?query=Community%20emergency%20fund%20support%20with%20volunteers%20helping%20families%20in%20need%20in%20compassionate%20community%20center%20setting%20with%20people%20receiving%20assistance%2C%20warm%20supportive%20lighting%20creating%20sense%20of%20solidarity%20and%20care%2C%20simple%20clean%20background&width=800&height=600&seq=projet-urgence-001&orientation=landscape',
      budget: '50 000 $ CAD',
      collecte: '50 000 $ CAD',
      beneficiaires: '25 familles',
      debut: '2022-01',
      fin: 'En continu',
      partenaires: ['HCBE Canada', 'Comité SONGRÉ', 'Donateurs privés'],
    },
    {
      id: 5,
      titre: 'Projet d\'Électrification Solaire Rurale',
      localisation: 'Province du Yatenga, Burkina Faso',
      type: 'Développement au Burkina',
      statut: 'En cours',
      progression: 45,
      description: 'Installation de systèmes solaires dans 10 villages ruraux pour fournir l\'électricité aux écoles, centres de santé et foyers. Le projet vise à améliorer les conditions de vie et faciliter l\'accès à l\'éducation et aux soins.',
      image: 'https://readdy.ai/api/search-image?query=Solar%20panel%20installation%20project%20in%20rural%20African%20village%20with%20technicians%20working%20on%20rooftops%20in%20sunny%20rural%20Burkina%20Faso%20landscape%20with%20villagers%20watching%2C%20bright%20optimistic%20lighting%20creating%20sense%20of%20sustainable%20development%2C%20simple%20clean%20background&width=800&height=600&seq=projet-solaire-001&orientation=landscape',
      budget: '180 000 $ CAD',
      collecte: '81 000 $ CAD',
      beneficiaires: '10 villages',
      debut: '2023-06',
      fin: '2024-12',
      partenaires: ['HCBE Canada', 'Agence Nationale des Énergies Renouvelables', 'Bailleurs internationaux'],
    },
    {
      id: 6,
      titre: 'Programme d\'Alphabétisation des Femmes',
      localisation: 'Canada et Burkina Faso',
      type: 'Développement au Burkina',
      statut: 'Actif',
      progression: 80,
      description: 'Programme d\'alphabétisation en français et en langues locales pour les femmes adultes au Burkina Faso, financé et coordonné par la diaspora. Plus de 200 femmes ont déjà bénéficié du programme.',
      image: 'https://readdy.ai/api/search-image?query=Women%20literacy%20program%20in%20African%20village%20with%20adult%20women%20learning%20to%20read%20and%20write%20in%20classroom%20setting%20with%20teacher%20and%20engaged%20students%2C%20warm%20encouraging%20lighting%20creating%20sense%20of%20empowerment%20and%20education%2C%20simple%20clean%20background&width=800&height=600&seq=projet-alphabetisation-001&orientation=landscape',
      budget: '35 000 $ CAD',
      collecte: '28 000 $ CAD',
      beneficiaires: '200+ femmes',
      debut: '2022-09',
      fin: '2024-09',
      partenaires: ['HCBE Canada', 'Femmes Burkinabè du Canada', 'Associations locales BF'],
    },
  ];

  const statutColors: { [key: string]: string } = {
    'En cours': 'bg-amber-50 text-amber-700 border border-amber-200',
    'Actif': 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    'Planification': 'bg-gray-100 text-gray-700 border border-gray-300',
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-emerald-50 px-4 py-2 rounded-full mb-4">
            <i className="ri-lightbulb-line text-emerald-600"></i>
            <span className="text-emerald-600 font-semibold text-sm">Nos Projets</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Projets Communautaires
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Découvrez nos initiatives de développement au Burkina Faso et au Canada
          </p>
        </div>

        <div className="space-y-8">
          {projets.map((projet) => (
            <div
              key={projet.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all border border-gray-200"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="relative h-80 lg:h-auto w-full">
                  <img
                    src={projet.image}
                    alt={projet.titre}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className={`px-4 py-2 rounded-full text-sm font-bold ${statutColors[projet.statut]}`}>
                      {projet.statut}
                    </span>
                    <span className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-bold text-gray-900 border border-gray-200">
                      {projet.type}
                    </span>
                  </div>
                </div>

                <div className="p-8 lg:p-10">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{projet.titre}</h3>
                  <div className="flex items-center text-gray-600 text-sm mb-6">
                    <i className="ri-map-pin-line mr-2 text-emerald-600"></i>
                    <span>{projet.localisation}</span>
                  </div>

                  <p className="text-gray-700 leading-relaxed mb-6">{projet.description}</p>

                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold text-gray-700">Progression</span>
                      <span className="text-sm font-bold text-emerald-600">{projet.progression}%</span>
                    </div>
                    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-600 rounded-full transition-all"
                        style={{ width: `${projet.progression}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="text-xs text-gray-600 mb-1">Budget Total</div>
                      <div className="text-lg font-bold text-gray-900">{projet.budget}</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="text-xs text-gray-600 mb-1">Fonds Collectés</div>
                      <div className="text-lg font-bold text-emerald-600">{projet.collecte}</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="text-xs text-gray-600 mb-1">Bénéficiaires</div>
                      <div className="text-lg font-bold text-gray-900">{projet.beneficiaires}</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="text-xs text-gray-600 mb-1">Période</div>
                      <div className="text-sm font-bold text-gray-900">{projet.debut} - {projet.fin}</div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">Partenaires</h4>
                    <div className="flex flex-wrap gap-2">
                      {projet.partenaires.map((partenaire, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-medium border border-emerald-200"
                        >
                          {partenaire}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button className="flex-1 px-6 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-all whitespace-nowrap cursor-pointer">
                      <i className="ri-hand-coin-line mr-2"></i>
                      Contribuer
                    </button>
                    <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors whitespace-nowrap cursor-pointer">
                      <i className="ri-information-line mr-2"></i>
                      Détails
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjetsSection;
