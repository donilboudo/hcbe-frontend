const HistoireSection = () => {
  const timeline = [
    {
      year: '2018',
      title: 'Création du HCBE',
      description:
        'Le Haut Conseil des Burkinabè de l\'Extérieur est créé par le Ministère des Affaires étrangères du Burkina Faso pour représenter et mobiliser la diaspora burkinabè à travers le monde.',
      icon: 'ri-flag-line',
    },
    {
      year: '2019',
      title: 'Établissement au Canada',
      description:
        'Mise en place de la structure du HCBE Canada avec la nomination des premiers délégués et la définition des deux zones géographiques couvrant l\'ensemble du territoire canadien.',
      icon: 'ri-map-pin-add-line',
    },
    {
      year: '2020',
      title: 'Structuration des Comités',
      description:
        'Création des comités spécialisés (Juridique, RH, SONGRÉ, Finance) pour offrir un accompagnement complet aux membres de la diaspora dans leurs différents besoins.',
      icon: 'ri-team-line',
    },
    {
      year: '2021',
      title: 'Premiers Projets Communautaires',
      description:
        'Lancement des premières initiatives de développement au Burkina Faso et organisation d\'événements majeurs rassemblant la diaspora burkinabè au Canada.',
      icon: 'ri-rocket-line',
    },
    {
      year: '2022',
      title: 'Expansion des Services',
      description:
        'Élargissement de l\'offre de services avec des programmes de mentorat, d\'orientation professionnelle et de soutien à l\'entrepreneuriat pour les membres de la communauté.',
      icon: 'ri-service-line',
    },
    {
      year: '2023',
      title: 'Renforcement des Partenariats',
      description:
        'Établissement de partenariats stratégiques avec l\'Ambassade du Burkina Faso, les associations burkinabè et les institutions canadiennes pour maximiser l\'impact de nos actions.',
      icon: 'ri-handshake-line',
    },
    {
      year: '2024',
      title: 'Digitalisation et Innovation',
      description:
        'Lancement de la plateforme numérique du HCBE Canada pour faciliter l\'accès aux services, renforcer la communication et moderniser la gestion de la communauté.',
      icon: 'ri-global-line',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-full mb-4">
            <i className="ri-time-line text-emerald-600"></i>
            <span className="text-emerald-600 font-semibold text-sm">Notre Parcours</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Origine et Évolution du HCBE Canada
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Découvrez l'histoire de notre conseil et les étapes clés de notre développement au service de la diaspora burkinabè
          </p>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-200"></div>

          <div className="space-y-12">
            {timeline.map((item, index) => (
              <div
                key={index}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                <div className={`flex-1 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                  <div
                    className={`bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow border border-gray-200 ${
                      index % 2 === 0 ? 'md:text-right' : 'md:text-left'
                    }`}
                  >
                    <div
                      className={`inline-flex items-center space-x-2 bg-emerald-600 text-white px-4 py-2 rounded-full mb-4 ${
                        index % 2 === 0 ? 'md:float-right md:ml-4' : 'md:float-left md:mr-4'
                      }`}
                    >
                      <i className={`${item.icon} text-lg`}></i>
                      <span className="font-bold">{item.year}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 clear-both">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                </div>

                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-16 h-16 bg-emerald-600 rounded-full items-center justify-center shadow-lg z-10">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                    <i className={`${item.icon} text-2xl text-emerald-600`}></i>
                  </div>
                </div>

                <div className="flex-1"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 bg-gray-900 rounded-2xl p-8 md:p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">L'Avenir du HCBE Canada</h3>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-8">
            Nous continuons à évoluer et à innover pour mieux servir notre communauté. Rejoignez-nous dans cette aventure et contribuez à façonner l'avenir de la diaspora burkinabè au Canada.
          </p>
          <button className="px-8 py-4 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors shadow-lg whitespace-nowrap">
            <i className="ri-arrow-right-line mr-2"></i>
            Rejoindre le Mouvement
          </button>
        </div>
      </div>
    </section>
  );
};

export default HistoireSection;
