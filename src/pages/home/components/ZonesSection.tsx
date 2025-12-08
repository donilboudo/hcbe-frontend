const ZonesSection = () => {
  const zones = [
    {
      id: 1,
      name: 'Zone 1',
      delegue: 'Mâ Ouédraogo Diallo',
      delegueSuppleant: 'Ismaël Ratouissanmda Zeba',
      photo: 'https://readdy.ai/api/search-image?query=Professional%20African%20businesswoman%20in%20elegant%20formal%20attire%20with%20confident%20smile%2C%20modern%20office%20setting%20with%20natural%20lighting%2C%20representing%20leadership%20and%20community%20engagement%2C%20high%20quality%20portrait%20photography%20with%20professional%20composition%20and%20inspiring%20presence&width=400&height=500&seq=delegue-zone1-003&orientation=portrait',
      message: 'Chers compatriotes de la Zone 1, c\'est avec un immense honneur que je vous accueille. Notre mission est de créer des ponts solides entre notre communauté au Canada et notre cher Burkina Faso. Ensemble, nous bâtirons un avenir prospère pour notre diaspora et contribuerons au développement de notre pays d\'origine. Je m\'engage à être à votre écoute et à travailler sans relâche pour répondre à vos besoins et aspirations.',
      regions: ['Ontario', 'Manitoba', 'Saskatchewan', 'Alberta', 'Colombie-Britannique', 'Nunavut', 'Territoires du Nord-Ouest', 'Yukon'],
    },
    {
      id: 2,
      name: 'Zone 2',
      delegue: 'Aziz Ismaël Daboné',
      delegueSuppleant: 'Ahmed Arnaud Dao',
      photo: 'https://readdy.ai/api/search-image?query=Professional%20African%20businessman%20in%20formal%20suit%20standing%20confidently%20with%20warm%20smile%2C%20modern%20office%20background%20with%20natural%20lighting%2C%20representing%20leadership%20and%20community%20service%2C%20high%20quality%20portrait%20photography%20with%20professional%20composition%20and%20dignified%20presence&width=400&height=500&seq=delegue-zone2-003&orientation=portrait',
      message: 'Bienvenue à tous les membres de la Zone 2. En tant que délégué, je suis déterminé à faire de notre zone un modèle d\'excellence et de solidarité. Nous travaillerons ensemble pour renforcer nos liens communautaires, faciliter votre intégration au Canada tout en préservant nos valeurs culturelles, et créer des opportunités de développement pour tous. Votre voix compte, et je suis là pour vous représenter avec dévouement.',
      regions: ['Québec', 'Nouveau-Brunswick', 'Nouvelle-Écosse', 'Île-du-Prince-Édouard', 'Terre-Neuve-et-Labrador'],
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-full mb-4">
            <i className="ri-map-pin-line text-emerald-600"></i>
            <span className="text-emerald-600 font-semibold text-sm">Organisation Territoriale</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Les Deux Zones du HCBE Canada
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Le HCBE Canada est organisé en deux zones géographiques, chacune dirigée par un délégué dévoué à servir la communauté burkinabè
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {zones.map((zone) => (
            <div key={zone.id} className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-200 shadow-lg">
              <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 p-6 text-white">
                <h3 className="text-3xl font-bold mb-2">{zone.name}</h3>
                <p className="text-emerald-100">Circonscription {zone.name}</p>
              </div>

              <div className="p-8">
                <div className="flex items-start space-x-6 mb-8">
                  <div className="w-32 h-40 flex-shrink-0 overflow-hidden rounded-lg border-4 border-emerald-600">
                    <img
                      src={zone.photo}
                      alt={zone.delegue}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-2xl font-bold text-gray-900 mb-1">{zone.delegue}</h4>
                    <p className="text-emerald-600 font-semibold mb-3">Délégué Titulaire {zone.name}</p>
                    <div className="flex items-center text-gray-600 text-sm">
                      <i className="ri-user-line mr-2"></i>
                      <span><strong>Suppléant:</strong> {zone.delegueSuppleant}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 mb-6 border border-gray-200">
                  <p className="text-gray-700 leading-relaxed italic">
                    "{zone.message}"
                  </p>
                </div>

                <div>
                  <h5 className="font-bold text-gray-900 mb-4 flex items-center">
                    <i className="ri-map-pin-2-fill text-emerald-600 mr-2"></i>
                    Régions couvertes
                  </h5>
                  <div className="grid grid-cols-2 gap-3">
                    {zone.regions.map((region, idx) => (
                      <div
                        key={idx}
                        className="flex items-center space-x-2 bg-white px-4 py-3 rounded-lg border border-gray-200"
                      >
                        <i className="ri-checkbox-circle-fill text-emerald-600 text-sm"></i>
                        <span className="text-gray-700 text-sm">{region}</span>
                      </div>
                    ))}
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

export default ZonesSection;
