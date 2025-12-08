
const MissionVisionSection = () => {
  const items = [
    {
      icon: 'ri-flag-fill',
      title: 'Notre Mission',
      color: 'red',
      description:
        'Représenter et mobiliser la diaspora burkinabè au Canada pour favoriser son intégration harmonieuse dans la société canadienne et contribuer activement au développement socio-économique du Burkina Faso.',
      points: [
        'Défendre les intérêts de la communauté burkinabè au Canada',
        'Faciliter l\'intégration des nouveaux arrivants',
        'Promouvoir la culture et les valeurs burkinabè',
        'Renforcer les liens avec le Burkina Faso',
      ],
    },
    {
      icon: 'ri-eye-line',
      title: 'Notre Vision',
      color: 'yellow',
      description:
        'Être le porte-voix incontournable de la diaspora burkinabè au Canada, reconnu pour son excellence dans l\'accompagnement communautaire et son impact positif sur le développement du Burkina Faso.',
      points: [
        'Une communauté unie et solidaire',
        'Des services d\'excellence pour tous les membres',
        'Un partenariat fort avec les institutions canadiennes et burkinabè',
        'Un impact mesurable sur le développement du Burkina Faso',
      ],
    },
    {
      icon: 'ri-heart-line',
      title: 'Nos Valeurs',
      color: 'green',
      description:
        'Nos actions sont guidées par des valeurs fondamentales qui reflètent l\'identité burkinabè et les principes d\'excellence que nous défendons. Ces valeurs constituent le socle de notre engagement envers la communauté et orientent toutes nos décisions et initiatives pour le bien-être collectif et le développement durable.',
      points: [
        'Solidarité et entraide communautaire',
        'Intégrité et transparence dans nos actions',
        'Excellence et professionnalisme',
        'Respect de la diversité et inclusion',
        'Engagement patriotique et développement',
        'Innovation et adaptation continue',
      ],
    },
  ];

  const colorClasses = {
    red: {
      bg: 'bg-red-50',
      iconBg: 'bg-red-100',
      iconText: 'text-red-600',
      border: 'border-red-600',
      checkIcon: 'text-red-600',
    },
    yellow: {
      bg: 'bg-amber-50',
      iconBg: 'bg-amber-100',
      iconText: 'text-amber-600',
      border: 'border-amber-600',
      checkIcon: 'text-amber-600',
    },
    green: {
      bg: 'bg-emerald-50',
      iconBg: 'bg-emerald-100',
      iconText: 'text-emerald-600',
      border: 'border-emerald-600',
      checkIcon: 'text-emerald-600',
    },
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-full mb-4 border border-gray-200">
            <i className="ri-compass-3-line text-emerald-600"></i>
            <span className="text-emerald-600 font-semibold text-sm">Nos Fondements</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Mission, Vision et Valeurs
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Les principes qui guident notre action au service de la diaspora burkinabè au Canada
          </p>
        </div>

        <div className="space-y-8">
          {items.map((item, index) => (
            <div
              key={index}
              className={`${colorClasses[item.color as keyof typeof colorClasses].bg} rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-gray-200`}
            >
              <div className="p-8 md:p-12">
                <div className="flex flex-col md:flex-row md:items-start md:space-x-8">
                  <div className="flex-shrink-0 mb-6 md:mb-0">
                    <div className={`w-20 h-20 ${colorClasses[item.color as keyof typeof colorClasses].iconBg} rounded-2xl flex items-center justify-center`}>
                      <i className={`${item.icon} text-4xl ${colorClasses[item.color as keyof typeof colorClasses].iconText}`}></i>
                    </div>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-3xl font-bold mb-4 text-gray-900">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-base leading-relaxed mb-6">
                      {item.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {item.points.map((point, idx) => (
                        <div
                          key={idx}
                          className={`flex items-start space-x-3 p-4 bg-white rounded-lg border-l-4 ${colorClasses[item.color as keyof typeof colorClasses].border}`}
                        >
                          <i className={`ri-checkbox-circle-fill text-xl ${colorClasses[item.color as keyof typeof colorClasses].checkIcon} flex-shrink-0 mt-0.5`}></i>
                          <span className="text-gray-700 text-sm font-medium">{point}</span>
                        </div>
                      ))}
                    </div>
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

export default MissionVisionSection;
