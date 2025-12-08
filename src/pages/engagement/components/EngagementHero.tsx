const EngagementHero = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://readdy.ai/api/search-image?query=Community%20engagement%20and%20unity%20concept%20with%20diverse%20African%20people%20joining%20hands%20together%20in%20bright%20modern%20setting%2C%20professional%20collaborative%20atmosphere%20with%20simple%20clean%20background%20highlighting%20togetherness%20and%20purpose%2C%20natural%20daylight%20creating%20sense%20of%20solidarity%20and%20collaboration&width=1920&height=800&seq=engagement-hero-001&orientation=landscape')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
          <i className="ri-community-line text-white"></i>
          <span className="text-white font-semibold text-sm">Engagement Communautaire</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
          Ensemble, Construisons l'Avenir
        </h1>
        <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
          Votre engagement fait la différence. Rejoignez-nous pour renforcer notre communauté et contribuer au développement du Burkina Faso
        </p>
      </div>
    </section>
  );
};

export default EngagementHero;
