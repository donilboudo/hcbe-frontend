import { useState } from 'react';

const AnnuaireSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('Toutes');

  const associations = [
    {
      id: 1,
      nom: 'Association Yam Taaba',
      province: 'Alberta',
      ville: 'Calgary',
      description: 'Association culturelle et sociale dédiée à la promotion de la culture burkinabè et au soutien des membres de la communauté.',
      domaines: ['Culture', 'Social', 'Éducation'],
      contact: 'contact@yamtaaba.ca',
      telephone: '+1 (403) XXX-XXXX',
      president: 'M. Souleymane Ouédraogo',
      membres: '85+',
      annee: '2015',
      image: 'https://readdy.ai/api/search-image?query=African%20cultural%20association%20group%20photo%20with%20diverse%20members%20in%20traditional%20attire%20gathered%20in%20modern%20community%20center%2C%20warm%20welcoming%20professional%20lighting%20creating%20sense%20of%20unity%20and%20pride%2C%20simple%20clean%20background&width=600&height=400&seq=assoc-yamtaaba-001&orientation=landscape',
    },
    {
      id: 2,
      nom: 'Burkinabè de Montréal',
      province: 'Québec',
      ville: 'Montréal',
      description: 'Regroupement des Burkinabè de la région de Montréal pour favoriser l\'entraide, l\'intégration et le développement communautaire.',
      domaines: ['Intégration', 'Entraide', 'Développement'],
      contact: 'info@burkinabemtl.org',
      telephone: '+1 (514) XXX-XXXX',
      president: 'Mme. Aminata Kaboré',
      membres: '150+',
      annee: '2012',
      image: 'https://readdy.ai/api/search-image?query=Montreal%20African%20community%20association%20meeting%20with%20engaged%20members%20discussing%20in%20modern%20community%20space%2C%20bright%20professional%20lighting%20creating%20collaborative%20atmosphere%2C%20simple%20clean%20background&width=600&height=400&seq=assoc-montreal-001&orientation=landscape',
    },
    {
      id: 3,
      nom: 'Association des Étudiants Burkinabè de Toronto',
      province: 'Ontario',
      ville: 'Toronto',
      description: 'Soutien aux étudiants burkinabè dans leur parcours académique et leur intégration dans le système éducatif canadien.',
      domaines: ['Éducation', 'Jeunesse', 'Mentorat'],
      contact: 'aebt@outlook.com',
      telephone: '+1 (416) XXX-XXXX',
      president: 'M. Ibrahim Sawadogo',
      membres: '120+',
      annee: '2018',
      image: 'https://readdy.ai/api/search-image?query=African%20student%20association%20group%20studying%20together%20in%20university%20library%20with%20diverse%20young%20students%20collaborating%20with%20books%20and%20laptops%2C%20bright%20academic%20lighting%20creating%20studious%20atmosphere%2C%20simple%20clean%20background&width=600&height=400&seq=assoc-etudiants-001&orientation=landscape',
    },
    {
      id: 4,
      nom: 'Femmes Burkinabè du Canada',
      province: 'Ontario',
      ville: 'Ottawa',
      description: 'Association dédiée à l\'autonomisation des femmes burkinabè à travers l\'entrepreneuriat, l\'éducation et le soutien mutuel.',
      domaines: ['Femmes', 'Entrepreneuriat', 'Autonomisation'],
      contact: 'femmesburkinabe@gmail.com',
      telephone: '+1 (613) XXX-XXXX',
      president: 'Mme. Mariam Compaoré',
      membres: '95+',
      annee: '2016',
      image: 'https://readdy.ai/api/search-image?query=African%20women%20empowerment%20association%20meeting%20with%20confident%20women%20entrepreneurs%20in%20modern%20business%20center%2C%20warm%20professional%20lighting%20creating%20empowering%20atmosphere%2C%20simple%20clean%20background&width=600&height=400&seq=assoc-femmes-001&orientation=landscape',
    },
    {
      id: 5,
      nom: 'Jeunesse Burkinabè de Vancouver',
      province: 'Colombie-Britannique',
      ville: 'Vancouver',
      description: 'Mobilisation de la jeunesse burkinabè pour des activités sportives, culturelles et de développement personnel.',
      domaines: ['Jeunesse', 'Sport', 'Culture'],
      contact: 'jbvancouver@yahoo.ca',
      telephone: '+1 (604) XXX-XXXX',
      president: 'M. Abdoul Aziz Diallo',
      membres: '70+',
      annee: '2019',
      image: 'https://readdy.ai/api/search-image?query=Young%20African%20community%20group%20engaged%20in%20sports%20and%20cultural%20activities%20in%20outdoor%20Vancouver%20setting%2C%20bright%20energetic%20lighting%20creating%20youthful%20vibrant%20atmosphere%2C%20simple%20clean%20background&width=600&height=400&seq=assoc-jeunesse-001&orientation=landscape',
    },
    {
      id: 6,
      nom: 'Association Solidarité Burkina',
      province: 'Québec',
      ville: 'Québec',
      description: 'Collecte de fonds et organisation de projets de développement au Burkina Faso dans les domaines de l\'éducation et de la santé.',
      domaines: ['Développement', 'Santé', 'Éducation'],
      contact: 'solidariteburkina@hotmail.com',
      telephone: '+1 (418) XXX-XXXX',
      president: 'M. Boureima Zongo',
      membres: '60+',
      annee: '2014',
      image: 'https://readdy.ai/api/search-image?query=Solidarity%20association%20organizing%20development%20projects%20with%20volunteers%20packing%20supplies%20in%20community%20center%2C%20warm%20compassionate%20lighting%20creating%20humanitarian%20atmosphere%2C%20simple%20clean%20background&width=600&height=400&seq=assoc-solidarite-001&orientation=landscape',
    },
    {
      id: 7,
      nom: 'Entrepreneurs Burkinabè du Canada',
      province: 'Ontario',
      ville: 'Toronto',
      description: 'Réseau d\'entrepreneurs burkinabè pour le partage d\'expériences, le mentorat et le développement des affaires.',
      domaines: ['Entrepreneuriat', 'Business', 'Réseautage'],
      contact: 'ebc@entrepreneursburkina.ca',
      telephone: '+1 (647) XXX-XXXX',
      president: 'M. Moussa Traoré',
      membres: '45+',
      annee: '2020',
      image: 'https://readdy.ai/api/search-image?query=African%20business%20entrepreneurs%20networking%20at%20professional%20event%20in%20modern%20business%20venue%2C%20professional%20lighting%20creating%20dynamic%20business%20atmosphere%2C%20simple%20clean%20background&width=600&height=400&seq=assoc-entrepreneurs-001&orientation=landscape',
    },
    {
      id: 8,
      nom: 'Association Culturelle Mossi',
      province: 'Manitoba',
      ville: 'Winnipeg',
      description: 'Préservation et promotion de la culture Mossi à travers des événements culturels, des cours de langue et des célébrations traditionnelles.',
      domaines: ['Culture', 'Langue', 'Traditions'],
      contact: 'culturemossi@gmail.com',
      telephone: '+1 (204) XXX-XXXX',
      president: 'Mme. Rasmata Ouattara',
      membres: '55+',
      annee: '2017',
      image: 'https://readdy.ai/api/search-image?query=Traditional%20African%20cultural%20association%20with%20members%20in%20traditional%20Mossi%20attire%20in%20cultural%20center%2C%20warm%20cultural%20lighting%20creating%20heritage%20atmosphere%2C%20simple%20clean%20background&width=600&height=400&seq=assoc-mossi-001&orientation=landscape',
    },
  ];

  const provinces = ['Toutes', 'Ontario', 'Québec', 'Alberta', 'Colombie-Britannique', 'Manitoba'];

  const filteredAssociations = associations.filter(assoc => {
    const matchesSearch = assoc.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assoc.ville.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assoc.domaines.some(d => d.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesProvince = selectedProvince === 'Toutes' || assoc.province === selectedProvince;
    return matchesSearch && matchesProvince;
  });

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-emerald-50 px-4 py-2 rounded-full mb-4">
            <i className="ri-building-line text-emerald-600"></i>
            <span className="text-emerald-600 font-semibold text-sm">Annuaire des Associations</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Associations Burkinabè au Canada
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Découvrez et connectez-vous avec les associations burkinabè à travers le Canada
          </p>

          <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
            <div className="flex-1 relative">
              <i className="ri-search-line absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg"></i>
              <input
                type="text"
                placeholder="Rechercher par nom, ville ou domaine..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-sm"
              />
            </div>
            <select
              value={selectedProvince}
              onChange={(e) => setSelectedProvince(e.target.value)}
              className="px-6 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-sm font-medium cursor-pointer"
            >
              {provinces.map(prov => (
                <option key={prov} value={prov}>{prov}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAssociations.map((assoc) => (
            <div
              key={assoc.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all border border-gray-100"
            >
              <div className="relative h-56 w-full">
                <img
                  src={assoc.image}
                  alt={assoc.nom}
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-4 py-2 bg-emerald-600 text-white rounded-full text-sm font-bold">
                    {assoc.province}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{assoc.nom}</h3>
                <div className="flex items-center text-gray-600 text-sm mb-4">
                  <i className="ri-map-pin-line mr-2 text-emerald-600"></i>
                  <span>{assoc.ville}, {assoc.province}</span>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                  {assoc.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {assoc.domaines.map((domaine, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
                    >
                      {domaine}
                    </span>
                  ))}
                </div>

                <div className="space-y-2 mb-6 text-sm">
                  <div className="flex items-center text-gray-600">
                    <i className="ri-user-line mr-2 text-emerald-600 w-5 h-5 flex items-center justify-center"></i>
                    <span>{assoc.president}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <i className="ri-team-line mr-2 text-emerald-600 w-5 h-5 flex items-center justify-center"></i>
                    <span>{assoc.membres} membres</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <i className="ri-calendar-line mr-2 text-emerald-600 w-5 h-5 flex items-center justify-center"></i>
                    <span>Fondée en {assoc.annee}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <a
                    href={`mailto:${assoc.contact}`}
                    className="flex-1 px-4 py-3 bg-emerald-600 text-white rounded-lg text-sm font-semibold hover:bg-emerald-700 transition-colors text-center whitespace-nowrap cursor-pointer"
                  >
                    <i className="ri-mail-line mr-2"></i>
                    Contacter
                  </a>
                  <button className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors cursor-pointer">
                    <i className="ri-information-line"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredAssociations.length === 0 && (
          <div className="text-center py-16">
            <i className="ri-search-line text-6xl text-gray-300 mb-4"></i>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Aucune association trouvée</h3>
            <p className="text-gray-600">Essayez de modifier vos critères de recherche</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default AnnuaireSection;
