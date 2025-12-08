import { useState } from 'react';

const CommuniquesSection = () => {
  const communiques = [
    {
      id: 1,
      titre: 'Nouvelle Procédure de Renouvellement des Passeports Burkinabè',
      date: '2024-01-28',
      source: 'Ambassade du Burkina Faso au Canada',
      categorie: 'Administratif',
      image: 'https://readdy.ai/api/search-image?query=Official%20passport%20and%20administrative%20documents%20on%20clean%20desk%20with%20organized%20paperwork%2C%20professional%20office%20setting%20with%20simple%20background%2C%20bright%20natural%20lighting%20creating%20official%20atmosphere%2C%20representing%20administrative%20procedures%20and%20documentation&width=600&height=400&seq=communique-passeport-001&orientation=landscape',
      extrait: 'L\'Ambassade du Burkina Faso au Canada informe la communauté burkinabè de la mise en place d\'une nouvelle procédure simplifiée pour le renouvellement des passeports. Les demandes peuvent désormais être effectuées en ligne via le portail consulaire.',
      contenu: 'Suite à la modernisation des services consulaires, l\'Ambassade du Burkina Faso au Canada est heureuse d\'annoncer la mise en place d\'une nouvelle procédure de renouvellement des passeports. Cette initiative vise à faciliter les démarches administratives pour nos compatriotes résidant au Canada. Les principales nouveautés incluent : la possibilité de soumettre les demandes en ligne, un délai de traitement réduit à 4 semaines, un système de suivi en temps réel, et la possibilité de récupérer le passeport par courrier recommandé.',
      lien: '#',
      pieceJointe: 'Guide_Renouvellement_Passeport.pdf',
    },
    {
      id: 2,
      titre: 'Appel à Candidatures pour le Programme de Bourses d\'Excellence 2024',
      date: '2024-01-25',
      source: 'HCBE Canada',
      categorie: 'Éducation',
      image: 'https://readdy.ai/api/search-image?query=Academic%20scholarship%20announcement%20with%20graduation%20cap%20and%20diploma%20on%20clean%20surface%2C%20inspiring%20educational%20setting%20with%20books%20and%20success%20symbols%2C%20bright%20natural%20lighting%20creating%20hopeful%20atmosphere%2C%20representing%20educational%20opportunities%20and%20excellence&width=600&height=400&seq=communique-bourses-001&orientation=landscape',
      extrait: 'Le HCBE Canada lance son programme annuel de bourses d\'excellence destiné aux étudiants burkinabè méritants. Les candidatures sont ouvertes jusqu\'au 15 mars 2024.',
      contenu: 'Le Haut Conseil des Burkinabè de l\'Extérieur au Canada est fier d\'annoncer le lancement de son Programme de Bourses d\'Excellence 2024. Ce programme vise à soutenir les étudiants burkinabè qui se distinguent par leur excellence académique et leur engagement communautaire. Cette année, nous offrons 10 bourses d\'une valeur allant jusqu\'à 15 000 $ CAD chacune. Les critères d\'éligibilité incluent : être de nationalité burkinabè, être inscrit dans une institution d\'enseignement supérieur canadienne reconnue, avoir une moyenne cumulative d\'au moins 3.5/4.0, et démontrer un engagement envers la communauté burkinabè.',
      lien: '#',
      pieceJointe: 'Formulaire_Candidature_Bourses_2024.pdf',
    },
    {
      id: 3,
      titre: 'Mise à Jour sur les Mesures Sanitaires pour les Voyageurs',
      date: '2024-01-20',
      source: 'Ambassade du Burkina Faso au Canada',
      categorie: 'Santé',
      image: 'https://readdy.ai/api/search-image?query=Health%20and%20travel%20safety%20concept%20with%20medical%20documents%20and%20airplane%20symbol%2C%20clean%20modern%20healthcare%20setting%20with%20safety%20symbols%2C%20bright%20professional%20lighting%20creating%20secure%20atmosphere%2C%20representing%20health%20measures%20and%20travel%20requirements&width=600&height=400&seq=communique-sante-001&orientation=landscape',
      extrait: 'Informations importantes concernant les exigences sanitaires pour les voyages entre le Canada et le Burkina Faso. Nouvelles recommandations en vigueur dès février 2024.',
      contenu: 'L\'Ambassade du Burkina Faso au Canada souhaite informer tous les voyageurs des dernières mises à jour concernant les mesures sanitaires pour les déplacements entre le Canada et le Burkina Faso. À compter du 1er février 2024, les nouvelles dispositions suivantes entrent en vigueur : vaccination contre la fièvre jaune obligatoire, test de dépistage du paludisme recommandé, assurance santé voyage fortement conseillée, et mise à jour du carnet de vaccination international. Pour plus d\'informations détaillées, veuillez consulter le site web de l\'Ambassade ou contacter directement les services consulaires.',
      lien: '#',
      pieceJointe: 'Mesures_Sanitaires_Voyageurs_2024.pdf',
    },
    {
      id: 4,
      titre: 'Forum sur l\'Investissement au Burkina Faso - Inscription Ouverte',
      date: '2024-01-15',
      source: 'HCBE Canada',
      categorie: 'Économie',
      image: 'https://readdy.ai/api/search-image?query=Business%20investment%20forum%20with%20professionals%20discussing%20opportunities%20at%20modern%20table%2C%20contemporary%20conference%20setting%20with%20presentation%20materials%20and%20growth%20charts%2C%20bright%20professional%20lighting%20creating%20dynamic%20atmosphere%2C%20representing%20investment%20and%20economic%20development&width=600&height=400&seq=communique-investissement-001&orientation=landscape',
      extrait: 'Le HCBE Canada organise un forum majeur sur les opportunités d\'investissement au Burkina Faso. Rencontrez des experts et découvrez les secteurs porteurs.',
      contenu: 'Le HCBE Canada est ravi d\'annoncer l\'organisation d\'un Forum sur l\'Investissement au Burkina Faso qui se tiendra le 15 mars 2024 à Toronto. Cet événement d\'envergure réunira des experts en développement économique, des entrepreneurs à succès, et des représentants du gouvernement burkinabè. Au programme : présentation des secteurs porteurs (agriculture, énergie renouvelable, technologies), témoignages d\'investisseurs, sessions de réseautage, et consultations individuelles. Les inscriptions sont ouvertes dès maintenant et limitées à 200 participants. Ne manquez pas cette opportunité unique de contribuer au développement économique du Burkina Faso.',
      lien: '#',
      pieceJointe: 'Programme_Forum_Investissement_2024.pdf',
    },
    {
      id: 5,
      titre: 'Célébration de la Journée Internationale de la Femme 2024',
      date: '2024-01-10',
      source: 'HCBE Canada',
      categorie: 'Événement',
      image: 'https://readdy.ai/api/search-image?query=International%20Women%20Day%20celebration%20with%20empowered%20African%20women%20standing%20together%2C%20festive%20colorful%20setting%20with%20unity%20and%20strength%20symbols%2C%20warm%20natural%20lighting%20creating%20celebratory%20atmosphere%2C%20representing%20women%20empowerment%20and%20community%20celebration&width=600&height=400&seq=communique-femme-001&orientation=landscape',
      extrait: 'Rejoignez-nous pour célébrer la Journée Internationale de la Femme avec un événement spécial dédié aux femmes burkinabè du Canada.',
      contenu: 'À l\'occasion de la Journée Internationale de la Femme, le HCBE Canada organise un événement spécial le 8 mars 2024 pour célébrer et honorer les femmes burkinabè du Canada. Cette journée sera marquée par des conférences inspirantes, des témoignages de femmes leaders, des ateliers de développement personnel et professionnel, et une exposition d\'artisanat féminin burkinabè. L\'événement mettra en lumière les contributions exceptionnelles des femmes burkinabè dans divers domaines : entrepreneuriat, éducation, santé, et engagement communautaire. Toute la communauté est invitée à participer à cette célébration de la force, de la résilience et du leadership féminin.',
      lien: '#',
      pieceJointe: 'Programme_Journee_Femme_2024.pdf',
    },
    {
      id: 6,
      titre: 'Nouveau Service de Légalisation de Documents',
      date: '2024-01-05',
      source: 'Ambassade du Burkina Faso au Canada',
      categorie: 'Administratif',
      image: 'https://readdy.ai/api/search-image?query=Official%20document%20legalization%20service%20with%20stamps%20and%20certificates%20on%20organized%20desk%2C%20professional%20administrative%20office%20with%20clean%20files%2C%20bright%20natural%20lighting%20creating%20trustworthy%20atmosphere%2C%20representing%20legal%20documentation%20and%20authentication&width=600&height=400&seq=communique-legalisation-001&orientation=landscape',
      extrait: 'L\'Ambassade lance un nouveau service de légalisation de documents avec des horaires étendus et un système de rendez-vous en ligne.',
      contenu: 'L\'Ambassade du Burkina Faso au Canada est heureuse d\'annoncer l\'amélioration de son service de légalisation de documents. Pour mieux servir la communauté burkinabè, nous avons mis en place plusieurs améliorations : système de prise de rendez-vous en ligne pour éviter les files d\'attente, horaires étendus incluant des samedis une fois par mois, service express disponible moyennant des frais supplémentaires, et possibilité d\'envoi des documents légalisés par courrier sécurisé. Les types de documents pouvant être légalisés incluent : diplômes, actes de naissance, certificats de mariage, procurations, et documents commerciaux. Pour prendre rendez-vous, veuillez visiter notre site web.',
      lien: '#',
      pieceJointe: 'Guide_Legalisation_Documents.pdf',
    },
  ];

  const categories = ['Tous', 'Administratif', 'Éducation', 'Santé', 'Économie', 'Événement'];
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [selectedCommunique, setSelectedCommunique] = useState<number | null>(null);

  const filteredCommuniques = selectedCategory === 'Tous'
    ? communiques
    : communiques.filter(c => c.categorie === selectedCategory);

  const categoryColors: { [key: string]: string } = {
    Administratif: 'bg-gray-100 text-gray-700',
    Éducation: 'bg-gray-100 text-gray-700',
    Santé: 'bg-gray-100 text-gray-700',
    Économie: 'bg-gray-100 text-gray-700',
    Événement: 'bg-gray-100 text-gray-700',
  };

  return (
    <section id="communiques" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Annonces et Communiqués
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Restez informé des dernières annonces du HCBE Canada et de l'Ambassade du Burkina Faso
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-emerald-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCommuniques.map((comm) => (
            <div
              key={comm.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all cursor-pointer group border border-gray-200"
              onClick={() => setSelectedCommunique(comm.id)}
            >
              <div className="relative h-56 overflow-hidden w-full">
                <img
                  src={comm.image}
                  alt={comm.titre}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-4 py-2 rounded-full text-sm font-bold ${categoryColors[comm.categorie]}`}>
                    {comm.categorie}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center text-gray-500 text-sm mb-3">
                  <i className="ri-calendar-line mr-2"></i>
                  <span>{new Date(comm.date).toLocaleDateString('fr-CA', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                  {comm.titre}
                </h3>

                <div className="flex items-center text-gray-600 text-sm mb-4">
                  <i className="ri-building-line mr-2"></i>
                  <span className="font-medium">{comm.source}</span>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
                  {comm.extrait}
                </p>

                <button className="w-full px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold transition-all whitespace-nowrap">
                  <i className="ri-article-line mr-2"></i>
                  Lire la suite
                </button>
              </div>
            </div>
          ))}
        </div>

        {selectedCommunique && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setSelectedCommunique(null)}
          >
            <div
              className="bg-white rounded-2xl max-w-4xl w-full my-8"
              onClick={(e) => e.stopPropagation()}
            >
              {communiques
                .filter((c) => c.id === selectedCommunique)
                .map((comm) => (
                  <div key={comm.id}>
                    <div className="relative h-96 w-full">
                      <img
                        src={comm.image}
                        alt={comm.titre}
                        className="w-full h-full object-cover object-top"
                      />
                      <button
                        onClick={() => setSelectedCommunique(null)}
                        className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer"
                      >
                        <i className="ri-close-line text-xl text-gray-900"></i>
                      </button>
                      <div className="absolute bottom-6 left-6">
                        <span className={`px-4 py-2 rounded-full text-sm font-bold ${categoryColors[comm.categorie]}`}>
                          {comm.categorie}
                        </span>
                      </div>
                    </div>
                    <div className="p-8">
                      <div className="flex items-center text-gray-500 text-sm mb-4">
                        <i className="ri-calendar-line mr-2"></i>
                        <span>{new Date(comm.date).toLocaleDateString('fr-CA', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        <span className="mx-3">•</span>
                        <i className="ri-building-line mr-2"></i>
                        <span>{comm.source}</span>
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-6">{comm.titre}</h2>
                      <p className="text-gray-700 leading-relaxed mb-8">{comm.contenu}</p>
                      
                      {comm.pieceJointe && (
                        <div className="bg-gray-50 rounded-xl p-6 mb-8">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mr-4">
                                <i className="ri-file-pdf-line text-2xl text-emerald-600"></i>
                              </div>
                              <div>
                                <p className="font-semibold text-gray-900">{comm.pieceJointe}</p>
                                <p className="text-sm text-gray-600">Document PDF</p>
                              </div>
                            </div>
                            <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors whitespace-nowrap cursor-pointer">
                              <i className="ri-download-line mr-2"></i>
                              Télécharger
                            </button>
                          </div>
                        </div>
                      )}

                      <div className="flex gap-4">
                        <button className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors whitespace-nowrap cursor-pointer">
                          <i className="ri-share-line mr-2"></i>
                          Partager
                        </button>
                        <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors whitespace-nowrap cursor-pointer">
                          <i className="ri-printer-line mr-2"></i>
                          Imprimer
                        </button>
                        <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors whitespace-nowrap cursor-pointer">
                          <i className="ri-mail-line mr-2"></i>
                          Envoyer par email
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CommuniquesSection;
