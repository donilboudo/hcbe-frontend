const ServicesHero = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://readdy.ai/api/search-image?query=Modern%20professional%20services%20concept%20with%20abstract%20geometric%20shapes%20in%20green%20yellow%20red%20colors%2C%20representing%20community%20support%20and%20assistance%2C%20minimalist%20design%20with%20flowing%20lines%20and%20helpful%20symbols%2C%20warm%20lighting%20creating%20sense%20of%20trust%20and%20reliability&width=1920&height=800&seq=services-hero-001&orientation=landscape')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
          <i className="ri-service-line text-white"></i>
          <span className="text-white font-semibold text-sm">Services et Ressources</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
          Nos Services d'Accompagnement
        </h1>
        <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
          Le HCBE Canada met à votre disposition une gamme complète de services pour vous accompagner dans votre parcours au Canada et contribuer au développement du Burkina Faso
        </p>
      </div>
    </section>
  );
};

export default ServicesHero;