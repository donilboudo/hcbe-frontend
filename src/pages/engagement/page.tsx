import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';
import EngagementHero from './components/EngagementHero';
import { Link } from 'react-router-dom';

const EngagementPage = () => {
  const engagementSections = [
    {
      title: 'Annuaire des Associations',
      description: 'Découvrez toutes les associations burkinabè actives au Canada, leurs missions, leurs contacts et comment les rejoindre.',
      icon: 'ri-group-line',
      colorClasses: {
        bg: 'bg-gradient-to-r from-emerald-500 to-emerald-600',
        text: 'text-emerald-600',
        textHover: 'group-hover:text-emerald-700'
      },
      link: '/engagement/annuaire',
      stats: '15+ associations répertoriées',
      features: ['Recherche par province', 'Informations détaillées', 'Contacts directs']
    },
    {
      title: 'Nos Projets',
      description: 'Suivez nos initiatives de développement au Burkina Faso et nos projets d\'intégration communautaire au Canada.',
      icon: 'ri-building-line',
      colorClasses: {
        bg: 'bg-gradient-to-r from-blue-500 to-blue-600',
        text: 'text-blue-600',
        textHover: 'group-hover:text-blue-700'
      },
      link: '/engagement/projets',
      stats: '8 projets actifs',
      features: ['Projets au Burkina', 'Initiatives locales', 'Suivi en temps réel']
    },
    {
      title: 'Votre Opinion Compte',
      description: 'Participez aux consultations et sondages pour façonner l\'avenir de notre communauté et améliorer nos services.',
      icon: 'ri-chat-poll-line',
      colorClasses: {
        bg: 'bg-gradient-to-r from-purple-500 to-purple-600',
        text: 'text-purple-600',
        textHover: 'group-hover:text-purple-700'
      },
      link: '/engagement/consultations',
      stats: 'Votre voix compte',
      features: ['Sondages réguliers', 'Consultations publiques', 'Feedback communautaire']
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <EngagementHero />
      
      {/* Navigation Cards */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Comment S'Engager
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choisissez le domaine qui vous intéresse et découvrez comment contribuer à notre mission commune
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {engagementSections.map((section, index) => (
              <div key={index} className="group relative">
                <Link 
                  to={section.link}
                  className="block h-full bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1"
                >
                  {/* Header with colored background */}
                  <div className={`${section.colorClasses.bg} p-6 text-white`}>
                    <div className="flex items-center justify-between mb-4">
                      <i className={`${section.icon} text-3xl`}></i>
                      <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">
                        {section.stats}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{section.title}</h3>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {section.description}
                    </p>

                    {/* Features */}
                    <ul className="space-y-2 mb-6">
                      {section.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-700">
                          <i className="ri-check-line text-green-500 mr-2"></i>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* Call to action */}
                    <div className="flex items-center justify-between">
                      <span className={`${section.colorClasses.text} ${section.colorClasses.textHover} font-semibold transition-colors`}>
                        Explorer cette section
                      </span>
                      <i className={`ri-arrow-right-line ${section.colorClasses.text} ${section.colorClasses.textHover} group-hover:translate-x-1 transition-all`}></i>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-emerald-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Prêt à Vous Engager ?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Votre participation fait la force de notre communauté. Chaque contribution, 
            grande ou petite, nous rapproche de nos objectifs communs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4 bg-white text-emerald-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
            >
              <i className="ri-mail-line mr-2"></i>
              Nous Contacter
            </Link>
            <Link
              to="/espace-membre"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
            >
              <i className="ri-user-line mr-2"></i>
              Devenir Membre
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default EngagementPage;
