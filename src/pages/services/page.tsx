import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';
import ServicesHero from './components/ServicesHero';
import { Link } from 'react-router-dom';

const ServicesPage = () => {
  const services = [
    {
      id: 1,
      title: 'Documents Officiels',
      description: 'Consultez et téléchargez les statuts, règlements et documents officiels du HCBE Canada',
      icon: 'ri-folder-line',
      color: 'emerald',
      link: '/services/documents-officiels',
    },
    {
      id: 2,
      title: 'Nos Comités Spécialisés',
      description: 'Quatre comités dédiés pour répondre à tous vos besoins : juridique, RH, SONGRÉ et finances',
      icon: 'ri-service-line',
      color: 'blue',
      link: '/services/comites',
    },
    {
      id: 3,
      title: 'Bourses et Subventions',
      description: 'Découvrez nos programmes de soutien financier pour vos projets éducatifs et entrepreneuriaux',
      icon: 'ri-hand-coin-line',
      color: 'amber',
      link: '/services/bourses',
    },
  ];

  const colorClasses = {
    emerald: {
      bg: 'bg-emerald-50',
      iconBg: 'bg-emerald-100',
      icon: 'text-emerald-600',
      button: 'bg-emerald-600 hover:bg-emerald-700',
    },
    blue: {
      bg: 'bg-blue-50',
      iconBg: 'bg-blue-100',
      icon: 'text-blue-600',
      button: 'bg-blue-600 hover:bg-blue-700',
    },
    amber: {
      bg: 'bg-amber-50',
      iconBg: 'bg-amber-100',
      icon: 'text-amber-600',
      button: 'bg-amber-600 hover:bg-amber-700',
    },
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <ServicesHero />
      
      {/* Services Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Nos Services et Ressources
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez nos différents services pour vous accompagner dans votre parcours au Canada
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => {
              const colors = colorClasses[service.color as keyof typeof colorClasses];
              return (
                <div
                  key={service.id}
                  className={`${colors.bg} rounded-2xl p-8 hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-gray-200`}
                >
                  <div className={`w-16 h-16 ${colors.iconBg} rounded-xl flex items-center justify-center mb-6`}>
                    <i className={`${service.icon} text-3xl ${colors.icon}`}></i>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <Link
                    to={service.link}
                    className={`inline-flex items-center px-6 py-3 ${colors.button} text-white rounded-lg font-semibold transition-colors whitespace-nowrap`}
                  >
                    En savoir plus
                    <i className="ri-arrow-right-line ml-2"></i>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default ServicesPage;
