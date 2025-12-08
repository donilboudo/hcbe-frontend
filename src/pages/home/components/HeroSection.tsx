import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://readdy.ai/api/search-image?query=Modern%20abstract%20geometric%20pattern%20with%20green%20yellow%20and%20red%20colors%20representing%20African%20unity%20and%20diaspora%20connection%2C%20minimalist%20design%20with%20flowing%20shapes%20and%20cultural%20symbols%2C%20warm%20lighting%20creating%20sense%20of%20community%20and%20belonging%2C%20professional%20photography%20style%20with%20soft%20gradients%20and%20harmonious%20color%20palette&width=1920&height=1080&seq=hero-hcbe-001&orientation=landscape')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/50"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
        <div className="mb-6 flex justify-center">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
            <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
            <span className="text-white text-sm font-medium">Bienvenue sur le portail officiel du HCBE Canada</span>
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Haut Conseil des Burkinabè
          <br />
          <span className="bg-gradient-to-r from-emerald-300 via-amber-300 to-orange-300 bg-clip-text text-transparent">
            de l'Extérieur au Canada
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
          Ensemble, mobilisons la diaspora burkinabè pour le développement et la prospérité de notre pays d'origine
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link
            to="/espace-membre"
            className="px-8 py-4 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-all shadow-lg hover:shadow-xl whitespace-nowrap"
          >
            <i className="ri-user-add-line mr-2"></i>
            Devenir Membre
          </Link>
          <Link
            to="/services"
            className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-lg font-semibold hover:bg-white/20 transition-all border border-white/20 whitespace-nowrap"
          >
            <i className="ri-service-line mr-2"></i>
            Découvrir nos Services
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="w-14 h-14 bg-emerald-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <i className="ri-team-line text-3xl text-emerald-300"></i>
            </div>
            <h3 className="text-white font-bold text-lg mb-2">Communauté Unie</h3>
            <p className="text-white/80 text-sm">
              Rassembler et mobiliser la diaspora burkinabè à travers le Canada
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="w-14 h-14 bg-amber-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <i className="ri-hand-heart-line text-3xl text-amber-300"></i>
            </div>
            <h3 className="text-white font-bold text-lg mb-2">Services d'Accompagnement</h3>
            <p className="text-white/80 text-sm">
              Soutien juridique, professionnel, social et financier pour tous les membres
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="w-14 h-14 bg-orange-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <i className="ri-earth-line text-3xl text-orange-300"></i>
            </div>
            <h3 className="text-white font-bold text-lg mb-2">Développement du Burkina</h3>
            <p className="text-white/80 text-sm">
              Contribuer activement au développement économique et social du pays
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <i className="ri-arrow-down-line text-white text-3xl"></i>
      </div>
    </section>
  );
};

export default HeroSection;
